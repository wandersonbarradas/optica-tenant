"use client";

import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import Link from "next/link";
import styles from "./navItem.module.css";
import { usePathname } from "next/navigation";
import { useTenantContext } from "@/contexts/tenant/hook";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { useEffect, useState } from "react";

type Props = {
    label: string;
    link?: string;
    icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
        muiName: string;
    };
    disabled?: boolean;
    more?: boolean;
    open?: boolean;
    click?: () => void;
    showMenu?: boolean;
    setShowMenu?: (value: boolean) => void;
};

export const NavItem = (props: Props) => {
    const [arrow, setArrow] = useState(false);
    const { tenant, setTenant } = useTenantContext();
    const pathname = usePathname();
    const verifyPathname = (path?: string) => {
        if (!path || !tenant) {
            return;
        }

        let url = pathname;

        if (path === `/${tenant.slug}` && url !== `/${tenant.slug}`)
            return null;

        if (url && url === path) {
            return styles.activeLink;
        }
        return null;
    };

    useEffect(() => {
        if (props.open !== undefined) {
            setArrow(props.open);
        }
    }, [props.open]);
    const handleClick = (
        e: React.MouseEvent<HTMLAnchorElement | HTMLDivElement>,
    ) => {
        if (props.disabled) {
            e.preventDefault();
            return;
        }
        if (props.click) {
            props.click();
        }
        if (props.setShowMenu) {
            props.setShowMenu(true);
        }
    };
    return (
        <li
            className={[
                styles.navItem,
                verifyPathname(props.link),
                props.disabled ? styles.disabled : null,
            ].join(" ")}
        >
            {props.link && (
                <Link
                    className={styles.boxContent}
                    onClick={handleClick}
                    href={props.link}
                >
                    <div className={styles.icon}>
                        <props.icon />
                    </div>
                    <span className={styles.label}>{props.label}</span>
                </Link>
            )}
            {!props.link && (
                <div className={styles.boxContent} onClick={handleClick}>
                    <div className={styles.icon}>
                        <props.icon />
                    </div>
                    <span className={styles.label}>{props.label}</span>
                    {props.more && props.showMenu && (
                        <div
                            className={[
                                styles.more,
                                arrow ? styles.active : null,
                            ].join(" ")}
                        >
                            <KeyboardArrowUpOutlinedIcon />
                        </div>
                    )}
                </div>
            )}
        </li>
    );
};
