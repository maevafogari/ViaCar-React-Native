import { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { getCarros } from "@/service/carro.service";

type Carro = {
  id_carros: number;
  marca_fabricante: string;
  modelo: string;
  cor: string;
  ano_fabricacao: string;
  valor_dia: string;
};

export default function Card() {
  const [carros, setCarros] = useState<Carro[]>([]); 

  useEffect(() => {
    getCarros().then((data) => setCarros(data));
  }, []);

  return (
    <ScrollView className="flex-1 p-4">
      

      {carros.map((carro) => (
        <View key={carro.id_carros} className="bg-white rounded-xl p-4 mb-4 shadow-md">
          <Text className="font-bold text-lg">{carro.marca_fabricante}</Text>
          <Text className="text-gray-500">{carro.modelo}</Text>
          <Text className="text-gray-400 text-xs mt-2">{carro.cor} • {carro.ano_fabricacao}</Text>

          <Text className="text-yellow-500 font-bold text-xl mt-2">
            R$ {carro.valor_dia}/dia
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}