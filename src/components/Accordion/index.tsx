import { useState } from "react";
import styles from "./accordion.module.css";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

type Props = {
    title: string;
    children: React.ReactNode;
    classes?: string;
};

export const Accordion = ({ title, children, classes }: Props) => {
    const [showAccordion, setShowAccordion] = useState(true);

    const handleClickAccordion = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setShowAccordion(!showAccordion);

        const body = document.getElementById("body" + title) as HTMLElement;
        if (body.classList.contains("height-auto")) {
            body.style.height = `${body.scrollHeight}px`;
            body.classList.remove("height-auto");
        } else {
            body.style.height = "0";
            body.classList.add("height-auto");
        }
    };

    return (
        <div
            className={[
                styles.item,
                showAccordion ? styles.show : null,
                classes,
            ].join(" ")}
        >
            <h2 className={styles.header}>
                <button onClick={handleClickAccordion}>
                    {title}
                    <div className={styles.icon}>
                        <ArrowForwardIosRoundedIcon fontSize="medium" />
                    </div>
                </button>
            </h2>
            <div id={"body" + title} className={styles.body}>
                <div className={styles.content}>{children}</div>
            </div>
        </div>
    );
};
