import { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import { getCarros } from "@/service/carro.service";

export type Carro = {
  id_carros: number;
  marca_fabricante: string;
  modelo: string;
  cor: string;
  ano_fabricacao: string;
  valor_dia: string;
  transmissao?: string;
  foto_url: string | null;
};

export default function App() {
  const router = useRouter();

  const [carros, setCarros] = useState<Carro[]>([]);
  const [precoMax, setPrecoMax] = useState(0);
  const [transmissao, setTransmissao] = useState("");
  const [marca, setMarca] = useState("");

  useEffect(() => {
    getCarros()
      .then((data) => setCarros(data))
      .catch((err) => console.error("Erro ao buscar carros:", err));
  }, []);

  function limpar() {
    setPrecoMax(0);
    setTransmissao("");
    setMarca("");
  }

  let lista = carros;

  if (precoMax > 0) {
    lista = lista.filter((c) => Number(c.valor_dia) <= precoMax);
  }

  if (transmissao !== "") {
    lista = lista.filter((c) =>
      (c.transmissao ?? "").toLowerCase().startsWith(transmissao.slice(0, 4))
    );
  }

  if (marca !== "") {
    lista = lista.filter(
      (c) => c.marca_fabricante.toLowerCase() === marca.toLowerCase()
    );
  }

  function Opcao({
    texto,
    ativo,
    onPress,
  }: {
    texto: string;
    ativo: boolean;
    onPress: () => void;
  }) {
    return (
      <TouchableOpacity
        onPress={onPress}
        className={`px-3 py-2 rounded-full border ${
          ativo ? "bg-[#FFC72C] border-[#FFC72C]" : "border-[#AAA]"
        }`}
      >
        <Text className="text-sm text-black">{texto}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#EFEFEF]">
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View className="bg-white rounded-xl p-4 mb-5">
          <Text className="text-xl font-bold mb-4">Filtrar Veículos</Text>

          
          <Text className="font-bold mb-2">Preço máximo por dia</Text>
          <View className="border border-gray-300 rounded-lg bg-white mb-4">
            <Picker
              selectedValue={precoMax}
              onValueChange={(value) => setPrecoMax(Number(value))}
            >
              <Picker.Item label="Todos" value={0} />
              <Picker.Item label="Até R$ 150" value={150} />
              <Picker.Item label="Até R$ 250" value={250} />
              <Picker.Item label="Até R$ 400" value={400} />
            </Picker>
          </View>

          
          <Text className="font-bold mb-2">Transmissão</Text>
          <View className="flex-row flex-wrap gap-2 mb-4">
            <Opcao
              texto="Todas"
              ativo={transmissao === ""}
              onPress={() => setTransmissao("")}
            />
            <Opcao
              texto="Automático"
              ativo={transmissao === "automatico"}
              onPress={() => setTransmissao("automatico")}
            />
            <Opcao
              texto="Manual"
              ativo={transmissao === "manual"}
              onPress={() => setTransmissao("manual")}
            />
          </View>

          
          <Text className="font-bold mb-2">Marca</Text>
          <View className="border border-gray-300 rounded-lg bg-white mb-4">
            <Picker
              selectedValue={marca}
              onValueChange={(value) => setMarca(value)}
            >
              <Picker.Item label="Todas" value="" />
              <Picker.Item label="Chevrolet" value="Chevrolet" />
              <Picker.Item label="Fiat" value="Fiat" />
              <Picker.Item label="Volkswagen" value="Volkswagen" />
              <Picker.Item label="Jeep" value="Jeep" />
            </Picker>
          </View>

          <TouchableOpacity
            className="bg-[#FFC72C] rounded-md py-3 items-center"
            onPress={limpar}
          >
            <Text className="font-bold text-base">Limpar filtros</Text>
          </TouchableOpacity>
        </View>

        <Text className="text-gray-600 mb-3">
          {lista.length} veículo(s) encontrado(s)
        </Text>

        {lista.map((carro) => (
          <Pressable
            key={carro.id_carros}
            onPress={() =>
              router.push({
                pathname: "/cars/[id]",
                params: { id: carro.id_carros },
              })
            }
          >
            <View className="bg-white rounded-xl p-4 mb-4">
              {carro.foto_url ? (
                <Image
                  source={{ uri: carro.foto_url }}
                  className="w-60 h-36 rounded-lg mb-3"
                  resizeMode="cover"
                />
              ) : (
                <View className="w-full h-40 rounded-lg mb-3 bg-gray-200 items-center justify-center">
                  <Text className="text-gray-500">Sem foto</Text>
                </View>
              )}

              <Text className="font-bold text-lg">
                {carro.marca_fabricante}
              </Text>
              <Text className="text-gray-500">{carro.modelo}</Text>
              <Text className="text-gray-400 text-xs mt-2">
                {`${carro.cor} • ${carro.ano_fabricacao}`}
              </Text>
              <Text className="text-yellow-500 font-bold text-xl mt-2">
                {`R$ ${carro.valor_dia}/dia`}
              </Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
