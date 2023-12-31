import { Login } from "@/pages-components/Login";
import { authorizeToken, getTenantFromSlug } from "@/libs/prismaQueries";
import { redirect } from "next/navigation";

type PropsPage = {
    params: { tenant: string };
};

export default async function Page({ params }: PropsPage) {
    //Validando tenant
    const tenant = await getTenantFromSlug(params.tenant);
    if (!tenant || tenant.status === "OFFLINE") {
        return redirect("/");
    }
    //Autorizando usuario via token
    const user = await authorizeToken(tenant.id);
    if (user) {
        return redirect(`/${tenant.slug}`);
    }
    return <Login tenant={tenant} />;
}
