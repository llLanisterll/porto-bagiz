import { error } from '@sveltejs/kit';
import { portfolioStore } from '$lib/stores/portfolioStore.svelte';
import { mockProjects, mockProfile } from '$lib/data/mockPortfolio';
import type { Project } from '$lib/types/portfolio';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const project =
		portfolioStore.projects.find((p: Project) => p.slug === params.slug) ||
		mockProjects.find((p: Project) => p.slug === params.slug);

	if (!project) {
		throw error(404, {
			message: `Proyek dengan slug "${params.slug}" tidak ditemukan.`
		});
	}

	return {
		project,
		profile: portfolioStore.profile || mockProfile
	};
};
