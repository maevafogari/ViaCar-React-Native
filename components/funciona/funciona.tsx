import Texto from "../texto/texto";
import { View, Text } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


const Funciona = () => {
  return (
    <View className="flex items-center justify-center ">
      <Texto textoG="Como funciona" className="m-8" />

      <View className="flex justify-center items-center w-60 mb-10">
        <FontAwesome name="car" size={18} color="black" />
        <Text className="text-black text-lg font-medium ">
          Escolha o Veículo
        </Text>
        <Text>
          Escolha o veículo perfeito para sua necessidade e aproveite uma
          experiência de locação simples.
        </Text>
      </View>

      <View className="flex justify-center items-center w-60 mb-10">
        <FontAwesome5 name="phone-alt" size={18} color="black" />
        <Text className="text-black text-lg font-medium ">
          Reserve o Veículo
        </Text>
        <Text>
          Reserve seu carro em poucos cliques e viaje com tranquilidade.
        </Text>
      </View>

      <View className="flex justify-center items-center w-60 mb-10">
        <MaterialIcons name="home" size={24} color="black" />
        <Text className="text-black text-lg font-medium ">
          Retire o carro
        </Text>
        <Text>
          Retire seu carro com rapidez e saia dirigindo sem complicações.
        </Text>
      </View>
      
    </View>
  );
};

export default Funciona;
