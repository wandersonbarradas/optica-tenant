import { useTenantContext } from "@/contexts/tenant/hook";
import styles from "./NotificationItem.module.css";
import { NotificationType } from "@/types/NotificationItemType";
import Link from "next/link";
type Props = {
    installment: NotificationType;
};
export const NotificationItem = ({ installment }: Props) => {
    console.log(installment.dueDate);
    const { tenant } = useTenantContext();
    return (
        <li className={styles.notificationItem}>
            <Link href={`/${tenant?.slug}/vendas/${installment.idSale}`}>
                <div className={styles.row}>
                    <div className={styles.leftSide}>
                        <p>
                            Cliente:
                            <span>{" " + installment.client}</span>
                        </p>
                    </div>
                    <div className={styles.rightSide}>
                        <p>
                            Valor:
                            <span>
                                {" " +
                                    installment.value.toLocaleString("pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                    })}
                            </span>
                        </p>
                    </div>
                </div>
                <div className={styles.row}>
                    <div className={styles.leftSide}>
                        <p>
                            Parcela N°:
                            <span>
                                {" " +
                                    (installment.numberInstallment < 10
                                        ? "0" +
                                          installment.numberInstallment.toString()
                                        : installment.numberInstallment)}
                            </span>
                        </p>
                    </div>
                    <div className={styles.rightSide}>
                        <p>
                            Vencimento:
                            <span>
                                {" " +
                                    installment.dueDate.toLocaleDateString(
                                        "pt-BR",
                                    )}
                            </span>
                        </p>
                    </div>
                </div>
            </Link>
        </li>
    );
};
