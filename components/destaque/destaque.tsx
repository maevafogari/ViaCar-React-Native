import { View, Text } from "react-native";
import Texto from "../texto/texto";

const Destaque = () => {

  type VeiculosProps = {
  nome: string;
  className?: string;
   
};

  return (
    <View>
      <Texto textoG="Veículos em Destaque" className="mt-5 p-5" />


    
    </View>
  );
};

export default Destaque;
