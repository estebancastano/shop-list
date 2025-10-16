import prisma from "@/lib/prisma";

export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params;

    const items = await prisma.item.findMany({
        where: { listId: id },
    });

    return Response.json(items);
}

export async function POST(req: Request, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params;
    const data = await req.json();
    const { name, quantity, category } = data;

    const newItem = await prisma.item.create({
        data: {
            name,
            quantity,
            category,
            listId: id,
        },
    });

    return Response.json(newItem);
}
