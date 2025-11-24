import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Appable - Mobile App Design Generator',
  description: 'Generate mobile app UI designs from natural language',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
