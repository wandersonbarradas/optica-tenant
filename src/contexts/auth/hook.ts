import { useContext } from "react";
import { AppContext } from ".";
import { Actions } from "./types";
import { User } from "@/types/User";
import { setCookie } from "cookies-next";
export const useAuthContext = () => {
    const { state, dispatch } = useContext(AppContext);

    return {
        ...state,
        setToken: (token: string) => {
            const agora = new Date();
            const dataProximoAno = new Date();
            dataProximoAno.setFullYear(agora.getFullYear() + 1);

            setCookie("token", token, {
                expires: dataProximoAno,
            });
            dispatch({
                type: Actions.SET_TOKEN,
                payload: { token },
            });
        },
        setUser: (user: User | null) => {
            dispatch({
                type: Actions.SET_USER,
                payload: { user },
            });
        },
    };
};
