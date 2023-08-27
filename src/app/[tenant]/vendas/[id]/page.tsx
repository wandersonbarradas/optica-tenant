type Props = {
    params: { id: string };
};

const id = ({ params }: Props) => {
    return <div>Vendas numero {params.id}</div>;
};

export default id;
