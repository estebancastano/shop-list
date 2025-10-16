import { auth } from "@/lib/auth";
import { headers } from "next/headers";  // en App Router o Next 13+

export async function getCurrentUser() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session || !session.user) return null;
    return session.user;
}
