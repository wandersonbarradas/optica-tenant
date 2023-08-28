import { TenantContextProvider } from "@/contexts/tenant";

export const Provider = ({ children }: { children: React.ReactNode }) => {
    return <TenantContextProvider>{children}</TenantContextProvider>;
};
