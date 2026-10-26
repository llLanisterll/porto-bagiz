<script lang="ts">
  import { portfolioStore } from "$lib/stores/portfolioStore.svelte";
  import type { ExperienceItem } from "$lib/types/portfolio";
  import {
    Briefcase,
    Plus,
    Search,
    Edit3,
    Trash2,
    CheckCircle2,
    X,
    Calendar,
    Building2,
    MapPin,
    Clock,
    ExternalLink,
    Check,
    RotateCcw,
    Sparkles,
    Tag,
    AlertTriangle,
  } from "lucide-svelte";

  let searchQuery = $state("");
  let toastMessage = $state("");
  let toastTimer: any = null;

  function showToast(msg: string) {
    if (toastTimer) clearTimeout(toastTimer);
    toastMessage = msg;
    toastTimer = setTimeout(() => (toastMessage = ""), 3000);
  }

  // Modal states
  let isModalOpen = $state(false);
  let isEditMode = $state(false);
  let editingId: string | null = $state(null);

  let isDeleteModalOpen = $state(false);
  let itemToDelete: ExperienceItem | null = $state(null);

  // Form state
  let formData = $state({
    role: "",
    company: "",
    period: "",
    yearBadge: "",
    employmentType: "Full-time",
    badge: "",
    location: "",
    isCurrent: false,
    summary: "",
    achievementsInput: "",
    toolsInput: "",
  });

  function openAddModal() {
    isEditMode = false;
    editingId = null;
    formData = {
      role: "",
      company: "",
      period: "2025 — Sekarang",
      yearBadge: "Terkini",
      employmentType: "Full-time",
      badge: "Product Strategy",
      location: "Jakarta, Indonesia (Hybrid)",
      isCurrent: false,
      summary: "",
      achievementsInput: "",
      toolsInput: "Figma, Miro, Notion",
    };
    isModalOpen = true;
  }

  function openEditModal(exp: ExperienceItem) {
    isEditMode = true;
    editingId = exp.id;
    formData = {
      role: exp.role,
      company: exp.company,
      period: exp.period,
      yearBadge: exp.yearBadge,
      employmentType: exp.employmentType || "Full-time",
      badge: exp.badge || "",
      location: exp.location || "",
      isCurrent: Boolean(exp.isCurrent),
      summary: exp.summary,
      achievementsInput: (exp.achievements || []).join("\n"),
      toolsInput: (exp.tools || []).join(", "),
    };
    isModalOpen = true;
  }

  function handleSave(e: Event) {
    e.preventDefault();
    if (!formData.role.trim() || !formData.company.trim()) return;

    const achievements = formData.achievementsInput
      .split("\n")
      .map((a) => a.trim())
      .filter(Boolean);

    const tools = formData.toolsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const payload: Omit<ExperienceItem, "id"> = {
      role: formData.role.trim(),
      company: formData.company.trim(),
      period: formData.period.trim() || "2024 — Sekarang",
      yearBadge: formData.yearBadge.trim() || "Pengalaman",
      employmentType: formData.employmentType,
      badge: formData.badge.trim() || "Karir",
      location: formData.location.trim() || "Jakarta, Indonesia",
      isCurrent: formData.isCurrent,
      summary: formData.summary.trim(),
      achievements,
      tools,
    };

    if (isEditMode && editingId) {
      portfolioStore.updateExperience(editingId, payload);
      showToast(`Pengalaman di ${payload.company} berhasil diperbarui!`);
    } else {
      portfolioStore.addExperience(payload);
      showToast(`Posisi baru di ${payload.company} berhasil ditambahkan!`);
    }

    isModalOpen = false;
  }

  function confirmDelete(exp: ExperienceItem) {
    itemToDelete = exp;
    isDeleteModalOpen = true;
  }

  function executeDelete() {
    if (itemToDelete) {
      portfolioStore.deleteExperience(itemToDelete.id);
      showToast(`Pengalaman di ${itemToDelete.company} telah dihapus.`);
      isDeleteModalOpen = false;
      itemToDelete = null;
    }
  }

  function toggleCurrent(id: string) {
    portfolioStore.toggleExperienceCurrent(id);
    showToast("Status peran terkini berhasil diubah.");
  }

  const filteredExperiences = $derived.by(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return portfolioStore.experiences;
    return portfolioStore.experiences.filter(
      (e) =>
        e.role.toLowerCase().includes(q) ||
        e.company.toLowerCase().includes(q) ||
        e.location.toLowerCase().includes(q) ||
        e.badge.toLowerCase().includes(q) ||
        e.summary.toLowerCase().includes(q),
    );
  });
</script>

<svelte:head>
  <title>Kelola Pengalaman — Admin CMS Baghiz</title>
</svelte:head>

<div class="exp-admin-container">
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
        <Briefcase size={13} />
        <span>KONTEN DINAMIS</span>
      </div>
      <h1 class="page-title">Riwayat Pengalaman</h1>
      <p class="page-desc">
        Kelola rekam jejak karir profesional, peran kepemimpinan desain, capaian
        kunci, serta tools yang dikuasai. Seluruh data langsung tampil di
        section <strong>#pengalaman</strong>.
      </p>
    </div>

    <div class="header-actions">
      <a
        href="/#pengalaman"
        target="_blank"
        rel="noopener"
        class="btn-preview-link"
      >
        <span>Lihat di Beranda</span>
        <ExternalLink size={13} />
      </a>
      <button class="btn-primary" onclick={openAddModal}>
        <Plus size={16} />
        <span>Tambah Pengalaman</span>
      </button>
    </div>
  </header>

  <!-- Search & Stats Bar -->
  <div class="filter-bar">
    <div class="search-input-wrap">
      <Search size={16} class="search-icon" />
      <input
        type="text"
        placeholder="Cari peran, perusahaan, tools, atau lokasi..."
        bind:value={searchQuery}
        class="search-input"
      />
      {#if searchQuery}
        <button class="clear-btn" onclick={() => (searchQuery = "")}>
          <X size={14} />
        </button>
      {/if}
    </div>

    <div class="stats-pills">
      <span class="stat-pill"
        >Total: <strong>{portfolioStore.experiences.length}</strong></span
      >
      <span class="stat-pill">
        Terkini: <strong
          >{portfolioStore.experiences.filter((e) => e.isCurrent)
            .length}</strong
        >
      </span>
    </div>
  </div>

  <!-- Experiences List Cards -->
  <div class="exp-list">
    {#if filteredExperiences.length === 0}
      <div class="empty-state">
        <Briefcase size={36} class="empty-icon" />
        <h3>Tidak ada pengalaman ditemukan</h3>
        <p>Coba kata kunci lain atau tambahkan pengalaman baru.</p>
        <button class="btn-primary" onclick={openAddModal}>
          <Plus size={16} />
          <span>Tambah Pengalaman Baru</span>
        </button>
      </div>
    {:else}
      {#each filteredExperiences as exp, idx (exp.id)}
        <article class="exp-card" class:is-current={exp.isCurrent}>
          <!-- Card Header -->
          <div class="exp-card-header">
            <div class="exp-header-left">
              <div class="period-pill-wrap">
                <span class="period-pill">{exp.period}</span>
                {#if exp.yearBadge}
                  <span class="year-pill">{exp.yearBadge}</span>
                {/if}
                {#if exp.isCurrent}
                  <span class="current-badge">
                    <span class="pulse-dot"></span>
                    Peran Terkini
                  </span>
                {/if}
              </div>
              <h3 class="exp-role">{exp.role}</h3>
              <div class="exp-meta-row">
                <span class="exp-company">
                  <Building2 size={13} />
                  {exp.company}
                </span>
                <span class="meta-sep">•</span>
                <span class="exp-location">
                  <MapPin size={13} />
                  {exp.location}
                </span>
                <span class="meta-sep">•</span>
                <span class="exp-type">{exp.employmentType}</span>
                {#if exp.badge}
                  <span class="exp-category-tag">{exp.badge}</span>
                {/if}
              </div>
            </div>

            <div class="exp-card-actions">
              <button
                class="action-btn"
                onclick={() => toggleCurrent(exp.id)}
                title={exp.isCurrent
                  ? "Hapus status terkini"
                  : "Tandai sebagai peran terkini"}
              >
                <Check size={14} />
                <span class="btn-text"
                  >{exp.isCurrent ? "Aktif" : "Tandai Terkini"}</span
                >
              </button>

              <button
                class="action-btn edit"
                onclick={() => openEditModal(exp)}
                title="Edit rincian pengalaman"
              >
                <Edit3 size={14} />
                <span class="btn-text">Edit</span>
              </button>

              <button
                class="action-btn delete"
                onclick={() => confirmDelete(exp)}
                title="Hapus pengalaman"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>

          <!-- Card Body -->
          <div class="exp-card-body">
            <p class="exp-summary">{exp.summary}</p>

            {#if exp.achievements && exp.achievements.length > 0}
              <div class="achievements-section">
                <span class="section-micro-label"
                  >CAPAIAN KUNCI & DAMPAK BISNIS</span
                >
                <ul class="achievements-list">
                  {#each exp.achievements as ach}
                    <li>{ach}</li>
                  {/each}
                </ul>
              </div>
            {/if}

            {#if exp.tools && exp.tools.length > 0}
              <div class="tools-row">
                {#each exp.tools as t}
                  <span class="tool-tag">{t}</span>
                {/each}
              </div>
            {/if}
          </div>
        </article>
      {/each}
    {/if}
  </div>
</div>

<!-- Add / Edit Modal -->
{#if isModalOpen}
  <div
    class="modal-backdrop"
    role="dialog"
    aria-modal="true"
    aria-labelledby="exp-modal-title"
  >
    <button
      type="button"
      class="backdrop-dismiss"
      onclick={() => (isModalOpen = false)}
      aria-label="Tutup jendela modal"
    ></button>

    <div class="modal-box large">
      <div class="modal-top">
        <div class="modal-title-col">
          <div class="modal-badge-row">
            <span class="modal-badge-tag">Karier & Rekam Jejak</span>
            <span class="mode-tag"
              >{isEditMode ? "Mode Edit" : "Entri Baru"}</span
            >
          </div>
          <h2 id="exp-modal-title" class="modal-title">
            {isEditMode ? "Edit Riwayat Pengalaman" : "Tambah Pengalaman Baru"}
          </h2>
          <p class="modal-subtitle">
            Isi rincian posisi, perusahaan, capaian, dan tools yang digunakan.
          </p>
        </div>
        <button
          type="button"
          class="close-modal-btn"
          onclick={() => (isModalOpen = false)}
          title="Tutup (Esc)"
          aria-label="Tutup modal"
        >
          <X size={18} />
        </button>
      </div>

      <form onsubmit={handleSave} class="modal-form">
        <div class="form-grid-2">
          <div class="form-group">
            <label for="exp-role">Posisi / Jabatan *</label>
            <input
              id="exp-role"
              type="text"
              bind:value={formData.role}
              placeholder="e.g. Lead UX/UI Designer & Product Strategist"
              required
            />
          </div>
          <div class="form-group">
            <label for="exp-company">Nama Perusahaan / Organisasi *</label>
            <input
              id="exp-company"
              type="text"
              bind:value={formData.company}
              placeholder="e.g. NexaPay Financial Ecosystem"
              required
            />
          </div>
        </div>

        <div class="form-grid-3">
          <div class="form-group">
            <label for="exp-period">Periode Waktu *</label>
            <input
              id="exp-period"
              type="text"
              bind:value={formData.period}
              placeholder="e.g. 2024 — Sekarang"
              required
            />
          </div>
          <div class="form-group">
            <label for="exp-yearbadge">Badge Durasi</label>
            <input
              id="exp-yearbadge"
              type="text"
              bind:value={formData.yearBadge}
              placeholder="e.g. Terkini / 2 Tahun"
            />
          </div>
          <div class="form-group">
            <label for="exp-emptype">Jenis Pekerjaan</label>
            <select id="exp-emptype" bind:value={formData.employmentType}>
              <option value="Full-time">Full-time</option>
              <option value="Contract">Contract</option>
              <option value="Freelance">Freelance</option>
              <option value="Part-time">Part-time</option>
              <option value="Volunteer">Volunteer</option>
            </select>
          </div>
        </div>

        <div class="form-grid-2">
          <div class="form-group">
            <label for="exp-location">Lokasi & Tipe</label>
            <input
              id="exp-location"
              type="text"
              bind:value={formData.location}
              placeholder="e.g. Jakarta, Indonesia (Hybrid)"
            />
          </div>
          <div class="form-group">
            <label for="exp-badge">Badge Kategori</label>
            <input
              id="exp-badge"
              type="text"
              bind:value={formData.badge}
              placeholder="e.g. Design Leadership / Enterprise SaaS"
            />
          </div>
        </div>

        <div class="current-role-card" class:active={formData.isCurrent}>
          <div class="current-role-info">
            <div class="current-role-title">
              Peran Terkini (Sedang Dijalani)
            </div>
            <div class="current-role-desc">
              Tandai jika Anda saat ini masih aktif memegang posisi ini.
            </div>
          </div>
          <label class="toggle-switch">
            <input type="checkbox" bind:checked={formData.isCurrent} />
            <span class="slider"></span>
          </label>
        </div>

        <div class="form-group">
          <label for="exp-summary">Ringkasan Peran & Tanggung Jawab *</label>
          <textarea
            id="exp-summary"
            rows="3"
            bind:value={formData.summary}
            placeholder="Jelaskan cakupan peran, tim yang dipimpin, dan fokus produk utama..."
            required></textarea>
        </div>

        <div class="form-group">
          <label for="exp-achievements"
            >Capaian Kunci (1 baris per capaian)</label
          >
          <textarea
            id="exp-achievements"
            rows="4"
            bind:value={formData.achievementsInput}
            placeholder="Merancang ulang alur transaksi dompet digital yang meningkatkan konversi +42%&#10;Membangun Nexa Design System v3.0 dengan 140+ komponen&#10;Memangkas time-to-market perilisan fitur baru hingga 35%"
          ></textarea>
        </div>

        <div class="form-group">
          <label for="exp-tools"
            >Tools yang Dikuasai (pisahkan dengan koma)</label
          >
          <input
            id="exp-tools"
            type="text"
            bind:value={formData.toolsInput}
            placeholder="Figma, Tokens Studio, Mixpanel, Miro, Storybook"
          />
        </div>

        <div class="modal-bottom-actions">
          <div class="footer-hint">
            <span class="kbd-hint"
              >Tekan <strong>Esc</strong> untuk menutup</span
            >
          </div>
          <div class="actions-right">
            <button
              type="button"
              class="btn-cancel"
              onclick={() => (isModalOpen = false)}
            >
              Batal
            </button>
            <button type="submit" class="btn-submit">
              <Check size={16} />
              <span
                >{isEditMode
                  ? "Simpan Perubahan"
                  : "Tambahkan Pengalaman"}</span
              >
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
{/if}

<!-- Delete Confirmation Modal -->
{#if isDeleteModalOpen && itemToDelete}
  <div
    class="modal-backdrop"
    role="dialog"
    aria-modal="true"
    aria-labelledby="delete-exp-title"
  >
    <button
      type="button"
      class="backdrop-dismiss"
      onclick={() => (isDeleteModalOpen = false)}
      aria-label="Tutup konfirmasi"
    ></button>
    <div class="modal-box small confirm-box">
      <div class="confirm-icon-box danger">
        <AlertTriangle size={24} />
      </div>
      <h3 id="delete-exp-title" class="confirm-title">Hapus Pengalaman Ini?</h3>
      <p class="confirm-desc">
        Apakah Anda yakin ingin menghapus posisi <strong
          >"{itemToDelete.role}"</strong
        >
        di <strong>"{itemToDelete.company}"</strong>? Tindakan ini tidak dapat
        dibatalkan.
      </p>
      <div class="confirm-actions">
        <button
          type="button"
          class="btn-cancel"
          onclick={() => (isDeleteModalOpen = false)}
        >
          Batal
        </button>
        <button type="button" class="btn-danger" onclick={executeDelete}>
          <Trash2 size={15} />
          <span>Ya, Hapus Pengalaman</span>
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  .exp-admin-container {
    display: flex;
    flex-direction: column;
    gap: 24px;
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

  /* Filter Bar */
  .filter-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    background: #ffffff;
    padding: 12px 18px;
    border-radius: 14px;
    border: 1px solid rgba(10, 22, 40, 0.08);
  }

  .search-input-wrap {
    display: flex;
    align-items: center;
    gap: 10px;
    flex: 1;
    max-width: 500px;
  }

  :global(.search-icon) {
    color: #94a3b8;
  }

  .search-input {
    border: none;
    outline: none;
    font-size: 13.5px;
    color: #0a1628;
    width: 100%;
    background: transparent;
  }

  .clear-btn {
    background: transparent;
    border: none;
    color: #94a3b8;
    cursor: pointer;
    padding: 4px;
  }

  .stats-pills {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .stat-pill {
    font-size: 12px;
    color: #64748b;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    padding: 4px 10px;
    border-radius: 6px;
  }

  .stat-pill strong {
    color: #0a1628;
  }

  /* Experiences Cards */
  .exp-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .exp-card {
    background: #ffffff;
    border: 1px solid rgba(10, 22, 40, 0.08);
    border-radius: 16px;
    padding: 24px;
    box-shadow: 0 2px 8px rgba(10, 22, 40, 0.02);
    transition: all 0.2s ease;
  }

  .exp-card:hover {
    border-color: rgba(10, 22, 40, 0.18);
    box-shadow: 0 8px 24px -4px rgba(10, 22, 40, 0.06);
  }

  .exp-card.is-current {
    border-left: 4px solid #10b981;
  }

  .exp-card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid #f1f5f9;
    margin-bottom: 16px;
  }

  .period-pill-wrap {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
    flex-wrap: wrap;
  }

  .period-pill {
    font-size: 12px;
    font-weight: 700;
    color: #0a1628;
    background: #f1f5f9;
    padding: 3px 10px;
    border-radius: 6px;
  }

  .year-pill {
    font-size: 11px;
    font-weight: 600;
    color: #64748b;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    padding: 2px 8px;
    border-radius: 6px;
  }

  .current-badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 11px;
    font-weight: 700;
    color: #065f46;
    background: #d1fae5;
    padding: 3px 9px;
    border-radius: 9999px;
  }

  .pulse-dot {
    width: 6px;
    height: 6px;
    background: #10b981;
    border-radius: 50%;
  }

  .exp-role {
    font-size: 18px;
    font-weight: 800;
    color: #0a1628;
    margin: 0 0 6px;
    letter-spacing: -0.01em;
  }

  .exp-meta-row {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: #64748b;
    flex-wrap: wrap;
  }

  .exp-company,
  .exp-location {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-weight: 600;
    color: #334155;
  }

  .meta-sep {
    color: #cbd5e1;
  }

  .exp-category-tag {
    font-size: 11px;
    background: #eff6ff;
    color: #2563eb;
    font-weight: 700;
    padding: 2px 8px;
    border-radius: 6px;
  }

  .exp-card-actions {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .action-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    color: #334155;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .action-btn:hover {
    background: #f1f5f9;
    color: #0a1628;
  }

  .action-btn.edit:hover {
    background: #eff6ff;
    color: #2563eb;
    border-color: #bfdbfe;
  }

  .action-btn.delete:hover {
    background: #fee2e2;
    color: #dc2626;
    border-color: #fecaca;
  }

  /* Card Body */
  .exp-summary {
    font-size: 14px;
    color: #334155;
    line-height: 1.6;
    margin: 0 0 16px;
  }

  .achievements-section {
    margin-bottom: 16px;
  }

  .section-micro-label {
    display: block;
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 0.08em;
    color: #94a3b8;
    margin-bottom: 8px;
  }

  .achievements-list {
    margin: 0;
    padding-left: 20px;
    color: #475569;
    font-size: 13.5px;
    line-height: 1.6;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .tools-row {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;
    padding-top: 14px;
    border-top: 1px solid #f1f5f9;
  }

  .tool-tag {
    font-size: 11.5px;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    color: #475569;
    padding: 3px 9px;
    border-radius: 6px;
    font-weight: 500;
  }

  /* Empty State */
  .empty-state {
    text-align: center;
    padding: 60px 20px;
    background: #ffffff;
    border: 1px dashed #cbd5e1;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }

  :global(.empty-icon) {
    color: #94a3b8;
  }

  /* Modal */
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

  .modal-box {
    position: relative;
    background: #ffffff;
    border-radius: 20px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    padding: 28px;
    box-shadow: 0 25px 60px -15px rgba(10, 22, 40, 0.35);
    border: 1px solid rgba(226, 232, 240, 0.9);
    animation: modalPop 0.22s cubic-bezier(0.16, 1, 0.3, 1);
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

  .modal-box.large {
    max-width: 680px;
  }
  .modal-box.small {
    max-width: 440px;
  }

  .modal-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 20px;
    padding-bottom: 14px;
    border-bottom: 1px solid #e2e8f0;
  }

  .modal-badge-row {
    display: flex;
    gap: 8px;
    margin-bottom: 4px;
    align-items: center;
  }

  .modal-badge-tag {
    font-size: 11px;
    font-weight: 700;
    color: #2563eb;
    background: #eff6ff;
    padding: 2px 7px;
    border-radius: 4px;
    border: 1px solid rgba(37, 99, 235, 0.15);
  }

  .mode-tag {
    font-size: 11px;
    color: #64748b;
    font-weight: 600;
  }

  .modal-title {
    font-size: 19px;
    font-weight: 800;
    color: #0a1628;
    letter-spacing: -0.01em;
    margin: 0 0 4px;
  }

  .modal-subtitle {
    font-size: 13px;
    color: #64748b;
    margin: 0;
  }

  .close-modal-btn {
    width: 34px;
    height: 34px;
    background: transparent;
    border: 1px solid #e2e8f0;
    color: #64748b;
    cursor: pointer;
    padding: 0;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.15s ease;
  }

  .close-modal-btn:hover {
    background: #f1f5f9;
    color: #0a1628;
    border-color: #cbd5e1;
  }

  .modal-form {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .form-grid-2 {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  .form-grid-3 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
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

  .form-group input,
  .form-group textarea,
  .form-group select {
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
  .form-group select:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
  }

  /* Switch Card for Current Role */
  .current-role-card {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 12px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    transition: all 0.2s ease;
  }

  .current-role-card.active {
    background: #f0fdf4;
    border-color: #bbf7d0;
  }

  .current-role-title {
    font-size: 13px;
    font-weight: 700;
    color: #0a1628;
  }

  .current-role-desc {
    font-size: 11.5px;
    color: #64748b;
    margin-top: 2px;
  }

  .toggle-switch {
    position: relative;
    display: inline-block;
    width: 44px;
    height: 24px;
    flex-shrink: 0;
  }
  .toggle-switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  .slider {
    position: absolute;
    cursor: pointer;
    inset: 0;
    background-color: #cbd5e1;
    transition: 0.2s;
    border-radius: 24px;
  }
  .slider:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: 0.2s;
    border-radius: 50%;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  }
  input:checked + .slider {
    background-color: #10b981;
  }
  input:checked + .slider:before {
    transform: translateX(20px);
  }

  .modal-bottom-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding-top: 18px;
    border-top: 1px solid #e2e8f0;
    margin-top: 8px;
  }

  .footer-hint {
    font-size: 11.5px;
    color: #94a3b8;
  }
  .kbd-hint strong {
    color: #475569;
    background: #e2e8f0;
    padding: 1px 5px;
    border-radius: 4px;
  }

  .actions-right {
    display: flex;
    gap: 10px;
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

  .btn-submit {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    background: linear-gradient(135deg, #0a1628 0%, #162844 100%);
    border: 1px solid #0a1628;
    color: #ffffff;
    padding: 9px 20px;
    border-radius: 10px;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 4px 12px rgba(10, 22, 40, 0.18);
  }

  .btn-submit:hover {
    background: linear-gradient(135deg, #162844 0%, #2563eb 100%);
    transform: translateY(-1px);
  }

  /* Confirm Delete Dialog */
  .confirm-box {
    text-align: center;
    padding: 28px;
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
  .confirm-icon-box.danger {
    background: #fef2f2;
    color: #dc2626;
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

  @media (max-width: 768px) {
    .form-grid-2,
    .form-grid-3 {
      grid-template-columns: 1fr;
    }

    .exp-card-header {
      flex-direction: column;
    }

    .exp-card-actions {
      width: 100%;
      justify-content: flex-end;
    }
  }
</style>
