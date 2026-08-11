import { View, Text, Image, Pressable } from "react-native";
  
  const Header = () => {
  return (
     <View className="bg-[#F8F9FA] p-5 flex-row items-center justify-between">

<Image
  source={require("../../assets/images/logo.png")}
  className="w-40 h-20"
  style={{ width: 160, height: 80 }}
  resizeMode="contain"
/>

  <Pressable className="bg-yellow-400 p-2 h-10 rounded-lg items-center justify-center">
    <Text className="text-black font-bold">
      Reservar agora
    </Text>
  </Pressable>

  <View><Text className="text-3xl"> ☰ </Text></View>

</View>
  );
};

export default Header;
 