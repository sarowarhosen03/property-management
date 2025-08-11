import { create } from "zustand";

interface AppState {
  selectedCategory: string | null;
  setSelectedCategory: Function;
  isContractBased: boolean;
  setIsContractBased: (isContractBased: boolean) => void;
}

const useStore = create<AppState>((set) => ({
  selectedCategory: null,
  setSelectedCategory: (category: string) =>
    set({ selectedCategory: category }),
  isContractBased: false,
  setIsContractBased: (isContractBased: boolean) => set({ isContractBased }),
}));

export default useStore;
