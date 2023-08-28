"use client";

import { useContext, useEffect } from "react";
import { TenantContent } from "@/contexts/tenant";
import { User } from "@/types/User";
import { useAuthContext } from "@/contexts/auth";

type Props = {
    user: User;
    token: string;
};

export const Home = ({ token, user }: Props) => {
    const tenantCtx = useContext(TenantContent);
    const { setToken, setUser } = useAuthContext();

    useEffect(() => {
        setToken(token);
        setUser(user);
    }, []);

    return <div>Pagina do {tenantCtx?.tenant?.name}</div>;
};
