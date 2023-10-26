import { useEffect, useRef, useState } from "react";
import styles from "./accordion.module.css";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { SchemaFormSale } from "@/zod-schemas/schemaFormSale";
import { useFormContext } from "react-hook-form";

type Props = {
    title: string;
    children: React.ReactNode;
    classes?: string;
};

export const Accordion = ({ title, children, classes }: Props) => {
    const {
        formState: { errors },
    } = useFormContext<SchemaFormSale>();
    const [showAccordion, setShowAccordion] = useState(true);
    const body = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (errors && body.current?.querySelector(".error")) {
            updateHeightAccordion();
            setShowAccordion(true);
        }
    }, [errors]);

    const handleClickAccordion = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setShowAccordion(!showAccordion);
        const body = document.getElementById("body" + title) as HTMLElement;

        if (showAccordion) {
            body.style.maxHeight = "0";
        } else {
            updateHeightAccordion();
        }
    };

    const updateHeightAccordion = () => {
        if (body.current) {
            body.current.style.maxHeight = body.current.scrollHeight + "px";
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
            <div ref={body} id={"body" + title} className={styles.body}>
                <div className={styles.content}>{children}</div>
            </div>
        </div>
    );
};
