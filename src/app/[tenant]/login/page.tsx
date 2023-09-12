import { Login } from "@/components/Pages/Login";
import { getTenantFromSlug } from "@/libs/ApiBack";
import { redirect } from "next/navigation";

type PropsPage = {
    params: { tenant: string };
};

export default async function Page({ params }: PropsPage) {
    const tenant = await getTenantFromSlug(params.tenant);
    if (!tenant) {
        return redirect("/");
    }
    return <Login tenant={tenant} />;
}
