/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class",
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "primary": "#6a5bcd",
                "secondary": "#2dd4bf",
                "background-light": "#f6f6f8",
                "background-dark": "#0a090f",
                "glass": "rgba(255, 255, 255, 0.03)",
                "glass-border": "rgba(106, 91, 205, 0.2)",
            },
            fontFamily: {
                "display": ["Space Grotesk", "sans-serif"]
            },
            borderRadius: {
                "DEFAULT": "1.5rem",
                "lg": "2rem",
                "xl": "3rem",
                "full": "9999px"
            },
        },
    },
    plugins: [],
}
