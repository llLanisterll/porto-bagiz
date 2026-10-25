<script lang="ts">
	import { authStore } from '$lib/stores/authStore.svelte';
	import { ArrowLeft, Mail, CheckCircle2, ShieldAlert, ArrowRight, KeyRound, ShieldCheck } from 'lucide-svelte';

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
	<title>Pemulihan Kata Sandi — Muhammad Bagiz</title>
</svelte:head>

<div class="login-wrapper">
	<!-- Background glow circles -->
	<div class="ambient-glow glow-top"></div>
	<div class="ambient-glow glow-bottom"></div>

	<div class="login-container">
		<header class="login-nav">
			<a href="/admin/login" class="back-link">
				<ArrowLeft size={14} />
				<span>Kembali ke Halaman Masuk</span>
			</a>
		</header>

		<main class="login-card">
			<div class="card-brand">
				<div class="brand-monogram">
					<KeyRound size={22} />
				</div>
				<div class="brand-meta">
					<div class="badge-row">
						<span class="brand-badge">Pemulihan Akses</span>
					</div>
					<h1 class="brand-title">Atur Ulang Kata Sandi</h1>
					<p class="brand-desc">Masukkan alamat email administrator untuk menerima instruksi pemulihan.</p>
				</div>
			</div>

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

			<form onsubmit={handleReset} class="login-form">
				<div class="field">
					<label for="reset-email">Alamat Email Terdaftar</label>
					<div class="input-shell">
						<Mail size={15} class="field-icon" />
						<input
							id="reset-email"
							type="email"
							class="text-input"
							placeholder="admin@bagiz.design"
							bind:value={email}
							autocomplete="email"
							required
						/>
					</div>
				</div>

				<button type="submit" class="submit-btn" disabled={loading}>
					{#if loading}
						<span class="btn-spinner"></span>
						<span>Mengirim Instruksi...</span>
					{:else}
						<span>Kirim Tautan Pemulihan</span>
						<ArrowRight size={15} />
					{/if}
				</button>
			</form>

			<div class="card-security-note">
				<ShieldCheck size={14} class="sec-icon" />
				<span>Tautan pemulihan berlaku selama 60 menit setelah dikirim.</span>
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
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 8px 20px rgba(79, 70, 229, 0.35);
		flex-shrink: 0;
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

	.alert-box {
		display: flex;
		align-items: flex-start;
		gap: 10px;
		padding: 12px 14px;
		border-radius: 12px;
		font-size: 12.5px;
		margin-bottom: 20px;
		line-height: 1.4;
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
