export type Tenant = {
    id: number;
    slug: string;
    status: "ONLINE" | "OFFLINE";
    name: string;
    primary_color: string;
    secondary_color: string;
    email: string;
};
