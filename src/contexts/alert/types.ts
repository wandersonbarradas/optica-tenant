import { Alert } from "@/types/Alert";
import { Dispatch, ReactNode } from "react";

export type DataType = {
    alert: Alert[];
};

export type ActionType = {
    type: Actions;
    payload?: any;
};

export type ContextType = {
    state: DataType;
    dispatch: Dispatch<ActionType>;
};

export type ProviderType = {
    children: ReactNode;
};

export enum Actions {
    SET_ALERT,
    REMOVE_ALERT,
}
