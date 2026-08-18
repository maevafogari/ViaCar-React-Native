import { View, Text } from "react-native"

type TextoProps = {
  text: string;
};

const Texto = ({ text }: TextoProps) => {
  return (
    <View className="flex justify-center items-center mt-10 mb-5"> 
      <Text className="text-black text-2xl font-medium ">
      {text}
      </Text>

      </View>
  )
}

export default Texto