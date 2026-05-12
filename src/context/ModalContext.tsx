import { createContext, useContext, useState } from "react";
import { ContatoModal } from "@/components/ContatoModal";

export type ModalSource = "diagnostico" | "checklist";

interface ModalContextType {
  openModal: (source?: ModalSource) => void;
}

const ModalContext = createContext<ModalContextType>({ openModal: () => {} });

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState<ModalSource>("diagnostico");

  return (
    <ModalContext.Provider
      value={{ openModal: (src: ModalSource = "diagnostico") => { setSource(src); setOpen(true); } }}
    >
      {children}
      <ContatoModal open={open} source={source} onClose={() => setOpen(false)} />
    </ModalContext.Provider>
  );
}

export const useModal = () => useContext(ModalContext);
