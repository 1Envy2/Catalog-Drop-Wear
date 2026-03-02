import { create } from 'zustand';

interface FilterState {
  category: string;
  minPrice: number;
  maxPrice: number;
  search: string;
  setCategory: (category: string) => void;
  setPriceRange: (min: number, max: number) => void;
  setSearch: (query: string) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  category: "Semua",
  minPrice: 0,
  maxPrice: 2000000,
  search: "",

  setCategory: (category) => set({ category }),
  setPriceRange: (min, max) => set({ minPrice: min, maxPrice: max }),
  setSearch: (search) => set({ search }),
  resetFilters: () => set({ 
    category: "Semua", 
    minPrice: 0, 
    maxPrice: 2000000, 
    search: "" 
  }),
}));