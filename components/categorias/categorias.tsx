import { View, Text } from "react-native";

const Categorias = () => {
  return (
    <View className="flex-1 px-3">

      <Text className="text-black text-lg font-medium mb-5">
        Por que escolher a ViaCar?
      </Text>

      <View className="flex-row gap-3 items-center justify-center">

        <View className="bg-white shadow-md w-[87px] h-[110px] rounded-lg"> <Text> Frota nova e revisada</Text> </View>

        <View className="bg-white shadow-md w-[87px] h-[110px] rounded-lg"> <Text> Preços acessíveis </Text> </View>

        <View className="bg-white shadow-md w-[87px] h-[110px] rounded-lg"> <Text> Retirada Rápida </Text> </View>

        <View className="bg-white shadow-md w-[87px] h-[110px] rounded-lg"> <Text> Seguro Incluso </Text> </View> 

      </View>

    </View>
  );
};

export default Categorias;