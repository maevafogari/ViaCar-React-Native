import React, { useEffect, useState } from "react";
import Texto from "@/components/texto/texto";
import Header from "@/components/header/header";
import Categoria from "@/components/categorias/categorias";
import Fundo from "@/components/fundo/fundo";
import Destaque from "@/components/destaque/destaque";
import CardCarro from "@/components/cardCarro/cardCarro";
import Funciona from "@/components/funciona/funciona";
import { ImageBackground, ScrollView, View, Text, Pressable } from "react-native";

const Home = () => {
    return(
        <View className="w-full h-full bg-[#F8F9FA]">
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
              Reverve seu veículo agora
            </Text>

            <Pressable className="bg-yellow-500 px-6 py-3 rounded-lg">
              <Text className="text-white font-bold">Reservar</Text>
            </Pressable>
          </ImageBackground>
        </ScrollView>
      </View>
    )
}

export default Home

