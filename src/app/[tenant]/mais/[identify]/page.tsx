import { authorizeToken, getTenantFromSlug } from "@/libs/prismaQueries";
import { More } from "@/pages-components/More";
import { TitlesMore } from "@/types/TitlesMore";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";

const titles = ["lentes", "lentes-especiais", "tratamentos", "funcionarios"];
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    return {
        title: `Dev-${params.identify}`,
    };
}

type Props = {
    params: { tenant: string; identify: TitlesMore };
};

export default async function name({ params }: Props) {
    if (!titles.includes(params.identify)) {
        notFound();
    }
    const tenant = await getTenantFromSlug(params.tenant);
    if (!tenant || tenant.status === "OFFLINE") {
        return redirect("/");
    }
    //Autenticando usuario via Token no Cookies
    const cookieStore = cookies();
    const token = cookieStore.get("token");
    const user = await authorizeToken(token?.value as string, tenant.id);
    if (!user) {
        return redirect(`/${tenant.slug}/login`);
    }
    return <More title={params.identify} />;
}
