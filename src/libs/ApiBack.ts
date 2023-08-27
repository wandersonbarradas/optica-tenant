import { Tenant } from "@/types/Tenant";

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
