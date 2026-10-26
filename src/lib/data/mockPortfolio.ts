import type {
	Project,
	Skill,
	VolunteerExperience,
	UserProfile,
	CategoryItem,
	ExperienceItem,
	SkillPillar,
	ContactMessage
} from '#lib/types/portfolio';

export const mockCategories: CategoryItem[] = [];

export const mockProfile: UserProfile = {
	name: 'Muhammad Baghiz',
	tagline: 'Bridging Design Aesthetics with Business Impact',
	headline: 'Product Designer & Business Strategist',
	bio: 'Menggabungkan keahlian desain antarmuka berbasis empati pengguna dengan analisis strategi bisnis yang terukur untuk melahirkan produk digital bernilai tinggi.',
	aboutNarrative: [
		'Saya adalah seorang praktisi hibrida yang percaya bahwa desain yang hebat bukan hanya memanjakan mata, melainkan juga menggerakkan jarum metrik bisnis nyata.',
		'Dengan latar belakang ganda di bidang Product Design (UI/UX) dan Business Strategy, saya mendampingi startup hingga perusahaan mapan dalam merumuskan strategi produk dari nol: mulai dari riset pasar, pemodelan finansial, perancangan prototipe interaktif, hingga implementasi design system berskala besar.',
		'Fokus utama saya adalah menciptakan produk yang intuitif, scalable, dan memberikan ROI berkelanjutan bagi stakeholders.'
	],
	avatar: '',
	location: 'Jakarta, Indonesia (Willing to relocate / Remote)',
	availability: 'Tersedia untuk Proyek Baru & Kolaborasi Strategis',
	resumeUrl: '',
	stats: [
		{ label: 'Tahun Pengalaman', value: '4+', description: 'Desain Produk & Riset Bisnis' },
		{ label: 'Proyek Selesai', value: '0', description: 'Aplikasi Web & Mobile' },
		{ label: 'Rata-rata Peningkatan Metrik', value: '0%', description: 'Konversi & Efisiensi Pengguna' },
		{ label: 'Total Pendanaan Diakuisisi', value: '$0', description: 'Dukungan Riset & Pitch Deck' }
	],
	socialLinks: {
		email: 'baghiz.design@gmail.com',
		linkedin: 'https://linkedin.com/in/baghiz-product',
		github: 'https://github.com/baghiz-product',
		instagram: 'https://instagram.com/baghiz.design'
	},
	education: []
};

export const mockProjects: Project[] = [];

export const mockSkills: Skill[] = [];

export const mockVolunteerExperiences: VolunteerExperience[] = [];

export const mockExperiences: ExperienceItem[] = [];

export const mockSkillPillars: SkillPillar[] = [];

export const mockContactMessages: ContactMessage[] = [];
