<script lang="ts">
  import { goto } from "$app/navigation";
  import { portfolioStore } from "$lib/stores/portfolioStore.svelte";
  import { ArrowUpRight, Send, Check } from "lucide-svelte";

  let form = $state({
    name: "",
    email: "",
    service: "",
    message: "",
  });

  let sending = $state(false);
  let sent = $state(false);

  async function handleSubmit(e: Event) {
    e.preventDefault();
    sending = true;
    await new Promise((r) => setTimeout(r, 800));
    portfolioStore.addMessage({
      name: form.name,
      email: form.email,
      service: form.service || "Inquiry Desain & Strategi Bisnis",
      message: form.message,
    });
    sending = false;
    sent = true;
    setTimeout(() => {
      sent = false;
      form = { name: "", email: "", service: "", message: "" };
    }, 4000);
  }

  function scrollTo(e: MouseEvent, targetId: string) {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      goto(`/#${targetId}`);
    }
  }

  const contactNav = [
    { num: "01", title: "TENTANG SAYA", target: "about" },
    { num: "02", title: "KARYA TERBARU", target: "portfolio" },
    { num: "03", title: "PENGALAMAN", target: "pengalaman" },
    { num: "04", title: "KEAHLIAN & SPESIALISASI", target: "keahlian" },
  ];

  const contactEmail = $derived(
    portfolioStore.profile.socialLinks?.email || "baghiz.design@gmail.com",
  );

  const marqueeItems = $derived([
    "LET’S TALK",
    contactEmail.toUpperCase(),
    "WORK INQUIRIES",
    "DISCUSS PROJECTS",
    "INNOVATE TOGETHER",
  ]);
  const loopMarquee = $derived([
    ...marqueeItems,
    ...marqueeItems,
    ...marqueeItems,
  ]);
</script>

<section id="contact" class="contact">
  <!-- Top Email / Contact Marquee Track -->
  <div class="contact-marquee" aria-hidden="true">
    <div class="contact-marquee-track">
      {#each loopMarquee as item, idx (idx)}
        <div class="marquee-item">
          <h3 class:contact-stroke-white={idx % 2 === 1}>{item}</h3>
          <span class="marquee-bullet">•</span>
        </div>
      {/each}
    </div>
  </div>

  <div class="container">
    <div class="contact-grid">
      <!-- Left Column: Big Heading & Clean Form -->
      <div class="contact-left wow fadeInLeft">
        <h2 class="large-txt">Let's Contact!</h2>
        <p class="contact-sub">
          Siap melahirkan produk digital dengan visual memukau dan dampak bisnis
          terukur? Kirimkan pesan singkat dan mari jadwalkan diskusi awal.
        </p>

        <form class="contact-form" onsubmit={handleSubmit}>
          <div class="form-row-2">
            <div class="form-field">
              <label for="contact-name">Nama Anda</label>
              <input
                id="contact-name"
                type="text"
                placeholder="e.g. Amanda Putri"
                bind:value={form.name}
                required
              />
            </div>
            <div class="form-field">
              <label for="contact-email">Alamat Email</label>
              <input
                id="contact-email"
                type="email"
                placeholder="e.g. amanda@company.com"
                bind:value={form.email}
                required
              />
            </div>
          </div>

          <div class="form-field">
            <label for="contact-service">Kebutuhan / Layanan</label>
            <select
              id="contact-service"
              class="textio-select"
              bind:value={form.service}
              required
            >
              <option value="" disabled selected
                >Pilih Layanan Kolaborasi...</option
              >
              {#if portfolioStore.categories.length > 0}
                {#each portfolioStore.categories as cat}
                  <option value={cat.name}>{cat.name}</option>
                {/each}
              {:else if portfolioStore.skillPillars.length > 0}
                {#each portfolioStore.skillPillars as pil}
                  <option value={pil.title}>{pil.title}</option>
                {/each}
              {:else}
                <option value="UI/UX & Product Design End-to-End"
                  >UI/UX & Product Design End-to-End</option
                >
                <option value="Enterprise Design System & Token Ops"
                  >Enterprise Design System & Token Ops</option
                >
                <option value="Product Strategy & Monetization"
                  >Product Strategy & Monetization</option
                >
                <option value="Pitch Deck & Strategic Storytelling"
                  >Pitch Deck & Strategic Storytelling</option
                >
              {/if}
            </select>
          </div>

          <div class="form-field">
            <label for="contact-message">Pesan / Gambaran Proyek</label>
            <textarea
              id="contact-message"
              rows="4"
              placeholder="Ceritakan tujuan produk, ekspektasi linimasa, atau tantangan bisnis Anda saat ini..."
              bind:value={form.message}
              required></textarea>
          </div>

          <div class="form-submit-row">
            <button
              type="submit"
              class="bttn bttn-primary submit-bttn"
              disabled={sending || sent}
            >
              {#if sent}
                <Check size={18} />
                <span>Pesan Terkirim dengan Sukses!</span>
              {:else if sending}
                <span class="loading-spinner"></span>
                <span>Mengirimkan Pesan...</span>
              {:else}
                <span>Kirim Pesan Kolaborasi</span>
                <Send size={16} />
              {/if}
            </button>
          </div>
        </form>
      </div>

      <!-- Right Column: Numbered Navigation & Socials -->
      <div class="contact-right wow fadeInRight">
        <nav class="contact-nav-wrapper">
          <ul class="contact-nav-list">
            {#each contactNav as nav}
              <li>
                <a
                  href="#{nav.target}"
                  class="contact-nav-link"
                  onclick={(e) => scrollTo(e, nav.target)}
                >
                  <span class="link-num">{nav.num}</span>
                  <span class="link-txt">{nav.title}</span>
                  <ArrowUpRight size={20} class="link-arrow" />
                </a>
              </li>
            {/each}
            <li>
              <a
                href={portfolioStore.profile.resumeUrl || "#contact"}
                class="contact-nav-link"
                target={portfolioStore.profile.resumeUrl ? "_blank" : undefined}
                rel="noopener"
              >
                <span class="link-num">05</span>
                <span class="link-txt">UNDUH RESUME (PDF)</span>
                <ArrowUpRight size={20} class="link-arrow" />
              </a>
            </li>
          </ul>
        </nav>

        <!-- Social Circle Buttons -->
        <div class="contact-socials-wrapper">
          <h6 class="socials-label">TERHUBUNG DI MEDIA SOSIAL:</h6>
          <ul class="contact-social-pills">
            {#if portfolioStore.profile.socialLinks?.linkedin}
              <li>
                <a
                  href={portfolioStore.profile.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener"
                  aria-label="LinkedIn"
                >
                  <span>In</span>
                </a>
              </li>
            {/if}
            {#if portfolioStore.profile.socialLinks?.dribbble}
              <li>
                <a
                  href={portfolioStore.profile.socialLinks.dribbble}
                  target="_blank"
                  rel="noopener"
                  aria-label="Dribbble"
                >
                  <span>Dr</span>
                </a>
              </li>
            {/if}
            {#if portfolioStore.profile.socialLinks?.instagram}
              <li>
                <a
                  href={portfolioStore.profile.socialLinks.instagram}
                  target="_blank"
                  rel="noopener"
                  aria-label="Instagram"
                >
                  <span>Ig</span>
                </a>
              </li>
            {/if}
            <li>
              <a href="mailto:{contactEmail}" aria-label="Email">
                <span>@</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .marquee-item {
    display: flex;
    align-items: center;
    gap: 24px;
    padding-right: 24px;
  }
  .marquee-bullet {
    color: var(--clr-accent);
    font-size: 28px;
    line-height: 1;
  }

  .textio-select {
    background: transparent;
    border: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    color: #ffffff;
    font-family: var(--ff-manrope);
    font-size: 15px;
    padding: 10px 0;
    outline: none;
    cursor: pointer;
    width: 100%;
  }
  .textio-select option {
    background: #0a1628;
    color: #ffffff;
  }

  .form-submit-row {
    margin-top: 10px;
  }
  .submit-bttn {
    background: #ffffff;
    color: #0a1628;
    border: 1px solid #ffffff;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 16px 36px;
  }
  .submit-bttn:hover {
    background: var(--clr-accent);
    color: #ffffff;
    border-color: var(--clr-accent);
  }

  .loading-spinner {
    width: 16px;
    height: 16px;
    border: 2px solid #0a1628;
    border-top-color: transparent;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .contact-nav-link {
    display: flex;
    align-items: center;
    padding: 22px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.6);
    transition: all 0.3s ease;
  }
  .contact-nav-link:hover {
    color: #ffffff;
    padding-left: 10px;
  }
  .link-num {
    font-family: var(--ff-syne);
    font-size: 14px;
    font-weight: 700;
    color: var(--clr-accent);
    width: 36px;
  }
  .link-txt {
    font-family: var(--ff-syne);
    font-size: clamp(16px, 1.8vw, 22px);
    font-weight: 700;
    letter-spacing: 0.04em;
    flex: 1;
  }
  :global(.link-arrow) {
    opacity: 0.4;
    transition:
      transform 0.3s ease,
      opacity 0.3s ease;
  }
  .contact-nav-link:hover :global(.link-arrow) {
    opacity: 1;
    transform: translate(4px, -4px);
    color: var(--clr-accent);
  }

  .contact-socials-wrapper {
    margin-top: 48px;
  }
  .socials-label {
    font-family: var(--ff-syne);
    font-size: 12px;
    letter-spacing: 0.08em;
    color: #94a3b8;
    margin-bottom: 20px;
  }
  .contact-social-pills {
    display: flex;
    gap: 14px;
    list-style: none;
  }
  .contact-social-pills li a {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    font-family: var(--ff-syne);
    font-size: 15px;
    font-weight: 700;
    transition: all 0.3s ease;
  }
  .contact-social-pills li a:hover {
    background: #ffffff;
    color: #0a1628;
    border-color: #ffffff;
    transform: translateY(-4px);
  }

  @media (max-width: 576px) {
    .submit-bttn {
      width: 100%;
      justify-content: center;
      padding: 15px 24px;
    }
    .contact-social-pills {
      gap: 10px;
    }
    .contact-social-pills li a {
      width: 46px;
      height: 46px;
      font-size: 14px;
    }
  }
</style>
