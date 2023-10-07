"use client";
import { TitlesMore } from "@/types/TitlesMore";
import styles from "@/styles/more.module.css";
import { Modal } from "@/components/Modal";
import { useEffect, useState } from "react";
import { InputGrupo } from "@/components/inputGroup";
import { useAlertContext } from "@/contexts/alert";
import {
    createProductData,
    updateProductData,
    deleteProductData,
} from "@/utils/ApiFront";
import { GeneralProduct } from "@/types/GeneralProduct";
type Props = {
    title: TitlesMore;
    tenant: string;
    data: GeneralProduct[] | null;
};

export const revalidate = 0;
export const dynamic = "force-dynamic";

export const More = ({ title, tenant, data }: Props) => {
    const { setAlert } = useAlertContext();
    const [modalShow, setModalShow] = useState(false);
    const [action, setAction] = useState<"Criar" | "Editar" | "Deletar">(
        "Criar",
    );
    const [id, setId] = useState<null | number>(null);
    const [name, setName] = useState("");
    const [productData, setProductData] = useState<GeneralProduct[]>([]);

    useEffect(() => {
        if (data) {
            setProductData(data);
        }
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

    const handleUpdate = (item: GeneralProduct) => {
        setAction("Editar");
        setName(item.name);
        setId(item.id);
        setModalShow(true);
    };

    const handleDelete = (item: GeneralProduct) => {
        setId(item.id);
        setName(item.name);
        setAction("Deletar");
        setModalShow(true);
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

    const handleUpdateProduct = async () => {
        if (!id || name.length < 2) return;
        const result = await updateProductData({ name, id }, title, tenant);
        if (result.status && result.data) {
            const newProducts = productData.filter(
                (item) => item.id !== result.data?.id,
            );
            newProducts.push(result.data);
            setProductData(newProducts);
            setAlert({
                type: "success",
                message: "Item alterado com sucesso!",
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

    const handleDeleteProduct = async () => {
        if (!id) return;
        const result = await deleteProductData(id, title, tenant);
        if (result.status && result.data) {
            const newProducts = productData.filter(
                (item) => item.id !== result.data?.id,
            );
            setProductData(newProducts);
            setAlert({
                type: "success",
                message: "Item deletado com sucesso!",
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
                    setAlert({
                        message: "Campo nome não pode ser vazio!",
                        type: "error",
                    });
                    return;
                }
                handlecreateProduct();
                break;
            case "Editar":
                if (name.length < 2) {
                    setAlert({
                        message:
                            "Campo nome precisa ter pelo menos 2 caracteres!",
                        type: "error",
                    });
                    return;
                }
                handleUpdateProduct();
                break;
            case "Deletar":
                handleDeleteProduct();
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
                    {productData.length === 0 && (
                        <div className={styles.noContent}>
                            Sem {title.replace(/-/g, " ")} para exibir! 👻👻👻
                        </div>
                    )}
                    {productData.length > 0 && (
                        <>
                            <div className={styles.tableHeader}>
                                <div
                                    className={[
                                        styles.tableCell,
                                        styles.full,
                                    ].join(" ")}
                                >
                                    Nome
                                </div>
                                <div className={styles.tableCell}>Ações</div>
                            </div>
                            <div className={styles.tableBody}>
                                {productData.map((item, index) => (
                                    <div
                                        key={index}
                                        className={styles.tableItem}
                                    >
                                        <div
                                            className={[
                                                styles.tableCell,
                                                styles.full,
                                            ].join(" ")}
                                        >
                                            {item.name}
                                        </div>
                                        <div className={styles.tableActions}>
                                            <button
                                                onClick={() =>
                                                    handleUpdate(item)
                                                }
                                                className={[
                                                    styles.btnEdit,
                                                    styles.btn,
                                                ].join(" ")}
                                            >
                                                Editar
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDelete(item)
                                                }
                                                className={[
                                                    styles.btnDelete,
                                                    styles.btn,
                                                ].join(" ")}
                                            >
                                                Deletar
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
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
