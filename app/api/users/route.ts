import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authClient } from "@/lib/auth-client"; // el cliente BetterAuth que tienes en frontend

export async function PUT(req: NextRequest) {
    try {
        // 🔹 Obtener la sesión del usuario logueado
        const sessionResponse = await authClient.getSession();
        const { data, error } = sessionResponse;

        if (error) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
        if (!data?.user) return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });

        const body = await req.json();
        const { name, email } = body;

        // 🔹 Actualizar usuario en la base de datos con Prisma
        const updatedUser = await prisma.user.update({
            where: { id: data.user.id },
            data: { name, email },
        });

        return NextResponse.json(updatedUser, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Error actualizando usuario" }, { status: 500 });
    }
}
