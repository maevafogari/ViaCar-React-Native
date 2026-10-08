import React from "react";
import Fundo from "@/components/fundo/fundo";
import Categoria from "@/components/categorias/categorias";
import Destaque from "@/components/destaque/destaque";
import CardCarro from "@/components/cardCarro/cardCarro";
import Funciona from "@/components/funciona/funciona";
import { ImageBackground, ScrollView, Text, Pressable, TouchableOpacity  } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const Home = () => {
const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FA]">
      <ScrollView className="flex-1">
        <Fundo />

        <Categoria />
        <Destaque />
        <CardCarro />
        <Funciona />

        <ImageBackground
          source={require("../assets/images/LOCADORA.png")}
          className="w-[400px] h-[230px] justify-center items-center"
          resizeMode="cover"
        >
          <Text className="text-white text-2xl font-bold mb-4">
            Reserve seu veículo agora
          </Text>

          <TouchableOpacity className="bg-yellow-500 px-6 py-3 rounded-lg"  onPress={() => router.push("/carros")}>
            
        <TouchableOpacity onPress={() => router.replace("/carros")}>
      <Text className="text-white font-bold">Reservar</Text>
    </TouchableOpacity>
            
            
          </TouchableOpacity>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;