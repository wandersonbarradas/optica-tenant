export type GetSalesConfig = {
    status?: "late" | "paid" | "open" | "all";
    take?: number;
    order?: {
        name: string;
        order: "asc" | "desc";
    };
    select?: "normal" | "basic";
};

export type SumByMonth = Record<string, number>;

export type SumByWeek = Record<string, { value: number; quantity: number }>;
