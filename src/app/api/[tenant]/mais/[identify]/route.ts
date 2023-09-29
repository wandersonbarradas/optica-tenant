import {
    addItemProduct,
    authorizeToken,
    getItemsProduct,
    getTenantFromSlug,
} from "@/libs/prismaQueries";
import { ProductApi } from "@/types/Api";
import { TitlesMore } from "@/types/TitlesMore";

type Params = {
    params: {
        tenant: string;
        identify: string;
    };
};

const titles = ["lentes", "lentes-especiais", "tratamentos", "funcionarios"];

export async function POST(request: Request, { params }: Params) {
    if (!titles.includes(params.identify)) {
        return new Response(
            JSON.stringify({ error: "Parametro não encontrado!" }),
            {
                status: 404,
            },
        );
    }
    try {
        //Validando tenant
        const tenant = await getTenantFromSlug(params.tenant);
        if (!tenant || tenant.status === "OFFLINE") {
            return new Response(
                JSON.stringify({ error: "Tenant not found!" }),
                {
                    status: 404,
                },
            );
        }
        //Validando usuario
        const user = await authorizeToken(tenant.id);
        if (!user || !user.active) {
            return new Response(JSON.stringify({ error: "Access denied!" }), {
                status: 401,
            });
        }
        //Validando dados da requisição
        const requestData: { name: string } = await request.json();
        if (!requestData.name || requestData.name.length < 2) {
            return new Response(
                JSON.stringify({
                    error: "Requisição mal formatada, forneça todos os parametros!",
                }),
                {
                    status: 400,
                },
            );
        }
        const itemData: ProductApi = {
            id_tenant: tenant.id,
            id_user: user.id,
            name: requestData.name,
            registration_date: new Date(),
        };
        const item = await addItemProduct(
            itemData,
            params.identify as TitlesMore,
        ).catch((error) => {
            return new Response(JSON.stringify({ error: error }), {
                status: 500,
            });
        });
        return new Response(JSON.stringify(item), {
            status: 200,
        });
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
        });
    }
}

export async function GET(request: Request, { params }: Params) {
    if (!titles.includes(params.identify)) {
        return new Response(
            JSON.stringify({ error: "Parametro não encontrado!" }),
            {
                status: 404,
            },
        );
    }
    try {
        //Validando tenant
        const tenant = await getTenantFromSlug(params.tenant);
        if (!tenant || tenant.status === "OFFLINE") {
            return new Response(
                JSON.stringify({ error: "Tenant not found!" }),
                {
                    status: 404,
                },
            );
        }
        //Validando usuario
        const user = await authorizeToken(tenant.id);
        if (!user || !user.active) {
            return new Response(JSON.stringify({ error: "Access denied!" }), {
                status: 401,
            });
        }
        //Validando dados da requisição
        const items = await getItemsProduct(
            tenant.id,
            params.identify as TitlesMore,
        ).catch((error) => {
            return new Response(JSON.stringify({ error: error }), {
                status: 500,
            });
        });
        return new Response(JSON.stringify(items), {
            status: 200,
        });
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
        });
    }
}
