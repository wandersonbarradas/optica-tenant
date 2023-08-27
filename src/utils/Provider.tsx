import { TenantContextProvider } from "@/contexts/tenantContext";

export const Provider = ({ children }: { children: React.ReactNode }) => {
    return <TenantContextProvider>{children}</TenantContextProvider>;
};
