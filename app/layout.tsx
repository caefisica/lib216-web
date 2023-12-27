import type { Metadata } from 'next';
import { Jost } from 'next/font/google';
import { ReactNode } from 'react';
import { NextAuthProvider } from './components/NextAuthProvider';
import './globals.css';

const jost = Jost({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Biblioteca 216 - @caefisica',
  description:
    'Somos estudiantes de física (UNMSM) y nos hemos propuesto hacer tu viaje por la física más accesible',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={jost.className}>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
