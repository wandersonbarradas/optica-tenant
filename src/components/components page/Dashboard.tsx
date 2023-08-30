"use client";
import styles from "@/styles/dashboard.module.css";
import { useContext, useEffect } from "react";
import { TenantContent } from "@/contexts/tenant";
import { User } from "@/types/User";
import { useAuthContext } from "@/contexts/auth";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { ChartLineSimple } from "../chartLineSimple";

type Props = {
    user: User;
    token: string;
};

export const Dashboard = ({ token, user }: Props) => {
    const tenantCtx = useContext(TenantContent);
    const { setToken, setUser } = useAuthContext();

    useEffect(() => {
        setToken(token);
        setUser(user);
    }, []);

    return (
        <div className={styles.containerDashboard}>
            <div className={styles.cardChart}>
                <h3 className={styles.titleCard}>Receita da semana</h3>
                <div className={styles.contentCard}>
                    <div className={styles.infoCard}>
                        <div className={styles.cardValue}>R$ 10.355,00</div>
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
                            dataChart={[150, 800, 200, 0, 100, 5, 70]}
                        />
                    </div>
                </div>
            </div>
            <div className={styles.cardChart}>
                <h3 className={styles.titleCard}>Receita da semana</h3>
                <div className={styles.contentCard}>
                    <div className={styles.infoCard}>
                        <div className={styles.cardValue}>05</div>
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
                            dataChart={[1, 0, 2, 0, 0, 1, 1]}
                        />
                    </div>
                </div>
            </div>
            <div className={styles.cardLarger}>...</div>
            <div className={styles.cardLarger}>...</div>
        </div>
    );
};
