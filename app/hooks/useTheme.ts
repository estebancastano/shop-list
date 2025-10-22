// hooks/useTheme.ts
import { useEffect, useState } from "react";

export function useTheme() {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        if (localStorage.theme === "dark" ||
            (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
            document.documentElement.classList.add("dark");
            setIsDark(true);
        } else {
            document.documentElement.classList.remove("dark");
            setIsDark(false);
        }
    }, []);

    const toggleTheme = () => {
        if (isDark) {
            document.documentElement.classList.remove("dark");
            localStorage.theme = "light";
        } else {
            document.documentElement.classList.add("dark");
            localStorage.theme = "dark";
        }
        setIsDark(!isDark);
    };

    return { isDark, toggleTheme };
}
