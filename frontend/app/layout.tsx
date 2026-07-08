import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Croissant-Rouge Tunisien â€” ComitÃ© RÃ©gional de Gafsa",
  description:
    "Le ComitÃ© RÃ©gional de Gafsa du Croissant-Rouge Tunisien â€” secours, soin et solidaritÃ© pour les familles du sud tunisien.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-stone-50 text-stone-800 flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}
