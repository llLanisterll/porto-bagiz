<script lang="ts">
	import { mockProfile } from '$lib/data/mockPortfolio';

	const followers = [
		{
			name: 'LinkedIn',
			count: '2.8K+ Koneksi & Network',
			href: mockProfile.socialLinks.linkedin,
			svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>`,
		},
		{
			name: 'Behance',
			count: '1.4K+ Kurasi & Case Studies',
			href: mockProfile.socialLinks.behance,
			svg: `<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M7.8 13.4c-1.3 0-1.8.8-1.9 1.8h3.7c0-1-.6-1.8-1.8-1.8zm11.5-1.9h-4.3c0-.9.6-1.4 1.5-1.4.7 0 1.2.3 1.4.8h1.4c-.3-1.3-1.4-2-2.8-2-1.9 0-3 1.4-3 3.3s1.1 3.3 3.1 3.3c1.7 0 2.8-.9 3-2.5h-1.4c-.2.7-.8 1.1-1.6 1.1-1 0-1.6-.6-1.6-1.6h5.7c.1-.4.1-.7.1-1zm-1.8-3.4h-2.9v-.9h2.9v.9zM2.8 8h4.6c2.1 0 3.3 1 3.3 2.5 0 .9-.5 1.7-1.4 2.1 1.2.4 1.7 1.3 1.7 2.4 0 1.8-1.4 2.8-3.6 2.8H2.8V8zm2.4 3.7h2c.8 0 1.3-.4 1.3-1.1 0-.7-.5-1-1.3-1h-2v2.1zm0 4.2h2.2c.9 0 1.5-.4 1.5-1.2 0-.8-.6-1.2-1.5-1.2H5.2v2.4z"/></svg>`,
		},
		{
			name: 'Dribbble',
			count: '950+ Shots & UI Kit',
			href: mockProfile.socialLinks.dribbble,
			svg: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94"/><path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32"/><path d="M8.56 2.75c4.37 6 6 9.42 8 17.72"/></svg>`,
		},
		{
			name: 'GitHub',
			count: 'Design Token Repos',
			href: mockProfile.socialLinks.github,
			svg: `<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>`,
		},
	];
</script>

<section class="followers-section">
	<div class="follower-grid">
		{#each followers as item, i}
			<a
				href={item.href}
				target="_blank"
				rel="noopener noreferrer"
				class="follower-card wow fadeInUp"
				class:delay-1={i===0} class:delay-2={i===1} class:delay-3={i===2} class:delay-4={i===3}
				style="text-decoration:none"
			>
				<div>
					<div class="follower-name">{item.name}</div>
					<div class="follower-count">{item.count}</div>
				</div>
				<div class="follower-icon-box">
					{@html item.svg}
				</div>
			</a>
		{/each}
	</div>
</section>
