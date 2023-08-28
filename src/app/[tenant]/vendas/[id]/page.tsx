type Props = {
    params: { id: string };
};

const Id = ({ params }: Props) => {
    return <div>Vendas numero {params.id}</div>;
};

export default Id;
