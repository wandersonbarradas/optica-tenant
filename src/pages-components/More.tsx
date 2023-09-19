"use client";
import { TitlesMore } from "@/types/TitlesMore";
import styles from "@/styles/more.module.css";
import { Modal } from "@/components/Modal";
import { useEffect, useState } from "react";
import { InputGrupo } from "@/components/inputGroup";
import { useAlertContext } from "@/contexts/alert";
import { createProductData } from "@/utils/ApiFront";
type Props = {
    title: TitlesMore;
    tenant: string;
};

type Treatment = {
    name: string;
    id: number;
};

export const More = ({ title, tenant }: Props) => {
    const { setAlert } = useAlertContext();
    const [modalShow, setModalShow] = useState(false);
    const [action, setAction] = useState<"Criar" | "Editar" | "Deletar">(
        "Criar",
    );
    const [id, setId] = useState<null | number>(null);
    const [name, setName] = useState("");
    const [productData, setProductData] = useState<Treatment[]>([]);

    useEffect(() => {
        setAlert({
            message: "Campo nome não pode ser vazio!",
            type: "error",
        });
    }, []);

    const formatString = (str: string) => {
        str = str.replace(/-/g, " ");
        str = str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
        return str;
    };

    const handleCancelar = () => {
        setModalShow(false);
        setName("");
        setId(null);
        setAction("Criar");
    };

    const closeModal = () => {
        setName("");
        setId(null);
        setAction("Criar");
        setModalShow(false);
    };

    const handlecreateProduct = async () => {
        const result = await createProductData(name, title, tenant);
        if (result.status && result.data) {
            setProductData([...productData, result.data]);
            setAlert({
                type: "success",
                message: "Item adicionado com sucesso!",
            });
        } else {
            if (result.error) {
                setAlert({
                    type: "error",
                    message: result.error,
                });
            }
        }
    };

    const handleSubmit = () => {
        switch (action) {
            case "Criar":
                if (!name) {
                    console.log(action);
                    setAlert({
                        message: "Campo nome não pode ser vazio!",
                        type: "error",
                    });
                    return;
                }
                handlecreateProduct();
                break;
            case "Editar":
                if (!name) {
                    setAlert({
                        message: "Campo nome não pode ser vazio!",
                        type: "error",
                    });
                    return;
                }
                //updateProductData();
                break;
            case "Deletar":
            //deleteProductData();
        }
        closeModal();
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.title}>{formatString(title)}</h1>
                    <button
                        onClick={() => setModalShow(true)}
                        className={styles.btnAdd}
                    >
                        Novo
                    </button>
                </div>
                <div className={styles.table}>
                    <div className={styles.tableHeader}>
                        <div
                            className={[styles.tableCell, styles.full].join(
                                " ",
                            )}
                        >
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
                                    className={[
                                        styles.btnEdit,
                                        styles.btn,
                                    ].join(" ")}
                                >
                                    Editar
                                </button>
                                <button
                                    className={[
                                        styles.btnDelete,
                                        styles.btn,
                                    ].join(" ")}
                                >
                                    Deletar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {modalShow && (
                <Modal
                    state={modalShow}
                    closeModal={setModalShow}
                    closeWithClick={false}
                >
                    <div className={styles.containerModal}>
                        <div className={styles.content}>
                            <div className={styles.contentHeader}>
                                <h4>{action}</h4>
                                <div className={styles.form}>
                                    {action !== "Deletar" && (
                                        <div className={styles.gridContainer}>
                                            <InputGrupo
                                                class={styles.col_2}
                                                type="text"
                                                value={id ?? -1}
                                                label="Código"
                                                disabled
                                            />
                                            <InputGrupo
                                                class={styles.col_10}
                                                type="text"
                                                value={name}
                                                label="Nome"
                                                Change={setName}
                                            />
                                        </div>
                                    )}
                                    {action === "Deletar" && (
                                        <div className={styles.messageAlert}>
                                            Deseja realmente deletar{" "}
                                            <strong>{name}</strong>?
                                        </div>
                                    )}
                                    <div
                                        className={[
                                            styles.actions,
                                            "justify-end mt-1",
                                        ].join(" ")}
                                    >
                                        <button
                                            onClick={handleCancelar}
                                            className={[
                                                styles.btnModal,
                                                styles.cancel,
                                            ].join(" ")}
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            onClick={handleSubmit}
                                            className={[
                                                styles.btnModal,
                                                styles.conclude,
                                            ].join(" ")}
                                        >
                                            Concluir
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    );
};
