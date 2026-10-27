// src/lib/stores/themeStore.svelte.ts
export type Theme = 'light' | 'dark';

class ThemeStore {
	theme = $state<Theme>('light');
	initialized = $state(false);

	constructor() {
		if (typeof window !== 'undefined') {
			this.initTheme();
		}
	}

	get isDark(): boolean {
		return this.theme === 'dark';
	}

	initTheme() {
		try {
			const stored = localStorage.getItem('theme') as Theme | null;
			if (stored === 'dark' || stored === 'light') {
				this.applyTheme(stored, false);
			} else {
				const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
				this.applyTheme(prefersDark ? 'dark' : 'light', false);
			}

			// Listen for OS system theme changes if user hasn't explicitly set preference
			const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
			const listener = (e: MediaQueryListEvent) => {
				const currentStored = localStorage.getItem('theme');
				if (!currentStored) {
					this.applyTheme(e.matches ? 'dark' : 'light', false);
				}
			};
			mediaQuery.addEventListener('change', listener);
			this.initialized = true;
		} catch {
			this.applyTheme('light', false);
		}
	}

	applyTheme(newTheme: Theme, persist = true) {
		this.theme = newTheme;

		if (typeof document !== 'undefined') {
			const root = document.documentElement;
			if (newTheme === 'dark') {
				root.classList.add('dark');
				root.setAttribute('data-theme', 'dark');
				root.style.colorScheme = 'dark';
			} else {
				root.classList.remove('dark');
				root.setAttribute('data-theme', 'light');
				root.style.colorScheme = 'light';
			}
		}

		if (persist && typeof localStorage !== 'undefined') {
			try {
				localStorage.setItem('theme', newTheme);
			} catch {}
		}
	}

	toggleTheme() {
		const next = this.theme === 'dark' ? 'light' : 'dark';
		this.applyTheme(next, true);
	}

	setTheme(theme: Theme) {
		this.applyTheme(theme, true);
	}
}

export const themeStore = new ThemeStore();
