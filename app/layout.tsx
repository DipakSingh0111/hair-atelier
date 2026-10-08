import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Montserrat,
  Playfair_Display,
} from "next/font/google";
import Footer from "@/components/Footer";
import { MotionProvider } from "@/components/motion";
import Navbar from "@/components/Navbar";
import rawData from "@/data/hair-atelier.json";
import type { HairAtelierTemplateData } from "@/types/hair-atelier.types";
import "./globals.css";

const templateData: HairAtelierTemplateData = rawData;
const sectionData = templateData.categories.HairAtelier.sections;

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Hair Atelier",
  description: "Hair Atelier - Premium hair salon",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${cormorant.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <MotionProvider>
          <Navbar data={sectionData.Header.variants.HairAtelierHeader1} />
          {children}
          <Footer data={sectionData.Footer.variants.HairAtelierFooter1} />
        </MotionProvider>
      </body>
    </html>
  );
}
