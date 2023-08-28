"use client";

import { TenantContent } from "@/contexts/tenant";
import styles from "../styles/layout.module.css";
import { useContext, useEffect, useState } from "react";
import { switchTheme } from "@/utils/Theme";
import { Tenant } from "@/types/Tenant";
import { usePathname } from "next/navigation";
import { Loader } from "./Loader";
import { AsideLayout } from "./AsideLayout";
import { HeaderLayout } from "./HeaderLayout";
import { User } from "@/types/User";

type Props = {
    tenant: Tenant;
    children: React.ReactNode;
};

export const Layout = ({ children, tenant }: Props) => {
    const [showMenu, setShowMenu] = useState(false);
    const tenantCtx = useContext(TenantContent);
    const pathname = usePathname();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        switchTheme(tenant.primaryColor, tenant.secondaryColor);
        tenantCtx?.setTenant(tenant);
        setShowMenu(false);
        setLoading(false);
    }, []);

    useEffect(() => {
        setShowMenu(false);
    }, [pathname]);

    if (loading) {
        return <Loader />;
    }
    return (
        <div className={styles.container}>
            <AsideLayout setShowMenu={setShowMenu} showMenu={showMenu} />
            <div>
                <HeaderLayout setShowMenu={setShowMenu} />
                <main>{children}</main>
            </div>
        </div>
    );
};
