"use client";

import { useContext } from "react";
import { TenantContent } from "@/contexts/tenantContext";

export const Home = () => {
    const tenantCtx = useContext(TenantContent);

    return <div>Pagina do {tenantCtx?.tenant?.name}</div>;
};
