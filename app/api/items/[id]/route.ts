import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// 🔹 Actualizar un ítem
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const data = await req.json();

        const updatedItem = await prisma.item.update({
            where: { id },
            data,
        });

        return NextResponse.json(updatedItem);
    } catch (error) {
        console.error("Error al actualizar ítem:", error);
        return NextResponse.json({ error: "Error al actualizar ítem" }, { status: 500 });
    }
}

// 🔹 Eliminar un ítem
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;

        await prisma.item.delete({
            where: { id },
        });

        return NextResponse.json({ message: "Ítem eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar ítem:", error);
        return NextResponse.json({ error: "Error al eliminar ítem" }, { status: 500 });
    }
}
