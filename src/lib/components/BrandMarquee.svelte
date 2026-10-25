<script lang="ts">
	const brands = [
		'Figma',
		'Design Systems',
		'Product Strategy',
		'Lean Canvas',
		'User Research',
		'Financial Modeling',
		'Mixpanel',
		'Tailwind CSS',
		'Framer',
		'Unit Economics',
		'Rapid Prototyping',
		'A/B Testing',
	];

	const items = [...brands, ...brands];
</script>

<section class="brand-section" aria-label="Keahlian & Perangkat">
	<div class="marquee-track">
		{#each items as brand}
			<span class="brand-item">
				<span class="brand-dot"></span>
				{brand}
			</span>
		{/each}
	</div>
</section>
