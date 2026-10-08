import {
  View,
  Text,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useCallback, useState } from "react";
import { useRouter, useFocusEffect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import api from "@/lib/axios.config";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Usuario = {
  id_usuarios: number;
  nome: string;
  email: string;
  telefone: string;
};

type Aluguel = {
  id_aluguel_carro: number;
  local_retirada: string;
  local_devolucao: string;
  dat_aluguel: string;
  datprevista_devolucao: string;
  dat_devolucao: string | null;
  dias_alugados: number;
  valor_total: string;
  id_carros: number;
  marca_fabricante: string;
  modelo: string;
  versao: string | null;
  cor: string;
  ano_fabricacao: string;
  placa: string;
  transmissao: string;
  valor_dia: string;
  foto_url: string | null;
};

const moeda = (v: string | number) =>
  Number(v).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const formatarData = (d: string | null) =>
  d ? new Date(d).toLocaleDateString("pt-BR") : "-";

const formatarHora = (d: string | null) =>
  d
    ? new Date(d).toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

const iniciais = (nome?: string) => {
  if (!nome) return "?";
  const partes = nome.trim().split(/\s+/);
  const primeira = partes[0]?.[0] ?? "";
  const ultima = partes.length > 1 ? partes[partes.length - 1][0] : "";
  return (primeira + ultima).toUpperCase();
};

type Status = {
  texto: string;
  fundo: string;
  borda: string;
  cor: string;
  ativo: boolean;
};

const statusDoAluguel = (a: Aluguel): Status => {
  const agora = new Date();
  const inicio = new Date(a.dat_aluguel);
  const fim = new Date(a.datprevista_devolucao);

  if (a.dat_devolucao) {
    return { texto: "Finalizado", fundo: "#F3F4F6", borda: "#E5E7EB", cor: "#6B7280", ativo: false };
  }
  if (agora < inicio) {
    return { texto: "Agendado", fundo: "#EFF6FF", borda: "#BFDBFE", cor: "#1D4ED8", ativo: true };
  }
  if (agora <= fim) {
    return { texto: "Em andamento", fundo: "#ECFDF5", borda: "#A7F3D0", cor: "#047857", ativo: true };
  }
  return { texto: "Devolução pendente", fundo: "#FEF2F2", borda: "#FECACA", cor: "#B91C1C", ativo: true };
};

function CardVeiculo({ aluguel }: { aluguel: Aluguel }) {
  const status = statusDoAluguel(aluguel);
  const nomeCarro = `${aluguel.marca_fabricante} ${aluguel.modelo} ${aluguel.versao ?? ""}`.trim();
  const specs = [aluguel.transmissao, aluguel.cor, aluguel.ano_fabricacao]
   ;
  return (
    <View className="bg-white rounded-2xl mb-5 overflow-hidden shadow-md">
      <View className="h-2 bg-yellow-400" />

      <View className="p-5 gap-4">
       
        <View className="flex-row justify-between gap-3">
          <View className="flex-1">
            {aluguel.versao ? (
              <Text className="text-gray-400 text-xs font-semibold uppercase">
                {aluguel.versao}
              </Text>
            ) : null}
            <Text className="text-black text-2xl font-extrabold">
              {nomeCarro}
            </Text>
            <Text className="text-gray-500 text-sm mt-1">{specs}</Text>
          </View>

          <View className="border border-gray-200 bg-gray-50 rounded-xl px-3 py-2 items-end self-start">
            <Text className="text-gray-400 text-xs">Valor Diária</Text>
            <Text className="text-black text-lg font-bold">
              {moeda(aluguel.valor_dia)}
            </Text>
          </View>
        </View>

     
        <View className="border border-gray-200 rounded-2xl p-3 bg-gray-50">
          {aluguel.foto_url ? (
            <Image
              source={{ uri: aluguel.foto_url }}
              style={{ width: "100%", height: 140, borderRadius: 12 }}
              resizeMode="cover"
            />
          ) : (
            <View className="h-[140px] rounded-xl bg-gray-200 items-center justify-center">
              <Text className="text-gray-500">Sem foto</Text>
            </View>
          )}

          <View className="flex-row justify-end mt-3">
            <View className="bg-white border border-gray-200 rounded-lg px-3 py-1">
              <Text className="text-xs text-gray-600">
                Placa:{" "}
                <Text className="font-bold text-yellow-600">
                  {aluguel.placa}
                </Text>
              </Text>
            </View>
          </View>
        </View>

       
        <View className="border border-gray-200 rounded-2xl p-4 gap-3">
          <View className="flex-row justify-between">
            <View className="flex-1 pr-2">
              <View className="flex-row items-center gap-1">
                <Ionicons name="arrow-up-circle" size={16} color="#059669" />
                <Text className="text-emerald-600 text-xs font-bold">
                  RETIRADA
                </Text>
              </View>
              <Text className="text-black font-semibold mt-1">
                {aluguel.local_retirada}
              </Text>
            </View>
            <View className="items-end">
              <Text className="text-black font-bold">
                {formatarData(aluguel.dat_aluguel)}
              </Text>
              <Text className="text-gray-400 text-xs">
                {formatarHora(aluguel.dat_aluguel)}
              </Text>
            </View>
          </View>

          <View className="flex-row items-center">
            <View className="flex-1 h-px bg-gray-200" />
            <View className="bg-gray-200 rounded-full px-3 py-1 mx-2">
              <Text className="text-gray-500 text-xs font-semibold">
                {aluguel.dias_alugados}{" "}
                {aluguel.dias_alugados === 1 ? "DIA" : "DIAS"}
              </Text>
            </View>
            <View className="flex-1 h-px bg-gray-200" />
          </View>

          <View className="flex-row justify-between">
            <View className="flex-1 pr-2">
              <View className="flex-row items-center gap-1">
                <Ionicons name="arrow-down-circle" size={16} color="#D97706" />
                <Text className="text-amber-600 text-xs font-bold">
                  DEVOLUÇÃO PREVISTA
                </Text>
              </View>
              <Text className="text-black font-semibold mt-1">
                {aluguel.local_devolucao}
              </Text>
            </View>
            <View className="items-end">
              <Text className="text-black font-bold">
                {formatarData(aluguel.datprevista_devolucao)}
              </Text>
              <Text className="text-gray-400 text-xs">
                {formatarHora(aluguel.datprevista_devolucao)}
              </Text>
            </View>
          </View>
        </View>

        {/* Status + total */}
        <View className="flex-row items-center justify-between">
          <View
            style={{ backgroundColor: status.fundo, borderColor: status.borda }}
            className="border rounded-full px-3 py-1"
          >
            <Text style={{ color: status.cor }} className="text-xs font-semibold">
              {status.texto}
            </Text>
          </View>
          <View className="items-end">
            <Text className="text-gray-400 text-xs">Total</Text>
            <Text className="text-black text-xl font-extrabold">
              {moeda(aluguel.valor_total)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default function TelaPerfil() {
  const router = useRouter();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [alugueis, setAlugueis] = useState<Aluguel[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erroAlugueis, setErroAlugueis] = useState(false);

  useFocusEffect(
    useCallback(() => {
      async function carregarPerfil() {
        setUsuario(null);
        setAlugueis([]);
        setErroAlugueis(false);
        setCarregando(true);

        try {
          const id = await AsyncStorage.getItem("id_usuario");

          if (!id) {
            router.replace("/");
            return;
          }

          const [resUsuario, resAlugueis] = await Promise.allSettled([
            api.get(`/usuarios/${id}`),
            api.get(`/usuarios/${id}/alugueis`),
          ]);

          if (resUsuario.status === "fulfilled") {
            setUsuario(resUsuario.value.data);
          } else {
            Alert.alert("Erro", "Não foi possível carregar o perfil.");
          }

          if (resAlugueis.status === "fulfilled") {
            setAlugueis(resAlugueis.value.data);
          } else {
            console.log("Erro aluguéis:", resAlugueis.reason?.message);
            setErroAlugueis(true);
          }
        } catch (erro) {
          console.log(erro);
          Alert.alert("Erro", "Não foi possível carregar o perfil.");
        } finally {
          setCarregando(false);
        }
      }

      carregarPerfil();
    }, [])
  );

  const sair = async () => {
    try {
      await AsyncStorage.multiRemove(["id_usuario", "nome", "nome_usuario"]);
      setUsuario(null);
      setAlugueis([]);
    } catch (e) {
      console.log("Erro ao sair:", e);
    } finally {
      if (router.canDismiss()) router.dismissAll();
      router.replace("/");
    }
  };

  if (carregando) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  const atuais = alugueis.filter((a) => statusDoAluguel(a).ativo);
  const historico = alugueis.filter((a) => !statusDoAluguel(a).ativo);

  return (
    <SafeAreaView className="flex-1 bg-white">
     
      <View className="flex-row items-center justify-between px-5 py-4 bg-white border-b border-gray-100">
        <View className="flex-row items-center gap-3 flex-1">
          <View className="w-14 h-14 rounded-full bg-yellow-400 items-center justify-center">
            <Text className="text-black text-xl font-extrabold">
              {iniciais(usuario?.nome)}
            </Text>
          </View>
          <View className="flex-1">
            <Text className="text-gray-400 text-sm">Bem-vindo(a)</Text>
            <Text
              className="text-black text-lg font-bold"
              numberOfLines={1}
            >
              {usuario?.nome ?? "Cliente"}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={sair}
          className="w-11 h-11 rounded-xl bg-gray-100 items-center justify-center"
        >
          <Ionicons name="log-out-outline" size={22} color="#111" />
        </TouchableOpacity>
      </View>

      <ScrollView
        className="flex-1 bg-[#F4F4F5]"
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
      >
        {/* Dados da conta */}
        <View className="bg-white rounded-2xl p-4 mb-6 gap-3 shadow-sm">
          <View className="flex-row items-center gap-3">
            <Ionicons name="mail-outline" size={20} color="#6B7280" />
            <View className="flex-1">
              <Text className="text-gray-400 text-xs">E-mail</Text>
              <Text className="text-black">{usuario?.email}</Text>
            </View>
          </View>
          <View className="h-px bg-gray-100" />
          <View className="flex-row items-center gap-3">
            <Ionicons name="call-outline" size={20} color="#6B7280" />
            <View className="flex-1">
              <Text className="text-gray-400 text-xs">Telefone</Text>
              <Text className="text-black">{usuario?.telefone}</Text>
            </View>
          </View>
        </View>

        {erroAlugueis ? (
          <Text className="text-black text-center my-4">
            Não foi possível carregar seus aluguéis.
          </Text>
        ) : alugueis.length === 0 ? (
          <Text className="text-gray-500 text-center my-4">
            Você ainda não alugou nenhum carro.
          </Text>
        ) : (
          <>
            {atuais.length > 0 && (
              <>
                <View className="flex-row items-center gap-2 mb-3">
                  <View className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <Text className="text-black text-base font-extrabold">
                    SEU VEÍCULO ALUGADO
                  </Text>
                </View>
                {atuais.map((a) => (
                  <CardVeiculo key={a.id_aluguel_carro} aluguel={a} />
                ))}
              </>
            )}

            {historico.length > 0 && (
              <>
                <Text className="text-black text-base font-extrabold mb-3 mt-2">
                  HISTÓRICO
                </Text>
                {historico.map((a) => (
                  <CardVeiculo key={a.id_aluguel_carro} aluguel={a} />
                ))}
              </>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}