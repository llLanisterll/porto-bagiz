<script lang="ts">
	import {
		Layers,
		Compass,
		Search,
		Zap,
		TrendingUp,
		Sparkles,
		Code2
	} from 'lucide-svelte';

	const skills = [
		{ name: 'Figma', level: 'Expert', id: 'figma' },
		{ name: 'Design System', level: 'Master', id: 'ds' },
		{ name: 'Product Strategy', level: 'Lead', id: 'strategy' },
		{ name: 'UX Research', level: 'Expert', id: 'research' },
		{ name: 'Prototyping', level: 'Expert', id: 'prototype' },
		{ name: 'Business Model', level: 'Specialist', id: 'business' },
		{ name: 'Framer', level: 'Advanced', id: 'framer' },
		{ name: 'Tailwind CSS', level: 'Advanced', id: 'code' }
	];

	// Duplicate for smooth infinite CSS loop
	const loopSkills = [...skills, ...skills];
</script>

<section class="skills">
	<div class="skills-slider-track">
		{#each loopSkills as skill, idx (idx)}
			<div class="skill-item">
				<figure>
					{#if skill.id === 'figma'}
						<svg class="skill-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"/>
							<path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"/>
							<path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z"/>
							<path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z"/>
							<path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"/>
						</svg>
					{:else if skill.id === 'ds'}
						<Layers class="skill-svg-icon" size={32} />
					{:else if skill.id === 'strategy'}
						<Compass class="skill-svg-icon" size={32} />
					{:else if skill.id === 'research'}
						<Search class="skill-svg-icon" size={32} />
					{:else if skill.id === 'prototype'}
						<Zap class="skill-svg-icon" size={32} />
					{:else if skill.id === 'business'}
						<TrendingUp class="skill-svg-icon" size={32} />
					{:else if skill.id === 'framer'}
						<Sparkles class="skill-svg-icon" size={32} />
					{:else if skill.id === 'code'}
						<Code2 class="skill-svg-icon" size={32} />
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
