import { useState } from "react";

import {
  View,
  ImageBackground,
  Image,
  Pressable,
  Text,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";

import Campo from "@/components/campoTexto/campo";
import Texto from "@/components/texto/texto";

import { BasicSignup } from "@/service/user.service";
import { useRouter } from "expo-router";

const Cadastro = () => {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [telefone, setTelefone] = useState("");

  const onSubmit = async () => {
    const resposta = await BasicSignup(
      nome,
      email,
      senha,
      telefone
    );

    if (resposta === 201) {
      Alert.alert("Cadastro realizado com sucesso!");
      router.navigate("/login");
    } else {
      Alert.alert("Erro ao realizar cadastro");
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

            <Texto textoG="Cadastro" />

            <Campo
              label="Nome"
              value={nome}
              setValue={setNome}
              placeholder="Nome Completo"
              isError={false}
            />

            <Campo
              label="Email"
              value={email}
              setValue={setEmail}
              placeholder="Email"
              isError={false}
            />

            <Campo
              label="Senha"
              value={senha}
              setValue={setSenha}
              placeholder="Senha"
              isError={false}
            />

            <Campo
              label="Telefone"
              value={telefone}
              setValue={setTelefone}
              placeholder="Telefone"
              isError={false}
            />

            <Pressable
              className="items-center rounded-lg bg-yellow-500 h-14 justify-center"
              onPress={onSubmit}
            >
              <Text className="text-black text-xl">
                Cadastrar
              </Text>
            </Pressable>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default Cadastro;