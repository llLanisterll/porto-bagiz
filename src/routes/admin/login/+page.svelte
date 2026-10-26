<script lang="ts">
	import { authStore } from '$lib/stores/authStore.svelte';
	import { mockProfile } from '$lib/data/mockPortfolio';
	import { goto } from '$app/navigation';
	import {
		ArrowUpRight,
		Lock,
		Mail,
		ShieldAlert,
		Eye,
		EyeOff,
		Check,
		Sparkles,
		ShieldCheck,
		FolderKanban,
		Briefcase,
		Award,
		Zap,
		Quote
	} from 'lucide-svelte';

	let email = $state('admin@bagiz.design');
	let password = $state('admin123');
	let rememberMe = $state(true);
	let showPassword = $state(false);
	let errorMsg = $state('');
	let loading = $state(false);
	let demoFilled = $state(false);

	function fillDemoCredentials() {
		email = 'admin@bagiz.design';
		password = 'admin123';
		errorMsg = '';
		demoFilled = true;
		setTimeout(() => {
			demoFilled = false;
		}, 1800);
	}

	function handleSubmit(e: Event) {
		e.preventDefault();
		errorMsg = '';
		loading = true;

		setTimeout(() => {
			const res = authStore.login(email, password);
			loading = false;
			if (res.success) {
				goto('/admin');
			} else {
				errorMsg = res.message || 'Kredensial tidak cocok. Silakan periksa email dan kata sandi Anda.';
			}
		}, 400);
	}
</script>

<svelte:head>
	<title>Masuk Admin CMS — Muhammad Bagiz • Lead UX/UI Designer</title>
</svelte:head>

<div class="login-page">
	<!-- Background Design Elements matching website hero -->
	<div class="bg-diagonal-line"></div>
	<div class="bg-ambient-blob blob-1"></div>
	<div class="bg-ambient-blob blob-2"></div>

	<!-- Top Navigation Header matching website Navbar -->
	<header class="login-header">
		<div class="header-inner">
			<!-- Brand Logo with blue accent -->
			<div class="brand-logo">
				<a href="/" class="logo-link" title="Ke Beranda Portofolio">
					<span>B</span><span class="logo-accent">a</span><span>giz</span>
				</a>
				<span class="brand-subpill">Admin Studio</span>
			</div>

			<!-- Right Action Links -->
			<div class="header-actions">
				<div class="system-status-pill">
					<span class="pulse-dot"></span>
					<span>Sistem Online</span>
				</div>
				<a href="/" class="back-pill-btn">
					<span>Lihat Portofolio</span>
					<ArrowUpRight size={15} />
				</a>
			</div>
		</div>
	</header>

	<!-- Main Container -->
	<main class="login-main">
		<div class="login-grid">
			<!-- LEFT COLUMN: Executive Profile & Brand Showcase -->
			<section class="showcase-column">
				<div class="showcase-card">
					<!-- Profile Header with signature shape -->
					<div class="showcase-top">
						<div class="profile-pic-box">
							<div class="profile-shape">
								<img
									src={mockProfile.avatar}
									alt={mockProfile.name}
									class="profile-img"
									loading="eager"
								/>
							</div>
							<div class="floating-badge">
								<span class="pulse-dot"></span>
								<span>Admin CMS Mode</span>
							</div>
						</div>

						<div class="showcase-bio">
							<div class="role-row">
								<span class="role-badge">Lead Product Designer</span>
								<span class="location-badge">Jakarta • Global</span>
							</div>
							<h2 class="designer-name">{mockProfile.name}</h2>
							<p class="designer-headline">{mockProfile.headline}</p>
						</div>
					</div>

					<!-- Metric Strip matching website counters -->
					<div class="stats-capsule">
						<div class="stat-box">
							<span class="stat-number">10+</span>
							<span class="stat-label">Tahun Pengalaman</span>
						</div>
						<div class="stat-divider"></div>
						<div class="stat-box">
							<span class="stat-number">60+</span>
							<span class="stat-label">Studi Kasus</span>
						</div>
						<div class="stat-divider"></div>
						<div class="stat-box">
							<span class="stat-number">100%</span>
							<span class="stat-label">Kepuasan Klien</span>
						</div>
					</div>

					<!-- Feature Checklist Pills -->
					<div class="features-list">
						<div class="feature-item">
							<div class="feature-icon-circle">
								<FolderKanban size={13} />
							</div>
							<span>Katalog Karya & Studi Kasus</span>
						</div>
						<div class="feature-item">
							<div class="feature-icon-circle">
								<Briefcase size={13} />
							</div>
							<span>Timeline Pengalaman</span>
						</div>
						<div class="feature-item">
							<div class="feature-icon-circle">
								<Award size={13} />
							</div>
							<span>Matriks Level Keahlian</span>
						</div>
						<div class="feature-item">
							<div class="feature-icon-circle">
								<Zap size={13} />
							</div>
							<span>Sinkronisasi Publik Instan</span>
						</div>
					</div>

					<!-- Philosophy Quote Box -->
					<div class="philosophy-card">
						<Quote size={16} class="quote-mark" />
						<p class="quote-text">
							"{mockProfile.bio}"
						</p>
						<span class="quote-signature">— Muhammad Bagiz</span>
					</div>
				</div>
			</section>

			<!-- RIGHT COLUMN: Elegant White Login Card -->
			<section class="auth-column">
				<div class="auth-card">
					<!-- Card Header -->
					<div class="auth-header">
						<div class="admin-pill-badge">
							<Sparkles size={12} class="sparkle-blue" />
							<span>PORTAL ADMINISTRATOR</span>
						</div>
						<h1 class="auth-title">Masuk ke Panel CMS</h1>
						<p class="auth-subtitle">
							Kelola seluruh katalog karya, riwayat pengalaman, dan keahlian portofolio Anda secara terpusat.
						</p>
					</div>

					<!-- Alert Box -->
					{#if errorMsg}
						<div class="alert-box" role="alert">
							<ShieldAlert size={16} class="alert-icon" />
							<div class="alert-text">{errorMsg}</div>
						</div>
					{/if}

					<!-- Form -->
					<form onsubmit={handleSubmit} class="auth-form">
						<!-- Email Input -->
						<div class="form-group">
							<label for="admin-email">Alamat Email Administrator</label>
							<div class="input-shell">
								<Mail size={16} class="field-icon" />
								<input
									id="admin-email"
									name="username"
									type="email"
									class="text-input"
									placeholder="admin@bagiz.design"
									bind:value={email}
									autocomplete="username"
									enterkeyhint="next"
									required
								/>
							</div>
						</div>

						<!-- Password Input -->
						<div class="form-group">
							<div class="label-row">
								<label for="admin-password">Kata Sandi</label>
								<a href="/admin/lupa-sandi" class="forgot-link">Lupa sandi?</a>
							</div>
							<div class="input-shell">
								<Lock size={16} class="field-icon" />
								<input
									id="admin-password"
									name="current-password"
									type={showPassword ? 'text' : 'password'}
									class="text-input has-action"
									placeholder="••••••••"
									bind:value={password}
									autocomplete="current-password"
									enterkeyhint="done"
									required
								/>
								<button
									type="button"
									class="password-toggle"
									onclick={() => (showPassword = !showPassword)}
									title={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
									aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
								>
									{#if showPassword}
										<EyeOff size={16} />
									{:else}
										<Eye size={16} />
									{/if}
								</button>
							</div>
						</div>

						<!-- Remember Me Checkbox -->
						<div class="options-row">
							<label class="remember-label">
								<input type="checkbox" bind:checked={rememberMe} class="real-checkbox" />
								<span class="custom-checkbox" class:checked={rememberMe}>
									{#if rememberMe}
										<Check size={11} strokeWidth={3} />
									{/if}
								</span>
								<span class="remember-text">Ingat sesi di perangkat ini</span>
							</label>
						</div>

						<!-- Quick Demo Widget in Navy/Blue tone -->
						<div class="demo-box">
							<div class="demo-info">
								<div class="demo-head">
									<Sparkles size={12} class="demo-star" />
									<span>Akses Cepat Demo</span>
								</div>
								<div class="demo-creds">
									<code>admin@bagiz.design</code> / <code>admin123</code>
								</div>
							</div>
							<button
								type="button"
								class="demo-fill-btn"
								onclick={fillDemoCredentials}
								title="Otomatis mengisi kredensial demo"
							>
								{#if demoFilled}
									<Check size={13} class="check-green" />
									<span>Terisi!</span>
								{:else}
									<span>Isi Otomatis</span>
								{/if}
							</button>
						</div>

						<!-- Primary CTA Button (matches Let's Talk button on homepage) -->
						<button type="submit" class="submit-pill-btn" disabled={loading}>
							{#if loading}
								<span class="btn-spinner"></span>
								<span>Memverifikasi Kredensial...</span>
							{:else}
								<span>Masuk ke Dashboard</span>
								<ArrowUpRight size={17} />
							{/if}
						</button>
					</form>

					<!-- Security Note -->
					<div class="auth-security-footer">
						<ShieldCheck size={15} class="sec-icon" />
						<span>Koneksi Sesi Terenkripsi • Data Tersimpan Aman di Browser</span>
					</div>
				</div>

				<div class="auth-copyright">
					<p>© 2026 Muhammad Bagiz. Lead UX/UI Designer & Business Strategist.</p>
				</div>
			</section>
		</div>
	</main>
</div>

<style>
	/* ==========================================================================
	   LIGHT PALETTE HARMONIOUS WITH WEBPAGE
	   ========================================================================== */
	.login-page {
		min-height: 100vh;
		background-color: #ffffff;
		font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
		color: #0a1628;
		position: relative;
		overflow-x: hidden;
		display: flex;
		flex-direction: column;
	}

	/* Angled decorative background line like Hero */
	.bg-diagonal-line {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(135deg, rgba(248, 250, 252, 0.95) 0%, rgba(241, 245, 249, 0.45) 100%);
		pointer-events: none;
		z-index: 0;
	}

	.bg-ambient-blob {
		position: absolute;
		border-radius: 50%;
		filter: blur(120px);
		pointer-events: none;
		z-index: 0;
	}
	.blob-1 {
		top: -120px;
		right: 15%;
		width: 480px;
		height: 480px;
		background: radial-gradient(circle, rgba(37, 99, 235, 0.08) 0%, transparent 70%);
	}
	.blob-2 {
		bottom: -100px;
		left: 8%;
		width: 500px;
		height: 500px;
		background: radial-gradient(circle, rgba(14, 165, 233, 0.06) 0%, transparent 70%);
	}

	/* ==========================================================================
	   TOP NAVIGATION HEADER
	   ========================================================================== */
	.login-header {
		position: relative;
		z-index: 10;
		padding: 20px 40px;
		background: rgba(255, 255, 255, 0.88);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		border-bottom: 1px solid rgba(10, 22, 40, 0.07);
	}
	.header-inner {
		max-width: 1200px;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	/* Logo styling */
	.brand-logo {
		display: flex;
		align-items: center;
		gap: 12px;
	}
	.logo-link {
		font-family: 'Plus Jakarta Sans', sans-serif;
		font-size: 27px;
		font-weight: 800;
		color: #0a1628;
		text-decoration: none;
		letter-spacing: -0.03em;
		display: inline-flex;
		align-items: center;
	}
	.logo-accent {
		color: #2563eb;
	}
	.brand-subpill {
		font-size: 11px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: #2563eb;
		background: #eff6ff;
		border: 1px solid #dbeafe;
		padding: 3px 9px;
		border-radius: 9999px;
	}

	.header-actions {
		display: flex;
		align-items: center;
		gap: 16px;
	}
	.system-status-pill {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		font-size: 12px;
		font-weight: 600;
		color: #059669;
		background: #ecfdf5;
		border: 1px solid #d1fae5;
		padding: 5px 12px;
		border-radius: 9999px;
	}
	.pulse-dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: #10b981;
		box-shadow: 0 0 6px #10b981;
	}

	.back-pill-btn {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		font-size: 13px;
		font-weight: 700;
		color: #0a1628;
		text-decoration: none;
		background: #ffffff;
		border: 1px solid rgba(10, 22, 40, 0.15);
		padding: 7px 16px;
		border-radius: 9999px;
		transition: all 0.2s ease;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
	}
	.back-pill-btn:hover {
		background: #0a1628;
		color: #ffffff;
		border-color: #0a1628;
		transform: translateY(-1px);
	}

	/* ==========================================================================
	   MAIN LAYOUT GRID
	   ========================================================================== */
	.login-main {
		flex: 1;
		position: relative;
		z-index: 5;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 36px 24px;
	}
	.login-grid {
		width: 100%;
		max-width: 1140px;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 40px;
		align-items: center;
	}

	/* ==========================================================================
	   LEFT COLUMN: SHOWCASE
	   ========================================================================== */
	.showcase-column {
		display: flex;
		flex-direction: column;
	}
	.showcase-card {
		background: #ffffff;
		border: 1px solid rgba(10, 22, 40, 0.08);
		border-radius: 28px;
		padding: 30px;
		box-shadow: 0 20px 45px -15px rgba(10, 22, 40, 0.06);
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	/* Signature Profile Box */
	.showcase-top {
		display: flex;
		align-items: center;
		gap: 20px;
	}
	.profile-pic-box {
		position: relative;
		flex-shrink: 0;
	}
	.profile-shape {
		width: 96px;
		height: 116px;
		border-radius: 20px 60px 20px 20px;
		overflow: hidden;
		background: linear-gradient(135deg, #0a1628 0%, #1e3a8a 100%);
		box-shadow: 0 8px 24px -4px rgba(10, 22, 40, 0.2);
	}
	.profile-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: top center;
	}
	.floating-badge {
		position: absolute;
		bottom: -8px;
		left: 50%;
		transform: translateX(-50%);
		background: #ffffff;
		border: 1px solid rgba(10, 22, 40, 0.1);
		border-radius: 9999px;
		padding: 3px 9px;
		display: flex;
		align-items: center;
		gap: 5px;
		font-size: 10px;
		font-weight: 700;
		color: #0a1628;
		white-space: nowrap;
		box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
	}

	.showcase-bio {
		display: flex;
		flex-direction: column;
		gap: 3px;
	}
	.role-row {
		display: flex;
		align-items: center;
		gap: 6px;
		margin-bottom: 2px;
	}
	.role-badge {
		font-size: 10.5px;
		font-weight: 700;
		color: #2563eb;
		background: #eff6ff;
		padding: 2px 7px;
		border-radius: 5px;
	}
	.location-badge {
		font-size: 10.5px;
		font-weight: 600;
		color: #64748b;
	}
	.designer-name {
		font-size: 22px;
		font-weight: 800;
		color: #0a1628;
		letter-spacing: -0.02em;
		margin: 0;
	}
	.designer-headline {
		font-size: 12.5px;
		color: #64748b;
		margin: 0;
		line-height: 1.45;
	}

	/* Stats Capsule matching website */
	.stats-capsule {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: #f8fafc;
		border: 1px solid rgba(10, 22, 40, 0.06);
		border-radius: 16px;
		padding: 14px 18px;
	}
	.stat-box {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}
	.stat-number {
		font-size: 19px;
		font-weight: 800;
		color: #0a1628;
		letter-spacing: -0.02em;
	}
	.stat-label {
		font-size: 10.5px;
		font-weight: 600;
		color: #64748b;
		margin-top: 1px;
	}
	.stat-divider {
		width: 1px;
		height: 26px;
		background: rgba(10, 22, 40, 0.08);
	}

	/* Features Grid */
	.features-list {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 8px;
	}
	.feature-item {
		display: flex;
		align-items: center;
		gap: 8px;
		background: #f8fafc;
		border: 1px solid rgba(10, 22, 40, 0.06);
		border-radius: 10px;
		padding: 8px 11px;
		font-size: 11.5px;
		font-weight: 600;
		color: #1e293b;
	}
	.feature-icon-circle {
		width: 22px;
		height: 22px;
		border-radius: 50%;
		background: #eff6ff;
		color: #2563eb;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	/* Philosophy Quote Card */
	.philosophy-card {
		background: #eff6ff;
		border: 1px solid #dbeafe;
		border-radius: 14px;
		padding: 14px 18px;
		position: relative;
	}
	:global(.quote-mark) {
		color: #3b82f6;
		margin-bottom: 4px;
	}
	.quote-text {
		font-size: 12px;
		line-height: 1.55;
		color: #1e3a8a;
		font-style: italic;
		margin: 0 0 4px;
	}
	.quote-signature {
		font-size: 11px;
		font-weight: 700;
		color: #1d4ed8;
		display: block;
	}

	/* ==========================================================================
	   RIGHT COLUMN: AUTH FORM
	   ========================================================================== */
	.auth-column {
		display: flex;
		flex-direction: column;
		gap: 14px;
	}
	.auth-card {
		background: #ffffff;
		border: 1px solid rgba(10, 22, 40, 0.09);
		border-radius: 28px;
		padding: 36px 32px;
		box-shadow: 0 25px 50px -15px rgba(10, 22, 40, 0.07);
	}

	.auth-header {
		margin-bottom: 22px;
	}
	.admin-pill-badge {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		font-size: 10.5px;
		font-weight: 800;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: #2563eb;
		background: #eff6ff;
		border: 1px solid #dbeafe;
		padding: 3px 9px;
		border-radius: 9999px;
		margin-bottom: 10px;
	}
	:global(.sparkle-blue) {
		color: #2563eb;
	}
	.auth-title {
		font-size: 25px;
		font-weight: 800;
		color: #0a1628;
		letter-spacing: -0.03em;
		margin: 0 0 6px;
	}
	.auth-subtitle {
		font-size: 13px;
		line-height: 1.5;
		color: #64748b;
		margin: 0;
	}

	/* Alert Box */
	.alert-box {
		display: flex;
		align-items: flex-start;
		gap: 10px;
		background: #fef2f2;
		border: 1px solid #fecaca;
		color: #b91c1c;
		padding: 11px 13px;
		border-radius: 12px;
		font-size: 12.5px;
		margin-bottom: 18px;
		line-height: 1.45;
	}
	:global(.alert-icon) {
		color: #dc2626;
		flex-shrink: 0;
		margin-top: 1px;
	}

	/* Form */
	.auth-form {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}
	.form-group {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}
	.form-group label {
		font-size: 12.5px;
		font-weight: 700;
		color: #0a1628;
	}
	.label-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.forgot-link {
		font-size: 12px;
		font-weight: 600;
		color: #2563eb;
		text-decoration: none;
		transition: color 0.15s ease;
	}
	.forgot-link:hover {
		color: #1d4ed8;
		text-decoration: underline;
	}

	.input-shell {
		position: relative;
		display: flex;
		align-items: center;
	}
	:global(.field-icon) {
		position: absolute;
		left: 14px;
		color: #94a3b8;
		pointer-events: none;
		transition: color 0.2s ease;
	}
	.input-shell:focus-within :global(.field-icon) {
		color: #2563eb;
	}

	.text-input {
		width: 100%;
		padding: 11px 14px 11px 40px;
		background: #ffffff;
		border: 1px solid rgba(10, 22, 40, 0.15);
		border-radius: 12px;
		font-size: 13.5px;
		color: #0a1628;
		outline: none;
		transition: all 0.2s ease;
		font-family: inherit;
	}
	.text-input:focus {
		border-color: #2563eb;
		box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.12);
	}
	.text-input.has-action {
		padding-right: 42px;
	}

	.password-toggle {
		position: absolute;
		right: 12px;
		background: transparent;
		border: none;
		color: #94a3b8;
		cursor: pointer;
		padding: 4px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 6px;
		transition: color 0.15s ease;
	}
	.password-toggle:hover {
		color: #0a1628;
	}

	/* Remember Me Option */
	.options-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.remember-label {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		cursor: pointer;
		user-select: none;
	}
	.real-checkbox {
		position: absolute;
		opacity: 0;
		pointer-events: none;
	}
	.custom-checkbox {
		width: 16px;
		height: 16px;
		border-radius: 4px;
		border: 1.5px solid rgba(10, 22, 40, 0.25);
		background: #ffffff;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #ffffff;
		transition: all 0.15s ease;
	}
	.custom-checkbox.checked {
		background: #2563eb;
		border-color: #2563eb;
	}
	.remember-text {
		font-size: 12px;
		color: #64748b;
		font-weight: 500;
	}

	/* Demo Account Box */
	.demo-box {
		background: #f8fafc;
		border: 1px solid rgba(10, 22, 40, 0.08);
		border-radius: 12px;
		padding: 10px 14px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 12px;
	}
	.demo-head {
		display: flex;
		align-items: center;
		gap: 5px;
		font-size: 11px;
		font-weight: 700;
		color: #2563eb;
	}
	:global(.demo-star) {
		color: #f59e0b;
	}
	.demo-creds {
		font-size: 11.5px;
		color: #64748b;
		margin-top: 1px;
	}
	.demo-creds code {
		font-family: ui-monospace, monospace;
		background: rgba(10, 22, 40, 0.06);
		padding: 1px 5px;
		border-radius: 4px;
		color: #0a1628;
		font-weight: 600;
	}
	.demo-fill-btn {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		padding: 6px 12px;
		background: #0a1628;
		border: 1px solid #0a1628;
		color: #ffffff;
		font-size: 11.5px;
		font-weight: 700;
		border-radius: 9999px;
		cursor: pointer;
		transition: all 0.2s ease;
		white-space: nowrap;
	}
	.demo-fill-btn:hover {
		background: #1e293b;
		transform: translateY(-1px);
	}
	:global(.check-green) {
		color: #10b981;
	}

	/* Submit Button matching Let's Talk button */
	.submit-pill-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		padding: 13px 22px;
		background: #0a1628;
		border: 1px solid #0a1628;
		border-radius: 9999px;
		font-size: 14px;
		font-weight: 700;
		color: #ffffff;
		cursor: pointer;
		transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
		box-shadow: 0 4px 16px rgba(10, 22, 40, 0.2);
		margin-top: 2px;
		font-family: inherit;
	}
	.submit-pill-btn:hover:not(:disabled) {
		background: #1e293b;
		transform: translateY(-2px);
		box-shadow: 0 8px 24px rgba(10, 22, 40, 0.3);
	}
	.submit-pill-btn:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}
	.btn-spinner {
		width: 15px;
		height: 15px;
		border: 2px solid rgba(255, 255, 255, 0.3);
		border-top-color: #ffffff;
		border-radius: 50%;
		animation: spin 0.8s linear infinite;
	}
	@keyframes spin {
		to { transform: rotate(360deg); }
	}

	.auth-security-footer {
		display: flex;
		align-items: center;
		gap: 7px;
		font-size: 11.5px;
		font-weight: 500;
		color: #64748b;
		margin-top: 20px;
		padding-top: 16px;
		border-top: 1px solid rgba(10, 22, 40, 0.08);
		justify-content: center;
		text-align: center;
	}
	:global(.sec-icon) {
		color: #10b981;
		flex-shrink: 0;
	}

	.auth-copyright {
		text-align: center;
	}
	.auth-copyright p {
		font-size: 12px;
		color: #94a3b8;
		margin: 0;
	}

	/* ==========================================================================
	   RESPONSIVE DESIGN
	   ========================================================================== */
	@media (max-width: 1024px) {
		.login-grid {
			grid-template-columns: 1fr;
			max-width: 480px;
			gap: 28px;
		}
		.showcase-column {
			display: none;
		}
		.login-header {
			padding: 16px 20px;
		}
	}
</style>
