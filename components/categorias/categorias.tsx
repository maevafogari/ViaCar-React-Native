import { View, Text } from "react-native";
import Texto from "@/components/texto/texto";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';

const Categorias = () => {
  return (
    <View className="flex-1 px-3">

      <Texto textoG="Por que escolher o ViaCar?" className="p-5 mt-5" />

      <View className="flex-row gap-3 items-center justify-center flex-wrap">
          
        <View className="bg-white shadow-md w-[130px] h-[120px] rounded-lg flex justify-center items-center"> <MaterialIcons name="attach-money" size={32} color="#F2D066" /><Text> Preços acessíveis </Text></View>

        <View className="bg-white shadow-md w-[130px] h-[120px] rounded-lg flex justify-center items-center"><Feather name="clock" size={24} color="#F2D066" /><Text>  Retirada Rápida </Text></View>

        <View className="bg-white shadow-md w-[130px] h-[120px] rounded-lg flex justify-center items-center"><Entypo name="check" size={24} color="#F2D066" /><Text> Seguro Incluso </Text></View>

        <View className="bg-white shadow-md w-[130px] h-[120px] rounded-lg flex justify-center items-center"> <MaterialCommunityIcons name="car-clock" size={24} color="#F2D066" /> <Text> Suporte 24h </Text> </View> 

      </View>

    </View>
  );
};

export default Categorias;