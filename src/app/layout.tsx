import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import './globals.css';
import { Inter, Roboto } from 'next/font/google';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-roboto',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'BarberX - A solução inteligente para sua barbearia',
  description: 'BarberX é a solução SaaS completa para gerenciamento de barbearias, agendamentos, faturamento e fidelização de clientes.',
  keywords: ['barbearia', 'saas', 'agendamento', 'gestão', 'software para barbearia'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${roboto.variable} ${inter.variable} font-body antialiased flex flex-col min-h-screen bg-gradient-primary text-foreground`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
