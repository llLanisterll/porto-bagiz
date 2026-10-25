<script lang="ts">
	import { mockProfile, mockSkills, mockVolunteerExperiences } from '$lib/data/mockPortfolio';
	import { onMount } from 'svelte';
	import { Download, GraduationCap, Users, Sparkles, CheckCircle2, Zap } from '@lucide/svelte';

	// Category filter for skills
	let selectedCategory: 'Semua' | 'Desain' | 'Bisnis' = $state('Semua');

	let filteredSkills = $derived(
		selectedCategory === 'Semua'
			? mockSkills
			: mockSkills.filter(s => s.category === selectedCategory)
	);

	// Timeline tab
	let activeTimelineTab: 'edu' | 'vol' = $state('edu');

	// Animation states
	let animated = $state(false);
	let filledPcts: Record<string, number> = $state({});

	function triggerSkillBars() {
		mockSkills.forEach((s, idx) => {
			setTimeout(() => {
				filledPcts[s.id] = s.proficiencyPercent;
			}, idx * 100);
		});
	}

	onMount(() => {
		const obs = new IntersectionObserver(entries => {
			if (entries[0].isIntersecting && !animated) {
				animated = true;
				triggerSkillBars();
				obs.disconnect();
			}
		}, { threshold: 0.15 });

		const section = document.querySelector('#keahlian');
		if (section) obs.observe(section);
		return () => obs.disconnect();
	});
</script>

<section class="skills-section" id="keahlian">
	<div class="skills-inner">
		<!-- Left: photo + quick bio overview -->
		<div class="skills-left-col wow fadeInLeft">
			<div class="skills-img-wrap">
				<img
					src={mockProfile.avatar}
					alt="{mockProfile.name} in action"
					class="skills-img"
					loading="lazy"
				/>
				<div class="skills-img-overlay"></div>
				<div class="skills-img-label">
					<div class="exp-badge">
						<Zap size={15} />
						<span>4+ Tahun Riset Bisnis & Desain Produk</span>
					</div>
				</div>
			</div>

			<!-- Personal Quick Info Card -->
			<div class="about-info-card">
				<div class="info-row">
					<span class="info-label">Nama Lengkap</span>
					<span class="info-val">{mockProfile.name}</span>
				</div>
				<div class="info-row">
					<span class="info-label">Spesialisasi</span>
					<span class="info-val">{mockProfile.headline}</span>
				</div>
				<div class="info-row">
					<span class="info-label">Domisili</span>
					<span class="info-val">{mockProfile.location}</span>
				</div>
				<div class="info-row">
					<span class="info-label">Status</span>
					<span class="info-val text-accent">{mockProfile.availability}</span>
				</div>
				<div style="margin-top: 18px">
					<a href={mockProfile.resumeUrl} class="btn-primary" target="_blank" rel="noopener" style="width: 100%; justify-content: center;">
						<Download size={16} /> Unduh CV Lengkap (PDF)
					</a>
				</div>
			</div>
		</div>

		<!-- Right: About Narrative & Skills -->
		<div class="skills-right-col">
			<div class="wow fadeInRight">
				<span class="section-tag">About Me</span>
				<h2 class="section-title-lg title-with-bar">
					Menghubungkan Estetika Desain dengan Dampak Bisnis
				</h2>

				<div class="narrative-blocks">
					{#each mockProfile.aboutNarrative as paragraph}
						<p class="section-lead">{paragraph}</p>
					{/each}
				</div>
			</div>

			<!-- Skills Header & Filter -->
			<div class="skills-control-header wow fadeInRight delay-1">
				<div class="skills-sub-title">
					<Sparkles size={18} class="text-accent" />
					<span>Keahlian & Kemahiran Spesifik</span>
				</div>

				<div class="filter-tabs">
					<button
						class="filter-tab-btn"
						class:active={selectedCategory === 'Semua'}
						onclick={() => selectedCategory = 'Semua'}
					>
						Semua ({mockSkills.length})
					</button>
					<button
						class="filter-tab-btn"
						class:active={selectedCategory === 'Desain'}
						onclick={() => selectedCategory = 'Desain'}
					>
						Desain
					</button>
					<button
						class="filter-tab-btn"
						class:active={selectedCategory === 'Bisnis'}
						onclick={() => selectedCategory = 'Bisnis'}
					>
						Bisnis
					</button>
				</div>
			</div>

			<!-- Dynamic Skill Cards -->
			<div class="skill-cards-grid wow fadeInRight delay-2">
				{#each filteredSkills as skill (skill.id)}
					<div class="skill-card">
						<div class="skill-card-top">
							<div class="skill-meta-left">
								<h3 class="skill-title">{skill.name}</h3>
								<div class="skill-badge-row">
									<span class="category-pill {skill.category === 'Desain' ? 'pill-design' : 'pill-business'}">
										{skill.category}
									</span>
									<span class="level-pill">{skill.level}</span>
								</div>
							</div>
							<div class="skill-pct-number">
								{filledPcts[skill.id] || 0}%
							</div>
						</div>

						<!-- Progress Bar -->
						<div class="skill-bar-bg">
							<div
								class="skill-bar-fill"
								style="width: {filledPcts[skill.id] || 0}%"
							></div>
						</div>

						<p class="skill-card-desc">{skill.description}</p>

						<!-- Tools Chips -->
						<div class="skill-card-tools">
							{#each skill.tools as tool}
								<span class="skill-tool-tag">{tool}</span>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- Bottom Section: Education & Volunteer Timeline -->
	<div class="timeline-container">
		<div class="timeline-header wow fadeInUp">
			<span class="section-tag">Track Record & Community</span>
			<h2 class="section-title-lg title-with-bar" style="margin: 0 auto; text-align: center;">
				Riwayat Pendidikan & Pengalaman Komunitas
			</h2>

			<!-- Switch between Education and Volunteer -->
			<div class="timeline-tabs">
				<button
					class="timeline-tab-btn"
					class:active={activeTimelineTab === 'edu'}
					onclick={() => activeTimelineTab = 'edu'}
				>
					<GraduationCap size={18} />
					<span>Pendidikan Formal ({mockProfile.education.length})</span>
				</button>
				<button
					class="timeline-tab-btn"
					class:active={activeTimelineTab === 'vol'}
					onclick={() => activeTimelineTab = 'vol'}
				>
					<Users size={18} />
					<span>Organisasi & Relawan ({mockVolunteerExperiences.length})</span>
				</button>
			</div>
		</div>

		<!-- Education Timeline -->
		{#if activeTimelineTab === 'edu'}
			<div class="timeline-tree wow fadeInUp delay-1">
				{#each mockProfile.education as edu, idx}
					<div class="timeline-item">
						<div class="timeline-marker">
							<div class="timeline-dot"></div>
							{#if idx < mockProfile.education.length - 1}
								<div class="timeline-line"></div>
							{/if}
						</div>
						<div class="timeline-content">
							<div class="timeline-period-badge">{edu.period}</div>
							<h3 class="timeline-role-title">{edu.degree}</h3>
							<div class="timeline-org-subtitle">{edu.institution}</div>
							<ul class="achievement-list">
								{#each edu.achievements as item}
									<li>
										<CheckCircle2 size={15} class="text-accent" />
										<span>{item}</span>
									</li>
								{/each}
							</ul>
						</div>
					</div>
				{/each}
			</div>
		{:else}
			<!-- Volunteer & Organizational Timeline -->
			<div class="timeline-tree wow fadeInUp delay-1">
				{#each mockVolunteerExperiences as vol, idx}
					<div class="timeline-item">
						<div class="timeline-marker">
							<div class="timeline-dot"></div>
							{#if idx < mockVolunteerExperiences.length - 1}
								<div class="timeline-line"></div>
							{/if}
						</div>
						<div class="timeline-content">
							<div class="timeline-meta-row">
								<span class="timeline-period-badge">{vol.period}</span>
								<span class="timeline-tag-badge">{vol.badge}</span>
							</div>
							<h3 class="timeline-role-title">{vol.role}</h3>
							<div class="timeline-org-subtitle">{vol.organization} • <span style="opacity:0.7">{vol.location}</span></div>
							<p class="timeline-desc">{vol.description}</p>
							<ul class="achievement-list">
								{#each vol.highlights as item}
									<li>
										<CheckCircle2 size={15} class="text-accent" />
										<span>{item}</span>
									</li>
								{/each}
							</ul>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</section>

<style>
	.skills-section {
		background: var(--bg-dark);
		padding: 100px 0 120px 0;
		position: relative;
	}
	.skills-inner {
		max-width: 1240px;
		margin: 0 auto;
		padding: 0 24px;
		display: grid;
		grid-template-columns: 420px 1fr;
		gap: 60px;
		align-items: start;
	}
	@media (max-width: 980px) {
		.skills-inner {
			grid-template-columns: 1fr;
			gap: 48px;
		}
	}
	.skills-left-col {
		position: sticky;
		top: 100px;
	}
	.skills-img-wrap {
		position: relative;
		border-radius: 20px;
		overflow: hidden;
		border: 1px solid rgba(15, 30, 56, 0.08);
		box-shadow: 0 20px 40px rgba(15, 30, 56, 0.08);
	}
	.skills-img {
		width: 100%;
		border-radius: 20px;
		object-fit: cover;
		aspect-ratio: 4/5;
		display: block;
	}
	.skills-img-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(to top, rgba(10,22,40,0.85) 0%, transparent 60%);
	}
	.skills-img-label {
		position: absolute;
		bottom: 20px;
		left: 20px;
		right: 20px;
	}
	.exp-badge {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		background: var(--accent);
		color: #ffffff;
		font-weight: 800;
		font-size: 13px;
		padding: 10px 16px;
		border-radius: 10px;
		box-shadow: 0 4px 15px rgba(15, 30, 56, 0.2);
	}
	.about-info-card {
		margin-top: 24px;
		background: #ffffff;
		border: 1px solid rgba(15, 30, 56, 0.08);
		border-radius: 16px;
		padding: 22px;
		box-shadow: 0 4px 20px rgba(15, 30, 56, 0.04);
	}
	.info-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10px 0;
		border-bottom: 1px solid rgba(15, 30, 56, 0.05);
		font-size: 13.5px;
	}
	.info-row:last-of-type {
		border-bottom: none;
	}
	.info-label {
		color: #64748b;
	}
	.info-val {
		color: #0a1628;
		font-weight: 600;
		text-align: right;
	}
	.text-accent {
		color: var(--accent);
	}

	.narrative-blocks {
		margin-top: 20px;
		display: flex;
		flex-direction: column;
		gap: 14px;
	}
	.narrative-blocks p {
		color: var(--text-body);
		line-height: 1.75;
		font-size: 15px;
		margin: 0;
	}

	.skills-control-header {
		margin-top: 48px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 16px;
		border-bottom: 1px solid rgba(15, 30, 56, 0.08);
		padding-bottom: 16px;
	}
	.skills-sub-title {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		font-size: 18px;
		font-weight: 700;
		color: #0a1628;
	}
	.filter-tabs {
		display: flex;
		gap: 8px;
	}
	.filter-tab-btn {
		background: #f1f5f9;
		border: 1px solid rgba(15, 30, 56, 0.08);
		color: #475569;
		font-size: 13px;
		font-weight: 600;
		padding: 7px 16px;
		border-radius: 8px;
		cursor: pointer;
		transition: all 0.25s;
	}
	.filter-tab-btn:hover {
		color: #0a1628;
		border-color: rgba(15, 30, 56, 0.2);
	}
	.filter-tab-btn.active {
		background: var(--accent);
		color: #ffffff;
		border-color: var(--accent);
		font-weight: 700;
	}

	.skill-cards-grid {
		margin-top: 24px;
		display: grid;
		grid-template-columns: 1fr;
		gap: 16px;
	}
	.skill-card {
		background: #ffffff;
		border: 1px solid rgba(15, 30, 56, 0.08);
		border-radius: 14px;
		padding: 20px;
		box-shadow: 0 2px 10px rgba(15, 30, 56, 0.03);
		transition: transform 0.25s, border-color 0.25s, box-shadow 0.25s;
	}
	.skill-card:hover {
		transform: translateY(-2px);
		border-color: var(--accent);
		box-shadow: 0 10px 25px rgba(15, 30, 56, 0.08);
	}
	.skill-card-top {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 12px;
	}
	.skill-title {
		font-size: 16px;
		font-weight: 700;
		color: #0a1628;
		margin: 0 0 6px 0;
	}
	.skill-badge-row {
		display: flex;
		align-items: center;
		gap: 8px;
	}
	.category-pill {
		font-size: 11px;
		font-weight: 700;
		padding: 2px 8px;
		border-radius: 6px;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}
	.pill-design {
		background: rgba(147, 51, 234, 0.1);
		color: #7e22ce;
		border: 1px solid rgba(147, 51, 234, 0.25);
	}
	.pill-business {
		background: rgba(16, 185, 129, 0.1);
		color: #047857;
		border: 1px solid rgba(16, 185, 129, 0.25);
	}
	.level-pill {
		font-size: 11px;
		font-weight: 600;
		background: #f1f5f9;
		color: #475569;
		padding: 2px 8px;
		border-radius: 6px;
	}
	.skill-pct-number {
		font-size: 18px;
		font-weight: 800;
		color: var(--accent);
		letter-spacing: -0.02em;
	}

	.skill-bar-bg {
		height: 6px;
		background: #f1f5f9;
		border: 1px solid rgba(15, 30, 56, 0.06);
		border-radius: 10px;
		margin: 14px 0 12px 0;
		overflow: hidden;
	}
	.skill-bar-fill {
		height: 100%;
		background: var(--accent);
		border-radius: 10px;
		transition: width 1s cubic-bezier(0.2, 0.8, 0.2, 1);
	}

	.skill-card-desc {
		font-size: 13.5px;
		line-height: 1.6;
		color: var(--text-body);
		margin: 0 0 12px 0;
	}
	.skill-card-tools {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}
	.skill-tool-tag {
		background: #f1f5f9;
		border: 1px solid rgba(15, 30, 56, 0.08);
		color: #334155;
		font-size: 11.5px;
		padding: 3px 9px;
		border-radius: 6px;
	}

	/* Timeline section */
	.timeline-container {
		max-width: 1000px;
		margin: 90px auto 0 auto;
		padding: 0 24px;
	}
	.timeline-header {
		text-align: center;
		margin-bottom: 40px;
	}
	.timeline-tabs {
		display: inline-flex;
		gap: 12px;
		margin-top: 24px;
		background: #f1f5f9;
		padding: 6px;
		border-radius: 12px;
		border: 1px solid rgba(15, 30, 56, 0.08);
	}
	.timeline-tab-btn {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		background: transparent;
		border: none;
		color: #64748b;
		font-size: 13.5px;
		font-weight: 600;
		padding: 9px 20px;
		border-radius: 8px;
		cursor: pointer;
		transition: all 0.25s;
	}
	.timeline-tab-btn:hover {
		color: #0a1628;
	}
	.timeline-tab-btn.active {
		background: var(--accent);
		color: #ffffff;
		font-weight: 700;
	}

	.timeline-tree {
		display: flex;
		flex-direction: column;
		position: relative;
	}
	.timeline-item {
		display: grid;
		grid-template-columns: 40px 1fr;
		gap: 20px;
		position: relative;
	}
	.timeline-marker {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.timeline-dot {
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background: var(--accent);
		border: 3px solid #ffffff;
		box-shadow: 0 0 10px rgba(15, 30, 56, 0.25);
		z-index: 2;
		margin-top: 4px;
	}
	.timeline-line {
		width: 2px;
		flex: 1;
		background: rgba(15, 30, 56, 0.1);
		margin: 6px 0;
	}
	.timeline-content {
		background: #ffffff;
		border: 1px solid rgba(15, 30, 56, 0.08);
		box-shadow: 0 2px 10px rgba(15, 30, 56, 0.03);
		border-radius: 16px;
		padding: 24px;
		margin-bottom: 24px;
		transition: border-color 0.25s, box-shadow 0.25s;
	}
	.timeline-content:hover {
		border-color: var(--accent);
		box-shadow: 0 10px 25px rgba(15, 30, 56, 0.06);
	}
	.timeline-meta-row {
		display: flex;
		align-items: center;
		gap: 10px;
		margin-bottom: 8px;
	}
	.timeline-period-badge {
		display: inline-block;
		font-size: 11.5px;
		font-weight: 700;
		color: var(--accent);
		background: #f1f5f9;
		border: 1px solid rgba(15, 30, 56, 0.12);
		padding: 2px 10px;
		border-radius: 6px;
		margin-bottom: 6px;
	}
	.timeline-tag-badge {
		font-size: 11.5px;
		font-weight: 600;
		color: #0284c7;
		background: rgba(2, 132, 199, 0.1);
		border: 1px solid rgba(2, 132, 199, 0.2);
		padding: 2px 10px;
		border-radius: 6px;
		margin-bottom: 6px;
	}
	.timeline-role-title {
		font-size: 18px;
		font-weight: 700;
		color: #0a1628;
		margin: 0 0 4px 0;
	}
	.timeline-org-subtitle {
		font-size: 14px;
		font-weight: 600;
		color: #64748b;
		margin-bottom: 14px;
	}
	.timeline-desc {
		font-size: 14px;
		line-height: 1.6;
		color: var(--text-body);
		margin: 0 0 14px 0;
	}
	.achievement-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.achievement-list li {
		display: flex;
		align-items: flex-start;
		gap: 10px;
		font-size: 13.5px;
		line-height: 1.5;
		color: var(--text-body);
	}
	.achievement-list li :global(svg) {
		flex-shrink: 0;
		margin-top: 3px;
	}
</style>
