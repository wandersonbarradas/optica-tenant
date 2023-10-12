import { SchemaFormSale } from "@/zod-schemas/schemaFormSale";
import { useEffect, useState } from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import styles from "./input.module.css";

type PropriedadesComoLiteral<T> = {
    [K in keyof T]: K;
};

type Union = PropriedadesComoLiteral<SchemaFormSale>[keyof SchemaFormSale];
type FilterUndefined<T> = T extends undefined ? never : T;
type Names = FilterUndefined<Union>;

type Props = {
    label?: string;
    id?: string;
    register: UseFormRegister<SchemaFormSale>;
    name: Names;
    isNumber?: boolean;
    isDate?: boolean;
    errors: FieldErrors<SchemaFormSale>;
    type?: string;
    disabled?: boolean;
};

export const InputGroup = ({
    label,
    id,
    register,
    name,
    type,
    errors,
    disabled,
}: Props) => {
    const [config, setConfig] = useState<any>({});
    const [errorStatus, setErrorStatus] = useState<boolean>(false);
    useEffect(() => {
        if (type && type === "number") {
            setConfig({ valueAsNumber: true });
        } else if (type && type === "date") {
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
            {label && (
                <label className={styles.label} htmlFor={id}>
                    {label}
                </label>
            )}
            <input
                className={[
                    styles.input,
                    errorStatus ? styles.error : null,
                ].join(" ")}
                {...register(name, config)}
                id={id}
                type={type}
                disabled={disabled}
            />
            {errors[name] && (
                <div className={styles.errorMessage}>
                    {errors[name]?.message}
                </div>
            )}
        </>
    );
};
