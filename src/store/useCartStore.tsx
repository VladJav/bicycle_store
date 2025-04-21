import { create } from 'zustand';

interface CartState {
  isOpen: boolean;
  toggleCart: () => void;
  items: string[];
  addToCart: (item: string) => void;
  removeFromCart: (id: string) => void;
  removeOneItem: (id: string) => void;
  setIsOpen: (isOpen: boolean) => void;
}

const useCartStore = create<CartState>((set) => ({
  isOpen: false,
  items: [],
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  setIsOpen: (isOpen: boolean) => set({ isOpen }),
  addToCart: (item) => set((state) => ({ items: [...state.items, item] })),
  removeFromCart: (id) =>
    set((state) => ({ items: state.items.filter((item) => item !== id) })),
  removeOneItem: (id) =>
    set((state) => ({
      items: state.items.filter((_, index) => index !== state.items.indexOf(id)),
    })),
}));

export default useCartStore;
