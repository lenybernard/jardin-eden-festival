import {ThemeSwitcher} from "@/components/theme-switcher";
import {GeistSans} from "geist/font/sans";
import "./globals.css";
import Image from "next/image";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Jardin d'Eden Festival",
  description: "Découvrez un festival unique où la musique, la nature et la culture se rencontrent dans un cadre enchanteur. Le Jardin d'Eden Festival vous attend pour une célébration inoubliable de la musique live, de la gastronomie locale et des échanges culturels, dans le magnifique lieu nommé \"Le Paradis\", situé à Gétigné.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <html lang="fr" className={GeistSans.className} suppressHydrationWarning>
      <meta charSet="UTF-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <meta httpEquiv="X-UA-Compatible" content="ie=edge"/>
      <body className="bg-background text-foreground" style={{backgroundColor: "#d6c09e"}}>
        <main>
          {children}
          <div className={"flex justify-center"}>
            <Image src={"/cover.webp"} alt="logo" width={1000} height={1000}/>
          </div>

          <footer style={{backgroundColor: "#ac8b5d"}} className="text-white py-6">
            <div className="container mx-auto text-center">
              <p>&copy; {new Date().getFullYear()} Le Jardin d'Eden Festival.</p>
              <p>Contact: amaury.cornut@gmail.com | 06 73 29 01 02</p>
              <p>
                Code source disponible sur <a href="https://github.com/lenybernard/jardin-eden-festival">Github</a>
              </p>
            </div>
            <ThemeSwitcher/>
          </footer>
        </main>
      </body>
      </html>
  );
}
