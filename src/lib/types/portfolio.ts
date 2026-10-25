export type ProjectCategory = 'Desain' | 'Bisnis' | 'Hybrid';
export type FilterCategory = 'Semua' | ProjectCategory;

export type SkillCategory = 'Desain' | 'Bisnis';
export type SkillLevel = 'Pemula' | 'Menengah' | 'Mahir' | 'Ahli';

export interface ProjectMetric {
	label: string;
	value: string;
	change?: string;
}

export interface ProjectCaseStudy {
	background: string;
	problem: string;
	solution: string;
	process: string[];
	impact: string;
}

export interface ProjectLinks {
	figma?: string;
	liveDemo?: string;
	pitchDeck?: string;
	github?: string;
}

export interface Project {
	id: string;
	slug: string;
	title: string;
	subtitle: string;
	category: ProjectCategory;
	summary: string;
	thumbnail: string;
	images: string[];
	isFeatured: boolean;
	isNew: boolean;
	displayOrder: number;
	isPublished: boolean;
	publishedAt: string;
	role: string;
	duration: string;
	tools: string[];
	metrics: ProjectMetric[];
	caseStudy: ProjectCaseStudy;
	links: ProjectLinks;
}

export interface Skill {
	id: string;
	name: string;
	category: SkillCategory;
	level: SkillLevel;
	proficiencyPercent: number; // 0 - 100
	tools: string[];
	description: string;
	iconName?: string;
}

export interface VolunteerExperience {
	id: string;
	role: string;
	organization: string;
	period: string;
	location: string;
	description: string;
	highlights: string[];
	type: 'volunteer' | 'organizational' | 'community';
	badge?: string;
}

export interface Education {
	degree: string;
	institution: string;
	period: string;
	achievements: string[];
}

export interface StatItem {
	label: string;
	value: string;
	description: string;
}

export interface SocialLinks {
	email: string;
	linkedin: string;
	behance: string;
	dribbble: string;
	github: string;
	instagram: string;
}

export interface UserProfile {
	name: string;
	tagline: string;
	headline: string;
	bio: string;
	aboutNarrative: string[];
	avatar: string;
	location: string;
	availability: string;
	resumeUrl: string;
	stats: StatItem[];
	socialLinks: SocialLinks;
	education: Education[];
}

export interface ExperienceItem {
	id: string;
	period: string;
	yearBadge: string;
	role: string;
	company: string;
	location: string;
	employmentType: string;
	badge: string;
	isCurrent?: boolean;
	summary: string;
	achievements: string[];
	tools: string[];
	projectSlug?: string;
}

export interface SkillPillarItem {
	label: string;
	level: 'Expert' | 'Master' | 'Advanced' | 'Specialist';
	tier?: number;
}

export interface SkillPillar {
	id: string;
	badge: string;
	title: string;
	subtitle: string;
	desc: string;
	isFeatured?: boolean;
	skills: SkillPillarItem[];
	tools: string[];
}

export interface ContactMessage {
	id: string;
	name: string;
	email: string;
	service: string;
	message: string;
	createdAt: string;
	isRead: boolean;
	isReplied?: boolean;
}

