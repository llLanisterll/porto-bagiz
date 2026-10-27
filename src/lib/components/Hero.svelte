<script lang="ts">
  import { portfolioStore } from "$lib/stores/portfolioStore.svelte";
  import { ArrowUpRight, Sparkles } from "lucide-svelte";

  function scrollTo(e: MouseEvent, targetId: string) {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
</script>

<section class="hero" id="home">
  <div class="container position-relative">
    <!-- Textio Angled Background Line -->
    <div class="bg-line"></div>

    <!-- Textio Rotating Circular Contact Me Stamp Animation -->
    <div class="contact-rotate-wrapper">
      <svg
        class="contact-me-rotate"
        viewBox="0 0 140 140"
        width="140"
        height="140"
      >
        <path
          id="circlePath"
          d="M 70, 70 m -52, 0 a 52,52 0 1,1 104,0 a 52,52 0 1,1 -104,0"
          fill="none"
        ></path>
        <text
          font-family="'Plus Jakarta Sans', sans-serif"
          font-size="10.8"
          font-weight="700"
          fill="#0a1628"
          letter-spacing="1.8"
        >
          <textPath href="#circlePath" startOffset="0%">
            • CONTACT ME • LET'S TALK • GET IN TOUCH •
          </textPath>
        </text>
      </svg>
      <a
        class="contact-me-arrow"
        href="#contact"
        onclick={(e) => scrollTo(e, "contact")}
        aria-label="Hubungi Muhammad Baghiz"
      >
        <ArrowUpRight size={22} />
      </a>
    </div>

    <!-- Hero Main Content Grid -->
    <div class="hero-content-grid">
      <div class="hero-left">
        <!-- Greeting with clean Sparkles icon -->
        <div class="hero-greeting wow fadeInUp">
          <Sparkles size={16} class="hi-sparkle" />
          <span>Hi there, I'm</span>
        </div>

        <!-- Giant Syne Title -->
        <h1 class="hero-title wow fadeInUp">
          {portfolioStore.profile.name}
        </h1>

        <!-- Subtitle Bio Description -->
        <p class="intro-info wow fadeInUp">
          {portfolioStore.profile.bio}
        </p>

        <!-- Primary Action Buttons -->
        <div class="btn-wrapper wow fadeInUp">
          <a
            href="#contact"
            class="bttn bttn-primary"
            onclick={(e) => scrollTo(e, "contact")}
          >
            <span>Let's Talk</span>
            <ArrowUpRight size={17} />
          </a>

          <a
            href={portfolioStore.profile.resumeUrl || "#contact"}
            class="bttn bttn-secondary"
            target={portfolioStore.profile.resumeUrl ? "_blank" : undefined}
            rel="noopener"
          >
            <span>Download CV</span>
            <ArrowUpRight size={17} />
          </a>
        </div>

        <!-- Social Media Row with Arrow Graphic -->
        <div class="hero-social-row wow fadeInUp">
          <!-- Hand-drawn vector arrow pointing to socials -->
          <svg
            class="lg-arrow"
            width="110"
            height="24"
            viewBox="0 0 110 24"
            fill="none"
          >
            <path
              d="M2 12C35 4 75 4 104 15M104 15L93 9M104 15L96 22"
              stroke="#0a1628"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <ul class="social-media">
            <li>
              <a
                href={portfolioStore.profile.socialLinks?.linkedin || "#"}
                target="_blank"
                rel="noopener"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  width="18"
                  height="18"
                  ><path
                    d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
                  /><rect width="4" height="12" x="2" y="9" /><circle
                    cx="4"
                    cy="4"
                    r="2"
                  /></svg
                >
              </a>
            </li>
            {#if portfolioStore.profile.socialLinks?.github}
              <li>
                <a
                  href={portfolioStore.profile.socialLinks.github}
                  target="_blank"
                  rel="noopener"
                  aria-label="GitHub"
                  title="GitHub"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    width="18"
                    height="18"
                    ><path
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"
                    /></svg
                  >
                </a>
              </li>
            {/if}
            <li>
              <a
                href={portfolioStore.profile.socialLinks?.instagram || "#"}
                target="_blank"
                rel="noopener"
                aria-label="Instagram"
                title="Instagram"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  width="18"
                  height="18"
                  ><rect
                    width="20"
                    height="20"
                    x="2"
                    y="2"
                    rx="5"
                    ry="5"
                  /><path
                    d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
                  /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg
                >
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Right: Profile Cutout Artwork -->
      <div class="hero-right wow fadeInRight">
        <div class="profile-pic-container">
          <div class="profile-shape-bg">
            {#if portfolioStore.profile.avatar}
              <img
                src={portfolioStore.profile.avatar}
                alt={portfolioStore.profile.name}
                class="profile-img"
                loading="eager"
              />
            {:else}
              <div class="profile-img-placeholder">
                <span class="placeholder-initials"
                  >{portfolioStore.profile.name
                    ? portfolioStore.profile.name
                        .split(" ")
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join("")
                    : "MB"}</span
                >
                <span class="placeholder-tag">Foto Profil Belum Diunggah</span>
              </div>
            {/if}
          </div>
          <!-- Subtle floating badge -->
          <div class="hero-float-badge">
            <span class="badge-dot"></span>
            <span
              >{portfolioStore.profile.availability ||
                "Tersedia untuk Kolaborasi"}</span
            >
          </div>
        </div>
      </div>
    </div>

    <!-- Textio Ghost Outline Profession Text -->
    <span class="profession wow fadeInUp">
      {portfolioStore.profile.headline
        ? portfolioStore.profile.headline.toUpperCase()
        : "UI UX & PRODUCT DESIGNER"}
    </span>
  </div>
</section>

<style>
  .hero-float-badge {
    position: absolute;
    bottom: -15px;
    left: 20px;
    background: var(--bg-surface);
    border: 1px solid var(--border-subtle);
    border-radius: 999px;
    padding: 8px 18px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: var(--ff-syne);
    font-size: 13px;
    font-weight: 700;
    color: var(--text-heading);
    box-shadow: 0 8px 24px rgba(10, 22, 40, 0.12);
  }
  :global(html.dark) .hero-float-badge {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
  }
  .badge-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #10b981;
    box-shadow: 0 0 8px rgba(16, 185, 129, 0.7);
  }

  .profile-img-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 30px;
    text-align: center;
  }
  .placeholder-initials {
    font-family: var(--ff-syne);
    font-size: clamp(56px, 8vw, 84px);
    font-weight: 800;
    letter-spacing: -0.02em;
    background: linear-gradient(135deg, #ffffff 30%, #93c5fd 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .placeholder-tag {
    font-size: 12.5px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.75);
    background: rgba(255, 255, 255, 0.1);
    padding: 6px 14px;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    backdrop-filter: blur(8px);
  }
</style>
