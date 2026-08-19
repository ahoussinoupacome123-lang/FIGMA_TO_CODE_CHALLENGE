import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { ToastProvider } from "@/lib/toast";
import { GeoProvider } from "@/lib/geo";

export const metadata: Metadata = {
  title: "HemoLink — Tout savoir sur le don de sang au Bénin",
  description:
    "Ressource de référence pour les futurs donneurs de sang au Bénin. Vérifiez votre éligibilité, trouvez un centre de transfusion et comprenez chaque étape du don.",
  keywords: [
    "don de sang",
    "donner son sang",
    "éligibilité don de sang",
    "transfusion sanguine",
    "réserves de sang",
    "HemoLink",
    "Bénin",
    "Cotonou",
    "CNTS",
  ],
  authors: [{ name: "HemoLink Team" }],
  openGraph: {
    title: "HemoLink — Don de sang au Bénin",
    description:
      "Vérifiez votre éligibilité, trouvez un centre et comprenez le don de sang.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin="anonymous"
        />
      </head>
      <body className={`antialiased bg-background text-foreground`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:bg-crimson focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-semibold focus:outline-none"
        >
          Aller au contenu principal
        </a>
        <ToastProvider>
          <GeoProvider>
            {children}
          </GeoProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
