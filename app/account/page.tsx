import type { Metadata } from "next";
import AccountPanel from "@/components/AccountPanel";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Your account",
  robots: { index: false, follow: false },
};

export default function AccountPage() {
  return (
    <main className="shop-page">
      <Header />
      <section className="shop-auth-page shop-account-auth-page">
        <AccountPanel />
      </section>
    </main>
  );
}
