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
		ShieldCheck
	} from 'lucide-svelte';

	let email = $state('admin@bagiz.design');
	let password = $state('admin123');
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
				goto('/admin/karya');
			} else {
				errorMsg = res.message || 'Kredensial tidak cocok. Silakan coba lagi.';
			}
		}, 400);
	}
</script>

<svelte:head>
	<title>Masuk Admin CMS — Muhammad Bagiz</title>
</svelte:head>

<div class="login-wrapper">
	<!-- Background glow circles -->
	<div class="ambient-glow glow-top"></div>
	<div class="ambient-glow glow-bottom"></div>

	<div class="login-container">
		<header class="login-nav">
			<a href="/" class="back-link">
				<ArrowLeft size={14} />
				<span>Kembali ke Portofolio Publik</span>
			</a>
		</header>

		<main class="login-card">
			<!-- Brand Monogram & Title -->
			<div class="card-brand">
				<div class="brand-monogram">
					<span>B</span>
					<span class="monogram-dot"></span>
				</div>
				<div class="brand-meta">
					<div class="badge-row">
						<span class="brand-badge">Admin Studio</span>
						<span class="version-badge">v2.5</span>
					</div>
					<h1 class="brand-title">Portal Pengelola CMS</h1>
					<p class="brand-desc">Kelola katalog karya, urutan beranda, dan studi kasus desain.</p>
				</div>
			</div>

			{#if errorMsg}
				<div class="alert-box" role="alert">
					<ShieldAlert size={16} class="alert-icon" />
					<div class="alert-text">{errorMsg}</div>
				</div>
			{/if}

			<form onsubmit={handleSubmit} class="login-form">
				<!-- Email Field -->
				<div class="field">
					<label for="admin-email">Alamat Email Administrator</label>
					<div class="input-shell">
						<Mail size={15} class="field-icon" />
						<input
							id="admin-email"
							type="email"
							class="text-input"
							placeholder="admin@bagiz.design"
							bind:value={email}
							autocomplete="email"
							required
						/>
					</div>
				</div>

				<!-- Password Field -->
				<div class="field">
					<div class="field-header">
						<label for="admin-password">Kata Sandi</label>
						<a href="/admin/lupa-sandi" class="forgot-link">Lupa sandi?</a>
					</div>
					<div class="input-shell">
						<Lock size={15} class="field-icon" />
						<input
							id="admin-password"
							type={showPassword ? 'text' : 'password'}
							class="text-input has-action"
							placeholder="••••••••"
							bind:value={password}
							autocomplete="current-password"
							required
						/>
						<button
							type="button"
							class="toggle-btn"
							onclick={() => (showPassword = !showPassword)}
							title={showPassword ? 'Sembunyikan sandi' : 'Tampilkan sandi'}
							aria-label={showPassword ? 'Sembunyikan sandi' : 'Tampilkan sandi'}
						>
							{#if showPassword}
								<EyeOff size={14} />
							{:else}
								<Eye size={14} />
							{/if}
						</button>
					</div>
				</div>

				<!-- Quick Demo Credentials Box -->
				<div class="demo-strip">
					<div class="demo-info">
						<div class="demo-title">
							<Sparkles size={13} class="sparkle-icon" />
							<span>Akun Demo Cepat</span>
						</div>
						<div class="demo-creds">
							<code>admin@bagiz.design</code> / <code>admin123</code>
						</div>
					</div>
					<button
						type="button"
						class="demo-fill-btn"
						onclick={fillDemoCredentials}
					>
						{#if demoFilled}
							<Check size={13} />
							<span>Terisi!</span>
						{:else}
							<span>Isi Otomatis</span>
						{/if}
					</button>
				</div>

				<!-- Submit Button -->
				<button type="submit" class="submit-btn" disabled={loading}>
					{#if loading}
						<span class="btn-spinner"></span>
						<span>Memverifikasi Kredensial...</span>
					{:else}
						<span>Masuk ke Panel CMS</span>
						<ArrowRight size={15} />
					{/if}
				</button>
			</form>

			<div class="card-security-note">
				<ShieldCheck size={14} class="sec-icon" />
				<span>Sesi terlindungi & data disimpan secara lokal pada browser.</span>
			</div>
		</main>

		<footer class="login-footer">
			<span>Portofolio & CMS Muhammad Bagiz • Lead Product Designer</span>
		</footer>
	</div>
</div>

<style>
	.login-wrapper {
		min-height: 100vh;
		background: #090e17;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 40px 20px;
		font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
		color: #e2e8f0;
		position: relative;
		overflow: hidden;
	}

	/* Ambient Background Glows */
	.ambient-glow {
		position: absolute;
		width: 500px;
		height: 500px;
		border-radius: 50%;
		filter: blur(120px);
		opacity: 0.15;
		pointer-events: none;
	}
	.glow-top {
		top: -150px;
		left: 20%;
		background: #6366f1;
	}
	.glow-bottom {
		bottom: -150px;
		right: 20%;
		background: #0ea5e9;
	}

	.login-container {
		width: 100%;
		max-width: 440px;
		position: relative;
		z-index: 10;
	}

	.login-nav {
		margin-bottom: 20px;
	}
	.back-link {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		font-size: 13px;
		color: #94a3b8;
		text-decoration: none;
		font-weight: 600;
		transition: all 0.2s ease;
		padding: 6px 12px;
		border-radius: 8px;
		background: rgba(255, 255, 255, 0.04);
		border: 1px solid rgba(255, 255, 255, 0.08);
	}
	.back-link:hover {
		color: #ffffff;
		background: rgba(255, 255, 255, 0.08);
		transform: translateX(-2px);
	}

	.login-card {
		background: rgba(15, 23, 42, 0.75);
		backdrop-filter: blur(24px);
		-webkit-backdrop-filter: blur(24px);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 20px;
		padding: 36px 32px;
		box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1);
	}

	/* Brand Header */
	.card-brand {
		display: flex;
		align-items: flex-start;
		gap: 16px;
		margin-bottom: 26px;
	}
	.brand-monogram {
		width: 48px;
		height: 48px;
		border-radius: 14px;
		background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
		color: #ffffff;
		font-size: 22px;
		font-weight: 800;
		font-family: 'Outfit', sans-serif;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		box-shadow: 0 8px 20px rgba(79, 70, 229, 0.35);
		flex-shrink: 0;
	}
	.monogram-dot {
		position: absolute;
		bottom: -2px;
		right: -2px;
		width: 10px;
		height: 10px;
		background: #10b981;
		border: 2px solid #0f172a;
		border-radius: 50%;
	}
	.brand-meta {
		display: flex;
		flex-direction: column;
	}
	.badge-row {
		display: flex;
		gap: 6px;
		margin-bottom: 4px;
	}
	.brand-badge {
		font-size: 10px;
		font-weight: 700;
		color: #a5b4fc;
		background: rgba(99, 102, 241, 0.15);
		padding: 1px 6px;
		border-radius: 4px;
		letter-spacing: 0.04em;
	}
	.version-badge {
		font-size: 10px;
		font-weight: 700;
		color: #64748b;
	}
	.brand-title {
		font-size: 19px;
		font-weight: 800;
		color: #ffffff;
		letter-spacing: -0.02em;
		margin: 0 0 4px;
	}
	.brand-desc {
		font-size: 12.5px;
		color: #94a3b8;
		margin: 0;
		line-height: 1.45;
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
		line-height: 1.4;
	}
	:global(.alert-icon) {
		color: #ef4444;
		flex-shrink: 0;
		margin-top: 1px;
	}

	/* Form Elements */
	.login-form {
		display: flex;
		flex-direction: column;
		gap: 18px;
	}
	.field {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}
	.field label {
		font-size: 12.5px;
		font-weight: 600;
		color: #cbd5e1;
	}
	.field-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.forgot-link {
		font-size: 12px;
		color: #818cf8;
		text-decoration: none;
		font-weight: 500;
		transition: color 0.15s ease;
	}
	.forgot-link:hover {
		color: #a5b4fc;
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
		color: #64748b;
		pointer-events: none;
	}
	.text-input {
		width: 100%;
		padding: 11px 14px 11px 40px;
		background: rgba(2, 6, 23, 0.6);
		border: 1px solid rgba(255, 255, 255, 0.12);
		border-radius: 11px;
		font-size: 13.5px;
		color: #ffffff;
		outline: none;
		transition: all 0.2s ease;
	}
	.text-input:focus {
		border-color: #6366f1;
		box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.25);
		background: rgba(2, 6, 23, 0.85);
	}
	.text-input.has-action {
		padding-right: 42px;
	}

	.toggle-btn {
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
		transition: color 0.15s ease;
	}
	.toggle-btn:hover {
		color: #cbd5e1;
	}

	/* Demo Credentials Box */
	.demo-strip {
		background: rgba(99, 102, 241, 0.08);
		border: 1px solid rgba(99, 102, 241, 0.2);
		border-radius: 12px;
		padding: 12px 14px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 12px;
	}
	.demo-title {
		display: flex;
		align-items: center;
		gap: 5px;
		font-size: 11.5px;
		font-weight: 700;
		color: #a5b4fc;
		margin-bottom: 2px;
	}
	:global(.sparkle-icon) {
		color: #fbbf24;
	}
	.demo-creds {
		font-size: 12px;
		color: #94a3b8;
	}
	.demo-creds code {
		font-family: ui-monospace, monospace;
		background: rgba(0, 0, 0, 0.3);
		padding: 1px 5px;
		border-radius: 4px;
		color: #e2e8f0;
	}
	.demo-fill-btn {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		padding: 6px 12px;
		background: rgba(99, 102, 241, 0.2);
		border: 1px solid rgba(99, 102, 241, 0.4);
		color: #e0e7ff;
		font-size: 11.5px;
		font-weight: 700;
		border-radius: 8px;
		cursor: pointer;
		transition: all 0.15s ease;
		white-space: nowrap;
	}
	.demo-fill-btn:hover {
		background: #4f46e5;
		color: #ffffff;
		border-color: #4f46e5;
	}

	/* Submit Button */
	.submit-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		padding: 12px;
		background: linear-gradient(135deg, #4f46e5 0%, #6366f1 100%);
		border: 1px solid #4f46e5;
		border-radius: 11px;
		font-size: 14px;
		font-weight: 700;
		color: #ffffff;
		cursor: pointer;
		transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
		box-shadow: 0 4px 16px rgba(79, 70, 229, 0.35);
		margin-top: 6px;
	}
	.submit-btn:hover:not(:disabled) {
		background: linear-gradient(135deg, #4338ca 0%, #4f46e5 100%);
		transform: translateY(-1px);
		box-shadow: 0 6px 20px rgba(79, 70, 229, 0.5);
	}
	.submit-btn:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}
	.btn-spinner {
		width: 14px;
		height: 14px;
		border: 2px solid rgba(255, 255, 255, 0.3);
		border-top-color: #ffffff;
		border-radius: 50%;
		animation: spin 0.8s linear infinite;
	}
	@keyframes spin {
		to { transform: rotate(360deg); }
	}

	.card-security-note {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 11.5px;
		color: #64748b;
		margin-top: 24px;
		padding-top: 18px;
		border-top: 1px solid rgba(255, 255, 255, 0.08);
		justify-content: center;
	}
	:global(.sec-icon) {
		color: #10b981;
		flex-shrink: 0;
	}

	.login-footer {
		text-align: center;
		font-size: 12px;
		color: #64748b;
		margin-top: 24px;
	}
</style>
