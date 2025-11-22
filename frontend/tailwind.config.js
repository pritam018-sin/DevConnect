/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#0f172a', // Dark background
                surface: '#1e293b',    // Card/Widget background
                primary: '#8b5cf6',    // Violet/Indigo primary
                secondary: '#64748b',  // Muted text
            }
        },
    },
    plugins: [],
}
