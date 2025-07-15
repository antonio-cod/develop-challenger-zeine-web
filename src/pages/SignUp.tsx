import { useState } from "react";
import { z, ZodError } from "zod"

import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { api } from "../services/api";
import { useNavigate } from "react-router";
import { AxiosError } from "axios";

import key from "../assets/chave.png";
import envelope from "../assets/carta.png";
import user from "../assets/user.png";
import call from "../assets/call.png";
import upload from "../assets/image-upload.png";

const signUpSchema = z.object({
  name: z.string().trim().min(3, { message: "Informe o nome" }),
  email: z.email({ message: "E-mail inválido" }),
  password: z.string().min(6, { message: "Senha deve conter no minimo de 6 caracteres" }),
  passwordConfirm: z.string({ message: "Confirme a senha" }),
})
  .refine((data) => data.password === data.passwordConfirm, {
    message: "As senhas não são iguais",
    path: ["passwordConfirm"],
  })

export function SignUp() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()

    try {
      setIsLoading(true)

      const data = signUpSchema.parse({
        name,
        email,
        password,
        passwordConfirm,
      })

      await api.post("/users", data)

      if (confirm("Cadastrado com sucesso. Ir para tela de entrar?")) {
        navigate("/")
      }

    } catch (error) {
      if (error instanceof ZodError) {
        return alert(error.issues[0].message)
      }

      if (error instanceof AxiosError) {
        return alert(error.response?.data.message)
      }

      alert("Não foi possível cadastrar!")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="w-full flex flex-col gap-4 px-[80px] py-[72px]"
    >
      {/* Título e Subtítulo */}
      <div className="mb-6 ">
        <h1 className="font-bold text-gray-500">Crie sua conta</h1>

        <p className="text-xxs mb-2 text-gray-300">Informe seus dados pessoais e de acesso</p>
      </div>

      <h1 className="font-bold text-gray-500">Perfil</h1>
      <div className="w-[120px] h-[120px] bg-background rounded-2xl flex items-center justify-center">
        <img
          src={upload}
          alt="Ícone de arquivo"
          className="w-8 h-8" // ajuste o tamanho da imagem conforme necessário
        />
      </div>

      <Input
        required
        name="name"
        legend="NOME"
        type="name"
        placeholder="Seu nome completo"
        // onChange={(e) => setName(e.target.value)}
        icon={user}
      />

      <Input
        required
        name="telefone"
        legend="TELEFONE"
        type="telefone"
        placeholder="(00) 0000-0000"
        // onChange={(e) => setPhone(e.target.value)}
        icon={call}
      />

      <h1 className="mt-12 font-bold text-gray-500">Acesso</h1>

      <Input
        name="email"
        required
        legend="E-MAIL"
        type="email"
        placeholder="Seu e-mail de acesso"
        icon={envelope}
      />

      <Input
        name="password"
        required
        legend="SENHA"
        type="password"
        placeholder="Senha de acesso"
        icon={key}
      />

      <Input
        name="password"
        required
        legend="CONFIRMAR SENHA"
        type="password"
        placeholder="Confirme a senha"
        icon={key}
      />

      <Button type="submit" isLoading={isLoading} className="mt-12">
        Cadastrar
      </Button>


    </form>
  )
}