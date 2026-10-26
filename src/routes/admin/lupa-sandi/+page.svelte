<script lang="ts">
	import { authStore } from '$lib/stores/authStore.svelte';
	import { mockProfile } from '$lib/data/mockPortfolio';
	import {
		ArrowUpRight,
		ArrowLeft,
		Mail,
		CheckCircle2,
		ShieldAlert,
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
	<!-- Background Design Elements matching website hero -->
	<div class="bg-diagonal-line"></div>
	<div class="bg-ambient-blob blob-1"></div>
	<div class="bg-ambient-blob blob-2"></div>

	<!-- Top Navigation Header matching website Navbar -->
	<header class="reset-header">
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
				<a href="/admin/login" class="back-pill-btn">
					<ArrowLeft size={15} />
					<span>Kembali ke Halaman Masuk</span>
				</a>
			</div>
		</div>
	</header>

	<!-- Main Container -->
	<main class="reset-main">
		<div class="reset-grid">
			<!-- LEFT COLUMN: Recovery Instructions & Profile -->
			<section class="showcase-column">
				<div class="showcase-card">
					<div class="card-eyebrow">PROTOKOL KEAMANAN</div>
					<h2 class="card-title">Pemulihan Akses Administrator</h2>
					<p class="card-desc">
						Ikuti 3 tahapan verifikasi berikut untuk mengembalikan hak akses pengelolaan portofolio Anda.
					</p>

					<!-- Steps List -->
					<div class="steps-wrapper">
						<div class="step-card">
							<div class="step-badge">1</div>
							<div class="step-content">
								<strong>Kirim Permintaan Reset</strong>
								<p>Masukkan alamat email administrator yang terdaftar pada sistem.</p>
							</div>
						</div>
						<div class="step-card">
							<div class="step-badge">2</div>
							<div class="step-content">
								<strong>Verifikasi Tautan</strong>
								<p>Sistem akan mengirimkan tautan pemulihan aman ke kotak masuk Anda.</p>
							</div>
						</div>
						<div class="step-card">
							<div class="step-badge">3</div>
							<div class="step-content">
								<strong>Atur Sandi Baru</strong>
								<p>Buat kata sandi baru yang kuat dengan minimal 6 karakter kombinasi.</p>
							</div>
						</div>
					</div>

					<!-- Demo Help Box -->
					<div class="demo-reminder-box">
						<div class="reminder-head">
							<HelpCircle size={16} class="help-icon" />
							<span>Butuh Masuk Cepat Saat Pengujian?</span>
						</div>
						<p class="reminder-text">
							Untuk pratinjau lokal, Anda dapat langsung masuk tanpa reset menggunakan akun demo:
							<code>admin@bagiz.design</code> / <code>admin123</code>.
						</p>
						<a href="/admin/login" class="reminder-action">
							<span>Gunakan Login Demo</span>
							<ArrowUpRight size={14} />
						</a>
					</div>
				</div>
			</section>

			<!-- RIGHT COLUMN: Reset Form Card -->
			<section class="auth-column">
				<div class="auth-card">
					<div class="auth-header">
						<div class="icon-capsule">
							<KeyRound size={22} />
						</div>
						<h1 class="auth-title">Atur Ulang Sandi</h1>
						<p class="auth-subtitle">
							Masukkan alamat email Anda untuk menerima tautan instruksi pemulihan kata sandi.
						</p>
					</div>

					<!-- Alert Message -->
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
						<div class="form-group">
							<label for="reset-email">Alamat Email Terdaftar</label>
							<div class="input-shell">
								<Mail size={16} class="field-icon" />
								<input
									id="reset-email"
									type="email"
									class="text-input"
									placeholder="admin@bagiz.design"
									bind:value={email}
									autocomplete="email"
									enterkeyhint="done"
									required
								/>
							</div>
						</div>

						<button type="submit" class="submit-pill-btn" disabled={loading}>
							{#if loading}
								<span class="btn-spinner"></span>
								<span>Mengirim Instruksi...</span>
							{:else}
								<span>Kirim Tautan Pemulihan</span>
								<ArrowUpRight size={17} />
							{/if}
						</button>
					</form>

					<div class="auth-security-footer">
						<ShieldCheck size={15} class="sec-icon" />
						<span>Tautan pemulihan memiliki masa aktif 60 menit setelah dikirim.</span>
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
	.reset-page {
		min-height: 100vh;
		background-color: #ffffff;
		font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
		color: #0a1628;
		position: relative;
		overflow-x: hidden;
		display: flex;
		flex-direction: column;
	}

	.bg-diagonal-line {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(135deg, rgba(248, 250, 252, 0.9) 0%, rgba(241, 245, 249, 0.4) 100%);
		pointer-events: none;
		z-index: 0;
	}

	.bg-ambient-blob {
		position: absolute;
		border-radius: 50%;
		filter: blur(100px);
		pointer-events: none;
		z-index: 0;
	}
	.blob-1 {
		top: -100px;
		right: 10%;
		width: 450px;
		height: 450px;
		background: radial-gradient(circle, rgba(37, 99, 235, 0.08) 0%, transparent 70%);
	}
	.blob-2 {
		bottom: -100px;
		left: 5%;
		width: 500px;
		height: 500px;
		background: radial-gradient(circle, rgba(14, 165, 233, 0.06) 0%, transparent 70%);
	}

	/* Header */
	.reset-header {
		position: relative;
		z-index: 10;
		padding: 24px 40px;
		background: rgba(255, 255, 255, 0.85);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		border-bottom: 1px solid rgba(10, 22, 40, 0.07);
	}
	.header-inner {
		max-width: 1240px;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.brand-logo {
		display: flex;
		align-items: center;
		gap: 12px;
	}
	.logo-link {
		font-family: 'Plus Jakarta Sans', sans-serif;
		font-size: 28px;
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
	.back-pill-btn {
		display: inline-flex;
		align-items: center;
		gap: 7px;
		font-size: 13px;
		font-weight: 700;
		color: #0a1628;
		text-decoration: none;
		background: #ffffff;
		border: 1px solid rgba(10, 22, 40, 0.15);
		padding: 8px 18px;
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

	/* Main */
	.reset-main {
		flex: 1;
		position: relative;
		z-index: 5;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 40px 24px;
	}
	.reset-grid {
		width: 100%;
		max-width: 1160px;
		display: grid;
		grid-template-columns: 1.05fr 1fr;
		gap: 48px;
		align-items: center;
	}

	/* Showcase */
	.showcase-column {
		display: flex;
		flex-direction: column;
	}
	.showcase-card {
		background: #ffffff;
		border: 1px solid rgba(10, 22, 40, 0.08);
		border-radius: 28px;
		padding: 36px;
		box-shadow: 0 20px 45px -15px rgba(10, 22, 40, 0.06);
		display: flex;
		flex-direction: column;
		gap: 18px;
	}
	.card-eyebrow {
		font-size: 11px;
		font-weight: 800;
		letter-spacing: 0.08em;
		color: #2563eb;
		text-transform: uppercase;
		margin-bottom: 2px;
	}
	.card-title {
		font-size: 24px;
		font-weight: 800;
		color: #0a1628;
		letter-spacing: -0.02em;
		margin: 0;
	}
	.card-desc {
		font-size: 13.5px;
		color: #64748b;
		line-height: 1.6;
		margin: 0;
	}

	.steps-wrapper {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
	.step-card {
		display: flex;
		align-items: flex-start;
		gap: 14px;
		background: #f8fafc;
		border: 1px solid rgba(10, 22, 40, 0.06);
		border-radius: 14px;
		padding: 14px 16px;
	}
	.step-badge {
		width: 28px;
		height: 28px;
		border-radius: 50%;
		background: #eff6ff;
		color: #2563eb;
		border: 1px solid #bfdbfe;
		font-size: 13px;
		font-weight: 800;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}
	.step-content strong {
		display: block;
		font-size: 13px;
		font-weight: 700;
		color: #0a1628;
		margin-bottom: 2px;
	}
	.step-content p {
		font-size: 12px;
		color: #64748b;
		margin: 0;
		line-height: 1.45;
	}

	.demo-reminder-box {
		background: #eff6ff;
		border: 1px solid #dbeafe;
		border-radius: 16px;
		padding: 18px 20px;
	}
	.reminder-head {
		display: flex;
		align-items: center;
		gap: 7px;
		font-size: 12.5px;
		font-weight: 700;
		color: #1e40af;
		margin-bottom: 6px;
	}
	:global(.help-icon) {
		color: #2563eb;
	}
	.reminder-text {
		font-size: 12px;
		line-height: 1.55;
		color: #3b82f6;
		margin: 0 0 10px;
	}
	.reminder-text code {
		font-family: ui-monospace, monospace;
		background: rgba(37, 99, 235, 0.12);
		padding: 1px 5px;
		border-radius: 4px;
		color: #1e3a8a;
		font-weight: 700;
	}
	.reminder-action {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		font-size: 12.5px;
		font-weight: 700;
		color: #1d4ed8;
		text-decoration: none;
	}
	.reminder-action:hover {
		text-decoration: underline;
	}

	/* Auth Column */
	.auth-column {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}
	.auth-card {
		background: #ffffff;
		border: 1px solid rgba(10, 22, 40, 0.09);
		border-radius: 28px;
		padding: 40px 36px;
		box-shadow: 0 25px 50px -15px rgba(10, 22, 40, 0.07);
	}

	.auth-header {
		margin-bottom: 24px;
	}
	.icon-capsule {
		width: 48px;
		height: 48px;
		border-radius: 14px;
		background: #0a1628;
		color: #ffffff;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 14px;
		box-shadow: 0 6px 16px rgba(10, 22, 40, 0.2);
	}
	.auth-title {
		font-size: 26px;
		font-weight: 800;
		color: #0a1628;
		letter-spacing: -0.03em;
		margin: 0 0 8px;
	}
	.auth-subtitle {
		font-size: 13.5px;
		line-height: 1.55;
		color: #64748b;
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
		background: #fef2f2;
		border: 1px solid #fecaca;
		color: #b91c1c;
	}
	.alert-box.success {
		background: #ecfdf5;
		border: 1px solid #a7f3d0;
		color: #065f46;
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
		font-size: 13px;
		font-weight: 700;
		color: #0a1628;
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
		padding: 12px 14px 12px 42px;
		background: #ffffff;
		border: 1px solid rgba(10, 22, 40, 0.15);
		border-radius: 12px;
		font-size: 14px;
		color: #0a1628;
		outline: none;
		transition: all 0.2s ease;
		font-family: inherit;
	}
	.text-input:focus {
		border-color: #2563eb;
		box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.12);
	}

	.submit-pill-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		padding: 14px 24px;
		background: #0a1628;
		border: 1px solid #0a1628;
		border-radius: 9999px;
		font-size: 14.5px;
		font-weight: 700;
		color: #ffffff;
		cursor: pointer;
		transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
		box-shadow: 0 4px 16px rgba(10, 22, 40, 0.2);
		margin-top: 4px;
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
		width: 16px;
		height: 16px;
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
		margin-top: 24px;
		padding-top: 18px;
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

	@media (max-width: 1024px) {
		.reset-grid {
			grid-template-columns: 1fr;
			max-width: 520px;
			gap: 32px;
		}
		.showcase-column {
			display: none;
		}
		.reset-header {
			padding: 18px 20px;
		}
	}
</style>
