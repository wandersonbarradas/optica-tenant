import { NotificationType } from "@/types/NotificationItemType";

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

export const authLogin = async (
    email: string,
    password: string,
    tenantSlug: string,
): Promise<{ status: boolean; data: string }> => {
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
    return {
        status: req.ok,
        data: result.response,
    };
};
