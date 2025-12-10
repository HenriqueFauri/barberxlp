import Link from 'next/link';
import { cn } from '@/lib/utils';
import Image from 'next/image';

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <Link href="/" className={cn('flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background rounded-sm', className)} aria-label="Página inicial do BarberX">
      <Image src="/Logo.png" alt="BarberX Logo" width={36} height={36} className="h-9 w-9" />
      <h1 className="text-3xl font-headline font-bold tracking-tight text-foreground">
        BarberX
      </h1>
    </Link>
  );
}
