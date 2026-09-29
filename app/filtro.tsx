import React, { useState } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar
} from 'react-native';

export default function App() {
  const [automatico, setAutomatico] = useState(false);
  const [manual, setManual] = useState(false);
  const [chevrolet, setChevrolet] = useState(false);
  const [fiat, setFiat] = useState(false);
  const [volkswagen, setVolkswagen] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-[#EFEFEF]">
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        
        {/* PAINEL DE FILTROS */}
        <View className="bg-white rounded-xl p-4 mb-5 shadow-sm">
          <Text className="text-xl font-bold text-black mb-4">Filtrar Veículos</Text>

          {/* Categoria */}
          <Text className="text-sm text-[#333] mb-1.5">Categoria</Text>
          <View className="border border-[#CCC] rounded-md p-2.5 flex-row items-center justify-between mb-4">
            <Text className="text-sm text-[#555]">Todos</Text>
            <Text className="text-[10px] text-[#777]">▼</Text>
          </View>

          {/* Preço Máximo */}
          <Text className="text-sm text-[#333] mb-1.5">Preço máximo</Text>
          <View className="h-6 justify-center mb-3 relative">
            <View className="h-1.5 bg-[#FFC72C] rounded-full" />
            <View className="w-5 h-5 rounded-full border-2 border-[#777] bg-white absolute left-10" />
          </View>

          {/* Transmissão */}
          <Text className="text-base font-bold text-black mt-2 mb-2">Transmissão</Text>
          
          <TouchableOpacity 
            className="flex-row items-center mb-2" 
            onPress={() => setAutomatico(!automatico)}
          >
            <View className={`w-[18px] h-[18px] border border-[#AAA] rounded mr-2 ${automatico ? 'bg-[#FFC72C]' : ''}`} />
            <Text className="text-sm text-[#555]">Automático</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            className="flex-row items-center mb-2" 
            onPress={() => setManual(!manual)}
          >
            <View className={`w-[18px] h-[18px] border border-[#AAA] rounded mr-2 ${manual ? 'bg-[#FFC72C]' : ''}`} />
            <Text className="text-sm text-[#555]">Manual</Text>
          </TouchableOpacity>

          <View className="h-[1px] bg-[#EEE] my-2.5" />

          {/* Marca */}
          <Text className="text-base font-bold text-black mt-2 mb-2">Marca</Text>
          
          <TouchableOpacity 
            className="flex-row items-center mb-2" 
            onPress={() => setChevrolet(!chevrolet)}
          >
            <View className={`w-[18px] h-[18px] border border-[#AAA] rounded mr-2 ${chevrolet ? 'bg-[#FFC72C]' : ''}`} />
            <Text className="text-sm text-[#555]">Chevrolet</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            className="flex-row items-center mb-2" 
            onPress={() => setFiat(!fiat)}
          >
            <View className={`w-[18px] h-[18px] border border-[#AAA] rounded mr-2 ${fiat ? 'bg-[#FFC72C]' : ''}`} />
            <Text className="text-sm text-[#555]">Fiat</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            className="flex-row items-center mb-2" 
            onPress={() => setVolkswagen(!volkswagen)}
          >
            <View className={`w-[18px] h-[18px] border border-[#AAA] rounded mr-2 ${volkswagen ? 'bg-[#FFC72C]' : ''}`} />
            <Text className="text-sm text-[#555]">Volkswagen</Text>
          </TouchableOpacity>

          {/* Botão Buscar */}
          <TouchableOpacity className="bg-[#FFC72C] rounded-md py-3 mt-3.5 items-center">
            <Text className="font-bold text-base text-black">Buscar</Text>
          </TouchableOpacity>
        </View>

        {/* LISTA DE VEÍCULOS */}
        <View className="gap-4 pb-5">

          {/* CARRO 1 */}
          <View className="bg-white rounded-lg overflow-hidden shadow-xs">
            <Image
              source={{ uri: 'https://www.chevrolet.com.br/content/dam/chevrolet/south-america/brazil/portuguese/index/portable-navigation/jellys/11-images/SONIC.jpg?imwidth=1200' }}
              className="w-full h-[140px] mt-2.5 bg-white"
              resizeMode="contain"
            />
            <View className="p-3.5">
              <Text className="font-bold text-base text-black">
                Tracker <Text className="font-normal text-[#777]">(Econômico)</Text>
              </Text>
              <Text className="text-xs text-[#AAA] mt-1">Estimada em</Text>
              <View className="flex-row justify-between items-center mt-1.5">
                <Text className="font-bold text-[#FFC72C] text-base">
                  R$129<Text className="text-[#777] font-normal text-xs">/dia</Text>
                </Text>
                <TouchableOpacity className="bg-[#FFC72C] px-3 py-2 rounded">
                  <Text className="font-bold text-xs text-black">Alugar Agora</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* CARRO 2 */}
          <View className="bg-white rounded-lg overflow-hidden shadow-xs">
            <Image
              source={{ uri: 'https://www.pinhochevrolet.com.br/content/dam/chevrolet/sa/br/pt/master/home/suvs/tracker/tracker-myr-2026/2-colorizer/lt-at-turbo/chevrolet-tracker-lt-cinza-rush.jpg?imwidth=1920' }}
              className="w-full h-[140px] mt-2.5 bg-white"
              resizeMode="contain"
            />
            <View className="p-3.5">
              <Text className="font-bold text-base text-black">
                Onix Plus <Text className="font-normal text-[#777]">(Econômico)</Text>
              </Text>
              <Text className="text-xs text-[#AAA] mt-1">Estimada em</Text>
              <View className="flex-row justify-between items-center mt-1.5">
                <Text className="font-bold text-[#FFC72C] text-base">
                  R$129<Text className="text-[#777] font-normal text-xs">/dia</Text>
                </Text>
                <TouchableOpacity className="bg-[#FFC72C] px-3 py-2 rounded">
                  <Text className="font-bold text-xs text-black">Alugar Agora</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* CARRO 3 */}
          <View className="bg-white rounded-lg overflow-hidden shadow-xs">
            <Image
              source={{ uri: 'https://www.chevrolet.com.br/content/dam/chevrolet/south-america/brazil/portuguese/index/portable-navigation/jellys/02-images/onix-plus-premiere-prata.jpg?imwidth=1200' }}
              className="w-full h-[140px] mt-2.5 bg-white"
              resizeMode="contain"
            />
            <View className="p-3.5">
              <Text className="font-bold text-base text-black">
                Trailblazer <Text className="font-normal text-[#777]">(SUV)</Text>
              </Text>
              <Text className="text-xs text-[#AAA] mt-1">Estimada em</Text>
              <View className="flex-row justify-between items-center mt-1.5">
                <Text className="font-bold text-[#FFC72C] text-base">
                  R$129<Text className="text-[#777] font-normal text-xs">/dia</Text>
                </Text>
                <TouchableOpacity className="bg-[#FFC72C] px-3 py-2 rounded">
                  <Text className="font-bold text-xs text-black">Alugar Agora</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

        </View>

      </ScrollView>
    </SafeAreaView>
  );
}