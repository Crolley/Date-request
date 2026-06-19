import type { Metadata } from "next"
import { Nunito, Playfair_Display } from "next/font/google"
import "./globals.css"

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-kawaii",
})

const playfair = Playfair_Display({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-romantic",
})

export const metadata: Metadata = {
  title: "Date Request 💌",
  description: "Propose un rendez-vous de façon inoubliable",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${nunito.variable} ${playfair.variable} h-full`}>
      <body className="min-h-full">{children}</body>
    </html>
  )
}
