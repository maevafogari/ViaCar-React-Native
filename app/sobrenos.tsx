import React from "react";
import { View, Text, Image, ScrollView } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

import "@/global.css";

export default function SobreNos() {
  return (
    <ScrollView
      className="flex-1 bg-[#F4F4F4]"
      showsVerticalScrollIndicator={false}
    >
     
      <View className="mx-4 mt-4 h-[230px] rounded-2xl overflow-hidden">
        <Image
          source={require("../assets/images/fundoLogin.png")}
          className="absolute w-full h-full"
          resizeMode="cover"
        />

        <View className="absolute inset-0 bg-black/40" />

        <View className="flex-1 justify-center px-6">
          <Text className="text-white text-3xl font-bold">Sobre nós</Text>

          <Text className="text-white text-sm leading-5 mt-3 w-[75%]">
            A ViaCar nasceu para transformar a experiência de alugar um carro.
            Combinamos tecnologia, atendimento de qualidade e os melhores
            veículos para oferecer mobilidade com liberdade, segurança e o
            melhor preço da região.
          </Text>

          <Link
            href="/filtro"
            className="bg-[#FFC21C] self-start px-5 py-3 rounded-lg mt-4"
          >
            <Text className="text-black font-bold text-sm">Reservar agora</Text>
          </Link>
        </View>
      </View>

      
      <View className="bg-white mx-4 mt-4 rounded-2xl p-5">
        <Text className="text-[#171717] text-2xl font-bold">
          Nossa história
        </Text>

        <View className="h-1 w-12 bg-[#FFC21C] rounded-full mt-2 mb-4" />

        <Text className="text-gray-600 text-sm leading-6">
          Fundada em 2015, a ViaCar começou com um propósito simples: tornar o
          aluguel de carros mais fácil, acessível e transparente.
        </Text>

        <Text className="text-gray-600 text-sm leading-6 mt-3">
          Desde então, crescemos junto com nossos clientes, investindo em
          tecnologia, ampliando nossa frota e fortalecendo nosso compromisso com
          a excelência.
        </Text>

        <Text className="text-gray-600 text-sm leading-6 mt-3">
          Hoje, somos referência em aluguel de veículos na região, sempre
          prontos para te levar mais longe.
        </Text>
      </View>

      
      <View className="mx-4 mt-5">
        <Text className="text-[#171717] text-2xl font-bold text-center">
          Nossos valores
        </Text>

        <View className="h-5" />

        <View className="flex-row flex-wrap justify-between">
         

          <View className="bg-white w-[48%] rounded-2xl p-5 mb-4">
            <View className="w-12 h-12 bg-[#FFF4D4] rounded-full items-center justify-center">
              <Ionicons
                name="shield-checkmark-outline"
                size={25}
                color="#E9A900"
              />
            </View>

            <Text className="text-black text-base font-bold mt-4">
              Segurança
            </Text>

            <Text className="text-gray-500 text-xs leading-5 mt-2">
              Veículos revisados e seguros para você viajar sem preocupações.
            </Text>
          </View>

          
          <View className="bg-white w-[48%] rounded-2xl p-5 mb-4">
            <View className="w-12 h-12 bg-[#FFF4D4] rounded-full items-center justify-center">
              <Ionicons name="person-outline" size={25} color="#E9A900" />
            </View>

            <Text className="text-black text-base font-bold mt-4">
              Atendimento
            </Text>

            <Text className="text-gray-500 text-xs leading-5 mt-2">
              Equipe preparada para oferecer a melhor experiência.
            </Text>
          </View>


          <View className="bg-white w-[48%] rounded-2xl p-5 mb-4">
            <View className="w-12 h-12 bg-[#FFF4D4] rounded-full items-center justify-center">
              <Ionicons name="cash-outline" size={25} color="#E9A900" />
            </View>

            <Text className="text-black text-base font-bold mt-4">
              Transparência
            </Text>

            <Text className="text-gray-500 text-xs leading-5 mt-2">
              Preço justo e sem taxas escondidas.
            </Text>
          </View>

          
          <View className="bg-white w-[48%] rounded-2xl p-5 mb-4">
            <View className="w-12 h-12 bg-[#FFF4D4] rounded-full items-center justify-center">
              <Ionicons name="star-outline" size={25} color="#E9A900" />
            </View>

            <Text className="text-black text-base font-bold mt-4">
              Qualidade
            </Text>

            <Text className="text-gray-500 text-xs leading-5 mt-2">
              Frota moderna e sempre bem cuidada.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
