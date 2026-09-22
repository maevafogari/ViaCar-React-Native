import { bytesToBase64 } from "@/lib/base64";
import { Image } from "expo-image";
import React from "react";
import { Text, View } from "react-native";

export type Postagem = {
  id: number;
  titulo: string;
  texto: string;
  data: { type: "Buffer"; data: number[] };
  mimetype: string;
};

type imagem = {
  postagem: Postagem;
};

const imagem = ({ postagem }: imagem) => {
  const imagemUri = `data:${postagem.mimetype};base64,${bytesToBase64(postagem.data.data)}`;

  return (
    <View className="bg-white rounded-xl overflow-hidden">
      <Image
        source={{ uri: imagemUri }}
        style={{ width: "100%", height: 200 }}
        contentFit="cover"
      />
      <View className="p-4 gap-1">
        <Text className="text-black text-xl font-bold">{postagem.titulo}</Text>
        <Text className="text-black text-base">{postagem.texto}</Text>
      </View>
    </View>
  );
};

export default imagem;