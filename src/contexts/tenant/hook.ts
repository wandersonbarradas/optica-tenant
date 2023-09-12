import { useContext } from "react";
import { TenantContent } from ".";

export const useTenantContext = () => {
    const { tenant, setTenant } = useContext(TenantContent);

    return {
        tenant,
        setTenant,
    };
};
