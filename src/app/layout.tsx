import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { AsistenteFlotante } from "@/components/layout/AsistenteFlotante";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";
import { CartDrawer } from "@/components/cart/CartDrawer";


const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Centro de Diagnóstico Muñoz",
  description:
    "Análisis clínicos, atención a domicilio y salud ocupacional en Arequipa y Lima.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${figtree.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <AsistenteFlotante />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}