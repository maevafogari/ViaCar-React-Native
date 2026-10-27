import React, { useEffect, useState } from "react";
import {
  Alert,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { isAxiosError } from "axios";
import api from "@/lib/axios.config";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [verSenha, setVerSenha] = useState<boolean>(false);
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
        router.push("/erro");
      }
    } finally {
      setCarregando(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-[#F4F5F7]">
       <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 24,
          paddingTop: 20,
          paddingBottom: 40,
        }}
        bottomOffset={40}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
          {/* Header */}
          <View className="items-center mb-6 mt-20">
           
            <Text className="text-2xl font-bold text-[#1A1A1A] text-center mb-1">
              Bem-vindo ao <Text className="text-[#FFC82C]">ViaCar</Text>
            </Text>
            <Text className="text-sm text-[#52525B] text-center px-3 leading-5">
              Informe suas credenciais para acessar sua conta.
            </Text>
          </View>

          {/* Form Card */}
          <View className="bg-white rounded-2xl p-5 border border-[#E2E8F0] shadow-sm mb-6">
            {/* Campo E-mail */}
            <Text className="text-sm font-semibold text-[#1A1A1A] mb-2">E-mail</Text>
            <View
              className={`flex-row items-center bg-[#F8FAFC] rounded-xl px-3.5 border h-12 mb-1 ${
                isErrorInEmail ? "border-red-500" : "border-[#E2E8F0]"
              }`}
            >
              <Ionicons name="mail-outline" size={20} color="#71717A" style={{ marginRight: 8 }} />
              <TextInput
                style={{ flex: 1, color: "#1A1A1A", fontSize: 15, height: "100%" }}
                placeholder="seu.email@exemplo.com"
                placeholderTextColor="#71717A"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                onChangeText={setEmail}
                editable={!carregando}
              />
            </View>
            {isErrorInEmail ? (
              <Text className="text-xs text-red-500 mb-3 ml-1">E-mail inválido</Text>
            ) : (
              <View className="mb-4" />
            )}

            {/* Campo Senha */}
            <Text className="text-sm font-semibold text-[#1A1A1A] mb-2">Senha</Text>
            <View className="flex-row items-center bg-[#F8FAFC] rounded-xl px-3.5 border border-[#E2E8F0] h-12 mb-2">
              <Ionicons name="lock-closed-outline" size={20} color="#71717A" style={{ marginRight: 8 }} />
              <TextInput
                style={{ flex: 1, color: "#1A1A1A", fontSize: 15, height: "100%" }}
                placeholder="Digite sua senha"
                placeholderTextColor="#71717A"
                secureTextEntry={!verSenha}
                autoCapitalize="none"
                autoCorrect={false}
                value={senha}
                onChangeText={setSenha}
                editable={!carregando}
              />
              <TouchableOpacity onPress={() => setVerSenha((v) => !v)}>
                <Ionicons name={verSenha ? "eye-off-outline" : "eye-outline"} size={20} color="#71717A" />
              </TouchableOpacity>
            </View>

            {/* Link Esqueceu a Senha */}
            <View className="items-end mb-5">
              <TouchableOpacity onPress={() => router.push("/senha")}>
                <Text className="text-xs font-semibold text-[#52525B]">Esqueceu a senha?</Text>
              </TouchableOpacity>
            </View>

            {/* Botão Entrar */}
            <TouchableOpacity
              onPress={onSubmit}
              disabled={carregando}
              activeOpacity={0.8}
              className={`bg-[#FFC82C] h-12 rounded-xl items-center justify-center ${
                carregando ? "opacity-60" : ""
              }`}
            >
              {carregando ? (
                <ActivityIndicator color="#1A1A1A" size="small" />
              ) : (
                <Text className="text-[#1A1A1A] text-base font-bold">Entrar</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Footer Link - Cadastre-se */}
          <View className="flex-row justify-center items-center">
            <Text className="text-sm text-[#71717A]">Não tem uma conta? </Text>
            <TouchableOpacity onPress={() => router.push("/cadastro")}>
              <Text className="text-sm font-bold text-[#1A1A1A] underline">Cadastre-se</Text>
            </TouchableOpacity>
          </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}