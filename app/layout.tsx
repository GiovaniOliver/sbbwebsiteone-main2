import './globals.css'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from "@/app/components/ui/toaster"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'SBB DAO',
  description: 'Community-driven decentralized platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider
      appearance={{
        elements: {
          formButtonPrimary: 'bg-blue-600 hover:bg-blue-700 text-sm normal-case',
          footerActionLink: 'text-blue-600 hover:text-blue-700',
          card: 'bg-white shadow-md',
          headerTitle: 'text-gray-900 font-bold',
          headerSubtitle: 'text-gray-600',
          socialButtonsBlockButton: 'border-gray-200 hover:bg-gray-50',
          socialButtonsBlockButtonText: 'text-gray-600 font-medium',
          formFieldLabel: 'text-gray-700',
          formFieldInput: 'border-gray-300 focus:border-blue-500 focus:ring-blue-500',
          dividerLine: 'bg-gray-200',
          dividerText: 'text-gray-500',
          formResendCodeLink: 'text-blue-600 hover:text-blue-700',
          identityPreviewText: 'text-gray-700',
          identityPreviewEditButton: 'text-blue-600 hover:text-blue-700',
        },
      }}
    >
      <html lang="en">
        <body className={inter.className}>
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  )
}
