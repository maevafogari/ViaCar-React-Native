import { Carro } from "@/components/cardCarro/cardCarro";
import api from "@/lib/axios.config";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Image,
  Text,
  ActivityIndicator,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";

const LOCAIS = [
  "Aeroporto de Congonhas",
  "Aeroporto de Guarulhos",
  "Rodoviária Tietê",
  "Centro - Av. Paulista",
];

type Campo = "retirada" | "devolucao";

const limparBase64 = (uri?: string | null) =>
  uri ? uri.replace(/\\n|\\r|\s/g, "") : null;

const formatarData = (d: Date) => d.toLocaleDateString("pt-BR");
const formatarHora = (d: Date) =>
  d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
const moeda = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const CarroCard = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [carro, setCarro] = useState<Carro | null>(null);
  const [load, setLoad] = useState<boolean>(true);


  const [localRetirada, setLocalRetirada] = useState(LOCAIS[0]);
  const [localDevolucao, setLocalDevolucao] = useState(LOCAIS[0]);
  const [dataRetirada, setDataRetirada] = useState(new Date());
  const [dataDevolucao, setDataDevolucao] = useState(
    new Date(Date.now() + 24 * 60 * 60 * 1000),
  );
  const [picker, setPicker] = useState<{
    campo: Campo;
    modo: "date" | "time";
  } | null>(null);

  useFocusEffect(
    useCallback(() => {
      let ativo = true;

      setLoad(true);
      api
        .get<Carro>(`/carros/${id}`)
        .then(({ data }) => {
          if (ativo) setCarro(data);
        })
        .catch((err) => console.log("Erro ao buscar carro:", err))
        .finally(() => {
          if (ativo) setLoad(false);
        });

      return () => {

        
        ativo = false;
      };
    }, [id]),
  );

  if (load || !carro) {
    return (
      <View className="flex-1 bg-white items-center justify-center">
        <ActivityIndicator />
      </View>
    );
  }

  const valorDiaNum = Number(carro.valor_dia);
  const imagemUri = limparBase64(carro.foto_url);

  const msPorDia = 24 * 60 * 60 * 1000;
  const dias = Math.max(
    1,
    Math.ceil((dataDevolucao.getTime() - dataRetirada.getTime()) / msPorDia),
  );
  const total = dias * valorDiaNum;

  const aoMudarData = (_: unknown, selecionada?: Date) => {
    const atual = picker;
    setPicker(null);
    if (!selecionada || !atual) return;

    const setar = atual.campo === "retirada" ? setDataRetirada : setDataDevolucao;
    setar((anterior) => {
      const nova = new Date(anterior);
      if (atual.modo === "date") {
        nova.setFullYear(
          selecionada.getFullYear(),
          selecionada.getMonth(),
          selecionada.getDate(),
        );
      } else {
        nova.setHours(selecionada.getHours(), selecionada.getMinutes());
      }
      return nova;
    });
  };

  const reservar = async () => {
  if (dataDevolucao <= dataRetirada) {
    Alert.alert("Datas inválidas", "A devolução deve ser depois da retirada.");
    return;
  }

  const id_usuarios = Number(await AsyncStorage.getItem("id_usuario"));

  if (!id_usuarios) {
    Alert.alert("Faça login", "Você precisa estar logado para reservar.");
    return;
  }

  try {
    await api.post("/agendamento", {
      local_retirada: localRetirada,
      local_devolucao: localDevolucao,
      dat_aluguel: dataRetirada.toISOString(),
      datprevista_devolucao: dataDevolucao.toISOString(),
      id_usuarios,
      id_carros: carro.id_carros,
      dias_alugados: dias,
      valor_total: total,
    });
    Alert.alert("Pronto!", "Reserva criada com sucesso.");
  } catch (err: any) {
    Alert.alert("Erro", err?.response?.data?.error ?? "Não foi possível reservar.");
  }
};

  const Select = ({
    label,
    value,
    onChange,
  }: {
    label: string;
    value: string;
    onChange: (v: string) => void;
  }) => (
    <View className="gap-1">
      <Text className="text-gray-700 text-sm">{label}</Text>
      <View className="border border-gray-300 rounded-lg bg-white">
        <Picker selectedValue={value} onValueChange={onChange}>
          {LOCAIS.map((l) => (
            <Picker.Item key={l} label={l} value={l} />
          ))}
        </Picker>
      </View>
    </View>
  );

  const CampoDataHora = ({
    label,
    campo,
    data,
  }: {
    label: string;
    campo: Campo;
    data: Date;
  }) => (
    <View className="gap-1">
      <Text className="text-gray-700 text-sm">{label}</Text>
      <View className="flex-row gap-3">
        <Pressable
          onPress={() => setPicker({ campo, modo: "date" })}
          className="flex-1 border border-gray-300 rounded-lg bg-white px-3 py-3"
        >
          <Text className="text-black">{formatarData(data)}</Text>
        </Pressable>
        <Pressable
          onPress={() => setPicker({ campo, modo: "time" })}
          className="flex-1 border border-gray-300 rounded-lg bg-white px-3 py-3"
        >
          <Text className="text-black">{formatarHora(data)}</Text>
        </Pressable>
      </View>
    </View>
  );

  return (

    <SafeAreaView className="flex-1 bg-[#EFEFEF]">
    
    <ScrollView className="flex-1 bg-white" contentContainerClassName="p-3 pb-10">
      <View className="flex-row items-center gap-3 pt-10">
        {imagemUri ? (
          <Image
            source={{ uri: imagemUri }}
            style={{ width: 240, height: 140, borderRadius: 8 }}
            resizeMode="cover"
          />
        ) : (
          <View
            style={{ width: 140, height: 100, borderRadius: 8 }}
            className="bg-gray-300 items-center justify-center"
          >
            <Text>Sem foto</Text>
          </View>
        )}

        <View className="flex-1 gap-1">
          <Text className="text-black text-2xl font-bold">{carro.modelo}</Text>
          <Text className="text-black text-base">{carro.marca_fabricante}</Text>
          <Text className="text-black text-lg font-semibold">
            {moeda(valorDiaNum)} / dia
          </Text>
        </View>
      </View>

      <Text className="text-black text-2xl font-semibold pt-10 pb-3">
        Detalhes da Reserva
      </Text>

      <View className="gap-4">
        <Select
          label="Local de Retirada"
          value={localRetirada}
          onChange={setLocalRetirada}
        />
        <CampoDataHora
          label="Data e Hora de Retirada"
          campo="retirada"
          data={dataRetirada}
        />

        <Select
          label="Local de Devolução"
          value={localDevolucao}
          onChange={setLocalDevolucao}
        />
        <CampoDataHora
          label="Data e Hora de Devolução"
          campo="devolucao"
          data={dataDevolucao}
        />
      </View>

      <View className="mt-6 gap-1 border-t border-gray-200 pt-4">
        <Text className="text-black font-semibold">Resumo</Text>
        <View className="flex-row justify-between">
          <Text className="text-gray-700">
            {formatarData(dataRetirada)} a {formatarData(dataDevolucao)}
          </Text>
          <Text className="text-gray-700">
            {dias} {dias === 1 ? "dia" : "dias"}
          </Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-gray-700">Valor da diária</Text>
          <Text className="text-gray-700">{moeda(valorDiaNum)}</Text>
        </View>
        <View className="flex-row justify-between pt-2">
          <Text className="text-black text-lg font-bold">Total</Text>
          <Text className="text-black text-lg font-bold">{moeda(total)}</Text>
        </View>
      </View>

      <Pressable
        onPress={reservar}
        className="bg-yellow-400 rounded-xl py-4 mt-6 items-center"
      >
        <Text className="text-black text-lg font-bold">Alugue Agora</Text>
      </Pressable>

      {picker && (
        <DateTimePicker
          value={picker.campo === "retirada" ? dataRetirada : dataDevolucao}
          mode={picker.modo}
          is24Hour
          minimumDate={picker.modo === "date" ? new Date() : undefined}
          onChange={aoMudarData}
        />
      )}
    </ScrollView>
    </SafeAreaView>
  );
};

export default CarroCard;