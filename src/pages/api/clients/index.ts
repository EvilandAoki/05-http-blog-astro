import type { APIRoute } from "astro";
import { Clients, db } from "astro:db";

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {

    const users = await db.select().from(Clients);

    return new Response(
        JSON.stringify(users),
        {
            status: 200, headers: { 'Contet-Type': 'application/json' }
        }
    )
}

export const POST: APIRoute = async ({ params, request }) => {

    try {

        const { id, ...body } = await request.json();

        const { lastInsertRowid } = await db.insert(Clients).values(body)

        return new Response(
            JSON.stringify({
                ...body,
                id: +lastInsertRowid!.toString()
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

export const PATCH: APIRoute = async ({ params, request }) => {

    const body = {
        method: "PATCH"
    }


    return new Response(
        JSON.stringify(body),
        {
            status: 200, headers: { 'Contet-Type': 'application/json' }
        }
    )
}

export const DELETE: APIRoute = async ({ params, request }) => {

    const body = {
        method: "DELETE"
    }

    return new Response(
        JSON.stringify(body),
        {
            status: 200, headers: { 'Contet-Type': 'application/json' }
        }
    )
}
