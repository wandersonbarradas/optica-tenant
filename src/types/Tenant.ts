export type Tenant = {
    id: number;
    slug: string;
    status: "ONLINE" | "OFFLINE";
    name: string;
    primaryColor: string;
    secondaryColor: string;
    email: string;
};
