import { useState, FormEvent } from "react";
import { useLocation } from "wouter";
import { LogIn, Eye, EyeOff, AlertCircle } from "lucide-react";
import { login } from "../utils/auth";

export default function Login() {
  const [, navigate] = useLocation();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      const role = login(user.trim(), pass);
      if (role === "interno") {
        navigate("/interno");
      } else if (role === "cliente") {
        navigate("/dashboard");
      } else {
        setError("Usuário ou senha incorretos.");
        setLoading(false);
      }
    }, 600);
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background: "#2a2a2e",
        backgroundImage: "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(30,64,175,0.10) 0%, transparent 70%)",
      }}
    >
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <img
            src="/logo-dt-v2.png"
            alt="DT Finance"
            onClick={() => navigate("/")}
            className="h-12 w-auto mx-auto mb-4 object-contain cursor-pointer hover:opacity-80 transition-opacity"
          />
          <h1 style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl font-bold text-[#1B4158]">
            Acesso à Plataforma
          </h1>
          <p className="text-sm text-[#1B4158]/50 mt-1">
            Entre com seu login e senha
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-[#1B4158]/10 p-7 space-y-5"
          style={{ background: "#313136" }}
        >
          <div>
            <label className="block text-xs text-[#1B4158]/60 mb-1.5 font-medium uppercase tracking-wide">
              Usuário
            </label>
            <input
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              placeholder="Seu login"
              required
              className="w-full px-4 py-3 rounded-xl bg-[#2a2a2e] border border-[#1B4158]/12 text-[#1B4158] placeholder-white/25 text-sm outline-none focus:border-[#3b82f6]/60 focus:ring-1 focus:ring-[#3b82f6]/30 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs text-[#1B4158]/60 mb-1.5 font-medium uppercase tracking-wide">
              Senha
            </label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 pr-11 rounded-xl bg-[#2a2a2e] border border-[#1B4158]/12 text-[#1B4158] placeholder-white/25 text-sm outline-none focus:border-[#3b82f6]/60 focus:ring-1 focus:ring-[#3b82f6]/30 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1B4158]/38 hover:text-[#1B4158]/72 transition-colors"
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              <AlertCircle size={14} className="flex-shrink-0" />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-gold w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Entrando...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <LogIn size={16} /> Entrar
              </span>
            )}
          </button>
        </form>

        <div className="text-center mt-5">
          <button
            onClick={() => navigate("/")}
            className="text-sm text-[#1B4158]/50 hover:text-white/70 transition-colors underline underline-offset-2"
          >
            ← Voltar para a Página Inicial
          </button>
        </div>

        <p className="text-center text-xs text-[#1B4158]/27 mt-5">
          DT Finance — Acesso restrito
        </p>
      </div>
    </div>
  );
}
