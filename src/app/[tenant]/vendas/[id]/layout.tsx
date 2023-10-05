import type { Metadata } from "next";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const id = params.id;
    let title = "Dev-";
    if (id !== "nova" && !isNaN(parseInt(id))) {
        title += `Venda ${id}`;
    } else if (id === "nova") {
        title += `Nova venda`;
    } else {
        title += "redirect";
    }
    return {
        title: title,
    };
}

type Props = {
    children: React.ReactNode;
    params: { tenant: string; id: string };
};

export default async function TenantLayout({ children, params }: Props) {
    return <>{children}</>;
}
