import Link from "next/link";
import styles from "./AsideLayout.module.css";
import Image from "next/image";
import { useTenantContext } from "@/contexts/tenant/hook";
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
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import { useState } from "react";
import { redirect } from "next/navigation";
import { useAuthContext } from "@/contexts/auth";

type Props = {
    setShowMenu: (value: boolean) => void;
    showMenu: boolean;
};

export const AsideLayout = ({ setShowMenu, showMenu }: Props) => {
    const { tenant } = useTenantContext();
    const { setToken, setUser } = useAuthContext();
    const [moreMenu, setMoreMenu] = useState(false);

    const logOut = () => {
        setToken("");
        redirect(`/${tenant?.slug}/login`);
    };
    return (
        <aside
            className={[
                styles.aside,
                showMenu ? styles.active : null,
                "scroll",
            ].join(" ")}
        >
            <div
                onClick={() => setShowMenu(!showMenu)}
                className={styles.ArrowIcon}
            >
                <KeyboardArrowRightOutlinedIcon />
            </div>
            <div className={styles.menuHeader}>
                <div className={styles.menuLogo}>
                    <Link href={`/${tenant?.slug}`}>
                        <Image
                            src={Logo}
                            alt={`Logo ${tenant?.name}`}
                            width={showMenu ? 65 : 50}
                            height={showMenu ? 65 : 50}
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
                        icon={AssessmentOutlinedIcon}
                        disabled
                    />
                    <NavItem
                        label="Vendas"
                        link={`/${tenant?.slug}/vendas`}
                        icon={LocalShippingOutlinedIcon}
                    />
                    <NavItem
                        label="Clientes"
                        link={`/${tenant?.slug}/clientes`}
                        icon={GroupsOutlinedIcon}
                        disabled
                    />
                    <NavItem
                        label="Mais"
                        icon={MoreHorizOutlinedIcon}
                        more
                        open={moreMenu}
                        showMenu={showMenu}
                        setShowMenu={setShowMenu}
                        click={() => setMoreMenu(!moreMenu)}
                    />
                    <div
                        className={[
                            styles.moreMenu,
                            moreMenu && showMenu ? styles.active : null,
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
                        link={`/${tenant?.slug}/login`}
                        label="Sair"
                        icon={ExitToAppOutlinedIcon}
                        click={logOut}
                    />
                </ul>
            </div>
        </aside>
    );
};
