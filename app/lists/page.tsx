"use client";

import { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

export default function ListasPage() {
    const [listas, setListas] = useState<string[]>(["Frutas", "Verduras", "Aseo"]);

    const agregarLista = () => {
        const nombre = prompt("Nombre de la nueva lista:");
        if (nombre) setListas([...listas, nombre]);
    };

    const eliminarLista = (nombre: string) => {
        setListas(listas.filter((l) => l !== nombre));
    };

    return (
        <section className="max-w-3xl mx-auto mt-10">
            <Card className="shadow-md">
                <CardHeader className="flex justify-between items-center">
                    <CardTitle className="text-2xl font-semibold text-blue-600">
                        Mis Listas 📝
                    </CardTitle>
                    <Button onClick={agregarLista} className="bg-blue-600 hover:bg-blue-700 text-white">
                        <Plus className="w-4 h-4 mr-2" />
                        Nueva Lista
                    </Button>
                </CardHeader>

                <CardContent>
                    {listas.length > 0 ? (
                        <ul className="space-y-3">
                            {listas.map((lista, i) => (
                                <li
                                    key={i}
                                    className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border"
                                >
                                    <span className="text-gray-800 font-medium">{lista}</span>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => eliminarLista(lista)}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500 text-center mt-4">
                            No tienes listas creadas aún.
                        </p>
                    )}
                </CardContent>
            </Card>
        </section>
    );
}
