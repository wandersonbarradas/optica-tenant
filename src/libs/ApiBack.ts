import { GetSalesConfig, SumByMonth, SumByWeek } from "@/types/Api";
import { Sale, SaleBasic } from "@/types/Sale";
import { SalesSummaryStatus } from "@/types/salesSummary";
import { Tenant } from "@/types/Tenant";
import { User } from "@/types/User";

export const getTenantFromSlug = async (
    slug: string,
): Promise<Tenant | undefined> => {
    const tenants: Tenant[] = [
        {
            id: 1,
            slug: "40graus",
            status: "ONLINE",
            name: "Otica 40graus",
            primaryColor: "#ef4f01",
            secondaryColor: "#f5c30f",
            email: "teste@gmail.com",
        },
        {
            id: 2,
            slug: "otica-wanderson",
            status: "ONLINE",
            name: "Otica Wanderson",
            primaryColor: "#52FFB8",
            secondaryColor: "#00A7E1",
            email: "teste@gmail.com",
        },
    ];
    const tenant = tenants.find((item) => item.slug === slug);
    if (tenant) {
        return tenant;
    }
};
export const authorizeToken = async (
    token: string,
): Promise<User | undefined> => {
    if (token === "wandersonbarradas07@gmail.com") {
        return {
            id: 1,
            name: "Wanderson Barradas de Morais",
            email: "wandersonbarradas07@gmail.com",
            active: true,
            registration_date: new Date("2023/08/27").toISOString(),
            id_tenant: 2,
        };
    }
};
export const getSales = async (
    idTenant: number,
    config?: GetSalesConfig,
): Promise<SaleBasic[] | Sale[]> => {
    const currentDate = new Date();
    const late = {
        installments: {
            some: {
                due_date: {
                    lt: currentDate,
                },
                received: false,
            },
        },
    };
    const paid = {
        OR: [
            {
                installments: {
                    every: {
                        received: true,
                    },
                },
            },
            {
                form_payment: {
                    card: true,
                },
            },
            {
                form_payment: {
                    in_cash: true,
                },
            },
        ],
    };
    const open = {
        installments: {
            some: {
                received: false,
            },
        },
    };
    let where: any = {
        id_tenant: idTenant,
    };
    switch (config?.status) {
        case "late":
            where.payment = late;
            break;
        case "paid":
            where.payment = paid;
            break;
        case "open":
            where.payment = open;
            break;
    }
    let orderBy = undefined;
    if (config?.order) {
        switch (config.order.name) {
            case "date":
                orderBy = {
                    date_sale: config.order.order,
                };
        }
    }
    let select = undefined;
    if (config?.select) {
        switch (config.select) {
            case "basic":
                select = selectBasic;
                break;
            case "normal":
                select = selectFull;
        }
    }
    return [
        {
            id: 1,
            client: {
                name: "Wanderson Barradas de Morais",
            },
            date_sale: new Date().toISOString(),
            payment: {
                value: 750,
                cash_value: 680,
                entry_date: null,
                entry_received: null,
                entry_value: null,
                form_payment: {
                    card: true,
                    in_cash: false,
                    name: "Cartão de Débito",
                },
                installments: null,
                number_installments: null,
            },
        },
        {
            id: 2,
            client: {
                name: "Rochelly Raquel Silva de Carvalho",
            },
            date_sale: new Date("2023/07/18").toISOString(),
            payment: {
                value: 600,
                cash_value: null,
                entry_date: new Date("2023/07/18").toISOString(),
                entry_received: true,
                entry_value: 200,
                form_payment: {
                    card: false,
                    in_cash: false,
                    name: "Carnê",
                },
                installments: [
                    {
                        due_date: new Date("2023/08/01").toISOString(),
                        installment_number: 1,
                        receipt_date: null,
                        received: false,
                        value: 100,
                    },
                    {
                        due_date: new Date("2023/09/01").toISOString(),
                        installment_number: 2,
                        receipt_date: null,
                        received: false,
                        value: 100,
                    },
                    {
                        due_date: new Date("2023/10/01").toISOString(),
                        received: false,
                        value: 100,
                        installment_number: 3,
                        receipt_date: null,
                    },
                    {
                        due_date: new Date("2023/11/01").toISOString(),
                        installment_number: 4,
                        receipt_date: null,
                        received: false,
                        value: 100,
                    },
                ],
                number_installments: 4,
            },
        },
        {
            id: 3,
            client: {
                name: "Jorge Matheus da Silva",
            },
            date_sale: new Date("2023/07/18").toISOString(),
            payment: {
                value: 600,
                cash_value: null,
                entry_date: new Date("2023/07/18").toISOString(),
                entry_received: true,
                entry_value: 200,
                form_payment: {
                    card: false,
                    in_cash: false,
                    name: "Carnê",
                },
                installments: [
                    {
                        due_date: new Date("2023/08/01").toISOString(),
                        installment_number: 1,
                        receipt_date: new Date("2023/08/01").toISOString(),
                        received: true,
                        value: 100,
                    },
                    {
                        due_date: new Date("2023/09/01").toISOString(),
                        installment_number: 2,
                        receipt_date: new Date("2023/09/01").toISOString(),
                        received: true,
                        value: 100,
                    },
                    {
                        due_date: new Date("2023/10/01").toISOString(),
                        received: false,
                        value: 100,
                        installment_number: 3,
                        receipt_date: null,
                    },
                    {
                        due_date: new Date("2023/11/01").toISOString(),
                        installment_number: 4,
                        receipt_date: null,
                        received: false,
                        value: 100,
                    },
                ],
                number_installments: 4,
            },
        },
    ];
    // return await Prisma.sale.findMany({
    //     take: config?.take,
    //     where,
    //     orderBy,
    //     select
    // });
};
export const getSumByMonth = async (idTenant: number): Promise<SumByMonth> => {
    let months = {
        January: 10000,
        February: 6000,
        March: 8655,
        April: 15000,
        May: 3600,
        June: 5487,
        July: 7235,
        August: 8966,
        September: 4775,
        October: 11699,
        November: 13699,
        December: 18700,
    } as SumByMonth;
    return months;
};
export const getSumByWeek = async (idTenant: number): Promise<SumByWeek> => {
    const week: SumByWeek = {
        Mon: { value: 500, quantity: 1 },
        Tue: { value: 300, quantity: 1 },
        Wed: { value: 0, quantity: 5 },
        Thu: { value: 100, quantity: 0 },
        Fri: { value: 120, quantity: 0 },
        Sat: { value: 500.99, quantity: 2 },
        Sun: { value: 700, quantity: 2 },
    };
    return week;
};
export const getSalesSummaryStatus = async (
    idTenant: number,
): Promise<SalesSummaryStatus> => {
    return {
        total: 6,
        paid: 4,
        pending: 2,
        late: 1,
    };
    // const result = await Prisma.$queryRaw`
    //             SELECT
    //         SUM(CASE
    //             WHEN forms_payments.in_cash = true OR forms_payments.card = true OR (SELECT COUNT(*) FROM installments WHERE installments.id_payment = payments.id AND installments.received = false) = 0 THEN 1
    //             ELSE 0
    //         END) AS paid,
    //         SUM(CASE
    //             WHEN forms_payments.in_cash = false AND forms_payments.card = false AND (SELECT COUNT(*) FROM installments WHERE installments.id_payment = payments.id AND installments.received = false) > 0 THEN 1
    //             ELSE 0
    //         END) AS pending,
    //         SUM(CASE
    //             WHEN forms_payments.in_cash = false AND forms_payments.card = false AND (SELECT COUNT(*) FROM installments WHERE installments.id_payment = payments.id AND installments.received = false AND installments.due_date <= NOW()) > 0 THEN 1
    //             ELSE 0
    //         END) AS late
    //     FROM sales
    //     INNER JOIN payments ON sales.id = payments.id_sale
    //     INNER JOIN forms_payments ON payments.id_payment_method = forms_payments.id
    //     WHERE sales.id_tenant =${idTenant};
    //     `;
    // return result;
};

const selectBasic = {
    id: true,
    client: {
        select: {
            name: true,
        },
    },
    payment: {
        select: {
            cash_value: true,
            entry_received: true,
            entry_value: true,
            entry_date: true,
            form_payment: {
                select: {
                    card: true,
                    in_cash: true,
                    name: true,
                },
            },
            installments: {
                select: {
                    due_date: true,
                    installment_number: true,
                    received: true,
                    value: true,
                    receipt_date: true,
                },
            },
            number_installments: true,
            value: true,
        },
    },
    date_sale: true,
};

const selectFull = {
    id: true,
    client: {
        select: {
            id: true,
            name: true,
            phone: true,
        },
    },
    frame: true,
    od: true,
    oe: true,
    addition: true,
    treatments: {
        select: {
            id: true,
            parent_id: true,
            name: true,
        },
    },
    lenses: {
        select: {
            id: true,
            parent_id: true,
            name: true,
        },
    },
    specialLenses: {
        select: {
            id: true,
            parent_id: true,
            name: true,
        },
    },
    payment: {
        select: {
            id: true,
            cash_value: true,
            entry_date: true,
            entry_received: true,
            id_entry_receiver: true,
            entry_value: true,
            form_payment: {
                select: {
                    card: true,
                    id: true,
                    in_cash: true,
                    name: true,
                },
            },
            installments: {
                select: {
                    id_sale: true,
                    id_payment: true,
                    id: true,
                    due_date: true,
                    id_receiver: true,
                    installment_number: true,
                    received: true,
                    receipt_date: true,
                    value: true,
                },
            },
            number_installments: true,
            value: true,
        },
    },
    id_employee: true,
    obs_sale: true,
    date_sale: true,
    order_date: true,
    order_delivered: true,
    obs_product: true,
    user: {
        select: {
            id: true,
            name: true,
        },
    },
};
