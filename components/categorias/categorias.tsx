import { View, Text } from "react-native";
import Texto from "../texto/texto";

const Categorias = () => {
  return (
    <View className="flex-1 px-3">

      <Text> Por que escolher o ViaCar?  </Text> 

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