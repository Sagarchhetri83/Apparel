/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#2563eb", // Blue
                secondary: "#6b7280", // Gray
                success: "#16a34a",
                warning: "#f59e0b",
                error: "#dc2626",
                background: "#f8fafc",
                surface: "#ffffff",
                border: "#e5e7eb",
                text: {
                    primary: "#111827",
                    secondary: "#6b7280",
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            boxShadow: {
                sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
                card: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
            }
        },
    },
    plugins: [],
}
