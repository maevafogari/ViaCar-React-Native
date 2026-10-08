import React from "react";
import { Text, View, TouchableOpacity, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function NotFound() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require("../assets/images/tres_carros2.png")}
      className="flex-1"
      resizeMode="cover"
    >
      <View className="absolute top-0 bottom-0 left-0 right-0 bg-black/50" />

      <SafeAreaView className="flex-1 justify-center items-center px-6">
        <View className="items-center justify-center w-full">
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

        <View className="flex-row w-full justify-between my-5 gap-5">
          <TouchableOpacity
            className="flex-1 bg-[#FFC107] py-3 rounded-lg items-center"
            onPress={() => router.replace("/home")}
          >
            <Text className="text-black font-bold text-lg">
              Voltar para Home
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-1 py-3 rounded-lg items-center border border-[#FFC107]"
            onPress={() => router.push("/filtro")}
          >
            <Text className="font-bold text-lg text-[#FFC107]">
              Ver veículos
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}