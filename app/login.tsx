import Campo from "@/components/campoTexto/campo";
import Texto from "@/components/texto/texto";
import "@/global.css";

import { Link, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";

import api from "@/lib/axios.config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { isAxiosError } from "axios";


import {
  Alert,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const App = () => {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [carregando, setCarregando] = useState<boolean>(false);

  const [isErrorInEmail, setIsErrorInEmail] = useState<boolean>(false);

  useEffect(() => {
    if (email === "") {
      setIsErrorInEmail(false);
    } else {
      setIsErrorInEmail(!regexEmail.test(email.trim()));
    }
  }, [email]);

  const onSubmit = async () => {
    const emailLimpo = email.trim();

    if (emailLimpo === "" && senha === "") {
      Alert.alert("Campos vazios", "Preencha o e-mail e a senha.");
      return;
    }
    if (emailLimpo === "") {
      Alert.alert("E-mail obrigatório", "Digite o seu e-mail.");
      return;
    }
    if (!regexEmail.test(emailLimpo)) {
      Alert.alert("E-mail inválido", "Digite um e-mail válido, como nome@email.com.");
      return;
    }
    if (senha === "") {
      Alert.alert("Senha obrigatória", "Digite a sua senha.");
      return;
    }

    setCarregando(true);

    try {
      const { data, status } = await api.post("/login", {
        email: emailLimpo,
        password: senha,
      });

      if (status === 200) {
        await AsyncStorage.setItem("id_usuario", String(data.id_usuarios));
        router.replace("/home");
      }
    } catch (error) {
  console.log(error);

  if (isAxiosError(error) && error.response?.status === 401) {
    Alert.alert("Falha no login", "E-mail ou senha incorretos.");
  } else if (isAxiosError(error) && error.response?.status === 400) {
    Alert.alert("Campos obrigatórios", "Preencha o e-mail e a senha.");
  } else {
    // sem conexão, 500 ou erro desconhecido
    router.push("/erro");
  }
} finally {
  setCarregando(false);
}
  };

  const botaoDesabilitado = carregando;

  return (
    <ImageBackground
      source={require("../assets/images/fundoLogin.png")}
      className="flex-1"
      resizeMode="cover"
    >
      <SafeAreaView className="flex-1">
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
              padding: 16,
            }}
            keyboardShouldPersistTaps="handled"
          >
            <View className="bg-white w-[300px] rounded-xl p-4 gap-3">
              <Image
                source={require("../assets/images/logoviacar.png")}
                style={{ width: 160, height: 80 }}
                className="self-center"
                resizeMode="contain"
              />

              <Texto textoG="Login" />

              <Campo
                label="E-mail"
                value={email}
                setValue={setEmail}
                errorMessage="E-mail inválido"
                placeholder="Digite o e-mail"
                isError={isErrorInEmail}
              />

              <Campo
                label="Senha"
                value={senha}
                setValue={setSenha}
                placeholder="Digite sua senha"
                isError={false}
              />

              <TouchableOpacity
                className={`items-center rounded-lg h-14 justify-center ${
                  botaoDesabilitado ? "bg-yellow-300" : "bg-yellow-500"
                }`}
                disabled={botaoDesabilitado}
                onPress={onSubmit}
              >
                <Text className="text-black text-xl font-bold">
                  {carregando ? "Entrando..." : "Entrar"}
                </Text>
              </TouchableOpacity>

              <Link href="/cadastro" className="w-full">
                <Text className="text-center w-full">Cadastre-se</Text>
              </Link>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default App;