<script lang="ts">
	import { ArrowUpRight, Check, Plus, Minus } from 'lucide-svelte';

	interface ServiceItem {
		num: string;
		title: string;
		tag: string;
		desc: string;
		deliverables: string[];
	}

	const services: ServiceItem[] = [
		{
			num: '01',
			title: 'UI/UX & Product Design',
			tag: 'Product Architecture',
			desc: 'Merancang antarmuka pengguna digital berbasis riset empati pengguna mendalam, wireframing, dan prototipe interaktif high-fidelity yang memikat serta mempermudah adopsi produk.',
			deliverables: [
				'User Flow & Journey Mapping',
				'Interactive High-Fidelity Prototypes',
				'Micro-interactions & Motion UX',
				'Usability Testing & Design Iterations'
			]
		},
		{
			num: '02',
			title: 'Business Strategy & Growth',
			tag: 'Monetization & Strategy',
			desc: 'Menyelaraskan target bisnis stakeholder dengan kebutuhan user nyata. Menyusun peta jalan (roadmap), diferensiasi nilai pasar, dan strategi konversi terukur.',
			deliverables: [
				'Unit Economics & Monetization Modeling',
				'Conversion Funnel Audit & A/B Testing',
				'Competitive Market Positioning',
				'Feature Prioritization Matrix'
			]
		},
		{
			num: '03',
			title: 'Enterprise Design Systems',
			tag: 'Scalability & Ops',
			desc: 'Membangun arsitektur token semantik, pustaka komponen multi-brand, standarisasi dokumentasi Figma Variables, dan efisiensi kolaborasi lintas tim desain dan engineer.',
			deliverables: [
				'Semantic Token Architecture (Color, Type, Spacing)',
				'Atomic Component Library & Accessibility (WCAG 2.1)',
				'Figma Variables & Auto-layout Guidelines',
				'Developer Handoff Documentation'
			]
		},
		{
			num: '04',
			title: 'Pitch Deck & Investor Story',
			tag: 'Venture & Capital',
			desc: 'Menyusun narasi penggalangan dana persuasif, data room investor terstruktur, dan presentasi penawaran kerja sama strategis korporasi B2B dengan visual premium.',
			deliverables: [
				'Narrative Structure & Problem-Solution Fit',
				'Financial Traction Data Visualization',
				'Executive Presentation Deck (Figma / Keynote)',
				'B2B Enterprise Partnership Proposals'
			]
		}
	];

	let activeIndex = $state(0);

	function toggleItem(index: number) {
		if (activeIndex === index) {
			activeIndex = -1;
		} else {
			activeIndex = index;
		}
	}

	function scrollToContact(e: MouseEvent) {
		e.preventDefault();
		const el = document.getElementById('contact');
		if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}
</script>

<section id="services" class="services">
	<div class="container">
		<!-- Textio Section Title with horizontal line & dot -->
		<div class="section-title wow fadeInUp">
			<h3>Layanan Unggulan</h3>
			<span></span>
		</div>

		<div class="services-intro-row wow fadeInUp">
			<h4 class="services-headline">
				Solusi komprehensif dari konsepsi ide, arsitektur visual, hingga validasi komersial.
			</h4>
			<p class="services-lead">
				Pendekatan ganda menghubungkan estetika desain berkelas dunia dengan strategi pertumbuhan bisnis yang dapat dipertanggungjawabkan secara finansial.
			</p>
		</div>

		<!-- Accordion Wrapper -->
		<div class="service-item-wrapper">
			{#each services as item, idx}
				<div
					class="service-item"
					class:is-active={activeIndex === idx}
					onclick={() => toggleItem(idx)}
					onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleItem(idx); } }}
					tabindex="0"
					role="button"
					aria-expanded={activeIndex === idx}
				>
					<div class="service-header-row">
						<div class="service-title-group">
							<span class="service-num">{item.num}</span>
							<h3 class="service-thumb">{item.title}</h3>
						</div>
						<div class="service-toggle-btn" class:rotated={activeIndex === idx}>
							{#if activeIndex === idx}
								<Minus size={22} />
							{:else}
								<Plus size={22} />
							{/if}
						</div>
					</div>

					{#if activeIndex === idx}
						<div class="service-panel-content">
							<div class="service-details-col">
								<span class="service-tag-pill">{item.tag}</span>
								<p class="service-desc">{item.desc}</p>
								<ul class="service-panel">
									{#each item.deliverables as d}
										<li>
											<Check size={16} class="check-icon" />
											<span>{d}</span>
										</li>
									{/each}
								</ul>
							</div>
							<div class="service-action-col">
								<a
									class="bttn-round"
									href="#contact"
									onclick={(e) => { e.stopPropagation(); scrollToContact(e); }}
								>
									<span class="btn-txt">
										<span>Pesan</span>
										<ArrowUpRight size={16} />
									</span>
								</a>
							</div>
						</div>
					{/if}
				</div>
			{/each}
		</div>

		<!-- View All / Book CTA -->
		<div class="services-bottom-cta wow fadeInUp">
			<a class="bttn bttn-primary" href="#contact" onclick={scrollToContact}>
				<span>Diskusikan Proyek Anda</span>
				<ArrowUpRight size={18} />
			</a>
		</div>
	</div>
</section>

<style>
	.services-intro-row {
		display: grid;
		grid-template-columns: 1.2fr 1fr;
		gap: 40px;
		align-items: baseline;
		margin-top: 36px;
		margin-bottom: 50px;
	}
	@media (max-width: 991px) {
		.services-intro-row {
			grid-template-columns: 1fr;
			gap: 16px;
		}
	}
	.services-headline {
		font-family: var(--ff-syne);
		font-size: clamp(24px, 3vw, 36px);
		font-weight: 700;
		color: var(--clr-navy);
		line-height: 1.25;
	}
	.services-lead {
		color: var(--clr-gray);
		font-size: 16px;
		line-height: 1.6;
	}

	.service-title-group {
		display: flex;
		align-items: baseline;
		gap: 24px;
	}
	.service-num {
		font-family: var(--ff-syne);
		font-size: clamp(20px, 2.5vw, 30px);
		font-weight: 700;
		color: var(--clr-accent);
		opacity: 0.9;
		letter-spacing: -0.01em;
	}

	.service-toggle-btn {
		width: 48px;
		height: 48px;
		border-radius: 50%;
		border: 1px solid rgba(10, 22, 40, 0.15);
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--clr-navy);
		background: #ffffff;
		transition: all 0.3s ease;
		flex-shrink: 0;
	}
	.service-item:hover .service-toggle-btn,
	.service-item.is-active .service-toggle-btn {
		background: var(--clr-navy);
		color: #ffffff;
		border-color: var(--clr-navy);
	}

	.service-tag-pill {
		display: inline-block;
		font-family: var(--ff-syne);
		font-size: 11px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		background: rgba(37, 99, 235, 0.08);
		color: var(--clr-accent);
		padding: 4px 12px;
		border-radius: 999px;
		margin-bottom: 12px;
	}
	.service-desc {
		font-size: 16px;
		color: #475569;
		line-height: 1.65;
		max-width: 680px;
		margin-bottom: 20px;
	}

	:global(.check-icon) {
		color: var(--clr-accent);
		flex-shrink: 0;
		margin-top: 2px;
	}

	.service-panel li {
		display: flex;
		align-items: flex-start;
		gap: 10px;
		font-size: 15px;
		color: var(--clr-navy);
		font-weight: 600;
	}

	.services-bottom-cta {
		text-align: center;
		margin-top: 60px;
	}
</style>
