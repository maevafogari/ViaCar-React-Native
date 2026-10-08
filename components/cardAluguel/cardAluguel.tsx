import { useCallback, useState } from "react";
import { View, Text, FlatList, Image, ActivityIndicator } from "react-native";
import { useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "@/lib/axios.config";

export type Aluguel = {
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
  versao: string;
  cor: string;
  ano_fabricacao: string;
  placa: string;
  transmissao: string;
  valor_dia: string;
  foto_url: string | null;
};

const formatarData = (data: string | null) => {
  if (!data) return "-";
  const [ano, mes, dia] = data.slice(0, 10).split("-");
  return `${dia}/${mes}/${ano}`;
};

export default function CardAluguel() {
  const [alugueis, setAlugueis] = useState<Aluguel[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);

  useFocusEffect(
    useCallback(() => {
      async function carregar() {
        try {
          setErro(false);

          const id = await AsyncStorage.getItem("id_usuario");
          console.log("id_usuario no perfil:", id);

          if (!id) {
            setAlugueis([]);
            return;
          }

          const { data } = await api.get(`/usuarios/${id}/alugueis`);
          console.log("aluguéis recebidos:", data.length);
          setAlugueis(data);
        } catch (e: any) {
          console.log("Erro aluguéis:", e.message, e.response?.status);
          setErro(true);
        } finally {
          setCarregando(false);
        }
      }

      carregar();
    }, [])
  );

  if (carregando) {
    return <ActivityIndicator size="large" className="my-4" />;
  }

  if (erro) {
    return (
      <Text className="text-red-500 text-center my-4">
        Não foi possível carregar seus aluguéis.
      </Text>
    );
  }

  if (alugueis.length === 0) {
    return (
      <Text className="text-gray-500 text-center my-4">
        Você ainda não alugou nenhum carro.
      </Text>
    );
  }

  return (
    <View className="bg-[#EFEFEF]">
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ padding: 16 }}
        data={alugueis}
        keyExtractor={(item) => String(item.id_aluguel_carro)}
        renderItem={({ item: aluguel }) => (
          <View className="bg-white rounded-xl p-4 mr-4 w-64 shadow-md">
            <Image
              source={{
                uri: aluguel.foto_url
                  ? aluguel.foto_url
                  : "https://via.placeholder.com/300x200?text=Sem+Foto",
              }}
              className="w-full h-32 rounded-lg mb-3"
              resizeMode="cover"
            />

            <Text className="font-bold text-lg">
              {aluguel.marca_fabricante}
            </Text>
            <Text className="text-gray-500">
              {`${aluguel.modelo} ${aluguel.versao ?? ""}`}
            </Text>

            <Text className="text-gray-400 text-xs mt-2">
              {`${aluguel.cor} • ${aluguel.ano_fabricacao} • ${aluguel.transmissao}`}
            </Text>
            <Text className="text-gray-400 text-xs">
              {`Placa: ${aluguel.placa}`}
            </Text>

            <View className="mt-3 gap-1">
              <Text className="text-sm">
                {`Retirada: ${formatarData(aluguel.dat_aluguel)} • ${aluguel.local_retirada}`}
              </Text>
              <Text className="text-sm">
                {`Devolução: ${formatarData(aluguel.datprevista_devolucao)} • ${aluguel.local_devolucao}`}
              </Text>
              <Text className="text-sm">{`${aluguel.dias_alugados} dia(s)`}</Text>
            </View>

            <Text className="text-gray-500 text-xs mt-2">
              {`R$ ${aluguel.valor_dia}/dia`}
            </Text>
            <Text className="text-yellow-500 font-bold text-xl">
              {`Total: R$ ${aluguel.valor_total}`}
            </Text>
          </View>
        )}
      />
    </View>
  );
}