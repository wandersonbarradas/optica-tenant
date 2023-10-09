"use client";

import { useTenantContext } from "@/contexts/tenant";
import styles from "@/styles/layout.module.css";
import { useEffect, useState } from "react";
import { switchTheme } from "@/utils/Theme";
import { Tenant } from "@/types/Tenant";
import { usePathname } from "next/navigation";
import { Loader } from "../Loader";
import { AsideLayout } from "../AsideLayout";
import { HeaderLayout } from "../HeaderLayout";
import { useAuthContext } from "@/contexts/auth";
import { useAlertContext } from "@/contexts/alert";
import { User } from "@/types/User";
import { AlertComponent } from "../Alert";

type Props = {
    tenant: Tenant;
    user: User;
    children: React.ReactNode;
};

export const Layout = ({ children, tenant, user }: Props) => {
    const { alert } = useAlertContext();
    const { setUser } = useAuthContext();
    const [showMenu, setShowMenu] = useState(false);
    const { setTenant } = useTenantContext();
    const pathname = usePathname();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        switchTheme(tenant.primary_color, tenant.secondary_color);
        setTenant(tenant);
        setUser(user);
        setLoading(false);
    }, [tenant]);

    if (loading) {
        return <Loader />;
    }
    return (
        <div className={styles.container}>
            {alert.length > 0 && (
                <div className="alertError">
                    <ul className="listError">
                        {alert.map((item, index) => (
                            <AlertComponent item={item} key={index} />
                        ))}
                    </ul>
                </div>
            )}
            <AsideLayout setShowMenu={setShowMenu} showMenu={showMenu} />
            <div className={[styles.layoutMain, "scroll"].join(" ")}>
                <HeaderLayout setShowMenu={setShowMenu} />
                <main className={!showMenu ? "closeMenu" : ""}>{children}</main>
            </div>
        </div>
    );
};
