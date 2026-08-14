import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>
      <body className={`antialiased bg-background text-foreground`}>
        {children}
      </body>
    </html>
  );
}
