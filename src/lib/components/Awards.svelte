<script lang="ts">
	const awards = [
		{
			cat: 'UI/UX & Fintech',
			title: 'Best Product Design & Retention Architecture — Indonesia UX Award',
			year: '2024',
			img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&q=80',
		},
		{
			cat: 'Kompetisi Bisnis',
			title: 'Juara 1 — National Business Case Competition 2022',
			year: '2022',
			img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=300&q=80',
		},
		{
			cat: 'Akademik',
			title: 'Lulusan Terbaik Predikat Pujian (Cum Laude - IPK 3.84) — Universitas Indonesia',
			year: '2023',
			img: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=300&q=80',
		},
		{
			cat: 'Sertifikasi Global',
			title: 'Enterprise Design Systems & UX Architecture — Interaction Design Foundation (IxDF)',
			year: '2023',
			img: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=300&q=80',
		},
		{
			cat: 'Strategi Produk',
			title: 'Fellowship Product Monetization & Growth Architecture — Reforge',
			year: '2024',
			img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&q=80',
		},
	];
</script>

<section class="awards-section">
	<div class="section-container">
		<div class="wow fadeInUp">
			<span class="section-tag">Recognition & Honors</span>
			<h2 class="section-title-lg title-with-bar">Pencapaian & Pengakuan Industri</h2>
		</div>

		<div class="awards-list">
			{#each awards as award, i}
				<div class="award-row wow fadeInUp" style="transition-delay:{i * 0.08}s">
					<img src={award.img} alt={award.title} class="award-hover-img" />
					<div>
						<div class="award-cat">{award.cat}</div>
						<div class="award-title">{award.title}</div>
					</div>
					<div class="award-year">{award.year}</div>
				</div>
			{/each}
		</div>
	</div>
</section>
