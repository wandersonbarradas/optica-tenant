import { getTenantFromSlug } from "@/libs/ApiBack";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Layout } from "@/components/Layout";

export const metadata: Metadata = {
    title: "Dashboard",
};

type Props = {
    children: React.ReactNode;
    params: { tenant: string };
};

export default async function TenantLayout({ children, params }: Props) {
    const tenant = await getTenantFromSlug(params.tenant);
    if (tenant) {
        return <Layout tenant={tenant}>{children}</Layout>;
    } else {
        redirect("/");
    }
}
