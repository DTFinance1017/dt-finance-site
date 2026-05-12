import { DEMO_CLIENTES, DemoCliente } from "@/data/demoClientes";

interface Props {
  selected: string;
  onChange: (id: string) => void;
}

export function ClienteSwitcher({ selected, onChange }: Props) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-xs text-white/35 uppercase tracking-widest font-medium">Modo Demo</span>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#f0c040]/15 text-[#f0c040] border border-[#f0c040]/25 font-semibold">DEMO</span>
        <span className="text-[10px] text-white/25">Clique para alternar entre os perfis de cliente</span>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {DEMO_CLIENTES.map((c: DemoCliente) => {
          const isActive = c.id === selected;
          return (
            <button
              key={c.id}
              onClick={() => onChange(c.id)}
              className={`text-left rounded-xl border p-3.5 transition-all duration-200 ${isActive ? "ring-1" : "hover:border-white/15 hover:bg-white/3"}`}
              style={{
                borderColor: isActive ? c.cor : "rgba(255,255,255,0.08)",
                background: isActive ? c.corBg : "rgba(6,13,30,0.6)",
                ringColor: isActive ? c.cor : undefined,
                boxShadow: isActive ? `0 0 0 1px ${c.cor}` : undefined,
              }}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold flex-shrink-0" style={{ background: `${c.cor}25`, color: c.cor }}>
                  {c.sigla}
                </div>
                <span className="text-[9px] px-1.5 py-0.5 rounded-full font-semibold" style={{ background: `${c.cor}20`, color: c.cor }}>
                  {c.pacoteLabel}
                </span>
              </div>
              <div className="text-xs font-semibold text-white/85 leading-tight mb-0.5">{c.nome}</div>
              <div className="text-[10px] text-white/35">{c.setor}</div>
              <div className="text-[10px] text-white/25 mt-1">{c.faturamento}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
