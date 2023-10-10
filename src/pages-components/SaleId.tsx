"use client";
import styles from "@/styles/saleId.module.css";
import { FormPayment } from "@/types/FormPayment";
import { GeneralProduct } from "@/types/GeneralProduct";
import { Sale } from "@/types/Sale";
import Formatters from "@/utils/Formatters";
import { Accordion } from "@/components/Accordion";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemaFormSale, SchemaFormSale } from "@/zod-schemas/schemaFormSale";
import { z } from "zod";
import { InputGroup } from "@/components/Input";

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
        <FormProvider {...methods}>
            <div className={styles.header}>
                <h1>
                    {props.sale
                        ? `Venda ${Formatters.formatZero(props.sale.id)}`
                        : "Nova venda"}
                </h1>
                <div className={styles.body}>
                    <form onSubmit={methods.handleSubmit(onSubmitForm)}>
                        <Accordion title="Cliente">
                            <div className={styles.grid}>
                                <div className={styles.gridItem}>
                                    <InputGroup
                                        errors={methods.formState.errors}
                                        name="name"
                                        register={methods.register}
                                        id="name"
                                        label="Nome"
                                    />
                                    <InputGroup
                                        errors={methods.formState.errors}
                                        name="age"
                                        register={methods.register}
                                        id="age"
                                        label="Idade"
                                        isNumber
                                    />
                                </div>
                                <div className={styles.gridItem}>
                                    <InputGroup
                                        errors={methods.formState.errors}
                                        name="email"
                                        register={methods.register}
                                        id="email"
                                        label="Email"
                                    />
                                </div>
                                <div className={styles.gridItem}>
                                    <input type="submit" value="Enviar" />
                                </div>
                            </div>
                        </Accordion>
                    </form>
                </div>
            </div>
        </FormProvider>
    );
};
