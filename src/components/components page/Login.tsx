"use client";
import { useTenantContext } from "@/contexts/tenant/hook";
import styles from "@/styles/login.module.css";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { useEffect, useState } from "react";
import { Tenant } from "@/types/Tenant";
import { switchTheme } from "@/utils/Theme";
import { Loader } from "../Loader";
import { Validate } from "@/utils/validateForm";
import { Alert } from "@/types/Alert";
import { AlertComponent } from "../Alert";
import { authLogin } from "@/utils/ApiFront";
import { redirect, useRouter } from "next/navigation";
import { useAuthContext } from "@/contexts/auth";

type Props = {
    tenant: Tenant;
};

export const Login = ({ tenant }: Props) => {
    const { setToken, setUser, user } = useAuthContext();
    const { setTenant, tenant: tenantCtx } = useTenantContext();
    const router = useRouter();
    const [emailLogin, setEmailLogin] = useState<string>("");
    const [passwordLogin, setPasswordLogin] = useState<string>("");
    const [passwordLoginVisibility, setPasswordLoginVisibility] =
        useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [btnDisabled, setBtnDisabled] = useState(false);
    const [alerts, setAlerts] = useState<Alert[]>([]);

    useEffect(() => {
        setTenant(tenant);
        switchTheme(tenant.primaryColor, tenant.secondaryColor);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tenant]);

    useEffect(() => {
        if (tenantCtx) {
            setIsLoading(false);
        }
    }, [tenantCtx]);

    const addAlertError = ({ message, type }: Alert) => {
        setAlerts([
            ...alerts,
            {
                message,
                type,
                id: alerts[alerts.length - 1]?.id + 1 ?? 1,
            },
        ]);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        setBtnDisabled(true);
        e.preventDefault();
        if (emailLogin && passwordLogin) {
            const status = Validate.init(
                e.target as HTMLFormElement,
                addAlertError,
            );
            if (status) {
                auth(emailLogin, passwordLogin);
            }
        } else {
            setAlerts([
                ...alerts,
                {
                    message: "Preencha todos os campos",
                    type: "error",
                    id: alerts[alerts.length - 1]?.id + 1 ?? 1,
                },
            ]);
        }
        setBtnDisabled(false);
    };

    const auth = async (email: string, password: string) => {
        const result = await authLogin(email, password);
        if (result.state) {
            console.log(result);
            setAlerts([
                ...alerts,
                {
                    message: result.message,
                    type: "success",
                    id: alerts[alerts.length - 1]?.id + 1 ?? 1,
                },
            ]);

            setToken(result.token);
            setUser(result.user);
            router.refresh();
        } else {
            const err = result.message;
            setAlerts([
                ...alerts,
                {
                    message: err,
                    type: "error",
                    id: alerts[alerts.length - 1]?.id + 1 ?? 1,
                },
            ]);
        }
    };

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className={[styles.container, "scroll"].join(" ")}>
            {alerts.length > 0 && (
                <div className="alertError">
                    <ul className="listError">
                        {alerts.map((item, index) => (
                            <AlertComponent item={item} key={index} />
                        ))}
                    </ul>
                </div>
            )}
            <main className={styles.main}>
                <div className={styles.content}>
                    <h1>Faça login para entrar no sistema {tenant.name}.</h1>
                    <div className={styles.contentLogin}>
                        <div className={styles.headerLogin}>
                            <h3>Entrar</h3>
                        </div>
                        <div className={styles.contentAreaLogin}>
                            <div className={styles.bodyLogin}>
                                <div className={styles.credentialsLogin}>
                                    <form
                                        className={styles.form}
                                        action="#"
                                        onSubmit={handleSubmit}
                                    >
                                        <div className={styles.inputGroup}>
                                            <input
                                                data-rules="email"
                                                type="email"
                                                name="loginEmail"
                                                id="loginEmail"
                                                onChange={(e) =>
                                                    setEmailLogin(
                                                        e.target.value,
                                                    )
                                                }
                                                value={emailLogin}
                                            />
                                            <label
                                                className={[
                                                    emailLogin
                                                        ? null
                                                        : styles.label,
                                                ].join(" ")}
                                                htmlFor="loginEmail"
                                            >
                                                Seu Email
                                            </label>
                                        </div>
                                        <div className={styles.inputGroup}>
                                            <input
                                                type={
                                                    passwordLoginVisibility
                                                        ? "text"
                                                        : "password"
                                                }
                                                data-rules="password"
                                                name="loginPassword"
                                                id="loginPassword"
                                                onChange={(e) =>
                                                    setPasswordLogin(
                                                        e.target.value,
                                                    )
                                                }
                                                value={passwordLogin}
                                            />
                                            {passwordLogin && (
                                                <div
                                                    className={
                                                        styles.visibility
                                                    }
                                                    onClick={() =>
                                                        setPasswordLoginVisibility(
                                                            passwordLoginVisibility
                                                                ? false
                                                                : true,
                                                        )
                                                    }
                                                >
                                                    {passwordLoginVisibility && (
                                                        <VisibilityOffOutlinedIcon />
                                                    )}
                                                    {!passwordLoginVisibility && (
                                                        <VisibilityOutlinedIcon />
                                                    )}
                                                </div>
                                            )}
                                            <label
                                                className={[
                                                    passwordLogin
                                                        ? null
                                                        : styles.label,
                                                ].join(" ")}
                                                htmlFor="loginPassword"
                                            >
                                                Senha
                                            </label>
                                            <div
                                                className={styles.InputIcon}
                                            ></div>
                                        </div>
                                        <input
                                            className={styles.btnSubmit}
                                            type="submit"
                                            name="loginSubmit"
                                            disabled={btnDisabled}
                                        />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
