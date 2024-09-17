import {GeistSans} from "geist/font/sans";
import "./globals.css";
import Image from "next/image";
import {Anchor} from "@/components/ui/Anchor";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Jardin d'Eden - Gétigné",
  description: "Découvrez un festival unique où la musique, la nature et la culture se rencontrent dans un cadre enchanteur. Le Jardin d'Eden Festival vous attend pour une célébration inoubliable de la musique live, de la gastronomie locale et des échanges culturels, dans le magnifique lieu nommé \"Le Paradis\", à Gétigné.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <html lang="fr" className={GeistSans.className}>
      <meta charSet="UTF-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <link rel="icon" href="/favicon.ico" sizes="any"/>
      <meta httpEquiv="X-UA-Compatible" content="ie=edge"/>
      <meta httpEquiv="X-UA-Compatible" content="ie=edge"/>
      <meta property="og:image" content="/opengraph-image.png"/>
      <body className="bg-background text-foreground" style={{backgroundColor: "#d6c09e"}}>
      <main>
          {children}
          <div className={"flex justify-center"}>
              <Image src={"/cover.webp"} alt="logo" width={1000} height={1000}/>
          </div>

          <footer style={{backgroundColor: "#ac8b5d"}} className="text-white py-6">
              <Anchor id={"contact"}/>
              <div className="container mx-auto text-center">
                  <p>Le Jardin d'Eden.</p>
                  <p>Contact: amaury.cornut@gmail.com | 06 73 29 01 02</p>
                  <p>
                      Code source disponible sur <a
                      href="https://github.com/lenybernard/jardin-eden-festival">Github</a>
                  </p>
              </div>
          </footer>
      </main>
      </body>
      </html>
  );
}
