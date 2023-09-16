import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dev-Login",
};

type Props = {
    children: React.ReactNode;
    params: { tenant: string };
};

export default async function TenantLayout({ children, params }: Props) {
    return <>{children}</>;
}
