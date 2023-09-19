import { NotificationType } from "@/types/NotificationItemType";

export const authLogin = async (
    email: string,
    password: string,
    tenantSlug: string,
): Promise<{ status: boolean; data: string }> => {
    let data = {
        status: false,
        data: "",
    };
    try {
        const req = await fetch(`/api/${tenantSlug}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });
        const result = await req.json();
        data.data = result.response;
        data.status = req.ok;
    } catch (error) {
        console.log(error);
        data.data = "Error desconhecido, verifique o console do navegador!";
    }
    return data;
};
export const getLateInstallments = async (): Promise<NotificationType[]> => {
    const installments: NotificationType[] = [
        {
            numberInstallment: 1,
            client: "Wanderson Barradas de Morais",
            idSale: 1,
            value: 105.99,
            dueDate: new Date("2023/08/27"),
        },
    ];
    return installments;
};
type ReturnCreateProduct = {
    status: boolean;
    data?: {
        name: string;
        id: number;
    };
    error?: string;
};
export const createProductData = async (
    name: string,
    identify: string,
    tenant: string,
): Promise<ReturnCreateProduct> => {
    let data: ReturnCreateProduct = {
        status: false,
    };
    const req = await fetch(`/api/${tenant}/mais/${identify}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
    });
    data.status = req.ok;
    const response = await req.json();
    if (response.ok) {
        data.data = response.response;
    } else {
        data.error = response.error;
    }
    return data;
};
