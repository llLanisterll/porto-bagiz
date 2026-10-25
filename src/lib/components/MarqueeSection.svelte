<script lang="ts">
	const marqueeWords = [
		{ text: 'PRODUCT DESIGNER', stroke: false },
		{ text: 'BUSINESS STRATEGIST', stroke: true },
		{ text: 'UI/UX ARCHITECT', stroke: false },
		{ text: 'ENTERPRISE DESIGN SYSTEM', stroke: true },
		{ text: 'UNIT ECONOMICS & FINANCIAL MODELING', stroke: false },
		{ text: 'VENTURE & INVESTOR STORYTELLING', stroke: true },
	];

	// Duplicate items to form a seamless infinite loop
	const loopItems = [...marqueeWords, ...marqueeWords];
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
