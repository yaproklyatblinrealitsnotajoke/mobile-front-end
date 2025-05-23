// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   ProgressBarAndroid,
//   Button,
// } from "react-native";
// import { useYandexAuth } from "../hooks/useYandexAuth";
// import * as Progress from "react-native-progress";
// const AuthScreen = () => {
//     const { handler } = useYandexAuth();
//   return(
//     <View>
//         <Button title="Авторизация через яндекс" onPress={handler.onLogin}/>
//     </View>

//   )
// };

// const styles = StyleSheet.create({

// });

// export default AuthScreen;

import React, { useEffect, useState } from "react";
import { Button, View, Text } from "react-native";
import * as AuthSession from "expo-auth-session";

const clientId = "a6edda5c07b14c06885702c5629690f8";
const redirectUri = AuthSession.makeRedirectUri({
  // Можно указать схему для Expo, например 'yourapp://redirect'
  native: "yourapp://redirect",
});

const authorizationEndpoint = "https://oauth.yandex.ru/authorize";

export default function App() {
  const [token, setToken] = useState(null);

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId,
      redirectUri,
      scopes: ["login:email"], // укажите нужные scope
      responseType: "token", // для получения токена сразу (implicit flow)
    },
    { authorizationEndpoint }
  );

  useEffect(() => {
    if (response?.type === "success") {
      // access_token приходит в response.params.access_token
      const accessToken = response.params.access_token;
      const [token, setToken] = React.useState<string | null>(null);
      console.log("Bearer token:", accessToken);
    }
  }, [response]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button
        disabled={!request}
        title="Войти через Яндекс"
        onPress={() => {
          promptAsync();
        }}
      />
      {token && <Text>Bearer Token: {token}</Text>}
    </View>
  );
}
