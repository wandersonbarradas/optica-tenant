import { SchemaFormSale } from "@/zod-schemas/schemaFormSale";
import { useEffect, useState } from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import styles from "./input.module.css";

type PropriedadesComoLiteral<T> = {
    [K in keyof T]: K;
};

type Names = PropriedadesComoLiteral<SchemaFormSale>[keyof SchemaFormSale];

type Props = {
    classes?: string;
    label?: string;
    id?: string;
    register: UseFormRegister<SchemaFormSale>;
    name: Names;
    isNumber?: boolean;
    isDate?: boolean;
    errors: FieldErrors<SchemaFormSale>;
};

export const InputGroup = ({
    classes,
    label,
    id,
    register,
    name,
    isNumber,
    isDate,
    errors,
}: Props) => {
    const [config, setConfig] = useState<any>({});
    const [errorStatus, setErrorStatus] = useState<boolean>(false);
    useEffect(() => {
        if (isNumber) {
            setConfig({ valueAsNumber: true });
        }
        if (isDate) {
            setConfig({ valueAsDate: true });
        }
    }, []);

    useEffect(() => {
        if (errors[name]) {
            setErrorStatus(true);
        } else {
            setErrorStatus(false);
        }
    }, [errors[name]]);

    return (
        <>
            <label className={styles.label} htmlFor={id}>
                {label}
            </label>
            <input
                className={[
                    styles.input,
                    errorStatus ? styles.error : null,
                ].join(" ")}
                {...register(name, config)}
                id={id}
            />
            {errors[name] && (
                <div className={styles.errorMessage}>
                    {errors[name]?.message}
                </div>
            )}
        </>
    );
};
