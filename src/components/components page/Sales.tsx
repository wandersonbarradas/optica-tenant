import { SaleBasic } from "@/types/Sale";
import { SalesSummaryStatus } from "@/types/salesSummary";

type Props = {
    sales: SaleBasic[];
    salesSummaryStatus: SalesSummaryStatus;
};

export const Sales = ({ sales, salesSummaryStatus }: Props) => {
    return <div>Vendas</div>;
};
