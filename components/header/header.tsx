import { View, Text, Image, Pressable, Modal, Button, } from "react-native";
import { Link } from "expo-router";
import { useState } from "react";

const Header = () => {
  const [modalAberto, setModalAberto] = useState(false);

  return (
    <View className="bg-[#F8F9FA] p-5 flex-row items-center justify-between">
      <Image
        source={require("../../assets/images/logo.png")}
        className="w-40 h-20"
        style={{ width: 160, height: 80 }}
        resizeMode="contain"
      />

      <Pressable className="bg-yellow-400 p-2 h-10 rounded-lg items-center justify-center">
        <Text className="text-black font-bold">Reservar agora</Text>
      </Pressable>

      <View className="relative">

  <Pressable
    onPress={() => setModalAberto(!modalAberto)}
    className=" mr-5 w-10 h-10 flex items-center justify-center"
  >
    <Text className="text-2xl">☰</Text>
  </Pressable>

  {modalAberto && (
    <View className="absolute right-0 top-8 w-44 h-36 bg-white rounded-lg p-3 z-50">
      <Text>Menu</Text>
      
      <Link href="/login">
        <Text>Ir para login</Text>
      </Link>

         <Link href="/cadastro">
        <Text>Ir para cadastro</Text>
      </Link>

      <Pressable onPress={() => setModalAberto(false)}>
        <Text>Fechar</Text>
      </Pressable>
    </View>
  )}

</View>
    </View>
  );
};

export default Header;
