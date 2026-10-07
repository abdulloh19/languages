import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Tilsevar - Til o‘rganish super ilovasi',
  description: 'Ingliz va rus tillarini mnemotexnika, jonli dialoglar va o‘yinlar orqali o‘rganing',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz">
      <head>
        <script src="https://telegram.org/js/telegram-web-app.js" async />
      </head>
      <body className="min-h-screen bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-slate-100 antialiased selection:bg-indigo-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
