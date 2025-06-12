import { Inter } from "next/font/google";
import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Footer from "@/components/Footer";
import Cta from "@/components/Cta";
import Divider from "@/components/Divider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Gainly",
  description: "Personal Finance Platform",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en" className="dark">
        <head>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
            integrity="sha512-..."
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          />
        </head>
        <body className={`inter.className bg-[#050709]`}>

          {children}
          <div className=" w-full " >
            <Cta />
            <Divider />
            <Footer />
            </div>

        </body>
      </html>
    </ClerkProvider>
  );
}
