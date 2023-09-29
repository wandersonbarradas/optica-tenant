import {
    authorizeToken,
    updateItemProduct,
    softDeleteItemProduct,
    getItemProduct,
    getTenantFromSlug,
} from "@/libs/prismaQueries";
import { TitlesMore } from "@/types/TitlesMore";

type Params = {
    params: {
        tenant: string;
        identify: string;
        id: string;
    };
};

const titles = ["lentes", "lentes-especiais", "tratamentos", "funcionarios"];

export async function DELETE(request: Request, { params }: Params) {
    if (!titles.includes(params.identify) || isNaN(parseInt(params.id))) {
        return new Response(
            JSON.stringify({ error: "Parametro não encontrado!" }),
            {
                status: 404,
            },
        );
    }
    const id = parseInt(params.id);
    try {
        //Validando se o item existe
        const item = await getItemProduct(id, params.identify as TitlesMore);
        if (!item) {
            return new Response(
                JSON.stringify({
                    error: "Item não encontrado no banco de dados!",
                }),
                {
                    status: 400,
                },
            );
        }
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
        //"Deletando" Item
        const deletedItem = await softDeleteItemProduct(
            id,
            params.identify as TitlesMore,
        ).catch((error) => {
            return new Response(JSON.stringify({ error: error }), {
                status: 500,
            });
        });
        return new Response(JSON.stringify(deletedItem), {
            status: 200,
        });
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
        });
    }
}

export async function PUT(request: Request, { params }: Params) {
    if (!titles.includes(params.identify) || isNaN(parseInt(params.id))) {
        return new Response(
            JSON.stringify({ error: "Parametro não encontrado!" }),
            {
                status: 404,
            },
        );
    }
    const id = parseInt(params.id);
    try {
        //Validando se o item existe
        const product = await getItemProduct(id, params.identify as TitlesMore);
        if (!product) {
            return new Response(
                JSON.stringify({
                    error: "Item não encontrado no banco de dados!",
                }),
                {
                    status: 400,
                },
            );
        }
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
        const updatedItemData = {
            id,
            name: requestData.name,
        };
        //"Deletando" Item
        const updatedItem = await updateItemProduct(
            updatedItemData,
            params.identify as TitlesMore,
        ).catch((error) => {
            return new Response(JSON.stringify({ error: error }), {
                status: 500,
            });
        });
        return new Response(JSON.stringify(updatedItem), {
            status: 200,
        });
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
        });
    }
}
