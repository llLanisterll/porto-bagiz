<script lang="ts">
	import { portfolioStore } from '$lib/stores/portfolioStore.svelte';
	const year = new Date().getFullYear();

	function scrollToTop(e: MouseEvent) {
		e.preventDefault();
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<footer class="textio-footer">
	<div class="container">
		<div class="footer-wrapper">
			<div class="footer-left">
				<a href="/" class="footer-logo">
					{#if portfolioStore.profile.name}
						{@const parts = portfolioStore.profile.name.trim().split(' ')}
						{parts[parts.length - 1].toUpperCase()}<span class="txt-accent">.</span>
					{:else}
						BAGIZ<span class="txt-accent">.</span>
					{/if}
				</a>
				<p class="footer-meta">
					{portfolioStore.profile.headline || 'Lead UX/UI Designer & Business Strategist'}. {portfolioStore.profile.bio || 'Menghubungkan estetika antarmuka dengan dampak finansial terukur.'}
				</p>
			</div>

			<div class="footer-links">
				<a href="#about">Tentang</a>
				<a href="#portfolio">Karya</a>
				<a href="#pengalaman">Pengalaman</a>
				<a href="#keahlian">Keahlian</a>
				<a href="#contact">Kontak</a>
				<span class="dot-sep">•</span>
				<a href="/login" class="admin-link">Admin Portal</a>
			</div>
		</div>

		<div class="footer-bottom">
			<p class="copyright-txt">
				© {year} {portfolioStore.profile.name || 'Muhammad Bagiz'}. Dirancang presisi terinspirasi dari Textio Portfolio.
			</p>
			<a href="#top" class="back-to-top" onclick={scrollToTop}>
				<span>Kembali ke Atas ↑</span>
			</a>
		</div>
	</div>
</footer>

<style>
	.textio-footer {
		background: #060e1a;
		border-top: 1px solid rgba(255, 255, 255, 0.08);
		padding: 50px 0 30px;
		color: #ffffff;
	}
	.footer-wrapper {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-bottom: 40px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.08);
		gap: 30px;
		flex-wrap: wrap;
	}
	.footer-logo {
		font-family: var(--ff-syne);
		font-size: 28px;
		font-weight: 800;
		letter-spacing: -0.02em;
		color: #ffffff;
		display: inline-block;
		margin-bottom: 8px;
	}
	.txt-accent {
		color: var(--clr-accent);
	}
	.footer-meta {
		color: #94a3b8;
		font-size: 14px;
		max-width: 440px;
		line-height: 1.5;
	}

	.footer-links {
		display: flex;
		align-items: center;
		gap: 20px;
		flex-wrap: wrap;
	}
	.footer-links a {
		font-family: var(--ff-syne);
		font-size: 14px;
		font-weight: 700;
		color: #cbd5e1;
		transition: color 0.2s ease;
	}
	.footer-links a:hover {
		color: var(--clr-accent);
	}
	.dot-sep {
		color: rgba(255, 255, 255, 0.3);
	}
	.admin-link {
		color: #94a3b8 !important;
		font-weight: 500 !important;
	}
	.admin-link:hover {
		color: #ffffff !important;
	}

	.footer-bottom {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 24px;
		flex-wrap: wrap;
		gap: 16px;
	}
	.copyright-txt {
		font-size: 13.5px;
		color: #64748b;
	}
	.back-to-top {
		font-family: var(--ff-syne);
		font-size: 13px;
		font-weight: 700;
		color: #94a3b8;
		transition: color 0.2s ease;
	}
	.back-to-top:hover {
		color: #ffffff;
	}
</style>
