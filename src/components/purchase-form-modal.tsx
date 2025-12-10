
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  barbershopName: z.string().min(2, "O nome da barbearia é obrigatório."),
  contactName: z.string().min(2, "Seu nome é obrigatório."),
  whatsapp: z.string().min(10, "O número do WhatsApp é inválido."),
  email: z.string().email("O e-mail é inválido."),
  barberCount: z.coerce.number().min(1, "Informe ao menos 1 barbeiro."),
  planName: z.string(),
  billingCycle: z.string(),
});

type FormData = z.infer<typeof formSchema>;

export type PurchaseDetails = {
  planName: string;
  billingCycle: string;
} | null;

type PurchaseFormModalProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  purchaseDetails: PurchaseDetails;
};

export function PurchaseFormModal({ isOpen, onOpenChange, purchaseDetails }: PurchaseFormModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      barbershopName: "",
      contactName: "",
      whatsapp: "",
      email: "",
      barberCount: 1,
      planName: purchaseDetails?.planName || "",
      billingCycle: purchaseDetails?.billingCycle || "",
    },
  });

  useEffect(() => {
    if (purchaseDetails) {
      form.reset({
        ...form.getValues(),
        planName: purchaseDetails.planName,
        billingCycle: purchaseDetails.billingCycle,
      });
    }
  }, [purchaseDetails, form]);


  function onSubmit(values: FormData) {
    setIsSubmitting(true);

    const message = `Olá! Gostaria de contratar o plano ${values.planName} (${values.billingCycle}).
Nome: ${values.contactName}
Barbearia: ${values.barbershopName}
WhatsApp: ${values.whatsapp}
Email: ${values.email}
Barbeiros: ${values.barberCount}`;

    const whatsappUrl = `https://wa.me/5551995070814?text=${encodeURIComponent(message)}`;

    // Simulate a small delay then redirect
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setIsSubmitting(false);
      onOpenChange(false);
      form.reset();
      toast({
        title: "Estamos quase lá!",
        description: "Você está sendo redirecionado para o WhatsApp para finalizar.",
      });
    }, 1000);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">Finalizar Compra</DialogTitle>
          <DialogDescription>
            Preencha seus dados para contratar o plano{" "}
            <span className="font-bold text-primary">{purchaseDetails?.planName} ({purchaseDetails?.billingCycle})</span>.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="barbershopName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome da Barbearia</FormLabel>
                    <FormControl>
                      <Input placeholder="Sua barbearia" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contactName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Seu Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome do responsável" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="whatsapp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>WhatsApp</FormLabel>
                  <FormControl>
                    <Input placeholder="(XX) XXXXX-XXXX" type="tel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="seu@email.com" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
                control={form.control}
                name="barberCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantidade de Barbeiros</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            <DialogFooter className="pt-4">
              <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  "Enviar para WhatsApp"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
