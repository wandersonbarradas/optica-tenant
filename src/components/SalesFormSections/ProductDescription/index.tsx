import stylesSaleId from "@/styles/saleId.module.css";
import { Accordion } from "@/components/Accordion";
import { InputGroup } from "@/components/Input";
import { SchemaFormSale } from "@/zod-schemas/schemaFormSale";
import { useFormContext } from "react-hook-form";
import { GeneralProduct } from "@/types/GeneralProduct";

type Props = {
    treatments: GeneralProduct[] | null;
    lenses: GeneralProduct[] | null;
    specialLenses: GeneralProduct[] | null;
};

export const ProductDescription = ({
    treatments,
    lenses,
    specialLenses,
}: Props) => {
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
                    <InputGroup name="frame" id="frame" label="Armação" />
                </div>
                <div className={stylesSaleId.gridItem}>
                    <InputGroup name="od" id="od" label="OD" />
                </div>
                <div className={stylesSaleId.gridItem}>
                    <InputGroup name="oe" id="oe" label="OE" />
                </div>
                <div className={stylesSaleId.gridItem}>
                    <InputGroup name="addition" id="addition" label="Adição" />
                </div>
                <div className={stylesSaleId.gridItem}>
                    <h3 className={stylesSaleId.subTitleSection}>
                        Tratamentos
                    </h3>
                    <div className={stylesSaleId.checkboxArea}>
                        {treatments?.map((item, index) => (
                            <InputGroup
                                key={index}
                                name="treatments"
                                id={item.name.toLowerCase()}
                                label={item.name}
                                value={item.id}
                                type="checkbox"
                            />
                        ))}
                    </div>
                </div>
                <div className={stylesSaleId.gridItem}>
                    <h3 className={stylesSaleId.subTitleSection}>
                        Tipo de Lentes
                    </h3>
                    <div className={stylesSaleId.checkboxArea}>
                        {lenses?.map((item, index) => (
                            <InputGroup
                                key={index}
                                name="treatments"
                                id={item.name.toLowerCase()}
                                label={item.name}
                                value={item.id}
                                type="checkbox"
                            />
                        ))}
                    </div>
                </div>
                <div className={stylesSaleId.gridItem}>
                    <h3 className={stylesSaleId.subTitleSection}>
                        Lentes Especiais
                    </h3>
                    <div className={stylesSaleId.checkboxArea}>
                        {specialLenses?.map((item, index) => (
                            <InputGroup
                                key={index}
                                name="treatments"
                                id={item.name.toLowerCase()}
                                label={item.name}
                                value={item.id}
                                type="checkbox"
                            />
                        ))}
                    </div>
                </div>
                <div className={stylesSaleId.gridItem}>
                    <InputGroup
                        name="obs_product"
                        id="obs_product"
                        label="Observações sobre o Produto"
                    />
                </div>
            </div>
        </Accordion>
    );
};
