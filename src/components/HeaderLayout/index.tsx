import { useEffect, useRef, useState } from "react";
import styles from "./HeaderLayout.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { NotificationType } from "@/types/NotificationItemType";
import { getLateInstallments } from "@/utils/ApiFront";
import { Modal } from "../Modal";
import { NotificationItem } from "../NotificationItem";
import { usePathname } from "next/navigation";
import { useAuthContext } from "@/contexts/auth/hook";
type Props = {
    setShowMenu: (value: boolean) => void;
};

export const HeaderLayout = ({ setShowMenu }: Props) => {
    const { user } = useAuthContext();
    const inputRef = useRef<HTMLInputElement>(null);
    const [showInput, setShowInput] = useState(false);
    const [notifications, setNotifications] = useState<NotificationType[]>([]);
    const [modal, setModal] = useState(false);
    const pathname = usePathname();
    useEffect(() => {
        setShowInput(false);
        getNotifications();
    }, []);

    useEffect(() => {
        if (showInput) inputRef.current?.focus();
    }, [showInput]);

    useEffect(() => {
        setModal(false);
    }, [pathname]);

    const getNotifications = async () => {
        const result = await getLateInstallments();
        setNotifications(result);
    };

    const handleSearchArea = () => {
        setShowInput(!showInput);
    };

    const handleFocusInput = () => {
        setShowInput(false);
    };
    return (
        <>
            <header className={styles.header}>
                <div className={styles.leftSide}>
                    <div
                        onClick={() => setShowMenu(true)}
                        className={["icon", styles.menuIcon].join(" ")}
                    >
                        <MenuIcon />
                    </div>
                    <div className={styles.userInfo}>
                        Bem vindo,{" "}
                        {user?.name.split(" ").splice(0, 2).join(" ")}
                    </div>
                </div>
                <div className={styles.rightSide}>
                    <div
                        onClick={() => setModal(true)}
                        className={[
                            "icon",
                            styles.notification,
                            notifications.length > 0 ? styles.active : null,
                        ].join(" ")}
                    >
                        <NotificationsOutlinedIcon />
                    </div>
                    <div
                        className={[
                            styles.searchArea,
                            showInput ? styles.active : null,
                        ].join(" ")}
                    >
                        <input
                            ref={inputRef}
                            type="search"
                            placeholder="Pesquisar"
                            //onBlur={handleFocusInput}
                        />

                        <div
                            className={["icon", styles.searchIcon].join(" ")}
                            onClick={handleSearchArea}
                        >
                            <SearchOutlinedIcon fontSize="small" />
                        </div>
                    </div>
                </div>
            </header>
            {modal && (
                <Modal
                    closeModal={setModal}
                    closeWithClick={true}
                    state={modal}
                >
                    <div className={styles.containerNotification}>
                        <div className={styles.contentNotification}>
                            {notifications.length === 0 && (
                                <p className={styles.titleNotification}>
                                    Sem Notificações
                                </p>
                            )}
                            {notifications.length > 0 && (
                                <>
                                    <p className={styles.titleNotification}>
                                        {notifications.length}{" "}
                                        {notifications.length > 1
                                            ? "Novas parcelas acabaram"
                                            : "Nova parcela acabou"}{" "}
                                        de vencer
                                    </p>
                                    <ul className={styles.listNotification}>
                                        {notifications.map(
                                            (notification, index) => (
                                                <NotificationItem
                                                    installment={notification}
                                                    key={index}
                                                />
                                            ),
                                        )}
                                    </ul>
                                </>
                            )}
                        </div>
                    </div>
                </Modal>
            )}
        </>
    );
};
