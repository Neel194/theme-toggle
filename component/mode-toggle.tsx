'use client';
import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { SunIcon, MoonIcon } from 'lucide-react';

export const ModeToggle = () => {
    const { theme, setTheme } = useTheme();
    const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e: MediaQueryListEvent) => {
            setSystemTheme(e.matches ? 'dark' : 'light');
        };
        mediaQuery.addEventListener('change', handleChange);

        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    const SWITCH = () => {
        switch (theme) {
            case 'light':
                setTheme('dark');
                return;
            case 'dark':
                setTheme('light');
                return;
            case 'system':
                setTheme(systemTheme === 'light' ? 'dark' : 'light');
                return;
            case 'default':
                return;
        }
    };

    return (
        <button
            onClick={SWITCH}
            className="size-4 flex items-center justify-center"
        >
            <SunIcon
                size={14}
                className="rotate-0 absolute scale-100 transition-all duration-200 dark:rotate-90 dark:scale-0"
            />
            <MoonIcon
                size={14}
                className=" rotate-90 scale-0 absolute transition-all duration-200 dark:rotate-0 dark:scale-100"
            />
        </button>
    );
};
