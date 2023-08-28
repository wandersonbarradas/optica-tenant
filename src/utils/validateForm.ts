import { Alert } from "@/types/Alert";

export const Validate = {
    init(form: HTMLFormElement, setError: ({ message, type }: Alert) => void) {
        const inputs = form.querySelectorAll("input");
        if (inputs) {
            const status = this.checkInput(inputs, setError);
            return status;
        }
        return false;
    },
    checkInput(
        inputs: NodeListOf<HTMLInputElement>,
        setError: ({ message, type }: Alert) => void,
    ) {
        let status = true;
        const fields = [...(inputs as unknown as HTMLInputElement[])];
        for (let i in fields) {
            if (fields[i].nodeName === "INPUT") {
                const res = this.checkRules(fields[i]) as string | boolean;
                if (res !== true && res !== undefined) {
                    status = false;
                    setError({
                        message: res as string,
                        type: "error",
                        id: Math.floor(Math.random() * 10000),
                    });
                    return;
                }
            }
        }
        return status;
    },
    checkRules(input: HTMLInputElement) {
        const rules = input.dataset?.rules;
        if (rules) {
            const rules2 = rules.split("|");
            for (let i in rules2) {
                switch (rules2[i]) {
                    case "email":
                        if (!input.value.match(/\w{2,}@\w{2,}\.\w{2,}/)) {
                            return "Email não é valido";
                        }
                        break;
                    case "password":
                        if (input.value.length < 8) {
                            return "Senha precisa ter pelo menos 8 caracteres!";
                        }
                        break;
                }
            }
        }
        return true;
    },
};
