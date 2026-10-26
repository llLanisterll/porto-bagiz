<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { ArrowUpRight, X, Mail, Phone, MapPin } from "lucide-svelte";
  import { portfolioStore } from "$lib/stores/portfolioStore.svelte";

  let sticky = $state(false);
  let sidebarOpen = $state(false);

  const navLinks = [
    { label: "Beranda", href: "#home" },
    { label: "Tentang", href: "#about" },
    { label: "Karya", href: "#portfolio" },
    { label: "Pengalaman", href: "#pengalaman" },
    { label: "Keahlian", href: "#keahlian" },
    { label: "Kontak", href: "#contact" },
  ];

  onMount(() => {
    function onScroll() {
      sticky = window.scrollY > 40;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  });

  function toggleSidebar() {
    sidebarOpen = !sidebarOpen;
  }
  function closeSidebar() {
    sidebarOpen = false;
  }

  function scrollTo(e: MouseEvent, href: string) {
    const targetId = href.replace("#", "");
    const el = document.getElementById(targetId);
    if (el) {
      e.preventDefault();
      sidebarOpen = false;
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      e.preventDefault();
      sidebarOpen = false;
      goto(`/${href}`);
    }
  }
</script>

<header class="header-section" class:menu-fixed={sticky}>
  <div class="header-wrapper">
    <!-- Brand Logo (Textio Typography) -->
    <div class="main-logo">
      <a class="logo" href="#home" onclick={(e) => scrollTo(e, "#home")}>
        {#if portfolioStore.profile.name}
          {@const parts = portfolioStore.profile.name.trim().split(" ")}
          {@const lastName =
            parts.length > 1 ? parts[parts.length - 1] : parts[0]}
          <span>{lastName.slice(0, 1)}</span><span class="logo-accent"
            >{lastName.slice(1, 2)}</span
          ><span>{lastName.slice(2)}</span>
        {:else}
          <span>B</span><span class="logo-accent">a</span><span>giz</span>
        {/if}
      </a>
    </div>

    <!-- Desktop Navigation Menu -->
    <nav
      class="d-none d-lg-block main-menu-desktop"
      aria-label="Navigasi Utama"
    >
      <ul class="main-menu">
        {#each navLinks as link}
          <li>
            <a href={link.href} onclick={(e) => scrollTo(e, link.href)}
              >{link.label}</a
            >
          </li>
        {/each}
      </ul>
    </nav>

    <!-- Right Component: Let's Talk CTA & Hamburger -->
    <div class="menu-components">
      <a
        class="lets-talk"
        href="#contact"
        onclick={(e) => scrollTo(e, "#contact")}
      >
        <span>Let's Talk</span>
        <ArrowUpRight size={16} />
      </a>

      <!-- Mobile Hamburger Bar -->
      <button
        type="button"
        class="header-bar"
        class:active={sidebarOpen}
        onclick={toggleSidebar}
        aria-label="Toggle menu navigasi"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </div>
</header>

<!-- Textio Offcanvas Sidebar Menu (.subside-barmenu) -->
<div class="subside-barmenu" class:active={sidebarOpen}>
  <div class="subside-inner">
    <button
      type="button"
      class="sidebar-close-btn"
      onclick={closeSidebar}
      aria-label="Tutup menu sidebar"
    >
      <X size={20} />
    </button>

    <div class="side-logo">
      <h4 class="logo">
        {#if portfolioStore.profile.name}
          {@const parts = portfolioStore.profile.name.trim().split(" ")}
          {@const lastName =
            parts.length > 1 ? parts[parts.length - 1] : parts[0]}
          <span>{lastName.slice(0, 1)}</span><span class="logo-accent"
            >{lastName.slice(1, 2)}</span
          ><span>{lastName.slice(2)}</span>
        {:else}
          <span>B</span><span class="logo-accent">a</span><span>giz</span>
        {/if}
      </h4>
    </div>

    <p class="side-desc">
      {portfolioStore.profile.headline ||
        "Product Designer & Business Strategist"}. {portfolioStore.profile
        .bio ||
        "Menghubungkan riset pengguna dengan arsitektur produk yang terbukti."}
    </p>

    <!-- Mobile Nav Links -->
    <nav class="side-nav">
      <ul>
        {#each navLinks as link}
          <li>
            <a href={link.href} onclick={(e) => scrollTo(e, link.href)}
              >{link.label}</a
            >
          </li>
        {/each}
      </ul>
    </nav>

    <!-- Contact Widgets -->
    <div class="side-contact-list">
      <div class="side-contact-item">
        <div class="contact-icon-box">
          <MapPin size={16} />
        </div>
        <div>
          <span class="widget-label">LOKASI</span>
          <div class="widget-val">
            {portfolioStore.profile.location || "Indonesia"}
          </div>
        </div>
      </div>

      <div class="side-contact-item">
        <div class="contact-icon-box">
          <Mail size={16} />
        </div>
        <div>
          <span class="widget-label">EMAIL RESMI</span>
          <a
            href="mailto:{portfolioStore.profile.socialLinks?.email ||
              'baghiz.design@gmail.com'}"
            class="widget-val"
          >
            {portfolioStore.profile.socialLinks?.email ||
              "baghiz.design@gmail.com"}
          </a>
        </div>
      </div>

      <div class="side-contact-item">
        <div class="contact-icon-box">
          <Phone size={16} />
        </div>
        <div>
          <span class="widget-label">KETERSEDIAAN</span>
          <span class="widget-val"
            >{portfolioStore.profile.availability ||
              "Tersedia untuk Proyek"}</span
          >
        </div>
      </div>
    </div>

    <a
      href="#contact"
      class="bttn bttn-primary side-cta"
      onclick={(e) => scrollTo(e, "#contact")}
    >
      <span>Let's Talk</span>
      <ArrowUpRight size={16} />
    </a>
  </div>
</div>

{#if sidebarOpen}
  <!-- Backdrop overlay -->
  <button
    type="button"
    class="sidebar-backdrop"
    onclick={closeSidebar}
    aria-label="Tutup sidebar"
  ></button>
{/if}

<style>
  /* Offcanvas Sidebar */
  .subside-barmenu {
    position: fixed;
    top: 0;
    right: -360px;
    width: 340px;
    height: 100vh;
    background: #ffffff;
    z-index: 100000;
    transition: right 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: -10px 0 30px rgba(10, 22, 40, 0.15);
    overflow-y: auto;
  }
  .subside-barmenu.active {
    right: 0;
  }

  .subside-inner {
    padding: 32px 24px;
    display: flex;
    flex-direction: column;
  }

  .sidebar-close-btn {
    align-self: flex-end;
    width: 38px;
    height: 38px;
    border-radius: 8px;
    background: #0a1628;
    color: #ffffff;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    transition: transform 0.2s ease;
  }
  .sidebar-close-btn:hover {
    transform: scale(1.05);
  }

  .side-logo .logo {
    font-family: var(--ff-syne);
    font-size: 28px;
    font-weight: 700;
    letter-spacing: -0.01em;
    color: #0a1628;
    margin-bottom: 14px;
  }
  .side-desc {
    font-size: 13.5px;
    color: #64748b;
    line-height: 1.55;
    margin-bottom: 28px;
  }

  .side-nav ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    border-top: 1px solid rgba(10, 22, 40, 0.08);
    border-bottom: 1px solid rgba(10, 22, 40, 0.08);
    padding: 12px 0;
    margin-bottom: 28px;
  }
  .side-nav li a {
    font-family: var(--ff-syne);
    font-size: 16px;
    font-weight: 700;
    color: #0a1628;
    padding: 10px 0;
    display: block;
    transition: color 0.2s ease;
  }
  .side-nav li a:hover {
    color: var(--clr-accent);
    padding-left: 6px;
  }

  .side-contact-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 30px;
  }
  .side-contact-item {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .contact-icon-box {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: #f1f5f9;
    color: #0a1628;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .widget-label {
    font-family: var(--ff-syne);
    font-size: 10.5px;
    font-weight: 700;
    color: var(--clr-accent);
    display: block;
    letter-spacing: 0.05em;
  }
  .widget-val {
    font-size: 13px;
    font-weight: 600;
    color: #0a1628;
  }

  .side-cta {
    width: 100%;
    text-align: center;
  }

  .sidebar-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(10, 22, 40, 0.4);
    backdrop-filter: blur(4px);
    z-index: 99999;
    border: none;
    cursor: pointer;
  }
</style>
