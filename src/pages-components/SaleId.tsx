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
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
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
                        <Accordion
                            title="Cliente"
                            classes={[styles.accordion, styles.client].join(
                                " ",
                            )}
                        >
                            <div className={styles.grid}>
                                <div className={styles.gridItem}>
                                    <label
                                        className={styles.label}
                                        htmlFor="codigo"
                                    >
                                        Código
                                    </label>
                                    <div className={styles.flexItem}>
                                        <div>
                                            <InputGroup
                                                errors={
                                                    methods.formState.errors
                                                }
                                                name="codigo"
                                                register={methods.register}
                                                id="codigo"
                                                type="number"
                                            />
                                        </div>
                                        <div
                                            className={[
                                                "icon",
                                                styles.icon,
                                            ].join(" ")}
                                        >
                                            <SearchOutlinedIcon />
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.gridItem}>
                                    <InputGroup
                                        errors={methods.formState.errors}
                                        name="name"
                                        register={methods.register}
                                        id="name"
                                        label="Nome"
                                        type="text"
                                    />
                                </div>
                                <div className={styles.gridItem}>
                                    <InputGroup
                                        errors={methods.formState.errors}
                                        name="phone"
                                        register={methods.register}
                                        id="phone"
                                        label="Telefone"
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
