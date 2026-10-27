<script lang="ts">
	import { themeStore } from '$lib/stores/themeStore.svelte';
	import { Sun, Moon } from 'lucide-svelte';

	interface Props {
		showLabel?: boolean;
		compact?: boolean;
		class?: string;
	}

	let { showLabel = false, compact = false, class: className = '' }: Props = $props();
</script>

<button
	type="button"
	class="theme-toggle-btn {compact ? 'is-compact' : ''} {showLabel ? 'has-label' : ''} {className}"
	onclick={() => themeStore.toggleTheme()}
	aria-label={themeStore.isDark ? 'Beralih ke mode terang' : 'Beralih ke mode gelap'}
	title={themeStore.isDark ? 'Beralih ke Mode Terang' : 'Beralih ke Mode Gelap'}
>
	<span class="icon-shell" class:is-dark={themeStore.isDark}>
		{#if themeStore.isDark}
			<Sun size={compact ? 17 : 19} class="theme-glyph sun-glyph" />
		{:else}
			<Moon size={compact ? 17 : 19} class="theme-glyph moon-glyph" />
		{/if}
	</span>

	{#if showLabel}
		<span class="theme-label-txt">
			{themeStore.isDark ? 'Mode Terang' : 'Mode Gelap'}
		</span>
	{/if}
</button>

<style>
	.theme-toggle-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		width: 44px;
		height: 44px;
		border-radius: 999px;
		background: #f8fafc;
		border: 1px solid rgba(10, 22, 40, 0.12);
		color: #0a1628;
		cursor: pointer;
		padding: 0;
		transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
		position: relative;
		overflow: hidden;
		flex-shrink: 0;
	}

	.theme-toggle-btn:hover {
		transform: translateY(-2px);
		border-color: var(--clr-accent, #2563eb);
		box-shadow: 0 4px 16px rgba(37, 99, 235, 0.16);
		color: var(--clr-accent, #2563eb);
	}

	.theme-toggle-btn.is-compact {
		width: 36px;
		height: 36px;
	}

	.theme-toggle-btn.has-label {
		width: auto;
		padding: 8px 16px;
		height: auto;
		min-height: 40px;
	}

	.icon-shell {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	.theme-toggle-btn:hover .icon-shell {
		transform: rotate(25deg);
	}

	.icon-shell.is-dark {
		color: #f59e0b;
	}

	:global(.theme-glyph) {
		transition: transform 0.3s ease;
	}

	.theme-label-txt {
		font-family: var(--ff-syne, 'Plus Jakarta Sans', sans-serif);
		font-size: 13.5px;
		font-weight: 700;
		letter-spacing: -0.01em;
	}

	/* Dark mode styling */
	:global(html.dark) .theme-toggle-btn {
		background: #111e38;
		border-color: rgba(255, 255, 255, 0.15);
		color: #f8fafc;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
	}

	:global(html.dark) .theme-toggle-btn:hover {
		background: #17284b;
		border-color: #60a5fa;
		box-shadow: 0 4px 20px rgba(96, 165, 250, 0.25);
		color: #ffffff;
	}
</style>
