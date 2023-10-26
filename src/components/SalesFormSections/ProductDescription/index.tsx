import stylesSaleId from "@/styles/saleId.module.css";
import { Accordion } from "@/components/Accordion";
import { InputGroup } from "@/components/Input";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { SchemaFormSale } from "@/zod-schemas/schemaFormSale";
import { useFormContext } from "react-hook-form";

export const ProductDescription = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext<SchemaFormSale>();
    return (
        <Accordion
            title="Descrição do Produto"
            classes={[
                stylesSaleId.accordion,
                stylesSaleId.productDescription,
            ].join(" ")}
        >
            <div className={stylesSaleId.grid}>
                <div className={stylesSaleId.gridItem}>
                    <InputGroup
                        errors={errors}
                        name="frame"
                        register={register}
                        id="frame"
                        label="Armação"
                    />
                </div>
                <div className={stylesSaleId.gridItem}>
                    <InputGroup
                        errors={errors}
                        name="od"
                        register={register}
                        id="od"
                        label="OD"
                    />
                </div>
                <div className={stylesSaleId.gridItem}>
                    <InputGroup
                        errors={errors}
                        name="oe"
                        register={register}
                        id="oe"
                        label="OE"
                    />
                </div>
                <div className={stylesSaleId.gridItem}>
                    <InputGroup
                        errors={errors}
                        name="addition"
                        register={register}
                        id="addition"
                        label="Adição"
                    />
                </div>
                <div className={stylesSaleId.gridItem}>
                    <InputGroup
                        errors={errors}
                        name="obs_product"
                        register={register}
                        id="obs_product"
                        label="Observações sobre o Produto"
                    />
                </div>
            </div>
        </Accordion>
    );
};
