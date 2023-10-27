import stylesSaleId from "@/styles/saleId.module.css";
import { Accordion } from "@/components/Accordion";
import { InputGroup } from "@/components/Input";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

export const ClientSection = () => {
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
                                name="codigo"
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
                        name="phone"
                        id="phone"
                        label="Telefone"
                        disabled
                    />
                </div>
                <div className={stylesSaleId.gridItem}>
                    <InputGroup
                        name="name"
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
