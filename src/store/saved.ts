import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SavedState {
  productIds: string[];
  toggle: (productId: string) => void;
  isSaved: (productId: string) => boolean;
}

export const useSavedStore = create<SavedState>()(
  persist(
    (set, get) => ({
      productIds: [],
      toggle: (productId) =>
        set((state) => ({
          productIds: state.productIds.includes(productId)
            ? state.productIds.filter((id) => id !== productId)
            : [...state.productIds, productId],
        })),
      isSaved: (productId) => get().productIds.includes(productId),
    }),
    { name: "nihol-saved" }
  )
);
