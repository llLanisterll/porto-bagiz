<script lang="ts">
  import { portfolioStore } from "$lib/stores/portfolioStore.svelte";
  import type { SkillPillar, SkillPillarItem } from "$lib/types/portfolio";
  import {
    Layers,
    Plus,
    Search,
    Edit3,
    Trash2,
    CheckCircle2,
    X,
    Star,
    ExternalLink,
    Check,
    RotateCcw,
    Sparkles,
    ShieldCheck,
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
  let pillarToDelete: SkillPillar | null = $state(null);

  // Form model
  let formData = $state({
    badge: "",
    title: "",
    subtitle: "",
    desc: "",
    isFeatured: false,
    skillsText: "",
    toolsInput: "",
  });

  function openAddModal() {
    isEditMode = false;
    editingId = null;
    formData = {
      badge: "KOMPETENSI HIBRIDA",
      title: "",
      subtitle: "",
      desc: "",
      isFeatured: false,
      skillsText:
        "User Research: Expert\nPrototyping: Master\nSystem Design: Advanced",
      toolsInput: "Figma, Miro, Notion",
    };
    isModalOpen = true;
  }

  function openEditModal(pillar: SkillPillar) {
    isEditMode = true;
    editingId = pillar.id;

    const skillsLines = (pillar.skills || [])
      .map((s) => `${s.label}: ${s.level}`)
      .join("\n");

    formData = {
      badge: pillar.badge || "",
      title: pillar.title,
      subtitle: pillar.subtitle,
      desc: pillar.desc,
      isFeatured: Boolean(pillar.isFeatured),
      skillsText: skillsLines,
      toolsInput: (pillar.tools || []).join(", "),
    };
    isModalOpen = true;
  }

  function handleSave(e: Event) {
    e.preventDefault();
    if (!formData.title.trim()) return;

    // Parse skills lines "Label: Level"
    const skills: SkillPillarItem[] = formData.skillsText
      .split("\n")
      .map((line) => {
        const parts = line.split(":");
        const label = parts[0]?.trim();
        if (!label) return null;
        const levelRaw = parts[1]?.trim() as any;
        const validLevels = ["Expert", "Master", "Advanced", "Specialist"];
        const level = validLevels.includes(levelRaw) ? levelRaw : "Expert";
        return { label, level };
      })
      .filter(Boolean) as SkillPillarItem[];

    const tools = formData.toolsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const payload: Omit<SkillPillar, "id"> = {
      badge: formData.badge.trim() || "KEAHLIAN",
      title: formData.title.trim(),
      subtitle: formData.subtitle.trim(),
      desc: formData.desc.trim(),
      isFeatured: formData.isFeatured,
      skills,
      tools,
    };

    if (isEditMode && editingId) {
      portfolioStore.updateSkillPillar(editingId, payload);
      showToast(`Pilar keahlian "${payload.title}" berhasil diperbarui!`);
    } else {
      portfolioStore.addSkillPillar(payload);
      showToast(`Pilar keahlian "${payload.title}" berhasil ditambahkan!`);
    }

    isModalOpen = false;
  }

  function confirmDelete(pillar: SkillPillar) {
    pillarToDelete = pillar;
    isDeleteModalOpen = true;
  }

  function executeDelete() {
    if (pillarToDelete) {
      portfolioStore.deleteSkillPillar(pillarToDelete.id);
      showToast(`Pilar "${pillarToDelete.title}" telah dihapus.`);
      isDeleteModalOpen = false;
      pillarToDelete = null;
    }
  }

  function toggleFeatured(pillar: SkillPillar) {
    portfolioStore.updateSkillPillar(pillar.id, {
      isFeatured: !pillar.isFeatured,
    });
    showToast(
      pillar.isFeatured
        ? "Pilar dihapus dari sorotan."
        : "Pilar ditandai sebagai Unggulan.",
    );
  }

  const filteredPillars = $derived.by(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return portfolioStore.skillPillars;
    return portfolioStore.skillPillars.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.badge.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q) ||
        p.skills.some((s) => s.label.toLowerCase().includes(q)),
    );
  });
</script>

<svelte:head>
  <title>Kelola Keahlian — Admin CMS Baghiz</title>
</svelte:head>

<div class="skills-admin-container">
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
        <Layers size={13} />
        <span>KONTEN DINAMIS</span>
      </div>
      <h1 class="page-title">Keahlian & Spesialisasi</h1>
      <p class="page-desc">
        Kelola matriks keahlian hibrida (UI/UX Design, Design System, Strategi
        Bisnis, Analisis Produk) dan level penguasaan (Expert, Master, Advanced,
        Specialist).
      </p>
    </div>

    <div class="header-actions">
      <a
        href="/#keahlian"
        target="_blank"
        rel="noopener"
        class="btn-preview-link"
      >
        <span>Lihat di Beranda</span>
        <ExternalLink size={13} />
      </a>
      <button class="btn-primary" onclick={openAddModal}>
        <Plus size={16} />
        <span>Tambah Pilar Keahlian</span>
      </button>
    </div>
  </header>

  <!-- Search & Stats Bar -->
  <div class="filter-bar">
    <div class="search-input-wrap">
      <Search size={16} class="search-icon" />
      <input
        type="text"
        placeholder="Cari pilar keahlian, kemampuan, atau tools..."
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
        >Total: <strong>{portfolioStore.skillPillars.length} Pilar</strong
        ></span
      >
      <span class="stat-pill">
        Unggulan: <strong
          >{portfolioStore.skillPillars.filter((p) => p.isFeatured)
            .length}</strong
        >
      </span>
    </div>
  </div>

  <!-- Pillars Grid -->
  <div class="pillars-grid">
    {#if filteredPillars.length === 0}
      <div class="empty-state">
        <Layers size={36} class="empty-icon" />
        <h3>Tidak ada pilar keahlian ditemukan</h3>
        <p>Coba kata kunci lain atau tambahkan pilar keahlian baru.</p>
        <button class="btn-primary" onclick={openAddModal}>
          <Plus size={16} />
          <span>Tambah Pilar Keahlian</span>
        </button>
      </div>
    {:else}
      {#each filteredPillars as pillar (pillar.id)}
        <article class="pillar-card" class:featured={pillar.isFeatured}>
          <div class="pillar-card-top">
            <div class="pillar-badge-row">
              <span class="pillar-badge">{pillar.badge}</span>
              {#if pillar.isFeatured}
                <span class="featured-tag">
                  <Star size={11} fill="currentColor" />
                  Unggulan
                </span>
              {/if}
            </div>

            <div class="pillar-actions">
              <button
                class="action-btn"
                class:active={pillar.isFeatured}
                onclick={() => toggleFeatured(pillar)}
                title={pillar.isFeatured
                  ? "Hapus dari sorotan"
                  : "Sorot sebagai pilar utama"}
              >
                <Star
                  size={13}
                  fill={pillar.isFeatured ? "currentColor" : "none"}
                />
              </button>

              <button
                class="action-btn edit"
                onclick={() => openEditModal(pillar)}
                title="Edit pilar keahlian"
              >
                <Edit3 size={13} />
              </button>

              <button
                class="action-btn delete"
                onclick={() => confirmDelete(pillar)}
                title="Hapus pilar"
              >
                <Trash2 size={13} />
              </button>
            </div>
          </div>

          <h3 class="pillar-title">{pillar.title}</h3>
          <span class="pillar-subtitle">{pillar.subtitle}</span>
          <p class="pillar-desc">{pillar.desc}</p>

          <!-- Skills Matrix -->
          <div class="skills-sublist">
            <span class="sublist-title">DAFTAR KEMAMPUAN</span>
            <div class="skill-items-grid">
              {#each pillar.skills as s}
                <div class="skill-row-item">
                  <span class="skill-item-name">{s.label}</span>
                  <span class="level-badge {s.level.toLowerCase()}"
                    >{s.level}</span
                  >
                </div>
              {/each}
            </div>
          </div>

          <!-- Tools -->
          {#if pillar.tools && pillar.tools.length > 0}
            <div class="tools-footer">
              <span class="tools-label">Tools & Framework:</span>
              <div class="tools-tags">
                {#each pillar.tools as t}
                  <span class="tool-tag">{t}</span>
                {/each}
              </div>
            </div>
          {/if}
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
    aria-labelledby="pillar-modal-title"
  >
    <button
      type="button"
      class="backdrop-dismiss"
      onclick={() => (isModalOpen = false)}
      aria-label="Tutup jendela modal"
    ></button>

    <div class="modal-box">
      <div class="modal-top">
        <div class="modal-title-col">
          <div class="modal-badge-row">
            <span class="modal-badge-tag">Pilar & Kompetensi</span>
            <span class="mode-tag"
              >{isEditMode ? "Mode Edit" : "Pilar Baru"}</span
            >
          </div>
          <h2 id="pillar-modal-title" class="modal-title">
            {isEditMode ? "Edit Pilar Keahlian" : "Tambah Pilar Keahlian Baru"}
          </h2>
          <p class="modal-subtitle">
            Atur judul pilar, narasi fokus, kemampuan, dan level keahlian.
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
            <label for="pil-badge">Badge Kategori</label>
            <input
              id="pil-badge"
              type="text"
              bind:value={formData.badge}
              placeholder="e.g. DESAIN PRODUK & INTERAKSI"
              required
            />
          </div>
          <div class="form-group">
            <label for="pil-title">Judul Pilar *</label>
            <input
              id="pil-title"
              type="text"
              bind:value={formData.title}
              placeholder="e.g. UI/UX & Product Design"
              required
            />
          </div>
        </div>

        <div class="form-group">
          <label for="pil-subtitle">Sub-judul Pilar *</label>
          <input
            id="pil-subtitle"
            type="text"
            bind:value={formData.subtitle}
            placeholder="e.g. End-to-End User Experience"
            required
          />
        </div>

        <div class="form-group">
          <label for="pil-desc">Deskripsi Fokus & Metodologi *</label>
          <textarea
            id="pil-desc"
            rows="3"
            bind:value={formData.desc}
            placeholder="Jelaskan bagaimana Anda menerapkan keahlian ini dalam konteks bisnis..."
            required></textarea>
        </div>

        <div class="featured-switch-card" class:active={formData.isFeatured}>
          <div class="switch-content">
            <div class="switch-title">Sorot Sebagai Pilar Unggulan</div>
            <div class="switch-desc">
              Tampilkan kartu pilar ini dengan aksen visual khusus di beranda
              utama.
            </div>
          </div>
          <label class="toggle-switch">
            <input type="checkbox" bind:checked={formData.isFeatured} />
            <span class="slider"></span>
          </label>
        </div>

        <div class="form-group">
          <div class="label-row">
            <label for="pil-skills"
              >Daftar Kemampuan & Level (Format: Nama: Level)</label
            >
            <span class="hint-text"
              >Level: Expert / Master / Advanced / Specialist</span
            >
          </div>
          <textarea
            id="pil-skills"
            rows="5"
            bind:value={formData.skillsText}
            placeholder="User Research & Journey Mapping: Expert&#10;Wireframing & Hi-Fi Prototyping: Master&#10;Micro-interactions & Motion UX: Advanced&#10;Usability Testing & Heuristic Audit: Expert"
            required></textarea>
        </div>

        <div class="form-group">
          <label for="pil-tools"
            >Tools yang Digunakan (pisahkan dengan koma)</label
          >
          <input
            id="pil-tools"
            type="text"
            bind:value={formData.toolsInput}
            placeholder="Figma, FigJam, Framer, Protopie, Principle"
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
              <span>{isEditMode ? "Simpan Perubahan" : "Tambahkan Pilar"}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
{/if}

<!-- Delete Confirmation Modal -->
{#if isDeleteModalOpen && pillarToDelete}
  <div
    class="modal-backdrop"
    role="dialog"
    aria-modal="true"
    aria-labelledby="delete-pillar-title"
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
      <h3 id="delete-pillar-title" class="confirm-title">
        Hapus Pilar Keahlian?
      </h3>
      <p class="confirm-desc">
        Apakah Anda yakin ingin menghapus pilar <strong
          >"{pillarToDelete.title}"</strong
        > beserta seluruh daftar kemampuannya? Tindakan ini tidak dapat dibatalkan.
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
          <span>Ya, Hapus Pilar</span>
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  .skills-admin-container {
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

  /* Pillars Grid */
  .pillars-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  .pillar-card {
    background: #ffffff;
    border: 1px solid rgba(10, 22, 40, 0.08);
    border-radius: 18px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 2px 8px rgba(10, 22, 40, 0.02);
    transition: all 0.2s ease;
  }

  .pillar-card:hover {
    border-color: rgba(10, 22, 40, 0.18);
    box-shadow: 0 8px 24px -4px rgba(10, 22, 40, 0.06);
  }

  .pillar-card.featured {
    border-top: 3px solid #0a1628;
  }

  .pillar-card-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
  }

  .pillar-badge-row {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .pillar-badge {
    font-size: 10.5px;
    font-weight: 800;
    letter-spacing: 0.06em;
    color: #2563eb;
    background: #eff6ff;
    padding: 3px 8px;
    border-radius: 6px;
  }

  .featured-tag {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 10.5px;
    font-weight: 700;
    color: #854d0e;
    background: #fef9c3;
    padding: 3px 8px;
    border-radius: 6px;
  }

  .pillar-actions {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .action-btn {
    width: 30px;
    height: 30px;
    border-radius: 6px;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    color: #64748b;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .action-btn:hover {
    background: #f1f5f9;
    color: #0a1628;
  }

  .action-btn.active {
    background: #fef9c3;
    color: #854d0e;
    border-color: #fde047;
  }

  .action-btn.edit:hover {
    background: #eff6ff;
    color: #2563eb;
  }

  .action-btn.delete:hover {
    background: #fee2e2;
    color: #dc2626;
  }

  .pillar-title {
    font-size: 18px;
    font-weight: 800;
    color: #0a1628;
    margin: 0 0 2px;
  }

  .pillar-subtitle {
    font-size: 12.5px;
    font-weight: 600;
    color: #64748b;
    margin-bottom: 10px;
  }

  .pillar-desc {
    font-size: 13.5px;
    color: #475569;
    line-height: 1.55;
    margin: 0 0 18px;
  }

  /* Skills Sublist */
  .skills-sublist {
    background: #f8fafc;
    border-radius: 12px;
    padding: 14px;
    margin-bottom: 16px;
  }

  .sublist-title {
    display: block;
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 0.08em;
    color: #94a3b8;
    margin-bottom: 10px;
  }

  .skill-items-grid {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .skill-row-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 13px;
  }

  .skill-item-name {
    color: #334155;
    font-weight: 600;
  }

  .level-badge {
    font-size: 10.5px;
    font-weight: 700;
    padding: 2px 7px;
    border-radius: 6px;
  }

  .level-badge.expert {
    background: #eff6ff;
    color: #2563eb;
  }
  .level-badge.master {
    background: #ecfdf5;
    color: #059669;
  }
  .level-badge.advanced {
    background: #f5f3ff;
    color: #7c3aed;
  }
  .level-badge.specialist {
    background: #fffbeb;
    color: #d97706;
  }

  /* Tools Footer */
  .tools-footer {
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding-top: 12px;
    border-top: 1px solid #f1f5f9;
  }

  .tools-label {
    font-size: 11px;
    color: #94a3b8;
    font-weight: 600;
  }

  .tools-tags {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;
  }

  .tool-tag {
    font-size: 11px;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    color: #475569;
    padding: 2px 8px;
    border-radius: 6px;
  }

  /* Empty State */
  .empty-state {
    grid-column: 1 / -1;
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

  .empty-icon {
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
    max-width: 640px;
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

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .label-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .hint-text {
    font-size: 11px;
    color: #94a3b8;
  }

  .form-group label {
    font-size: 12.5px;
    font-weight: 700;
    color: #0a1628;
  }

  .form-group input,
  .form-group textarea {
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
  .form-group textarea:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
  }

  /* Featured Switch Card */
  .featured-switch-card {
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

  .featured-switch-card.active {
    background: #eff6ff;
    border-color: #bfdbfe;
  }

  .switch-content {
    flex: 1;
    min-width: 0;
  }

  .switch-title {
    font-size: 13px;
    font-weight: 700;
    color: #0a1628;
  }

  .switch-desc {
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

  @media (max-width: 900px) {
    .pillars-grid {
      grid-template-columns: 1fr;
    }

    .form-grid-2 {
      grid-template-columns: 1fr;
    }
  }
</style>
