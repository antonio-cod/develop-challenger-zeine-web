import { useActionState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { z, ZodError } from "zod";
import { api } from "../services/api";
import { AxiosError } from "axios";
import { useAuth } from "../hooks/useAuth";

import envelope from "../assets/carta.png";
import key from "../assets/chave.png";
import { useNavigate } from "react-router-dom";

const signInSchema = z.object({
  email: z.email({ message: "E-mail inválido" }),
  password: z.string().trim().min(1, { message: "Informe a senha" }),
})



export function SignIn() {

  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/signup");
  };

  const [state, formAction, isLoading] = useActionState(signIn, null)

  const auth = useAuth()

  async function signIn(_: any, formData: FormData) {
    try {
      const data = signInSchema.parse({
        email: formData.get("email"),
        password: formData.get("password"),
      })

      const response = await api.post("/sessions", data)
      auth.save(response.data)

    } catch (error) {
      console.log(error)

      if (error instanceof ZodError) {
        return { message: error.issues[0].message }
      }

      if (error instanceof AxiosError) {
        return { message: error.response?.data.message }
      }

      return { message: "Não foi possivel entrar!" }
    }
  }


  return (
    <form
      action={formAction}
      className="w-full flex flex-col gap-4 px-[80px] py-[72px]"
    >
      {/* Título e Subtítulo */}
      <div className="mb-6 ">
        <h1 className="font-bold text-gray-500">Acesse sua Conta</h1>

        <p className="text-xxs mb-2 text-gray-300">Informe seu e-mail e senha para entrar</p>
      </div>

      <Input
        name="email"
        required
        legend="E-mail"
        type="email"
        placeholder="Seu e-mail cadastrado"
        icon={envelope}
      />

      <Input
        name="password"
        required
        legend="Senha"
        type="password"
        placeholder="sua senha de acesso"
        icon={key}
      />

      <p className="text-sm text-red-600 text-center my-4 font-medium">
        {state?.message}
      </p>

      <Button type="submit" isLoading={isLoading}>
        Acessar
      </Button>

      <p className="text-sm text-gray-200 mt-22">Ainda não tem uma conta?</p>
      <Button
        onClick={handleRedirect}
        type="button"
        isLoading={isLoading}
        className="bg-white border border-orange-base rounded-lg text-orange-base cursor-pointer hover:bg-orange-950 transition ease-linear disabled:opacity-50"
      >
        Cadastrar
      </Button>
    </form>


  )
}