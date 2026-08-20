import { View, Text } from "react-native";
import Texto from "@/components/texto/texto";

const Categorias = () => {
  return (
    <View className="flex-1 px-3">

      <Texto textoG="Por que escolher o ViaCar?" className="p-5 mt-5" />

      <View className="flex-row gap-3 items-center justify-center flex-wrap">

        <View className="bg-white shadow-md w-[120px] h-[130px] rounded-lg"> <Text> Frota nova e revisada</Text> </View>

        <View className="bg-white shadow-md w-[120px] h-[130px] rounded-lg"> <Text> Preços acessíveis </Text> </View>

        <View className="bg-white shadow-md w-[120px] h-[130px] rounded-lg"> <Text> Retirada Rápida </Text> </View>

        <View className="bg-white shadow-md w-[120px] h-[130px] rounded-lg"> <Text> Seguro Incluso </Text> </View> 

      </View>

    </View>
  );
};

export default Categorias;