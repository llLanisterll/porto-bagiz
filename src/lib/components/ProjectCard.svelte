<script lang="ts">
	import type { Project } from '#lib/types/portfolio';
	import {
		ExternalLink,
		Sparkles,
		Flame,
		ArrowUpRight,
		Clock,
		User,
		TrendingUp,
		Layers,
		CheckCircle2
	} from 'lucide-svelte';

	interface Props {
		project: Project;
	}

	let { project }: Props = $props();

	function getCategoryBadgeClass(category: Project['category']) {
		switch (category) {
			case 'Desain':
				return 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30';
			case 'Bisnis':
				return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
			case 'Hybrid':
				return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
			default:
				return 'bg-neutral-800 text-neutral-300 border-neutral-700';
		}
	}
</script>

<article
	class="glass-card group flex flex-col justify-between overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1.5"
	id="project-card-{project.id}"
>
	<!-- Thumbnail Image Container -->
	<div class="relative aspect-video w-full overflow-hidden bg-neutral-900">
		<img
			src={project.thumbnail}
			alt={project.title}
			loading="lazy"
			class="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
		/>
		<div
			class="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent opacity-80"
		></div>

		<!-- Top Badges Overlay -->
		<div class="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
			<!-- Category Badge -->
			<span
				class="inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold backdrop-blur-md border {getCategoryBadgeClass(
					project.category
				)}"
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

			<!-- Right Status Badges -->
			<div class="flex items-center gap-1.5">
				{#if project.isNew}
					<span
						class="inline-flex items-center gap-1 rounded-lg bg-rose-500/20 border border-rose-500/40 px-2 py-0.5 text-[11px] font-bold text-rose-300 backdrop-blur-md"
					>
						<Flame class="h-3 w-3 text-rose-400" />
						BARU
					</span>
				{/if}

				{#if project.isFeatured}
					<span
						class="inline-flex items-center gap-1 rounded-lg bg-amber-500/20 border border-amber-500/40 px-2 py-0.5 text-[11px] font-bold text-amber-300 backdrop-blur-md"
					>
						<Sparkles class="h-3 w-3 text-amber-400" />
						UNGGULAN
					</span>
				{/if}
			</div>
		</div>

		<!-- Role & Duration Pills -->
		<div class="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-neutral-300">
			<span class="inline-flex items-center gap-1 truncate font-medium">
				<User class="h-3.5 w-3.5 text-indigo-400" />
				{project.role}
			</span>
			<span class="inline-flex items-center gap-1 shrink-0 text-neutral-400">
				<Clock class="h-3 w-3" />
				{project.duration}
			</span>
		</div>
	</div>

	<!-- Content Body -->
	<div class="flex flex-1 flex-col justify-between p-6">
		<div>
			<h3
				class="text-xl font-bold text-neutral-100 group-hover:text-indigo-400 transition-colors line-clamp-2"
			>
				{project.title}
			</h3>
			<p class="mt-1 text-xs font-medium text-indigo-300/80 line-clamp-1">
				{project.subtitle}
			</p>

			<p class="mt-3 text-sm text-neutral-300/90 leading-relaxed line-clamp-3">
				{project.summary}
			</p>

			<!-- Key Metrics Highlights -->
			{#if project.metrics && project.metrics.length > 0}
				<div class="mt-4 grid grid-cols-2 gap-2">
					{#each project.metrics.slice(0, 2) as metric (metric.label)}
						<div
							class="rounded-xl bg-neutral-900/80 border border-white/5 p-2.5 flex flex-col justify-center"
						>
							<div class="text-base font-extrabold text-emerald-400 flex items-center gap-1">
								<span>{metric.value}</span>
							</div>
							<div class="text-[11px] text-neutral-400 truncate">
								{metric.label}
							</div>
						</div>
					{/each}
				</div>
			{/if}

			<!-- Tools Chips -->
			<div class="mt-4 flex flex-wrap gap-1.5">
				{#each project.tools as tool (tool)}
					<span
						class="rounded-md bg-neutral-900 px-2 py-0.5 text-[11px] font-medium text-neutral-400 border border-neutral-800"
					>
						{tool}
					</span>
				{/each}
			</div>
		</div>

		<!-- Action Footer Links -->
		<div class="mt-6 pt-4 border-t border-white/5 flex items-center justify-between gap-3">
			<div class="flex items-center gap-2 text-xs">
				{#if project.links.figma}
					<a
						href={project.links.figma}
						target="_blank"
						rel="noreferrer"
						class="text-neutral-400 hover:text-white transition-colors"
						title="Buka Figma Prototype"
					>
						Figma
					</a>
				{/if}
				{#if project.links.liveDemo}
					{#if project.links.figma}<span class="text-neutral-600">•</span>{/if}
					<a
						href={project.links.liveDemo}
						target="_blank"
						rel="noreferrer"
						class="text-neutral-400 hover:text-white transition-colors"
						title="Buka Live Demo"
					>
						Demo
					</a>
				{/if}
				{#if project.links.pitchDeck}
					{#if project.links.figma || project.links.liveDemo}<span class="text-neutral-600">•</span>{/if}
					<a
						href={project.links.pitchDeck}
						target="_blank"
						rel="noreferrer"
						class="text-neutral-400 hover:text-white transition-colors"
						title="Buka Pitch Deck"
					>
						Deck
					</a>
				{/if}
			</div>

			<a
				href="/karya/{project.slug}"
				class="inline-flex items-center gap-1 text-xs font-semibold text-indigo-400 group-hover:text-indigo-300 group-hover:translate-x-0.5 transition-all"
				id="project-detail-link-{project.id}"
			>
				<span>Studi Kasus</span>
				<ArrowUpRight class="h-3.5 w-3.5" />
			</a>
		</div>
	</div>
</article>
