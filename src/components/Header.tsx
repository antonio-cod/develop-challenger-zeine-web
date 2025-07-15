import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logoSvg from "../assets/Logo.png";
import dashboard from "../assets/chart-histogram.png";
import product from "../assets/product.png";
import userImage from "../assets/user.png";
import { useAuth } from "../hooks/useAuth";

export function Header() {
  const auth = useAuth();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Fecha o menu se clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full h-20 flex items-center justify-between px-8 py-4 bg-background border-b border-gray-100">
      {/* Logo à esquerda */}
      <div className="flex items-center gap-4">
        <img src={logoSvg} alt="Logo" className="h-10 w-auto" />
      </div>

      {/* Centralizado: Navegação */}
      <div className="flex gap-10 items-center">
        <div
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => navigate("/dashboard")}
        >
          <img
            src={dashboard}
            alt="Dashboard"
            className="w-6 h-6 group-hover:opacity-80 transition"
          />
          <span className="text-sm text-gray-600">Dashboard</span>
        </div>

        <div
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => navigate("/products")}
        >
          <img
            src={product}
            alt="Produtos"
            className="w-6 h-6 group-hover:opacity-80 transition"
          />
          <span className="text-sm text-gray-600">Produtos</span>
        </div>
      </div>

      {/* Botão + Imagem do usuário */}
      <div className="relative flex items-center gap-4" ref={menuRef}>
        <button
          onClick={() => navigate("/productCreate")}
          className="w-[202.1px] h-10 bg-orange-base text-white rounded-lg hover:bg-orange-dark transition"
        >
          Novo produto
        </button>

        <img
          src={userImage}
          alt="Usuário"
          className="w-10 h-10 rounded-full object-cover cursor-pointer"
          onClick={() => setMenuOpen(prev => !prev)}
        />

        {/* Dropdown de usuário */}
        {menuOpen && (
          <div className="absolute right-0 top-14 bg-white border border-gray-200 shadow-lg rounded-lg w-40 z-50">
            <span className="text-sm font-semibold text-gray-200">
          Olá, {auth.session?.user.name}
          </span>
            <button
              onClick={() => auth.remove()}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              Sair
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
