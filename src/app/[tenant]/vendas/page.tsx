import { Sales } from "@/pages-components/Sales";
import {
    authorizeToken,
    getSales,
    getSalesSummaryStatus,
    getTenantFromSlug,
} from "@/libs/prismaQueries";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

type Props = {
    params: { tenant: string };
    searchParams?: { page: string };
};

const Vendas = async ({ params, searchParams }: any) => {
    //Pegando Tenant
    const tenant = await getTenantFromSlug(params.tenant);
    if (!tenant || tenant.status === "OFFLINE") return redirect("/");
    //Autenticando usuario via Token no Cookies
    const cookieStore = cookies();
    const token = cookieStore.get("token");
    const user = await authorizeToken(token?.value as string, tenant.id);
    if (!user) {
        return redirect(`/${tenant.slug}/login`);
    }
    //Pegando ultimas vendas
    const [sales, salesSummaryStatus] = await Promise.all([
        getSales(tenant.id, {
            order: { name: "date", order: "desc" },
            take: 5,
            select: "basic",
        }),
        getSalesSummaryStatus(tenant.id),
    ]);
    return <Sales sales={sales} salesSummaryStatus={salesSummaryStatus} />;
};

export default Vendas;
