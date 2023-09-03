const Formatters = {
    formatBrazilianCurrency: (value: number) =>
        value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        }),
    formatZero: (value: number) =>
        value < 10 && value > -1 ? `0${value}` : value,
};

export default Formatters;
