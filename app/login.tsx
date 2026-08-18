import { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import Campo from "@/components/campoTexto/campo"

const Login = () => {

        const [email, setEmail] = useState<string>("")
        const [senha, setSenha] = useState<string>("")

    return (
        <View className="bg-black w-60 h-72 flex items-center justify-center">

             <Campo label="Email" value={email} setText={setEmail} placeholder="Email"/>

            <Campo label="Senha" value={senha} setText={setSenha} placeholder="Senha"/>
        

        </View>
    )
}

export default Login