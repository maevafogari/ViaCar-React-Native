import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const USER_ID_KEY = "userId";

export async function salvarUserId(userId: string) {
  if (Platform.OS === "web") return;
  await SecureStore.setItemAsync(USER_ID_KEY, userId);
}

export async function obterUserId() {
  if (Platform.OS === "web") return null;
  return SecureStore.getItemAsync(USER_ID_KEY);
}

export async function removerUserId() {
  if (Platform.OS === "web") return;
  await SecureStore.deleteItemAsync(USER_ID_KEY);
}
