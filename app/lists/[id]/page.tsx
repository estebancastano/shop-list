"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Edit, FileDown } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface Item {
    id: string;
    name: string;
    quantity: string;
    category?: string;
    bought: boolean;
}

interface Lista {
    title: string;
    items: Item[];
}

export default function ListaDetallePage() {
    const { id } = useParams();
    const [items, setItems] = useState<Item[]>([]);
    const [list, setList] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const [openAdd, setOpenAdd] = useState(false);
    const [openEditList, setOpenEditList] = useState(false);
    const [openEditItem, setOpenEditItem] = useState(false);

    const [newItem, setNewItem] = useState({
        name: "",
        quantity: "",
        category: "",
    });

    const [editItem, setEditItem] = useState<Item | null>(null);
    const [newListTitle, setNewListTitle] = useState("");

    useEffect(() => {
        async function fetchData() {
            try {
                const listRes = await fetch(`/api/lists/${id}`);
                if (listRes.ok) {
                    const listData = await listRes.json();
                    setList(listData);
                    setNewListTitle(listData.title);
                }

                const itemsRes = await fetch(`/api/lists/${id}/items`);
                if (!itemsRes.ok) throw new Error("Error al cargar ítems");
                const itemsData = await itemsRes.json();
                setItems(itemsData);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        if (id) fetchData();
    }, [id]);

    const agregarItem = async () => {
        if (!newItem.name || !newItem.quantity)
            return alert("Por favor completa todos los campos.");

        const res = await fetch(`/api/lists/${id}/items`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newItem),
        });

        if (res.ok) {
            const item = await res.json();
            setItems([...items, item]);
            setNewItem({ name: "", quantity: "", category: "" });
            setOpenAdd(false);
        } else {
            alert("Error al agregar ítem");
        }
    };

    const handleEditListName = async () => {
        if (!newListTitle.trim()) return alert("El nombre no puede estar vacío.");

        const res = await fetch(`/api/lists/${list.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: newListTitle }),
        });

        if (res.ok) {
            const updatedList = await res.json();
            setList(updatedList);
            setOpenEditList(false);
        } else {
            alert("Error al actualizar el nombre de la lista");
        }
    };

    const handleEditItem = async () => {
        if (!editItem) return;

        const res = await fetch(`/api/items/${editItem.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: editItem.name,
                quantity: editItem.quantity,
                category: editItem.category,
            }),
        });

        if (res.ok) {
            const updated = await res.json();
            setItems(items.map((i) => (i.id === updated.id ? updated : i)));
            setEditItem(null);
            setOpenEditItem(false);
        } else {
            alert("Error al editar el ítem");
        }
    };

    const eliminarItem = async (itemId: string) => {
        const res = await fetch(`/api/items/${itemId}`, { method: "DELETE" });
        if (res.ok) {
            setItems(items.filter((i) => i.id !== itemId));
        } else {
            alert("Error al eliminar ítem");
        }
    };

    // 🧾 Exportar a PDF
    const exportarPDF = () => {
        // ✅ Comprobamos que haya título e ítems
        if (!list || items.length === 0) {
            console.warn("⚠️ No hay datos para exportar");
            return;
        }

        const doc = new jsPDF();

        // Título del documento
        doc.setFontSize(16);
        doc.text(list.title || "Lista de compras", 10, 15);

        // Convertimos los ítems a filas válidas para la tabla
        const rows = items.map((item, index) => [
            (index + 1).toString(), // índice
            item.quantity ?? "",
            item.name ?? ""
            
        ]);

        console.log("🧾 Exportando filas:", rows); // 👀 Verás los datos en consola

        // 📋 Agregamos la tabla
        autoTable(doc, {
            startY: 25,
            head: [["#", "Cantidad", "Nombre"]],
            body: rows,
            theme: "grid", // da líneas suaves
            headStyles: {
                fillColor: [30, 144, 255], // 🔵 Azul (RGB)
                textColor: [255, 255, 255], // Blanco
                fontStyle: "bold",
            },
            bodyStyles: {
                fillColor: [245, 245, 245], // 🩶 Gris claro
                textColor: [0, 0, 0],
            },
            styles: {
                fontSize: 11,
                cellPadding: 3,
            },
            alternateRowStyles: {
                fillColor: [255, 255, 255], // Blanco para alternar filas
            },
            columnStyles: {
                0: { halign: "center", cellWidth: 15 }, // #
                1: { halign: "center", cellWidth: 25 }, // Cantidad
                2: { halign: "left" },                  // Nombre
            },
            margin: { left: 10, right: 10 },
        });

        // Descargamos el archivo PDF
        doc.save(`${list.title || "lista"}.pdf`);
    };
    if (loading) return <p className="text-center mt-10">Cargando...</p>;

    return (
        <section className="max-w-3xl mx-auto mt-10">
            <Card className="shadow-md">
                <CardHeader className="flex justify-between items-center">
                    <CardTitle className="text-2xl font-semibold text-blue-600">
                        {list?.title || "Lista sin título"} 🛒
                    </CardTitle>

                    <div className="flex gap-2">
                        {/* 📄 Exportar PDF */}
                        <Button
                            onClick={exportarPDF}
                            variant="outline"
                            className="text-blue-600 border-blue-600 hover:bg-blue-50"
                        >
                            <FileDown className="w-4 h-4 mr-1" /> Exportar PDF
                        </Button>

                        {/* ✏️ Editar nombre */}
                        <Dialog open={openEditList} onOpenChange={setOpenEditList}>
                            <DialogTrigger asChild>
                                <Button variant="ghost" className="text-blue-600">
                                    <Edit className="w-4 h-4 mr-1" /> Editar nombre
                                </Button>
                            </DialogTrigger>

                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Editar nombre de lista</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4 py-2">
                                    <Label>Nuevo nombre</Label>
                                    <Input
                                        value={newListTitle}
                                        onChange={(e) => setNewListTitle(e.target.value)}
                                    />
                                </div>
                                <DialogFooter>
                                    <Button onClick={handleEditListName}>Guardar</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                        {/* ➕ Agregar ítem */}
                        <Dialog open={openAdd} onOpenChange={setOpenAdd}>
                            <DialogTrigger asChild>
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Nuevo ítem
                                </Button>
                            </DialogTrigger>

                            <DialogContent className="max-w-sm">
                                <DialogHeader>
                                    <DialogTitle>Agregar nuevo ítem</DialogTitle>
                                </DialogHeader>

                                <div className="space-y-4 py-2">
                                    <div>
                                        <Label>Nombre del ítem</Label>
                                        <Input
                                            value={newItem.name}
                                            onChange={(e) =>
                                                setNewItem({ ...newItem, name: e.target.value })
                                            }
                                            placeholder="Ej. Arroz, Leche, Tomates"
                                        />
                                    </div>

                                    <div>
                                        <Label>Cantidad</Label>
                                        <Input
                                            value={newItem.quantity}
                                            onChange={(e) =>
                                                setNewItem({ ...newItem, quantity: e.target.value })
                                            }
                                            placeholder="Ej. 2 kg, 1 litro, ½ libra"
                                        />
                                    </div>

                                    <div>
                                        <Label>Categoría (opcional)</Label>
                                        <Input
                                            value={newItem.category}
                                            onChange={(e) =>
                                                setNewItem({ ...newItem, category: e.target.value })
                                            }
                                            placeholder="Ej. Granos, Lácteos, Verduras"
                                        />
                                    </div>
                                </div>

                                <DialogFooter>
                                    <Button
                                        onClick={agregarItem}
                                        className="bg-blue-600 text-white"
                                    >
                                        Guardar
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </CardHeader>

                <CardContent>
                    {items.length > 0 ? (
                        <ul className="space-y-3">
                            {items.map((item) => (
                                <li
                                    key={item.id}
                                    className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border"
                                >
                                    <span className="text-gray-800 font-medium">
                                        {item.name} ({item.quantity})
                                        {item.category && (
                                            <span className="text-gray-500 text-sm ml-2">
                                                [{item.category}]
                                            </span>
                                        )}
                                    </span>

                                    <div className="flex gap-2">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => {
                                                setEditItem(item);
                                                setOpenEditItem(true);
                                            }}
                                        >
                                            <Edit className="w-4 h-4" />
                                        </Button>

                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => eliminarItem(item.id)}
                                        >
                                            <Trash2 className="w-4 h-4 text-white" />
                                        </Button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500 text-center mt-4">
                            No hay ítems en esta lista.
                        </p>
                    )}
                </CardContent>
            </Card>

            {/* Modal editar ítem */}
            <Dialog open={openEditItem} onOpenChange={setOpenEditItem}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Editar ítem</DialogTitle>
                    </DialogHeader>
                    {editItem && (
                        <div className="space-y-4 py-2">
                            <div>
                                <Label>Nombre</Label>
                                <Input
                                    value={editItem.name}
                                    onChange={(e) =>
                                        setEditItem({ ...editItem, name: e.target.value })
                                    }
                                />
                            </div>
                            <div>
                                <Label>Cantidad</Label>
                                <Input
                                    value={editItem.quantity}
                                    onChange={(e) =>
                                        setEditItem({ ...editItem, quantity: e.target.value })
                                    }
                                />
                            </div>
                            <div>
                                <Label>Categoría</Label>
                                <Input
                                    value={editItem.category || ""}
                                    onChange={(e) =>
                                        setEditItem({ ...editItem, category: e.target.value })
                                    }
                                />
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button onClick={handleEditItem}>Guardar cambios</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </section>
    );
}
