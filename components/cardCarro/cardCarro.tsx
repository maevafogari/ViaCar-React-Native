import { useEffect, useState } from "react";
import { View, Text, FlatList, Image, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { getCarros } from "@/service/carro.service";

export type Carro = {
  id_carros: number;
  marca_fabricante: string;
  modelo: string;
  cor: string;
  ano_fabricacao: string;
  valor_dia: string;
  foto_url: string | null;
};

export default function Card() {
  const router = useRouter();
  const [carros, setCarros] = useState<Carro[]>([]);

  useEffect(() => {
    getCarros()
      .then((data) => setCarros(data))
      .catch((err) => console.error("Erro ao buscar carros:", err));
  }, []);

  return (
    <View className="bg-[#EFEFEF]">
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ padding: 16 }}
        data={carros}
        keyExtractor={(item) => String(item.id_carros)}
        renderItem={({ item: carro }) => (
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/cars/[id]",
                params: { id: carro.id_carros },
              })
            }
          >
            <View className="bg-white rounded-xl p-4 mr-4 w-60 shadow-md">
              <Image
                source={{
                  uri: carro.foto_url
                    ? carro.foto_url
                    : "https://via.placeholder.com/300x200?text=Sem+Foto",
                }}
                className="w-full h-32 rounded-lg mb-3"
                resizeMode="cover"
              />

              <Text className="font-bold text-lg">{carro.marca_fabricante}</Text>
              <Text className="text-gray-500">{carro.modelo}</Text>

              <Text className="text-gray-400 text-xs mt-2">
                {`${carro.cor} • ${carro.ano_fabricacao}`}
              </Text>

              <Text className="text-yellow-500 font-bold text-xl mt-2">
                {`R$ ${carro.valor_dia}/dia`}
              </Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}