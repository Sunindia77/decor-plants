import type { Metadata } from "next";
import { headers } from "next/headers";
import AccountPanel from "@/components/AccountPanel";
import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Your account",
  robots: { index: false, follow: false },
};

export default async function AccountPage() {
  await headers();

  return (
    <main className="shop-page">
      <Header />
      <section className="shop-auth-page shop-account-auth-page">
        <AccountPanel />
      </section>
      <SiteFooter />
    </main>
  );
}
