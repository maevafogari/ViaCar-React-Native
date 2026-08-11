import React from "react";
import { Pressable, Text } from "react-native";
import { BotaoProps } from "./botao.type";
import { cn } from "@/lib/cn";
const Botao = ({ className = "", children, ...props }: BotaoProps) => {
  return (
    <Pressable
      className={cn(
        "items-center rounded-lg bg-black px-4 py-2 active:opacity-80",
        className
      )}
      {...props}
    >
      <Text className="font-medium text-white">{children}</Text>
    </Pressable>
  );
};

export default Botao;
