import { useState } from "react";
import { View, ImageBackground, Image, Pressable, Text } from "react-native";
import Campo from "@/components/campoTexto/campo";
import Texto from "@/components/texto/texto";

const Login = () => {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [telefone, setTelefone] = useState("");

    return (
        <ImageBackground
            source={require("../assets/images/fundoLogin.png")}
            className="flex-1"
            resizeMode="cover"
        >
            <View className="flex-1 items-center justify-center">

                <View className="bg-white w-[300px] rounded-xl p-4 gap-3">
                    <Image
                      source={require("../assets/images/logo.png")}
                      className="w-40 h-20 self-center"
                      style={{ width: 160, height: 80 }}
                      resizeMode="contain"
                    />

                    <Texto textoG="Cadastro"/>

                      <Campo
                        value={nome}
                        setText={setNome}
                        placeholder="Nome Completo"
                    />

                    <Campo
                        value={email}
                        setText={setEmail}
                        placeholder="Email"
                    />

                    <Campo
                        value={senha}
                        setText={setSenha}
                        placeholder="Senha"
                    />

                      <Campo
                        value={telefone}
                        setText={setTelefone}
                        placeholder="Telefone"
                    />
                    
                     <Pressable
                          className=
                            "items-center rounded-lg bg-yellow-500 h-14 justify-center "
                        >
                          <Text className="font-medium text-white"> Entrar </Text>
                        </Pressable>
                      

                </View>

            </View>
        </ImageBackground>
    );
};

export default Login;