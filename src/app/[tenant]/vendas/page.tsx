import { Sales } from "@/components/components page/Sales";
import {
    getSales,
    getSalesSummaryStatus,
    getTenantFromSlug,
} from "@/libs/ApiBack";
import { redirect } from "next/navigation";

type Props = {
    params: { tenant: string };
    searchParams?: { page: string };
};

const Vendas = async ({ params, searchParams }: any) => {
    //Pegando Tenant
    const tenant = await getTenantFromSlug(params.tenant);
    if (!tenant) return redirect("/");
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
