import { useEffect, useState } from "react";
import styles from "./Alert.module.css";
import { Alert } from "@/types/Alert";
import { useAlertContext } from "@/contexts/alert";

type Props = {
    item: Alert;
};

export const AlertComponent = ({ item }: Props) => {
    const { removeAlert } = useAlertContext();
    const [showAlert, setShowAlert] = useState(true);
    const [position, setPosition] = useState(false);

    useEffect(() => {
        setPosition(true);
    }, []);

    useEffect(() => {
        if (showAlert) {
            setTimeout(() => {
                closeAlert();
            }, 5 * 1000);
        }
    }, [showAlert]);

    const handleAlertClose = () => {
        removeAlert(item.id);
        closeAlert();
    };

    const closeAlert = () => {
        setPosition(false);
        setTimeout(() => {
            setShowAlert(false);
        }, 300);
    };

    return showAlert ? (
        <>
            <li
                className={[
                    styles.alert,
                    styles[`alert_${item.type}`],
                    position ? styles.alertShow : null,
                ].join(" ")}
                role="alert"
            >
                {item.message}
                <button
                    type="button"
                    className="close"
                    onClick={handleAlertClose}
                >
                    <span aria-hidden="true">&times;</span>
                </button>
            </li>
        </>
    ) : (
        <></>
    );
};
