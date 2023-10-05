"use client";

import { FormPayment } from "@/types/FormPayment";
import { GeneralProduct } from "@/types/GeneralProduct";
import { Sale } from "@/types/Sale";
import { useEffect } from "react";

type Props = {
    page: string;
    treatments: GeneralProduct[] | null;
    lenses: GeneralProduct[] | null;
    specialLenses: GeneralProduct[] | null;
    employees: GeneralProduct[] | null;
    formsPayments: FormPayment[];
    sale?: Sale;
};

export const revalidate = 0;
export const dynamic = "force-dynamic";

export const SaleId = (props: Props) => {
    useEffect(() => {
        console.log(props);
    }, []);
    return <div>Pagina de venda {props.page}</div>;
};
