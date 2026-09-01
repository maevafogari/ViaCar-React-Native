import api from "@/lib/axios.config";
import { isAxiosError } from "axios";

export async function BasicSignin(email: string, password: string) {
  try {
    const { status } = await api.post("/login", {
      email,
      password,
    });

    return status;
  } catch (error) {
    if (isAxiosError(error)) {
      return error.response?.status;
    }

    return undefined;
  }
}

export async function BasicSignup(
  user: string,
  email: string,
  password: string,
  telefone: string
) {
  try {
    const { status } = await api.post("/cadastro", {
      user,
      email,
      password,
      telefone,
    });

    return status;
  } catch (error) {
    if (isAxiosError(error)) {
      return error.response?.status;
    }

    return undefined;
  }
}
