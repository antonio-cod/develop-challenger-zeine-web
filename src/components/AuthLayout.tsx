import { Outlet } from "react-router";
import logo from "../assets/Logo.png";
import background from "../assets/Imagens.png";

export function AuthLayout() {
  return (
    <div className="w-screen h-screen bg-background flex items-center justify-center">
      <div className="flex flex-row gap-12 items-start">
        {/* Coluna da esquerda */}
        <div className="flex flex-col">
          {/* Logo + Título e Subtítulo */}
          <div className="flex flex-row items-center gap-5 mt-6 ml-6 mb-6">
            {/* Logo */}
            <img
              src={logo}
              alt="Logo"
              className="w-[90.36px] h-[68.65px] object-contain"
            />

            {/* Título e Subtítulo */}
            <div>
              <h1 className="text-xl font-bold text-gray-500">Marketplace</h1>
              <p className="text-sm text-gray-400">Painel de Vendedor</p>
            </div>
          </div>

          {/* Imagem abaixo da logo */}
          <div className="w-[755px] h-[496px] ml-6">
            <img
              src={background}
              alt="Ilustração"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>

        {/* Área principal (formulário) */}
        <main className="bg-white p-8 rounded-3xl flex items-center flex-col w-[563px] h-[720px]">

          <h1 className="bold text-gray-500">Acesse sua Conta</h1>

          <p className="text-xxs mb-2 text-gray-300">Informe seu e-mail e senha para entrar</p>



          <Outlet />
        </main>
      </div>
    </div>
  );
}
