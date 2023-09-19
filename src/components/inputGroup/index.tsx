import { useEffect, useState } from "react";
import styles from "./InputGroup.module.css";
import { GeneralProduct } from "@/types/SaleProduct";

type Props = {
    required?: boolean;
    alteration?: string;
    label?: string;
    type: "text" | "number" | "checkbox" | "select" | "date";
    name?: string;
    id?: string;
    value?: string | number;
    class?: string;
    disabled?: boolean;
    width?: string;
    maxWidth?: string;
    minWidth?: string;
    flex?: string;
    checked?: boolean;
    index?: number;
    Change?: any;
    dataSelect?: { id: number; name: string }[] | null;
    data?: any;
    onBlur?: boolean;
    identify?: "id_lense" | "id_treatment" | "id_special_lense";
};

export const InputGrupo = (data: Props) => {
    const [value, setValue] = useState<string | number | undefined>(data.value);
    const [check, setCheck] = useState<boolean | undefined>(false);
    const [selectItem, setSelectItem] = useState(data.dataSelect);
    const [selectDefaultValue, setSelectDefaultValue] = useState<
        string | undefined
    >("selecione");
    const [rules, setRules] = useState<string | null>(null);
    useEffect(() => {
        if (data.type === "number") {
            setValue(data.value);
        } else {
            setValue(data.value);
        }
        setCheck(data.checked);
    }, [data.value, data.checked]);

    useEffect(() => {
        setSelectItem(data.dataSelect);
    }, [data.dataSelect]);

    useEffect(() => {
        setSelectDefaultValue(data.data);
    }, [data.data]);

    useEffect(() => {
        const rules: any = {};
        if (data.required) {
            rules.required = true;
        }
        if (Object.values(rules).length > 0) {
            setRules(JSON.stringify(rules));
        }
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name, type } = e.target as HTMLInputElement;
        setValue(value);
        if (!data.onBlur) {
            if (data.Change) {
                if (value) {
                    if (type === "number") {
                        data.Change(parseFloat(value ?? "0"));
                    } else if (type === "date") {
                        data.Change(
                            new Date(value.replace(/\-/g, "/")).toISOString(),
                        );
                    } else {
                        data.Change(value);
                    }
                } else {
                    data.Change(null);
                }
            }
        }
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = e.target as HTMLInputElement;
        setCheck(checked);
        if (data.value && data.identify) {
            let treatments = data.data as GeneralProduct[];
            const treatment: GeneralProduct = {
                name: data.label as string,
                parent_id: parseInt(data.value as string),
            };
            if (treatments) {
                const index = treatments.findIndex(
                    (item) => item.parent_id === treatment.parent_id,
                );
                if (index !== -1) {
                    treatments = treatments.filter(
                        (item) => item.parent_id !== treatment.parent_id,
                    );
                } else {
                    treatments.push(treatment);
                }
            } else {
                treatments = [treatment];
            }
            data.Change(treatments);
        } else {
            data.Change(checked);
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { value, name } = e.target as HTMLInputElement;
        setValue(value);
        if (data.Change) {
            if (data.data) {
                data.Change({ ...data.data, [name]: value });
            } else {
                data.Change({ [name]: value });
            }
        }
    };

    const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setSelectDefaultValue(value);
        if (data.Change && data.dataSelect) {
            const item = data.dataSelect.filter(
                (i) => i.id === parseInt(value),
            )[0];
            data.Change(item);
        }
    };

    return (
        <div className={[styles.inputGroup, data.class].join(" ")}>
            {(data.type === "text" || data.type === "number") && (
                <>
                    <label htmlFor={data.id}>{data.label}</label>
                    <input
                        data-rules={rules ?? undefined}
                        value={value ?? ""}
                        type={data.type}
                        name={data.name}
                        id={data.id}
                        disabled={data.disabled}
                        className={["border", styles.inputNormal].join(" ")}
                        onBlur={data.onBlur ? handleBlur : undefined}
                        onChange={handleInputChange}
                    />
                </>
            )}
            {data.type === "checkbox" && (
                <>
                    <label className={styles.labelCheckbox}>
                        <input
                            type={data.type}
                            name={data.name}
                            id={data.id}
                            onChange={handleCheckboxChange}
                            disabled={data.disabled}
                            checked={check ?? false}
                        />
                        <div
                            className={[
                                styles.checkmark,
                                "border checkbox",
                            ].join(" ")}
                        ></div>
                        {data.label}
                    </label>
                </>
            )}
            {data.type === "select" && (
                <>
                    <label htmlFor={data.id} className={styles.labelSelect}>
                        {data.label}
                    </label>
                    <select
                        className="border"
                        name={data.name}
                        id={data.id}
                        data-rules={rules ?? undefined}
                        onChange={handleChangeSelect}
                        value={selectDefaultValue ?? ""}
                        disabled={data.disabled}
                    >
                        <option value="selecione" disabled>
                            Selecione
                        </option>
                        {selectItem?.map((item, index) => (
                            <option key={index} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </>
            )}
            {data.type === "date" && (
                <>
                    {data.label && (
                        <label htmlFor={data.id}>{data.label}</label>
                    )}
                    <input
                        data-rules={rules ?? undefined}
                        value={value ?? ""}
                        type={data.type}
                        name={data.name}
                        id={data.id}
                        disabled={data.disabled}
                        className={["border", styles.inputNormal].join(" ")}
                        onChange={handleInputChange}
                    />
                </>
            )}
        </div>
    );
};
