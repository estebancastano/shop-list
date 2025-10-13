import { auth } from "@/lib/auth";
export default auth.handler;

console.log("Servidor BASE URL:", process.env.BETTER_AUTH_URL);
console.log("Cliente BASE URL:", process.env.NEXT_PUBLIC_BETTER_AUTH_URL);
