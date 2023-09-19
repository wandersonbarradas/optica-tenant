import { ActionType, DataType, Actions } from "./types";

export const reducer = (state: DataType, action: ActionType) => {
    switch (action.type) {
        case Actions.SET_ALERT:
            return { ...state, alert: [...state.alert, action.payload.alert] };
        case Actions.REMOVE_ALERT:
            const newAlerts = state.alert.filter(
                (item) => item.id !== action.payload.id,
            );
            return { ...state, alert: newAlerts };
        default:
            return state;
    }
};
