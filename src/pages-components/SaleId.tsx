"use client";
import styles from "@/styles/saleId.module.css";
import { FormPayment } from "@/types/FormPayment";
import { GeneralProduct } from "@/types/GeneralProduct";
import { Sale } from "@/types/Sale";
import Formatters from "@/utils/Formatters";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemaFormSale, SchemaFormSale } from "@/zod-schemas/schemaFormSale";
import { ClientSection } from "@/components/SalesFormSections/ClientSection/Index";

type Props = {
    page: string;
    treatments: GeneralProduct[] | null;
    lenses: GeneralProduct[] | null;
    specialLenses: GeneralProduct[] | null;
    employees: GeneralProduct[] | null;
    formsPayments: FormPayment[];
    sale?: Sale;
};

export const SaleId = (props: Props) => {
    const methods = useForm<SchemaFormSale>({
        resolver: zodResolver(schemaFormSale),
    });

    const onSubmitForm = (data: any) => console.log(data);
    return (
        <div className={styles.header}>
            <h1>
                {props.sale
                    ? `Venda ${Formatters.formatZero(props.sale.id)}`
                    : "Nova venda"}
            </h1>
            <div className={styles.body}>
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmitForm)}>
                        <ClientSection />
                        <div className={styles.gridItem}>
                            <input type="submit" value="Enviar" />
                        </div>
                    </form>
                </FormProvider>
            </div>
        </div>
    );
};
