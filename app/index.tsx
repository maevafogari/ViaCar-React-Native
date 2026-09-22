import {
  ActivityIndicator
} from "react-native";
import { obterUserId } from "@/lib/secureStore";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import "../global.css";
// import Botao from "@/components/botao/botao";

const App = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    obterUserId().then((id) => {
      setUserId(id);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <ActivityIndicator />
    );
  }

  return <Redirect href={userId ? "/home" : "/login"} />;
};

export default App;
