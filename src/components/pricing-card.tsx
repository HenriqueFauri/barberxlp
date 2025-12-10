"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const cardVariant = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const formatPrice = (price: number) => {
  return price.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

type PriceDetail = {
  price: number;
  period: string;
  discount?: string;
  total?: number;
};

export type PricingPlan = {
  name: string;
  description: string;
  prices: {
    monthly: PriceDetail;
    semi_annual: PriceDetail;
    annual: PriceDetail;
  };
  features: string[];
  isFeatured: boolean;
};

type PricingCardProps = {
  plan: PricingPlan;
  cycle: 'monthly' | 'semi_annual' | 'annual';
  onPurchaseClick: () => void;
};

export const PricingCard = ({ plan, cycle, onPurchaseClick }: PricingCardProps) => {
  const { name, description, prices, features, isFeatured } = plan;
  const displayPrice = prices[cycle];

  return (
    <motion.div
      variants={cardVariant}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={cn("h-full relative group")}
    >
       {isFeatured && (
          <Badge 
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 px-4 py-1 text-sm font-semibold z-10" 
            variant="default"
          >
            Mais Popular
          </Badge>
      )}
      <Card className={cn(
        "flex flex-col h-full rounded-xl overflow-hidden pricing-card-bg transition-all duration-300",
        isFeatured ? 'border-primary/50 neon-glow-strong' : 'border-border/20 neon-glow group-hover:neon-glow-strong group-hover:border-primary/50'
      )}>
        
        <CardHeader className="p-8 text-center">
          <CardTitle className="font-headline font-semibold text-2xl tracking-wide">{name}</CardTitle>
          <CardDescription className="mt-2 text-muted-foreground text-sm font-light min-h-[40px]">{description}</CardDescription>
        </CardHeader>

        <CardContent className="flex-grow p-8 pt-0 flex flex-col items-center">
          <div className="relative h-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={cycle}
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } }}
                exit={{ opacity: 0, y: 15, transition: { duration: 0.2, ease: 'easeIn' } }}
                className="flex flex-col items-center"
              >
                {displayPrice.discount && (
                  <span className="text-sm font-semibold text-primary">{displayPrice.discount}</span>
                )}
                <div className="flex items-baseline justify-center gap-2 mt-2">
                    <span className="text-xl font-semibold">R$</span>
                    <span className="text-5xl font-bold font-headline text-foreground">{formatPrice(displayPrice.price)}</span>
                    <span className="text-lg text-muted-foreground font-light self-end">/{displayPrice.period}</span>
                </div>
                {displayPrice.total && (
                  <span className="text-xs text-muted-foreground mt-1">
                    Cobrado R$ {formatPrice(displayPrice.total)} {cycle === 'semi_annual' ? 'por semestre' : 'por ano'}
                  </span>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <ul className="space-y-4 w-full mt-6 text-left">
            {features.map((feature, i) => (
              <li key={i} className="flex items-center gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0" strokeWidth={3} />
                <span className="text-base text-muted-foreground font-light">{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter className="p-8 mt-auto">
            <Button 
              className="w-full text-lg font-semibold py-6" 
              variant={isFeatured ? 'default' : 'outline'}
              onClick={onPurchaseClick}
            >
              Começar Agora
            </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
