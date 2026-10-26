<script lang="ts">
  import { portfolioStore } from "$lib/stores/portfolioStore.svelte";
  import { authStore } from "$lib/stores/authStore.svelte";
  import { mockProfile } from "$lib/data/mockPortfolio";
  import type { UserProfile, StatItem } from "$lib/types/portfolio";
  import {
    UserCheck,
    Save,
    CheckCircle2,
    ExternalLink,
    RotateCcw,
    Sparkles,
    Link as LinkIcon,
    Mail,
    MapPin,
    Clock,
    Award,
    UploadCloud,
    Image as ImageIcon,
    Trash2,
    Camera,
    AlertCircle,
  } from "lucide-svelte";

  let toastMessage = $state("");
  let toastTimer: any = null;

  let adminLoginEmail = $state(authStore.credentials.email || 'admin@baghiz.design');
  let adminNewPassword = $state('');

  function showToast(msg: string) {
    if (toastTimer) clearTimeout(toastTimer);
    toastMessage = msg;
    toastTimer = setTimeout(() => (toastMessage = ""), 3200);
  }

  // Form clone initialized from portfolioStore.profile
  let formProfile = $state({
    name: portfolioStore.profile.name,
    headline: portfolioStore.profile.headline,
    tagline: portfolioStore.profile.tagline,
    bio: portfolioStore.profile.bio,
    avatar: portfolioStore.profile.avatar || mockProfile.avatar,
    location: portfolioStore.profile.location,
    availability: portfolioStore.profile.availability,
    resumeUrl: portfolioStore.profile.resumeUrl,
    aboutP1: portfolioStore.profile.aboutNarrative?.[0] || "",
    aboutP2: portfolioStore.profile.aboutNarrative?.[1] || "",
    aboutP3: portfolioStore.profile.aboutNarrative?.[2] || "",
    stat0Val: portfolioStore.profile.stats?.[0]?.value || "4+",
    stat0Lbl: portfolioStore.profile.stats?.[0]?.label || "Tahun Pengalaman",
    stat1Val: portfolioStore.profile.stats?.[1]?.value || "25+",
    stat1Lbl: portfolioStore.profile.stats?.[1]?.label || "Proyek Selesai",
    stat2Val: portfolioStore.profile.stats?.[2]?.value || "+38%",
    stat2Lbl:
      portfolioStore.profile.stats?.[2]?.label ||
      "Rata-rata Peningkatan Metrik",
    stat3Val: portfolioStore.profile.stats?.[3]?.value || "$2.5M+",
    stat3Lbl:
      portfolioStore.profile.stats?.[3]?.label || "Total Pendanaan Diakuisisi",
    email: portfolioStore.profile.socialLinks?.email || "",
    linkedin: portfolioStore.profile.socialLinks?.linkedin || "",
    behance: portfolioStore.profile.socialLinks?.behance || "",
    dribbble: portfolioStore.profile.socialLinks?.dribbble || "",
    github: portfolioStore.profile.socialLinks?.github || "",
    instagram: portfolioStore.profile.socialLinks?.instagram || "",
  });

  // Photo Upload Logic
  let fileInputRef: HTMLInputElement | null = $state(null);
  let isDragging = $state(false);
  let uploadError = $state("");

  function processImageFile(file: File) {
    uploadError = "";

    if (!file.type.startsWith("image/")) {
      uploadError =
        "Format file tidak didukung. Harap pilih gambar bertipe PNG, JPG, JPEG, atau WebP.";
      return;
    }

    // Check size: Max 3.5MB for storage in localStorage
    const maxSizeBytes = 3.5 * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      uploadError =
        "Ukuran file terlalu besar (maksimal 3.5 MB). Harap pilih foto dengan resolusi lebih ringkas atau kompres gambar.";
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (typeof e.target?.result === "string") {
        formProfile.avatar = e.target.result;
        showToast(
          'Foto profil baru berhasil dimuat! Klik "Simpan Semua Perubahan" untuk menerapkan.',
        );
      }
    };
    reader.onerror = () => {
      uploadError = "Terjadi kesalahan saat membaca file gambar.";
    };
    reader.readAsDataURL(file);
  }

  function handleFileInputChange(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      processImageFile(target.files[0]);
    }
  }

  function handleDragOver(e: DragEvent) {
    e.preventDefault();
    isDragging = true;
  }

  function handleDragLeave(e: DragEvent) {
    e.preventDefault();
    isDragging = false;
  }

  function handleDrop(e: DragEvent) {
    e.preventDefault();
    isDragging = false;
    if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
      processImageFile(e.dataTransfer.files[0]);
    }
  }

  function resetToDefaultAvatar() {
    formProfile.avatar = mockProfile.avatar;
    uploadError = "";
    showToast("Foto profil dikembalikan ke foto default bawaan.");
  }

  function removeAvatar() {
    formProfile.avatar = "";
    uploadError = "";
    showToast("Foto profil dikosongkan. Inisial MB akan digunakan.");
  }

  function handleSave(e: Event) {
    e.preventDefault();

    const aboutNarrative = [
      formProfile.aboutP1,
      formProfile.aboutP2,
      formProfile.aboutP3,
    ].filter(Boolean);

    const stats: StatItem[] = [
      {
        label: formProfile.stat0Lbl,
        value: formProfile.stat0Val,
        description: "Desain Produk & Riset Bisnis",
      },
      {
        label: formProfile.stat1Lbl,
        value: formProfile.stat1Val,
        description: "Aplikasi Web & Mobile",
      },
      {
        label: formProfile.stat2Lbl,
        value: formProfile.stat2Val,
        description: "Konversi & Efisiensi Pengguna",
      },
      {
        label: formProfile.stat3Lbl,
        value: formProfile.stat3Val,
        description: "Dukungan Riset & Pitch Deck",
      },
    ];

    const socialLinks = {
      email: formProfile.email,
      linkedin: formProfile.linkedin,
      behance: formProfile.behance,
      dribbble: formProfile.dribbble,
      github: formProfile.github,
      instagram: formProfile.instagram,
    };

    portfolioStore.updateProfile({
      name: formProfile.name.trim(),
      headline: formProfile.headline.trim(),
      tagline: formProfile.tagline.trim(),
      bio: formProfile.bio.trim(),
      avatar: formProfile.avatar.trim(),
      location: formProfile.location.trim(),
      availability: formProfile.availability.trim(),
      resumeUrl: formProfile.resumeUrl.trim(),
      aboutNarrative,
      stats,
      socialLinks,
    });

    if (adminLoginEmail || adminNewPassword) {
      const res = authStore.updateCredentials(
        adminLoginEmail.trim(),
        adminNewPassword.trim() ? adminNewPassword.trim() : undefined
      );
      if (!res.success) {
        showToast(res.message);
        return;
      }
      adminNewPassword = "";
    }

    showToast(
      "Profil, foto avatar & kredensial berhasil disimpan!",
    );
  }
</script>

<svelte:head>
  <title>Profil & Pengaturan Foto — Admin CMS {portfolioStore.profile.name || 'Muhammad Baghiz'}</title>
</svelte:head>

<div class="profile-admin-container">
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
        <UserCheck size={13} />
        <span>KONTEN DINAMIS & IDENTITAS</span>
      </div>
      <h1 class="page-title">Profil & Pengaturan Foto</h1>
      <p class="page-desc">
        Kelola foto profil/artwork hero, biodata utama, headline spesialisasi,
        narasi tentang saya (#about), angka pencapaian, dan tautan jejaring
        sosial.
      </p>
    </div>

    <div class="header-actions">
      <a href="/#about" target="_blank" rel="noopener" class="btn-preview-link">
        <span>Lihat di Beranda</span>
        <ExternalLink size={13} />
      </a>
      <button type="submit" form="profile-form" class="btn-primary">
        <Save size={15} />
        <span>Simpan Perubahan</span>
      </button>
    </div>
  </header>

  <form id="profile-form" onsubmit={handleSave} class="profile-cards-stack">
    <!-- Section 1: Pengaturan Upload Foto Profil & Artwork Hero -->
    <div class="form-card highlight-card">
      <div class="card-header">
        <div class="card-header-with-badge">
          <div>
            <h2 class="card-title">1. Foto Profil & Artwork Hero</h2>
            <p class="card-desc">
              Foto ini tampil sebagai cutout siluet pada Hero Banner beranda,
              thumbnail preview profil, dan navigasi admin.
            </p>
          </div>
          <span class="active-badge-pill">
            <Sparkles size={12} />
            <span>Sinkronisasi Live</span>
          </span>
        </div>
      </div>

      <div class="card-body">
        <div class="avatar-upload-grid">
          <!-- Left: Avatar Preview -->
          <div class="avatar-preview-col">
            <div class="avatar-preview-container">
              {#if formProfile.avatar}
                <img
                  src={formProfile.avatar}
                  alt="Pratinjau Foto Profil"
                  class="avatar-preview-img"
                />
              {:else}
                <div class="avatar-fallback-box">
                  <span>MB</span>
                </div>
              {/if}

              <!-- Floating Camera Icon Badge -->
              <button
                type="button"
                class="avatar-camera-btn"
                onclick={() => fileInputRef?.click()}
                title="Pilih file foto"
                aria-label="Pilih foto"
              >
                <Camera size={14} />
              </button>
            </div>

            <div class="avatar-badges-meta">
              <span class="avatar-meta-pill">
                <span class="meta-dot"></span>
                Hero Section Cutout
              </span>
              <span class="avatar-meta-pill">
                <span class="meta-dot"></span>
                Admin Monogram
              </span>
            </div>
          </div>

          <!-- Right: Upload Controls & Dropzone -->
          <div class="avatar-controls-col">
            <!-- Hidden File Input -->
            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg, image/webp"
              bind:this={fileInputRef}
              onchange={handleFileInputChange}
              class="hidden-file-input"
              aria-label="Upload file foto profil"
            />

            <!-- Drag and Drop Box -->
            <div
              class="dropzone-box"
              class:dragging={isDragging}
              ondragover={handleDragOver}
              ondragleave={handleDragLeave}
              ondrop={handleDrop}
              onclick={() => fileInputRef?.click()}
              role="button"
              tabindex="0"
              onkeydown={(e) => {
                if (e.key === "Enter" || e.key === " ") fileInputRef?.click();
              }}
            >
              <div class="dropzone-icon-box">
                <UploadCloud size={24} />
              </div>
              <div class="dropzone-content">
                <p class="dropzone-main-text">
                  <strong>Tarik & lepas foto ke sini</strong>, atau klik untuk
                  memilih file
                </p>
                <p class="dropzone-sub-text">
                  Mendukung PNG (latar transparan disarankan), JPG, JPEG, WebP.
                  Maksimal 3.5 MB.
                </p>
              </div>
              <button
                type="button"
                class="btn-choose-file"
                onclick={(e) => {
                  e.stopPropagation();
                  fileInputRef?.click();
                }}
              >
                <ImageIcon size={14} />
                <span>Pilih dari Perangkat</span>
              </button>
            </div>

            {#if uploadError}
              <div class="upload-error-box">
                <AlertCircle size={15} />
                <span>{uploadError}</span>
              </div>
            {/if}

            <!-- Direct URL Input Fallback -->
            <div class="url-input-block">
              <label for="prof-avatar-url" class="url-input-label">
                Atau masukkan tautan URL gambar (Unsplash / Cloudinary / Web):
              </label>
              <div class="url-input-wrapper">
                <input
                  id="prof-avatar-url"
                  type="url"
                  bind:value={formProfile.avatar}
                  placeholder="https://images.unsplash.com/photo-..."
                  class="url-text-input"
                />
                {#if formProfile.avatar}
                  <button
                    type="button"
                    class="url-clear-btn"
                    onclick={() => (formProfile.avatar = "")}
                    title="Bersihkan URL"
                  >
                    Hapus
                  </button>
                {/if}
              </div>
            </div>

            <!-- Reset / Remove Action Buttons -->
            <div class="avatar-quick-actions">
              <button
                type="button"
                class="btn-quick-action"
                onclick={resetToDefaultAvatar}
                title="Kembalikan ke foto bawaan Muhammad Baghiz"
              >
                <RotateCcw size={13} />
                <span>Gunakan Foto Bawaan</span>
              </button>

              {#if formProfile.avatar}
                <button
                  type="button"
                  class="btn-quick-action danger"
                  onclick={removeAvatar}
                  title="Hapus foto saat ini"
                >
                  <Trash2 size={13} />
                  <span>Hapus Foto</span>
                </button>
              {/if}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Section 2: Hero & Biodata Utama -->
    <div class="form-card">
      <div class="card-header">
        <h2 class="card-title">2. Identitas & Hero Banner</h2>
        <p class="card-desc">
          Informasi teks yang tampil pada bagian teratas website (Hero section).
        </p>
      </div>

      <div class="card-body">
        <div class="form-grid-2">
          <div class="form-group">
            <label for="prof-name">Nama Lengkap & Gelar *</label>
            <input
              id="prof-name"
              type="text"
              bind:value={formProfile.name}
              required
            />
          </div>
          <div class="form-group">
            <label for="prof-headline">Headline Spesialisasi *</label>
            <input
              id="prof-headline"
              type="text"
              bind:value={formProfile.headline}
              required
            />
          </div>
        </div>

        <div class="form-group">
          <label for="prof-tagline">Tagline Filosofi Desain *</label>
          <input
            id="prof-tagline"
            type="text"
            bind:value={formProfile.tagline}
            required
          />
        </div>

        <div class="form-grid-2">
          <div class="form-group">
            <label for="prof-location">Lokasi Domisili & Kebijakan Kerja</label>
            <input
              id="prof-location"
              type="text"
              bind:value={formProfile.location}
            />
          </div>
          <div class="form-group">
            <label for="prof-avail">Status Ketersediaan Proyek</label>
            <input
              id="prof-avail"
              type="text"
              bind:value={formProfile.availability}
            />
          </div>
        </div>

        <div class="form-group">
          <label for="prof-resume">Tautan File Resume / CV (PDF)</label>
          <input
            id="prof-resume"
            type="text"
            bind:value={formProfile.resumeUrl}
            placeholder="/cv-muhammad-baghiz.pdf atau https://..."
          />
        </div>
      </div>
    </div>

    <!-- Section 3: Tentang Saya Narasi -->
    <div class="form-card">
      <div class="card-header">
        <h2 class="card-title">3. Narasi Tentang Saya (Section #about)</h2>
        <p class="card-desc">
          Penjelasan komprehensif mengenai profil hibrida UX/UI dan Strategi
          Bisnis.
        </p>
      </div>

      <div class="card-body">
        <div class="form-group">
          <label for="prof-bio">Bio Singkat (One-Liner Hook) *</label>
          <textarea id="prof-bio" rows="2" bind:value={formProfile.bio} required
          ></textarea>
        </div>

        <div class="form-group">
          <label for="prof-p1">Paragraf 1: Pendahuluan & Filosofi</label>
          <textarea id="prof-p1" rows="3" bind:value={formProfile.aboutP1}
          ></textarea>
        </div>

        <div class="form-group">
          <label for="prof-p2"
            >Paragraf 2: Latar Belakang & Pengalaman Proyek</label
          >
          <textarea id="prof-p2" rows="3" bind:value={formProfile.aboutP2}
          ></textarea>
        </div>

        <div class="form-group">
          <label for="prof-p3">Paragraf 3: Nilai Tambah & Fokus Bisnis</label>
          <textarea id="prof-p3" rows="3" bind:value={formProfile.aboutP3}
          ></textarea>
        </div>
      </div>
    </div>

    <!-- Section 4: Metrik Kunci -->
    <div class="form-card">
      <div class="card-header">
        <h2 class="card-title">4. Angka & Metrik Pencapaian</h2>
        <p class="card-desc">
          Statistik ringkas yang tampil pada profil dan section tentang saya.
        </p>
      </div>

      <div class="card-body">
        <div class="form-grid-4">
          <div class="stat-edit-box">
            <label for="stat-0-val">Stat 1: Nilai</label>
            <input
              id="stat-0-val"
              type="text"
              bind:value={formProfile.stat0Val}
            />
            <label for="stat-0-lbl" class="sub-label">Label</label>
            <input
              id="stat-0-lbl"
              type="text"
              bind:value={formProfile.stat0Lbl}
            />
          </div>

          <div class="stat-edit-box">
            <label for="stat-1-val">Stat 2: Nilai</label>
            <input
              id="stat-1-val"
              type="text"
              bind:value={formProfile.stat1Val}
            />
            <label for="stat-1-lbl" class="sub-label">Label</label>
            <input
              id="stat-1-lbl"
              type="text"
              bind:value={formProfile.stat1Lbl}
            />
          </div>

          <div class="stat-edit-box">
            <label for="stat-2-val">Stat 3: Nilai</label>
            <input
              id="stat-2-val"
              type="text"
              bind:value={formProfile.stat2Val}
            />
            <label for="stat-2-lbl" class="sub-label">Label</label>
            <input
              id="stat-2-lbl"
              type="text"
              bind:value={formProfile.stat2Lbl}
            />
          </div>

          <div class="stat-edit-box">
            <label for="stat-3-val">Stat 4: Nilai</label>
            <input
              id="stat-3-val"
              type="text"
              bind:value={formProfile.stat3Val}
            />
            <label for="stat-3-lbl" class="sub-label">Label</label>
            <input
              id="stat-3-lbl"
              type="text"
              bind:value={formProfile.stat3Lbl}
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Section 5: Jejaring Sosial & Kontak -->
    <div class="form-card">
      <div class="card-header">
        <h2 class="card-title">5. Tautan Sosial & Kontak</h2>
        <p class="card-desc">
          Tautan profil profesional yang tercantum di header, footer, dan
          kontak.
        </p>
      </div>

      <div class="card-body">
        <div class="form-grid-2">
          <div class="form-group">
            <label for="prof-email">Email Resmi *</label>
            <input
              id="prof-email"
              type="email"
              bind:value={formProfile.email}
              required
            />
          </div>
          <div class="form-group">
            <label for="prof-linkedin">LinkedIn URL</label>
            <input
              id="prof-linkedin"
              type="url"
              bind:value={formProfile.linkedin}
            />
          </div>
          <div class="form-group">
            <label for="prof-dribbble">Dribbble URL</label>
            <input
              id="prof-dribbble"
              type="url"
              bind:value={formProfile.dribbble}
            />
          </div>
          <div class="form-group">
            <label for="prof-behance">Behance URL</label>
            <input
              id="prof-behance"
              type="url"
              bind:value={formProfile.behance}
            />
          </div>
          <div class="form-group">
            <label for="prof-github">GitHub URL</label>
            <input
              id="prof-github"
              type="url"
              bind:value={formProfile.github}
            />
          </div>
          <div class="form-group">
            <label for="prof-instagram">Instagram URL</label>
            <input
              id="prof-instagram"
              type="url"
              bind:value={formProfile.instagram}
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Section 6: Kredensial Login Admin (Akun Pengelola) -->
    <div class="form-card">
      <div class="card-header">
        <h2 class="card-title">6. Kredensial Login CMS (Akun Pengelola)</h2>
        <p class="card-desc">
          Sesuaikan alamat email dan kata sandi Anda sendiri untuk masuk ke CMS ini.
        </p>
      </div>

      <div class="card-body">
        <div class="form-grid-2">
          <div class="form-group">
            <label for="admin-login-email">Email Login Admin *</label>
            <input
              id="admin-login-email"
              type="email"
              bind:value={adminLoginEmail}
              placeholder="nama@email.com"
              required
            />
          </div>
          <div class="form-group">
            <label for="admin-login-password">Ganti Kata Sandi (Opsional)</label>
            <input
              id="admin-login-password"
              type="password"
              placeholder="Minimal 6 karakter (kosongkan jika tidak diubah)"
              bind:value={adminNewPassword}
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Sticky Save Action Bar at bottom -->
    <div class="sticky-action-bar">
      <span class="auto-save-note">
        <Sparkles size={14} />
        Perubahan foto dan profil akan langsung tersinkronisasi ke Hero section beranda
        dan topbar admin.
      </span>
      <button type="submit" class="btn-primary">
        <Save size={16} />
        <span>Simpan Semua Perubahan</span>
      </button>
    </div>
  </form>
</div>

<style>
  .profile-admin-container {
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding-bottom: 60px;
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
    animation: slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(12px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
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
    border: 1px solid #bfdbfe;
  }

  .page-title {
    font-size: 26px;
    font-weight: 800;
    color: #0a1628;
    margin: 0 0 6px;
    letter-spacing: -0.02em;
    font-family: "Syne", "Plus Jakarta Sans", sans-serif;
  }

  .page-desc {
    font-size: 14px;
    color: #475569;
    margin: 0;
    max-width: 680px;
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

  /* Form Stack */
  .profile-cards-stack {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .form-card {
    background: #ffffff;
    border: 1px solid rgba(10, 22, 40, 0.08);
    border-radius: 18px;
    padding: 26px;
    box-shadow: 0 2px 8px rgba(10, 22, 40, 0.02);
  }

  .form-card.highlight-card {
    border-color: #bfdbfe;
    box-shadow: 0 4px 20px rgba(37, 99, 235, 0.05);
  }

  .card-header {
    margin-bottom: 20px;
    padding-bottom: 14px;
    border-bottom: 1px solid #f1f5f9;
  }

  .card-header-with-badge {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;
  }

  .active-badge-pill {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 11.5px;
    font-weight: 700;
    color: #2563eb;
    background: #eff6ff;
    padding: 4px 10px;
    border-radius: 9999px;
    border: 1px solid #dbeafe;
  }

  .card-title {
    font-size: 17px;
    font-weight: 800;
    color: #0a1628;
    margin: 0 0 4px;
  }

  .card-desc {
    font-size: 13px;
    color: #64748b;
    margin: 0;
  }

  .card-body {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  /* Avatar Upload Grid */
  .avatar-upload-grid {
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: 28px;
    align-items: start;
  }

  .avatar-preview-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
  }

  .avatar-preview-container {
    width: 150px;
    height: 150px;
    border-radius: 24px;
    background: linear-gradient(135deg, #0a1628 0%, #1e293b 100%);
    position: relative;
    overflow: visible;
    box-shadow: 0 10px 25px rgba(10, 22, 40, 0.15);
    border: 3px solid #ffffff;
    outline: 1px solid rgba(10, 22, 40, 0.1);
  }

  .avatar-preview-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 21px;
    display: block;
  }

  .avatar-fallback-box {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 38px;
    font-weight: 800;
    color: #ffffff;
    font-family: "Syne", sans-serif;
    letter-spacing: -0.03em;
  }

  .avatar-camera-btn {
    position: absolute;
    bottom: -6px;
    right: -6px;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: #2563eb;
    color: #ffffff;
    border: 2px solid #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 3px 8px rgba(37, 99, 235, 0.35);
    transition: all 0.18s ease;
  }

  .avatar-camera-btn:hover {
    background: #1d4ed8;
    transform: scale(1.1);
  }

  .avatar-badges-meta {
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 100%;
  }

  .avatar-meta-pill {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    font-weight: 600;
    color: #475569;
    background: #f8fafc;
    padding: 4px 8px;
    border-radius: 6px;
    border: 1px solid #e2e8f0;
  }

  .meta-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #10b981;
  }

  /* Upload Controls */
  .avatar-controls-col {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .hidden-file-input {
    display: none;
  }

  .dropzone-box {
    border: 2px dashed #cbd5e1;
    border-radius: 14px;
    padding: 20px;
    background: #fafafa;
    display: flex;
    align-items: center;
    gap: 16px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .dropzone-box:hover,
  .dropzone-box.dragging {
    background: #eff6ff;
    border-color: #2563eb;
  }

  .dropzone-icon-box {
    width: 46px;
    height: 46px;
    border-radius: 12px;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    color: #2563eb;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .dropzone-content {
    flex: 1;
    min-width: 0;
  }

  .dropzone-main-text {
    font-size: 13.5px;
    color: #0a1628;
    margin: 0 0 3px;
  }

  .dropzone-sub-text {
    font-size: 11.5px;
    color: #64748b;
    margin: 0;
  }

  .btn-choose-file {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: #ffffff;
    border: 1px solid #cbd5e1;
    color: #0a1628;
    padding: 8px 14px;
    border-radius: 8px;
    font-size: 12.5px;
    font-weight: 600;
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.15s ease;
  }

  .btn-choose-file:hover {
    background: #f1f5f9;
    border-color: #94a3b8;
  }

  .upload-error-box {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #fef2f2;
    color: #b91c1c;
    border: 1px solid #fecaca;
    padding: 8px 12px;
    border-radius: 8px;
    font-size: 12px;
  }

  /* URL Input Block */
  .url-input-block {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .url-input-label {
    font-size: 12px;
    font-weight: 600;
    color: #64748b;
  }

  .url-input-wrapper {
    display: flex;
    align-items: center;
    position: relative;
  }

  .url-text-input {
    width: 100%;
    padding: 8px 65px 8px 12px;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    font-size: 13px;
    color: #0a1628;
    background: #ffffff;
    outline: none;
    transition: all 0.15s ease;
  }

  .url-text-input:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }

  .url-clear-btn {
    position: absolute;
    right: 8px;
    background: #f1f5f9;
    border: 1px solid #e2e8f0;
    color: #64748b;
    font-size: 11px;
    font-weight: 600;
    padding: 3px 8px;
    border-radius: 5px;
    cursor: pointer;
  }

  .url-clear-btn:hover {
    background: #e2e8f0;
    color: #0a1628;
  }

  /* Quick actions */
  .avatar-quick-actions {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }

  .btn-quick-action {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    color: #475569;
    padding: 6px 12px;
    border-radius: 7px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .btn-quick-action:hover {
    background: #f1f5f9;
    color: #0a1628;
  }

  .btn-quick-action.danger:hover {
    background: #fef2f2;
    color: #ef4444;
    border-color: #fecaca;
  }

  /* Form Grids */
  .form-grid-2 {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  .form-grid-4 {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }

  .stat-edit-box {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .stat-edit-box .sub-label {
    margin-top: 6px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .form-group label,
  .stat-edit-box label {
    font-size: 12.5px;
    font-weight: 700;
    color: #0a1628;
  }

  .form-group input,
  .form-group textarea,
  .stat-edit-box input {
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
  .stat-edit-box input:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
  }

  /* Sticky Action Bar */
  .sticky-action-bar {
    background: rgba(255, 255, 255, 0.94);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(226, 232, 240, 0.9);
    border-radius: 16px;
    padding: 16px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow:
      0 10px 25px -5px rgba(10, 22, 40, 0.08),
      0 8px 10px -6px rgba(10, 22, 40, 0.04);
    position: sticky;
    bottom: 24px;
    z-index: 50;
  }

  .auto-save-note {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 12.5px;
    color: #64748b;
    font-weight: 500;
  }

  @media (max-width: 900px) {
    .avatar-upload-grid {
      grid-template-columns: 1fr;
    }

    .avatar-preview-col {
      align-items: flex-start;
    }

    .form-grid-2,
    .form-grid-4 {
      grid-template-columns: 1fr;
    }

    .sticky-action-bar {
      flex-direction: column;
      gap: 12px;
      align-items: stretch;
    }
  }

  @media (max-width: 576px) {
    .header-actions {
      width: 100%;
      flex-direction: column;
      align-items: stretch;
    }
    .header-actions .btn-preview-link,
    .header-actions .btn-primary {
      width: 100%;
      justify-content: center;
    }
    .form-card {
      padding: 20px 16px;
    }
    .avatar-preview-container {
      width: 120px;
      height: 120px;
    }
  }
</style>
