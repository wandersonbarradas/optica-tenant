import { SaleBasic } from "@/types/Sale";
import styles from "./TableSalesItem.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { checkInstallmentsSale } from "@/utils/SalesFunctions";
import { useTenantContext } from "@/contexts/tenant/hook";
import Formatters from "@/utils/Formatters";
type Props = {
    sale: SaleBasic;
};

type NextInstallment = {
    date: Date;
    status: "Pago" | "Pendente" | "Atrasado";
};

export const TableSalesItem = ({ sale }: Props) => {
    const router = useRouter();
    const { tenant } = useTenantContext();
    const [nextInstallment, setNextInstallment] = useState<NextInstallment>({
        date: new Date(),
        status: "Pago",
    });

    useEffect(() => {
        setNextInstallment(checkInstallmentsSale(sale));
    }, [sale]);

    const handleStatus = (status: string) => {
        switch (status) {
            case "Atrasado":
                return styles.danger;
            case "Pendente":
                return styles.warning;
            case "Pago":
                return styles.success;
            default:
                return null;
        }
    };

    const handleClick = () => {
        router.push(`/${tenant?.slug}/vendas/${sale.id}`);
    };

    return (
        <tr
            onClick={handleClick}
            className={[
                styles.tableTr,
                nextInstallment.status === "Atrasado" ? styles.bgDanger : null,
            ].join(" ")}
        >
            <td className={styles.desktop}>
                <div className={styles.statusSale}>
                    <span
                        className={[
                            styles.status,
                            handleStatus(nextInstallment.status),
                        ].join(" ")}
                    ></span>
                    {nextInstallment.status}
                </div>
            </td>
            <td>
                <div className={styles.clientName}>{sale.client.name}</div>
                <div className={styles.mobile}>
                    {new Date(sale.date_sale).toLocaleDateString("pt-BR")}
                </div>
            </td>
            <td className={styles.desktop}>
                {new Date(sale.date_sale).toLocaleDateString("pt-BR")}
            </td>
            <td>
                <div>{sale.payment.form_payment.name}</div>
                <div className={styles.mobile}>
                    {Formatters.formatBrazilianCurrency(
                        sale.payment.cash_value ?? sale.payment.value,
                    )}
                </div>
                <div className={[styles.statusSale, styles.mobile].join(" ")}>
                    <span
                        className={[
                            styles.status,
                            handleStatus(nextInstallment.status),
                        ].join(" ")}
                    ></span>
                    {nextInstallment.status}
                </div>
            </td>
            <td className={styles.desktop}>
                {sale.payment.number_installments ?? 0}
            </td>
            <td
                className={[
                    nextInstallment.status === "Atrasado"
                        ? styles.colorDanger
                        : null,
                    styles.desktop,
                ].join(" ")}
            >
                {nextInstallment.status === "Pago"
                    ? "-"
                    : nextInstallment.date.toLocaleDateString("pt-BR")}
            </td>
            <td className={styles.desktop}>
                R$ {(sale.payment.cash_value ?? sale.payment.value).toFixed(2)}
            </td>
        </tr>
    );
};
