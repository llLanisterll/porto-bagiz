<script lang="ts">
	import { portfolioStore } from '$lib/stores/portfolioStore.svelte';
	import type { UserProfile, StatItem } from '$lib/types/portfolio';
	import {
		UserCheck,
		Save,
		CheckCircle2,
		ExternalLink,
		RotateCcw,
		Sparkles,
		Link as LinkIcon,
		Mail,
		MapPin,
		Clock,
		Award
	} from 'lucide-svelte';

	let toastMessage = $state('');
	let toastTimer: any = null;

	function showToast(msg: string) {
		if (toastTimer) clearTimeout(toastTimer);
		toastMessage = msg;
		toastTimer = setTimeout(() => (toastMessage = ''), 3200);
	}

	// Form clone initialized from portfolioStore.profile
	let formProfile = $state({
		name: portfolioStore.profile.name,
		headline: portfolioStore.profile.headline,
		tagline: portfolioStore.profile.tagline,
		bio: portfolioStore.profile.bio,
		location: portfolioStore.profile.location,
		availability: portfolioStore.profile.availability,
		resumeUrl: portfolioStore.profile.resumeUrl,
		aboutP1: portfolioStore.profile.aboutNarrative?.[0] || '',
		aboutP2: portfolioStore.profile.aboutNarrative?.[1] || '',
		aboutP3: portfolioStore.profile.aboutNarrative?.[2] || '',
		stat0Val: portfolioStore.profile.stats?.[0]?.value || '6+',
		stat0Lbl: portfolioStore.profile.stats?.[0]?.label || 'Tahun Pengalaman',
		stat1Val: portfolioStore.profile.stats?.[1]?.value || '25+',
		stat1Lbl: portfolioStore.profile.stats?.[1]?.label || 'Proyek Selesai',
		stat2Val: portfolioStore.profile.stats?.[2]?.value || '+38%',
		stat2Lbl: portfolioStore.profile.stats?.[2]?.label || 'Rata-rata Peningkatan Metrik',
		stat3Val: portfolioStore.profile.stats?.[3]?.value || '$2.5M+',
		stat3Lbl: portfolioStore.profile.stats?.[3]?.label || 'Total Pendanaan Diakuisisi',
		email: portfolioStore.profile.socialLinks?.email || '',
		linkedin: portfolioStore.profile.socialLinks?.linkedin || '',
		behance: portfolioStore.profile.socialLinks?.behance || '',
		dribbble: portfolioStore.profile.socialLinks?.dribbble || '',
		github: portfolioStore.profile.socialLinks?.github || '',
		instagram: portfolioStore.profile.socialLinks?.instagram || ''
	});

	function handleSave(e: Event) {
		e.preventDefault();

		const aboutNarrative = [formProfile.aboutP1, formProfile.aboutP2, formProfile.aboutP3].filter(
			Boolean
		);

		const stats: StatItem[] = [
			{
				label: formProfile.stat0Lbl,
				value: formProfile.stat0Val,
				description: 'Desain Produk & Riset Bisnis'
			},
			{
				label: formProfile.stat1Lbl,
				value: formProfile.stat1Val,
				description: 'Aplikasi Web & Mobile'
			},
			{
				label: formProfile.stat2Lbl,
				value: formProfile.stat2Val,
				description: 'Konversi & Efisiensi Pengguna'
			},
			{
				label: formProfile.stat3Lbl,
				value: formProfile.stat3Val,
				description: 'Dukungan Riset & Pitch Deck'
			}
		];

		const socialLinks = {
			email: formProfile.email,
			linkedin: formProfile.linkedin,
			behance: formProfile.behance,
			dribbble: formProfile.dribbble,
			github: formProfile.github,
			instagram: formProfile.instagram
		};

		portfolioStore.updateProfile({
			name: formProfile.name.trim(),
			headline: formProfile.headline.trim(),
			tagline: formProfile.tagline.trim(),
			bio: formProfile.bio.trim(),
			location: formProfile.location.trim(),
			availability: formProfile.availability.trim(),
			resumeUrl: formProfile.resumeUrl.trim(),
			aboutNarrative,
			stats,
			socialLinks
		});

		showToast('Profil & narasi tentang saya berhasil diperbarui!');
	}
</script>

<svelte:head>
	<title>Profil & Tentang — Admin CMS Bagiz</title>
</svelte:head>

<div class="profile-admin-container">
	<!-- Floating Toast -->
	{#if toastMessage}
		<div class="toast-floating" role="status">
			<CheckCircle2 size={16} />
			<span>{toastMessage}</span>
		</div>
	{/if}

	<!-- Header Area -->
	<header class="page-header">
		<div>
			<div class="badge-pill">
				<UserCheck size={13} />
				<span>KONTEN DINAMIS</span>
			</div>
			<h1 class="page-title">Profil & Tentang Saya</h1>
			<p class="page-desc">
				Perbarui biodata utama, headline spesialisasi, narasi tentang saya (#about), angka pencapaian, dan tautan sosial media.
			</p>
		</div>

		<div class="header-actions">
			<a href="/#about" target="_blank" rel="noopener" class="btn-preview-link">
				<span>Lihat di Beranda</span>
				<ExternalLink size={13} />
			</a>
			<button type="submit" form="profile-form" class="btn-primary">
				<Save size={15} />
				<span>Simpan Perubahan</span>
			</button>
		</div>
	</header>

	<form id="profile-form" onsubmit={handleSave} class="profile-cards-stack">
		<!-- Section 1: Hero & Biodata Utama -->
		<div class="form-card">
			<div class="card-header">
				<h2 class="card-title">1. Identitas & Hero Banner</h2>
				<p class="card-desc">Informasi yang tampil pada bagian teratas website (Hero section).</p>
			</div>

			<div class="card-body">
				<div class="form-grid-2">
					<div class="form-group">
						<label for="prof-name">Nama Lengkap & Gelar *</label>
						<input id="prof-name" type="text" bind:value={formProfile.name} required />
					</div>
					<div class="form-group">
						<label for="prof-headline">Headline Spesialisasi *</label>
						<input id="prof-headline" type="text" bind:value={formProfile.headline} required />
					</div>
				</div>

				<div class="form-group">
					<label for="prof-tagline">Tagline Filosofi Desain *</label>
					<input id="prof-tagline" type="text" bind:value={formProfile.tagline} required />
				</div>

				<div class="form-grid-2">
					<div class="form-group">
						<label for="prof-location">Lokasi Domisili & Kebijakan Kerja</label>
						<input id="prof-location" type="text" bind:value={formProfile.location} />
					</div>
					<div class="form-group">
						<label for="prof-avail">Status Ketersediaan Proyek</label>
						<input id="prof-avail" type="text" bind:value={formProfile.availability} />
					</div>
				</div>
			</div>
		</div>

		<!-- Section 2: Tentang Saya Narasi -->
		<div class="form-card">
			<div class="card-header">
				<h2 class="card-title">2. Narasi Tentang Saya (Section #about)</h2>
				<p class="card-desc">Penjelasan komprehensif mengenai profil hibrida UX/UI dan Strategi Bisnis.</p>
			</div>

			<div class="card-body">
				<div class="form-group">
					<label for="prof-bio">Bio Singkat (One-Liner Hook) *</label>
					<textarea id="prof-bio" rows="2" bind:value={formProfile.bio} required></textarea>
				</div>

				<div class="form-group">
					<label for="prof-p1">Paragraf 1: Pendahuluan & Filosofi</label>
					<textarea id="prof-p1" rows="3" bind:value={formProfile.aboutP1}></textarea>
				</div>

				<div class="form-group">
					<label for="prof-p2">Paragraf 2: Latar Belakang & Pengalaman Proyek</label>
					<textarea id="prof-p2" rows="3" bind:value={formProfile.aboutP2}></textarea>
				</div>

				<div class="form-group">
					<label for="prof-p3">Paragraf 3: Nilai Tambah & Fokus Bisnis</label>
					<textarea id="prof-p3" rows="3" bind:value={formProfile.aboutP3}></textarea>
				</div>
			</div>
		</div>

		<!-- Section 3: Metrik Kunci -->
		<div class="form-card">
			<div class="card-header">
				<h2 class="card-title">3. Angka & Metrik Pencapaian</h2>
				<p class="card-desc">Statistik ringkas yang tampil pada profil dan section tentang saya.</p>
			</div>

			<div class="card-body">
				<div class="form-grid-4">
					<div class="stat-edit-box">
						<label for="stat-0-val">Stat 1: Nilai</label>
						<input id="stat-0-val" type="text" bind:value={formProfile.stat0Val} />
						<label for="stat-0-lbl" class="sub-label">Label</label>
						<input id="stat-0-lbl" type="text" bind:value={formProfile.stat0Lbl} />
					</div>

					<div class="stat-edit-box">
						<label for="stat-1-val">Stat 2: Nilai</label>
						<input id="stat-1-val" type="text" bind:value={formProfile.stat1Val} />
						<label for="stat-1-lbl" class="sub-label">Label</label>
						<input id="stat-1-lbl" type="text" bind:value={formProfile.stat1Lbl} />
					</div>

					<div class="stat-edit-box">
						<label for="stat-2-val">Stat 3: Nilai</label>
						<input id="stat-2-val" type="text" bind:value={formProfile.stat2Val} />
						<label for="stat-2-lbl" class="sub-label">Label</label>
						<input id="stat-2-lbl" type="text" bind:value={formProfile.stat2Lbl} />
					</div>

					<div class="stat-edit-box">
						<label for="stat-3-val">Stat 4: Nilai</label>
						<input id="stat-3-val" type="text" bind:value={formProfile.stat3Val} />
						<label for="stat-3-lbl" class="sub-label">Label</label>
						<input id="stat-3-lbl" type="text" bind:value={formProfile.stat3Lbl} />
					</div>
				</div>
			</div>
		</div>

		<!-- Section 4: Jejaring Sosial & Kontak -->
		<div class="form-card">
			<div class="card-header">
				<h2 class="card-title">4. Tautan Sosial & Kontak</h2>
				<p class="card-desc">Tautan profil profesional yang tercantum di header, footer, dan kontak.</p>
			</div>

			<div class="card-body">
				<div class="form-grid-2">
					<div class="form-group">
						<label for="prof-email">Email Resmi *</label>
						<input id="prof-email" type="email" bind:value={formProfile.email} required />
					</div>
					<div class="form-group">
						<label for="prof-linkedin">LinkedIn URL</label>
						<input id="prof-linkedin" type="url" bind:value={formProfile.linkedin} />
					</div>
					<div class="form-group">
						<label for="prof-dribbble">Dribbble URL</label>
						<input id="prof-dribbble" type="url" bind:value={formProfile.dribbble} />
					</div>
					<div class="form-group">
						<label for="prof-behance">Behance URL</label>
						<input id="prof-behance" type="url" bind:value={formProfile.behance} />
					</div>
					<div class="form-group">
						<label for="prof-github">GitHub URL</label>
						<input id="prof-github" type="url" bind:value={formProfile.github} />
					</div>
					<div class="form-group">
						<label for="prof-instagram">Instagram URL</label>
						<input id="prof-instagram" type="url" bind:value={formProfile.instagram} />
					</div>
				</div>
			</div>
		</div>

		<!-- Sticky Save Action Bar at bottom -->
		<div class="sticky-action-bar">
			<span class="auto-save-note">
				<Sparkles size={14} />
				Perubahan akan langsung disimpan ke penyimpanan lokal browser dan tampil di website.
			</span>
			<button type="submit" class="btn-primary">
				<Save size={16} />
				<span>Simpan Semua Perubahan</span>
			</button>
		</div>
	</form>
</div>

<style>
	.profile-admin-container {
		display: flex;
		flex-direction: column;
		gap: 24px;
		padding-bottom: 60px;
	}

	.toast-floating {
		position: fixed;
		bottom: 28px;
		right: 28px;
		background: #0a1628;
		color: #ffffff;
		padding: 12px 20px;
		border-radius: 12px;
		font-size: 13.5px;
		font-weight: 600;
		display: flex;
		align-items: center;
		gap: 10px;
		box-shadow: 0 12px 30px rgba(10, 22, 40, 0.25);
		z-index: 9999;
	}

	/* Header */
	.page-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 20px;
		flex-wrap: wrap;
	}

	.badge-pill {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		font-size: 11px;
		font-weight: 800;
		letter-spacing: 0.08em;
		color: #2563eb;
		background: #eff6ff;
		padding: 4px 10px;
		border-radius: 9999px;
		margin-bottom: 8px;
	}

	.page-title {
		font-size: 24px;
		font-weight: 800;
		color: #0a1628;
		margin: 0 0 6px;
		letter-spacing: -0.01em;
	}

	.page-desc {
		font-size: 14px;
		color: #475569;
		margin: 0;
		max-width: 650px;
		line-height: 1.5;
	}

	.header-actions {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.btn-preview-link {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 9px 16px;
		background: #ffffff;
		border: 1px solid #cbd5e1;
		color: #0a1628;
		border-radius: 10px;
		font-size: 13px;
		font-weight: 600;
		text-decoration: none;
		transition: all 0.2s ease;
	}

	.btn-preview-link:hover {
		background: #f1f5f9;
		border-color: #94a3b8;
	}

	.btn-primary {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		background: #0a1628;
		color: #ffffff;
		padding: 10px 18px;
		border-radius: 10px;
		font-size: 13.5px;
		font-weight: 600;
		border: none;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.btn-primary:hover {
		background: #162844;
		transform: translateY(-1px);
	}

	/* Form Stack */
	.profile-cards-stack {
		display: flex;
		flex-direction: column;
		gap: 24px;
	}

	.form-card {
		background: #ffffff;
		border: 1px solid rgba(10, 22, 40, 0.08);
		border-radius: 18px;
		padding: 26px;
		box-shadow: 0 2px 8px rgba(10, 22, 40, 0.02);
	}

	.card-header {
		margin-bottom: 20px;
		padding-bottom: 14px;
		border-bottom: 1px solid #f1f5f9;
	}

	.card-title {
		font-size: 17px;
		font-weight: 800;
		color: #0a1628;
		margin: 0 0 4px;
	}

	.card-desc {
		font-size: 13px;
		color: #64748b;
		margin: 0;
	}

	.card-body {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.form-grid-2 {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 16px;
	}

	.form-grid-4 {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 16px;
	}

	.stat-edit-box {
		background: #f8fafc;
		border: 1px solid #e2e8f0;
		border-radius: 12px;
		padding: 14px;
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.stat-edit-box .sub-label {
		margin-top: 6px;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.form-group label,
	.stat-edit-box label {
		font-size: 12.5px;
		font-weight: 700;
		color: #0a1628;
	}

	.form-group input,
	.form-group textarea,
	.stat-edit-box input {
		padding: 10px 14px;
		border: 1px solid #cbd5e1;
		border-radius: 10px;
		font-size: 13.5px;
		font-family: inherit;
		color: #0a1628;
		background: #ffffff;
		outline: none;
		transition: all 0.15s ease;
	}

	.form-group input:focus,
	.form-group textarea:focus,
	.stat-edit-box input:focus {
		border-color: #2563eb;
		box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
	}

	/* Sticky Action Bar */
	.sticky-action-bar {
		background: rgba(255, 255, 255, 0.94);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		border: 1px solid rgba(226, 232, 240, 0.9);
		border-radius: 16px;
		padding: 16px 24px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-shadow: 0 10px 25px -5px rgba(10, 22, 40, 0.08), 0 8px 10px -6px rgba(10, 22, 40, 0.04);
		position: sticky;
		bottom: 24px;
		z-index: 50;
	}

	.auto-save-note {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		font-size: 12.5px;
		color: #64748b;
		font-weight: 500;
	}

	@media (max-width: 900px) {
		.form-grid-2,
		.form-grid-4 {
			grid-template-columns: 1fr;
		}

		.sticky-action-bar {
			flex-direction: column;
			gap: 12px;
			align-items: stretch;
		}
	}
</style>
