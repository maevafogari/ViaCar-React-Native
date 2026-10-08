import api from "@/lib/axios.config";
import { isAxiosError } from "axios";

export async function BasicSignin(email: string, password: string) {
  try {
    const { status } = await api.post("/login", {
      email,
      password,
    });

    console.log(status)

    return status;
  } catch (error) {;
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
    const { data, status } = await api.post("/cadastro", {
      user,
      email,
      password,
      telefone,
    });

    return {
      status,
      id: data.id_usuarios as number | null,
      campos: [] as string[],
      mensagem: "",
    };
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        status: error.response?.status,
        id: null,
        campos: (error.response?.data?.campos ?? []) as string[],
        mensagem: (error.response?.data?.error ?? "") as string,
      };
    }

    return { status: undefined, id: null, campos: [] as string[], mensagem: "" };
  }
}
