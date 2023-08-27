import Link from "next/link";
import styles from "./AsideLayout.module.css";
import Image from "next/image";
import { useTenantContext } from "@/contexts/tenantContext/hook";
import Logo from "../../../public/images/logo.jpg";
import { NavItem } from "../NavItem";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import { useState } from "react";

type Props = {
    setShowMenu: (value: boolean) => void;
    showMenu: boolean;
};

export const AsideLayout = ({ setShowMenu, showMenu }: Props) => {
    const { tenant } = useTenantContext();
    const [moreMenu, setMoreMenu] = useState(false);

    return (
        <aside
            className={[
                styles.aside,
                showMenu ? styles.active : null,
                "scroll",
            ].join(" ")}
        >
            <div className={styles.menuHeader}>
                <div className={styles.menuLogo}>
                    <Link href={`/${tenant?.slug}`}>
                        <Image
                            src={Logo}
                            alt={`Logo ${tenant?.name}`}
                            width={50}
                            height={50}
                            style={{ borderRadius: "50%" }}
                            priority
                        />
                    </Link>
                </div>
                <div
                    onClick={() => setShowMenu(!showMenu)}
                    className={[styles.closeMenu, "icon"].join(" ")}
                >
                    <CloseOutlinedIcon />
                </div>
            </div>
            <nav className={styles.nav}>
                <ul className={styles.menuNavigation}>
                    <NavItem
                        label="Dashboard"
                        link={`/${tenant?.slug}`}
                        icon={DashboardOutlinedIcon}
                    />
                    <NavItem
                        label="Relatórios"
                        link={`/${tenant?.slug}/relatorios`}
                        icon={DashboardOutlinedIcon}
                        disabled
                    />
                    <NavItem
                        label="Vendas"
                        link={`/${tenant?.slug}/vendas`}
                        icon={DashboardOutlinedIcon}
                    />
                    <NavItem
                        label="Clientes"
                        link={`/${tenant?.slug}/clientes`}
                        icon={DashboardOutlinedIcon}
                        disabled
                    />
                    <NavItem
                        label="Mais"
                        icon={MoreHorizOutlinedIcon}
                        more
                        open={moreMenu}
                        click={() => setMoreMenu(!moreMenu)}
                    />
                    <div
                        className={[
                            styles.moreMenu,
                            moreMenu ? styles.active : null,
                        ].join(" ")}
                    >
                        <ul>
                            <NavItem
                                link={`/${tenant?.slug}/outros/funcionarios`}
                                label="Funcionários"
                                icon={BadgeOutlinedIcon}
                                disabled
                            />
                            <NavItem
                                link={`/${tenant?.slug}/outros/tratamentos`}
                                label="Tratamentos"
                                icon={RemoveRedEyeOutlinedIcon}
                                disabled
                            />
                            <NavItem
                                link={`/${tenant?.slug}/outros/lentes`}
                                label="Lentes"
                                icon={RemoveRedEyeOutlinedIcon}
                                disabled
                            />
                            <NavItem
                                link={`/${tenant?.slug}/outros/lentes-especiais`}
                                label="Lentes especiais"
                                icon={RemoveRedEyeOutlinedIcon}
                                disabled
                            />
                        </ul>
                    </div>
                </ul>
            </nav>
            <div className={styles.options}>
                <ul className={styles.menuOptions}>
                    <NavItem
                        link={`/${tenant?.slug}/usuario`}
                        label="Usuário"
                        icon={AccountCircleOutlinedIcon}
                        disabled
                    />
                    <NavItem
                        link={`/${tenant?.slug}/configuracoes`}
                        label="Configurações"
                        icon={SettingsOutlinedIcon}
                        disabled
                    />
                    <NavItem
                        label="Sair"
                        icon={ExitToAppOutlinedIcon}
                        disabled
                    />
                </ul>
            </div>
        </aside>
    );
};
