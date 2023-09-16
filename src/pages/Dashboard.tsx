"use client";
import styles from "@/styles/dashboard.module.css";
import { useEffect, useState } from "react";
import { User } from "@/types/User";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { ChartLineSimple } from "@/components/chartLineSimple";
import { SaleBasic } from "@/types/Sale";
import { SumByMonth, SumByWeek } from "@/types/Api";
import Formatters from "@/utils/Formatters";
import { ChartLineComplete } from "@/components/chartLineComplete";
import { TableSales } from "@/components/tableSales";

type Props = {
    user: User;
    token: string;
    lastSales: SaleBasic[];
    sumByMonth: SumByMonth;
    resumeWeek: SumByWeek;
};

export const Dashboard = ({ lastSales, resumeWeek, sumByMonth }: Props) => {
    const [totalValueWeek, setTotalValueWeek] = useState<number>(0);
    const [ArrValueWeek, setArrValueWeek] = useState<number[]>([]);
    const [totalSalesWeek, setTotalSalesWeek] = useState<number>(0);
    const [ArrSalesWeek, setArrSalesWeek] = useState<number[]>([]);

    useEffect(() => {
        setTotalValueWeek(
            Object.values(resumeWeek).reduce(
                (total, venda) => total + venda.value,
                0,
            ),
        );
        setArrValueWeek(Object.values(resumeWeek).map((i) => i.value));
        setTotalSalesWeek(
            Object.values(resumeWeek).reduce(
                (total, venda) => total + venda.quantity,
                0,
            ),
        );
        setArrSalesWeek(Object.values(resumeWeek).map((i) => i.quantity));
    }, [resumeWeek]);

    return (
        <div className={styles.containerDashboard}>
            <div className={[styles.card, styles.cardChart].join(" ")}>
                <h3 className={styles.titleCard}>Receita da semana</h3>
                <div className={styles.contentCard}>
                    <div className={styles.infoCard}>
                        <div className={styles.cardValue}>
                            {Formatters.formatBrazilianCurrency(totalValueWeek)}
                        </div>
                        <div
                            className={[
                                styles.cardPercentage,
                                styles.success,
                            ].join(" ")}
                        >
                            <div className={styles.cardIcon}>
                                <TrendingUpIcon />
                            </div>
                            20%
                        </div>
                    </div>
                    <div className={styles.cardChartArea}>
                        <ChartLineSimple
                            background="rgba(41, 204, 151, 0.5)"
                            label="Receita"
                            dataChart={ArrValueWeek}
                        />
                    </div>
                </div>
            </div>
            <div className={[styles.card, styles.cardChart].join(" ")}>
                <h3 className={styles.titleCard}>Vendas da semana</h3>
                <div className={styles.contentCard}>
                    <div className={styles.infoCard}>
                        <div className={styles.cardValue}>
                            {Formatters.formatZero(totalSalesWeek)}
                        </div>
                        <div
                            className={[
                                styles.cardPercentage,
                                styles.danger,
                            ].join(" ")}
                        >
                            <div className={styles.cardIcon}>
                                <TrendingUpIcon />
                            </div>
                            20%
                        </div>
                    </div>
                    <div className={styles.cardChartArea}>
                        <ChartLineSimple
                            background="rgba(255, 165, 0, 0.5)"
                            label="Receita"
                            dataChart={ArrSalesWeek}
                        />
                    </div>
                </div>
            </div>
            <div className={[styles.card, styles.cardLarger].join(" ")}>
                <h3 className={styles.titleCard}>Resumo mensal</h3>
                <ChartLineComplete
                    values={Object.values(sumByMonth)}
                    background="rgba(28, 59, 232, 1)"
                />
            </div>
            <div className={styles.cardLarger}>
                <TableSales sales={lastSales} titleTable="Ultimas Vendas" />
            </div>
        </div>
    );
};
