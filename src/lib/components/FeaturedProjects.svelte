<script lang="ts">
	import type { Project } from '#lib/types/portfolio';
	import {
		Sparkles,
		ArrowUpRight,
		ExternalLink,
		TrendingUp,
		Layers,
		CheckCircle2,
		Flame
	} from 'lucide-svelte';

	interface Props {
		projects: Project[];
	}

	let { projects }: Props = $props();

	// Derived featured list using Svelte 5 $derived
	let featuredProjects = $derived(
		projects
			.filter((p) => p.isFeatured && p.isPublished)
			.sort((a, b) => a.displayOrder - b.displayOrder)
	);
</script>

{#if featuredProjects.length > 0}
	<section id="unggulan" class="py-20 relative">
		<!-- Background ambient glow -->
		<div
			aria-hidden="true"
			class="absolute top-1/2 left-0 -z-10 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none"
		></div>

		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<!-- Section Header -->
			<div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
				<div>
					<div
						class="inline-flex items-center gap-2 rounded-full glass-panel px-3.5 py-1 text-xs font-semibold text-amber-300 mb-3 border border-amber-500/30"
					>
						<Sparkles class="h-3.5 w-3.5 text-amber-400" />
						Karya Pilihan & Dampak Terbesar
					</div>
					<h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
						Sorotan Karya Unggulan
					</h2>
					<p class="mt-2 max-w-xl text-neutral-400 text-sm sm:text-base">
						Proyek strategis yang mendemonstrasikan perpaduan riset bisnis terstruktur, inovasi UI/UX, dan dampak metrik pertumbuhan yang nyata.
					</p>
				</div>

				<a
					href="#galeri"
					class="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
				>
					<span>Lihat Seluruh Koleksi</span>
					<ArrowUpRight class="h-4 w-4" />
				</a>
			</div>

			<!-- Featured List -->
			<div class="flex flex-col gap-8">
				{#each featuredProjects as project, index (project.id)}
					<div
						class="glass-card rounded-3xl p-6 sm:p-8 lg:p-10 transition-all duration-300 hover:border-indigo-500/40 relative overflow-hidden"
						id="featured-project-{project.id}"
					>
						<div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
							<!-- Project Info Column (7 Cols) -->
							<div class="lg:col-span-7 flex flex-col justify-between">
								<div>
									<!-- Badges -->
									<div class="flex flex-wrap items-center gap-2 mb-4">
										<span
											class="inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
										>
											{#if project.category === 'Desain'}
												<Layers class="h-3 w-3" />
											{:else if project.category === 'Bisnis'}
												<TrendingUp class="h-3 w-3" />
											{:else}
												<Sparkles class="h-3 w-3" />
											{/if}
											{project.category}
										</span>

										{#if project.isNew}
											<span
												class="inline-flex items-center gap-1 rounded-lg bg-rose-500/20 border border-rose-500/40 px-2 py-0.5 text-xs font-bold text-rose-300"
											>
												<Flame class="h-3 w-3 text-rose-400" />
												BARU
											</span>
										{/if}

										<span class="text-xs text-neutral-400">
											{project.role} • {project.duration}
										</span>
									</div>

									<h3 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
										{project.title}
									</h3>
									<p class="mt-2 text-sm font-medium text-indigo-300">
										{project.subtitle}
									</p>

									<p class="mt-4 text-sm sm:text-base text-neutral-300 leading-relaxed">
										{project.summary}
									</p>

									<!-- Impact Metrics Banner -->
									{#if project.metrics && project.metrics.length > 0}
										<div class="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
											{#each project.metrics.slice(0, 3) as metric (metric.label)}
												<div
													class="rounded-xl bg-neutral-900/90 border border-white/5 p-3 flex flex-col"
												>
													<span class="text-xl font-black text-emerald-400">
														{metric.value}
													</span>
													<span class="text-xs font-medium text-neutral-200 mt-0.5">
														{metric.label}
													</span>
													{#if metric.change}
														<span class="text-[10px] text-neutral-400">
															{metric.change}
														</span>
													{/if}
												</div>
											{/each}
										</div>
									{/if}
								</div>

								<!-- Action row -->
								<div class="mt-8 flex flex-wrap items-center gap-4">
									<a
										href="/karya/{project.slug}"
										class="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
										id="featured-cta-{project.id}"
									>
										<span>Baca Studi Kasus</span>
										<ArrowUpRight class="h-4 w-4" />
									</a>

									{#if project.links.liveDemo}
										<a
											href={project.links.liveDemo}
											target="_blank"
											rel="noreferrer"
											class="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-300 hover:text-white transition-colors"
										>
											<ExternalLink class="h-4 w-4" />
											<span>Live Demo</span>
										</a>
									{/if}

									{#if project.links.figma}
										<a
											href={project.links.figma}
											target="_blank"
											rel="noreferrer"
											class="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-300 hover:text-white transition-colors"
										>
											<span>Figma Preview</span>
										</a>
									{/if}
								</div>
							</div>

							<!-- Image Column (5 Cols) -->
							<div class="lg:col-span-5">
								<div
									class="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white/10 group/img"
								>
									<img
										src={project.thumbnail}
										alt={project.title}
										class="h-full w-full object-cover object-center transition-transform duration-700 group-hover/img:scale-105"
									/>
									<div
										class="absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-transparent"
									></div>
								</div>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>
{/if}
