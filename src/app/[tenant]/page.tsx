import { authorizeToken } from "@/libs/ApiBack";
import { Home } from "../../components/components page/Home";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

type Props = {
    params: { tenant: string };
};

export default async function Page({ params }: Props) {
    console.log(params);
    const cookieStore = cookies();
    const token = cookieStore.get("token");
    const user = await authorizeToken(token?.value as string);
    if (!user) {
        return redirect(`/${params.tenant}/login`);
    }
    return <Home user={user} token={token?.value as string} />;
}
