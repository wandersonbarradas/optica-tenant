export type Installment = {
    //id_sale: number;
    id_receiver: number | null;
    due_date: string;
    receipt_date: string | null;
    value: number;
    received: boolean;
    installment_number: number;
    //sale: Sale;
    //receiver: Employee;
};
