import './globals.css'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { Providers } from './providers'
import { Toaster } from "@/app/components/ui/toaster"

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
})

export const metadata = {
  title: 'SBB DAO',
  description: 'Community-driven decentralized platform',
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#ffffff',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen bg-background antialiased">
        <ClerkProvider>
          <Providers>
            {children}
          </Providers>
        </ClerkProvider>
        <Toaster />
      </body>
    </html>
  )
}
