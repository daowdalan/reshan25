import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

const inter = Inter({ subsets: ['latin'] })



export default function RootLayout({ children }) {
  return (
    <html  lang="en">
    <head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link href="https://fonts.googleapis.com/css2?family=Italianno&display=swap" rel="stylesheet" />

    </head>
    
      <body className={inter.className}>
        <main className="flex min-h-screen flex-col bg-[#ffffff]">
        <Navbar />
         {children}
        <Footer />
        </main>
      </body>
    </html>
  )
}