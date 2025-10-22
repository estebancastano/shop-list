"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";
import { useTheme } from "@/app/hooks/useTheme";
import {
    ShoppingCart,
    ListTodo,
    User,
    LogOut,
    Menu,
    X,
    Moon,
    Sun
} from "lucide-react";

export function Navbar() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [menuOpen, setMenuOpen] = useState(false);
    const { isDark, toggleTheme } = useTheme();



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

    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <header className="w-full bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-20">
            <div className="flex justify-between items-center px-4 sm:px-6 py-3">
                {/* 🛒 Logo */}
                <Link
                    href="/"
                    className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
                >
                    <ShoppingCart className="w-5 h-5 text-blue-600" />
                    Lista de Compras
                </Link>

                <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleTheme}
                    className="text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-yellow-400 transition"
                >
                    {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </Button>


                {/* 🍔 Botón menú (solo móvil) */}
                <button
                    className="sm:hidden text-gray-700 hover:text-blue-600 transition"
                    onClick={toggleMenu}
                >
                    {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>

                {/* 🧭 Navegación desktop */}
                <nav className="hidden sm:flex gap-6 text-sm font-medium items-center">
                    {isAuthenticated && (
                        <>
                            <Link
                                href="/lists"
                                className="text-gray-700 hover:text-blue-600 flex items-center gap-1"
                            >
                                <ListTodo className="w-4 h-4" />
                                Mis Listas
                            </Link>
                            <Link
                                href="/profile"
                                className="text-gray-700 hover:text-blue-600 flex items-center gap-1"
                            >
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
                                    className="text-white flex items-center gap-1"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Cerrar sesión
                                </Button>
                            ) : (
                                <Link
                                    href="/login"
                                    className="text-gray-700 hover:text-blue-600 transition-colors"
                                >
                                    Iniciar sesión
                                </Link>
                            )}
                        </>
                    )}
                </nav>
            </div>

            {/* 📱 Menú móvil desplegable */}
            {menuOpen && (
                <div className="sm:hidden border-t border-gray-200 bg-white shadow-inner">
                    <nav className="flex flex-col p-4 space-y-3 text-sm font-medium">
                        {isAuthenticated && (
                            <>
                                <Link
                                    href="/lists"
                                    className="text-gray-700 hover:text-blue-600 flex items-center gap-2"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    <ListTodo className="w-4 h-4" />
                                    Mis Listas
                                </Link>
                                <Link
                                    href="/profile"
                                    className="text-gray-700 hover:text-blue-600 flex items-center gap-2"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    <User className="w-4 h-4" />
                                    Perfil
                                </Link>
                            </>
                        )}

                        {!isLoading && (
                            <>
                                {isAuthenticated ? (
                                    <Button
                                        onClick={() => {
                                            handleSignOut();
                                            setMenuOpen(false);
                                        }}
                                        variant="destructive"
                                        className="w-full flex items-center justify-center gap-2 text-white"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        Cerrar sesión
                                    </Button>
                                ) : (
                                    <Link
                                        href="/login"
                                        onClick={() => setMenuOpen(false)}
                                        className="text-gray-700 hover:text-blue-600 flex items-center gap-2"
                                    >
                                        <User className="w-4 h-4" />
                                        Iniciar sesión
                                    </Link>
                                )}
                            </>
                        )}
                    </nav>
                </div>
            )}
        </header>
    );
}
