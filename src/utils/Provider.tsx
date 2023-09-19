"use client";

import { TenantContextProvider } from "@/contexts/tenant";
import { AuthProvider } from "@/contexts/auth";
import { AlertProvider } from "@/contexts/alert";
export const Provider = ({ children }: { children: React.ReactNode }) => {
    return (
        <TenantContextProvider>
            <AuthProvider>
                <AlertProvider>{children}</AlertProvider>
            </AuthProvider>
        </TenantContextProvider>
    );
};
