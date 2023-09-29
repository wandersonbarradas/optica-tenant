import { NotificationType } from "@/types/NotificationItemType";
import { TitlesMore } from "@/types/TitlesMore";

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
    identify: TitlesMore,
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
    if (req.ok) {
        data.data = response;
    } else {
        data.error = response.error;
    }
    return data;
};

export const updateProductData = async (
    item: { id: number; name: string },
    identify: TitlesMore,
    tenant: string,
): Promise<ReturnCreateProduct> => {
    let data: ReturnCreateProduct = {
        status: false,
    };
    const req = await fetch(`/api/${tenant}/mais/${identify}/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: item.name }),
    });
    data.status = req.ok;
    const response = await req.json();
    if (req.ok) {
        data.data = response;
    } else {
        data.error = response.error;
    }
    return data;
};

export const deleteProductData = async (
    id: number,
    identify: TitlesMore,
    tenant: string,
): Promise<ReturnCreateProduct> => {
    let data: ReturnCreateProduct = {
        status: false,
    };
    const req = await fetch(`/api/${tenant}/mais/${identify}/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    });
    data.status = req.ok;
    const response = await req.json();
    if (req.ok) {
        data.data = response;
    } else {
        data.error = response.error;
    }
    return data;
};
