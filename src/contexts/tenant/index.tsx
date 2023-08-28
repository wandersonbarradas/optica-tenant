"use client";
import { Tenant } from "@/types/Tenant";
import { ReactNode, createContext, useState } from "react";

type ContextType = {
    tenant: Tenant | null;
    setTenant: (tenant: Tenant) => void;
};

export const TenantContent = createContext<ContextType>({
    tenant: null,
    setTenant: () => {},
});

export const TenantContextProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [tenant, setTenant] = useState<Tenant | null>(null);

    return (
        <TenantContent.Provider value={{ setTenant, tenant }}>
            {children}
        </TenantContent.Provider>
    );
};
