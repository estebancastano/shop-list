"use client";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();

    const handleLogin = () => {
        alert("Simulación de inicio de sesión con Google");
        router.push("/lists");
    };

    return (
        <section className="flex items-center justify-center min-h-[70vh]">
            <Card className="w-full max-w-sm shadow-md border border-gray-200 rounded-2xl">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-semibold text-gray-800">
                        Inicia sesión
                    </CardTitle>
                </CardHeader>

                <CardContent className="flex flex-col items-center gap-4">
                    <Button
                        onClick={handleLogin}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2"
                    >
                        <LogIn className="w-5 h-5" />
                        Continuar con Google
                    </Button>

                    <p className="text-gray-500 text-sm text-center">
                        Al continuar, aceptas nuestros términos y condiciones.
                    </p>
                </CardContent>
            </Card>
        </section>
    );
}
