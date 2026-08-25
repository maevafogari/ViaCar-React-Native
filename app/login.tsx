import Campo from "@/components/campoTexto/campo";
import Texto from "@/components/texto/texto";
import "@/global.css";

import { BasicSignin } from "@/service/user.service";
import { Link, useRouter } from "expo-router";

import React, { useEffect, useState } from "react";

import {
  Alert,
  Text,
  View,
  ImageBackground,
  Image,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

const App = () => {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");

  const regex_email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const [isErrorInEmail, setIsErrorInEmail] = useState<boolean>(false);

  useEffect(() => {
    if (email == "") {
      setIsErrorInEmail(false);
    } else {
      if (!regex_email.test(email)) {
        setIsErrorInEmail(true);
      } else {
        setIsErrorInEmail(false);
      }
    }
  }, [email]);

  const regex_senha =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  const [isErrorInSenha, setIsErrorInSenha] = useState<boolean>(false);

  useEffect(() => {
    if (senha == "") {
      setIsErrorInSenha(false);
    } else {
      if (!regex_senha.test(senha)) {
        setIsErrorInSenha(true);
      } else {
        setIsErrorInSenha(false);
      }
    }
  }, [senha]);

  const onSubmit = async (email: string, senha: string) => {
    try {
      const resposta = await BasicSignin(email, senha);

      if (resposta == 200) {
        router.navigate("/");
      }
    } catch (error) {
      Alert.alert("Usuário ou senha incorretos");
      console.log(error);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/images/fundoLogin.png")}
      className="flex-1"
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            flexGrow: 1,
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 40,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="bg-white w-[300px] rounded-xl p-4 gap-3">

            <Image
              source={require("../assets/images/logo.png")}
              className="w-40 h-20 self-center"
              style={{
                width: 160,
                height: 80,
              }}
              resizeMode="contain"
            />

            <Texto textoG="Login" />

            <Campo
              label="E-mail"
              value={email}
              setValue={setEmail}
              errorMessage="E-mail invalido"
              placeholder="Digite o e-mail"
              isError={isErrorInEmail}
            />

            <Campo
              label="Senha"
              value={senha}
              setValue={setSenha}
              errorMessage="Senha invalida"
              placeholder="Digite sua senha"
              isError={isErrorInSenha}
            />

            <Pressable
              className="items-center rounded-lg bg-yellow-500 h-14 justify-center"
              disabled={
                isErrorInEmail ||
                isErrorInSenha ||
                email == "" ||
                senha == ""
              }
              onPress={() => onSubmit(email, senha)}
            >
              <View className="justify-center items-center">
                <Text className="text-black text-xl">
                  Entrar
                </Text>
              </View>
            </Pressable>

          <Link href="/cadastro" className="w-full">
  <Text className="text-center w-full">
    Cadastre-se
  </Text>
</Link>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default App;