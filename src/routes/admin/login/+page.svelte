<script lang="ts">
	import { authStore } from '$lib/stores/authStore.svelte';
	import { goto } from '$app/navigation';
	import {
		ArrowLeft,
		Lock,
		Mail,
		ShieldAlert,
		ArrowRight,
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
				errorMsg = res.message || 'Kredensial tidak cocok. Silakan coba lagi.';
			}
		}, 400);
	}
</script>

<svelte:head>
	<title>Masuk Admin CMS — Muhammad Bagiz • Lead UX/UI Designer</title>
</svelte:head>

<div class="login-page">
	<!-- Background Ambient Glows -->
	<div class="ambient-glow glow-1"></div>
	<div class="ambient-glow glow-2"></div>
	<div class="ambient-glow glow-3"></div>
	<div class="grid-overlay"></div>

	<div class="login-layout">
		<!-- LEFT SIDE: Showcase & Executive Brand Overview (Desktop) -->
		<aside class="showcase-side">
			<div class="showcase-content">
				<!-- Brand Badge Header -->
				<div class="showcase-brand">
					<div class="brand-monogram">
						<span>MB</span>
						<span class="pulse-dot"></span>
					</div>
					<div class="brand-info">
						<div class="brand-badge-row">
							<span class="role-badge">Admin Studio</span>
							<span class="version-pill">v2.5</span>
						</div>
						<h2 class="brand-name">Muhammad Bagiz</h2>
						<p class="brand-tagline">Lead UX/UI Designer & Business Strategist</p>
					</div>
				</div>

				<!-- Live Preview Interactive Card -->
				<div class="showcase-card">
					<div class="card-glass-header">
						<div class="card-title-group">
							<span class="card-eyebrow">PORTAL KENDALI UTAMA</span>
							<h3 class="card-headline">Portofolio & Studi Kasus Terintegrasi</h3>
						</div>
						<span class="status-live">
							<span class="live-indicator"></span>
							Online
						</span>
					</div>

					<p class="card-description">
						Kelola katalog proyek desain, riwayat pengalaman strategis, matriks keahlian, dan sinkronisasi instan ke beranda publik.
					</p>

					<!-- Stats Metrics Strip -->
					<div class="metrics-grid">
						<div class="metric-item">
							<span class="metric-val">10+</span>
							<span class="metric-lbl">Tahun Pengalaman</span>
						</div>
						<div class="metric-divider"></div>
						<div class="metric-item">
							<span class="metric-val">60+</span>
							<span class="metric-lbl">Karya Digital</span>
						</div>
						<div class="metric-divider"></div>
						<div class="metric-item">
							<span class="metric-val">100%</span>
							<span class="metric-lbl">Kepuasan Klien</span>
						</div>
					</div>

					<!-- Highlights List -->
					<div class="feature-pills">
						<div class="pill-item">
							<FolderKanban size={13} class="pill-icon" />
							<span>Manajemen Studi Kasus</span>
						</div>
						<div class="pill-item">
							<Briefcase size={13} class="pill-icon" />
							<span>Timeline Pengalaman</span>
						</div>
						<div class="pill-item">
							<Award size={13} class="pill-icon" />
							<span>Matriks Level Keahlian</span>
						</div>
						<div class="pill-item">
							<Zap size={13} class="pill-icon" />
							<span>Live Auto-Sync</span>
						</div>
					</div>
				</div>

				<!-- Designer Philosophy Quote Card -->
				<div class="quote-card">
					<div class="quote-header">
						<Quote size={18} class="quote-icon" />
						<span class="quote-meta">Filosofi Desain</span>
					</div>
					<p class="quote-body">
						"Desain terbaik bukan sekadar tampilan visual estetis, melainkan kejelasan sistematis yang memecahkan masalah nyata dan mendorong pertumbuhan bisnis."
					</p>
					<div class="quote-author">
						<div class="author-avatar">MB</div>
						<div>
							<div class="author-name">Muhammad Bagiz</div>
							<div class="author-sub">Jakarta & Global • Senior Design Practitioner</div>
						</div>
					</div>
				</div>

				<!-- Security Note Bottom -->
				<div class="showcase-security">
					<ShieldCheck size={14} class="sec-icon" />
					<span>Dilindungi dengan otentikasi sesi lokal & enkripsi browser.</span>
				</div>
			</div>
		</aside>

		<!-- RIGHT SIDE: Modern Clean Login Form -->
		<main class="form-side">
			<div class="form-container">
				<!-- Top Bar: Back to Portfolio & Status -->
				<div class="form-topbar">
					<a href="/" class="back-link">
						<ArrowLeft size={14} />
						<span>Kembali ke Beranda</span>
					</a>
					<div class="system-status">
						<span class="system-dot"></span>
						<span>Sistem Aktif</span>
					</div>
				</div>

				<!-- Main Card Form -->
				<div class="auth-card">
					<!-- Card Header -->
					<div class="auth-card-header">
						<div class="mobile-monogram">
							<span>MB</span>
							<span class="mobile-pulse"></span>
						</div>
						<h1 class="auth-title">Masuk ke Panel CMS</h1>
						<p class="auth-subtitle">
							Akses dashboard manajemen untuk mengelola portofolio, karya pilihan, dan pengalaman kerja.
						</p>
					</div>

					<!-- Error Alert -->
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
							<div class="input-wrapper">
								<Mail size={16} class="input-icon" />
								<input
									id="admin-email"
									name="username"
									type="email"
									class="auth-input"
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
							<div class="input-wrapper">
								<Lock size={16} class="input-icon" />
								<input
									id="admin-password"
									name="current-password"
									type={showPassword ? 'text' : 'password'}
									class="auth-input has-action"
									placeholder="••••••••"
									bind:value={password}
									autocomplete="current-password"
									enterkeyhint="done"
									required
								/>
								<button
									type="button"
									class="toggle-action"
									onclick={() => (showPassword = !showPassword)}
									title={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
									aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
								>
									{#if showPassword}
										<EyeOff size={15} />
									{:else}
										<Eye size={15} />
									{/if}
								</button>
							</div>
						</div>

						<!-- Remember me & Quick Access Options -->
						<div class="options-row">
							<label class="remember-label">
								<input type="checkbox" bind:checked={rememberMe} class="remember-checkbox" />
								<span class="custom-checkbox" class:checked={rememberMe}>
									{#if rememberMe}
										<Check size={11} strokeWidth={3} />
									{/if}
								</span>
								<span class="remember-text">Ingat sesi di perangkat ini</span>
							</label>
						</div>

						<!-- Quick Demo Pill -->
						<div class="demo-widget">
							<div class="demo-meta">
								<div class="demo-badge">
									<Sparkles size={12} class="sparkle-icon" />
									<span>Akses Demo Cepat</span>
								</div>
								<div class="demo-credentials">
									<code>admin@bagiz.design</code> • <code>admin123</code>
								</div>
							</div>
							<button
								type="button"
								class="demo-fill-button"
								onclick={fillDemoCredentials}
								title="Otomatis mengisi kredensial demo"
							>
								{#if demoFilled}
									<Check size={13} class="check-icon" />
									<span>Terisi!</span>
								{:else}
									<span>Isi Otomatis</span>
								{/if}
							</button>
						</div>

						<!-- Submit CTA -->
						<button type="submit" class="auth-submit-btn" disabled={loading}>
							{#if loading}
								<span class="btn-spinner"></span>
								<span>Memverifikasi Kredensial...</span>
							{:else}
								<span>Masuk ke Dashboard</span>
								<ArrowRight size={16} />
							{/if}
						</button>
					</form>

					<!-- Bottom Footnote -->
					<div class="auth-footer-note">
						<ShieldCheck size={14} class="sec-mini-icon" />
						<span>Hak Akses Eksklusif Administrator CMS • Muhammad Bagiz</span>
					</div>
				</div>

				<!-- Copyright Footer -->
				<footer class="form-footer">
					<p>© 2026 Muhammad Bagiz. All rights reserved.</p>
				</footer>
			</div>
		</main>
	</div>
</div>

<style>
	/* ==========================================================================
	   CONTAINER & AMBIENT CANVAS
	   ========================================================================== */
	.login-page {
		min-height: 100vh;
		background: #060b14;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0;
		font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
		color: #e2e8f0;
		position: relative;
		overflow-x: hidden;
	}

	.grid-overlay {
		position: absolute;
		inset: 0;
		background-image: radial-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px);
		background-size: 28px 28px;
		pointer-events: none;
		z-index: 1;
	}

	.ambient-glow {
		position: absolute;
		border-radius: 50%;
		filter: blur(140px);
		pointer-events: none;
		z-index: 0;
	}
	.glow-1 {
		top: -10%;
		left: -5%;
		width: 600px;
		height: 600px;
		background: radial-gradient(circle, rgba(37, 99, 235, 0.18) 0%, transparent 70%);
	}
	.glow-2 {
		bottom: -15%;
		right: 5%;
		width: 700px;
		height: 700px;
		background: radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%);
	}
	.glow-3 {
		top: 40%;
		left: 45%;
		width: 450px;
		height: 450px;
		background: radial-gradient(circle, rgba(14, 165, 233, 0.1) 0%, transparent 70%);
	}

	/* ==========================================================================
	   SPLIT SCREEN LAYOUT
	   ========================================================================== */
	.login-layout {
		width: 100%;
		min-height: 100vh;
		display: grid;
		grid-template-columns: 1.15fr 1fr;
		position: relative;
		z-index: 10;
	}

	/* ==========================================================================
	   LEFT SIDE: SHOWCASE / EXECUTIVE BRAND
	   ========================================================================== */
	.showcase-side {
		border-right: 1px solid rgba(255, 255, 255, 0.07);
		background: linear-gradient(160deg, rgba(11, 20, 38, 0.7) 0%, rgba(6, 12, 24, 0.9) 100%);
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 60px 70px;
		position: relative;
	}

	.showcase-content {
		max-width: 560px;
		margin: 0 auto;
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 32px;
	}

	/* Monogram Brand Header */
	.showcase-brand {
		display: flex;
		align-items: center;
		gap: 16px;
	}
	.brand-monogram {
		width: 52px;
		height: 52px;
		border-radius: 14px;
		background: linear-gradient(135deg, #1d4ed8 0%, #4f46e5 100%);
		border: 1px solid rgba(255, 255, 255, 0.2);
		display: flex;
		align-items: center;
		justify-content: center;
		color: #ffffff;
		font-family: 'Outfit', 'Plus Jakarta Sans', sans-serif;
		font-size: 20px;
		font-weight: 800;
		letter-spacing: -0.02em;
		box-shadow: 0 10px 25px -5px rgba(37, 99, 235, 0.4);
		position: relative;
		flex-shrink: 0;
	}
	.pulse-dot {
		position: absolute;
		bottom: -2px;
		right: -2px;
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background: #10b981;
		border: 2px solid #060b14;
		box-shadow: 0 0 8px #10b981;
	}
	.brand-info {
		display: flex;
		flex-direction: column;
	}
	.brand-badge-row {
		display: flex;
		align-items: center;
		gap: 6px;
		margin-bottom: 2px;
	}
	.role-badge {
		font-size: 10.5px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: #93c5fd;
		background: rgba(37, 99, 235, 0.15);
		border: 1px solid rgba(37, 99, 235, 0.25);
		padding: 2px 7px;
		border-radius: 4px;
	}
	.version-pill {
		font-size: 10.5px;
		font-weight: 600;
		color: #64748b;
	}
	.brand-name {
		font-size: 20px;
		font-weight: 800;
		color: #ffffff;
		letter-spacing: -0.02em;
		margin: 0;
	}
	.brand-tagline {
		font-size: 13px;
		color: #94a3b8;
		margin: 0;
	}

	/* Showcase Card */
	.showcase-card {
		background: rgba(15, 26, 48, 0.6);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		border: 1px solid rgba(255, 255, 255, 0.09);
		border-radius: 20px;
		padding: 28px;
		box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.45);
	}
	.card-glass-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 12px;
	}
	.card-eyebrow {
		font-size: 10.5px;
		font-weight: 800;
		letter-spacing: 0.08em;
		color: #38bdf8;
		text-transform: uppercase;
		display: block;
		margin-bottom: 4px;
	}
	.card-headline {
		font-size: 17px;
		font-weight: 700;
		color: #f8fafc;
		margin: 0;
		letter-spacing: -0.01em;
	}
	.status-live {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		font-size: 11.5px;
		font-weight: 600;
		color: #10b981;
		background: rgba(16, 185, 129, 0.1);
		border: 1px solid rgba(16, 185, 129, 0.2);
		padding: 4px 10px;
		border-radius: 20px;
	}
	.live-indicator {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: #10b981;
		box-shadow: 0 0 6px #10b981;
		animation: blink 2s infinite ease-in-out;
	}
	@keyframes blink {
		0%, 100% { opacity: 1; transform: scale(1); }
		50% { opacity: 0.4; transform: scale(0.85); }
	}
	.card-description {
		font-size: 13px;
		line-height: 1.6;
		color: #94a3b8;
		margin: 0 0 20px;
	}

	/* Metrics Strip */
	.metrics-grid {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: rgba(6, 12, 24, 0.55);
		border: 1px solid rgba(255, 255, 255, 0.06);
		border-radius: 14px;
		padding: 14px 20px;
		margin-bottom: 20px;
	}
	.metric-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}
	.metric-val {
		font-size: 19px;
		font-weight: 800;
		color: #ffffff;
		letter-spacing: -0.02em;
		font-family: 'Outfit', sans-serif;
	}
	.metric-lbl {
		font-size: 11px;
		font-weight: 500;
		color: #64748b;
		margin-top: 1px;
	}
	.metric-divider {
		width: 1px;
		height: 28px;
		background: rgba(255, 255, 255, 0.08);
	}

	/* Feature Pills */
	.feature-pills {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 8px;
	}
	.pill-item {
		display: flex;
		align-items: center;
		gap: 8px;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.06);
		padding: 8px 12px;
		border-radius: 8px;
		font-size: 12px;
		font-weight: 600;
		color: #cbd5e1;
	}
	:global(.pill-icon) {
		color: #38bdf8;
		flex-shrink: 0;
	}

	/* Quote Card */
	.quote-card {
		background: linear-gradient(135deg, rgba(37, 99, 235, 0.07) 0%, rgba(79, 70, 229, 0.04) 100%);
		border: 1px solid rgba(99, 102, 241, 0.18);
		border-radius: 16px;
		padding: 20px 24px;
	}
	.quote-header {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-bottom: 10px;
	}
	:global(.quote-icon) {
		color: #60a5fa;
	}
	.quote-meta {
		font-size: 11px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: #93c5fd;
	}
	.quote-body {
		font-size: 13.5px;
		line-height: 1.6;
		color: #e2e8f0;
		font-style: italic;
		margin: 0 0 14px;
	}
	.quote-author {
		display: flex;
		align-items: center;
		gap: 10px;
	}
	.author-avatar {
		width: 32px;
		height: 32px;
		border-radius: 50%;
		background: #1e293b;
		border: 1px solid rgba(255, 255, 255, 0.15);
		color: #60a5fa;
		font-size: 11px;
		font-weight: 700;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.author-name {
		font-size: 12.5px;
		font-weight: 700;
		color: #ffffff;
	}
	.author-sub {
		font-size: 11px;
		color: #64748b;
	}

	/* Showcase Security */
	.showcase-security {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 12px;
		color: #64748b;
	}
	:global(.sec-icon) {
		color: #10b981;
		flex-shrink: 0;
	}

	/* ==========================================================================
	   RIGHT SIDE: FORM SIDE
	   ========================================================================== */
	.form-side {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 40px 30px;
		position: relative;
	}

	.form-container {
		width: 100%;
		max-width: 440px;
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	/* Top Bar */
	.form-topbar {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.back-link {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		font-size: 12.5px;
		font-weight: 600;
		color: #94a3b8;
		text-decoration: none;
		padding: 7px 12px;
		border-radius: 8px;
		background: rgba(255, 255, 255, 0.04);
		border: 1px solid rgba(255, 255, 255, 0.08);
		transition: all 0.2s ease;
	}
	.back-link:hover {
		color: #ffffff;
		background: rgba(255, 255, 255, 0.08);
		border-color: rgba(255, 255, 255, 0.15);
		transform: translateX(-2px);
	}
	.system-status {
		display: flex;
		align-items: center;
		gap: 6px;
		font-size: 11.5px;
		color: #64748b;
		font-weight: 500;
	}
	.system-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: #10b981;
		box-shadow: 0 0 6px #10b981;
	}

	/* Main Auth Card */
	.auth-card {
		background: rgba(13, 21, 38, 0.85);
		backdrop-filter: blur(28px);
		-webkit-backdrop-filter: blur(28px);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 24px;
		padding: 38px 34px;
		box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.12);
	}

	.auth-card-header {
		margin-bottom: 24px;
	}
	.mobile-monogram {
		display: none;
		width: 44px;
		height: 44px;
		border-radius: 12px;
		background: linear-gradient(135deg, #1d4ed8 0%, #4f46e5 100%);
		align-items: center;
		justify-content: center;
		color: #ffffff;
		font-family: 'Outfit', sans-serif;
		font-size: 18px;
		font-weight: 800;
		position: relative;
		margin-bottom: 16px;
		box-shadow: 0 6px 16px rgba(37, 99, 235, 0.35);
	}
	.mobile-pulse {
		position: absolute;
		bottom: -2px;
		right: -2px;
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background: #10b981;
		border: 2px solid #060b14;
	}
	.auth-title {
		font-size: 22px;
		font-weight: 800;
		color: #ffffff;
		letter-spacing: -0.02em;
		margin: 0 0 6px;
	}
	.auth-subtitle {
		font-size: 13px;
		color: #94a3b8;
		line-height: 1.5;
		margin: 0;
	}

	/* Alert Box */
	.alert-box {
		display: flex;
		align-items: flex-start;
		gap: 10px;
		background: rgba(239, 68, 68, 0.12);
		border: 1px solid rgba(239, 68, 68, 0.3);
		color: #fca5a5;
		padding: 12px 14px;
		border-radius: 12px;
		font-size: 12.5px;
		margin-bottom: 20px;
		line-height: 1.45;
		animation: shake 0.3s ease;
	}
	@keyframes shake {
		0%, 100% { transform: translateX(0); }
		20%, 60% { transform: translateX(-4px); }
		40%, 80% { transform: translateX(4px); }
	}
	:global(.alert-icon) {
		color: #ef4444;
		flex-shrink: 0;
		margin-top: 1px;
	}

	/* Form Elements */
	.auth-form {
		display: flex;
		flex-direction: column;
		gap: 18px;
	}
	.form-group {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}
	.form-group label {
		font-size: 12.5px;
		font-weight: 600;
		color: #cbd5e1;
	}
	.label-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.forgot-link {
		font-size: 12px;
		font-weight: 600;
		color: #60a5fa;
		text-decoration: none;
		transition: color 0.15s ease;
	}
	.forgot-link:hover {
		color: #93c5fd;
		text-decoration: underline;
	}

	.input-wrapper {
		position: relative;
		display: flex;
		align-items: center;
	}
	:global(.input-icon) {
		position: absolute;
		left: 14px;
		color: #64748b;
		pointer-events: none;
		transition: color 0.2s ease;
	}
	.input-wrapper:focus-within :global(.input-icon) {
		color: #3b82f6;
	}

	.auth-input {
		width: 100%;
		padding: 12px 14px 12px 42px;
		background: rgba(4, 9, 20, 0.65);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 12px;
		font-size: 13.5px;
		color: #ffffff;
		outline: none;
		transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
		font-family: inherit;
	}
	.auth-input:focus {
		border-color: #3b82f6;
		background: rgba(4, 9, 20, 0.95);
		box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.25);
	}
	.auth-input.has-action {
		padding-right: 44px;
	}

	.toggle-action {
		position: absolute;
		right: 12px;
		background: transparent;
		border: none;
		color: #64748b;
		cursor: pointer;
		padding: 4px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 6px;
		transition: color 0.15s ease, background 0.15s ease;
	}
	.toggle-action:hover {
		color: #cbd5e1;
		background: rgba(255, 255, 255, 0.05);
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
	.remember-checkbox {
		position: absolute;
		opacity: 0;
		pointer-events: none;
	}
	.custom-checkbox {
		width: 16px;
		height: 16px;
		border-radius: 4px;
		border: 1px solid rgba(255, 255, 255, 0.2);
		background: rgba(0, 0, 0, 0.3);
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
		color: #94a3b8;
		font-weight: 500;
	}

	/* Quick Demo Pill */
	.demo-widget {
		background: linear-gradient(135deg, rgba(37, 99, 235, 0.09) 0%, rgba(99, 102, 241, 0.05) 100%);
		border: 1px solid rgba(59, 130, 246, 0.25);
		border-radius: 12px;
		padding: 12px 14px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 12px;
	}
	.demo-meta {
		display: flex;
		flex-direction: column;
		gap: 3px;
	}
	.demo-badge {
		display: flex;
		align-items: center;
		gap: 5px;
		font-size: 11.5px;
		font-weight: 700;
		color: #93c5fd;
	}
	:global(.sparkle-icon) {
		color: #fbbf24;
	}
	.demo-credentials {
		font-size: 11.5px;
		color: #94a3b8;
	}
	.demo-credentials code {
		font-family: ui-monospace, SFMono-Regular, monospace;
		background: rgba(0, 0, 0, 0.35);
		padding: 1px 5px;
		border-radius: 4px;
		color: #f1f5f9;
		font-size: 11px;
	}
	.demo-fill-button {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		padding: 6px 12px;
		background: rgba(37, 99, 235, 0.2);
		border: 1px solid rgba(59, 130, 246, 0.35);
		color: #dbeafe;
		font-size: 11.5px;
		font-weight: 700;
		border-radius: 8px;
		cursor: pointer;
		transition: all 0.15s ease;
		white-space: nowrap;
	}
	.demo-fill-button:hover {
		background: #2563eb;
		color: #ffffff;
		border-color: #2563eb;
		transform: translateY(-1px);
	}
	:global(.check-icon) {
		color: #10b981;
	}

	/* Submit Button */
	.auth-submit-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		padding: 13px 20px;
		background: linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #4f46e5 100%);
		border: 1px solid rgba(255, 255, 255, 0.15);
		border-radius: 12px;
		font-size: 14px;
		font-weight: 700;
		color: #ffffff;
		cursor: pointer;
		transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
		box-shadow: 0 4px 18px rgba(37, 99, 235, 0.4);
		margin-top: 4px;
		font-family: inherit;
	}
	.auth-submit-btn:hover:not(:disabled) {
		background: linear-gradient(135deg, #1e40af 0%, #1d4ed8 50%, #4338ca 100%);
		transform: translateY(-1px);
		box-shadow: 0 6px 24px rgba(37, 99, 235, 0.55);
	}
	.auth-submit-btn:disabled {
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

	.auth-footer-note {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 11px;
		color: #64748b;
		margin-top: 24px;
		padding-top: 18px;
		border-top: 1px solid rgba(255, 255, 255, 0.07);
		justify-content: center;
		text-align: center;
	}
	:global(.sec-mini-icon) {
		color: #10b981;
		flex-shrink: 0;
	}

	.form-footer {
		text-align: center;
	}
	.form-footer p {
		font-size: 12px;
		color: #475569;
		margin: 0;
	}

	/* ==========================================================================
	   RESPONSIVE BREAKPOINTS
	   ========================================================================== */
	@media (max-width: 1080px) {
		.login-layout {
			grid-template-columns: 1fr 1fr;
		}
		.showcase-side {
			padding: 40px;
		}
	}

	@media (max-width: 900px) {
		.login-layout {
			grid-template-columns: 1fr;
		}
		.showcase-side {
			display: none;
		}
		.form-side {
			padding: 40px 20px;
			min-height: 100vh;
		}
		.mobile-monogram {
			display: inline-flex;
		}
		.auth-card {
			padding: 30px 24px;
		}
	}
</style>
