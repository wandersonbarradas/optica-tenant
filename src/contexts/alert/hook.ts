import { useContext } from "react";
import { AlertContext } from ".";
import { Actions } from "./types";
export const useAlertContext = () => {
    const { state, dispatch } = useContext(AlertContext);

    return {
        ...state,
        setAlert: (alert: {
            type: "error" | "success" | "warning";
            message: string;
        }) => {
            const id = Math.floor(Math.random() * 100000);
            const newAlert = { ...alert, id };
            dispatch({ type: Actions.SET_ALERT, payload: { alert: newAlert } });
            setTimeout(() => {
                dispatch({
                    type: Actions.REMOVE_ALERT,
                    payload: { id: newAlert.id },
                });
            }, 5000);
        },
        removeAlert: (id: number) => {
            dispatch({
                type: Actions.REMOVE_ALERT,
                payload: { id },
            });
        },
    };
};
