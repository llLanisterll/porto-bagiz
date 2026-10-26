<script lang="ts">
  import { portfolioStore } from "$lib/stores/portfolioStore.svelte";
  import type { ContactMessage } from "$lib/types/portfolio";
  import {
    MessageSquare,
    Search,
    CheckCircle2,
    X,
    Mail,
    MailOpen,
    Send,
    Trash2,
    Clock,
    ExternalLink,
    Check,
    Filter,
    AlertTriangle,
  } from "lucide-svelte";

  let searchQuery = $state("");
  let statusFilter: "semua" | "belum_dibaca" | "dibalas" = $state("semua");
  let toastMessage = $state("");
  let toastTimer: any = null;

  function showToast(msg: string) {
    if (toastTimer) clearTimeout(toastTimer);
    toastMessage = msg;
    toastTimer = setTimeout(() => (toastMessage = ""), 3000);
  }

  // Delete state
  let isDeleteModalOpen = $state(false);
  let messageToDelete: ContactMessage | null = $state(null);

  function confirmDelete(msg: ContactMessage) {
    messageToDelete = msg;
    isDeleteModalOpen = true;
  }

  function executeDelete() {
    if (messageToDelete) {
      portfolioStore.deleteMessage(messageToDelete.id);
      showToast(`Pesan dari ${messageToDelete.name} telah dihapus.`);
      isDeleteModalOpen = false;
      messageToDelete = null;
    }
  }

  function toggleRead(id: string) {
    portfolioStore.markMessageRead(id);
    showToast("Pesan ditandai telah dibaca.");
  }

  function toggleReplied(id: string) {
    portfolioStore.markMessageReplied(id);
    showToast("Status balasan pesan diperbarui.");
  }

  function formatDate(iso: string) {
    try {
      const d = new Date(iso);
      return d.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return iso;
    }
  }

  const unreadCount = $derived(
    portfolioStore.messages.filter((m) => !m.isRead).length,
  );
  const repliedCount = $derived(
    portfolioStore.messages.filter((m) => m.isReplied).length,
  );

  const filteredMessages = $derived.by(() => {
    let list = portfolioStore.messages;

    if (statusFilter === "belum_dibaca") {
      list = list.filter((m) => !m.isRead);
    } else if (statusFilter === "dibalas") {
      list = list.filter((m) => m.isReplied);
    }

    const q = searchQuery.toLowerCase().trim();
    if (q) {
      list = list.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.email.toLowerCase().includes(q) ||
          m.service.toLowerCase().includes(q) ||
          m.message.toLowerCase().includes(q),
      );
    }

    return list;
  });
</script>

<svelte:head>
  <title>Pesan Masuk — Admin CMS baghiz</title>
</svelte:head>

<div class="messages-admin-container">
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
        <MessageSquare size={13} />
        <span>KOMUNIKASI KLIEN</span>
      </div>
      <h1 class="page-title">Pesan & Inquiry Masuk</h1>
      <p class="page-desc">
        Daftar pesan dan permintaan konsultasi yang dikirimkan langsung oleh
        calon klien atau mitra melalui formulir kontak di beranda website.
      </p>
    </div>

    <div class="header-actions">
      <a
        href="/#contact"
        target="_blank"
        rel="noopener"
        class="btn-preview-link"
      >
        <span>Lihat Form di Beranda</span>
        <ExternalLink size={13} />
      </a>
    </div>
  </header>

  <!-- Filter & Tabs Bar -->
  <div class="filter-bar">
    <div class="tabs-group">
      <button
        class="tab-btn"
        class:active={statusFilter === "semua"}
        onclick={() => (statusFilter = "semua")}
      >
        <span>Semua</span>
        <span class="tab-count">{portfolioStore.messages.length}</span>
      </button>

      <button
        class="tab-btn"
        class:active={statusFilter === "belum_dibaca"}
        onclick={() => (statusFilter = "belum_dibaca")}
      >
        <span>Belum Dibaca</span>
        {#if unreadCount > 0}
          <span class="tab-count alert">{unreadCount}</span>
        {:else}
          <span class="tab-count">0</span>
        {/if}
      </button>

      <button
        class="tab-btn"
        class:active={statusFilter === "dibalas"}
        onclick={() => (statusFilter = "dibalas")}
      >
        <span>Sudah Dibalas</span>
        <span class="tab-count">{repliedCount}</span>
      </button>
    </div>

    <div class="search-input-wrap">
      <Search size={16} class="search-icon" />
      <input
        type="text"
        placeholder="Cari pengirim, email, atau isi pesan..."
        bind:value={searchQuery}
        class="search-input"
      />
      {#if searchQuery}
        <button class="clear-btn" onclick={() => (searchQuery = "")}>
          <X size={14} />
        </button>
      {/if}
    </div>
  </div>

  <!-- Messages List -->
  <div class="messages-list-wrapper">
    {#if filteredMessages.length === 0}
      <div class="empty-state">
        <Mail size={36} class="empty-icon" />
        <h3>Tidak ada pesan dalam kategori ini</h3>
        <p>
          Setiap pesan baru yang dikirimkan pengunjung akan langsung masuk ke
          sini.
        </p>
      </div>
    {:else}
      {#each filteredMessages as msg (msg.id)}
        <article class="msg-card" class:unread={!msg.isRead}>
          <div class="msg-card-header">
            <div class="sender-info">
              <div class="sender-avatar">
                <span>{msg.name.slice(0, 2).toUpperCase()}</span>
              </div>
              <div>
                <div class="name-status-row">
                  <h3 class="sender-name">{msg.name}</h3>
                  {#if !msg.isRead}
                    <span class="status-badge-unread">Baru</span>
                  {/if}
                  {#if msg.isReplied}
                    <span class="status-badge-replied">
                      <Check size={11} />
                      Dibalas
                    </span>
                  {/if}
                </div>
                <div class="sender-meta">
                  <a href="mailto:{msg.email}" class="sender-email">
                    <Mail size={12} />
                    {msg.email}
                  </a>
                  <span class="meta-sep">•</span>
                  <span class="msg-date">
                    <Clock size={12} />
                    {formatDate(msg.createdAt)}
                  </span>
                </div>
              </div>
            </div>

            <div class="service-pill-wrap">
              <span class="service-tag">{msg.service}</span>
            </div>
          </div>

          <div class="msg-body">
            <p>{msg.message}</p>
          </div>

          <div class="msg-card-footer">
            <div class="footer-actions">
              {#if !msg.isRead}
                <button class="action-btn" onclick={() => toggleRead(msg.id)}>
                  <MailOpen size={14} />
                  <span>Tandai Dibaca</span>
                </button>
              {/if}

              <button
                class="action-btn"
                class:active={msg.isReplied}
                onclick={() => toggleReplied(msg.id)}
              >
                <Check size={14} />
                <span
                  >{msg.isReplied
                    ? "Batal Status Balas"
                    : "Tandai Dibalas"}</span
                >
              </button>

              <a
                href="mailto:{msg.email}?subject=Tanggapan%20Inquiry%20Portofolio%20Muhammad%20baghiz&body=Halo%20{encodeURIComponent(
                  msg.name,
                )},%0D%0A%0D%0ATerima%20kasih%20telah%20menghubungi%20saya.%0D%0A%0D%0A"
                class="action-btn reply"
                target="_blank"
                rel="noopener"
              >
                <Send size={14} />
                <span>Balas Email</span>
              </a>
            </div>

            <button
              class="action-btn delete"
              onclick={() => confirmDelete(msg)}
              title="Hapus pesan"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </article>
      {/each}
    {/if}
  </div>
</div>

<!-- Delete Confirmation Modal -->
{#if isDeleteModalOpen && messageToDelete}
  <div
    class="modal-backdrop"
    role="dialog"
    aria-modal="true"
    aria-labelledby="delete-msg-title"
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
      <h3 id="delete-msg-title" class="confirm-title">Hapus Pesan Masuk?</h3>
      <p class="confirm-desc">
        Apakah Anda yakin ingin menghapus pesan dari <strong
          >"{messageToDelete.name}"</strong
        >
        ({messageToDelete.email})? Tindakan ini tidak dapat dibatalkan.
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
          <span>Ya, Hapus Pesan</span>
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  .messages-admin-container {
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

  /* Filter Bar */
  .filter-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    background: #ffffff;
    padding: 10px 18px;
    border-radius: 14px;
    border: 1px solid rgba(10, 22, 40, 0.08);
    flex-wrap: wrap;
  }

  .tabs-group {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .tab-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    border-radius: 8px;
    border: none;
    background: transparent;
    color: #64748b;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .tab-btn:hover {
    background: #f1f5f9;
    color: #0a1628;
  }

  .tab-btn.active {
    background: #0a1628;
    color: #ffffff;
  }

  .tab-count {
    font-size: 11px;
    font-weight: 700;
    background: #f1f5f9;
    color: #475569;
    padding: 1px 7px;
    border-radius: 9999px;
  }

  .tab-btn.active .tab-count {
    background: rgba(255, 255, 255, 0.2);
    color: #ffffff;
  }

  .tab-count.alert {
    background: #ef4444;
    color: #ffffff;
  }

  .search-input-wrap {
    display: flex;
    align-items: center;
    gap: 10px;
    flex: 1;
    max-width: 380px;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    padding: 7px 12px;
    border-radius: 8px;
  }

  :global(.search-icon) {
    color: #94a3b8;
  }

  .search-input {
    border: none;
    outline: none;
    font-size: 13px;
    color: #0a1628;
    width: 100%;
    background: transparent;
  }

  .clear-btn {
    background: transparent;
    border: none;
    color: #94a3b8;
    cursor: pointer;
    padding: 2px;
  }

  /* Messages List */
  .messages-list-wrapper {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .msg-card {
    background: #ffffff;
    border: 1px solid rgba(10, 22, 40, 0.08);
    border-radius: 16px;
    padding: 22px;
    box-shadow: 0 2px 8px rgba(10, 22, 40, 0.02);
    transition: all 0.2s ease;
  }

  .msg-card:hover {
    border-color: rgba(10, 22, 40, 0.18);
    box-shadow: 0 8px 24px -4px rgba(10, 22, 40, 0.06);
  }

  .msg-card.unread {
    border-left: 4px solid #2563eb;
    background: #fcfdfe;
  }

  .msg-card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 16px;
    margin-bottom: 14px;
    padding-bottom: 14px;
    border-bottom: 1px solid #f1f5f9;
  }

  .sender-info {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .sender-avatar {
    width: 42px;
    height: 42px;
    background: #0a1628;
    color: #ffffff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    font-weight: 800;
    flex-shrink: 0;
  }

  .name-status-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 4px;
  }

  .sender-name {
    font-size: 16px;
    font-weight: 800;
    color: #0a1628;
    margin: 0;
  }

  .status-badge-unread {
    font-size: 10px;
    background: #ef4444;
    color: #ffffff;
    font-weight: 800;
    padding: 2px 7px;
    border-radius: 9999px;
  }

  .status-badge-replied {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 10.5px;
    background: #ecfdf5;
    color: #059669;
    font-weight: 700;
    padding: 2px 8px;
    border-radius: 9999px;
  }

  .sender-meta {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12.5px;
    color: #64748b;
  }

  .sender-email {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    color: #2563eb;
    text-decoration: none;
    font-weight: 600;
  }

  .sender-email:hover {
    text-decoration: underline;
  }

  .meta-sep {
    color: #cbd5e1;
  }

  .msg-date {
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }

  .service-tag {
    font-size: 11.5px;
    background: #eff6ff;
    color: #2563eb;
    font-weight: 700;
    padding: 4px 10px;
    border-radius: 6px;
  }

  .msg-body {
    font-size: 14px;
    color: #334155;
    line-height: 1.65;
    margin-bottom: 18px;
    white-space: pre-wrap;
  }

  .msg-card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 14px;
    border-top: 1px solid #f1f5f9;
  }

  .footer-actions {
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
    text-decoration: none;
    transition: all 0.15s ease;
  }

  .action-btn:hover {
    background: #f1f5f9;
    color: #0a1628;
  }

  .action-btn.active {
    background: #ecfdf5;
    color: #059669;
    border-color: #a7f3d0;
  }

  .action-btn.reply {
    background: #0a1628;
    color: #ffffff;
    border-color: #0a1628;
  }

  .action-btn.reply:hover {
    background: #162844;
  }

  .action-btn.delete {
    color: #94a3b8;
  }

  .action-btn.delete:hover {
    background: #fee2e2;
    color: #dc2626;
    border-color: #fecaca;
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

  .modal-box.small {
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
</style>
