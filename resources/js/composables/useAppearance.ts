import { onMounted, ref } from "vue";

// these themes must be synced manually with the themes from app.css
export const themes = [
    "default",
    "light",
    "dark",
    "retro",
    "cyberpunk",
    "valentine",
    "aqua",
] as const;
type Appearance = (typeof themes)[number];
// daisy ui has both a light and dark theme.
// However those will be different in this application that's why this is needed
const lightDarkTranslation = {
    light: "lofi",
    dark: "black",
};

export function updateTheme(value: Appearance) {
    if (typeof window === "undefined") {
        return;
    }

    let theme = value;
    if (value === "default") {
        const mediaQueryList = window.matchMedia(
            "(prefers-color-scheme: dark)"
        );
        theme = mediaQueryList.matches ? "dark" : "light";
    }
    document
        .querySelector("html")
        .setAttribute("data-theme", lightDarkTranslation[theme] ?? theme);
}

const setCookie = (name: string, value: string, days = 365) => {
    if (typeof document === "undefined") {
        return;
    }

    const maxAge = days * 24 * 60 * 60;

    document.cookie = `${name}=${value};path=/;max-age=${maxAge};SameSite=Lax`;
};

const mediaQuery = () => {
    if (typeof window === "undefined") {
        return null;
    }

    return window.matchMedia("(prefers-color-scheme: dark)");
};

const getStoredAppearance = () => {
    if (typeof window === "undefined") {
        return null;
    }

    return localStorage.getItem("appearance") as Appearance | null;
};

const handleSystemThemeChange = () => {
    const currentAppearance = getStoredAppearance();

    updateTheme(currentAppearance || "default");
};

export function initializeTheme() {
    if (typeof window === "undefined") {
        return;
    }

    // Initialize theme from saved preference or default to default...
    const savedAppearance = getStoredAppearance();
    updateTheme(savedAppearance || "default");

    // Set up system theme change listener...
    mediaQuery()?.addEventListener("change", handleSystemThemeChange);
}

export function useAppearance() {
    const appearance = ref<Appearance>("default");

    onMounted(() => {
        initializeTheme();

        const savedAppearance = localStorage.getItem(
            "appearance"
        ) as Appearance | null;

        if (savedAppearance) {
            appearance.value = savedAppearance;
        }
    });

    function updateAppearance(value: Appearance) {
        appearance.value = value;

        // Store in localStorage for client-side persistence...
        localStorage.setItem("appearance", value);

        // Store in cookie for SSR...
        setCookie("appearance", value);

        updateTheme(value);
    }

    return {
        appearance,
        updateAppearance,
    };
}
