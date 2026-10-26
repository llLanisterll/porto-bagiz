<script lang="ts">
  import { portfolioStore } from "$lib/stores/portfolioStore.svelte";
  import Navbar from "$lib/components/Navbar.svelte";
  import Hero from "$lib/components/Hero.svelte";
  import SkillsSlider from "$lib/components/SkillsSlider.svelte";
  import AboutSection from "$lib/components/AboutSection.svelte";
  import ProjectsSection from "$lib/components/ProjectsSection.svelte";
  import ExperienceSection from "$lib/components/ExperienceSection.svelte";
  import MarqueeSection from "$lib/components/MarqueeSection.svelte";
  import SkillsSection from "$lib/components/SkillsSection.svelte";
  import BrandsSection from "$lib/components/BrandsSection.svelte";
  import ContactSection from "$lib/components/ContactSection.svelte";
  import Footer from "$lib/components/Footer.svelte";
</script>

<svelte:head>
  <title
    >{portfolioStore.profile.name || "Muhammad Baghiz"} • {portfolioStore
      .profile.headline || "Lead UX/UI Designer & Business Strategist"}</title
  >
  <meta
    name="description"
    content={portfolioStore.profile.bio ||
      "Portfolio Muhammad Baghiz — Lead UX/UI Designer & Business Strategist. Desain produk terukur terinspirasi dari estetika modern Textio dengan palet navy elegan."}
  />
</svelte:head>

<!-- Textio Header & Navigation -->
<Navbar />

<main id="main-content">
  <!-- 01. Hero Banner with Waving Hand, Rotating Stamp & Ghost Outline Text -->
  <Hero />

  <!-- 02. Skills Carousel with 300px Rounded Pill Cards -->
  <SkillsSlider />

  <!-- 03. About Statement with Giant 6+ Year Counter & Circular Button -->
  <AboutSection />

  <!-- 04. Asymmetric Projects Grid with Circular Hover Button -->
  <ProjectsSection />

  <!-- 05. Expandable Career Experience Accordion -->
  <ExperienceSection />

  <!-- 06. Two-Tone Kinetic Marquee Animation -->
  <MarqueeSection />

  <!-- 08. In-Depth Skills & Expertise Matrix with Hover Invert -->
  <SkillsSection />

  <!-- 09. Trusted Brands / Companies Infinite Ticker -->
  <BrandsSection />

  <!-- 10. Top Marquee Contact Section with Numbered Navigation -->
  <ContactSection />
</main>

<!-- Textio Minimalist Footer -->
<Footer />
