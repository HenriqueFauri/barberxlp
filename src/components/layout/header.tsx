"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/logo';
import { motion } from 'framer-motion';

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#funcoes', label: 'Funções' },
  { href: '#precos', label: 'Preços' },
  { href: '#faq', label: 'FAQ' },
];

export function Header() {
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState('#home');
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => document.getElementById(link.href.substring(1)));
      const scrollPosition = window.scrollY + 100;
      
      setIsScrolled(window.scrollY > 10);

      for (const section of sections) {
        if (section && scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
          setActiveLink(`#${section.id}`);
          break;
        }
      }
    };

    if (pathname === '/') {
      window.addEventListener('scroll', handleScroll);
      handleScroll(); // Set initial active link
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [pathname]);
  
  const NavLink = ({ href, label, mobile = false }: { href: string; label: string; mobile?: boolean }) => {
    const isHomePath = pathname === '/';

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (isHomePath) {
            e.preventDefault();
            document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
        }
        if (mobile) {
            setSheetOpen(false);
        }
    };

    return (
        <Link
          href={isHomePath ? href : `/${href}`}
          onClick={handleClick}
          className={cn(
              "text-base font-medium transition-colors hover:text-primary",
              (isHomePath && activeLink === href) ? "text-primary" : "text-muted-foreground"
          )}
        >
          {label}
        </Link>
    );
  };

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full border-b transition-colors",
      isScrolled ? "border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60" : "border-transparent bg-transparent"
    )}>
      <div className="container flex h-20 items-center justify-between px-4 md:px-6">
        <Logo />
        
        <nav className="hidden items-center space-x-8 text-sm md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <motion.div whileTap={{ scale: 0.95 }} className="hidden md:flex">
            <Button asChild>
              <Link href="#contato">Fale Conosco</Link>
            </Button>
          </motion.div>
          <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-secondary/95 backdrop-blur w-[80vw]">
                <SheetHeader>
                  <SheetTitle className="sr-only">Menu de Navegação</SheetTitle>
                </SheetHeader>
              <div className="p-4">
                <Logo />
                <nav className="mt-8 flex flex-col gap-6">
                  {navLinks.map((link) => (
                    <NavLink key={link.href} {...link} mobile />
                  ))}
                  <Button asChild className="mt-4">
                    <Link href="#contato" onClick={() => setSheetOpen(false)}>Fale Conosco</Link>
                  </Button>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
