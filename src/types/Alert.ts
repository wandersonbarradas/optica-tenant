export type Alert = {
    id: number;
    type: "error" | "success" | "warning";
    message: string;
};
