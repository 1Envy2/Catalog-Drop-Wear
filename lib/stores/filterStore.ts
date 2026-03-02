import { create } from "zustand";
import { Filter } from "@/lib/schemas/product";

interface FilterState {
  filters: Filter;
  setFilters: (filters: Filter) => void;
  setSearch: (search: string) => void;
  setCategory: (category: string) => void;
  setSize: (size: string) => void;
  setColor: (color: string) => void;
  setPriceRange: (minPrice: number, maxPrice: number) => void;
  resetFilters: () => void;
}

const initialFilters: Filter = {
  search: "",
  category: undefined,
  size: undefined,
  color: undefined,
  minPrice: undefined,
  maxPrice: undefined,
};

export const useFilterStore = create<FilterState>((set) => ({
  filters: initialFilters,

  setFilters: (filters) => set({ filters }),

  setSearch: (search) =>
    set((state) => ({
      filters: { ...state.filters, search },
    })),

  setCategory: (category) =>
    set((state) => ({
      filters: {
        ...state.filters,
        category: category === "all" ? undefined : category,
      },
    })),

  setSize: (size) =>
    set((state) => ({
      filters: { ...state.filters, size: size === "all" ? undefined : size },
    })),

  setColor: (color) =>
    set((state) => ({
      filters: { ...state.filters, color: color === "all" ? undefined : color },
    })),

  setPriceRange: (minPrice, maxPrice) =>
    set((state) => ({
      filters: {
        ...state.filters,
        minPrice: minPrice || undefined,
        maxPrice: maxPrice || undefined,
      },
    })),

  resetFilters: () => set({ filters: initialFilters }),
}));
