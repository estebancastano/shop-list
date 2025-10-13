import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[70vh] text-center">
      <Card className="max-w-lg shadow-lg border border-gray-200 rounded-2xl p-6 bg-white">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-blue-600">
            Bienvenido 👋
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-gray-600 mb-6">
            Crea y organiza tus listas de mercado fácilmente, desde cualquier dispositivo.
          </p>

          <div className="flex justify-center gap-4">
            <Link href="/listas">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Ver mis listas
              </Button>
            </Link>

            <Link href="/login">
              <Button variant="outline">Iniciar sesión</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
