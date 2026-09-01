
import api from "@/lib/axios.config";

export async function getCarros() {
  const { data } = await api.get("/carros");
  return data;
}