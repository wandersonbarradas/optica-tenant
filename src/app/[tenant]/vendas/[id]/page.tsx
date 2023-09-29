import { authorizeToken, getTenantFromSlug } from "@/libs/prismaQueries";
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
    //Autenticando usuario via Token no Cookies
    const user = await authorizeToken(tenant.id);
    if (!user) {
        return redirect(`/${tenant.slug}/login`);
    }
    return <div>Vendas numero {params.id}</div>;
};

export default Id;
