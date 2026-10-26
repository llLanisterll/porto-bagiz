<script lang="ts">
	import { authStore } from '$lib/stores/authStore.svelte';
	import {
		ArrowLeft,
		Mail,
		CheckCircle2,
		ShieldAlert,
		ArrowRight,
		KeyRound,
		ShieldCheck,
		Lock,
		Check,
		HelpCircle
	} from 'lucide-svelte';

	let email = $state('admin@bagiz.design');
	let statusMsg = $state('');
	let isError = $state(false);
	let loading = $state(false);

	function handleReset(e: Event) {
		e.preventDefault();
		statusMsg = '';
		isError = false;
		loading = true;

		setTimeout(() => {
			loading = false;
			const res = authStore.requestPasswordReset(email);
			if (res.success) {
				statusMsg = res.message;
				isError = false;
			} else {
				statusMsg = res.message;
				isError = true;
			}
		}, 400);
	}
</script>

<svelte:head>
	<title>Pemulihan Kata Sandi — Muhammad Bagiz • Lead UX/UI Designer</title>
</svelte:head>

<div class="reset-page">
	<!-- Background Ambient Glows -->
	<div class="ambient-glow glow-1"></div>
	<div class="ambient-glow glow-2"></div>
	<div class="ambient-glow glow-3"></div>
	<div class="grid-overlay"></div>

	<div class="reset-layout">
		<!-- LEFT SIDE: Showcase & Security Guide -->
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
							<span class="role-badge">Pusat Keamanan</span>
							<span class="version-pill">v2.5</span>
						</div>
						<h2 class="brand-name">Muhammad Bagiz</h2>
						<p class="brand-tagline">Lead UX/UI Designer & Business Strategist</p>
					</div>
				</div>

				<!-- Instructions Card -->
				<div class="showcase-card">
					<div class="card-glass-header">
						<div class="card-title-group">
							<span class="card-eyebrow">PROTOKOL PEMULIHAN AKUN</span>
							<h3 class="card-headline">Langkah Reset Kata Sandi</h3>
						</div>
					</div>

					<p class="card-description">
						Ikuti petunjuk sistem berikut untuk mendapatkan kembali akses penuh ke panel CMS manajemen portofolio Anda.
					</p>

					<!-- Steps List -->
					<div class="steps-list">
						<div class="step-item">
							<div class="step-num">1</div>
							<div class="step-text">
								<strong>Masukkan Alamat Email</strong>
								<span>Gunakan email yang terdaftar pada akun administrator Anda.</span>
							</div>
						</div>
						<div class="step-item">
							<div class="step-num">2</div>
							<div class="step-text">
								<strong>Periksa Tautan Pemulihan</strong>
								<span>Instruksi verifikasi dan tautan reset akan dikirimkan ke kotak masuk.</span>
							</div>
						</div>
						<div class="step-item">
							<div class="step-num">3</div>
							<div class="step-text">
								<strong>Buat Kata Sandi Baru</strong>
								<span>Atur kata sandi baru yang kuat (minimal 6 karakter kombinasi).</span>
							</div>
						</div>
					</div>
				</div>

				<!-- Quick Demo Reminder -->
				<div class="info-card">
					<div class="info-header">
						<HelpCircle size={16} class="info-icon" />
						<span class="info-title">Butuh Akses Cepat Mode Demo?</span>
					</div>
					<p class="info-body">
						Untuk keperluan pratinjau dan pengujian lokal, Anda dapat langsung masuk menggunakan akun demo bawaan:
						<code>admin@bagiz.design</code> dengan sandi <code>admin123</code>.
					</p>
					<a href="/admin/login" class="info-link">
						<span>Buka Halaman Masuk Demo</span>
						<ArrowRight size={13} />
					</a>
				</div>

				<!-- Security Note Bottom -->
				<div class="showcase-security">
					<ShieldCheck size={14} class="sec-icon" />
					<span>Tautan pemulihan memiliki masa berlaku aktif selama 60 menit.</span>
				</div>
			</div>
		</aside>

		<!-- RIGHT SIDE: Modern Clean Reset Form -->
		<main class="form-side">
			<div class="form-container">
				<!-- Top Bar: Back to Login -->
				<div class="form-topbar">
					<a href="/admin/login" class="back-link">
						<ArrowLeft size={14} />
						<span>Kembali ke Halaman Masuk</span>
					</a>
				</div>

				<!-- Main Card Form -->
				<div class="auth-card">
					<!-- Card Header -->
					<div class="auth-card-header">
						<div class="key-monogram">
							<KeyRound size={22} />
						</div>
						<h1 class="auth-title">Atur Ulang Sandi</h1>
						<p class="auth-subtitle">
							Masukkan alamat email Anda untuk menerima instruksi pemulihan kata sandi.
						</p>
					</div>

					<!-- Status Alert -->
					{#if statusMsg}
						<div class={isError ? 'alert-box error' : 'alert-box success'} role="alert">
							{#if isError}
								<ShieldAlert size={16} class="alert-icon" />
							{:else}
								<CheckCircle2 size={16} class="alert-icon" />
							{/if}
							<div class="alert-text">{statusMsg}</div>
						</div>
					{/if}

					<!-- Form -->
					<form onsubmit={handleReset} class="auth-form">
						<!-- Email Input -->
						<div class="form-group">
							<label for="reset-email">Alamat Email Terdaftar</label>
							<div class="input-wrapper">
								<Mail size={16} class="input-icon" />
								<input
									id="reset-email"
									type="email"
									class="auth-input"
									placeholder="admin@bagiz.design"
									bind:value={email}
									autocomplete="email"
									enterkeyhint="done"
									required
								/>
							</div>
						</div>

						<!-- Submit CTA -->
						<button type="submit" class="auth-submit-btn" disabled={loading}>
							{#if loading}
								<span class="btn-spinner"></span>
								<span>Mengirim Instruksi...</span>
							{:else}
								<span>Kirim Tautan Pemulihan</span>
								<ArrowRight size={16} />
							{/if}
						</button>
					</form>

					<!-- Bottom Footnote -->
					<div class="auth-footer-note">
						<Lock size={13} class="sec-mini-icon" />
						<span>Proses pemulihan dilindungi enkripsi aman.</span>
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
	.reset-page {
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
	.reset-layout {
		width: 100%;
		min-height: 100vh;
		display: grid;
		grid-template-columns: 1.15fr 1fr;
		position: relative;
		z-index: 10;
	}

	/* ==========================================================================
	   LEFT SIDE: SHOWCASE
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

	.showcase-card {
		background: rgba(15, 26, 48, 0.6);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		border: 1px solid rgba(255, 255, 255, 0.09);
		border-radius: 20px;
		padding: 28px;
		box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.45);
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
	.card-description {
		font-size: 13px;
		line-height: 1.6;
		color: #94a3b8;
		margin: 12px 0 20px;
	}

	.steps-list {
		display: flex;
		flex-direction: column;
		gap: 14px;
	}
	.step-item {
		display: flex;
		align-items: flex-start;
		gap: 12px;
	}
	.step-num {
		width: 26px;
		height: 26px;
		border-radius: 8px;
		background: rgba(37, 99, 235, 0.2);
		border: 1px solid rgba(59, 130, 246, 0.4);
		color: #93c5fd;
		font-size: 12px;
		font-weight: 800;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}
	.step-text {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}
	.step-text strong {
		font-size: 12.5px;
		color: #f1f5f9;
	}
	.step-text span {
		font-size: 12px;
		color: #94a3b8;
		line-height: 1.4;
	}

	.info-card {
		background: linear-gradient(135deg, rgba(37, 99, 235, 0.08) 0%, rgba(99, 102, 241, 0.05) 100%);
		border: 1px solid rgba(99, 102, 241, 0.2);
		border-radius: 16px;
		padding: 20px 24px;
	}
	.info-header {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-bottom: 8px;
	}
	:global(.info-icon) {
		color: #60a5fa;
	}
	.info-title {
		font-size: 12.5px;
		font-weight: 700;
		color: #e2e8f0;
	}
	.info-body {
		font-size: 12.5px;
		line-height: 1.6;
		color: #94a3b8;
		margin: 0 0 12px;
	}
	.info-body code {
		font-family: ui-monospace, monospace;
		background: rgba(0, 0, 0, 0.35);
		padding: 1px 5px;
		border-radius: 4px;
		color: #f1f5f9;
	}
	.info-link {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		font-size: 12px;
		font-weight: 700;
		color: #60a5fa;
		text-decoration: none;
	}
	.info-link:hover {
		color: #93c5fd;
		text-decoration: underline;
	}

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
	   RIGHT SIDE: FORM
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

	.form-topbar {
		display: flex;
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
	.key-monogram {
		width: 46px;
		height: 46px;
		border-radius: 12px;
		background: linear-gradient(135deg, #1d4ed8 0%, #4f46e5 100%);
		display: flex;
		align-items: center;
		justify-content: center;
		color: #ffffff;
		margin-bottom: 16px;
		box-shadow: 0 6px 18px rgba(37, 99, 235, 0.35);
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

	.alert-box {
		display: flex;
		align-items: flex-start;
		gap: 10px;
		padding: 12px 14px;
		border-radius: 12px;
		font-size: 12.5px;
		margin-bottom: 20px;
		line-height: 1.45;
	}
	.alert-box.error {
		background: rgba(239, 68, 68, 0.12);
		border: 1px solid rgba(239, 68, 68, 0.3);
		color: #fca5a5;
	}
	.alert-box.success {
		background: rgba(16, 185, 129, 0.12);
		border: 1px solid rgba(16, 185, 129, 0.3);
		color: #6ee7b7;
	}
	:global(.alert-icon) {
		flex-shrink: 0;
		margin-top: 1px;
	}

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

	@media (max-width: 1080px) {
		.reset-layout {
			grid-template-columns: 1fr 1fr;
		}
		.showcase-side {
			padding: 40px;
		}
	}

	@media (max-width: 900px) {
		.reset-layout {
			grid-template-columns: 1fr;
		}
		.showcase-side {
			display: none;
		}
		.form-side {
			padding: 40px 20px;
			min-height: 100vh;
		}
		.auth-card {
			padding: 30px 24px;
		}
	}
</style>
