"use client";

import Link from "next/link";
import { ShoppingCart, ListTodo, User, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";

export function Navbar() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const session = await authClient.getSession();
            setIsAuthenticated(!!session.data);
            setIsLoading(false);
        };
        checkAuth();
    }, []);

    const handleSignOut = async () => {
        await authClient.signOut();
        window.location.href = "/";
    };

    return (
        <header className="flex justify-between items-center px-6 py-4 bg-white shadow-sm sticky top-0 z-10">
            <Link href="/" className="flex items-center gap-2 text-lg font-semibold hover:text-blue-600 transition">
                <ShoppingCart className="w-5 h-5 text-blue-600" />
                Lista de Compras
            </Link>

            <nav className="flex gap-6 text-sm font-medium">
                {isAuthenticated && (
                    <>
                        <Link href="/lists" className="text-gray-700 hover:text-blue-600 flex items-center gap-1">
                            <ListTodo className="w-4 h-4" />
                            Mis Listas
                        </Link>
                        <Link href="/profile" className="text-gray-700 hover:text-blue-600 flex items-center gap-1">
                            <User className="w-4 h-4" />
                            Perfil
                        </Link>
                    </>
                )}
                
                {!isLoading && (
                    <>
                        {isAuthenticated ? (
                            <Button 
                                onClick={handleSignOut}
                                variant="destructive"
                                className="text-white"
                            >
                                <LogOut className="w-4 h-4" />
                                Cerrar sesión
                            </Button>
                        ) : (
                            <Link href="/login" className="text-gray-700 hover:text-blue-600">
                                Iniciar sesión
                            </Link>
                        )}
                    </>
                )}
            </nav>
        </header>
    );
}