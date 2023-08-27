import {
    useEffect,
    useState,
} from "react";
import styles from "./Modal.module.css";

type Props = {
    children: React.ReactNode;
    closeWithClick: boolean;
    closeModal: (value: boolean) => void;
    state: boolean;
};

export const Modal = ({
    children,
    closeWithClick,
    closeModal,
    state,
}: Props) => {
    const [opacity, setOpacity] = useState(false);
    useEffect(() => {
        if (state) {
            setOpacity(true);
        }
    }, [state]);

    const handleModal = (e: React.MouseEvent<HTMLDivElement>) => {
        const element = e.target as HTMLDivElement;
        if (element.id === "modal") {
            if (closeWithClick) {
                setOpacity(false);
                setTimeout(() => {
                    closeModal(false);
                }, 300);
            }
        }
    };
    return (
        <div
            id="modal"
            onClick={handleModal}
            className={[styles.container, opacity ? styles.opacity : null].join(
                " ",
            )}
        >
            {children}
        </div>
    );
};
