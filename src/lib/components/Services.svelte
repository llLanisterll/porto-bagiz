<script lang="ts">
	import { Layout, TrendingUp, Layers, Calculator, BarChart3, Presentation } from '@lucide/svelte';

	const services = [
		{
			icon: Layout,
			title: 'UI/UX & Product Architecture',
			tag: 'Desain',
			desc: 'Merancang antarmuka pengguna berbasis riset empati, wireframe low-fidelity hingga prototipe interaktif dengan fokus micro-interactions dan kepuasan pengguna.',
		},
		{
			icon: TrendingUp,
			title: 'Product Strategy & Monetization',
			tag: 'Bisnis',
			desc: 'Menyusun peta jalan produk (roadmap), diferensiasi nilai pasar, penentuan skema monetisasi freemium/tiering, dan alignment target bisnis stakeholder.',
		},
		{
			icon: Layers,
			title: 'Enterprise Design Systems',
			tag: 'Desain',
			desc: 'Membangun arsitektur token semantik, pustaka komponen multi-brand, standarisasi dokumentasi Figma Variables, dan efisiensi kolaborasi tim dev.',
		},
		{
			icon: Calculator,
			title: 'Unit Economics & Financial Modeling',
			tag: 'Bisnis',
			desc: 'Menghitung rasio CAC/LTV, analisis break-even point, proyeksi arus kas multi-skenario, dan validasi kelayakan finansial inisiatif teknologi.',
		},
		{
			icon: BarChart3,
			title: 'Product Analytics & Funnel Audit',
			tag: 'Bisnis & Desain',
			desc: 'Menganalisis retensi kohort pengguna, mengidentifikasi titik kebocoran corong konversi, dan merumuskan eksperimen A/B testing berbasis metrik.',
		},
		{
			icon: Presentation,
			title: 'Pitch Deck & Investor Storytelling',
			tag: 'Bisnis',
			desc: 'Menyusun narasi penggalangan dana persuasif, data room investor terstruktur, dan presentasi penawaran kerja sama strategis korporasi B2B.',
		},
	];

	let activeIdx: number | null = $state(null);
</script>

<section class="services-section" id="layanan">
	<div class="section-container">
		<div class="wow fadeInUp" style="max-width:640px">
			<span class="section-tag">What I Offer</span>
			<h2 class="section-title-lg title-with-bar">Layanan Strategis & Desain</h2>
			<p class="section-lead">
				Menggabungkan presisi estetika desain produk dengan ketajaman analisis bisnis untuk melipatgandakan nilai dan pertumbuhan produk digital Anda.
			</p>
		</div>

		<div class="services-grid">
			{#each services as svc, i}
				<div
					class="service-card wow fadeInUp"
					class:active={activeIdx === i}
					class:delay-1={i%3===0} class:delay-2={i%3===1} class:delay-3={i%3===2}
					onmouseenter={() => activeIdx = i}
					onmouseleave={() => activeIdx = null}
					role="article"
				>
					<div class="service-icon">
						<svc.icon size={28} color="var(--accent)" />
					</div>
					<div class="service-meta-tag">{svc.tag}</div>
					<h3 class="service-title">{svc.title}</h3>
					<p class="service-desc">{svc.desc}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.service-meta-tag {
		font-size: 11px;
		font-weight: 700;
		color: var(--accent);
		text-transform: uppercase;
		letter-spacing: 0.08em;
		margin-bottom: 8px;
	}
</style>
