<script lang="ts">
	const row1Words = [
		'Product Design', 'Business Strategy', 'Design Systems', 'Unit Economics',
		'User Research', 'Growth Architecture', 'Figma Variables', 'Conversion Optimization',
	];
	const row2Words = [
		'Financial Modeling', 'Semantic UI Tokens', 'Interactive Prototyping', 'Usability Testing',
		'Market Research', 'Pitch Deck Investasi', 'A/B Testing', 'Retention Strategy',
	];

	// Duplicate for seamless infinite loop
	const r1 = [...row1Words, ...row1Words];
	const r2 = [...row2Words, ...row2Words];
</script>

<section class="scrollbox-section" aria-hidden="true">
	<div class="scrollbox-row">
		<div class="scrollbox-track">
			{#each r1 as word, i}
				<span class="scrollbox-item" class:accent-text={i % 4 === 0}>{word}</span>
			{/each}
		</div>
	</div>
	<div class="scrollbox-row">
		<div class="scrollbox-track reverse">
			{#each r2 as word, i}
				<span class="scrollbox-item" class:accent-text={i % 4 === 2}>{word}</span>
			{/each}
		</div>
	</div>
</section>
