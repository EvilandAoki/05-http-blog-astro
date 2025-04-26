import type { APIRoute } from "astro";


export const GET: APIRoute = async ({ params, request }) => {
    return new Response('ok', { status: 400 })
}

