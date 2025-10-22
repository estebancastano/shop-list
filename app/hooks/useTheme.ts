"use client";
import { useEffect, useState } from "react";

export function useTheme() {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        // 🔹 Detectar el tema guardado o el del sistema
        const stored = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

        if (stored === "dark" || (!stored && prefersDark)) {
            document.documentElement.classList.add("dark");
            setIsDark(true);
        } else {
            document.documentElement.classList.remove("dark");
            setIsDark(false);
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = isDark ? "light" : "dark";
        localStorage.setItem("theme", newTheme);
        document.documentElement.classList.toggle("dark", newTheme === "dark");
        setIsDark(!isDark);
    };

    return { isDark, toggleTheme };
}
