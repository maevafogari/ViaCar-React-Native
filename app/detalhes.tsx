
import Texto from "@/components/texto/texto";
import { getCarros } from "@/service/carro.service";
import { SafeAreaView } from "react-native-safe-area-context";

import React, { useEffect, useState } from "react";

import {
  Text,
  View,
  ScrollView,
} from "react-native";

const Detalhes = () => {
    
 <SafeAreaView className="flex-1 bg-[#EFEFEF]">
    <ScrollView>
        

        <Texto textoG="Alugue seu carro" className="p-5 mt-5" />

    </ScrollView>
    </SafeAreaView>
  
}

export default Detalhes