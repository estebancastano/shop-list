import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
    try {
        const session = await auth.api.getSession({ headers: req.headers });
        const userId = session?.user?.id;

        if (!userId) {
            return Response.json({ error: "No autorizado" }, { status: 401 });
        }

        const lists = await prisma.list.findMany({
            where: { userId },
            include: { items: true },
            orderBy: { createdAt: "desc" },
        });

        return Response.json(lists);
    } catch (error) {
        console.error("❌ Error al obtener listas:", error);
        return Response.json({ error: "Error interno del servidor" }, { status: 500 });
    }
}


export async function POST(req: Request) {
    try {
        const session = await auth.api.getSession({ headers: req.headers });
        const userId = session?.user?.id;

        if (!userId) {
            return Response.json({ error: "No autorizado" }, { status: 401 });
        }

        const { title } = await req.json();

        if (!title || title.trim() === "") {
            return Response.json({ error: "El título es obligatorio" }, { status: 400 });
        }

        const newList = await prisma.list.create({
            data: {
                title: title.trim(),
                userId,
            },
        });

        return Response.json(newList);
    } catch (error) {
        console.error("❌ Error al crear lista:", error);
        return Response.json({ error: "Error interno del servidor" }, { status: 500 });
    }
}
