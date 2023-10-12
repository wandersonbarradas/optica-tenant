import { z } from "zod";

export const schemaFormSale = z.object({
    codigo: z
        .number({
            required_error: "Inválido!",
            invalid_type_error: "Inválido!",
        })
        .min(1, "Inválido"),
    name: z.string().optional(),
    phone: z.string().optional(),
});

export type SchemaFormSale = z.infer<typeof schemaFormSale>;
