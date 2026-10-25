<script lang="ts">
	import { mockProfile } from '$lib/data/mockPortfolio';
	import { ArrowUpRight, CheckCircle2 } from 'lucide-svelte';

	function scrollTo(e: MouseEvent, targetId: string) {
		e.preventDefault();
		const el = document.getElementById(targetId);
		if (el) {
			el.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	}
</script>

<section id="about" class="about">
	<div class="container">
		<!-- Textio Section Title with Line & Dot -->
		<div class="section-title wow fadeInUp">
			<h3>Tentang Saya</h3>
			<span></span>
		</div>

		<!-- Big Statement Headline -->
		<h3 class="about-info wow fadeInUp">
			Saya adalah Lead UX/UI Designer & Business Strategist dengan pengalaman lebih dari <span class="txt-accent">6+ tahun</span>. Berpengalaman mendesain produk digital terukur untuk startup hingga enterprise, menghubungkan estetika interaksi dengan profitabilitas bisnis nyata.
		</h3>

		<div class="about-row">
			<!-- Left: Big Year Exp Counter & Circular Button -->
			<div class="about-left-col wow fadeInLeft">
				<div class="year-exp">
					<div class="year-exp-txt">
						<span>6+</span>
						<h4>Tahun<br />Pengalaman Teruji</h4>
					</div>
				</div>

				<div class="about-points">
					<div class="point-item">
						<CheckCircle2 size={18} class="point-icon" />
						<span>Spesialisasi Enterprise Design System & Multi-brand Scalability</span>
					</div>
					<div class="point-item">
						<CheckCircle2 size={18} class="point-icon" />
						<span>Riset Funnel Konversi & Optimasi Retensi Berbasis Data</span>
					</div>
					<div class="point-item">
						<CheckCircle2 size={18} class="point-icon" />
						<span>Kolaborasi Erat dengan Tim Engineering & Manajemen Produk</span>
					</div>
				</div>

				<a
					class="bttn-round"
					href="#contact"
					onclick={(e) => scrollTo(e, 'contact')}
				>
					<span class="btn-txt">
						<span>Hubungi</span>
						<ArrowUpRight size={17} />
					</span>
				</a>
			</div>

			<!-- Right: Showcase Visual -->
			<div class="about-right-col wow fadeInRight">
				<div class="about-media-box">
					<img
						src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&q=80"
						alt="Kolaborasi tim desain produk"
						loading="lazy"
					/>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.about-left-col {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 32px;
	}
	.about-points {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
	.point-item {
		display: flex;
		align-items: center;
		gap: 12px;
		font-size: 15px;
		font-weight: 600;
		color: #1e293b;
	}
	:global(.point-icon) {
		color: var(--clr-accent);
		flex-shrink: 0;
	}
</style>
