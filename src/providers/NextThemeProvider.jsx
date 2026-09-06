"use client";
import { ThemeProvider } from "next-themes";

const NextThemeProvider = ({ children }) => {
    return (
        <div>
            <ThemeProvider attribute="class" defaultTheme="light">
                {children}
            </ThemeProvider>
        </div>
    );
};

export default NextThemeProvider;