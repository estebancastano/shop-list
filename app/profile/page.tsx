"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function PerfilPage() {
    const [usuario, setUsuario] = useState<{ name: string; email: string } | null>(null);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({ name: "", email: "" });

    // 🔹 Obtener usuario logueado
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await authClient.getSession();
                const { data, error } = response;

                if (error) {
                    console.error(error.message);
                    return;
                }

                if (data?.user) {
                    setUsuario({ name: data.user.name || "", email: data.user.email || "" });
                    setFormData({ name: data.user.name || "", email: data.user.email || "" });
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            const res = await fetch("/api/users", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error("Error actualizando usuario");

            const updatedUser = await res.json();
            setUsuario({ name: updatedUser.name, email: updatedUser.email });
            setEditMode(false);
            alert("Perfil actualizado correctamente");
        } catch (err) {
            console.error(err);
            alert("Error al actualizar perfil");
        }
    };

    if (loading) return <p className="text-center mt-10">Cargando perfil...</p>;
    if (!usuario) return <p className="text-center mt-10">No hay usuario logueado.</p>;

    return (
        <section className="max-w-lg mx-auto mt-10">
            <Card className="shadow-md">
                <CardHeader className="flex items-center gap-3">
                    <User className="w-8 h-8 text-blue-600" />
                    <CardTitle className="text-2xl font-semibold text-blue-600">Perfil del Usuario</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                    {editMode ? (
                        <>
                            <div>
                                <p className="text-gray-500">Nombre</p>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded"
                                />
                            </div>
                            <div>
                                <p className="text-gray-500">Correo electrónico</p>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded"
                                />
                            </div>
                            <Button variant="outline" className="w-full" onClick={handleSave}>
                                Guardar
                            </Button>
                            <Button variant="ghost" className="w-full mt-2" onClick={() => setEditMode(false)}>
                                Cancelar
                            </Button>
                        </>
                    ) : (
                        <>
                            <div>
                                <p className="text-gray-500">Nombre</p>
                                <p className="text-gray-800 font-medium">{usuario.name}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Correo electrónico</p>
                                <p className="text-gray-800 font-medium">{usuario.email}</p>
                            </div>
                            <Button variant="outline" className="w-full mt-4" onClick={() => setEditMode(true)}>
                                Editar perfil
                            </Button>
                        </>
                    )}
                </CardContent>
            </Card>
        </section>
    );
}
