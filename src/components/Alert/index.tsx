import { useEffect, useState } from "react";
import styles from "./Alert.module.css";
//import { useAlertContext } from "@/contexts/alert";
import { Alert } from "@/types/Alert";

type Props = {
    item: Alert;
};

export const AlertComponent = ({ item }: Props) => {
    //const { removeAlert } = useAlertContext();
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
        closeAlert();
    };

    const closeAlert = () => {
        setPosition(false);
        setTimeout(() => {
            setShowAlert(false);
            //removeAlert(item.id);
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
