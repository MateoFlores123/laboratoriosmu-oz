"use client";

import { createContext, useContext, useMemo, useState, useSyncExternalStore, type ReactNode } from "react";
import type { LabService } from "@/config/services";

type CartContextValue = {
  items: LabService[];
  addItem: (item: LabService) => void;
  removeItem: (id: string) => void;
  clear: () => void;
  isInCart: (id: string) => boolean;
  // Controla el panel lateral (drawer) del carrito, para poder abrirlo desde
  // cualquier botón del sitio (ej. al agregar un análisis) sin navegar de página.
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "munoz-carrito";

// --- Almacén externo (localStorage) para el carrito -------------------------
// Se usa useSyncExternalStore (la API oficial de React para sincronizarse con
// algo fuera de React, como localStorage) en vez de leer en un useEffect y
// luego llamar setState: eso es justo el patrón que React 19 marca como
// advertencia ("Calling setState synchronously within an Effect..."), porque
// puede evitarse por completo con esta API, pensada exactamente para esto.
type Listener = () => void;
let cachedItems: LabService[] | null = null;
const listeners = new Set<Listener>();

function readFromStorage(): LabService[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    // localStorage no disponible (modo privado, etc.): el carrito empieza vacío
    return [];
  }
}

function getSnapshot(): LabService[] {
  if (cachedItems === null) cachedItems = readFromStorage();
  return cachedItems;
}

// En el servidor no existe localStorage: el carrito arranca vacío ahí, y
// useSyncExternalStore se encarga de "ponerse al día" con el valor real del
// navegador apenas hidrata, sin parpadeos raros ni el warning de React.
function getServerSnapshot(): LabService[] {
  return [];
}

function subscribe(callback: Listener) {
  listeners.add(callback);
  // Bonus: si el carrito se modifica en OTRA pestaña, esta se entera y se
  // actualiza sola (evento nativo "storage", que no dispara en la misma pestaña).
  function onStorage(e: StorageEvent) {
    if (e.key === STORAGE_KEY) {
      cachedItems = null;
      callback();
    }
  }
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", onStorage);
  };
}

function setStoredItems(next: LabService[]) {
  cachedItems = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // se ignora si el navegador bloquea el guardado
  }
  listeners.forEach((l) => l());
}
// -----------------------------------------------------------------------------

// Carrito de análisis: solo junta lo que la persona quiere agendar (sin
// precios, porque todavía no hay catálogo de precios real). Vive en todo
// el sitio (se coloca en el layout) y se guarda en localStorage para que
// no se pierda si recarga la página.
export function CartProvider({ children }: { children: ReactNode }) {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [isOpen, setIsOpen] = useState(false);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      addItem: (item) => {
        const current = getSnapshot();
        if (current.some((p) => p.id === item.id)) return;
        setStoredItems([...current, item]);
      },
      removeItem: (id) => setStoredItems(getSnapshot().filter((p) => p.id !== id)),
      clear: () => setStoredItems([]),
      isInCart: (id) => items.some((p) => p.id === id),
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
    }),
    [items, isOpen]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return ctx;
}