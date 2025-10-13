"use client";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

export default function PerfilPage() {
    const usuario = {
        nombre: "Esteban Castaño",
        email: "esteban@example.com",
    };

    return (
        <section className="max-w-lg mx-auto mt-10">
            <Card className="shadow-md">
                <CardHeader className="flex items-center gap-3">
                    <User className="w-8 h-8 text-blue-600" />
                    <CardTitle className="text-2xl font-semibold text-blue-600">
                        Perfil del Usuario
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                    <div>
                        <p className="text-gray-500">Nombre</p>
                        <p className="text-gray-800 font-medium">{usuario.nombre}</p>
                    </div>

                    <div>
                        <p className="text-gray-500">Correo electrónico</p>
                        <p className="text-gray-800 font-medium">{usuario.email}</p>
                    </div>

                    <Button variant="outline" className="w-full mt-4">
                        Editar perfil
                    </Button>
                </CardContent>
            </Card>
        </section>
    );
}
