import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// 🔹 Obtener una lista por ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const list = await prisma.list.findUnique({
            where: { id: params.id },
        });

        if (!list) {
            return NextResponse.json({ error: "Lista no encontrada" }, { status: 404 });
        }

        return NextResponse.json(list);
    } catch (error) {
        console.error("Error al obtener lista:", error);
        return NextResponse.json({ error: "Error al obtener lista" }, { status: 500 });
    }
}

// 🔹 Actualizar nombre de la lista
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const { title } = await req.json();

        const updatedList = await prisma.list.update({
            where: { id },
            data: { title },
        });

        return NextResponse.json(updatedList);
    } catch (error) {
        console.error("Error al actualizar lista:", error);
        return NextResponse.json({ error: "Error al actualizar lista" }, { status: 500 });
    }
}

// 🔹 Eliminar una lista
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;

        const deletedList = await prisma.list.delete({
            where: { id },
        });

        return NextResponse.json({
            message: "Lista eliminada correctamente",
            deletedList,
        });
    } catch (error) {
        console.error("Error al eliminar lista:", error);
        return NextResponse.json({ error: "Error al eliminar lista" }, { status: 500 });
    }
}
