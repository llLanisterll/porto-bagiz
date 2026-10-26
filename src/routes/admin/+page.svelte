<script lang="ts">
  import { portfolioStore } from "$lib/stores/portfolioStore.svelte";
  import {
    FolderKanban,
    Briefcase,
    Layers,
    UserCheck,
    MessageSquare,
    ExternalLink,
    Plus,
    ArrowRight,
    Sparkles,
    CheckCircle2,
    Eye,
    Clock,
    Flame,
    Mail,
    RotateCcw,
    Check,
    Tags,
    Download,
    UploadCloud,
    AlertTriangle,
  } from "lucide-svelte";

  // Reset confirmation modal state
  let isResetModalOpen = $state(false);
  let resetSuccess = $state(false);

  // Toast notification
  let toastMessage = $state("");
  let importError = $state("");

  function handleReset() {
    portfolioStore.resetToDefaults();
    isResetModalOpen = false;
    resetSuccess = true;
    setTimeout(() => (resetSuccess = false), 3500);
  }

  // Backup Export & Import Handlers
  let fileInputImport: HTMLInputElement | null = $state(null);

  function handleExportBackup() {
    const jsonString = portfolioStore.exportBackupData();
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const dateStr = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = `backup-portofolio-baghiz-${dateStr}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toastMessage = "File cadangan JSON berhasil diunduh!";
    setTimeout(() => (toastMessage = ""), 3500);
  }

  function handleImportFile(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      const file = target.files[0];
      const reader = new FileReader();
      reader.onload = (evt) => {
        const content = evt.target?.result as string;
        const res = portfolioStore.importBackupData(content);
        if (res.success) {
          toastMessage = res.message;
          setTimeout(() => (toastMessage = ""), 3500);
        } else {
          importError = res.message;
          setTimeout(() => (importError = ""), 4000);
        }
      };
      reader.readAsText(file);
      target.value = "";
    }
  }

  const featuredProjectsCount = $derived(
    portfolioStore.projects.filter((p) => p.isFeatured).length,
  );
  const publishedProjectsCount = $derived(
    portfolioStore.projects.filter((p) => p.isPublished).length,
  );
  const activeCategoriesCount = $derived(
    portfolioStore.categories.filter((c) => c.isActive).length,
  );
  const unreadMessagesCount = $derived(
    portfolioStore.messages.filter((m) => !m.isRead).length,
  );

  const recentMessages = $derived(portfolioStore.messages.slice(0, 3));
</script>

<svelte:head>
  <title>Ringkasan Dashboard — Admin CMS {portfolioStore.profile.name || 'Muhammad Baghiz'}</title>
</svelte:head>

<div class="overview-container">
  {#if toastMessage}
    <div class="alert-banner success">
      <CheckCircle2 size={16} />
      <span>{toastMessage}</span>
    </div>
  {/if}
  {#if importError}
    <div class="alert-banner error">
      <AlertTriangle size={16} />
      <span>{importError}</span>
    </div>
  {/if}
  {#if resetSuccess}
    <div class="alert-banner">
      <CheckCircle2 size={16} />
      <span>Data portofolio berhasil direset ke pengaturan awal bawaan!</span>
    </div>
  {/if}

  <!-- Welcome Hero Card -->
  <section class="welcome-card">
    <div class="welcome-left">
      <div class="welcome-badge">
        <Sparkles size={13} />
        <span>Panel Pengelola Portofolio</span>
      </div>
      <h1 class="welcome-title">
        Selamat Datang, {portfolioStore.profile.name
          ? portfolioStore.profile.name.split(" ")[0]
          : "Baghiz"}
      </h1>
      <p class="welcome-desc">
        Kelola seluruh konten portofolio Anda secara real-time. Setiap
        penambahan atau perubahan konten di sidebar langsung tersinkronisasi dan
        tampil di website publik.
      </p>
      <div class="welcome-actions">
        <a href="/admin/karya" class="btn-primary">
          <Plus size={16} />
          <span>Kelola Karya</span>
        </a>
        <a href="/admin/kategori" class="btn-secondary">
          <Tags size={15} />
          <span>Kategori ({portfolioStore.categories.length})</span>
        </a>
        <a href="/admin/pesan" class="btn-secondary">
          <MessageSquare size={15} />
          <span
            >Kotak Masuk {#if unreadMessagesCount > 0}({unreadMessagesCount} Baru){/if}</span
          >
        </a>
        <button
          class="btn-ghost"
          onclick={handleExportBackup}
          title="Unduh cadangan data lengkap (JSON)"
        >
          <Download size={14} />
          <span>Ekspor JSON</span>
        </button>
        <button
          class="btn-ghost"
          onclick={() => fileInputImport?.click()}
          title="Pulihkan data dari file JSON cadangan"
        >
          <UploadCloud size={14} />
          <span>Impor JSON</span>
        </button>
        <input
          type="file"
          accept=".json,application/json"
          bind:this={fileInputImport}
          style="display: none;"
          onchange={handleImportFile}
        />
        <button class="btn-ghost" onclick={() => (isResetModalOpen = true)}>
          <RotateCcw size={14} />
          <span>Reset Bawaan</span>
        </button>
      </div>
    </div>

    <div class="welcome-right">
      <div class="sync-card">
        <div class="sync-card-header">
          <span class="sync-beacon"></span>
          <span class="sync-status-title">Status Sinkronisasi</span>
        </div>
        <div class="sync-metric-row">
          <span class="sync-metric-label">Website Status</span>
          <span class="sync-metric-val live">Online & Live</span>
        </div>
        <div class="sync-metric-row">
          <span class="sync-metric-label">Penyimpanan</span>
          <span class="sync-metric-val">Browser LocalStorage</span>
        </div>
        <div class="sync-metric-row">
          <span class="sync-metric-label">Versi Arsitektur</span>
          <span class="sync-metric-val">Textio Navy v2.5</span>
        </div>
        <a href="/" target="_blank" rel="noopener" class="sync-preview-link">
          <span>Buka Beranda Publik</span>
          <ExternalLink size={12} />
        </a>
      </div>
    </div>
  </section>

  <!-- KPI Summary Metrics Grid -->
  <section class="kpi-grid">
    <!-- KPI 1: Karya -->
    <a href="/admin/karya" class="kpi-card">
      <div class="kpi-top">
        <div class="kpi-icon-wrap blue">
          <FolderKanban size={20} />
        </div>
        <span class="kpi-tag">{publishedProjectsCount} Terbit</span>
      </div>
      <div class="kpi-number">{portfolioStore.projects.length}</div>
      <div class="kpi-label">Total Karya & Proyek</div>
      <div class="kpi-footer">
        <span>{featuredProjectsCount} Karya Unggulan di Beranda</span>
        <ArrowRight size={14} class="kpi-arrow" />
      </div>
    </a>

    <!-- KPI 2: Master Kategori -->
    <a href="/admin/kategori" class="kpi-card">
      <div class="kpi-top">
        <div class="kpi-icon-wrap indigo">
          <Tags size={20} />
        </div>
        <span class="kpi-tag">{activeCategoriesCount} Aktif</span>
      </div>
      <div class="kpi-number">{portfolioStore.categories.length}</div>
      <div class="kpi-label">Master Kategori</div>
      <div class="kpi-footer">
        <span
          >{portfolioStore.categories.length > 0
            ? portfolioStore.categories
                .map((c) => c.name)
                .slice(0, 2)
                .join(", ")
            : "Belum ada kategori"}</span
        >
        <ArrowRight size={14} class="kpi-arrow" />
      </div>
    </a>

    <!-- KPI 3: Pengalaman -->
    <a href="/admin/pengalaman" class="kpi-card">
      <div class="kpi-top">
        <div class="kpi-icon-wrap emerald">
          <Briefcase size={20} />
        </div>
        <span class="kpi-tag">Karir & Organisasi</span>
      </div>
      <div class="kpi-number">{portfolioStore.experiences.length}</div>
      <div class="kpi-label">Riwayat Pengalaman</div>
      <div class="kpi-footer">
        <span
          >{portfolioStore.experiences.length > 0
            ? `Terkini: ${portfolioStore.experiences[0].role}`
            : "Belum ada data pengalaman"}</span
        >
        <ArrowRight size={14} class="kpi-arrow" />
      </div>
    </a>

    <!-- KPI 3: Keahlian -->
    <a href="/admin/keahlian" class="kpi-card">
      <div class="kpi-top">
        <div class="kpi-icon-wrap amber">
          <Layers size={20} />
        </div>
        <span class="kpi-tag"
          >{portfolioStore.skillPillars.length} Pilar Utama</span
        >
      </div>
      <div class="kpi-number">{portfolioStore.skillPillars.length}</div>
      <div class="kpi-label">Pilar Keahlian</div>
      <div class="kpi-footer">
        <span
          >{portfolioStore.skillPillars.length > 0
            ? portfolioStore.skillPillars
                .map((p) => p.title.split("&")[0].trim())
                .join(", ")
            : "Belum ada pilar keahlian"}</span
        >
        <ArrowRight size={14} class="kpi-arrow" />
      </div>
    </a>

    <!-- KPI 4: Pesan Masuk -->
    <a href="/admin/pesan" class="kpi-card">
      <div class="kpi-top">
        <div class="kpi-icon-wrap violet">
          <MessageSquare size={20} />
        </div>
        {#if unreadMessagesCount > 0}
          <span class="kpi-tag alert">{unreadMessagesCount} Pesan Baru</span>
        {:else}
          <span class="kpi-tag">Kotak Masuk</span>
        {/if}
      </div>
      <div class="kpi-number">{portfolioStore.messages.length}</div>
      <div class="kpi-label">Inquiry Kontak Klien</div>
      <div class="kpi-footer">
        <span>{unreadMessagesCount} belum ditanggapi</span>
        <ArrowRight size={14} class="kpi-arrow" />
      </div>
    </a>
  </section>

  <!-- Dynamic Sections Hub Cards -->
  <section class="sections-hub">
    <div class="section-hub-title-row">
      <div>
        <h2 class="hub-title">Kelola Bagian Dinamis</h2>
        <p class="hub-subtitle">
          Pilih section konten yang ingin Anda tinjau atau perbarui dari menu
          berikut.
        </p>
      </div>
    </div>

    <div class="hub-cards-grid">
      <!-- Hub Card 1: Karya & Proyek -->
      <div class="hub-card">
        <div class="hub-card-header">
          <div class="hub-badge-wrap">
            <FolderKanban size={18} />
            <span>01. KARYA & PROYEK</span>
          </div>
          <span class="hub-count-pill"
            >{portfolioStore.projects.length} Proyek</span
          >
        </div>
        <h3 class="hub-card-title">Katalog Karya & Studi Kasus</h3>
        <p class="hub-card-desc">
          Kelola kartu portofolio, atur urutan tampilan di beranda, aktifkan
          status publikasi atau karya unggulan, serta lengkapi metrik dampak dan
          studi kasus interaktif.
        </p>
        <div class="hub-preview-pills">
          {#if portfolioStore.projects.length === 0}
            <span class="mini-pill empty">Belum ada karya ditambahkan</span>
          {:else}
            {#each portfolioStore.projects.slice(0, 3) as proj}
              <span class="mini-pill">{proj.title.split("-")[0].trim()}</span>
            {/each}
          {/if}
        </div>
        <div class="hub-card-actions">
          <a href="/admin/karya" class="hub-link-btn">
            <span>Kelola Karya</span>
            <ArrowRight size={14} />
          </a>
        </div>
      </div>

      <!-- Hub Card 2: Pengalaman -->
      <div class="hub-card">
        <div class="hub-card-header">
          <div class="hub-badge-wrap">
            <Briefcase size={18} />
            <span>02. PENGALAMAN</span>
          </div>
          <span class="hub-count-pill"
            >{portfolioStore.experiences.length} Posisi</span
          >
        </div>
        <h3 class="hub-card-title">Riwayat Karir & Pengalaman</h3>
        <p class="hub-card-desc">
          Perbarui rekam jejak profesional karir, nama perusahaan, durasi,
          ringkasan peran, capaian kunci (achievements), dan tools yang
          dikuasai.
        </p>
        <div class="hub-preview-pills">
          {#if portfolioStore.experiences.length === 0}
            <span class="mini-pill empty">Belum ada pengalaman ditambahkan</span
            >
          {:else}
            {#each portfolioStore.experiences.slice(0, 2) as exp}
              <span class="mini-pill">{exp.company}</span>
            {/each}
          {/if}
        </div>
        <div class="hub-card-actions">
          <a href="/admin/pengalaman" class="hub-link-btn">
            <span>Kelola Pengalaman</span>
            <ArrowRight size={14} />
          </a>
        </div>
      </div>

      <!-- Hub Card 3: Keahlian & Spesialisasi -->
      <div class="hub-card">
        <div class="hub-card-header">
          <div class="hub-badge-wrap">
            <Layers size={18} />
            <span>03. KEAHLIAN</span>
          </div>
          <span class="hub-count-pill"
            >{portfolioStore.skillPillars.length} Pilar</span
          >
        </div>
        <h3 class="hub-card-title">Keahlian & Matriks Spesialisasi</h3>
        <p class="hub-card-desc">
          Sesuaikan pilar keahlian hibrida Anda (Desain Produk, Design System,
          Strategi Bisnis, Analisis Produk) beserta level penguasaan (Expert,
          Master, Advanced, Specialist).
        </p>
        <div class="hub-preview-pills">
          {#if portfolioStore.skillPillars.length === 0}
            <span class="mini-pill empty">Belum ada pilar keahlian</span>
          {:else}
            {#each portfolioStore.skillPillars as pil}
              <span class="mini-pill">{pil.title.split("&")[0].trim()}</span>
            {/each}
          {/if}
        </div>
        <div class="hub-card-actions">
          <a href="/admin/keahlian" class="hub-link-btn">
            <span>Kelola Keahlian</span>
            <ArrowRight size={14} />
          </a>
        </div>
      </div>

      <!-- Hub Card 4: Profil & Tentang -->
      <div class="hub-card">
        <div class="hub-card-header">
          <div class="hub-badge-wrap">
            <UserCheck size={18} />
            <span>04. PROFIL</span>
          </div>
          <span class="hub-count-pill">Biodata Utama</span>
        </div>
        <h3 class="hub-card-title">Profil, Tentang & Sosial</h3>
        <p class="hub-card-desc">
          Perbarui nama, headline spesialis, narasi tentang saya, angka
          pengalaman, ketersediaan proyek, dan tautan jejaring sosial.
        </p>
        <div class="hub-preview-pills">
          <span class="mini-pill">{portfolioStore.profile.name}</span>
          <span class="mini-pill"
            >{portfolioStore.profile.location.split("(")[0].trim()}</span
          >
        </div>
        <div class="hub-card-actions">
          <a href="/admin/profil" class="hub-link-btn">
            <span>Edit Profil</span>
            <ArrowRight size={14} />
          </a>
        </div>
      </div>

      <!-- Hub Card 5: Master Kategori -->
      <div class="hub-card">
        <div class="hub-card-header">
          <div class="hub-badge-wrap">
            <Tags size={18} />
            <span>05. MASTER KATEGORI</span>
          </div>
          <span class="hub-count-pill"
            >{portfolioStore.categories.length} Kategori</span
          >
        </div>
        <h3 class="hub-card-title">Taksonomi & Filter Karya</h3>
        <p class="hub-card-desc">
          Kelola klasifikasi bidang karya, status aktif pada bilah filter
          beranda, dan deskripsi fokus masing-masing kategori.
        </p>
        <div class="hub-preview-pills">
          {#if portfolioStore.categories.length === 0}
            <span class="mini-pill empty">Belum ada kategori ditambahkan</span>
          {:else}
            {#each portfolioStore.categories.slice(0, 3) as cat}
              <span class="mini-pill">{cat.name}</span>
            {/each}
          {/if}
        </div>
        <div class="hub-card-actions">
          <a href="/admin/kategori" class="hub-link-btn">
            <span>Kelola Kategori</span>
            <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- Recent Inquiries Section -->
  <section class="recent-messages-section">
    <div class="messages-header">
      <div>
        <h2 class="messages-title">Inquiry Pesan Masuk Terbaru</h2>
        <p class="messages-subtitle">
          Pesan yang dikirimkan oleh pengunjung melalui formulir kontak beranda.
        </p>
      </div>
      <a href="/admin/pesan" class="view-all-link">
        <span>Lihat Semua Pesan ({portfolioStore.messages.length})</span>
        <ArrowRight size={14} />
      </a>
    </div>

    <div class="messages-list">
      {#if recentMessages.length === 0}
        <div class="empty-messages">
          <Mail size={32} class="empty-icon" />
          <p>
            Belum ada pesan masuk. Setiap formulir yang dikirim di beranda akan
            muncul di sini.
          </p>
        </div>
      {:else}
        {#each recentMessages as msg}
          <div class="message-item" class:unread={!msg.isRead}>
            <div class="msg-avatar">
              <span>{msg.name.slice(0, 2).toUpperCase()}</span>
            </div>
            <div class="msg-content">
              <div class="msg-header-row">
                <span class="msg-sender">{msg.name}</span>
                <span class="msg-email">{msg.email}</span>
                <span class="msg-service-badge">{msg.service}</span>
                {#if !msg.isRead}
                  <span class="unread-badge">Baru</span>
                {/if}
              </div>
              <p class="msg-preview">{msg.message}</p>
            </div>
            <a
              href="/admin/pesan"
              class="msg-detail-btn"
              title="Buka Detail Pesan"
            >
              <ArrowRight size={15} />
            </a>
          </div>
        {/each}
      {/if}
    </div>
  </section>
</div>

<!-- Reset Confirmation Modal -->
{#if isResetModalOpen}
  <div
    class="modal-backdrop"
    role="dialog"
    aria-modal="true"
    aria-labelledby="reset-modal-title"
  >
    <button
      type="button"
      class="backdrop-dismiss"
      onclick={() => (isResetModalOpen = false)}
      aria-label="Tutup jendela reset"
    ></button>
    <div class="modal-box confirm-box">
      <div class="confirm-icon-box reset">
        <RotateCcw size={24} />
      </div>
      <h3 id="reset-modal-title" class="confirm-title">
        Reset ke Data Bawaan?
      </h3>
      <p class="confirm-desc">
        Tindakan ini akan mengembalikan seluruh data (Karya, Pengalaman,
        Keahlian, dan Profil) ke data bawaan awal. Seluruh perubahan kustom Anda
        akan diatur ulang.
      </p>
      <div class="confirm-actions">
        <button
          type="button"
          class="btn-cancel"
          onclick={() => (isResetModalOpen = false)}
        >
          Batal
        </button>
        <button type="button" class="btn-danger" onclick={handleReset}>
          <RotateCcw size={15} />
          <span>Ya, Reset Sekarang</span>
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  .overview-container {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  .alert-banner {
    display: flex;
    align-items: center;
    gap: 10px;
    background: #ecfdf5;
    border: 1px solid #a7f3d0;
    color: #065f46;
    padding: 12px 18px;
    border-radius: 12px;
    font-size: 13.5px;
    font-weight: 600;
  }

  .alert-banner.error {
    background: #fef2f2;
    border-color: #fecaca;
    color: #991b1b;
  }

  /* ==================== WELCOME CARD ==================== */
  .welcome-card {
    background: #ffffff;
    border: 1px solid rgba(10, 22, 40, 0.08);
    border-radius: 20px;
    padding: 32px;
    display: grid;
    grid-template-columns: 1fr 320px;
    gap: 32px;
    align-items: center;
    box-shadow: 0 4px 20px -4px rgba(10, 22, 40, 0.04);
  }

  .welcome-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: #f1f5f9;
    color: #0a1628;
    padding: 5px 12px;
    border-radius: 9999px;
    font-size: 11.5px;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    margin-bottom: 12px;
  }

  .welcome-title {
    font-size: 26px;
    font-weight: 800;
    color: #0a1628;
    margin: 0 0 10px;
    letter-spacing: -0.02em;
  }

  .welcome-desc {
    font-size: 14.5px;
    color: #475569;
    line-height: 1.6;
    margin: 0 0 24px;
    max-width: 600px;
  }

  .welcome-actions {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
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
    text-decoration: none;
    transition: all 0.2s ease;
  }

  .btn-primary:hover {
    background: #162844;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(10, 22, 40, 0.15);
  }

  .btn-secondary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    color: #0a1628;
    padding: 10px 16px;
    border-radius: 10px;
    font-size: 13.5px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.2s ease;
  }

  .btn-secondary:hover {
    background: #f1f5f9;
    border-color: #cbd5e1;
  }

  .btn-ghost {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: transparent;
    border: none;
    color: #64748b;
    padding: 10px 14px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    border-radius: 8px;
    transition: all 0.2s ease;
  }

  .btn-ghost:hover {
    background: #f1f5f9;
    color: #0a1628;
  }

  /* Sync Box */
  .sync-card {
    background: #f8fafc;
    border: 1px solid rgba(10, 22, 40, 0.08);
    border-radius: 16px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .sync-card-header {
    display: flex;
    align-items: center;
    gap: 8px;
    padding-bottom: 10px;
    border-bottom: 1px solid #e2e8f0;
  }

  .sync-beacon {
    width: 8px;
    height: 8px;
    background: #10b981;
    border-radius: 50%;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2);
  }

  .sync-status-title {
    font-size: 12.5px;
    font-weight: 700;
    color: #0a1628;
  }

  .sync-metric-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
  }

  .sync-metric-label {
    color: #64748b;
  }

  .sync-metric-val {
    font-weight: 600;
    color: #0a1628;
  }

  .sync-metric-val.live {
    color: #166534;
    font-weight: 700;
  }

  .sync-preview-link {
    margin-top: 4px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 8px 12px;
    background: #ffffff;
    border: 1px solid #cbd5e1;
    color: #0a1628;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.2s ease;
  }

  .sync-preview-link:hover {
    background: #0a1628;
    color: #ffffff;
    border-color: #0a1628;
  }

  /* ==================== KPI GRID ==================== */
  .kpi-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 18px;
  }

  .kpi-card {
    background: #ffffff;
    border: 1px solid rgba(10, 22, 40, 0.08);
    border-radius: 16px;
    padding: 22px 20px;
    text-decoration: none;
    color: inherit;
    display: flex;
    flex-direction: column;
    transition: all 0.2s ease;
    box-shadow: 0 2px 8px rgba(10, 22, 40, 0.02);
  }

  .kpi-card:hover {
    transform: translateY(-2px);
    border-color: rgba(10, 22, 40, 0.2);
    box-shadow: 0 8px 24px -6px rgba(10, 22, 40, 0.08);
  }

  .kpi-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 14px;
  }

  .kpi-icon-wrap {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .kpi-icon-wrap.blue {
    background: #eff6ff;
    color: #2563eb;
  }
  .kpi-icon-wrap.indigo {
    background: #eef2ff;
    color: #4f46e5;
  }
  .kpi-icon-wrap.emerald {
    background: #ecfdf5;
    color: #059669;
  }
  .kpi-icon-wrap.amber {
    background: #fffbeb;
    color: #d97706;
  }
  .kpi-icon-wrap.violet {
    background: #f5f3ff;
    color: #7c3aed;
  }

  .kpi-tag {
    font-size: 11px;
    font-weight: 700;
    color: #64748b;
    background: #f1f5f9;
    padding: 3px 8px;
    border-radius: 9999px;
  }

  .kpi-tag.alert {
    background: #fee2e2;
    color: #b91c1c;
  }

  .kpi-number {
    font-size: 32px;
    font-weight: 800;
    color: #0a1628;
    letter-spacing: -0.02em;
    line-height: 1.1;
    margin-bottom: 4px;
  }

  .kpi-label {
    font-size: 13.5px;
    font-weight: 600;
    color: #475569;
    margin-bottom: 14px;
  }

  .kpi-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 12px;
    border-top: 1px solid #f1f5f9;
    font-size: 11.5px;
    color: #64748b;
  }

  :global(.kpi-arrow) {
    color: #94a3b8;
    transition: transform 0.2s ease;
  }

  .kpi-card:hover :global(.kpi-arrow) {
    transform: translateX(3px);
    color: #0a1628;
  }

  /* ==================== DYNAMIC SECTIONS HUB ==================== */
  .sections-hub {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .section-hub-title-row {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }

  .hub-title {
    font-size: 20px;
    font-weight: 800;
    color: #0a1628;
    margin: 0 0 4px;
    letter-spacing: -0.01em;
  }

  .hub-subtitle {
    font-size: 13.5px;
    color: #64748b;
    margin: 0;
  }

  .hub-cards-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  .hub-card {
    background: #ffffff;
    border: 1px solid rgba(10, 22, 40, 0.08);
    border-radius: 18px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 2px 8px rgba(10, 22, 40, 0.02);
    transition: all 0.2s ease;
  }

  .hub-card:hover {
    border-color: rgba(10, 22, 40, 0.18);
    box-shadow: 0 8px 24px -4px rgba(10, 22, 40, 0.06);
  }

  .hub-card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
  }

  .hub-badge-wrap {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 11.5px;
    font-weight: 800;
    letter-spacing: 0.06em;
    color: #2563eb;
  }

  .hub-count-pill {
    font-size: 11px;
    font-weight: 700;
    background: #f1f5f9;
    color: #475569;
    padding: 3px 9px;
    border-radius: 9999px;
  }

  .hub-card-title {
    font-size: 17px;
    font-weight: 800;
    color: #0a1628;
    margin: 0 0 8px;
  }

  .hub-card-desc {
    font-size: 13.5px;
    color: #475569;
    line-height: 1.55;
    margin: 0 0 16px;
    flex: 1;
  }

  .hub-preview-pills {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 20px;
  }

  .mini-pill {
    font-size: 11.5px;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    color: #334155;
    padding: 4px 10px;
    border-radius: 6px;
    font-weight: 500;
  }
  .mini-pill.empty {
    font-style: italic;
    color: #94a3b8;
    background: transparent;
    border-style: dashed;
  }

  .hub-card-actions {
    padding-top: 16px;
    border-top: 1px solid #f1f5f9;
    display: flex;
    justify-content: flex-end;
  }

  .hub-link-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    background: #0a1628;
    color: #ffffff;
    border-radius: 8px;
    font-size: 12.5px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.2s ease;
  }

  .hub-link-btn:hover {
    background: #162844;
    transform: translateY(-1px);
  }

  /* ==================== RECENT MESSAGES ==================== */
  .recent-messages-section {
    background: #ffffff;
    border: 1px solid rgba(10, 22, 40, 0.08);
    border-radius: 18px;
    padding: 24px;
    box-shadow: 0 2px 8px rgba(10, 22, 40, 0.02);
  }

  .messages-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    padding-bottom: 14px;
    border-bottom: 1px solid #f1f5f9;
  }

  .messages-title {
    font-size: 17px;
    font-weight: 800;
    color: #0a1628;
    margin: 0 0 4px;
  }

  .messages-subtitle {
    font-size: 13px;
    color: #64748b;
    margin: 0;
  }

  .view-all-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 12.5px;
    font-weight: 700;
    color: #2563eb;
    text-decoration: none;
  }

  .view-all-link:hover {
    text-decoration: underline;
  }

  .messages-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .empty-messages {
    text-align: center;
    padding: 40px 20px;
    color: #94a3b8;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    font-size: 13.5px;
  }

  .message-item {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px 16px;
    border-radius: 12px;
    border: 1px solid #e2e8f0;
    background: #ffffff;
    transition: all 0.2s ease;
  }

  .message-item.unread {
    background: #f8fafc;
    border-color: #cbd5e1;
    border-left: 3px solid #2563eb;
  }

  .msg-avatar {
    width: 36px;
    height: 36px;
    background: #0a1628;
    color: #ffffff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 700;
    flex-shrink: 0;
  }

  .msg-content {
    flex: 1;
    min-width: 0;
  }

  .msg-header-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 4px;
    flex-wrap: wrap;
  }

  .msg-sender {
    font-size: 13px;
    font-weight: 700;
    color: #0a1628;
  }

  .msg-email {
    font-size: 12px;
    color: #64748b;
  }

  .msg-service-badge {
    font-size: 10.5px;
    background: #eff6ff;
    color: #2563eb;
    font-weight: 600;
    padding: 2px 7px;
    border-radius: 9999px;
  }

  .unread-badge {
    font-size: 10px;
    background: #ef4444;
    color: #ffffff;
    font-weight: 700;
    padding: 2px 6px;
    border-radius: 9999px;
  }

  .msg-preview {
    font-size: 12.5px;
    color: #475569;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .msg-detail-btn {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #64748b;
    border-radius: 8px;
    text-decoration: none;
    transition: all 0.15s ease;
  }

  .msg-detail-btn:hover {
    background: #f1f5f9;
    color: #0a1628;
  }

  /* ==================== MODAL ==================== */
  .modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(10, 22, 40, 0.55);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    animation: fadeIn 0.2s ease;
  }

  .backdrop-dismiss {
    position: absolute;
    inset: 0;
    background: transparent;
    border: none;
    cursor: pointer;
  }

  .modal-box.confirm-box {
    position: relative;
    background: #ffffff;
    border-radius: 20px;
    max-width: 440px;
    width: 100%;
    padding: 28px;
    box-shadow: 0 25px 60px -15px rgba(10, 22, 40, 0.35);
    border: 1px solid rgba(226, 232, 240, 0.9);
    animation: modalPop 0.22s cubic-bezier(0.16, 1, 0.3, 1);
    text-align: center;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes modalPop {
    from {
      transform: scale(0.96) translateY(12px);
      opacity: 0;
    }
    to {
      transform: scale(1) translateY(0);
      opacity: 1;
    }
  }

  .confirm-icon-box {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 16px;
  }
  .confirm-icon-box.reset {
    background: #fffbeb;
    color: #d97706;
  }

  .confirm-title {
    font-size: 18px;
    font-weight: 800;
    color: #0a1628;
    margin: 0 0 8px;
  }

  .confirm-desc {
    font-size: 13.5px;
    color: #64748b;
    line-height: 1.5;
    margin: 0 0 24px;
  }

  .confirm-actions {
    display: flex;
    gap: 10px;
    justify-content: center;
  }

  .btn-cancel {
    background: #ffffff;
    border: 1px solid #cbd5e1;
    color: #475569;
    padding: 9px 18px;
    border-radius: 10px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .btn-cancel:hover {
    background: #f1f5f9;
    color: #0a1628;
  }

  .btn-danger {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: #dc2626;
    border: 1px solid #dc2626;
    color: #ffffff;
    padding: 9px 18px;
    border-radius: 10px;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.15s ease;
    box-shadow: 0 4px 12px rgba(220, 38, 38, 0.25);
  }

  .btn-danger:hover {
    background: #b91c1c;
    border-color: #b91c1c;
  }

  /* Responsive */
  @media (max-width: 1300px) {
    .kpi-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (max-width: 1100px) {
    .kpi-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .welcome-card {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 768px) {
    .hub-cards-grid {
      grid-template-columns: 1fr;
    }

    .kpi-grid {
      grid-template-columns: 1fr;
    }

    .welcome-card {
      padding: 24px;
    }
  }
</style>
