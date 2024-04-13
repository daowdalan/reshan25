import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

const inter = Inter({ subsets: ['latin'] })



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex min-h-screen flex-col bg-[#121212]">
        <Navbar />
         {children}
        <Footer />
        </main>
      </body>
    </html>
  )
}
