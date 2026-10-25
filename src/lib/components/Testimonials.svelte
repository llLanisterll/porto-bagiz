<script lang="ts">
	let activeIdx = $state(0);

	const testimonials = [
		{
			text: '"Bagiz adalah profil hibrida yang sangat langka. Ia tidak hanya merancang antarmuka dompet digital kami menjadi sangat intuitif, tetapi juga menyusun strategi retensi berbasis unit economics yang meningkatkan konversi pengguna baru kami hingga 42%."',
			name: 'Budi Santoso',
			role: 'VP of Product, NexaPay Financial',
			avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=120&q=80',
		},
		{
			text: '"Design system multi-brand yang dibangun Bagiz memangkas siklus rilis fitur tim engineering kami dari 3 minggu menjadi 4 hari kerja. Konsistensi visual dan dokumentasi tokennya luar biasa rapi."',
			name: 'Sari Dewi',
			role: 'Head of Design & Brand, Aura Commerce Group',
			avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&q=80',
		},
		{
			text: '"Kemampuan Bagiz menyusun riset pasar, pemodelan finansial SaaS, dan pitch deck investasi menjadi kunci sukses kami mengamankan $1.4M ARR serta kemitraan dengan 8 korporasi FMCG terkemuka."',
			name: 'Rizky Pratama',
			role: 'Chief Operating Officer, Velo Logistics B2B',
			avatar: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?w=120&q=80',
		},
	];

	function setActive(i: number) { activeIdx = i; }
</script>

<section class="testimonial-section">
	<div class="testimonial-inner">
		<div class="wow fadeInUp">
			<span class="section-tag">Endorsement & Dampak</span>
			<h2 class="section-title-lg" style="margin-bottom:48px">Apa Kata Para Pemimpin Produk</h2>
		</div>

		<div class="testi-quote-icon wow fadeInUp delay-1">“</div>

		<div class="wow fadeInUp delay-2">
			<p class="testi-text">{testimonials[activeIdx].text}</p>
			<div class="testi-author-name">{testimonials[activeIdx].name}</div>
			<div class="testi-author-role">{testimonials[activeIdx].role}</div>
		</div>

		<div class="testi-nav wow fadeInUp delay-3">
			{#each testimonials as t, i}
				<button
					class="testi-avatar-btn"
					class:active={activeIdx === i}
					onclick={() => setActive(i)}
					aria-label="Lihat testimoni dari {t.name}"
				>
					<img src={t.avatar} alt={t.name} />
				</button>
			{/each}
		</div>
	</div>
</section>
