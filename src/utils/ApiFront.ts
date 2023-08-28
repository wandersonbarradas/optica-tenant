import { NotificationType } from "@/types/NotificationItemType";
import { User } from "@/types/User";

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

type AuthLogin = {
    state: boolean;
    message: string;
    user: User | null;
    token: string;
};

export const authLogin = (
    email: string,
    password: string,
): Promise<AuthLogin> => {
    return new Promise((resolve, reject) => {
        if (email !== "wandersonbarradas07@gmail.com") {
            resolve({
                state: false,
                message: "Usuário não encontrado!",
                user: null,
                token: "",
            });
        }
        if (password !== "20122013") {
            resolve({
                state: false,
                message: "Senha incorreta!",
                user: null,
                token: "",
            });
        } else {
            resolve({
                state: true,
                message: "Login bem sucedido!",
                token: "wandersonbarradas07@gmail.com",
                user: {
                    id: 1,
                    name: "Wanderson Barradas de Morais",
                    email: "wandersonbarradas07@gmail.com",
                    active: true,
                    registration_date: new Date("2023/08/27").toISOString(),
                    id_tenant: 2,
                },
            });
        }
    });
};
