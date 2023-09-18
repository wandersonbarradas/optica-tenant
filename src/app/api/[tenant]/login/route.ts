import { getUserTenantFromEmail } from "@/libs/prismaQueries";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(request: Request, params: { tenant: string }) {
    const data: { password: string; email: string } = await request.json();
    if (!data.email || !data.password) {
        const body = JSON.stringify({
            response: "Email e/ou senha inválidos!",
        });
        return new Response(body, {
            status: 400,
        });
    }
    const user = await getUserTenantFromEmail(data.email, 1);
    if (!user) {
        const body = JSON.stringify({
            response: "Usuário não encontrado!",
        });
        return new Response(body, {
            status: 401,
        });
    }
    if (!user.active) {
        const body = JSON.stringify({
            response:
                "Usuário está desativado, contate o administrador do sistema!",
        });
        return new Response(body, {
            status: 401,
        });
    }
    if (user.password !== data.password) {
        const body = JSON.stringify({
            response: "Senha incorreta!",
        });
        return new Response(body, {
            status: 401,
        });
    }
    const secret = process.env.SECRET_KEY as string;
    try {
        const token = jwt.sign(
            {
                email: user.email,
                id_tenant: user.id_tenant,
                name: user.name,
            },
            secret,
            {
                expiresIn: "1d",
                subject: user.id.toString(),
                issuer: "tenant-optica",
            },
        );
        return NextResponse.json({ response: token });
    } catch (error) {
        const body = JSON.stringify({
            response: "Erro ao gerar token!",
        });
        return new Response(body, {
            status: 500,
        });
    }
}
