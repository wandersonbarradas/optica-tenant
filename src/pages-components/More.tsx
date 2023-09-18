import { TitlesMore } from "@/types/TitlesMore";
import styles from "@/styles/more.module.css";
type Props = {
    title: TitlesMore;
};

export const More = ({ title }: Props) => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Teste</h1>
                <button className={styles.btnAdd}>Novo</button>
            </div>
            <div className={styles.table}>
                <div className={styles.tableHeader}>
                    <div className={[styles.tableCell, styles.full].join(" ")}>
                        Nome
                    </div>
                    <div className={styles.tableCell}>Ações</div>
                </div>
                <div className={styles.tableBody}>
                    <div className={styles.tableItem}>
                        <div
                            className={[styles.tableCell, styles.full].join(
                                " ",
                            )}
                        >
                            Teste 145698
                        </div>
                        <div className={styles.tableActions}>
                            <button
                                className={[styles.btnEdit, styles.btn].join(
                                    " ",
                                )}
                            >
                                Editar
                            </button>
                            <button
                                className={[styles.btnDelete, styles.btn].join(
                                    " ",
                                )}
                            >
                                Deletar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
