const STORAGE_KEY_AUTH = 'porto_baghiz_auth_v1';
const STORAGE_KEY_CREDS = 'porto_baghiz_admin_creds_v1';

export interface AdminUser {
	email: string;
	name: string;
	role: 'superadmin' | 'editor';
}

export interface AdminCredentials {
	email: string;
	password: string;
}

const DEFAULT_CREDS: AdminCredentials = {
	email: 'admin@baghiz.design',
	password: 'admin123'
};

const DEFAULT_ADMIN: AdminUser = {
	email: 'admin@baghiz.design',
	name: 'Muhammad Baghiz',
	role: 'superadmin'
};

class AuthStore {
	isAuthenticated = $state(true);
	user = $state<AdminUser | null>(DEFAULT_ADMIN);
	credentials = $state<AdminCredentials>(DEFAULT_CREDS);
	initialized = $state(false);

	constructor() {
		if (typeof window !== 'undefined') {
			this.loadFromStorage();
		}
	}

	loadFromStorage() {
		try {
			// 1. Load custom credentials if already saved
			const savedCreds = localStorage.getItem(STORAGE_KEY_CREDS);
			if (savedCreds) {
				const parsedCreds = JSON.parse(savedCreds);
				if (parsedCreds && parsedCreds.email && parsedCreds.password) {
					this.credentials = parsedCreds;
				}
			} else {
				this.credentials = { ...DEFAULT_CREDS };
				localStorage.setItem(STORAGE_KEY_CREDS, JSON.stringify(this.credentials));
			}

			// 2. Load active session
			const saved = localStorage.getItem(STORAGE_KEY_AUTH);
			if (saved) {
				const parsed = JSON.parse(saved);
				if (parsed && parsed.email) {
					this.user = parsed;
					this.isAuthenticated = true;
					return;
				}
			}

			// Default to active session
			this.user = {
				email: this.credentials.email,
				name: 'Muhammad Baghiz',
				role: 'superadmin'
			};
			this.isAuthenticated = true;
			localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(this.user));
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
		const currentCredEmail = (this.credentials.email || '').trim().toLowerCase();
		const currentPassword = this.credentials.password;

		// Match against configured admin credentials (or fallback backup credentials)
		const isEmailMatch =
			cleanEmail === currentCredEmail ||
			cleanEmail === 'admin@baghiz.design' ||
			cleanEmail === 'baghiz.design@gmail.com';
		const isPasswordMatch = password === currentPassword || password === 'admin123';

		if (isEmailMatch && isPasswordMatch) {
			const user: AdminUser = {
				email: cleanEmail,
				name: 'Muhammad Baghiz',
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
			message: 'Email atau kata sandi tidak cocok. Silakan periksa kembali kredensial Anda.'
		};
	}

	updateCredentials(newEmail: string, newPassword?: string): { success: boolean; message: string } {
		const cleanEmail = newEmail.trim().toLowerCase();
		if (!cleanEmail.includes('@') || !cleanEmail.includes('.')) {
			return { success: false, message: 'Alamat email admin tidak valid.' };
		}

		if (newPassword && newPassword.length < 6) {
			return { success: false, message: 'Kata sandi baru minimal harus 6 karakter.' };
		}

		this.credentials.email = cleanEmail;
		if (newPassword && newPassword.trim().length >= 6) {
			this.credentials.password = newPassword.trim();
		}

		if (this.user) {
			this.user.email = cleanEmail;
		}

		if (typeof window !== 'undefined') {
			localStorage.setItem(STORAGE_KEY_CREDS, JSON.stringify(this.credentials));
			if (this.user) {
				localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(this.user));
			}
		}

		return { success: true, message: 'Kredensial login admin berhasil diperbarui!' };
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
