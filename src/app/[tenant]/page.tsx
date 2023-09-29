import {
    authorizeToken,
    getSales,
    getSumByMonth,
    getSumByWeek,
    getTenantFromSlug,
} from "@/libs/prismaQueries";
import { Dashboard } from "../../pages-components/Dashboard";
import { redirect } from "next/navigation";

type Props = {
    params: { tenant: string };
};

export default async function Page({ params }: Props) {
    //Validando Tenant
    const tenant = await getTenantFromSlug(params.tenant);
    if (!tenant || tenant.status === "OFFLINE") return redirect("/");
    //Autenticando usuario via Token no Cookies
    const user = await authorizeToken(tenant.id);
    if (!user) return redirect(`/${params.tenant}/login`);
    //Pegando ultimas vendas
    const [lastSales, sumByMonth, resumeWeek] = await Promise.all([
        getSales(tenant.id, {
            order: { name: "date", order: "desc" },
            take: 5,
            select: "basic",
        }),
        getSumByMonth(tenant.id),
        getSumByWeek(tenant.id),
    ]);
    return (
        <Dashboard
            lastSales={lastSales}
            sumByMonth={sumByMonth}
            resumeWeek={resumeWeek}
        />
    );
}
