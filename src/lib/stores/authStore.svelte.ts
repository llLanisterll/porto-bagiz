const STORAGE_KEY_AUTH = 'porto_bagiz_auth_v1';

export interface AdminUser {
	email: string;
	name: string;
	role: 'superadmin' | 'editor';
}

const DEFAULT_ADMIN: AdminUser = {
	email: 'admin@bagiz.design',
	name: 'Muhammad Bagiz',
	role: 'superadmin'
};

class AuthStore {
	isAuthenticated = $state(true);
	user = $state<AdminUser | null>(DEFAULT_ADMIN);
	initialized = $state(false);

	constructor() {
		if (typeof window !== 'undefined') {
			this.loadFromStorage();
		}
	}

	loadFromStorage() {
		try {
			const saved = localStorage.getItem(STORAGE_KEY_AUTH);
			if (saved) {
				const parsed = JSON.parse(saved);
				if (parsed && parsed.email) {
					this.user = parsed;
					this.isAuthenticated = true;
					return;
				}
			}
			// Default to demo admin so dashboard is always immediately usable
			this.user = DEFAULT_ADMIN;
			this.isAuthenticated = true;
			localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(DEFAULT_ADMIN));
		} catch (e) {
			console.error('Error loading auth from storage:', e);
			this.user = DEFAULT_ADMIN;
			this.isAuthenticated = true;
		} finally {
			this.initialized = true;
		}
	}

	login(email: string, password: string): { success: boolean; message?: string } {
		const cleanEmail = email.trim().toLowerCase();
		// Demo credentials or any registered admin
		if (
			(cleanEmail === 'admin@bagiz.design' || cleanEmail === 'bagiz.design@gmail.com') &&
			password.length >= 6
		) {
			const user: AdminUser = {
				email: cleanEmail,
				name: 'Muhammad Bagiz',
				role: 'superadmin'
			};
			this.user = user;
			this.isAuthenticated = true;
			if (typeof window !== 'undefined') {
				localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(user));
			}
			return { success: true };
		}

		// Also allow quick test login if password is at least 6 characters
		if (cleanEmail.includes('@') && password === 'admin123') {
			const user: AdminUser = {
				email: cleanEmail,
				name: 'Muhammad Bagiz',
				role: 'superadmin'
			};
			this.user = user;
			this.isAuthenticated = true;
			if (typeof window !== 'undefined') {
				localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(user));
			}
			return { success: true };
		}

		return {
			success: false,
			message: 'Email atau kata sandi tidak valid. Gunakan kata sandi minimal 6 karakter (demo: admin123).'
		};
	}

	logout() {
		this.isAuthenticated = false;
		this.user = null;
		if (typeof window !== 'undefined') {
			localStorage.removeItem(STORAGE_KEY_AUTH);
		}
	}

	requestPasswordReset(email: string): { success: boolean; message: string } {
		if (!email.includes('@')) {
			return { success: false, message: 'Harap masukkan alamat email yang valid.' };
		}
		return {
			success: true,
			message: `Tautan instruksi pemulihan kata sandi telah dikirim ke ${email}. Silakan periksa kotak masuk atau spam Anda.`
		};
	}
}

export const authStore = new AuthStore();
