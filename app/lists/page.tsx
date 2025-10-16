"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

type Lista = {
    id: string;
    title: string;
    createdAt: string;
};

export default function ListasPage() {
    const router = useRouter();
    const [listas, setListas] = useState<Lista[]>([]);
    const [loading, setLoading] = useState(false);

    // ✅ Traer listas del usuario
    useEffect(() => {
        const fetchListas = async () => {
            const res = await fetch("/api/lists");
            if (res.ok) {
                const data = await res.json();
                setListas(data);
            }
        };
        fetchListas();
    }, []);

    // ✅ Crear nueva lista
    const agregarLista = async () => {
        const nombre = prompt("Nombre de la nueva lista:");
        if (!nombre) return;
        setLoading(true);
        const res = await fetch("/api/lists", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: nombre }),
        });
        setLoading(false);
        if (res.ok) {
            const nueva = await res.json();
            setListas([...listas, nueva]);
        } else {
            alert("Error al crear la lista");
        }
    };

    // ✅ Eliminar lista
    const eliminarLista = async (id: string) => {
        const res = await fetch(`/api/lists/${id}`, { method: "DELETE" });
        if (res.ok) {
            setListas(listas.filter((l) => l.id !== id));
        } else {
            alert("Error al eliminar la lista");
        }
    };

    // ✅ Navegar a la lista seleccionada
    const abrirLista = (id: string) => {
        router.push(`/lists/${id}`);
    };

    return (
        <section className="max-w-3xl mx-auto mt-10">
            <Card className="shadow-md">
                <CardHeader className="flex justify-between items-center">
                    <CardTitle className="text-2xl font-semibold text-blue-600">
                        Mis Listas 📝
                    </CardTitle>
                    <Button
                        onClick={agregarLista}
                        disabled={loading}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        {loading ? "Creando..." : "Nueva Lista"}
                    </Button>
                </CardHeader>

                <CardContent>
                    {listas.length > 0 ? (
                        <ul className="space-y-3">
                            {listas.map((lista) => (
                                <li
                                    key={lista.id}
                                    onClick={() => abrirLista(lista.id)}
                                    className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border hover:bg-gray-100 cursor-pointer transition"
                                >
                                    <span className="text-gray-800 font-medium">{lista.title}</span>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={(e) => {
                                            e.stopPropagation(); // evita que también navegue al hacer clic en eliminar
                                            eliminarLista(lista.id);
                                        }}
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
