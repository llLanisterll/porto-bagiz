<script lang="ts">
	import { mockProfile } from '$lib/data/mockPortfolio';
	import { ArrowUpRight, Sparkles } from 'lucide-svelte';

	function scrollTo(e: MouseEvent, targetId: string) {
		e.preventDefault();
		const el = document.getElementById(targetId);
		if (el) {
			el.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	}
</script>

<section class="hero" id="home">
	<div class="container position-relative">
		<!-- Textio Angled Background Line -->
		<div class="bg-line"></div>

		<!-- Textio Rotating Circular Contact Me Stamp Animation -->
		<div class="contact-rotate-wrapper">
			<svg class="contact-me-rotate" viewBox="0 0 140 140" width="140" height="140">
				<path
					id="circlePath"
					d="M 70, 70 m -52, 0 a 52,52 0 1,1 104,0 a 52,52 0 1,1 -104,0"
					fill="none"
				></path>
				<text font-family="'Plus Jakarta Sans', sans-serif" font-size="10.8" font-weight="700" fill="#0a1628" letter-spacing="1.8">
					<textPath href="#circlePath" startOffset="0%">
						• CONTACT ME • LET'S TALK • GET IN TOUCH •
					</textPath>
				</text>
			</svg>
			<a
				class="contact-me-arrow"
				href="#contact"
				onclick={(e) => scrollTo(e, 'contact')}
				aria-label="Hubungi Muhammad Bagiz"
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
					{mockProfile.name}
				</h1>

				<!-- Subtitle Bio Description -->
				<p class="intro-info wow fadeInUp">
					{mockProfile.bio}
				</p>

				<!-- Primary Action Buttons -->
				<div class="btn-wrapper wow fadeInUp">
					<a
						href="#contact"
						class="bttn bttn-primary"
						onclick={(e) => scrollTo(e, 'contact')}
					>
						<span>Let's Talk</span>
						<ArrowUpRight size={17} />
					</a>

					<a
						href={mockProfile.resumeUrl}
						class="bttn bttn-secondary"
						target="_blank"
						rel="noopener"
					>
						<span>Download CV</span>
						<ArrowUpRight size={17} />
					</a>
				</div>

				<!-- Social Media Row with Arrow Graphic -->
				<div class="hero-social-row wow fadeInUp">
					<!-- Hand-drawn vector arrow pointing to socials -->
					<svg class="lg-arrow" width="110" height="24" viewBox="0 0 110 24" fill="none">
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
							<a href={mockProfile.socialLinks.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn" title="LinkedIn">
								<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
							</a>
						</li>
						<li>
							<a href={mockProfile.socialLinks.dribbble} target="_blank" rel="noopener" aria-label="Dribbble" title="Dribbble">
								<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><circle cx="12" cy="12" r="10"/><path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94"/><path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32"/><path d="M8.56 2.75c4.37 6 6 9.42 8 17.72"/></svg>
							</a>
						</li>
						<li>
							<a href={mockProfile.socialLinks.behance} target="_blank" rel="noopener" aria-label="Behance" title="Behance">
								<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M7.8 13.4c-1.3 0-1.8.8-1.9 1.8h3.7c0-1-.6-1.8-1.8-1.8zm11.5-1.9h-4.3c0-.9.6-1.4 1.5-1.4.7 0 1.2.3 1.4.8h1.4c-.3-1.3-1.4-2-2.8-2-1.9 0-3 1.4-3 3.3s1.1 3.3 3.1 3.3c1.7 0 2.8-.9 3-2.5h-1.4c-.2.7-.8 1.1-1.6 1.1-1 0-1.6-.6-1.6-1.6h5.7c.1-.4.1-.7.1-1zm-1.8-3.4h-2.9v-.9h2.9v.9zM2.8 8h4.6c2.1 0 3.3 1 3.3 2.5 0 .9-.5 1.7-1.4 2.1 1.2.4 1.7 1.3 1.7 2.4 0 1.8-1.4 2.8-3.6 2.8H2.8V8zm2.4 3.7h2c.8 0 1.3-.4 1.3-1.1 0-.7-.5-1-1.3-1h-2v2.1zm0 4.2h2.2c.9 0 1.5-.4 1.5-1.2 0-.8-.6-1.2-1.5-1.2H5.2v2.4z"/></svg>
							</a>
						</li>
						<li>
							<a href={mockProfile.socialLinks.instagram} target="_blank" rel="noopener" aria-label="Instagram" title="Instagram">
								<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
							</a>
						</li>
					</ul>
				</div>
			</div>

			<!-- Right: Profile Cutout Artwork -->
			<div class="hero-right wow fadeInRight">
				<div class="profile-pic-container">
					<div class="profile-shape-bg">
						<img
							src={mockProfile.avatar}
							alt={mockProfile.name}
							class="profile-img"
							loading="eager"
						/>
					</div>
					<!-- Subtle floating badge -->
					<div class="hero-float-badge">
						<span class="badge-dot"></span>
						<span>Tersedia untuk Kolaborasi</span>
					</div>
				</div>
			</div>
		</div>

		<!-- Textio Ghost Outline Profession Text -->
		<span class="profession wow fadeInUp">
			UI UX & PRODUCT DESIGNER
		</span>
	</div>
</section>

<style>
	.hero-float-badge {
		position: absolute;
		bottom: -15px;
		left: 20px;
		background: #ffffff;
		border: 1px solid rgba(10, 22, 40, 0.1);
		border-radius: 999px;
		padding: 8px 18px;
		display: inline-flex;
		align-items: center;
		gap: 8px;
		font-family: var(--ff-syne);
		font-size: 13px;
		font-weight: 700;
		color: #0a1628;
		box-shadow: 0 8px 24px rgba(10, 22, 40, 0.12);
	}
	.badge-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: #10b981;
		box-shadow: 0 0 8px rgba(16, 185, 129, 0.7);
	}
</style>
