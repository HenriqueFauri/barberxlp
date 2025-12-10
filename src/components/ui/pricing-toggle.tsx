"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type Cycle = 'monthly' | 'semi_annual' | 'annual';

type PricingToggleProps = {
  onToggle: (cycle: Cycle) => void;
};

const TABS: { label: string; value: Cycle }[] = [
  { label: 'Mensal', value: 'monthly' },
  { label: 'Semestral', value: 'semi_annual' },
  { label: 'Anual', value: 'annual' },
];

export function PricingToggle({ onToggle }: PricingToggleProps) {
  const [active, setActive] = useState<Cycle>('annual');

  const handleToggle = (cycle: Cycle) => {
    setActive(cycle);
    onToggle(cycle);
  };

  const getActiveIndex = () => TABS.findIndex(tab => tab.value === active);

  return (
    <div className="relative flex items-center p-1 rounded-full bg-secondary/80 border border-border w-fit">
      {TABS.map(tab => (
        <button
          key={tab.value}
          onClick={() => handleToggle(tab.value)}
          className={cn(
            "relative z-10 px-4 sm:px-6 py-2 text-sm font-semibold rounded-full transition-colors",
            active === tab.value ? "text-background" : "text-muted-foreground hover:text-foreground"
          )}
        >
          {tab.label}
        </button>
      ))}
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className="absolute inset-0 z-0 p-1"
        style={{
          width: `calc(100% / ${TABS.length})`,
          left: `calc(100% / ${TABS.length} * ${getActiveIndex()})`,
        }}
      >
        <div className="w-full h-full bg-primary rounded-full" />
      </motion.div>
    </div>
  );
}
