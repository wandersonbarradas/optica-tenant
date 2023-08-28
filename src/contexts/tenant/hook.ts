import { useContext } from "react";
import { TenantContent } from ".";
import { Tenant } from "@/types/Tenant";

export const useTenantContext = () => {
    const { tenant, setTenant } = useContext(TenantContent);

    return {
        tenant,
        setTenant,
    };
};
