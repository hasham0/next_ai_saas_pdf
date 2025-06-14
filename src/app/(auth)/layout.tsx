import { Metadata } from "next";
import BgGradient from "@/components/shared/bg-gradient";

export const metadata: Metadata = {
  title: "%s | Sommaire",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex min-h-[40vh] items-center justify-center">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-24">
        <BgGradient className="from-rose-400 via-rose-300 to-orange-200" />
        {children}
      </div>
    </section>
  );
}
