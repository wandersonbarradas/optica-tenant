import {
    authorizeToken,
    getTenantFromSlug,
    getItemsProduct,
    getFormsPayments,
    getSaleFromId,
} from "@/libs/prismaQueries";
import { SaleId } from "@/pages-components/SaleId";
import { Sale } from "@/types/Sale";
import { redirect } from "next/navigation";

type Props = {
    params: { id: string; tenant: string };
};

const Id = async ({ params }: Props) => {
    //validando tenant
    const tenant = await getTenantFromSlug(params.tenant);
    if (!tenant || tenant.status === "OFFLINE") {
        return redirect("/");
    }
    if (params.id !== "nova" && isNaN(Number(params.id))) {
        return redirect(`/${tenant.slug}/vendas`);
    }
    //Autenticando usuario via Token no Cookies
    const user = await authorizeToken(tenant.id);
    if (!user) {
        return redirect(`/${tenant.slug}/login`);
    }
    const [treatments, lenses, specialLenses, employees, formsPayments, sale] =
        await Promise.all([
            getItemsProduct(tenant.id, "tratamentos"),
            getItemsProduct(tenant.id, "lentes"),
            getItemsProduct(tenant.id, "lentes-especiais"),
            getItemsProduct(tenant.id, "funcionarios"),
            getFormsPayments(tenant.id),
            params.id !== "nova"
                ? getSaleFromId(parseInt(params.id), tenant.id)
                : undefined,
        ]);
    // if (params.id !== "nova" && sale === null) {
    //     return redirect(`/${tenant.slug}/vendas`);
    // }
    return (
        <SaleId
            page={params.id}
            employees={employees}
            formsPayments={formsPayments}
            lenses={lenses}
            specialLenses={specialLenses}
            treatments={treatments}
            sale={sale as Sale | undefined}
        />
    );
};

export default Id;
