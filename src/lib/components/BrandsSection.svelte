<script lang="ts">
	import { portfolioStore } from '$lib/stores/portfolioStore.svelte';

	// Extract unique companies from user experiences
	const dynamicBrands = $derived(
		Array.from(
			new Set(
				portfolioStore.experiences
					.map((e) => e.company?.trim().toUpperCase())
					.filter(Boolean)
			)
		)
	);

	// Duplicate for smooth infinite track if brands exist
	const loopBrands = $derived(
		dynamicBrands.length > 0
			? (dynamicBrands.length < 5
				? [...dynamicBrands, ...dynamicBrands, ...dynamicBrands, ...dynamicBrands]
				: [...dynamicBrands, ...dynamicBrands])
			: []
	);
</script>

{#if loopBrands.length > 0}
	<section class="brands">
		<div class="container">
			<h5 class="brands-title wow fadeInUp">
				Dipercaya Melalui Rekam Jejak Kolaborasi Profesional
			</h5>
		</div>

		<div class="brands-marquee-wrapper" aria-hidden="true">
			<div class="brands-track">
				{#each loopBrands as brand, idx (idx)}
					<div class="brand-item">
						<span class="brand-pill">{brand}</span>
						<span class="brand-dot">/</span>
					</div>
				{/each}
			</div>
		</div>
	</section>
{/if}

<style>
	.brands {
		padding: 70px 0;
		background: var(--bg-page);
		border-bottom: 1px solid var(--border-subtle);
		overflow: hidden;
	}
	.brands-title {
		font-family: var(--ff-syne);
		font-size: 14px;
		font-weight: 700;
		color: var(--text-muted);
		text-transform: uppercase;
		letter-spacing: 0.12em;
		text-align: center;
		margin-bottom: 36px;
	}

	.brands-marquee-wrapper {
		width: 100%;
		overflow: hidden;
		display: flex;
	}
	.brands-track {
		display: flex;
		gap: 40px;
		width: max-content;
		animation: scrollBrands 28s linear infinite;
		align-items: center;
	}
	.brand-item {
		display: flex;
		align-items: center;
		gap: 40px;
	}
	.brand-pill {
		font-family: var(--ff-syne);
		font-size: clamp(20px, 2.5vw, 30px);
		font-weight: 800;
		color: var(--text-heading);
		opacity: 0.45;
		letter-spacing: 0.04em;
		transition: all 0.3s ease;
		cursor: default;
	}
	.brand-pill:hover {
		opacity: 1;
		color: var(--clr-accent);
		transform: scale(1.05);
	}
	.brand-dot {
		color: var(--border-medium);
		font-weight: 700;
		font-size: 20px;
	}

	:global(html.dark) .brands {
		background: var(--bg-page);
		border-color: var(--border-subtle);
	}
	:global(html.dark) .brand-pill {
		color: var(--text-heading);
	}
	:global(html.dark) .brand-dot {
		color: rgba(255, 255, 255, 0.15);
	}
</style>
