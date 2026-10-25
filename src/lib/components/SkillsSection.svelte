<script lang="ts">
	import { ArrowUpRight, Palette, Layers, TrendingUp, Sparkles, CheckCircle2 } from 'lucide-svelte';
	import { portfolioStore } from '$lib/stores/portfolioStore.svelte';
	import type { SkillPillar } from '$lib/types/portfolio';

	let pillars = $derived(portfolioStore.skillPillars);

	function scrollToContact(e: MouseEvent) {
		e.preventDefault();
		const el = document.getElementById('contact');
		if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}
</script>

<section id="keahlian" class="skills-section">
	<div class="container">
		<!-- Section Title (Textio Signature Line & Dot) -->
		<div class="section-title">
			<h3>Keahlian & Spesialisasi</h3>
			<span></span>
		</div>

		<!-- Section Introduction -->
		<div class="skills-header-intro">
			<h4 class="skills-headline">
				Kombinasi Presisi Desain Visual & Logika Bisnis Komersial
			</h4>
			<p class="skills-sub">
				Pendekatan multidisipliner menghubungkan riset perilaku pengguna, tata kelola sistem desain skala enterprise, hingga optimasi metrik pertumbuhan finansial.
			</p>
		</div>

		<!-- 3-Pillar Skill Cards Grid -->
		<div class="skills-cards-grid">
			{#each pillars as pillar}
				<div class="skill-card wow fadeInUp" class:featured={pillar.isFeatured}>
					<div class="card-top">
						<div class="badge-row">
							<span class="pillar-badge">{pillar.badge}</span>
							{#if pillar.isFeatured}
								<span class="spotlight-tag">
									<Sparkles size={13} />
									<span>Paling Dicari</span>
								</span>
							{/if}
						</div>

						<h4 class="pillar-title">{pillar.title}</h4>
						<span class="pillar-subtitle">{pillar.subtitle}</span>
						<p class="pillar-desc">{pillar.desc}</p>
					</div>

					<!-- Competency Breakdown with Professional Level Indicators -->
					<div class="skills-list">
						<span class="list-label">Kompetensi Utama:</span>
						{#each pillar.skills as s}
							<div class="skill-competency-item">
								<div class="skill-competency-left">
									<span class="competency-dot"></span>
									<span class="competency-name">{s.label}</span>
								</div>
								<div class="skill-competency-right">
									<span class="level-badge level-{s.level.toLowerCase()}">{s.level}</span>
									<div class="meter-bars" title="{s.level} Level" aria-label="{s.level} Level">
										{#each [1, 2, 3, 4] as step}
											<span class="bar-step" class:filled={step <= (s.tier ?? 4)}></span>
										{/each}
									</div>
								</div>
							</div>
						{/each}
					</div>

					<!-- Tools & Tech Pills -->
					<div class="card-footer">
						<span class="tools-label">Tools & Framework:</span>
						<div class="tools-wrap">
							{#each pillar.tools as tool}
								<span class="tool-pill">{tool}</span>
							{/each}
						</div>

						<button
							type="button"
							class="skill-action-btn"
							onclick={scrollToContact}
						>
							<span>Diskusikan Kebutuhan</span>
							<ArrowUpRight size={16} />
						</button>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.skills-section {
		padding: 85px 0;
		background: #f8fafc;
		border-top: 1px solid rgba(10, 22, 40, 0.06);
		border-bottom: 1px solid rgba(10, 22, 40, 0.06);
	}

	.skills-header-intro {
		display: grid;
		grid-template-columns: 1.25fr 1fr;
		gap: 40px;
		align-items: baseline;
		margin-top: 36px;
	}
	@media (max-width: 991px) {
		.skills-header-intro {
			grid-template-columns: 1fr;
			gap: 16px;
		}
	}

	.skills-headline {
		font-family: var(--ff-syne);
		font-size: clamp(24px, 3vw, 36px);
		font-weight: 700;
		color: var(--clr-navy);
		line-height: 1.25;
	}
	.skills-sub {
		color: var(--clr-gray);
		font-size: 16px;
		line-height: 1.6;
	}

	/* 3-Pillar Cards Grid */
	.skills-cards-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 24px;
		margin-top: 40px;
	}
	@media (max-width: 991px) {
		.skills-cards-grid {
			grid-template-columns: 1fr;
		}
	}

	.skill-card {
		background: var(--clr-white);
		border: 1px solid rgba(10, 22, 40, 0.1);
		border-radius: 20px;
		padding: 36px 30px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
		box-shadow: 0 4px 20px rgba(10, 22, 40, 0.03);
		position: relative;
	}
	.skill-card.featured {
		border-color: var(--clr-accent);
		box-shadow: 0 8px 28px rgba(37, 99, 235, 0.08);
	}

	.skill-card:hover {
		transform: translateY(-6px);
		background: var(--clr-navy);
		border-color: var(--clr-navy);
		box-shadow: 0 16px 36px rgba(10, 22, 40, 0.18);
	}

	.badge-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 16px;
		flex-wrap: wrap;
		gap: 8px;
	}

	.pillar-badge {
		font-family: var(--ff-syne);
		font-size: 11px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		background: #f1f5f9;
		color: var(--clr-navy);
		padding: 5px 12px;
		border-radius: 6px;
		transition: all 0.3s ease;
	}
	.skill-card:hover .pillar-badge {
		background: rgba(255, 255, 255, 0.15);
		color: var(--clr-white);
	}

	.spotlight-tag {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		font-family: var(--ff-syne);
		font-size: 11px;
		font-weight: 700;
		color: var(--clr-accent);
		background: rgba(37, 99, 235, 0.1);
		padding: 4px 10px;
		border-radius: 999px;
		transition: all 0.3s ease;
	}
	.skill-card:hover .spotlight-tag {
		background: rgba(255, 255, 255, 0.2);
		color: #93c5fd;
	}

	.pillar-title {
		font-family: var(--ff-syne);
		font-size: 22px;
		font-weight: 700;
		color: var(--clr-navy);
		margin-bottom: 6px;
		letter-spacing: -0.01em;
		line-height: 1.25;
		transition: color 0.3s ease;
	}
	.skill-card:hover .pillar-title {
		color: var(--clr-white);
	}

	.pillar-subtitle {
		font-size: 13px;
		font-weight: 700;
		color: var(--clr-accent);
		text-transform: uppercase;
		letter-spacing: 0.04em;
		display: block;
		margin-bottom: 14px;
		transition: color 0.3s ease;
	}
	.skill-card:hover .pillar-subtitle {
		color: #93c5fd;
	}

	.pillar-desc {
		font-size: 14px;
		color: var(--clr-gray);
		line-height: 1.55;
		margin-bottom: 24px;
		transition: color 0.3s ease;
	}
	.skill-card:hover .pillar-desc {
		color: #cbd5e1;
	}

	/* Skills list & progress bars */
	.skills-list {
		display: flex;
		flex-direction: column;
		gap: 14px;
		margin-bottom: 28px;
		padding: 18px 0;
		border-top: 1px solid rgba(10, 22, 40, 0.08);
		border-bottom: 1px solid rgba(10, 22, 40, 0.08);
		transition: border-color 0.3s ease;
	}
	.skill-card:hover .skills-list {
		border-color: rgba(255, 255, 255, 0.12);
	}

	.list-label {
		font-family: var(--ff-syne);
		font-size: 11.5px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--clr-navy);
		margin-bottom: 4px;
		transition: color 0.3s ease;
	}
	.skill-card:hover .list-label {
		color: #94a3b8;
	}

	.skill-competency-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 7px 0;
		border-bottom: 1px dashed rgba(10, 22, 40, 0.06);
		transition: border-color 0.3s ease;
		gap: 12px;
	}
	.skill-competency-item:last-child {
		border-bottom: none;
	}
	.skill-card:hover .skill-competency-item {
		border-bottom-color: rgba(255, 255, 255, 0.08);
	}

	.skill-competency-left {
		display: flex;
		align-items: center;
		gap: 8px;
		min-width: 0;
	}
	.competency-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--clr-accent);
		flex-shrink: 0;
		transition: background 0.3s ease;
	}
	.skill-card:hover .competency-dot {
		background: #60a5fa;
		box-shadow: 0 0 6px rgba(96, 165, 250, 0.7);
	}

	.competency-name {
		font-size: 13.5px;
		font-weight: 600;
		color: var(--clr-navy);
		line-height: 1.35;
		transition: color 0.3s ease;
	}
	.skill-card:hover .competency-name {
		color: var(--clr-white);
	}

	.skill-competency-right {
		display: flex;
		align-items: center;
		gap: 8px;
		flex-shrink: 0;
	}

	.level-badge {
		font-family: var(--ff-syne);
		font-size: 10.5px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		padding: 2.5px 7px;
		border-radius: 6px;
		transition: all 0.3s ease;
		white-space: nowrap;
	}
	.level-badge.level-master {
		background: #ede9fe;
		color: #5b21b6;
		border: 1px solid rgba(91, 33, 182, 0.15);
	}
	.level-badge.level-expert {
		background: #eff6ff;
		color: #1e40af;
		border: 1px solid rgba(30, 64, 175, 0.15);
	}
	.level-badge.level-advanced {
		background: #f0fdf4;
		color: #166534;
		border: 1px solid rgba(22, 101, 52, 0.15);
	}
	.level-badge.level-specialist {
		background: #fef3c7;
		color: #92400e;
		border: 1px solid rgba(146, 64, 14, 0.15);
	}

	.skill-card:hover .level-badge.level-master {
		background: rgba(167, 139, 250, 0.2);
		color: #ddd6fe;
		border-color: rgba(167, 139, 250, 0.35);
	}
	.skill-card:hover .level-badge.level-expert {
		background: rgba(96, 165, 250, 0.2);
		color: #bfdbfe;
		border-color: rgba(96, 165, 250, 0.35);
	}
	.skill-card:hover .level-badge.level-advanced {
		background: rgba(74, 222, 128, 0.2);
		color: #bbf7d0;
		border-color: rgba(74, 222, 128, 0.35);
	}
	.skill-card:hover .level-badge.level-specialist {
		background: rgba(251, 191, 36, 0.2);
		color: #fde68a;
		border-color: rgba(251, 191, 36, 0.35);
	}

	.meter-bars {
		display: flex;
		gap: 3px;
		align-items: center;
	}
	.bar-step {
		width: 4px;
		height: 12px;
		border-radius: 2px;
		background: #e2e8f0;
		transition: all 0.3s ease;
	}
	.bar-step.filled {
		background: var(--clr-accent);
	}
	.skill-card:hover .bar-step {
		background: rgba(255, 255, 255, 0.18);
	}
	.skill-card:hover .bar-step.filled {
		background: #60a5fa;
		box-shadow: 0 0 5px rgba(96, 165, 250, 0.5);
	}

	/* Card Footer: Tools & Button */
	.card-footer {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.tools-label {
		font-family: var(--ff-syne);
		font-size: 11.5px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--clr-gray);
		transition: color 0.3s ease;
	}
	.skill-card:hover .tools-label {
		color: #94a3b8;
	}

	.tools-wrap {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		margin-bottom: 8px;
	}
	.tool-pill {
		font-family: var(--ff-syne);
		font-size: 12px;
		font-weight: 700;
		background: #f1f5f9;
		color: var(--clr-navy);
		padding: 4px 10px;
		border-radius: 999px;
		border: 1px solid rgba(10, 22, 40, 0.06);
		transition: all 0.3s ease;
	}
	.skill-card:hover .tool-pill {
		background: rgba(255, 255, 255, 0.1);
		color: var(--clr-white);
		border-color: rgba(255, 255, 255, 0.15);
	}

	.skill-action-btn {
		width: 100%;
		padding: 13px 20px;
		border: 1px solid var(--clr-navy);
		background: transparent;
		color: var(--clr-navy);
		font-family: var(--ff-syne);
		font-size: 14.5px;
		font-weight: 700;
		border-radius: 999px;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 6px;
		transition: all 0.3s ease;
	}
	.skill-action-btn:hover {
		background: var(--clr-accent);
		border-color: var(--clr-accent);
		color: var(--clr-white);
	}
	.skill-card:hover .skill-action-btn {
		border-color: rgba(255, 255, 255, 0.25);
		color: var(--clr-white);
	}
	.skill-card:hover .skill-action-btn:hover {
		background: var(--clr-accent);
		border-color: var(--clr-accent);
	}
</style>
