// store/useThemeStore.ts
import { create } from 'zustand';
import { useEffect } from 'react';

interface ThemeState {
  darkMode: boolean;
  toggleDarkMode: () => void;
  initTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  darkMode: true,

  toggleDarkMode: () => {
    set((state) => {
      const newMode = !state.darkMode;
      if (typeof window !== 'undefined') {
        localStorage.setItem('darkMode', JSON.stringify(newMode));
        document.documentElement.classList.toggle('dark', newMode);
      }
      return { darkMode: newMode };
    });
  },

  initTheme: () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('darkMode');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const isDark = saved !== null ? JSON.parse(saved) : prefersDark;

      set({ darkMode: isDark });
      document.documentElement.classList.toggle('dark', isDark);
    }
  },
}));
