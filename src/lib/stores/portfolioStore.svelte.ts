import {
	mockProjects,
	mockProfile,
	mockExperiences,
	mockSkillPillars,
	mockContactMessages,
	mockCategories
} from '$lib/data/mockPortfolio';
import type {
	Project,
	UserProfile,
	ExperienceItem,
	SkillPillar,
	ContactMessage,
	CategoryItem
} from '$lib/types/portfolio';

const STORAGE_KEY_PROJECTS = 'porto_bagiz_projects_v2';
const STORAGE_KEY_CATEGORIES = 'porto_bagiz_categories_v2';
const STORAGE_KEY_PROFILE = 'porto_bagiz_profile_v2';
const STORAGE_KEY_EXPERIENCES = 'porto_bagiz_experiences_v2';
const STORAGE_KEY_PILLARS = 'porto_bagiz_pillars_v2';
const STORAGE_KEY_MESSAGES = 'porto_bagiz_messages_v2';

class PortfolioStore {
	projects = $state<Project[]>(mockProjects);
	categories = $state<CategoryItem[]>(mockCategories);
	profile = $state<UserProfile>(mockProfile);
	experiences = $state<ExperienceItem[]>(mockExperiences);
	skillPillars = $state<SkillPillar[]>(mockSkillPillars);
	messages = $state<ContactMessage[]>(mockContactMessages);
	initialized = $state(false);

	constructor() {
		if (typeof window !== 'undefined') {
			this.loadFromStorage();
		}
	}

	loadFromStorage() {
		try {
			// One-time cleanup of v1 dummy data if migrating
			if (localStorage.getItem('porto_bagiz_projects_v1') !== null) {
				localStorage.removeItem('porto_bagiz_projects_v1');
				localStorage.removeItem('porto_bagiz_categories_v1');
				localStorage.removeItem('porto_bagiz_experiences_v1');
				localStorage.removeItem('porto_bagiz_pillars_v1');
				localStorage.removeItem('porto_bagiz_messages_v1');
				const oldProf = localStorage.getItem('porto_bagiz_profile_v1');
				if (oldProf && !localStorage.getItem(STORAGE_KEY_PROFILE)) {
					localStorage.setItem(STORAGE_KEY_PROFILE, oldProf);
				}
				localStorage.removeItem('porto_bagiz_profile_v1');
			}

			// Projects
			const savedProjects = localStorage.getItem(STORAGE_KEY_PROJECTS);
			if (savedProjects !== null) {
				const parsed = JSON.parse(savedProjects);
				if (Array.isArray(parsed)) {
					this.projects = parsed;
				}
			} else {
				this.projects = [...mockProjects];
				this.saveToStorage();
			}

			// Categories
			const savedCategories = localStorage.getItem(STORAGE_KEY_CATEGORIES);
			if (savedCategories !== null) {
				const parsed = JSON.parse(savedCategories);
				if (Array.isArray(parsed)) {
					this.categories = parsed;
				}
			} else {
				this.categories = [...mockCategories];
				this.saveToStorage();
			}

			// Profile
			const savedProfile = localStorage.getItem(STORAGE_KEY_PROFILE);
			if (savedProfile !== null) {
				this.profile = JSON.parse(savedProfile);
			} else {
				this.profile = { ...mockProfile };
				this.saveToStorage();
			}

			// Experiences
			const savedExperiences = localStorage.getItem(STORAGE_KEY_EXPERIENCES);
			if (savedExperiences !== null) {
				const parsed = JSON.parse(savedExperiences);
				if (Array.isArray(parsed)) {
					this.experiences = parsed;
				}
			} else {
				this.experiences = [...mockExperiences];
				this.saveToStorage();
			}

			// Skill Pillars
			const savedPillars = localStorage.getItem(STORAGE_KEY_PILLARS);
			if (savedPillars !== null) {
				const parsed = JSON.parse(savedPillars);
				if (Array.isArray(parsed)) {
					this.skillPillars = parsed;
				}
			} else {
				this.skillPillars = [...mockSkillPillars];
				this.saveToStorage();
			}

			// Messages
			const savedMessages = localStorage.getItem(STORAGE_KEY_MESSAGES);
			if (savedMessages !== null) {
				const parsed = JSON.parse(savedMessages);
				if (Array.isArray(parsed)) {
					this.messages = parsed;
				}
			} else {
				this.messages = [...mockContactMessages];
				this.saveToStorage();
			}
		} catch (e) {
			console.error('Error loading portfolio data from storage:', e);
		} finally {
			this.initialized = true;
		}
	}

	saveToStorage() {
		if (typeof window === 'undefined') return;
		try {
			localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(this.projects));
			localStorage.setItem(STORAGE_KEY_CATEGORIES, JSON.stringify(this.categories));
			localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(this.profile));
			localStorage.setItem(STORAGE_KEY_EXPERIENCES, JSON.stringify(this.experiences));
			localStorage.setItem(STORAGE_KEY_PILLARS, JSON.stringify(this.skillPillars));
			localStorage.setItem(STORAGE_KEY_MESSAGES, JSON.stringify(this.messages));
		} catch (e) {
			console.error('Error saving portfolio data to storage:', e);
		}
	}

	// ==================== CATEGORY CRUD ====================
	addCategory(newCat: Omit<CategoryItem, 'id'>) {
		const id = `cat-${Date.now()}`;
		const category: CategoryItem = {
			...newCat,
			id,
			createdAt: newCat.createdAt || new Date().toISOString()
		};
		this.categories.push(category);
		this.saveToStorage();
		return category;
	}

	updateCategory(id: string, updates: Partial<CategoryItem>) {
		const index = this.categories.findIndex((c) => c.id === id);
		if (index !== -1) {
			const oldName = this.categories[index].name;
			this.categories[index] = { ...this.categories[index], ...updates };
			// If category name updated, also update projects using this category
			if (updates.name && updates.name !== oldName) {
				this.projects.forEach((p) => {
					if (p.category === oldName) {
						p.category = updates.name!;
					}
				});
			}
			this.saveToStorage();
			return this.categories[index];
		}
		return null;
	}

	deleteCategory(id: string) {
		this.categories = this.categories.filter((c) => c.id !== id);
		this.saveToStorage();
	}

	toggleCategoryActive(id: string) {
		const c = this.categories.find((item) => item.id === id);
		if (c) {
			c.isActive = !c.isActive;
			this.saveToStorage();
		}
	}

	resetCategories() {
		this.categories = [...mockCategories];
		this.saveToStorage();
	}

	// ==================== PROFILE METHODS ====================
	updateProfile(updates: Partial<UserProfile>) {
		this.profile = { ...this.profile, ...updates };
		this.saveToStorage();
		return this.profile;
	}

	// ==================== PROJECT CRUD ====================
	addProject(newProj: Omit<Project, 'id'>) {
		const id = `proj-${Date.now()}`;
		const project: Project = { ...newProj, id };
		this.projects.unshift(project);
		this.saveToStorage();
		return project;
	}

	updateProject(id: string, updates: Partial<Project>) {
		const index = this.projects.findIndex((p) => p.id === id);
		if (index !== -1) {
			this.projects[index] = { ...this.projects[index], ...updates };
			this.saveToStorage();
			return this.projects[index];
		}
		return null;
	}

	deleteProject(id: string) {
		this.projects = this.projects.filter((p) => p.id !== id);
		this.saveToStorage();
	}

	toggleFeatured(id: string) {
		const p = this.projects.find((item) => item.id === id);
		if (p) {
			p.isFeatured = !p.isFeatured;
			this.saveToStorage();
		}
	}

	togglePublished(id: string) {
		const p = this.projects.find((item) => item.id === id);
		if (p) {
			p.isPublished = !p.isPublished;
			this.saveToStorage();
		}
	}

	updateOrder(id: string, newOrder: number) {
		const p = this.projects.find((item) => item.id === id);
		if (p) {
			p.displayOrder = newOrder;
			this.saveToStorage();
		}
	}

	duplicateProject(id: string) {
		const target = this.projects.find((p) => p.id === id);
		if (!target) return null;
		const newId = `proj-${Date.now()}`;
		const cloned: Project = {
			...JSON.parse(JSON.stringify(target)),
			id: newId,
			title: `${target.title} (Salinan)`,
			slug: `${target.slug}-copy-${Date.now().toString().slice(-4)}`,
			displayOrder: (target.displayOrder || 1) + 1,
			isPublished: false
		};
		const index = this.projects.findIndex((p) => p.id === id);
		this.projects.splice(index + 1, 0, cloned);
		this.saveToStorage();
		return cloned;
	}

	// ==================== EXPERIENCE CRUD ====================
	addExperience(newExp: Omit<ExperienceItem, 'id'>) {
		const id = `exp-${Date.now()}`;
		const exp: ExperienceItem = { ...newExp, id };
		this.experiences.unshift(exp);
		this.saveToStorage();
		return exp;
	}

	updateExperience(id: string, updates: Partial<ExperienceItem>) {
		const index = this.experiences.findIndex((e) => e.id === id);
		if (index !== -1) {
			this.experiences[index] = { ...this.experiences[index], ...updates };
			this.saveToStorage();
			return this.experiences[index];
		}
		return null;
	}

	deleteExperience(id: string) {
		this.experiences = this.experiences.filter((e) => e.id !== id);
		this.saveToStorage();
	}

	toggleExperienceCurrent(id: string) {
		const e = this.experiences.find((item) => item.id === id);
		if (e) {
			e.isCurrent = !e.isCurrent;
			this.saveToStorage();
		}
	}

	// ==================== SKILL PILLAR CRUD ====================
	addSkillPillar(newPillar: Omit<SkillPillar, 'id'>) {
		const id = `pillar-${Date.now()}`;
		const pillar: SkillPillar = { ...newPillar, id };
		this.skillPillars.push(pillar);
		this.saveToStorage();
		return pillar;
	}

	updateSkillPillar(id: string, updates: Partial<SkillPillar>) {
		const index = this.skillPillars.findIndex((p) => p.id === id);
		if (index !== -1) {
			this.skillPillars[index] = { ...this.skillPillars[index], ...updates };
			this.saveToStorage();
			return this.skillPillars[index];
		}
		return null;
	}

	deleteSkillPillar(id: string) {
		this.skillPillars = this.skillPillars.filter((p) => p.id !== id);
		this.saveToStorage();
	}

	// ==================== CONTACT MESSAGES ====================
	addMessage(msg: Omit<ContactMessage, 'id' | 'createdAt' | 'isRead' | 'isReplied'>) {
		const id = `msg-${Date.now()}`;
		const newMsg: ContactMessage = {
			...msg,
			id,
			createdAt: new Date().toISOString(),
			isRead: false,
			isReplied: false
		};
		this.messages.unshift(newMsg);
		this.saveToStorage();
		return newMsg;
	}

	markMessageRead(id: string) {
		const m = this.messages.find((item) => item.id === id);
		if (m) {
			m.isRead = true;
			this.saveToStorage();
		}
	}

	markMessageReplied(id: string) {
		const m = this.messages.find((item) => item.id === id);
		if (m) {
			m.isReplied = !m.isReplied;
			this.saveToStorage();
		}
	}

	deleteMessage(id: string) {
		this.messages = this.messages.filter((m) => m.id !== id);
		this.saveToStorage();
	}

	// ==================== BACKUP & RESTORE ====================
	exportBackupData(): string {
		const backup = {
			version: '2.5',
			exportedAt: new Date().toISOString(),
			profile: this.profile,
			categories: this.categories,
			projects: this.projects,
			experiences: this.experiences,
			skillPillars: this.skillPillars,
			messages: this.messages
		};
		return JSON.stringify(backup, null, 2);
	}

	importBackupData(jsonString: string): { success: boolean; message: string } {
		try {
			const data = JSON.parse(jsonString);
			if (!data || typeof data !== 'object') {
				return { success: false, message: 'Format data JSON tidak valid.' };
			}

			if (data.profile && typeof data.profile === 'object') {
				this.profile = { ...mockProfile, ...data.profile };
			}
			if (Array.isArray(data.categories)) {
				this.categories = data.categories;
			}
			if (Array.isArray(data.projects)) {
				this.projects = data.projects;
			}
			if (Array.isArray(data.experiences)) {
				this.experiences = data.experiences;
			}
			if (Array.isArray(data.skillPillars)) {
				this.skillPillars = data.skillPillars;
			}
			if (Array.isArray(data.messages)) {
				this.messages = data.messages;
			}

			this.saveToStorage();
			return { success: true, message: 'Data cadangan berhasil diimpor dan diterapkan!' };
		} catch (e: any) {
			return { success: false, message: `Gagal membaca file JSON: ${e?.message || 'Error tidak diketahui'}` };
		}
	}

	// ==================== RESET ====================
	resetToDefaults() {
		this.projects = [...mockProjects];
		this.categories = [...mockCategories];
		this.profile = { ...mockProfile };
		this.experiences = [...mockExperiences];
		this.skillPillars = [...mockSkillPillars];
		this.messages = [...mockContactMessages];
		this.saveToStorage();
	}
}

export const portfolioStore = new PortfolioStore();
