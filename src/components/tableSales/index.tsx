import { SaleBasic } from "@/types/Sale";
import styles from "./TableSales.module.css";
import { TableSalesItem } from "../tableSalesItem";
import { useState } from "react";

type Props = {
    titleTable: string;
    data: SaleBasic[];
};

export const TableSales = ({ titleTable, data }: Props) => {
    const [sales, setSales] = useState(data);
    return (
        <div className={styles.tableSales}>
            <h3 className={styles.tableTitle}>{titleTable}</h3>
            <table className={styles.table}>
                <thead className={styles.thead}>
                    <tr>
                        <th className={styles.desktop} scope="col">
                            Situação
                        </th>
                        <th scope="col">Cliente</th>
                        <th className={styles.desktop} scope="col">
                            Data
                        </th>
                        <th scope="col">Pagamento</th>
                        <th className={styles.desktop} scope="col">
                            Qtd De <br /> Parcelas
                        </th>
                        <th className={styles.desktop} scope="col">
                            Data proxima <br /> parcela
                        </th>
                        <th className={styles.desktop} scope="col">
                            Valor total
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sales.map((sale, index) => (
                        <TableSalesItem sale={sale} key={index} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};
