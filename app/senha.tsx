import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import api from "@/lib/axios.config";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexSenha =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export default function EsqueciSenha() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [verSenha, setVerSenha] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const redefinir = async () => {
    if (!regexEmail.test(email.trim())) {
      Alert.alert("Atenção", "Informe um e-mail válido.");
      return;
    }
    if (!regexSenha.test(senha)) {
      Alert.alert(
        "Senha fraca",
        "Use 8+ caracteres com letra maiúscula, minúscula, número e símbolo (@$!%*?&)."
      );
      return;
    }
    if (senha !== confirmar) {
      Alert.alert("Atenção", "As senhas não conferem.");
      return;
    }

    setCarregando(true);
    try {
      await api.put("/redefinir_senha", { email: email.trim(), senha });
      Alert.alert("Pronto!", "Senha atualizada. Entre com a nova senha.", [
        { text: "OK", onPress: () => router.replace("/") },
      ]);
    } catch (e: any) {
      const data = e?.response?.data;
      const msg =
        (typeof data === "string" ? data : data?.error) ??
        "Não foi possível atualizar a senha.";
      Alert.alert("Erro", msg);
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

        <ScrollView
          contentContainerStyle={{ flexGrow: 1, padding: 24, justifyContent: "center" }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="items-center mb-6">
            <View className="w-16 h-16 rounded-full bg-[#FFC82C] items-center justify-center mb-4">
              <Ionicons name="key-outline" size={32} color="#1A1A1A" />
            </View>
            <Text className="text-2xl font-bold text-[#1A1A1A] text-center mb-2">
              Recuperar <Text className="text-[#FFC82C]">Senha</Text>
            </Text>
            <Text className="text-sm text-[#52525B] text-center px-3 leading-5">
              Informe seu e-mail e escolha uma nova senha.
            </Text>
          </View>

          <View className="bg-white rounded-2xl p-5 border border-[#E2E8F0] shadow-sm mb-4">
            <Text className="text-sm font-semibold text-[#1A1A1A] mb-2">E-mail</Text>
            <View className="flex-row items-center bg-[#F8FAFC] rounded-xl px-3.5 border border-[#E2E8F0] h-12 mb-4">
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

            <Text className="text-sm font-semibold text-[#1A1A1A] mb-2">Nova senha</Text>
            <View className="flex-row items-center bg-[#F8FAFC] rounded-xl px-3.5 border border-[#E2E8F0] h-12 mb-1">
              <Ionicons name="lock-closed-outline" size={20} color="#71717A" style={{ marginRight: 8 }} />
              <TextInput
                style={{ flex: 1, color: "#1A1A1A", fontSize: 15, height: "100%" }}
                placeholder="Digite a nova senha"
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
            <Text className="text-xs text-[#71717A] mb-4">
              Mínimo 8 caracteres, com maiúscula, minúscula, número e símbolo (@$!%*?&).
            </Text>

            <Text className="text-sm font-semibold text-[#1A1A1A] mb-2">Confirmar senha</Text>
            <View className="flex-row items-center bg-[#F8FAFC] rounded-xl px-3.5 border border-[#E2E8F0] h-12 mb-5">
              <Ionicons name="lock-closed-outline" size={20} color="#71717A" style={{ marginRight: 8 }} />
              <TextInput
                style={{ flex: 1, color: "#1A1A1A", fontSize: 15, height: "100%" }}
                placeholder="Repita a nova senha"
                placeholderTextColor="#71717A"
                secureTextEntry={!verSenha}
                autoCapitalize="none"
                autoCorrect={false}
                value={confirmar}
                onChangeText={setConfirmar}
                editable={!carregando}
              />
            </View>

            <TouchableOpacity
              onPress={redefinir}
              disabled={carregando}
              className={`bg-[#FFC82C] h-12 rounded-xl items-center justify-center ${
                carregando ? "opacity-60" : ""
              }`}
            >
              {carregando ? (
                <ActivityIndicator color="#1A1A1A" size="small" />
              ) : (
                <Text className="text-[#1A1A1A] text-base font-bold">Atualizar senha</Text>
              )}
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-center items-center pt-4">
            <Text className="text-sm text-[#71717A]">Lembrou da senha? </Text>
            <TouchableOpacity onPress={() => router.replace("/")}>
              <Text className="text-sm font-bold text-[#1A1A1A] underline">Fazer login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
