'use client'

import { createContext, useState } from "react";

type ThemeContextType = {
    mode: string;
    toggle: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

type ThemeProviderProps = {
    children: React.ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const [mode, setMode] = useState('dark');

    const toggle = () => {
        setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    }
    return (
        <ThemeContext.Provider value={{ mode, toggle }}>
            <div className={`theme ${mode}`}>{children}</div>
        </ThemeContext.Provider>
		);
}


