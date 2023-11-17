import { Inter } from 'next/font/google'
import { Providers } from './redux/provider'
import Head from 'next/head'
const inter = Inter({ subsets: ['latin'] })
import '../../public/assets/css/styles.min.css';
export const metadata = {
  title: 'Team Ingenious',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
  <html lang="en">
  <Head>
  <meta charSet="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
      </Head>
      <body className={inter.className}>
          <Providers>
            {children}
          </Providers>
        </body>
    </html>
  )
}