import { authorizeToken } from "@/libs/ApiBack";
import { Dashboard } from "../../components/components page/Dashboard";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

type Props = {
    params: { tenant: string };
};

export default async function Page({ params }: Props) {
    const cookieStore = cookies();
    const token = cookieStore.get("token");
    const user = await authorizeToken(token?.value as string);
    if (!user) {
        return redirect(`/${params.tenant}/login`);
    }
    return <Dashboard user={user} token={token?.value as string} />;
}
