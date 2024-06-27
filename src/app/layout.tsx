import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"
import { koKR } from "@clerk/localizations"

import { Toaster } from "@/components/ui/sonner"
import { ConfettiProvider } from "@/components/providers/confetti-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TeachLearn",
  description: "배움의 즐거움",
  icons: {
    icon: "/logo.svg"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider localization={koKR} >
      <html lang="en">
        <body className={inter.className}>
          {children}
          <ConfettiProvider/>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  )
}
