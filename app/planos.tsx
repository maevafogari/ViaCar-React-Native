import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";

const plansData = [
  {
    id: '1',
    title: '1. Plano Econômico',
    description:
      'Veículos compactos, baixo consumo e manutenção programada. Condições facilitadas para quem busca economia sem abrir mão da qualidade.',
    price: 'R$ 199,90/mês',
    image: 'https://www.codivechevrolet.com.br/content/dam/chevrolet/sa/br/pt/master/home/cars/onix/onix-2027/02-colorizer/re-turbo-at/chevrolet-onix-2027-rs-turbo-at-branco.jpg?imwidth=1920',
    carName: 'Chevrolet Onix',
  },
  {
    id: '2',
    title: '2. Plano Conforto',
    description:
      'Carros mais completos (ar, multimídia, direção elétrica), taxas reduzidas e assistência 24h. O melhor custo-benefício.',
    price: 'R$ 399,90/mês',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqh46OIkSsi6gNjLP2C0PAqEQr08wghMv9AjYU84E3Dg&s=10',
    carName: 'Honda Civic',
  },
  {
    id: '3',
    title: '3. Plano Premium',
    description:
      'Veículos de alto padrão, atendimento exclusivo e máximo conforto. Para uma experiência completa em cada detalhe.',
    price: 'R$ 699,90/mês',
    image: 'https://cdn.autopapo.com.br/box/uploads/2019/08/19125120/jeep-compass-2020-sport-frente-732x488.jpg',
    carName: 'Jeep Compass',
  },
];

export default function PlanosViaCar() {
  return (
    <SafeAreaView style={{ flex: 1, height: '100%', backgroundColor: '#F8FAFC' }}>
     
      <ScrollView
        style={{ flex: 1, width: '100%' }}
        contentContainerStyle={{ padding: 5, flexGrow: 1 }}
        showsVerticalScrollIndicator={true}
      >
        <View className="flex-col gap-5 max-w-6xl mx-auto w-full">
          {plansData.map((plan) => (
            <View
              key={plan.id}
              className="w-full bg-white rounded-2xl p-5 border border-amber-200/60 shadow-md shadow-yellow-100 justify-between"
            >
              <View>
                {}
                <View className="h-44 w-full items-center justify-center mb-3" pointerEvents="none">
                  <Image
                    source={{ uri: plan.image }}
                    className="w-full h-full"
                    resizeMode="contain"
                  />
                </View>

                <Text className="text-lg font-bold text-gray-900 mb-2">
                  {plan.title}
                </Text>
                <Text className="text-xs text-gray-500 leading-5 mb-5">
                  {plan.description}
                </Text>
              </View>

              <View>
                <Text className="text-xl font-extrabold text-gray-900 mb-3">
                  {plan.price}
                </Text>
                <TouchableOpacity className="bg-yellow-400 py-3.5 rounded-xl items-center active:opacity-80 shadow-sm">
                  <Text className="text-sm font-bold text-gray-900">
                    Aceitar Plano
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
