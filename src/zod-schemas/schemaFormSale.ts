import { z } from "zod";

export const schemaFormSale = z.object({
    // Client
    codigo: z
        .number({
            required_error: "Inválido!",
            invalid_type_error: "Inválido!",
        })
        .min(1, "Inválido"),
    name: z.string().optional(),
    phone: z.string().optional(),
    // Description Product
    frame: z.string().optional(),
    od: z.string().optional(),
    oe: z.string().optional(),
    addition: z.string().optional(),
    obs_product: z.string().optional(),
});

export type SchemaFormSale = z.infer<typeof schemaFormSale>;
