import React from "react";
import { Link } from "expo-router";
import { View, Text, Image, Pressable, ScrollView } from "react-native";
import "../global.css";
// import Botao from "@/components/botao/botao";
import Texto from "@/components/texto/texto"
import  Header from "@/components/header/header";
import Categoria from "@/components/categorias/categorias"
import Fundo from "@/components/fundo/fundo"
import Destaque from "@/components/destaque/destaque"
const App = () => {
  return (
    <View className="w-full h-full bg-[#F8F9FA]">
   <Header />
   <ScrollView>
   <Fundo />
   <Categoria />
   <Destaque />
   </ScrollView>

   <Text>Home</Text>
      <Link href="/login">
        <Text>Ir para login</Text>
      </Link>
      
    </View>
    
    
  );
};

export default App;
