import { Home } from "../../components/Home";

type Props = {
    params: { tenant: string };
};

export default async function Page({ params }: Props) {
    return <Home />;
}
