<script lang="ts">
	import { portfolioStore } from '$lib/stores/portfolioStore.svelte';
	import { ArrowUpRight, CheckCircle2 } from 'lucide-svelte';

	function scrollTo(e: MouseEvent, targetId: string) {
		e.preventDefault();
		const el = document.getElementById(targetId);
		if (el) {
			el.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	}

	const narrativeParagraphs = $derived(
		portfolioStore.profile.aboutNarrative?.filter(Boolean) || []
	);

	const statsList = $derived(
		portfolioStore.profile.stats?.filter((s) => s.value && s.value !== '0' && s.value !== '$0') || []
	);
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
			{#if narrativeParagraphs.length > 0}
				{narrativeParagraphs[0]}
			{:else}
				Saya adalah <span class="txt-accent">{portfolioStore.profile.headline || 'Product Designer & Business Strategist'}</span>. {portfolioStore.profile.bio || 'Menghubungkan estetika interaksi dengan profitabilitas bisnis nyata.'}
			{/if}
		</h3>

		<div class="about-row">
			<!-- Left: Big Year Exp Counter & Circular Button -->
			<div class="about-left-col wow fadeInLeft">
				<div class="year-exp">
					<div class="year-exp-txt">
						<span class="exp-number">{portfolioStore.profile.stats?.[0]?.value || '4+'}</span>
						<h4>{portfolioStore.profile.stats?.[0]?.label || 'Tahun Pengalaman'}</h4>
					</div>
				</div>

				<div class="about-points">
					{#if narrativeParagraphs.length > 1}
						{#each narrativeParagraphs.slice(1) as point}
							<div class="point-item">
								<CheckCircle2 size={18} class="point-icon" />
								<span>{point}</span>
							</div>
						{/each}
					{:else}
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
					{/if}
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

		<!-- 4 Dynamic Metric KPI Cards -->
		{#if statsList.length > 0}
			<div class="about-stats-grid wow fadeInUp">
				{#each statsList as stat}
					<div class="about-stat-item">
						<span class="stat-value">{stat.value}</span>
						<span class="stat-label">{stat.label}</span>
						{#if stat.description}
							<span class="stat-desc">{stat.description}</span>
						{/if}
					</div>
				{/each}
			</div>
		{/if}
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
		align-items: flex-start;
		gap: 12px;
		font-size: 15px;
		font-weight: 600;
		color: var(--text-primary);
		line-height: 1.5;
	}
	:global(.point-icon) {
		color: var(--clr-accent);
		flex-shrink: 0;
		margin-top: 2px;
	}

	/* Dynamic 4-Metric Grid */
	.about-stats-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 20px;
		margin-top: 50px;
		padding-top: 40px;
		border-top: 1px solid var(--border-subtle);
	}
	@media (max-width: 991px) {
		.about-stats-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: 16px;
		}
	}
	@media (max-width: 575px) {
		.about-stats-grid {
			grid-template-columns: 1fr;
		}
	}
	.about-stat-item {
		background: var(--bg-surface);
		border: 1px solid var(--border-subtle);
		border-radius: 16px;
		padding: 24px 20px;
		display: flex;
		flex-direction: column;
		gap: 6px;
		box-shadow: 0 4px 16px rgba(10, 22, 40, 0.02);
		transition: all 0.3s ease;
	}
	.about-stat-item:hover {
		transform: translateY(-4px);
		box-shadow: 0 12px 28px rgba(10, 22, 40, 0.06);
		border-color: rgba(37, 99, 235, 0.3);
	}
	.stat-value {
		font-family: var(--ff-syne);
		font-size: 32px;
		font-weight: 800;
		color: var(--clr-accent);
		line-height: 1;
		letter-spacing: -0.02em;
	}
	.stat-label {
		font-family: var(--ff-syne);
		font-size: 13.5px;
		font-weight: 700;
		color: var(--text-heading);
	}
	.stat-desc {
		font-size: 12.5px;
		color: var(--text-muted);
		line-height: 1.4;
	}

	:global(html.dark) .about-stat-item {
		background: var(--bg-surface);
		border-color: var(--border-subtle);
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
	}
	:global(html.dark) .about-stat-item:hover {
		box-shadow: 0 12px 28px rgba(0, 0, 0, 0.5);
		border-color: rgba(59, 130, 246, 0.45);
	}
</style>
