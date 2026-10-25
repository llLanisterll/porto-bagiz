<script lang="ts">
	import { ArrowUpRight } from 'lucide-svelte';

	interface PricingPlan {
		name: string;
		price: string;
		period: string;
		desc: string;
		badge: string;
		isPopular?: boolean;
		features: string[];
		btnText: string;
	}

	const plans: PricingPlan[] = [
		{
			name: 'Advisory & Sprint Audit',
			price: 'Rp 15 Juta',
			period: '/ sprint (2 minggu)',
			desc: 'Audit menyeluruh arsitektur UI/UX, identifikasi kebocoran konversi corong, dan roadmap solusi terarah.',
			badge: 'Sprint Audit',
			features: [
				'Audit Heuristik & UX Usability Review',
				'Identifikasi Titik Drop-off Corong Konversi',
				'Competitive Benchmarking Produk Sejenis',
				'Executive Summary & Prioritas Action Plan',
				'1 Sesi Konsultasi Strategis 90 Menit'
			],
			btnText: 'Pilih Sprint'
		},
		{
			name: 'Dedicated Product Lead',
			price: 'Rp 35 Juta',
			period: '/ bulan (retainer)',
			desc: 'Keterlibatan intensif sebagai Lead Product Designer untuk memimpin iterasi fitur produk digital Anda secara end-to-end.',
			badge: 'Paling Diminati',
			isPopular: true,
			features: [
				'End-to-end UI/UX Architecture & Prototyping',
				'Pembangunan & Perawatan Design System',
				'Sinkronisasi Sprint Mingguan dengan Tim Dev',
				'Riset Pengguna & A/B Testing Konversi',
				'Channel Komunikasi Privat (Slack / Notion)'
			],
			btnText: 'Mulai Kolaborasi'
		},
		{
			name: 'Venture & Enterprise Scale',
			price: 'Kustom',
			period: '/ project-based',
			desc: 'Solusi transformasi komprehensif: arsitektur multi-brand, pemodelan unit economics, hingga penyusunan pitch deck investasi.',
			badge: 'Skala Penuh',
			features: [
				'Multi-brand Tokenized Design System',
				'Unit Economics & Financial Projections',
				'Investor Pitch Deck & Storytelling Visual',
				'Handoff & Workshop Tim Internal Perusahaan',
				'Garansi & Pemeliharaan Pasca Peluncuran'
			],
			btnText: 'Konsultasi Kustom'
		}
	];

	function scrollToContact(e: MouseEvent) {
		e.preventDefault();
		const el = document.getElementById('contact');
		if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}
</script>

<section id="pricing" class="pricing">
	<div class="container">
		<!-- Section Title -->
		<div class="section-title wow fadeInUp">
			<h3>Model Kolaborasi</h3>
			<span></span>
		</div>

		<div class="pricing-header-intro wow fadeInUp">
			<h4 class="pricing-headline">
				Investasi transparan dengan fokus pada hasil dan return komersial terukur.
			</h4>
			<p class="pricing-sub">
				Tersedia opsi fleksibel mulai dari sprint audit intensif, kemitraan retainer bulanan, hingga proyek enterprise skala penuh.
			</p>
		</div>

		<!-- 3-Tier Pricing Cards Wrapper -->
		<div class="pricing-item-wrapper">
			{#each plans as plan}
				<div class="pricing-item wow fadeInUp" class:popular={plan.isPopular}>
					<div>
						<span class="feature-badge">{plan.badge}</span>
						<h6 class="pkg-name">{plan.name}</h6>
						<h3 class="pkg-price">
							{plan.price}
							<span>{plan.period}</span>
						</h3>
						<p class="pkg-desc">{plan.desc}</p>

						<ul>
							{#each plan.features as f}
								<li>{f}</li>
							{/each}
						</ul>
					</div>

					<button
						type="button"
						class="pkg-btn"
						onclick={scrollToContact}
					>
						<span>{plan.btnText}</span>
						<ArrowUpRight size={16} style="display:inline; margin-left: 6px; vertical-align: middle;" />
					</button>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.pricing-header-intro {
		display: grid;
		grid-template-columns: 1.2fr 1fr;
		gap: 40px;
		align-items: baseline;
		margin-top: 36px;
	}
	@media (max-width: 991px) {
		.pricing-header-intro {
			grid-template-columns: 1fr;
			gap: 16px;
		}
	}
	.pricing-headline {
		font-family: var(--ff-syne);
		font-size: clamp(24px, 3vw, 36px);
		font-weight: 700;
		color: var(--clr-navy);
		line-height: 1.25;
	}
	.pricing-sub {
		color: var(--clr-gray);
		font-size: 16px;
		line-height: 1.6;
	}

	.pricing-item.popular {
		border-color: var(--clr-accent);
		position: relative;
	}
	.pricing-item.popular .feature-badge {
		background: rgba(37, 99, 235, 0.12);
		color: var(--clr-accent);
	}
</style>
