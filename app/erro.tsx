import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

export default function App() {
  return (
    <ImageBackground
      source={require("../assets/images/tres_carros2.png")}
      className="flex-1 justify-center items-center px-6 h-50"
      resizeMode="cover"
    >
      <View className="absolute inset-0 bg-black/50" />

      <View className="items-center justify-center w-full z-10">
        <Text className="text-[120px] font-black text-[#FFC107] tracking-wider leading-none">
          404
        </Text>
        <Text className="text-2xl font-bold text-white mb-3">
          Página não encontrada
        </Text>
        <View className="w-12 h-1 bg-[#FFC107] mb-5" />
        <Text className="text-[#D0D0D0] text-lg text-center px-2 leading-relaxed">
          Ops! A página que você está procurando não existe, foi removida ou
          está temporariamente indisponível.
        </Text>
      </View>

      <View className="flex-row w-full justify-between space-x-3 my-5 z-10 gap-5 ">
        <TouchableOpacity className="flex-1 bg-[#FFC107] py-3 rounded-lg items-center">
          <Text className="text-black font-bold text-lg">Voltar para Home</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-1 py-3 rounded-lg items-center border border-[#FFC107]">
          <Text className="font-bold text-lg color-[#FFC107]">
            Ver veículos
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}