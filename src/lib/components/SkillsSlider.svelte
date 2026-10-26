<script lang="ts">
	import {
		Layers,
		Compass,
		Search,
		Zap,
		TrendingUp,
		Sparkles,
		Code2,
		Wrench
	} from 'lucide-svelte';
	import { portfolioStore } from '$lib/stores/portfolioStore.svelte';

	// Aggregate unique skills & tools dynamically from skillPillars and projects
	const dynamicSkills = $derived.by(() => {
		const list: { name: string; level: string }[] = [];
		const seen = new Set<string>();

		// 1. From skill pillars
		portfolioStore.skillPillars.forEach((p) => {
			(p.skills || []).forEach((s) => {
				const key = s.label.trim();
				if (key && !seen.has(key.toLowerCase())) {
					seen.add(key.toLowerCase());
					list.push({ name: key, level: s.level || 'Expert' });
				}
			});
			(p.tools || []).forEach((t) => {
				const key = t.trim();
				if (key && !seen.has(key.toLowerCase())) {
					seen.add(key.toLowerCase());
					list.push({ name: key, level: 'Tool' });
				}
			});
		});

		// 2. From projects tools
		portfolioStore.projects.forEach((proj) => {
			(proj.tools || []).forEach((t) => {
				const key = t.trim();
				if (key && !seen.has(key.toLowerCase())) {
					seen.add(key.toLowerCase());
					list.push({ name: key, level: 'Tool' });
				}
			});
		});

		return list;
	});

	// Duplicate for smooth infinite CSS loop
	const loopSkills = $derived(
		dynamicSkills.length > 0
			? (dynamicSkills.length < 5
				? [...dynamicSkills, ...dynamicSkills, ...dynamicSkills, ...dynamicSkills]
				: [...dynamicSkills, ...dynamicSkills])
			: []
	);
</script>

{#if loopSkills.length > 0}
	<section class="skills">
		<div class="skills-slider-track">
			{#each loopSkills as skill, idx (idx)}
				<div class="skill-item">
					<figure>
						{#if skill.name.toLowerCase().includes('figma')}
							<svg class="skill-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"/>
								<path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"/>
								<path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z"/>
								<path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z"/>
								<path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"/>
							</svg>
						{:else if skill.name.toLowerCase().includes('system') || skill.name.toLowerCase().includes('design')}
							<Layers class="skill-svg-icon" size={32} />
						{:else if skill.name.toLowerCase().includes('strateg') || skill.name.toLowerCase().includes('bisnis')}
							<Compass class="skill-svg-icon" size={32} />
						{:else if skill.name.toLowerCase().includes('research') || skill.name.toLowerCase().includes('riset')}
							<Search class="skill-svg-icon" size={32} />
						{:else if skill.name.toLowerCase().includes('proto') || skill.name.toLowerCase().includes('interact')}
							<Zap class="skill-svg-icon" size={32} />
						{:else if skill.name.toLowerCase().includes('growth') || skill.name.toLowerCase().includes('metric') || skill.name.toLowerCase().includes('anal')}
							<TrendingUp class="skill-svg-icon" size={32} />
						{:else if skill.name.toLowerCase().includes('framer') || skill.name.toLowerCase().includes('spark')}
							<Sparkles class="skill-svg-icon" size={32} />
						{:else if skill.name.toLowerCase().includes('code') || skill.name.toLowerCase().includes('css') || skill.name.toLowerCase().includes('dev')}
							<Code2 class="skill-svg-icon" size={32} />
						{:else}
							<Wrench class="skill-svg-icon" size={32} />
						{/if}
					</figure>
					<div class="skill-txt">
						<h4>{skill.level}</h4>
						<span>{skill.name}</span>
					</div>
				</div>
			{/each}
		</div>
	</section>
{/if}

<style>
	:global(.skill-svg-icon) {
		width: 32px;
		height: 32px;
		color: var(--clr-navy);
		transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
	}
	.skill-item:hover :global(.skill-svg-icon) {
		color: var(--clr-accent);
		transform: scale(1.12);
	}
</style>
