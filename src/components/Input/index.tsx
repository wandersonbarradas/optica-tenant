import { SchemaFormSale } from "@/zod-schemas/schemaFormSale";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
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
    name: Names;
    type?: string;
    disabled?: boolean;
    value?: string | number;
};

export const InputGroup = ({
    label,
    id,
    name,
    type,
    disabled,
    value,
}: Props) => {
    const [config, setConfig] = useState<any>({});
    const [errorStatus, setErrorStatus] = useState<boolean>(false);
    const {
        register,
        formState: { errors },
    } = useFormContext<SchemaFormSale>();
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

    if (type === "checkbox") {
        return (
            <label className={styles.labelCheckbox} htmlFor={id}>
                <input
                    className={[
                        styles.checkboxInput,
                        errorStatus ? styles.error : null,
                    ].join(" ")}
                    {...register(name)}
                    id={id}
                    type={type}
                    disabled={disabled}
                    value={value}
                />
                <div
                    className={[styles.checkmark, "border checkbox"].join(" ")}
                ></div>
                {label}
            </label>
        );
    }
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
                <div className={[styles.errorMessage, "error"].join(" ")}>
                    {errors[name]?.message}
                </div>
            )}
        </>
    );
};
