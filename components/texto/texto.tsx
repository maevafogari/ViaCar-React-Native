import { View, Text } from "react-native"

type TextoProps = {
  textoG: string;
  className?: string; 
};

const Texto = ({ textoG, className }: TextoProps) => {
  return (
    <View className="flex justify-center items-center"> 
 <Text className={`text-black text-2xl font-medium  ${className}`}>      
  {textoG} 
      </Text>

      </View>
  )
}

export default Texto