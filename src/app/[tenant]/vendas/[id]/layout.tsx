import type { Metadata } from "next";
import { notFound } from "next/navigation";

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
    if (params.id !== "nova" && isNaN(parseInt(params.id))) {
        notFound();
    }
    return <>{children}</>;
}
