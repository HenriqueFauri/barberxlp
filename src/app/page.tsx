'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, BarChart2, BookUser, Calendar, Cake, CheckSquare, Gift, Heart, LineChart, Package, Star, Users, Wallet } from 'lucide-react';
import { motion } from 'framer-motion';
import { PricingCard, PricingPlan } from '@/components/pricing-card';
import { ContactForm } from '@/components/contact-form';
import { useState } from 'react';
import { PricingToggle } from '@/components/ui/pricing-toggle';
import { PurchaseFormModal, PurchaseDetails } from '@/components/purchase-form-modal';


const features = [
    {
      icon: <Calendar strokeWidth={2.5} className="h-8 w-8 text-primary" />,
      title: "Agendamentos Simplificados",
      description: "Permita que seus clientes agendem horários online 24/7, reduzindo chamadas e mensagens.",
    },
    {
      icon: <Users strokeWidth={2.5} className="h-8 w-8 text-primary" />,
      title: "Gestão de Clientes",
      description: "Mantenha um histórico completo de seus clientes, serviços prestados e preferências.",
    },
    {
      icon: <Wallet strokeWidth={2.5} className="h-8 w-8 text-primary" />,
      title: "Gestão Financeira",
      description: "Controle suas finanças, comissões e fluxo de caixa de forma integrada e visual.",
    },
    {
      icon: <Package strokeWidth={2.5} className="h-8 w-8 text-primary" />,
      title: "Gestão de Estoque",
      description: "Gerencie os produtos utilizados e vendidos na sua barbearia de forma simples e eficaz.",
    },
    {
      icon: <BarChart2 strokeWidth={2.5} className="h-8 w-8 text-primary" />,
      title: "Relatórios de Performance",
      description: "Acesse relatórios detalhados sobre faturamento, serviços mais populares e muito mais.",
    },
    {
      icon: <BookUser strokeWidth={2.5} className="h-8 w-8 text-primary" />,
      title: "Lista de Espera",
      description: "Otimize o tempo e não perca clientes com uma lista de espera inteligente e automática.",
    },
    {
      icon: <Star strokeWidth={2.5} className="h-8 w-8 text-primary" />,
      title: "Pesquisa de Satisfação",
      description: "Envie pesquisas automáticas e monitore a satisfação dos seus clientes para melhorar sempre.",
    },
     {
      icon: <Cake strokeWidth={2.5} className="h-8 w-8 text-primary" />,
      title: "Aniversariantes",
      description: "Fidelize clientes enviando mensagens automáticas e ofertas especiais no aniversário deles.",
    },
    {
      icon: <Gift strokeWidth={2.5} className="h-8 w-8 text-primary" />,
      title: "Programa de Fidelidade",
      description: "Crie programas de pontos e recompensas para incentivar seus clientes a voltarem sempre.",
    },
];

const pricingPlans: PricingPlan[] = [
  {
    name: 'Individual',
    description: 'Ideal para 1 barbeiro autônomo.',
    prices: {
      monthly: { price: 39.9, period: 'mês' },
      semi_annual: { price: 32.9, period: 'mês', discount: '15% OFF', total: 197.4 },
      annual: { price: 27.9, period: 'mês', discount: '30% OFF', total: 334.8 },
    },
    features: ['1 Barbeiro', 'Agendamentos Ilimitados', 'Página de Agendamento', 'Gestão de Clientes'],
    isFeatured: false,
  },
  {
    name: 'Profissional',
    description: 'Para barbearias com 2 a 5 barbeiros.',
    prices: {
      monthly: { price: 79.9, period: 'mês' },
      semi_annual: { price: 67.9, period: 'mês', discount: '15% OFF', total: 407.4 },
      annual: { price: 55.9, period: 'mês', discount: '30% OFF', total: 670.8 },
    },
    features: [
      'Até 5 Barbeiros',
      'Tudo do plano Individual',
      'Controle Financeiro',
      'Relatórios de Performance',
    ],
    isFeatured: true,
  },
  {
    name: 'Ilimitado',
    description: 'A solução completa para grandes equipes.',
    prices: {
      monthly: { price: 129.9, period: 'mês' },
      semi_annual: { price: 110.9, period: 'mês', discount: '15% OFF', total: 665.4 },
      annual: { price: 90.9, period: 'mês', discount: '30% OFF', total: 1090.8 },
    },
    features: [
      'Barbeiros Ilimitados',
      'Tudo do plano Profissional',
      'Suporte Prioritário',
      'Acesso a novas funções',
    ],
    isFeatured: false,
  },
];


// Animation Variants
const sectionVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const cardContainerVariant = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
};

const cardVariant = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const heroTitleVariant = {
    hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: 0.1 } }
};

const heroSubtitleVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: 0.3 } }
};

const heroMockupVariant = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: 0.5 } }
};

const heroButtonVariant = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut', delay: 0.7 } }
};

export default function Home() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'semi_annual' | 'annual'>('annual');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PurchaseDetails | null>(null);

  const handlePurchaseClick = (planName: string) => {
    const cycleMap = {
      monthly: 'Mensal',
      semi_annual: 'Semestral',
      annual: 'Anual'
    };
    setSelectedPlan({
      planName: planName,
      billingCycle: cycleMap[billingCycle]
    });
    setIsModalOpen(true);
  };
  
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      className="flex flex-col min-h-[100dvh] overflow-x-hidden"
    >
      <PurchaseFormModal 
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        purchaseDetails={selectedPlan}
      />
      {/* Hero Section */}
      <section id="home" className="relative w-full pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden bg-gradient-primary">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center justify-center lg:gap-12">
            <div className="flex flex-col justify-center space-y-4 text-center lg:text-left max-w-xl">
              <motion.h1 
                className="font-headline text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter !leading-tight"
                variants={heroTitleVariant}
              >
                BarberX
              </motion.h1>
              <motion.p 
                className="mx-auto lg:mx-0 text-muted-foreground font-light text-base md:text-xl"
                variants={heroSubtitleVariant}
              >
                A solução inteligente para sua barbearia.
              </motion.p>
               <motion.div
                className="mx-auto lg:mx-0 space-y-2"
                variants={heroSubtitleVariant}
              >
                <p className="text-foreground/80 font-light text-base md:text-lg">Agendamentos automáticos em menos de 30 segundos.</p>
                <p className="text-foreground/80 font-light text-base md:text-lg">Gestão inteligente, a melhor apenas.</p>
              </motion.div>
              
              <motion.div 
                className="hidden lg:flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4"
                variants={heroButtonVariant}
              >
                <Button asChild size="lg" className="font-semibold text-lg">
                  <Link href="#precos">Conhecer o App</Link>
                </Button>
              </motion.div>
            </div>
            
            <motion.div
              className="relative w-full max-w-xl flex items-center justify-center min-h-[300px] lg:min-h-[400px] mt-10 lg:mt-0"
              variants={heroMockupVariant}
            >
              <Image
                src="/mockups.png"
                alt="Mockups do aplicativo BarberX"
                width={900}
                height={700}
                className="w-full h-auto drop-shadow-[0_25px_25px_rgb(0,0,0,0.35)]"
                priority
              />
            </motion.div>

            <motion.div 
              className="flex lg:hidden flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-8"
              variants={heroButtonVariant}
            >
              <Button asChild size="lg" className="font-semibold text-lg">
                <Link href="#precos">Conhecer o App</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <motion.section 
        id="sobre" 
        className="relative w-full py-16 md:py-24 lg:py-32 bg-secondary/50 overflow-hidden"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <Image 
          src="/x-logo.png" 
          alt="BarberX background logo"
          width={500}
          height={500}
          className="absolute -bottom-1/4 -right-20 opacity-5 w-[900px] h-[700px] rotate-12 -z-10" 
        />
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-5">
            <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl">
              O Propósito do BarberX
            </h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed font-light">
              Criado por barbeiros para barbeiros. Nosso objetivo é simplificar seu dia a dia para que você foque no que realmente importa: a arte de barbear e o relacionamento com seus clientes.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        id="funcoes" 
        className="w-full py-16 md:py-24"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="space-y-4 text-center mb-12">
            <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl">
              Funções Pensadas para seu Negócio
            </h2>
            <p className="max-w-[900px] mx-auto text-muted-foreground md:text-xl/relaxed font-light">
              Ferramentas poderosas para o crescimento da sua barbearia.
            </p>
          </div>
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
            variants={cardContainerVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                className="group flex flex-col text-left p-6 rounded-xl transition-all duration-300 ease-in-out pricing-card-bg neon-glow hover:neon-glow-strong hover:-translate-y-1 hover:border-primary/50 border border-transparent"
                variants={cardVariant}
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 p-2 bg-secondary/50 rounded-lg">{feature.icon}</div>
                  <h3 className="text-lg font-headline font-bold">{feature.title}</h3>
                </div>
                <p className="text-muted-foreground font-light text-sm mt-4">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Pricing Section */}
      <motion.section
        id="precos"
        className="w-full py-16 md:py-24 bg-secondary/50"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Planos transparentes e sem surpresas
            </h2>
            <p className="max-w-[600px] mx-auto text-muted-foreground md:text-xl/relaxed font-light">
              Escolha o plano que melhor se adapta ao momento da sua barbearia.
            </p>
          </div>

          <div className="flex justify-center mb-10">
            <PricingToggle onToggle={setBillingCycle} />
          </div>

          <motion.div
            className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto items-stretch"
            variants={cardContainerVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {pricingPlans.map((plan) => (
              <PricingCard 
                key={plan.name} 
                plan={plan} 
                cycle={billingCycle} 
                onPurchaseClick={() => handlePurchaseClick(plan.name)}
              />
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section 
        id="contato" 
        className="w-full py-16 md:py-24 lg:py-32"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-center lg:text-left">
              <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl">
                Entre em Contato
              </h2>
              <p className="max-w-[500px] mx-auto lg:mx-0 text-muted-foreground md:text-xl/relaxed font-light">
                Tem alguma dúvida ou quer ver uma demonstração? Preencha o formulário e nossa equipe entrará em contato em breve.
              </p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Final CTA */}
      <section className="w-full py-20 bg-secondary/50">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
          <div className="space-y-4">
            <h2 className="text-3xl font-headline font-bold tracking-tighter md:text-4xl/tight">
              Pronto para transformar sua barbearia?
            </h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed font-light">
              Junte-se a centenas de barbeiros que já estão inovando com BarberX.
            </p>
          </div>
          <div className="flex justify-center mt-6">
            <Button asChild size="lg" className="font-semibold group text-lg">
              <Link href="#contato">
                Comece Agora <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </motion.div>
  );
}