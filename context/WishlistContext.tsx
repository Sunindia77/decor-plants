"use client";

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from "react";
import type { ReactNode } from "react";
import { products } from "@/data/products";

interface WishlistContextValue {
  ids: string[];
  ready: boolean;
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);
const WISHLIST_STORAGE_KEY = "decor-plants-wishlist";
const listeners = new Set<() => void>();

function readSnapshot(): string {
  try {
    return window.localStorage.getItem(WISHLIST_STORAGE_KEY) ?? "[]";
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

function parseWishlist(snapshot: string): string[] {
  try {
    const value: unknown = JSON.parse(snapshot);
    return Array.isArray(value)
      ? value.filter(
          (id: unknown): id is string =>
            typeof id === "string" && products.some((product) => product.id === id),
        )
      : [];
  } catch {
    return [];
  }
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const snapshot = useSyncExternalStore(subscribe, readSnapshot, () => "[]");
  const ready = useSyncExternalStore(subscribe, () => true, () => false);
  const ids = useMemo(() => parseWishlist(snapshot), [snapshot]);

  const toggleWishlist = useCallback((productId: string) => {
    const current = parseWishlist(readSnapshot());
    const next = current.includes(productId)
      ? current.filter((id) => id !== productId)
      : [...current, productId];
    window.localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(next));
    listeners.forEach((listener) => listener());
  }, []);
  const isWishlisted = useCallback((productId: string) => ids.includes(productId), [ids]);

  const value = useMemo(
    () => ({ ids, ready, toggleWishlist, isWishlisted }),
    [ids, ready, toggleWishlist, isWishlisted],
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist(): WishlistContextValue {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used within a WishlistProvider");
  return context;
}
