import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from './components/providers/theme-provider'
import { cn } from '@/lib/utils'
import { ModalProvider } from './components/providers/modal-providers'

const inter = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Discord',
  description: 'created by Suraj Maurya',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    
      <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className,"bg-white dark:bg-[#313338]")}>
        <ThemeProvider attribute='class' defaultTheme='dark' enableSystem={false} storageKey='discord-theme'>
          <ModalProvider />
        {children}
        </ThemeProvider>
        </body>
    </html>
   
  )
}
