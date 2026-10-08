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
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Campo from "@/components/campoTexto/campo";
import Texto from "@/components/texto/texto";
import { BasicSignup } from "@/service/user.service";

const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexSenha = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!\%*?&]{8,}$/;

const Cadastro = () => {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [telefone, setTelefone] = useState("");

 
  const erroNome = nome !== "" && nome.length < 3;
  const erroEmail = email !== "" && !regexEmail.test(email);
  const erroSenha = senha !== "" && !regexSenha.test(senha);
  const erroTelefone = telefone !== "" && telefone.length < 10;

  const formularioValido =
    nome.length >= 3 &&
    regexEmail.test(email) &&
    regexSenha.test(senha) &&
    telefone.length >= 10;

const ROTULOS: Record<string, string> = {
  email: "e-mail",
  telefone: "telefone",
  nome: "nome",
};

const onSubmit = async () => {
  const telefoneLimpo = telefone.replace(/\D/g, "");

  const { status, id, campos, mensagem } = await BasicSignup(
    nome.trim(),
    email.trim(),
    senha,
    telefoneLimpo
  );

  if (status === 201 && id) {
    await AsyncStorage.setItem("id_usuario", String(id));
    Alert.alert("Sucesso", "Cadastro realizado!");
    router.replace("/home");
    return;
  }

  if (status === 409) {
    const lista = campos.map((c) => ROTULOS[c] ?? c);
    const texto =
      lista.length === 1
        ? `Este ${lista[0]} já está cadastrado.`
        : `Estes dados já estão cadastrados: ${lista.join(", ")}.`;

    if (campos.includes("email")) {
      Alert.alert("Cadastro já existente")
    } else {
      Alert.alert("Dados já cadastrados", texto);
    }
    return;
  }

  if (status === 400) {
    Alert.alert("Dados inválidos", mensagem || "Confira os campos e tente novamente.");
    return;
  }

 
  router.push("/erro");
};

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
              paddingVertical: 24,
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

              <Texto textoG="Cadastro" />

              <Campo
                label="Nome"
                value={nome}
                setValue={setNome}
                errorMessage="Mínimo de 3 caracteres"
                placeholder="Nome Completo"
                isError={erroNome}
              />

              <Campo
                label="Email"
                value={email}
                setValue={setEmail}
                errorMessage="E-mail inválido"
                placeholder="Email"
                isError={erroEmail}
              />

              <Campo
                label="Senha"
                value={senha}
                setValue={setSenha}
                errorMessage="Mín. 8 letras com maiúscula, número e símbolo (@$!%*?&)"
                placeholder="Senha"
                isError={erroSenha}
              />

              <Campo
                label="Telefone"
                value={telefone}
                setValue={setTelefone}
                errorMessage="Insira o DDD e número (mín. 10 dígitos)"
                placeholder="Ex: 11999998888"
                isError={erroTelefone}
              />

              <Pressable
                className={`items-center rounded-lg h-14 justify-center ${
                  formularioValido ? "bg-yellow-500" : "bg-yellow-300"
                }`}
                disabled={!formularioValido}
                onPress={onSubmit}
              >
                <Text className="text-black text-xl font-bold">Cadastrar</Text>
              </Pressable>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Cadastro;