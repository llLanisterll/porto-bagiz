<script lang="ts">
	import { portfolioStore } from '$lib/stores/portfolioStore.svelte';

	const dynamicWords = $derived.by(() => {
		const items: { text: string; stroke: boolean }[] = [];

		if (portfolioStore.profile.headline) {
			items.push({ text: portfolioStore.profile.headline.toUpperCase(), stroke: false });
		}
		if (portfolioStore.profile.tagline) {
			items.push({ text: portfolioStore.profile.tagline.toUpperCase(), stroke: true });
		}

		portfolioStore.categories.forEach((cat, idx) => {
			items.push({ text: cat.name.toUpperCase(), stroke: idx % 2 === 1 });
		});

		portfolioStore.skillPillars.forEach((pil, idx) => {
			items.push({ text: pil.title.toUpperCase(), stroke: (idx + items.length) % 2 === 1 });
		});

		// Fallback keywords if store is newly emptied
		if (items.length < 3) {
			const fallbacks = [
				{ text: 'PRODUCT DESIGNER', stroke: false },
				{ text: 'BUSINESS STRATEGIST', stroke: true },
				{ text: 'ENTERPRISE DESIGN SYSTEM', stroke: false },
				{ text: 'COMMERCIAL IMPACT', stroke: true }
			];
			fallbacks.forEach((f) => {
				if (!items.some((i) => i.text === f.text)) {
					items.push(f);
				}
			});
		}

		return items;
	});

	// Duplicate items to form a seamless infinite loop
	const loopItems = $derived([...dynamicWords, ...dynamicWords]);
</script>

<section class="marquee" aria-hidden="true">
	<div class="marquee-wrapper">
		{#each loopItems as item, idx (idx)}
			<div class="marquee-title">
				<h2 class:text-stroke-navy={item.stroke}>
					{item.text}
				</h2>
				<span class="marquee-star">✦</span>
			</div>
		{/each}
	</div>
</section>

<style>
	.marquee {
		border-top: 1px solid rgba(10, 22, 40, 0.08);
		border-bottom: 1px solid rgba(10, 22, 40, 0.08);
		padding: 44px 0;
		background: #ffffff;
		user-select: none;
	}
	.marquee-star {
		font-size: clamp(24px, 3.5vw, 42px);
		color: var(--clr-accent);
		opacity: 0.8;
		padding: 0 10px;
	}
</style>
