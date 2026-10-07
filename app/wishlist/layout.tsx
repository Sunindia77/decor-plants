import { headers } from "next/headers";
import type { ReactNode } from "react";

export default async function WishlistLayout({ children }: { children: ReactNode }) {
  await headers();
  return children;
}
