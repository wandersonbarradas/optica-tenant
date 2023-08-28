import { authorizeToken, getTenantFromSlug } from "@/libs/ApiBack";
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
    const tenant = await getTenantFromSlug(params.tenant);
    const cookieStore = cookies();
    const token = cookieStore.get("token");
    const user = await authorizeToken(token?.value as string);
    if (!tenant) {
        return redirect("/");
    }
    if (!user) {
        return <>{children}</>;
    }
    return <Layout tenant={tenant}>{children}</Layout>;
}
