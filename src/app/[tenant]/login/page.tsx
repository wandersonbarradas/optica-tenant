import { Login } from "@/pages/Login";
import { authorizeToken, getTenantFromSlug } from "@/libs/prismaQueries";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

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
    const cookieStore = cookies();
    const token = cookieStore.get("token");
    const user = await authorizeToken(token?.value as string);
    if (user) {
        return redirect(`/${tenant.slug}`);
    }
    return <Login tenant={tenant} />;
}
