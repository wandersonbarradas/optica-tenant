import { TenantContextProvider } from "@/contexts/tenant";
import { AuthProvider } from "@/contexts/auth";

export const Provider = ({ children }: { children: React.ReactNode }) => {
    return (
        <TenantContextProvider>
            <AuthProvider>{children}</AuthProvider>
        </TenantContextProvider>
    );
};
