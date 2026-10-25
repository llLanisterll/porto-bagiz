<script lang="ts">
	import './layout.css';
	import type { LayoutProps } from './$types';
	import { onMount } from 'svelte';
	import { ArrowUp } from 'lucide-svelte';

	let { children }: LayoutProps = $props();

	let loaded = $state(false);
	let scrollProgress = $state(0);
	let isProgressActive = $state(false);

	onMount(() => {
		// Preloader dismiss
		const timer = setTimeout(() => {
			loaded = true;
		}, 750);

		// Circular scroll progress calculation
		function handleScroll() {
			const scrollTop = window.scrollY || document.documentElement.scrollTop;
			const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
			const progress = docHeight > 0 ? (scrollTop / docHeight) * 307.919 : 0;
			scrollProgress = Math.max(0, 307.919 - progress);
			isProgressActive = scrollTop > 250;
		}

		window.addEventListener('scroll', handleScroll, { passive: true });
		handleScroll();

		// Intersection Observer for Textio WOW animations
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('animated');
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.02, rootMargin: '120px 0px 50px 0px' }
		);

		function observeWow() {
			document.querySelectorAll('.wow').forEach((el) => observer.observe(el));
		}

		observeWow();
		setTimeout(observeWow, 500);
		setTimeout(observeWow, 1200);

		return () => {
			clearTimeout(timer);
			window.removeEventListener('scroll', handleScroll);
			observer.disconnect();
		};
	});

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<svelte:head>
	<title>Muhammad Bagiz • Lead Product Designer & Business Strategist</title>
	<meta
		name="description"
		content="Portofolio Muhammad Bagiz — Lead Product Designer & Business Strategist. Menghubungkan estetika antarmuka dengan dampak strategi bisnis terukur."
	/>
</svelte:head>

<!-- Textio Split Curtain Preloader -->
<div id="preloader" class:loaded>
	<div class="container-preloader">
		<div class="animation-preloader">
			<div class="main-logo">
				<h2>B<span class="txt-navy">a</span>giz</h2>
			</div>
		</div>
		<div class="loader-section section-left"></div>
		<div class="loader-section section-right"></div>
	</div>
</div>

<!-- Textio Signature Circular Progress Bar (.progress-wrap) -->
<button
	type="button"
	class="progress-wrap"
	class:active-progress={isProgressActive}
	onclick={scrollToTop}
	title="Kembali ke atas"
	aria-label="Kembali ke atas"
>
	<svg class="progress-circle" width="100%" height="100%" viewBox="-1 -1 102 102">
		<path
			d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"
			style="stroke-dasharray: 307.919, 307.919; stroke-dashoffset: {scrollProgress};"
		></path>
	</svg>
	<span class="progress-arrow">
		<ArrowUp size={16} />
	</span>
</button>

{@render children()}
