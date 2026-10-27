import React, { useState } from "react";
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
import { BasicSignup } from "@/service/user.service";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexSenha = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!\%*?&]{8,}$/;

const ROTULOS: Record<string, string> = {
  email: "e-mail",
  telefone: "telefone",
  nome: "nome",
};

export default function CadastroScreen() {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [telefone, setTelefone] = useState("");
  const [verSenha, setVerSenha] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const telefoneLimpo = telefone.replace(/\D/g, "");

  const erroNome = nome !== "" && nome.trim().length < 3;
  const erroEmail = email !== "" && !regexEmail.test(email.trim());
  const erroSenha = senha !== "" && !regexSenha.test(senha);
  const erroTelefone = telefone !== "" && telefoneLimpo.length < 10;

  const formularioValido =
    nome.trim().length >= 3 &&
    regexEmail.test(email.trim()) &&
    regexSenha.test(senha) &&
    telefoneLimpo.length >= 10;

  const onSubmit = async () => {
    if (!formularioValido) return;

    setCarregando(true);

    try {
      const { status, id, campos, mensagem } = await BasicSignup(
        nome.trim(),
        email.trim(),
        senha,
        telefoneLimpo
      );

      if (status === 201 && id) {
        await AsyncStorage.setItem("id_usuario", String(id));
        Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
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
          Alert.alert("Cadastro já existente", "Este e-mail já está cadastrado.");
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
    } catch (error) {
      console.log(error);
      router.push("/erro");
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

          
          <View className="items-center mb-6 mt-24">
            
            <Text className="text-2xl font-bold text-[#1A1A1A] text-center mb-1">
              Criar Conta
            </Text>
            <Text className="text-sm text-[#52525B] text-center px-3 leading-5">
              Preencha os dados abaixo para se cadastrar no ViaCar.
            </Text>
          </View>

          {/* Form Card */}
          <View className="bg-white rounded-2xl p-5 border border-[#E2E8F0] shadow-sm mb-6">
            {/* Campo Nome */}
            <Text className="text-sm font-semibold text-[#1A1A1A] mb-2">Nome Completo</Text>
            <View
              className={`flex-row items-center bg-[#F8FAFC] rounded-xl px-3.5 border h-12 mb-1 ${
                erroNome ? "border-red-500" : "border-[#E2E8F0]"
              }`}
            >
              <Ionicons name="person-outline" size={20} color="#71717A" style={{ marginRight: 8 }} />
              <TextInput
                style={{ flex: 1, color: "#1A1A1A", fontSize: 15, height: "100%" }}
                placeholder="Seu nome completo"
                placeholderTextColor="#71717A"
                value={nome}
                onChangeText={setNome}
                editable={!carregando}
              />
            </View>
            {erroNome ? (
              <Text className="text-xs text-red-500 mb-3 ml-1">Mínimo de 3 caracteres</Text>
            ) : (
              <View className="mb-4" />
            )}

           
            <Text className="text-sm font-semibold text-[#1A1A1A] mb-2">E-mail</Text>
            <View
              className={`flex-row items-center bg-[#F8FAFC] rounded-xl px-3.5 border h-12 mb-1 ${
                erroEmail ? "border-red-500" : "border-[#E2E8F0]"
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
            {erroEmail ? (
              <Text className="text-xs text-red-500 mb-3 ml-1">E-mail inválido</Text>
            ) : (
              <View className="mb-4" />
            )}

           
            <Text className="text-sm font-semibold text-[#1A1A1A] mb-2">Telefone</Text>
            <View
              className={`flex-row items-center bg-[#F8FAFC] rounded-xl px-3.5 border h-12 mb-1 ${
                erroTelefone ? "border-red-500" : "border-[#E2E8F0]"
              }`}
            >
              <Ionicons name="call-outline" size={20} color="#71717A" style={{ marginRight: 8 }} />
              <TextInput
                style={{ flex: 1, color: "#1A1A1A", fontSize: 15, height: "100%" }}
                placeholder="(11) 99999-8888"
                placeholderTextColor="#71717A"
                keyboardType="phone-pad"
                value={telefone}
                onChangeText={setTelefone}
                editable={!carregando}
              />
            </View>
            {erroTelefone ? (
              <Text className="text-xs text-red-500 mb-3 ml-1">
                Insira o DDD e número (mín. 10 dígitos)
              </Text>
            ) : (
              <View className="mb-4" />
            )}

            {/* Campo Senha */}
            <Text className="text-sm font-semibold text-[#1A1A1A] mb-2">Senha</Text>
            <View
              className={`flex-row items-center bg-[#F8FAFC] rounded-xl px-3.5 border h-12 mb-1 ${
                erroSenha ? "border-red-500" : "border-[#E2E8F0]"
              }`}
            >
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
            {erroSenha ? (
              <Text className="text-xs text-red-500 mb-4 ml-1">
                Mínimo 8 caracteres (com maiúscula, minúscula, número e símbolo)
              </Text>
            ) : (
              <View className="mb-5" />
            )}

            {/* Botão Cadastrar */}
            <TouchableOpacity
              onPress={onSubmit}
              disabled={!formularioValido || carregando}
              activeOpacity={0.8}
              className={`bg-[#FFC82C] h-12 rounded-xl items-center justify-center ${
                !formularioValido || carregando ? "opacity-60" : ""
              }`}
            >
              {carregando ? (
                <ActivityIndicator color="#1A1A1A" size="small" />
              ) : (
                <Text className="text-[#1A1A1A] text-base font-bold">Cadastrar</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Footer Link */}
          <View className="flex-row justify-center items-center">
            <Text className="text-sm text-[#71717A]">Já tem uma conta? </Text>
            <TouchableOpacity onPress={() => router.replace("/")}>
              <Text className="text-sm font-bold text-[#1A1A1A] underline">Fazer login</Text>
            </TouchableOpacity>
          </View>
       
    
    </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
