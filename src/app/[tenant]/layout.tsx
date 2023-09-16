import { authorizeToken, getTenantFromSlug } from "@/libs/prismaQueries";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Layout } from "@/components/Layout/Layout";
import { cookies } from "next/headers";

export const metadata: Metadata = {
    title: "Dev-Dashboard",
};

type Props = {
    children: React.ReactNode;
    params: { tenant: string };
};

export default async function TenantLayout({ children, params }: Props) {
    //Validando Tenant
    const tenant = await getTenantFromSlug(params.tenant);
    if (!tenant || tenant.status === "OFFLINE") {
        return redirect("/");
    }
    //Autenticando usuario via Token no Cookies
    const cookieStore = cookies();
    const token = cookieStore.get("token");
    const user = await authorizeToken(token?.value as string);

    if (!user) {
        return <>{children}</>;
    }
    return (
        <Layout user={user} tenant={tenant}>
            {children}
        </Layout>
    );
}
