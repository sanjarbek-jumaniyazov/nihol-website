import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartLine } from "@/lib/types";

interface CartState {
  lines: CartLine[];
  addItem: (kind: CartLine["kind"], id: string, quantity?: number) => void;
  removeItem: (kind: CartLine["kind"], id: string) => void;
  setQuantity: (kind: CartLine["kind"], id: string, quantity: number) => void;
  clear: () => void;
}

function sameLine(a: CartLine, kind: CartLine["kind"], id: string) {
  return a.kind === kind && a.id === id;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      addItem: (kind, id, quantity = 1) =>
        set((state) => {
          const existing = state.lines.find((l) => sameLine(l, kind, id));
          if (existing) {
            return {
              lines: state.lines.map((l) =>
                sameLine(l, kind, id) ? { ...l, quantity: l.quantity + quantity } : l
              ),
            };
          }
          return { lines: [...state.lines, { kind, id, quantity } as CartLine] };
        }),
      removeItem: (kind, id) =>
        set((state) => ({ lines: state.lines.filter((l) => !sameLine(l, kind, id)) })),
      setQuantity: (kind, id, quantity) =>
        set((state) => ({
          lines:
            quantity <= 0
              ? state.lines.filter((l) => !sameLine(l, kind, id))
              : state.lines.map((l) => (sameLine(l, kind, id) ? { ...l, quantity } : l)),
        })),
      clear: () => set({ lines: [] }),
    }),
    { name: "nihol-cart-v2" }
  )
);

export function useCartCount() {
  return useCartStore((state) => state.lines.reduce((sum, l) => sum + l.quantity, 0));
}

export function useTreeCountInCart() {
  return useCartStore((state) =>
    state.lines.filter((l) => l.kind === "tree_package").reduce((sum, l) => sum + l.quantity, 0)
  );
}
