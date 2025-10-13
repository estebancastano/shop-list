import "@/styles/globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";
import { ShoppingCart, ListTodo, User } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Lista de Compras",
    description: "Organiza tus compras fácilmente con Next.js y Shadcn UI",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="es">
            <body className={`${inter.className} bg-gray-50 text-gray-900`}>
                {/* Header */}
                <header className="flex justify-between items-center px-6 py-4 bg-white shadow-sm sticky top-0 z-10">
                    <Link href="/" className="flex items-center gap-2 text-lg font-semibold hover:text-blue-600 transition">
                        <ShoppingCart className="w-5 h-5 text-blue-600" />
                        Lista de Compras
                    </Link>

                    <nav className="flex gap-6 text-sm font-medium">
                        <Link href="/lists" className="text-gray-700 hover:text-blue-600 flex items-center gap-1">
                            <ListTodo className="w-4 h-4" />
                            Mis Listas
                        </Link>
                        <Link href="/profile" className="text-gray-700 hover:text-blue-600 flex items-center gap-1">
                            <User className="w-4 h-4" />
                            Perfil
                        </Link>
                        <Link href="/login" className="text-gray-700 hover:text-blue-600">
                            Iniciar sesión
                        </Link>
                    </nav>
                </header>

                {/* Contenido principal */}
                <main className="container mx-auto px-4 py-10">{children}</main>

                {/* Footer */}
                <footer className="text-center py-6 text-sm text-gray-500 border-t mt-10">
                    © {new Date().getFullYear()} Lista de Compras. Todos los derechos reservados.
                </footer>
            </body>
        </html>
    );
}
