"use client";

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from "react";
import type { ReactNode } from "react";
import { products } from "@/data/products";
import type { CartItem } from "@/types/product";

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  ready: boolean;
  addToCart: (productId: string, quantity?: number) => void;
  setQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);
const CART_STORAGE_KEY = "decor-plants-cart";
const listeners = new Set<() => void>();

function readSnapshot(): string {
  try {
    return window.localStorage.getItem(CART_STORAGE_KEY) ?? "[]";
  } catch {
    return "[]";
  }
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function parseStoredItems(snapshot: string): CartItem[] {
  try {
    const value: unknown = JSON.parse(snapshot);
    if (!Array.isArray(value)) return [];

    return value.flatMap((entry: unknown) => {
      if (typeof entry !== "object" || entry === null || !("productId" in entry) || !("quantity" in entry)) {
        return [];
      }
      const { productId, quantity } = entry;
      if (
        typeof productId !== "string" ||
        typeof quantity !== "number" ||
        !Number.isInteger(quantity) ||
        quantity < 1 ||
        !products.some((product) => product.id === productId)
      ) {
        return [];
      }
      const stock = products.find((product) => product.id === productId)?.stock ?? 0;
      return stock > 0 ? [{ productId, quantity: Math.min(quantity, stock) }] : [];
    });
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const snapshot = useSyncExternalStore(subscribe, readSnapshot, () => "[]");
  const ready = useSyncExternalStore(subscribe, () => true, () => false);
  const items = useMemo(() => parseStoredItems(snapshot), [snapshot]);

  const updateItems = useCallback((update: (current: CartItem[]) => CartItem[]) => {
    const nextItems = update(parseStoredItems(readSnapshot()));
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(nextItems));
    listeners.forEach((listener) => listener());
  }, []);

  const addToCart = useCallback((productId: string, quantity = 1) => {
    const product = products.find((entry) => entry.id === productId);
    if (!product || product.stock === 0) return;
    const amount = Math.max(1, Math.floor(quantity));
    updateItems((current) => {
      const existing = current.find((item) => item.productId === productId);
      if (!existing) return [...current, { productId, quantity: Math.min(amount, product.stock) }];
      return current.map((item) =>
        item.productId === productId
          ? { ...item, quantity: Math.min(item.quantity + amount, product.stock) }
          : item,
      );
    });
  }, [updateItems]);

  const setQuantity = useCallback((productId: string, quantity: number) => {
    const product = products.find((entry) => entry.id === productId);
    if (!product) return;
    if (quantity < 1) {
      updateItems((current) => current.filter((item) => item.productId !== productId));
      return;
    }
    updateItems((current) =>
      current.map((item) =>
        item.productId === productId
          ? { ...item, quantity: Math.min(Math.floor(quantity), product.stock) }
          : item,
      ),
    );
  }, [updateItems]);

  const removeFromCart = useCallback(
    (productId: string) => updateItems((current) => current.filter((item) => item.productId !== productId)),
    [updateItems],
  );

  const clearCart = useCallback(() => updateItems(() => []), [updateItems]);

  const value = useMemo(
    () => ({
      items,
      itemCount: items.reduce((count, item) => count + item.quantity, 0),
      ready,
      addToCart,
      setQuantity,
      removeFromCart,
      clearCart,
    }),
    [items, ready, addToCart, setQuantity, removeFromCart, clearCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}
