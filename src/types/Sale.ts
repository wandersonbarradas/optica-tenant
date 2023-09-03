import { PaymentType } from "./Payment";
import { GeneralProduct } from "./SaleProduct";

export type SaleBasic = {
    id: number;
    payment: {
        value: number;
        cash_value: number | null;
        entry_received: boolean | null;
        entry_value: number | null;
        entry_date: string | null;
        form_payment: {
            card: boolean;
            name: string;
            in_cash: boolean;
        };
        installments:
            | {
                  due_date: string;
                  received: boolean;
                  value: number;
                  installment_number: number;
                  receipt_date: string | null;
              }[]
            | null;
        number_installments: number | null;
    };
    client: {
        name: string;
    };
    date_sale: string;
};

export type Sale = {
    id: number;
    client: {
        id: number;
        name: string;
        phone: string;
    };
    frame: string | null;
    od: string | null;
    oe: string | null;
    addition: string | null;
    treatments: GeneralProduct[] | null;
    lenses: GeneralProduct[] | null;
    specialLenses: GeneralProduct[] | null;
    obs_product: string | null;
    obs_sale: string | null;
    date_sale: string;
    order_date: string;
    id_employee: number;
    payment: PaymentType;
    order_delivered: boolean;
};
