import { SaleBasic } from "@/types/Sale";
import { SalesSummaryStatus } from "@/types/salesSummary";
import styles from "../../styles/sales.module.css";
import Formatters from "@/utils/Formatters";
import { TableSales } from "../tableSales";
type Props = {
    sales: SaleBasic[];
    salesSummaryStatus: SalesSummaryStatus;
};

export const Sales = ({ sales, salesSummaryStatus }: Props) => {
    return (
        <>
            <div className={styles.header}>
                <h1>Vendas</h1>
                <button className={styles.btnNew}>Nova</button>
            </div>
            <section className={styles.sectionSummary}>
                <div className={styles.cardSummary}>
                    <h3>Total de vendas</h3>
                    <div
                        className={[styles.total, styles.numberSumary].join(
                            " ",
                        )}
                    >
                        {Formatters.formatZero(salesSummaryStatus.total)}
                    </div>
                </div>
                <div className={styles.cardSummary}>
                    <h3>Total de vendas pagas</h3>
                    <div
                        className={[styles.paid, styles.numberSumary].join(" ")}
                    >
                        {Formatters.formatZero(salesSummaryStatus.paid)}
                    </div>
                </div>
                <div className={styles.cardSummary}>
                    <h3>Total de vendas em aberto</h3>
                    <div
                        className={[styles.pending, styles.numberSumary].join(
                            " ",
                        )}
                    >
                        {Formatters.formatZero(salesSummaryStatus.pending)}
                    </div>
                </div>
                <div className={styles.cardSummary}>
                    <h3>Total de vendas atrasadas</h3>
                    <div
                        className={[styles.late, styles.numberSumary].join(" ")}
                    >
                        {Formatters.formatZero(salesSummaryStatus.late)}
                    </div>
                </div>
            </section>
            <section className={styles.tableSales}>
                <TableSales sales={sales} titleTable="Vendas" />
            </section>
        </>
    );
};
