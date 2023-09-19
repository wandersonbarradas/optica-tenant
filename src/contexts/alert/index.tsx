"use client";

import { createContext, useReducer } from "react";
import { reducer } from "./reducer";
import { ContextType, DataType, ProviderType } from "./types";

export { useAlertContext } from "./hook";

const initialState: DataType = {
    alert: [],
};

export const AlertContext = createContext<ContextType>({
    state: initialState,
    dispatch: () => {},
});

export const AlertProvider = ({ children }: ProviderType) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const value = { state, dispatch };

    return (
        <AlertContext.Provider value={value}>{children}</AlertContext.Provider>
    );
};
