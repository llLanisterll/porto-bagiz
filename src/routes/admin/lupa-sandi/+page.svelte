<script lang="ts">
  import { authStore } from "$lib/stores/authStore.svelte";
  import {
    ArrowLeft,
    ArrowUpRight,
    Mail,
    CheckCircle2,
    ShieldAlert,
    ShieldCheck,
    Lock,
  } from "lucide-svelte";

  let email = $state("admin@baghiz.design");
  let statusMsg = $state("");
  let isError = $state(false);
  let loading = $state(false);

  function handleReset(e: Event) {
    e.preventDefault();
    statusMsg = "";
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
  <title>Pemulihan Kata Sandi — Muhammad Baghiz</title>
</svelte:head>

<div class="reset-page">
  <!-- Subtle ambient background accents -->
  <div class="bg-diagonal-line"></div>
  <div class="ambient-glow glow-1"></div>
  <div class="ambient-glow glow-2"></div>

  <!-- Centered Modal Card -->
  <div class="modal-wrapper">
    <!-- Top Back Link -->
    <div class="top-nav">
      <a href="/admin/login" class="back-link">
        <ArrowLeft size={14} />
        <span>Kembali ke Halaman Masuk</span>
      </a>
    </div>

    <!-- Card Container -->
    <div class="reset-card">
      <!-- Header -->
      <div class="card-header">
        <a href="/" class="logo" title="Portofolio Muhammad Baghiz">
          <span>B</span><span class="logo-accent">a</span><span>ghiz</span>
        </a>
        <div class="badge-row">
          <span class="security-badge">Pemulihan Akses</span>
        </div>
        <h1 class="card-title">Atur Ulang Kata Sandi</h1>
        <p class="card-subtitle">
          Masukkan alamat email administrator Anda untuk menerima tautan
          instruksi pemulihan.
        </p>
      </div>

      <!-- Status Alert -->
      {#if statusMsg}
        <div
          class={isError ? "alert-box error" : "alert-box success"}
          role="alert"
        >
          {#if isError}
            <ShieldAlert size={16} class="alert-icon" />
          {:else}
            <CheckCircle2 size={16} class="alert-icon" />
          {/if}
          <div class="alert-text">{statusMsg}</div>
        </div>
      {/if}

      <!-- Form -->
      <form onsubmit={handleReset} class="reset-form">
        <div class="form-group">
          <label for="reset-email">Alamat Email Terdaftar</label>
          <div class="input-shell">
            <Mail size={16} class="field-icon" />
            <input
              id="reset-email"
              type="email"
              class="text-input"
              placeholder="admin@baghiz.design"
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

      <!-- Quick Return Helper -->
      <div class="demo-tip-box">
        <span
          >Ingin langsung masuk mode demo? Gunakan <code
            >admin@baghiz.design</code
          >
          / <code>admin123</code> di
          <a href="/admin/login">halaman masuk</a>.</span
        >
      </div>

      <!-- Security Note -->
      <div class="card-footer-sec">
        <ShieldCheck size={14} class="sec-icon" />
        <span>Tautan pemulihan aktif selama 60 menit setelah dikirimkan.</span>
      </div>
    </div>

    <!-- Bottom Copyright -->
    <div class="page-footer">
      <p>© 2026 Muhammad Baghiz. Lead UX/UI Designer & Business Strategist.</p>
    </div>
  </div>
</div>

<style>
  /* ==========================================================================
	   CLEAN CENTERED MODAL LAYOUT — LIGHT THEME HARMONIZED WITH WEBSITE
	   ========================================================================== */
  .reset-page {
    min-height: 100vh;
    background-color: #f8fafc;
    font-family:
      "Plus Jakarta Sans",
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

  .modal-wrapper {
    width: 100%;
    max-width: 440px;
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .top-nav {
    display: flex;
    align-items: center;
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

  .reset-card {
    background: #ffffff;
    border: 1px solid rgba(10, 22, 40, 0.09);
    border-radius: 28px;
    padding: 38px 34px;
    box-shadow:
      0 20px 45px -15px rgba(10, 22, 40, 0.08),
      0 0 1px rgba(10, 22, 40, 0.1);
  }

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
  .security-badge {
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

  .alert-box {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 11px 13px;
    border-radius: 12px;
    font-size: 12.5px;
    margin-bottom: 18px;
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

  .reset-form {
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

  .demo-tip-box {
    background: #f8fafc;
    border: 1px solid rgba(10, 22, 40, 0.08);
    border-radius: 12px;
    padding: 10px 14px;
    font-size: 12px;
    color: #64748b;
    line-height: 1.45;
    margin-top: 14px;
    text-align: center;
  }
  .demo-tip-box code {
    font-family: ui-monospace, monospace;
    background: rgba(10, 22, 40, 0.06);
    padding: 1px 4px;
    border-radius: 4px;
    color: #0a1628;
    font-weight: 600;
  }
  .demo-tip-box a {
    color: #2563eb;
    font-weight: 600;
    text-decoration: underline;
  }

  .card-footer-sec {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 11.5px;
    color: #64748b;
    margin-top: 18px;
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

  @media (max-width: 480px) {
    .reset-card {
      padding: 28px 22px;
    }
  }
</style>
