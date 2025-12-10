"use server";

import * as z from "zod";

// Este arquivo não está mais sendo usado ativamente pelo formulário de contato,
// mas é mantido para referência ou uso futuro. A lógica de submissão
// agora redireciona diretamente para o WhatsApp no lado do cliente.

const formSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  message: z.string(),
});

type FormData = z.infer<typeof formSchema>;

export async function submitContactForm(formData: FormData) {
  const parsedData = formSchema.safeParse(formData);

  if (!parsedData.success) {
    return { success: false, message: "Dados inválidos." };
  }

  console.log("Novo lead recebido (simulação):");
  console.log(parsedData.data);
  
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return { success: true, message: "Lead recebido com sucesso!" };
}
