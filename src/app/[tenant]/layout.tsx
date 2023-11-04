import { authorizeToken, getTenantFromSlug } from "@/libs/prismaQueries";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Layout } from "@/components/Layout/Layout";
import { revalidatePath } from "next/cache";

export const metadata: Metadata = {
    title: "Dev-Dashboard",
};

type Props = {
    children: React.ReactNode;
    params: { tenant: string };
};

export default async function TenantLayout({ children, params }: Props) {
    revalidatePath("/", "layout");
    //Validando Tenant
    const tenant = await getTenantFromSlug(params.tenant);
    if (!tenant || tenant.status === "OFFLINE") {
        return redirect("/");
    }
    //Autenticando usuario via Token no Cookies
    const user = await authorizeToken(tenant.id);

    if (!user) {
        return <>{children}</>;
    }
    return (
        <Layout user={user} tenant={tenant}>
            {children}
        </Layout>
    );
}
