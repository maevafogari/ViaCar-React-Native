import { View, Text, ImageBackground } from "react-native";

const Fundo = () => {
  return (
    <ImageBackground
      source={require("../../assets/images/tres_carros2.png")}
      className="w-[400px] h-[450px]"
      resizeMode="cover"
    >
      <View className="mt-25 ml-10 pt-24">
        <Text className="text-white text-5xl font-bold">
          Alugue o carro ideal{"\n"}
          para sua{" "}
          <Text className="text-amber-400">
            necessidade
          </Text>
        </Text>

        <Text className="text-white pt-2 font-bold text-xl">
          Economicos, SUVs e Premium{"\n"}
          com o melhor preço da região
        </Text>
      </View>
    </ImageBackground>
  );
};

export default Fundo;