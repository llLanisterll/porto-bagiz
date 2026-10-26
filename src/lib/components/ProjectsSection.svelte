<script lang="ts">
	import { portfolioStore } from '$lib/stores/portfolioStore.svelte';
	import { ArrowUpRight } from 'lucide-svelte';

	let activeFilter = $state('Semua');

	const filterTabs = ['Semua', 'Desain', 'Bisnis', 'Hybrid'];

	const filteredProjects = $derived(
		portfolioStore.projects.filter((p) => {
			if (!p.isPublished) return false;
			if (activeFilter === 'Semua') return true;
			return p.category === activeFilter;
		})
	);
</script>

<section id="portfolio" class="projects">
	<div class="container">
		<div class="projects-header-row">
			<!-- Section Title -->
			<div class="section-title wow fadeInUp">
				<h3>Karya Terbaru</h3>
				<span></span>
			</div>

			<!-- Filter Tabs (Textio Style) -->
			<nav class="project-filter wow fadeInUp">
				<ul>
					{#each filterTabs as tab}
						<li>
							<button
								type="button"
								class:active={activeFilter === tab}
								onclick={() => (activeFilter = tab)}
							>
								{tab === 'Semua' ? 'Semua Karya' : tab}
							</button>
						</li>
					{/each}
				</ul>
			</nav>
		</div>

		<!-- Asymmetric Grid -->
		<div class="projects-container">
			{#each filteredProjects as project, idx (project.id)}
				<div
					class="grid-item"
					class:big={idx % 3 === 0}
					class:mid={idx % 3 === 1}
				>
					<a href="/karya/{project.slug}" class="project-item">
						<figure>
							<img
								src={project.thumbnail}
								alt={project.title}
								loading="lazy"
								onerror={(e) => {
									(e.currentTarget as HTMLImageElement).src =
										'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80';
								}}
							/>
						</figure>
						<div class="overlay-content">
							<div class="rounded-btn">
								<span>Lihat</span>
								<ArrowUpRight size={16} />
							</div>
							<span class="project-cat">{project.category} • {project.role}</span>
							<h4 class="title">{project.title}</h4>
						</div>
					</a>
				</div>
			{/each}
		</div>

		<div class="view-all-btn-wrapper wow fadeInUp">
			<a class="bttn-round" href="#portfolio" onclick={(e) => { e.preventDefault(); activeFilter = 'Semua'; }}>
				<span class="btn-txt">
					<span>Lihat Semua</span>
					<ArrowUpRight size={16} />
				</span>
			</a>
		</div>
	</div>
</section>
