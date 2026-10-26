<script lang="ts">
  import { authStore } from "$lib/stores/authStore.svelte";
  import { goto } from "$app/navigation";
  import {
    ArrowLeft,
    ArrowUpRight,
    Lock,
    Mail,
    ShieldAlert,
    Eye,
    EyeOff,
    Check,
    ShieldCheck,
  } from "lucide-svelte";

  let email = $state("");
  let password = $state("");
  let rememberMe = $state(true);
  let showPassword = $state(false);
  let errorMsg = $state("");
  let loading = $state(false);

  function handleSubmit(e: Event) {
    e.preventDefault();
    errorMsg = "";
    loading = true;

    setTimeout(() => {
      const res = authStore.login(email, password);
      loading = false;
      if (res.success) {
        goto("/admin");
      } else {
        errorMsg =
          res.message ||
          "Kredensial tidak cocok. Silakan periksa email dan kata sandi Anda.";
      }
    }, 300);
  }
</script>

<svelte:head>
  <title>Masuk Admin CMS — Muhammad Bagiz</title>
</svelte:head>

<div class="login-page">
  <!-- Subtle ambient background elements matching website -->
  <div class="bg-diagonal-line"></div>
  <div class="ambient-glow glow-1"></div>
  <div class="ambient-glow glow-2"></div>

  <!-- Centered Modal Card -->
  <div class="modal-wrapper">
    <!-- Top Back Link -->
    <div class="top-nav">
      baghiz
      <a href="/" class="back-link">
        <ArrowLeft size={14} />
        <span>Kembali ke Beranda</span>
      </a>
      <div class="online-status">
        <span class="status-dot"></span>
        <span>Online</span>
      </div>
    </div>

    <!-- Card Container -->
    <div class="login-card">
      <!-- Brand Header -->
      <div class="card-header">
        <a href="/" class="logo" title="Portofolio Muhammad Bagiz">
          <span>B</span><span class="logo-accent">a</span><span>giz</span>
        </a>
        <div class="badge-row">
          <span class="studio-badge">Admin Studio</span>
        </div>
        <h1 class="card-title">Masuk ke Panel CMS</h1>
        <p class="card-subtitle">
          Masukkan kredensial Anda untuk mengelola katalog karya, pengalaman,
          dan keahlian portofolio.
        </p>
      </div>

      <!-- Error Alert -->baghiz
      {#if errorMsg}
        <div class="alert-box" role="alert">
          <ShieldAlert size={16} class="alert-icon" />
          <div class="alert-text">{errorMsg}</div>
        </div>
      {/if}

      <!-- Form -->
      <form onsubmit={handleSubmit} class="login-form">
        <!-- Email Field -->
        <div class="form-group">
          <label for="admin-email">Alamat Email</label>
          <div class="input-shell">
            <Mail size={16} class="field-icon" />
            <input
              id="admin-email"
              name="username"
              type="email"
              class="text-input"
              placeholder="nama@email.com"
              bind:value={email}
              autocomplete="username"
              enterkeyhint="next"
              required
            />
          </div>
        </div>

        <!-- Password Field -->
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
              type={showPassword ? "text" : "password"}
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
              title={showPassword
                ? "Sembunyikan kata sandi"
                : "Tampilkan kata sandi"}
              aria-label={showPassword
                ? "Sembunyikan kata sandi"
                : "Tampilkan kata sandi"}
            >
              {#if showPassword}
                <EyeOff size={16} />
              {:else}
                <Eye size={16} />
              {/if}
            </button>
          </div>
        </div>

        <!-- Remember Me -->
        <div class="options-row">
          <label class="remember-label">
            <input
              type="checkbox"
              bind:checked={rememberMe}
              class="real-checkbox"
            />
            <span class="custom-checkbox" class:checked={rememberMe}>
              {#if rememberMe}
                <Check size={11} strokeWidth={3} />
              {/if}
            </span>
            <span class="remember-text">Ingat sesi di perangkat ini</span>
          </label>
        </div>

        <!-- Primary CTA Button (matches Let's Talk button on website) -->
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
      <div class="card-footer-sec">
        <ShieldCheck size={14} class="sec-icon" />
        <span>Koneksi Sesi Terenkripsi • Data Tersimpan Aman</span>
      </div>
    </div>

    <!-- Bottom Copyright -->
    <div class="page-footer">
      <p>© 2026 Muhammad Bagiz. Lead UX/UI Designer & Business Strategist.</p>
    </div>
  </div>
</div>

<style>
  /* ==========================================================================
	   CLEAN CENTERED MODAL LAYOUT — LIGHT THEME HARMONIZED WITH WEBSITE
	   ========================================================================== */
  .login-page {
    min-height: 100vh;
    background-color: #f8fafc;
    font-family:
      "Plus Jbaghiza Sans",
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      Roboto,
      sans-serif;
    color: #0a1628;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 32px 20px;
    position: relative;
    overflow-x: hidden;
  }

  /* Subtle background accents */
  .bg-diagonal-line {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 50% 20%, #ffffff 0%, #f1f5f9 100%);
    pointer-events: none;
    z-index: 0;
  }

  .ambient-glow {
    position: absolute;
    border-radius: 50%;
    filter: blur(100px);
    pointer-events: none;
    z-index: 0;
  }
  .glow-1 {
    top: 10%;
    left: 20%;
    width: 400px;
    height: 400px;
    background: radial-gradient(
      circle,
      rgba(37, 99, 235, 0.06) 0%,
      transparent 70%
    );
  }
  .glow-2 {
    bottom: 10%;
    right: 20%;
    width: 450px;
    height: 450px;
    background: radial-gradient(
      circle,
      rgba(14, 165, 233, 0.05) 0%,
      transparent 70%
    );
  }

  /* Wrapper */
  .modal-wrapper {
    width: 100%;
    max-width: 440px;
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  /* Top Nav Bar */
  .top-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 4px;
  }
  .back-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    font-weight: 600;
    color: #64748b;
    text-decoration: none;
    padding: 6px 14px;
    background: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(10, 22, 40, 0.08);
    border-radius: 9999px;
    transition: all 0.2s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
  }
  .back-link:hover {
    color: #0a1628;
    background: #ffffff;
    border-color: rgba(10, 22, 40, 0.15);
    transform: translateX(-2px);
  }
  .online-status {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    font-weight: 600;
    color: #059669;
    background: #ecfdf5;
    border: 1px solid #d1fae5;
    padding: 4px 10px;
    border-radius: 9999px;
  }
  .status-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #10b981;
    box-shadow: 0 0 6px #10b981;
  }

  /* The Centered Login Card */
  .login-card {
    background: #ffffff;
    border: 1px solid rgba(10, 22, 40, 0.09);
    border-radius: 28px;
    padding: 38px 34px;
    box-shadow:
      0 20px 45px -15px rgba(10, 22, 40, 0.08),
      0 0 1px rgba(10, 22, 40, 0.1);
  }

  /* Card Header */
  .card-header {
    text-align: center;
    margin-bottom: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .logo {
    font-family: "Plus Jakarta Sans", sans-serif;
    font-size: 30px;
    font-weight: 800;
    color: #0a1628;
    text-decoration: none;
    letter-spacing: -0.03em;
    display: inline-flex;
    align-items: center;
    margin-bottom: 8px;
  }
  .logo-accent {
    color: #2563eb;
  }
  .badge-row {
    margin-bottom: 12px;
  }
  .studio-badge {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #2563eb;
    background: #eff6ff;
    border: 1px solid #dbeafe;
    padding: 3px 10px;
    border-radius: 9999px;
  }
  .card-title {
    font-size: 24px;
    font-weight: 800;
    color: #0a1628;
    letter-spacing: -0.02em;
    margin: 0 0 6px;
  }
  .card-subtitle {
    font-size: 13px;
    line-height: 1.5;
    color: #64748b;
    margin: 0;
    max-width: 340px;
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
  .login-form {
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

  /* Submit Pill Button matching Let's Talk button */
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
    to {
      transform: rotate(360deg);
    }
  }

  /* Footer Security Note */
  .card-footer-sec {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 11.5px;
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

  .page-footer {
    text-align: center;
  }
  .page-footer p {
    font-size: 12px;
    color: #94a3b8;
    margin: 0;
  }

  /* Mobile adjustment */
  @media (max-width: 480px) {
    .login-card {
      padding: 28px 22px;
    }
  }
</style>
