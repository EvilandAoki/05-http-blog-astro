import type { APIRoute } from "astro";
import { Clients, db, eq } from "astro:db";

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {

    const clientId = params.clientId

    const body = {
        method: "GET",
        clientId
    }

    return new Response(
        JSON.stringify(body),
        {
            status: 200, headers: { 'Contet-Type': 'application/json' }
        }
    )
}


export const PATCH: APIRoute = async ({ params, request }) => {

    const clientId = JSON.parse(params.clientId ?? '')

    try {

        const { id, ...body } = await request.json();

        const result = await db.update(Clients).set(body).where(eq(Clients.id, clientId))

        const updatedClient = await db.select().from(Clients).where(eq(Clients.id, clientId))

        return new Response(
            JSON.stringify({
                updatedClient
            }),
            {
                status: 201, headers: { 'Contet-Type': 'application/json' }
            }
        )

    } catch (err) {
        return new Response(
            JSON.stringify({ message: "no body found" }),
            {
                status: 201, headers: { 'Contet-Type': 'application/json' }
            }
        )
    }
}

export const DELETE: APIRoute = async ({ params, request }) => {

    try {
        const clientId = JSON.parse(params.clientId ?? '')

        const { rowsAffected } = await db.delete(Clients).where(eq(Clients.id, clientId))

        if (rowsAffected > 0) {
            return new Response(
                JSON.stringify({ msg: "Client deleted successfully" }),
                {
                    status: 200, headers: { 'Contet-Type': 'application/json' }
                }
            )
        } else {
            return new Response(
                JSON.stringify({ msg: `Client with id ${clientId} not found` }),
                {
                    status: 404, headers: { 'Contet-Type': 'application/json' }
                }
            )
        }
    } catch (error) {
        return new Response(
            JSON.stringify({ message: "no body found" }),
            {
                status: 201, headers: { 'Contet-Type': 'application/json' }
            }
        )
    }
}
