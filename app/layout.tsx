import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/nabvar";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Lista de Compras",
    description: "Organiza tus compras fácilmente con Next.js y Shadcn UI",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="es">
            <body className={`${inter.className} bg-gray-50 text-gray-900`}>
                <Navbar />

                {/* Contenido principal */}
                <main className="container mx-auto px-4 py-10">{children}</main>

                {/* Footer */}
                <footer className="text-center py-6 text-sm text-gray-500 border-t mt-10">
                    © {new Date().getFullYear()} Hecho con amor por <Link href="https://github.com/estebancastano" className="hover:text-blue-600">Esteban</Link>.
                </footer>
            </body>
        </html>
    );
}