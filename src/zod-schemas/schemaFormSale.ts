import { z } from "zod";

export const schemaFormSale = z.object({
    name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
    age: z
        .number({
            required_error: "Campo obrigatório!",
            invalid_type_error: "Somente números neste campo!",
        })
        .min(18, "Idade minima de 18 anos"),
    email: z.string().email("O e-mail deve ser válido"),
});

export type SchemaFormSale = z.infer<typeof schemaFormSale>;
