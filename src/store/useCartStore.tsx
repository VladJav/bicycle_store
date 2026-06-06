import { create } from 'zustand';

interface CartItem {
  id: string;
  color: string;
  quantity: number;
}

interface CartState {
  isOpen: boolean;
  toggleCart: () => void;
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string, color: string) => void;
  removeOneItem: (id: string, color: string) => void;
  setIsOpen: (isOpen: boolean) => void;
  clearCart: () => void;
}

const useCartStore = create<CartState>((set) => ({
  isOpen: false,
  items: [],
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  setIsOpen: (isOpen: boolean) => set({ isOpen }),
  addToCart: (item) => set((state) => {
    const existingItem = state.items.find((i) => i.id === item.id && i.color === item.color);
    if (existingItem) {
      return {
        items: state.items.map((i) =>
          i.id === item.id && i.color === item.color
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        ),
      };
    }
    return { items: [...state.items, item] };
  }),
  removeFromCart: (id, color) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id || item.color !== color),
    })),
  removeOneItem: (id, color) =>
    set((state) => {
      const item = state.items.find((i) => i.id === id && i.color === color);
      if (!item) return state;
      
      if (item.quantity > 1) {
        return {
          items: state.items.map((i) =>
            i.id === id && i.color === color ? { ...i, quantity: i.quantity - 1 } : i
          ),
        };
      }
      return { items: state.items.filter((i) => i.id !== id || i.color !== color) };
    }),
  clearCart: () => set({ items: [] }),
}));

export default useCartStore;
