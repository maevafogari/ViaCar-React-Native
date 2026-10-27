import {
  View,
  Text,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useCallback, useEffect, useState } from "react";
import { useRouter, useFocusEffect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import api from "@/lib/axios.config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";

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

const LOCAIS = [
  "Aeroporto de Congonhas",
  "Aeroporto de Guarulhos",
  "Rodoviária Tietê",
  "Centro - Av. Paulista",
];

const paraApi = (d: Date) => {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
};

const moeda = (v: string | number) =>
  Number(v).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const formatarData = (d: string | Date | null) =>
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

// Troca só o dia, mantendo a hora original
const trocarDia = (atual: Date, novo: Date) =>
  new Date(
    novo.getFullYear(),
    novo.getMonth(),
    novo.getDate(),
    atual.getHours(),
    atual.getMinutes(),
    0,
    0
  );

function SelectLocal({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  // Se o valor salvo no banco não estiver na lista, inclui para não ficar divergente
  const opcoes = value && !LOCAIS.includes(value) ? [value, ...LOCAIS] : LOCAIS;

  return (
    <View>
      <Text className="text-gray-400 text-xs mb-1">{label}</Text>
      <View className="border border-gray-200 rounded-xl overflow-hidden">
        <Picker
          selectedValue={value}
          onValueChange={(v) => onChange(String(v))}
          style={{ color: "#000" }}
          dropdownIconColor="#111"
        >
          <Picker.Item label="Selecione..." value="" enabled={false} />
          {opcoes.map((l) => (
            <Picker.Item key={l} label={l} value={l} color="#000" />
          ))}
        </Picker>
      </View>
    </View>
  );
}

function ModalEditarAluguel({
  aluguel,
  onFechar,
  onSalvo,
}: {
  aluguel: Aluguel | null;
  onFechar: () => void;
  onSalvo: () => void;
}) {
  const [localRetirada, setLocalRetirada] = useState("");
  const [localDevolucao, setLocalDevolucao] = useState("");
  const [dataRetirada, setDataRetirada] = useState(new Date());
  const [dataDevolucao, setDataDevolucao] = useState(new Date());
  const [campoData, setCampoData] = useState<"retirada" | "devolucao" | null>(null);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    if (!aluguel) return;
    setLocalRetirada(aluguel.local_retirada);
    setLocalDevolucao(aluguel.local_devolucao);
    setDataRetirada(new Date(aluguel.dat_aluguel));
    setDataDevolucao(new Date(aluguel.datprevista_devolucao));
    setCampoData(null);
  }, [aluguel]);

  const salvar = async () => {
    if (!aluguel) return;

    if (!localRetirada.trim() || !localDevolucao.trim()) {
      Alert.alert("Atenção", "Informe os locais de retirada e devolução.");
      return;
    }
    if (dataDevolucao <= dataRetirada) {
      Alert.alert("Atenção", "A devolução deve ser depois da retirada.");
      return;
    }

    try {
      setSalvando(true);
      await api.put(`/editar_aluguel/${aluguel.id_aluguel_carro}`, {
        local_retirada: localRetirada.trim(),
        local_devolucao: localDevolucao.trim(),
        dat_aluguel: paraApi(dataRetirada),
        datprevista_devolucao: paraApi(dataDevolucao),
      });
      onSalvo();
    } catch (e: any) {
      console.log("Erro ao editar:", e?.response?.data ?? e?.message);
      const msg =
        e?.response?.data?.error ??
        e?.response?.data?.message ??
        (typeof e?.response?.data === "string" ? e.response.data : null) ??
        "Não foi possível salvar as alterações.";
      Alert.alert("Erro", msg);
    } finally {
      setSalvando(false);
    }
  };

  const retiradaFutura = aluguel ? new Date(aluguel.dat_aluguel) > new Date() : false;

  return (
    <Modal visible={!!aluguel} animationType="slide" transparent onRequestClose={onFechar}>
      <View className="flex-1 justify-end bg-black/50">
        <View className="bg-white rounded-t-3xl" style={{ maxHeight: "90%" }}>
          <ScrollView
            contentContainerStyle={{ padding: 20, gap: 16 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View className="flex-row items-center justify-between">
              <Text className="text-black text-lg font-extrabold">Editar reserva</Text>
              <TouchableOpacity onPress={onFechar}>
                <Ionicons name="close" size={24} color="#111" />
              </TouchableOpacity>
            </View>

            <SelectLocal
              label="Local de retirada"
              value={localRetirada}
              onChange={setLocalRetirada}
            />

            <View>
              <Text className="text-gray-400 text-xs mb-1">Data de retirada</Text>
              <TouchableOpacity
                onPress={() => setCampoData("retirada")}
                className="border border-gray-200 rounded-xl px-3 py-3"
              >
                <Text className="text-black">{formatarData(dataRetirada)}</Text>
              </TouchableOpacity>
            </View>

            <SelectLocal
              label="Local de devolução"
              value={localDevolucao}
              onChange={setLocalDevolucao}
            />

            <View>
              <Text className="text-gray-400 text-xs mb-1">Data de devolução prevista</Text>
              <TouchableOpacity
                onPress={() => setCampoData("devolucao")}
                className="border border-gray-200 rounded-xl px-3 py-3"
              >
                <Text className="text-black">{formatarData(dataDevolucao)}</Text>
              </TouchableOpacity>
            </View>

            {campoData && (
              <View>
                <DateTimePicker
                  value={campoData === "retirada" ? dataRetirada : dataDevolucao}
                  mode="date"
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  minimumDate={
                    campoData === "retirada"
                      ? retiradaFutura
                        ? new Date()
                        : undefined
                      : dataRetirada
                  }
                  onChange={(event, selecionada) => {
                    if (Platform.OS === "android") setCampoData(null);
                    if (event.type === "dismissed" || !selecionada) return;

                    if (campoData === "retirada") {
                      setDataRetirada((atual) => trocarDia(atual, selecionada));
                    } else {
                      setDataDevolucao((atual) => trocarDia(atual, selecionada));
                    }
                  }}
                />
                {Platform.OS === "ios" && (
                  <TouchableOpacity onPress={() => setCampoData(null)} className="items-center py-2">
                    <Text className="text-yellow-600 font-bold">Concluir</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}

            <TouchableOpacity
              onPress={salvar}
              disabled={salvando}
              className="bg-yellow-400 rounded-xl py-4 items-center"
            >
              {salvando ? (
                <ActivityIndicator color="#000" />
              ) : (
                <Text className="text-black font-extrabold">Salvar alterações</Text>
              )}
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

function CardVeiculo({
  aluguel,
  onEditar,
  onExcluir,
}: {
  aluguel: Aluguel;
  onEditar: (a: Aluguel) => void;
  onExcluir: (a: Aluguel) => void;
}) {
  const status = statusDoAluguel(aluguel);
  const nomeCarro = `${aluguel.marca_fabricante} ${aluguel.modelo} ${aluguel.versao ?? ""}`.trim();
  const specs = [aluguel.transmissao, aluguel.cor, aluguel.ano_fabricacao]
    .filter(Boolean)
    .join(" • ");

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
            <Text className="text-black text-2xl font-extrabold">{nomeCarro}</Text>
            <Text className="text-gray-500 text-sm mt-1">{specs}</Text>
          </View>

          <View className="border border-gray-200 bg-gray-50 rounded-xl px-3 py-2 items-end self-start">
            <Text className="text-gray-400 text-xs">Valor Diária</Text>
            <Text className="text-black text-lg font-bold">{moeda(aluguel.valor_dia)}</Text>
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
                Placa: <Text className="font-bold text-yellow-600">{aluguel.placa}</Text>
              </Text>
            </View>
          </View>
        </View>

        <View className="border border-gray-200 rounded-2xl p-4 gap-3">
          <View className="flex-row justify-between">
            <View className="flex-1 pr-2">
              <View className="flex-row items-center gap-1">
                <Ionicons name="arrow-up-circle" size={16} color="#059669" />
                <Text className="text-emerald-600 text-xs font-bold">RETIRADA</Text>
              </View>
              <Text className="text-black font-semibold mt-1">{aluguel.local_retirada}</Text>
            </View>
            <View className="items-end">
              <Text className="text-black font-bold">{formatarData(aluguel.dat_aluguel)}</Text>
              <Text className="text-gray-400 text-xs">{formatarHora(aluguel.dat_aluguel)}</Text>
            </View>
          </View>

          <View className="flex-row items-center">
            <View className="flex-1 h-px bg-gray-200" />
            <View className="bg-gray-200 rounded-full px-3 py-1 mx-2">
              <Text className="text-gray-500 text-xs font-semibold">
                {aluguel.dias_alugados} {aluguel.dias_alugados === 1 ? "DIA" : "DIAS"}
              </Text>
            </View>
            <View className="flex-1 h-px bg-gray-200" />
          </View>

          <View className="flex-row justify-between">
            <View className="flex-1 pr-2">
              <View className="flex-row items-center gap-1">
                <Ionicons name="arrow-down-circle" size={16} color="#D97706" />
                <Text className="text-amber-600 text-xs font-bold">DEVOLUÇÃO PREVISTA</Text>
              </View>
              <Text className="text-black font-semibold mt-1">{aluguel.local_devolucao}</Text>
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
            <Text className="text-black text-xl font-extrabold">{moeda(aluguel.valor_total)}</Text>
          </View>
        </View>

        {status.ativo && (
          <View className="flex-row gap-3">
            <TouchableOpacity
              onPress={() => onEditar(aluguel)}
              className="flex-1 flex-row items-center justify-center gap-2 bg-yellow-400 rounded-xl py-3"
            >
              <Ionicons name="create-outline" size={18} color="#000" />
              <Text className="text-black font-bold">Editar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => onExcluir(aluguel)}
              className="flex-1 flex-row items-center justify-center gap-2 bg-red-600 rounded-xl py-3"
            >
              <Ionicons name="trash-outline" size={18} color="#fff" />
              <Text className="text-white font-bold">Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
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
  const [aluguelEditando, setAluguelEditando] = useState<Aluguel | null>(null);

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

  const recarregarAlugueis = async () => {
    try {
      const id = await AsyncStorage.getItem("id_usuario");
      if (!id) return;
      const res = await api.get(`/usuarios/${id}/alugueis`);
      setAlugueis(res.data);
      setErroAlugueis(false);
    } catch (e) {
      setErroAlugueis(true);
    }
  };

  const excluirAluguel = (aluguel: Aluguel) => {
    Alert.alert(
      "Excluir reserva",
      `Tem certeza que deseja excluir a reserva do ${aluguel.modelo}?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              await api.delete(`/deletar_aluguel/${aluguel.id_aluguel_carro}`);
              setAlugueis((prev) =>
                prev.filter((a) => a.id_aluguel_carro !== aluguel.id_aluguel_carro)
              );
            } catch (error) {
              Alert.alert("Erro", "Não foi possível excluir a reserva.");
            }
          },
        },
      ]
    );
  };

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
            <Text className="text-black text-xl font-extrabold">{iniciais(usuario?.nome)}</Text>
          </View>
          <View className="flex-1">
            <Text className="text-gray-400 text-sm">Bem-vindo(a)</Text>
            <Text className="text-black text-lg font-bold">
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
                  <Text className="text-black text-base font-extrabold">SEU VEÍCULO ALUGADO</Text>
                </View>
                {atuais.map((a) => (
                  <CardVeiculo
                    key={a.id_aluguel_carro}
                    aluguel={a}
                    onEditar={setAluguelEditando}
                    onExcluir={excluirAluguel}
                  />
                ))}
              </>
            )}

            {historico.length > 0 && (
              <>
                <Text className="text-black text-base font-extrabold mb-3 mt-2">HISTÓRICO</Text>
                {historico.map((a) => (
                  <CardVeiculo
                    key={a.id_aluguel_carro}
                    aluguel={a}
                    onEditar={setAluguelEditando}
                    onExcluir={excluirAluguel}
                  />
                ))}
              </>
            )}
          </>
        )}
      </ScrollView>

      <ModalEditarAluguel
        aluguel={aluguelEditando}
        onFechar={() => setAluguelEditando(null)}
        onSalvo={() => {
          setAluguelEditando(null);
          recarregarAlugueis();
        }}
      />
    </SafeAreaView>
  );
}
