import stylesSaleId from "@/styles/saleId.module.css";
import { Accordion } from "@/components/Accordion";
import { InputGroup } from "@/components/Input";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { SchemaFormSale } from "@/zod-schemas/schemaFormSale";
import { useFormContext } from "react-hook-form";

export const ClientSection = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext<SchemaFormSale>();
    return (
        <Accordion
            title="Cliente"
            classes={[stylesSaleId.accordion, stylesSaleId.client].join(" ")}
        >
            <div className={stylesSaleId.grid}>
                <div className={stylesSaleId.gridItem}>
                    <label className={stylesSaleId.label} htmlFor="codigo">
                        Código
                    </label>
                    <div className={stylesSaleId.flexItem}>
                        <div>
                            <InputGroup
                                errors={errors}
                                name="codigo"
                                register={register}
                                id="codigo"
                                type="number"
                            />
                        </div>
                        <div className={["icon", stylesSaleId.icon].join(" ")}>
                            <SearchOutlinedIcon />
                        </div>
                    </div>
                </div>
                <div className={stylesSaleId.gridItem}>
                    <InputGroup
                        errors={errors}
                        name="phone"
                        register={register}
                        id="phone"
                        label="Telefone"
                        disabled
                    />
                </div>
                <div className={stylesSaleId.gridItem}>
                    <InputGroup
                        errors={errors}
                        name="name"
                        register={register}
                        id="name"
                        label="Nome"
                        type="text"
                        disabled
                    />
                </div>
            </div>
        </Accordion>
    );
};
