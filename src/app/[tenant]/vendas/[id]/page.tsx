import { authorizeToken, getTenantFromSlug } from "@/libs/prismaQueries";
import { cookies } from "next/headers";
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
    const cookieStore = cookies();
    const token = cookieStore.get("token");
    const user = await authorizeToken(token?.value as string);
    if (!user) {
        return redirect(`/${tenant.slug}/login`);
    }
    return <div>Vendas numero {params.id}</div>;
};

export default Id;
