<script lang="ts">
	import { onMount } from 'svelte';

	const items = [
		{ num: 25, suffix: '+', label: 'Proyek Selesai & Rilis', order: '01' },
		{ num: 18, suffix: '+', label: 'Klien & Partner Korporasi', order: '02' },
		{ num: 4, suffix: '+', label: 'Tahun Pengalaman Industri', order: '03' },
		{ num: 38, suffix: '%', label: 'Rata-rata Lonjakan Konversi', order: '04' },
	];

	let display = $state(items.map(() => 0));
	let done = $state(false);
	let container: HTMLElement;

	onMount(() => {
		const obs = new IntersectionObserver(entries => {
			if (entries[0].isIntersecting && !done) {
				done = true;
				items.forEach((item, i) => {
					let cur = 0;
					const step = 16;
					const inc = item.num / (1600 / step);
					const iv = setInterval(() => {
						cur += inc;
						if (cur >= item.num) {
							display[i] = item.num;
							clearInterval(iv);
						} else {
							display[i] = Math.floor(cur);
						}
					}, step);
				});
			}
		}, { threshold: 0.3 });

		if (container) obs.observe(container);
		return () => obs.disconnect();
	});
</script>

<section class="counter-section" bind:this={container}>
	<div class="counter-grid">
		{#each items as item, i}
			<div class="counter-item wow fadeInUp" class:delay-1={i===0} class:delay-2={i===1} class:delay-3={i===2} class:delay-4={i===3}>
				<div class="counter-num-label">{item.order}</div>
				<div class="counter-value">
					{display[i]}<span class="accent">{item.suffix}</span>
				</div>
				<div class="counter-label">{item.label}</div>
			</div>
		{/each}
	</div>
</section>
