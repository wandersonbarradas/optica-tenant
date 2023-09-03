import { SaleBasic } from "@/types/Sale";

type Return = {
    date: Date;
    status: "Pago" | "Pendente" | "Atrasado";
    numberInstallment?: number;
};

export const checkInstallmentsSale = (sale: SaleBasic): Return => {
    if (sale.payment?.installments && sale.payment?.installments?.length > 0) {
        const installments = sale.payment.installments;
        const overdueInstallments = installments.filter(
            (i) => i.received === false,
        );
        if (overdueInstallments.length > 0) {
            overdueInstallments.sort(
                (a, b) =>
                    new Date(a.due_date).getTime() -
                    new Date(b.due_date).getTime(),
            );
            const dueDate = new Date(overdueInstallments[0].due_date);
            const currentDate = new Date();
            const vef =
                currentDate.setHours(0, 0, 0, 0) > dueDate.setHours(0, 0, 0, 0);
            return {
                date: dueDate,
                status: vef ? "Atrasado" : "Pendente",
                numberInstallment: overdueInstallments[0].installment_number,
            };
        } else {
            installments.sort(
                (a, b) =>
                    new Date(a.due_date).getTime() -
                    new Date(b.due_date).getTime(),
            );
            return {
                date: new Date(installments[installments.length - 1].due_date),
                status: "Pago",
            };
        }
    } else {
        return {
            date: new Date(),
            status: "Pago",
        };
    }
};
