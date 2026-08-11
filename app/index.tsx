import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import "../global.css";
import Botao from "@/components/botao/botao";
import  Header from "@/components/header/header";
import Categoria from "@/components/categorias/categorias"
const App = () => {
  return (
    <View className="w-full h-full bg-[#F8F9FA]">
   <Header />
   <Categoria />
    </View>
  );
};

export default App;
