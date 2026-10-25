<script lang="ts">
	import { portfolioStore } from '$lib/stores/portfolioStore.svelte';
	import {
		Search,
		ArrowRight,
		ArrowUpRight,
		Sparkles,
		Flame,
		Layers,
		TrendingUp,
		Filter,
		SlidersHorizontal,
		ExternalLink
	} from '@lucide/svelte';

	const projects = $derived(portfolioStore.projects.filter(p => p.isPublished));

	// Categories
	const categories = ['Semua', 'Desain', 'Bisnis', 'Hybrid'];

	let activeFilter = $state('Semua');
	let searchQuery = $state('');
	let sortBy: 'order' | 'newest' | 'featured' = $state('featured');

	// Featured spotlight projects
	const featuredSpotlights = $derived(
		projects.filter(p => p.isFeatured && p.isPublished)
	);

	// Filtered and sorted projects
	const filtered = $derived(
		projects
			.filter(p => {
				const matchCat = activeFilter === 'Semua' || p.category === activeFilter;
				const q = searchQuery.toLowerCase().trim();
				const matchSearch =
					!q ||
					p.title.toLowerCase().includes(q) ||
					(p.subtitle && p.subtitle.toLowerCase().includes(q)) ||
					p.category.toLowerCase().includes(q) ||
					p.summary.toLowerCase().includes(q) ||
					(p.tools && p.tools.some(t => t.toLowerCase().includes(q)));
				return matchCat && matchSearch;
			})
			.sort((a, b) => {
				if (sortBy === 'featured') {
					if (a.isFeatured !== b.isFeatured) return a.isFeatured ? -1 : 1;
					return a.displayOrder - b.displayOrder;
				}
				if (sortBy === 'newest') {
					return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
				}
				return a.displayOrder - b.displayOrder;
			})
	);
</script>

<section class="portfolio-section" id="karya">
	<!-- Featured Case Studies Spotlight Header -->
	<div class="portfolio-header">
		<div class="wow fadeInLeft">
			<span class="section-tag">Curated Case Studies</span>
			<h2 class="section-title-lg title-with-bar">Galeri Karya & Dampak</h2>
			<p class="section-lead" style="max-width: 600px; margin-top: 12px">
				Eksplorasi proyek-proyek hibrida yang memadukan riset bisnis mendalam, arsitektur desain sistem, dan metrik pertumbuhan terukur.
			</p>
		</div>

		<!-- Filter Tabs -->
		<div class="filter-tabs wow fadeInRight">
			{#each categories as cat}
				<button
					class="filter-btn"
					class:active={activeFilter === cat}
					onclick={() => activeFilter = cat}
				>
					{cat}
					<span class="filter-count">
						{cat === 'Semua' ? projects.length : projects.filter(p => p.category === cat).length}
					</span>
				</button>
			{/each}
		</div>
	</div>

	<!-- Search & Sort Controls Toolbar -->
	<div class="gallery-toolbar wow fadeInUp">
		<div class="search-box">
			<Search size={16} class="search-icon" />
			<input
				type="search"
				class="gallery-search-input"
				placeholder="Cari berdasarkan judul, kategori, tools (Figma, Financial Modeling)..."
				bind:value={searchQuery}
			/>
			{#if searchQuery}
				<button class="clear-search-btn" onclick={() => searchQuery = ''}>×</button>
			{/if}
		</div>

		<div class="sort-box">
			<SlidersHorizontal size={14} class="text-accent" />
			<span class="sort-label">Urutan:</span>
			<select class="sort-select" bind:value={sortBy}>
				<option value="featured">Unggulan Pertama</option>
				<option value="newest">Terbaru Rilis</option>
				<option value="order">Prioritas Portofolio</option>
			</select>
		</div>
	</div>

	<!-- Results Count -->
	<div class="results-meta wow fadeInUp">
		<span>Menampilkan <strong>{filtered.length}</strong> karya</span>
		{#if searchQuery}
			<span class="active-query-tag">Kueri: "{searchQuery}"</span>
		{/if}
	</div>

	<!-- Grid of Projects -->
	{#if filtered.length === 0}
		<div class="empty-state wow fadeInUp">
			<div class="empty-icon-wrap">
				<Search size={28} />
			</div>
			<h3 class="empty-title">Tidak Ada Proyek yang Cocok</h3>
			<p class="empty-desc">
				Tidak ditemukan karya dengan kata kunci "{searchQuery}" pada kategori {activeFilter}. Coba reset pencarian atau pilih kategori lain.
			</p>
			<button class="btn-primary" onclick={() => { searchQuery = ''; activeFilter = 'Semua'; }} style="margin-top:16px">
				Reset Filter
			</button>
		</div>
	{:else}
		<div class="portfolio-grid">
			{#each filtered as project, i (project.id)}
				<article class="portfolio-card wow fadeInUp" style="transition-delay:{(i % 3) * 0.08}s">
					<!-- Thumbnail Container -->
					<div class="card-media-wrap">
						<img
							src={project.thumbnail}
							alt={project.title}
							class="card-img"
							loading="lazy"
						/>
						<div class="card-media-overlay"></div>

						<!-- Badges top left & right -->
						<div class="card-badges-top">
							<span class="category-badge {project.category.toLowerCase()}">
								{#if project.category === 'Desain'}
									<Layers size={12} />
								{:else if project.category === 'Bisnis'}
									<TrendingUp size={12} />
								{:else}
									<Sparkles size={12} />
								{/if}
								{project.category}
							</span>

							<div class="status-badges">
								{#if project.isNew}
									<span class="status-pill new">
										<Flame size={11} /> BARU
									</span>
								{/if}
								{#if project.isFeatured}
									<span class="status-pill featured">
										<Sparkles size={11} /> UNGGULAN
									</span>
								{/if}
							</div>
						</div>

						<!-- Meta role & duration on image bottom -->
						<div class="card-media-footer">
							<span class="meta-role">{project.role}</span>
							<span class="meta-duration">{project.duration}</span>
						</div>
					</div>

					<!-- Card Content -->
					<div class="card-body">
						<h3 class="card-title">
							<a href="/karya/{project.slug}">{project.title}</a>
						</h3>
						<p class="card-subtitle">{project.subtitle}</p>
						<p class="card-summary">{project.summary}</p>

						<!-- Key Metric Impact Highlight -->
						{#if project.metrics && project.metrics.length > 0}
							<div class="metrics-row">
								{#each project.metrics.slice(0, 2) as metric}
									<div class="metric-chip">
										<span class="metric-val">{metric.value}</span>
										<span class="metric-lbl">{metric.label}</span>
									</div>
								{/each}
							</div>
						{/if}

						<!-- Tools Chips -->
						<div class="tools-row">
							{#each project.tools.slice(0, 4) as tool}
								<span class="tool-tag">{tool}</span>
							{/each}
							{#if project.tools.length > 4}
								<span class="tool-tag more">+{project.tools.length - 4}</span>
							{/if}
						</div>

						<!-- Card Actions -->
						<div class="card-footer">
							<div class="ext-links">
								{#if project.links.figma}
									<a href={project.links.figma} target="_blank" rel="noreferrer" class="ext-link" title="Figma Prototype">
										Figma <ExternalLink size={11} />
									</a>
								{/if}
								{#if project.links.liveDemo}
									<a href={project.links.liveDemo} target="_blank" rel="noreferrer" class="ext-link" title="Live Demo">
										Demo <ExternalLink size={11} />
									</a>
								{/if}
								{#if project.links.pitchDeck}
									<a href={project.links.pitchDeck} target="_blank" rel="noreferrer" class="ext-link" title="Pitch Deck">
										Deck <ExternalLink size={11} />
									</a>
								{/if}
							</div>

							<a href="/karya/{project.slug}" class="case-study-cta">
								<span>Studi Kasus</span>
								<ArrowRight size={14} />
							</a>
						</div>
					</div>
				</article>
			{/each}
		</div>
	{/if}
</section>

<style>
	.portfolio-section {
		background: var(--bg-alt);
		padding: 100px 0 120px;
		position: relative;
	}
	.portfolio-header {
		max-width: 1240px;
		margin: 0 auto 36px;
		padding: 0 24px;
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		gap: 24px;
		flex-wrap: wrap;
	}
	.filter-tabs {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}
	.filter-btn {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		font-size: 13.5px;
		font-weight: 600;
		padding: 8px 18px;
		border-radius: 10px;
		border: 1px solid rgba(15, 30, 56, 0.1);
		background: #ffffff;
		color: #475569;
		cursor: pointer;
		transition: all 0.25s;
	}
	.filter-btn:hover {
		color: #0a1628;
		border-color: rgba(15, 30, 56, 0.25);
	}
	.filter-btn.active {
		background: var(--accent);
		border-color: var(--accent);
		color: #ffffff;
		font-weight: 700;
	}
	.filter-count {
		font-size: 11px;
		opacity: 0.9;
		background: rgba(15, 30, 56, 0.08);
		padding: 1px 6px;
		border-radius: 999px;
	}
	.filter-btn.active .filter-count {
		background: rgba(255, 255, 255, 0.2);
		color: #ffffff;
	}

	/* Toolbar */
	.gallery-toolbar {
		max-width: 1240px;
		margin: 0 auto 20px;
		padding: 0 24px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 16px;
		flex-wrap: wrap;
	}
	.search-box {
		position: relative;
		flex: 1;
		min-width: 280px;
	}
	.gallery-search-input {
		width: 100%;
		background: #ffffff;
		border: 1px solid rgba(15, 30, 56, 0.12);
		border-radius: 12px;
		padding: 12px 38px 12px 42px;
		font-size: 14px;
		color: #0a1628;
		outline: none;
		transition: border-color 0.25s, box-shadow 0.25s;
	}
	.gallery-search-input:focus {
		border-color: var(--accent);
		box-shadow: 0 0 0 3px rgba(15, 30, 56, 0.08);
	}
	.search-box :global(.search-icon) {
		position: absolute;
		left: 14px;
		top: 50%;
		transform: translateY(-50%);
		color: #94a3b8;
		pointer-events: none;
	}
	.clear-search-btn {
		position: absolute;
		right: 12px;
		top: 50%;
		transform: translateY(-50%);
		background: #f1f5f9;
		border: none;
		color: #475569;
		border-radius: 50%;
		width: 20px;
		height: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		font-size: 14px;
	}
	.sort-box {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		background: #ffffff;
		border: 1px solid rgba(15, 30, 56, 0.12);
		border-radius: 12px;
		padding: 4px 14px;
	}
	.sort-label {
		font-size: 13px;
		color: #64748b;
	}
	.sort-select {
		background: transparent;
		border: none;
		color: #0a1628;
		font-size: 13.5px;
		font-weight: 600;
		outline: none;
		cursor: pointer;
		padding: 8px 4px;
	}
	.sort-select option {
		background: #ffffff;
		color: #0a1628;
	}

	.results-meta {
		max-width: 1240px;
		margin: 0 auto 30px;
		padding: 0 24px;
		font-size: 13px;
		color: #64748b;
		display: flex;
		align-items: center;
		gap: 12px;
	}
	.results-meta strong {
		color: var(--accent);
	}
	.active-query-tag {
		background: #f1f5f9;
		color: var(--accent);
		padding: 2px 8px;
		border-radius: 6px;
	}

	/* Grid & Cards */
	.portfolio-grid {
		max-width: 1240px;
		margin: 0 auto;
		padding: 0 24px;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 28px;
	}
	@media (max-width: 1040px) {
		.portfolio-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}
	@media (max-width: 680px) {
		.portfolio-grid {
			grid-template-columns: 1fr;
		}
	}

	.portfolio-card {
		background: #ffffff;
		border: 1px solid rgba(15, 30, 56, 0.08);
		border-radius: 18px;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		box-shadow: 0 2px 10px rgba(15, 30, 56, 0.03);
		transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), border-color 0.3s, box-shadow 0.3s;
	}
	.portfolio-card:hover {
		transform: translateY(-5px);
		border-color: var(--accent);
		box-shadow: 0 16px 36px rgba(15, 30, 56, 0.08);
	}

	.card-media-wrap {
		position: relative;
		aspect-ratio: 16/10;
		overflow: hidden;
		background: #f1f5f9;
	}
	.card-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
	}
	.portfolio-card:hover .card-img {
		transform: scale(1.06);
	}
	.card-media-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(to top, rgba(10, 22, 40, 0.8) 0%, rgba(10, 22, 40, 0.1) 60%, transparent 100%);
	}

	.card-badges-top {
		position: absolute;
		top: 12px;
		left: 12px;
		right: 12px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		z-index: 2;
	}
	.category-badge {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		font-size: 11px;
		font-weight: 700;
		padding: 3px 9px;
		border-radius: 6px;
		backdrop-filter: blur(8px);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}
	.category-badge.desain {
		background: rgba(147, 51, 234, 0.85);
		color: #ffffff;
		border: 1px solid rgba(147, 51, 234, 0.4);
	}
	.category-badge.bisnis {
		background: rgba(16, 185, 129, 0.85);
		color: #ffffff;
		border: 1px solid rgba(16, 185, 129, 0.4);
	}
	.category-badge.hybrid {
		background: rgba(245, 158, 11, 0.85);
		color: #ffffff;
		border: 1px solid rgba(245, 158, 11, 0.4);
	}

	.status-badges {
		display: flex;
		gap: 6px;
	}
	.status-pill {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		font-size: 10px;
		font-weight: 800;
		letter-spacing: 0.05em;
		padding: 3px 8px;
		border-radius: 6px;
		backdrop-filter: blur(8px);
	}
	.status-pill.new {
		background: rgba(239, 68, 68, 0.85);
		color: #fff;
	}
	.status-pill.featured {
		background: var(--accent);
		color: #ffffff;
	}

	.card-media-footer {
		position: absolute;
		bottom: 10px;
		left: 14px;
		right: 14px;
		display: flex;
		justify-content: space-between;
		font-size: 12px;
		color: rgba(255, 255, 255, 0.85);
		z-index: 2;
	}
	.meta-role {
		font-weight: 600;
		color: #fff;
	}

	/* Card Body */
	.card-body {
		padding: 22px;
		display: flex;
		flex-direction: column;
		flex: 1;
	}
	.card-title {
		font-size: 18px;
		font-weight: 700;
		line-height: 1.35;
		margin: 0 0 6px 0;
	}
	.card-title a {
		color: #0a1628;
		text-decoration: none;
		transition: color 0.2s;
	}
	.card-title a:hover {
		color: var(--accent-hover);
	}
	.card-subtitle {
		font-size: 12.5px;
		font-weight: 600;
		color: #1e3a6a;
		margin: 0 0 12px 0;
		line-height: 1.4;
	}
	.card-summary {
		font-size: 13.5px;
		line-height: 1.6;
		color: var(--text-body);
		margin: 0 0 16px 0;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.metrics-row {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 8px;
		margin-bottom: 16px;
	}
	.metric-chip {
		background: #f1f5f9;
		border: 1px solid rgba(15, 30, 56, 0.05);
		border-radius: 10px;
		padding: 8px 10px;
		display: flex;
		flex-direction: column;
	}
	.metric-val {
		font-size: 15px;
		font-weight: 800;
		color: #047857;
	}
	.metric-lbl {
		font-size: 10.5px;
		color: #64748b;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.tools-row {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		margin-bottom: 20px;
	}
	.tool-tag {
		background: #f1f5f9;
		border: 1px solid rgba(15, 30, 56, 0.06);
		color: #334155;
		font-size: 11px;
		padding: 2px 8px;
		border-radius: 5px;
	}
	.tool-tag.more {
		background: transparent;
		border-color: rgba(15, 30, 56, 0.15);
		color: #64748b;
	}

	.card-footer {
		margin-top: auto;
		padding-top: 16px;
		border-top: 1px solid rgba(15, 30, 56, 0.06);
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 12px;
	}
	.ext-links {
		display: flex;
		gap: 10px;
	}
	.ext-link {
		display: inline-flex;
		align-items: center;
		gap: 3px;
		font-size: 11.5px;
		color: #64748b;
		text-decoration: none;
		transition: color 0.2s;
	}
	.ext-link:hover {
		color: #0a1628;
	}
	.case-study-cta {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		font-size: 12.5px;
		font-weight: 700;
		color: var(--accent);
		text-decoration: none;
		transition: transform 0.2s, gap 0.2s;
	}
	.case-study-cta:hover {
		gap: 8px;
		text-decoration: underline;
	}

	/* Empty State */
	.empty-state {
		text-align: center;
		padding: 60px 24px;
		background: #ffffff;
		border-radius: 16px;
		max-width: 600px;
		margin: 20px auto;
		border: 1px dashed rgba(15, 30, 56, 0.15);
	}
	.empty-icon-wrap {
		width: 56px;
		height: 56px;
		border-radius: 14px;
		background: #f1f5f9;
		color: #64748b;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 14px;
	}
	.empty-title {
		font-size: 18px;
		font-weight: 700;
		color: #0a1628;
		margin-bottom: 8px;
	}
	.empty-desc {
		font-size: 14px;
		color: var(--text-body);
		line-height: 1.5;
	}
</style>
