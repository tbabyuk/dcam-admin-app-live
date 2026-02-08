import './globals.css'
import { Inter } from 'next/font/google'
import { AuthContextProvider } from '@/context/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "DCAM | Admin",
  description: "DCAM Admin App",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthContextProvider>
        <body className={`${inter.className}`}>
            {children}
        </body>
      </AuthContextProvider>
    </html>
  )
}
