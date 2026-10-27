<script lang="ts">
	import { portfolioStore } from '$lib/stores/portfolioStore.svelte';
	import { ArrowUpRight, TrendingUp, Briefcase, Calendar, Download, Sparkles, FolderKanban } from 'lucide-svelte';

	let activeFilter = $state<string>('Semua');

	const filterTabs = $derived([
		{ id: 'Semua', label: 'Semua Karya' },
		...portfolioStore.categories
			.filter((c) => c.isActive)
			.map((c) => ({
				id: c.name,
				label: c.name
			}))
	]);

	const allPublishedProjects = $derived(
		portfolioStore.projects.filter((p) => p.isPublished)
	);

	function getCount(category: string) {
		if (category === 'Semua') return allPublishedProjects.length;
		return allPublishedProjects.filter((p) => p.category === category).length;
	}

	const filteredProjects = $derived(
		allPublishedProjects.filter((p) => {
			if (activeFilter === 'Semua') return true;
			return p.category === activeFilter;
		})
	);

	function scrollToContact(e: MouseEvent) {
		e.preventDefault();
		const el = document.getElementById('contact');
		if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}
</script>

<section id="portfolio" class="projects-section">
	<div class="container">
		<!-- Section Title (Textio signature line & dot) -->
		<div class="section-title">
			<h3>Karya Terpilih</h3>
			<span></span>
		</div>

		<!-- Section Narrative Header -->
		<div class="projects-intro-row">
			<div class="intro-headline-col">
				<h2 class="projects-headline">
					Studi Kasus Desain Produk & Validasi Komersial Terukur
				</h2>
			</div>
			<div class="intro-lead-col">
				<p class="projects-lead">
					Kumpulan proyek unggulan yang menggabungkan keindahan sistem desain antarmuka, riset perilaku pengguna berbasis empati, serta strategi komersial dengan dampak metrik bisnis nyata.
				</p>
			</div>
		</div>

		<!-- Segmented Filter Control -->
		<div class="filter-bar-wrap">
			<div class="filter-pills-nav" role="tablist" aria-label="Filter Kategori Proyek">
				{#each filterTabs as tab}
					<button
						type="button"
						class="filter-tab-btn"
						class:active={activeFilter === tab.id}
						onclick={() => (activeFilter = tab.id)}
						role="tab"
						aria-selected={activeFilter === tab.id}
					>
						<span class="tab-label">{tab.label}</span>
						<span class="tab-badge">{getCount(tab.id)}</span>
					</button>
				{/each}
			</div>
		</div>

		<!-- Refined Showcase Grid -->
		{#if filteredProjects.length === 0}
			<div class="empty-showcase-box">
				<div class="empty-showcase-icon">
					<FolderKanban size={32} />
				</div>
				<h4 class="empty-showcase-title">Belum Ada Karya yang Ditampilkan</h4>
				<p class="empty-showcase-desc">
					Koleksi studi kasus desain produk dan strategi bisnis akan segera hadir di sini. Silakan kunjungi kembali dalam waktu dekat atau hubungi saya langsung untuk presentasi portofolio privat.
				</p>
			</div>
		{:else}
			<div class="portfolio-cards-grid" class:single-item={filteredProjects.length === 1}>
			{#each filteredProjects as project (project.id)}
				<article class="portfolio-card" class:is-horizontal={filteredProjects.length === 1}>
					<a href="/karya/{project.slug}" class="card-inner-link">
						<!-- Visual Media Container -->
						<div class="card-media-wrap">
							<img
								src={project.thumbnail}
								alt={project.title}
								class="card-img"
								loading="lazy"
								onerror={(e) => {
									(e.currentTarget as HTMLImageElement).src =
										'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80';
								}}
							/>
							<div class="media-overlay"></div>

							<!-- Badges on Image -->
							<div class="media-badges-row">
								<span class="cat-pill {project.category.toLowerCase()}">
									<span class="cat-dot"></span>
									<span>{project.category}</span>
								</span>

								{#if project.metrics && project.metrics.length > 0}
									<span class="metric-pill">
										<TrendingUp size={12} class="metric-icon" />
										<span>{project.metrics[0].value} {project.metrics[0].label}</span>
									</span>
								{/if}
							</div>

							<!-- Floating Hover Action Button -->
							<div class="media-hover-cta">
								<span>Lihat Studi Kasus</span>
								<ArrowUpRight size={15} />
							</div>
						</div>

						<!-- Card Body Content -->
						<div class="card-body">
							<!-- Meta Row: Role & Duration -->
							<div class="card-meta-row">
								<div class="card-role-wrap">
									<Briefcase size={14} class="meta-icon" />
									<span class="role-txt">{project.role}</span>
								</div>
								{#if project.duration}
									<div class="card-duration-wrap">
										<Calendar size={13} class="meta-icon" />
										<span class="duration-txt">{project.duration}</span>
									</div>
								{/if}
							</div>

							<!-- Title -->
							<h3 class="card-title">{project.title}</h3>

							<!-- Summary -->
							<p class="card-summary">{project.summary}</p>

							<!-- Key Metrics Strip -->
							{#if project.metrics && project.metrics.length > 0}
								<div class="card-stats-grid">
									{#each project.metrics.slice(0, 2) as metric}
										<div class="stat-box">
											<span class="stat-value">{metric.value}</span>
											<span class="stat-label">{metric.label}</span>
										</div>
									{/each}
								</div>
							{/if}

							<!-- Card Footer: Tools Chips & Arrow CTA -->
							<div class="card-footer-row">
								<div class="tools-chips-list">
									{#each project.tools.slice(0, 3) as tool}
										<span class="tool-tag">{tool}</span>
									{/each}
									{#if project.tools.length > 3}
										<span class="tool-tag-more">+{project.tools.length - 3}</span>
									{/if}
								</div>

								<div class="card-arrow-link">
									<span>Detail Proyek</span>
									<ArrowUpRight size={16} class="arrow-icon" />
								</div>
							</div>
						</div>
					</a>
				</article>
			{/each}
		</div>
		{/if}

		<!-- Bottom Executive Action Strip -->
		<div class="projects-bottom-banner">
			<div class="banner-inner">
				<div class="banner-text">
					<span class="banner-eyebrow">DOKUMENTASI DESAIN & VALIDASI BISNIS</span>
					<h4 class="banner-title">Mencari Studi Kasus Khusus atau Presentasi Portofolio Mendalam?</h4>
					<p class="banner-desc">
						Tersedia studi kasus NDA terproteksi, dokumentasi token design system di Figma Variables, serta analisis unit economics siap dipresentasikan.
					</p>
				</div>
				<div class="banner-actions">
					<a href="#contact" class="bttn bttn-primary" onclick={scrollToContact}>
						<span>Diskusikan Peluang Kolaborasi</span>
						<ArrowUpRight size={16} />
					</a>
					<a
						href={portfolioStore.profile.resumeUrl || '#contact'}
						class="bttn bttn-outline"
						target={portfolioStore.profile.resumeUrl ? '_blank' : undefined}
						rel="noopener"
					>
						<Download size={16} />
						<span>Unduh CV Eksekutif (PDF)</span>
					</a>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.projects-section {
		padding: 95px 0 105px 0;
		background: var(--bg-page);
		border-top: 1px solid var(--border-subtle);
		position: relative;
	}

	.projects-intro-row {
		display: grid;
		grid-template-columns: 1.25fr 1fr;
		gap: 40px;
		align-items: baseline;
		margin-top: 36px;
		margin-bottom: 40px;
	}
	@media (max-width: 991px) {
		.projects-intro-row {
			grid-template-columns: 1fr;
			gap: 16px;
			margin-bottom: 30px;
		}
	}

	.projects-headline {
		font-family: var(--ff-syne);
		font-size: clamp(24px, 3.2vw, 38px);
		font-weight: 700;
		color: var(--text-heading);
		line-height: 1.25;
		letter-spacing: -0.015em;
	}
	.projects-lead {
		color: var(--text-muted);
		font-size: 16px;
		line-height: 1.65;
	}

	/* Filter Navigation */
	.filter-bar-wrap {
		margin-bottom: 40px;
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}
	.filter-pills-nav {
		display: inline-flex;
		background: var(--bg-surface-elevated);
		padding: 6px;
		border-radius: 999px;
		gap: 6px;
		border: 1px solid var(--border-subtle);
		flex-wrap: wrap;
	}
	@media (max-width: 768px) {
		.filter-bar-wrap {
			overflow-x: auto;
			padding-bottom: 6px;
			-webkit-overflow-scrolling: touch;
			margin-left: -4px;
			margin-right: -4px;
			padding-left: 4px;
			padding-right: 4px;
			scrollbar-width: none;
		}
		.filter-bar-wrap::-webkit-scrollbar {
			display: none;
		}
		.filter-pills-nav {
			flex-wrap: nowrap;
			white-space: nowrap;
		}
		.filter-tab-btn {
			flex-shrink: 0;
		}
	}
	.filter-tab-btn {
		padding: 8px 18px;
		border-radius: 999px;
		font-family: var(--ff-syne);
		font-size: 13.5px;
		font-weight: 700;
		border: none;
		background: transparent;
		color: #475569;
		display: inline-flex;
		align-items: center;
		gap: 8px;
		cursor: pointer;
		transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
	}
	.filter-tab-btn:hover {
		color: var(--clr-navy);
	}
	.filter-tab-btn.active {
		background: var(--clr-navy);
		color: #ffffff;
		box-shadow: 0 4px 14px rgba(10, 22, 40, 0.16);
	}
	.tab-badge {
		font-size: 11px;
		padding: 2px 7px;
		border-radius: 999px;
		font-weight: 700;
		background: rgba(10, 22, 40, 0.08);
		color: #64748b;
		transition: all 0.2s ease;
	}
	.filter-tab-btn.active .tab-badge {
		background: rgba(255, 255, 255, 0.22);
		color: #ffffff;
	}

	/* Empty State */
	.empty-showcase-box {
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
	.empty-showcase-icon {
		width: 64px;
		height: 64px;
		border-radius: 16px;
		background: #ffffff;
		border: 1px solid rgba(10, 22, 40, 0.08);
		color: #2563eb;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 16px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
	}
	.empty-showcase-title {
		font-family: var(--ff-syne);
		font-size: 20px;
		font-weight: 700;
		color: #0a1628;
		margin: 0 0 8px;
	}
	.empty-showcase-desc {
		font-size: 14.5px;
		color: #64748b;
		max-width: 520px;
		margin: 0;
		line-height: 1.6;
	}

	/* Showcase Grid */
	.portfolio-cards-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 32px;
	}
	@media (max-width: 991px) {
		.portfolio-cards-grid {
			grid-template-columns: 1fr;
			gap: 24px;
		}
	}

	/* Single item full-width horizontal presentation */
	@media (min-width: 992px) {
		.portfolio-cards-grid.single-item {
			grid-template-columns: 1fr;
		}
		.portfolio-card.is-horizontal .card-inner-link {
			display: grid;
			grid-template-columns: 1.15fr 1fr;
		}
		.portfolio-card.is-horizontal .card-media-wrap {
			aspect-ratio: auto;
			height: 100%;
			min-height: 380px;
		}
	}

	/* Card Base */
	.portfolio-card {
		background: var(--bg-card);
		border: 1px solid var(--border-subtle);
		border-radius: 22px;
		overflow: hidden;
		transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
		animation: fadeInCard 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
		box-shadow: 0 4px 20px rgba(10, 22, 40, 0.03);
		display: flex;
		flex-direction: column;
	}
	@keyframes fadeInCard {
		from {
			opacity: 0;
			transform: translateY(18px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
	.portfolio-card:hover {
		transform: translateY(-8px);
		border-color: rgba(37, 99, 235, 0.3);
		box-shadow: 0 20px 45px rgba(10, 22, 40, 0.09);
	}

	.card-inner-link {
		display: flex;
		flex-direction: column;
		height: 100%;
		text-decoration: none;
		color: inherit;
	}

	/* Visual Media Container */
	.card-media-wrap {
		position: relative;
		width: 100%;
		aspect-ratio: 16 / 9.8;
		overflow: hidden;
		background: #0a1628;
	}
	.card-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
		display: block;
	}
	.portfolio-card:hover .card-img {
		transform: scale(1.05);
	}
	.media-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(180deg, rgba(10, 22, 40, 0.5) 0%, rgba(10, 22, 40, 0.05) 50%, rgba(10, 22, 40, 0.45) 100%);
		transition: opacity 0.3s ease;
		pointer-events: none;
	}

	.media-badges-row {
		position: absolute;
		top: 16px;
		left: 16px;
		right: 16px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		z-index: 2;
		gap: 8px;
		pointer-events: none;
	}

	.cat-pill {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 5px 12px;
		border-radius: 999px;
		font-size: 11px;
		font-weight: 700;
		font-family: var(--ff-syne);
		text-transform: uppercase;
		letter-spacing: 0.06em;
		backdrop-filter: blur(12px);
		background: rgba(255, 255, 255, 0.94);
		color: var(--clr-navy);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
	}
	.cat-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--clr-accent);
	}
	.cat-pill.desain .cat-dot {
		background: #2563eb;
	}
	.cat-pill.bisnis .cat-dot {
		background: #10b981;
	}
	.cat-pill.hybrid .cat-dot {
		background: #8b5cf6;
	}

	.metric-pill {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		padding: 5px 12px;
		border-radius: 999px;
		font-size: 11.5px;
		font-weight: 700;
		backdrop-filter: blur(12px);
		background: rgba(10, 22, 40, 0.88);
		color: #38bdf8;
		border: 1px solid rgba(255, 255, 255, 0.16);
		box-shadow: 0 4px 14px rgba(0, 0, 0, 0.18);
	}
	:global(.metric-icon) {
		color: #38bdf8;
	}

	.media-hover-cta {
		position: absolute;
		bottom: 16px;
		right: 16px;
		z-index: 2;
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 8px 16px;
		border-radius: 999px;
		background: #ffffff;
		color: var(--clr-navy);
		font-size: 12.5px;
		font-weight: 700;
		font-family: var(--ff-syne);
		box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
		transform: translateY(10px);
		opacity: 0;
		transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
		pointer-events: none;
	}
	.portfolio-card:hover .media-hover-cta {
		transform: translateY(0);
		opacity: 1;
	}

	/* Card Body */
	.card-body {
		padding: 24px 26px 26px 26px;
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		background: var(--bg-card);
	}

	.card-meta-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		font-size: 12px;
		color: var(--text-muted);
		font-weight: 600;
		margin-bottom: 12px;
	}
	.card-role-wrap,
	.card-duration-wrap {
		display: inline-flex;
		align-items: center;
		gap: 6px;
	}
	:global(.meta-icon) {
		color: var(--clr-accent);
		opacity: 0.85;
	}

	.card-title {
		font-family: var(--ff-syne);
		font-size: 21px;
		font-weight: 700;
		color: var(--text-heading);
		line-height: 1.35;
		margin-bottom: 10px;
		letter-spacing: -0.01em;
		transition: color 0.25s ease;
	}
	.portfolio-card:hover .card-title {
		color: var(--clr-accent);
	}

	.card-summary {
		font-size: 14.5px;
		color: var(--text-secondary);
		line-height: 1.6;
		margin-bottom: 18px;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	/* Stats Strip */
	.card-stats-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 10px;
		margin-bottom: 20px;
		padding: 12px 14px;
		background: var(--bg-surface-elevated);
		border-radius: 12px;
		border: 1px solid var(--border-subtle);
	}
	.stat-box {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}
	.stat-value {
		font-family: var(--ff-syne);
		font-size: 16px;
		font-weight: 800;
		color: var(--clr-accent);
	}
	.stat-label {
		font-size: 11px;
		color: var(--text-muted);
		font-weight: 600;
	}

	/* Card Footer */
	.card-footer-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		margin-top: auto;
		padding-top: 16px;
		border-top: 1px solid var(--border-subtle);
	}
	.tools-chips-list {
		display: flex;
		align-items: center;
		gap: 6px;
		flex-wrap: wrap;
	}
	.tool-tag {
		font-size: 11px;
		font-weight: 600;
		padding: 4px 9px;
		border-radius: 6px;
		background: var(--bg-surface-elevated);
		color: var(--text-secondary);
		border: 1px solid var(--border-subtle);
	}
	.tool-tag-more {
		font-size: 11px;
		font-weight: 700;
		padding: 4px 6px;
		color: var(--text-muted);
	}

	.card-arrow-link {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		font-size: 13px;
		font-weight: 700;
		font-family: var(--ff-syne);
		color: var(--text-heading);
		transition: all 0.25s ease;
		flex-shrink: 0;
	}
	.portfolio-card:hover .card-arrow-link {
		color: var(--clr-accent);
	}
	:global(.card-arrow-link .arrow-icon) {
		transition: transform 0.25s ease;
	}
	.portfolio-card:hover .card-arrow-link :global(.arrow-icon) {
		transform: translate(3px, -3px);
	}

	/* Bottom Executive Action Banner */
	.projects-bottom-banner {
		margin-top: 55px;
		background: var(--bg-surface);
		border: 1px solid var(--border-subtle);
		border-radius: 20px;
		padding: 36px 40px;
		box-shadow: 0 10px 30px rgba(10, 22, 40, 0.02);
	}
	@media (max-width: 768px) {
		.projects-bottom-banner {
			padding: 24px;
		}
	}
	.banner-inner {
		display: grid;
		grid-template-columns: 1.35fr 1fr;
		gap: 36px;
		align-items: center;
	}
	@media (max-width: 991px) {
		.banner-inner {
			grid-template-columns: 1fr;
			gap: 20px;
		}
	}
	.banner-eyebrow {
		font-family: var(--ff-syne);
		font-size: 11px;
		font-weight: 800;
		letter-spacing: 0.1em;
		color: var(--clr-accent);
		text-transform: uppercase;
		margin-bottom: 8px;
		display: block;
	}
	.banner-title {
		font-family: var(--ff-syne);
		font-size: 22px;
		font-weight: 700;
		color: var(--text-heading);
		line-height: 1.35;
		margin-bottom: 8px;
		letter-spacing: -0.01em;
	}
	.banner-desc {
		font-size: 14.5px;
		color: var(--text-muted);
		line-height: 1.6;
	}
	.banner-actions {
		display: flex;
		flex-direction: column;
		gap: 12px;
		justify-content: center;
	}
	@media (min-width: 768px) and (max-width: 991px) {
		.banner-actions {
			flex-direction: row;
		}
	}

	/* Dark mode styling */
	:global(html.dark) .projects-section {
		background: var(--bg-page);
		border-color: var(--border-subtle);
	}
	:global(html.dark) .projects-headline {
		color: var(--text-heading);
	}
	:global(html.dark) .projects-lead {
		color: var(--text-muted);
	}
	:global(html.dark) .filter-pills-nav {
		background: var(--bg-surface-elevated);
		border-color: var(--border-subtle);
	}
	:global(html.dark) .filter-tab-btn {
		color: #94a3b8;
	}
	:global(html.dark) .filter-tab-btn:hover {
		color: #f8fafc;
	}
	:global(html.dark) .filter-tab-btn.active {
		background: var(--btn-primary-bg);
		color: #ffffff;
		box-shadow: 0 4px 16px rgba(59, 130, 246, 0.35);
	}
	:global(html.dark) .tab-badge {
		background: rgba(255, 255, 255, 0.1);
		color: #cbd5e1;
	}
	:global(html.dark) .portfolio-card {
		background: var(--bg-surface);
		border-color: var(--border-subtle);
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
	}
	:global(html.dark) .portfolio-card:hover {
		border-color: rgba(59, 130, 246, 0.45);
		box-shadow: 0 20px 45px rgba(0, 0, 0, 0.6);
	}
	:global(html.dark) .card-body {
		background: var(--bg-surface);
	}
	:global(html.dark) .card-title {
		color: var(--text-heading);
	}
	:global(html.dark) .card-summary {
		color: var(--text-secondary);
	}
	:global(html.dark) .card-meta-row {
		color: var(--text-muted);
	}
	:global(html.dark) .card-stats-grid {
		background: var(--bg-surface-elevated);
		border-color: var(--border-subtle);
	}
	:global(html.dark) .stat-label {
		color: var(--text-muted);
	}
	:global(html.dark) .card-footer-row {
		border-top-color: var(--border-subtle);
	}
	:global(html.dark) .tool-tag {
		background: var(--bg-surface-elevated);
		color: #cbd5e1;
		border-color: var(--border-subtle);
	}
	:global(html.dark) .tool-tag-more {
		color: var(--text-muted);
	}
	:global(html.dark) .card-arrow-link {
		color: var(--text-heading);
	}
	:global(html.dark) .cat-pill {
		background: rgba(11, 20, 38, 0.92);
		color: #f8fafc;
		border: 1px solid rgba(255, 255, 255, 0.1);
	}
	:global(html.dark) .media-hover-cta {
		background: #0f1c34;
		color: #f8fafc;
		border: 1px solid rgba(255, 255, 255, 0.15);
	}
	:global(html.dark) .projects-bottom-banner {
		background: var(--bg-surface);
		border-color: var(--border-subtle);
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
	}
	:global(html.dark) .banner-title {
		color: var(--text-heading);
	}
	:global(html.dark) .banner-desc {
		color: var(--text-muted);
	}
	:global(html.dark) .empty-showcase-box {
		background: var(--bg-surface);
		border-color: var(--border-medium);
	}
	:global(html.dark) .empty-showcase-title {
		color: var(--text-heading);
	}
	:global(html.dark) .empty-showcase-desc {
		color: var(--text-muted);
	}
	:global(html.dark) .empty-showcase-icon {
		background: var(--bg-surface-elevated);
		border-color: var(--border-medium);
	}
</style>
