<script lang="ts">
  import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-svelte";

  interface Testimonial {
    text: string;
    name: string;
    role: string;
    company: string;
    avatar: string;
    metricHighlight: string;
  }

  const testimonials: Testimonial[] = [
    {
      text: "baghiz adalah profil hibrida yang sangat langka. Ia tidak hanya merancang antarmuka dompet digital kami menjadi sangat intuitif, tetapi juga menyusun strategi retensi berbasis unit economics yang meningkatkan konversi pengguna baru kami hingga 42%.",
      name: "Budi Santoso",
      role: "VP of Product",
      company: "NexaPay Financial",
      avatar:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=160&q=80",
      metricHighlight: "+42% Konversi Pengguna",
    },
    {
      text: "Design system multi-brand yang dibangun baghiz memangkas siklus rilis fitur tim engineering kami dari 3 minggu menjadi 4 hari kerja. Konsistensi visual dan dokumentasi Figma Variables-nya luar biasa rapi.",
      name: "Sari Dewi",
      role: "Head of Design & Brand",
      company: "Aura Commerce Group",
      avatar:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&q=80",
      metricHighlight: "55% Efisiensi Delivery",
    },
    {
      text: "Kemampuan baghiz menyusun riset pasar, pemodelan finansial SaaS, dan pitch deck investasi menjadi kunci sukses kami mengamankan $1.4M ARR serta kemitraan dengan 8 korporasi FMCG terkemuka.",
      name: "Rizky Pratama",
      role: "Chief Operating Officer",
      company: "Velo Logistics B2B",
      avatar:
        "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?w=160&q=80",
      metricHighlight: "$1.4M ARR Secured",
    },
  ];

  let currentIndex = $state(0);

  function prev() {
    currentIndex =
      (currentIndex - 1 + testimonials.length) % testimonials.length;
  }

  function next() {
    currentIndex = (currentIndex + 1) % testimonials.length;
  }

  const current = $derived(testimonials[currentIndex]);
</script>

<section id="testimonials" class="testimonial">
  <div class="container">
    <!-- Section Header -->
    <div class="section-title wow fadeInUp">
      <h3>Testimoni Klien</h3>
      <span></span>
    </div>

    <!-- Textio Ghost Outline Title -->
    <div class="testimonial-ghost-title wow fadeInUp">TESTIMONIAL</div>

    <!-- Testimonial Showcase Card -->
    <div class="testimonial-card wow fadeInUp">
      <div class="testimonial-main">
        <div class="quote-header">
          <div class="quote-badge">
            <Quote size={28} class="quote-icon" />
          </div>
          <div class="star-rating">
            {#each Array(5) as _}
              <Star size={18} fill="#f59e0b" color="#f59e0b" />
            {/each}
          </div>
          <span class="metric-badge">{current.metricHighlight}</span>
        </div>

        <blockquote class="testimonial-quote">
          “{current.text}”
        </blockquote>

        <div class="client-info">
          <img
            src={current.avatar}
            alt={current.name}
            class="client-avatar"
            loading="lazy"
          />
          <div>
            <h4 class="client-name">{current.name}</h4>
            <p class="client-role">
              {current.role} •
              <strong class="company-name">{current.company}</strong>
            </p>
          </div>
        </div>
      </div>

      <!-- Navigation & Counter Controls -->
      <div class="testimonial-controls">
        <div class="testi-counter">
          <span class="curr-num">0{currentIndex + 1}</span>
          <span class="total-num">/ 0{testimonials.length}</span>
        </div>

        <div class="testimonial-nav-btns">
          <button
            type="button"
            class="testi-btn"
            onclick={prev}
            aria-label="Testimoni sebelumnya"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            type="button"
            class="testi-btn"
            onclick={next}
            aria-label="Testimoni berikutnya"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .quote-header {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 24px;
    flex-wrap: wrap;
  }
  .quote-badge {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    background: rgba(37, 99, 235, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  :global(.quote-icon) {
    color: var(--clr-accent);
  }
  .star-rating {
    display: flex;
    gap: 4px;
  }
  .metric-badge {
    margin-left: auto;
    font-family: var(--ff-syne);
    font-size: 13px;
    font-weight: 700;
    color: var(--clr-navy);
    background: #f1f5f9;
    padding: 6px 14px;
    border-radius: 999px;
  }

  .company-name {
    color: var(--clr-accent);
    font-weight: 600;
  }

  .testimonial-controls {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 24px;
    padding-left: 30px;
    border-left: 1px solid rgba(10, 22, 40, 0.08);
  }
  @media (max-width: 768px) {
    .testimonial-controls {
      padding-left: 0;
      border-left: none;
      border-top: 1px solid rgba(10, 22, 40, 0.08);
      padding-top: 24px;
      flex-direction: row;
      justify-content: space-between;
      width: 100%;
    }
  }

  .testi-counter {
    font-family: var(--ff-syne);
    font-weight: 800;
  }
  .curr-num {
    font-size: 32px;
    color: var(--clr-navy);
  }
  .total-num {
    font-size: 16px;
    color: var(--clr-gray);
    margin-left: 4px;
  }
</style>
