import { FormPayment } from "./FormPayment";
import { Installment } from "./Installment";

export type PaymentType = {
    form_payment: FormPayment;
    id: number;
    number_installments: number | null;
    value: number;
    cash_value: number | null;
    // cash_value: number | null;
    entry_value: number | null;
    entry_date: string | null;
    // status: string;
    entry_received: boolean | null;
    installments: Installment[] | null;
    id_entry_receiver: number | null;
};
