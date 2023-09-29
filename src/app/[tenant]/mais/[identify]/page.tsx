import {
    authorizeToken,
    getTenantFromSlug,
    getItemsProduct,
} from "@/libs/prismaQueries";
import { More } from "@/pages-components/More";
import { TitlesMore } from "@/types/TitlesMore";
import { Metadata } from "next";
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
    const user = await authorizeToken(tenant.id);
    if (!user) {
        return redirect(`/${tenant.slug}/login`);
    }
    //Pegando Dados do banco de dados
    const data = await getItemsProduct(tenant.id, params.identify);
    return <More data={data} tenant={params.tenant} title={params.identify} />;
}
