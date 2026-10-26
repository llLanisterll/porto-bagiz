<script lang="ts">
	import { ArrowUpRight, Check, Plus, Minus, Briefcase, Calendar, MapPin, Building2, Download } from 'lucide-svelte';
	import { portfolioStore } from '$lib/stores/portfolioStore.svelte';
	import type { ExperienceItem } from '$lib/types/portfolio';

	let experiences = $derived(portfolioStore.experiences);

	let activeIndex = $state(0);

	function toggleItem(index: number) {
		if (activeIndex === index) {
			activeIndex = -1;
		} else {
			activeIndex = index;
		}
	}

	function scrollToSection(e: MouseEvent, targetId: string) {
		e.preventDefault();
		const el = document.getElementById(targetId);
		if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}
</script>

<section id="pengalaman" class="experience-section">
	<div class="container">
		<!-- Textio Section Title with horizontal line & dot -->
		<div class="section-title">
			<h3>Pengalaman</h3>
			<span></span>
		</div>

		<!-- Section Headline & Narrative Intro -->
		<div class="exp-intro-row">
			<h4 class="exp-headline">
				Rekam Jejak Karir & Kepemimpinan Desain Produk Terukur
			</h4>
			<p class="exp-lead">
				Pengalaman lebih dari {portfolioStore.profile.stats?.[0]?.value || '4+'} tahun memimpin perancangan produk digital bernilai jutaan pengguna, mengorkestrasi sistem desain skala enterprise, serta merumuskan strategi monetisasi dan pertumbuhan komersial berkelanjutan.
			</p>
		</div>

		<!-- Interactive Experience Accordion Wrapper -->
		{#if experiences.length === 0}
			<div class="empty-experience-wrap">
				<div class="empty-exp-icon">
					<Briefcase size={32} />
				</div>
				<h4 class="empty-exp-title">Belum Ada Riwayat Pengalaman</h4>
				<p class="empty-exp-desc">
					Rekam jejak pengalaman karir dan kepemimpinan produk akan ditampilkan di sini setelah ditambahkan melalui dashboard admin.
				</p>
			</div>
		{:else}
			<div class="exp-item-wrapper">
			{#each experiences as item, idx (item.id)}
				<div
					class="exp-item"
					class:is-active={activeIndex === idx}
				>
					<!-- Header Row: Timeline, Role, Company, and Toggle Button -->
					<div
						class="exp-header-row"
						onclick={() => toggleItem(idx)}
						onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleItem(idx); } }}
						tabindex="0"
						role="button"
						aria-expanded={activeIndex === idx}
					>
						<div class="exp-timeline-col">
							<span class="exp-period-txt">{item.period}</span>
							{#if item.isCurrent}
								<span class="exp-status-pill current">Aktif</span>
							{:else}
								<span class="exp-status-pill">{item.yearBadge}</span>
							{/if}
						</div>

						<div class="exp-main-col">
							<div class="exp-role-wrap">
								<h4 class="exp-role-title">{item.role}</h4>
								<div class="exp-company-line">
									<span class="exp-company-name">{item.company}</span>
									<span class="exp-sep">•</span>
									<span class="exp-badge-pill">{item.badge}</span>
								</div>
							</div>
						</div>

						<div class="exp-toggle-col">
							<div class="exp-toggle-btn" class:rotated={activeIndex === idx}>
								{#if activeIndex === idx}
									<Minus size={22} />
								{:else}
									<Plus size={22} />
								{/if}
							</div>
						</div>
					</div>

					<!-- Expanded Panel Content -->
					{#if activeIndex === idx}
						<!-- svelte-ignore a11y_click_events_have_key_events -->
						<!-- svelte-ignore a11y_no_static_element_interactions -->
						<div class="exp-panel-content" onclick={(e) => e.stopPropagation()}>
							<!-- Meta Details Strip -->
							<div class="exp-meta-strip">
								<div class="meta-item">
									<Building2 size={15} class="meta-icon" />
									<span>{item.company}</span>
								</div>
								<div class="meta-item">
									<MapPin size={15} class="meta-icon" />
									<span>{item.location}</span>
								</div>
								<div class="meta-item">
									<Briefcase size={15} class="meta-icon" />
									<span>{item.employmentType}</span>
								</div>
								<div class="meta-item">
									<Calendar size={15} class="meta-icon" />
									<span>{item.period}</span>
								</div>
							</div>

							<!-- Role Summary Narrative -->
							<p class="exp-desc">{item.summary}</p>

							<!-- Key Achievements & Metric Impacts -->
							<div class="exp-achievements-block">
								<span class="achievements-label">Pencapaian Kunci & Dampak Metrik:</span>
								<ul class="achievements-list">
									{#each item.achievements as ach}
										<li>
											<div class="check-box">
												<Check size={14} />
											</div>
											<span>{ach}</span>
										</li>
									{/each}
								</ul>
							</div>

							<!-- Tools & Competencies Chips + Case Study CTA -->
							<div class="exp-footer-row">
								<div class="exp-tools-group">
									<span class="tools-lead">Keahlian & Tools:</span>
									<div class="tools-chips-wrap">
										{#each item.tools as tool}
											<span class="tool-tag">{tool}</span>
										{/each}
									</div>
								</div>

								<div class="exp-action-group">
									{#if item.projectSlug}
										<a
											class="bttn-case-study"
											href="/karya/{item.projectSlug}"
											onclick={(e) => e.stopPropagation()}
										>
											<span>Lihat Studi Kasus</span>
											<ArrowUpRight size={15} />
										</a>
									{:else}
										<a
											class="bttn-case-study outline"
											href="#portfolio"
											onclick={(e) => { e.stopPropagation(); scrollToSection(e, 'portfolio'); }}
										>
											<span>Jelajahi Karya</span>
											<ArrowUpRight size={15} />
										</a>
									{/if}
								</div>
							</div>
						</div>
					{/if}
				</div>
			{/each}
		</div>
		{/if}

		<!-- Bottom Track Record Highlights & CV Download CTA -->
		<div class="exp-bottom-cta">
			<div class="exp-cta-card">
				<div class="cta-left-text">
					<h4 class="cta-card-title">Ingin Mengetahui Pengalaman Selengkapnya?</h4>
					<p class="cta-card-desc">
						Unduh resume eksekutif resmi (PDF) yang mencakup metrik ROI produk, metodologi riset, dan surat rekomendasi.
					</p>
				</div>
				<div class="cta-actions">
					<a
						class="bttn bttn-primary"
						href={portfolioStore.profile.resumeUrl || '#contact'}
						target={portfolioStore.profile.resumeUrl ? '_blank' : undefined}
						rel="noopener"
					>
						<Download size={18} />
						<span>Unduh CV Eksekutif (PDF)</span>
					</a>
					<a
						class="bttn bttn-outline"
						href="#contact"
						onclick={(e) => scrollToSection(e, 'contact')}
					>
						<span>Diskusikan Peluang</span>
						<ArrowUpRight size={18} />
					</a>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.experience-section {
		padding: 95px 0 100px 0;
		background: var(--clr-white);
		position: relative;
	}

	.exp-intro-row {
		display: grid;
		grid-template-columns: 1.25fr 1fr;
		gap: 40px;
		align-items: baseline;
		margin-top: 36px;
		margin-bottom: 50px;
	}
	@media (max-width: 991px) {
		.exp-intro-row {
			grid-template-columns: 1fr;
			gap: 16px;
			margin-bottom: 36px;
		}
	}
	.exp-headline {
		font-family: var(--ff-syne);
		font-size: clamp(24px, 3.2vw, 38px);
		font-weight: 700;
		color: var(--clr-navy);
		line-height: 1.25;
		letter-spacing: -0.015em;
	}
	.exp-lead {
		color: var(--clr-gray);
		font-size: 16px;
		line-height: 1.65;
	}

	/* Accordion wrapper */
	.exp-item-wrapper {
		margin-top: 36px;
		border-top: 1px solid rgba(10, 22, 40, 0.12);
	}

	.exp-item {
		border-bottom: 1px solid rgba(10, 22, 40, 0.12);
		padding: 26px 20px;
		border-radius: 14px;
		transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
		margin-bottom: 4px;
	}
	.exp-item:hover {
		background: rgba(10, 22, 40, 0.02);
	}
	.exp-item.is-active {
		background: #f8fafc;
		border-color: rgba(37, 99, 235, 0.25);
		box-shadow: 0 10px 30px rgba(10, 22, 40, 0.04);
	}

	/* Empty State */
	.empty-experience-wrap {
		padding: 72px 24px;
		background: #f8fafc;
		border: 1px dashed rgba(10, 22, 40, 0.15);
		border-radius: 20px;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 50px;
	}
	.empty-exp-icon {
		width: 64px;
		height: 64px;
		border-radius: 16px;
		background: #ffffff;
		border: 1px solid rgba(10, 22, 40, 0.08);
		color: #10b981;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 16px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
	}
	.empty-exp-title {
		font-family: var(--ff-syne);
		font-size: 20px;
		font-weight: 700;
		color: #0a1628;
		margin: 0 0 8px;
	}
	.empty-exp-desc {
		font-size: 14.5px;
		color: #64748b;
		max-width: 520px;
		margin: 0;
		line-height: 1.6;
	}

	.exp-header-row {
		display: grid;
		grid-template-columns: 220px 1fr auto;
		align-items: center;
		gap: 24px;
		cursor: pointer;
		user-select: none;
	}
	@media (max-width: 991px) {
		.exp-header-row {
			grid-template-columns: 1fr auto;
			gap: 16px;
		}
		.exp-timeline-col {
			grid-column: 1 / -1;
		}
	}

	/* Timeline column */
	.exp-timeline-col {
		display: flex;
		align-items: center;
		gap: 10px;
	}
	.exp-period-txt {
		font-family: var(--ff-syne);
		font-size: 16px;
		font-weight: 700;
		color: var(--clr-navy);
		letter-spacing: -0.01em;
	}
	.exp-status-pill {
		font-family: var(--ff-syne);
		font-size: 11px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		padding: 3px 9px;
		border-radius: 6px;
		background: #f1f5f9;
		color: #475569;
	}
	.exp-status-pill.current {
		background: #eff6ff;
		color: var(--clr-accent);
		border: 1px solid rgba(37, 99, 235, 0.2);
	}

	/* Role & Company column */
	.exp-role-wrap {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}
	.exp-role-title {
		font-family: var(--ff-syne);
		font-size: clamp(20px, 2.3vw, 28px);
		font-weight: 700;
		color: var(--clr-navy);
		letter-spacing: -0.015em;
		line-height: 1.25;
		transition: color 0.3s ease, transform 0.3s ease;
	}
	.exp-item:hover .exp-role-title,
	.exp-item.is-active .exp-role-title {
		color: var(--clr-accent);
	}

	.exp-company-line {
		display: flex;
		align-items: center;
		gap: 10px;
		flex-wrap: wrap;
	}
	.exp-company-name {
		font-size: 15px;
		font-weight: 600;
		color: #475569;
	}
	.exp-sep {
		color: #cbd5e1;
		font-size: 14px;
	}
	.exp-badge-pill {
		font-family: var(--ff-syne);
		font-size: 11px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		padding: 2px 8px;
		border-radius: 6px;
		background: rgba(10, 22, 40, 0.06);
		color: var(--clr-navy);
	}

	/* Toggle button */
	.exp-toggle-btn {
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
	.exp-item:hover .exp-toggle-btn,
	.exp-item.is-active .exp-toggle-btn {
		background: var(--clr-navy);
		color: #ffffff;
		border-color: var(--clr-navy);
	}

	/* Expanded Panel */
	.exp-panel-content {
		margin-top: 24px;
		padding-top: 24px;
		border-top: 1px dashed rgba(10, 22, 40, 0.12);
		animation: fadeIn 0.35s ease;
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.exp-meta-strip {
		display: flex;
		align-items: center;
		gap: 20px;
		flex-wrap: wrap;
		padding: 10px 16px;
		background: #ffffff;
		border: 1px solid rgba(10, 22, 40, 0.08);
		border-radius: 10px;
	}
	.meta-item {
		display: flex;
		align-items: center;
		gap: 6px;
		font-size: 13.5px;
		color: #475569;
		font-weight: 500;
	}
	:global(.meta-icon) {
		color: var(--clr-accent);
		flex-shrink: 0;
	}

	.exp-desc {
		font-size: 16px;
		line-height: 1.65;
		color: #334155;
		margin: 0;
		max-width: 980px;
	}

	/* Achievements List */
	.exp-achievements-block {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
	.achievements-label {
		font-family: var(--ff-syne);
		font-size: 12px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--clr-navy);
	}
	.achievements-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 12px 24px;
	}
	@media (max-width: 860px) {
		.achievements-list {
			grid-template-columns: 1fr;
		}
	}
	.achievements-list li {
		display: flex;
		align-items: flex-start;
		gap: 10px;
		font-size: 14.5px;
		line-height: 1.55;
		color: var(--clr-navy);
		font-weight: 500;
	}
	.check-box {
		width: 22px;
		height: 22px;
		border-radius: 6px;
		background: rgba(37, 99, 235, 0.1);
		color: var(--clr-accent);
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		margin-top: 2px;
	}

	/* Footer Row */
	.exp-footer-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 14px;
		border-top: 1px solid rgba(10, 22, 40, 0.06);
		gap: 20px;
		flex-wrap: wrap;
	}
	.exp-tools-group {
		display: flex;
		align-items: center;
		gap: 12px;
		flex-wrap: wrap;
	}
	.tools-lead {
		font-size: 13px;
		font-weight: 700;
		color: #64748b;
	}
	.tools-chips-wrap {
		display: flex;
		align-items: center;
		gap: 6px;
		flex-wrap: wrap;
	}
	.tool-tag {
		font-family: var(--ff-syne);
		font-size: 11.5px;
		font-weight: 600;
		background: #ffffff;
		border: 1px solid rgba(10, 22, 40, 0.1);
		color: #334155;
		padding: 3px 10px;
		border-radius: 6px;
	}

	.bttn-case-study {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		font-family: var(--ff-syne);
		font-size: 13.5px;
		font-weight: 700;
		background: var(--clr-navy);
		color: var(--clr-white);
		padding: 9px 18px;
		border-radius: 999px;
		transition: all 0.3s ease;
		text-decoration: none;
	}
	.bttn-case-study:hover {
		background: var(--clr-accent);
		transform: translateY(-2px);
		box-shadow: 0 4px 14px rgba(37, 99, 235, 0.25);
	}
	.bttn-case-study.outline {
		background: transparent;
		color: var(--clr-navy);
		border: 1px solid rgba(10, 22, 40, 0.2);
	}
	.bttn-case-study.outline:hover {
		background: var(--clr-navy);
		color: var(--clr-white);
		border-color: var(--clr-navy);
	}

	/* Bottom CTA Card */
	.exp-bottom-cta {
		margin-top: 60px;
	}
	.exp-cta-card {
		background: #f8fafc;
		border: 1px solid rgba(10, 22, 40, 0.08);
		border-radius: 20px;
		padding: 40px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 30px;
		flex-wrap: wrap;
	}
	.cta-left-text {
		max-width: 580px;
	}
	.cta-card-title {
		font-family: var(--ff-syne);
		font-size: clamp(20px, 2.2vw, 26px);
		font-weight: 700;
		color: var(--clr-navy);
		margin-bottom: 8px;
	}
	.cta-card-desc {
		font-size: 15px;
		color: #475569;
		line-height: 1.6;
		margin: 0;
	}
	.cta-actions {
		display: flex;
		align-items: center;
		gap: 14px;
		flex-wrap: wrap;
	}

	.bttn-outline {
		background: transparent;
		color: var(--clr-navy);
		border: 1px solid rgba(10, 22, 40, 0.2);
	}
	.bttn-outline:hover {
		background: var(--clr-navy);
		color: var(--clr-white);
		border-color: var(--clr-navy);
	}
</style>
