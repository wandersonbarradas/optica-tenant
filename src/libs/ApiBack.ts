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
