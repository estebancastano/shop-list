"use client";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleLoginWithGoogle = async () => {
        try {
            setLoading(true);
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/lists",
            });
        } catch (error) {
            console.error("Error al iniciar sesión con Google:", error);
            alert("Error al iniciar sesión. Intenta nuevamente.");
            setLoading(false);
        }
    };

    return (
        <section className="flex flex-col items-center justify-center w-full min-h-[70vh]">
            <Card className="w-full max-w-[360px] sm:max-w-sm md:max-w-md shadow-lg border border-gray-200 rounded-2xl bg-white/90 backdrop-blur-sm p-4 sm:p-6">
                <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-center text-2xl sm:text-3xl font-semibold text-gray-800">
                        Inicia sesión
                    </CardTitle>
                </CardHeader>

                <CardContent className="flex flex-col items-center gap-4 sm:gap-5">
                    <Button
                        onClick={handleLoginWithGoogle}
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 py-3 sm:py-4 rounded-xl text-sm sm:text-base font-medium"
                    >
                        <LogIn className="w-5 h-5" />
                        {loading ? "Conectando..." : "Continuar con Google"}
                    </Button>

                    <p className="text-gray-500 text-xs sm:text-sm text-center leading-snug max-w-[280px] sm:max-w-none">
                        Al continuar, aceptas nuestros{" "}
                        <span className="text-blue-600 hover:underline cursor-pointer">
                            términos y condiciones
                        </span>.
                    </p>
                </CardContent>
            </Card>

            {/* 👇 Espacio extra para pantallas pequeñas */}
            <div className="h-8 sm:h-12" />
        </section>
    );
}
