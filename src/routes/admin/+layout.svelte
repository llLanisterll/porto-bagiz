<script lang="ts">
	import { authStore } from '$lib/stores/authStore.svelte';
	import { portfolioStore } from '$lib/stores/portfolioStore.svelte';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import {
		LayoutDashboard,
		FolderKanban,
		Tags,
		Briefcase,
		Layers,
		UserCheck,
		MessageSquare,
		ExternalLink,
		LogOut,
		ShieldCheck,
		Menu,
		X,
		ChevronRight,
		ArrowUpRight,
		Sparkles
	} from 'lucide-svelte';

	let { children } = $props();

	let mobileSidebarOpen = $state(false);

	$effect(() => {
		const currentPath = page.url.pathname;
		if (
			!authStore.isAuthenticated &&
			!currentPath.includes('/admin/login') &&
			!currentPath.includes('/admin/lupa-sandi')
		) {
			goto('/admin/login');
		}
	});

	// Close mobile sidebar whenever route changes
	$effect(() => {
		// track page pathname
		const _ = page.url.pathname;
		mobileSidebarOpen = false;
	});

	function handleLogout() {
		authStore.logout();
		goto('/admin/login');
	}

	function toggleMobileSidebar() {
		mobileSidebarOpen = !mobileSidebarOpen;
	}

	const isAuthPage = $derived(
		page.url.pathname.includes('/admin/login') || page.url.pathname.includes('/admin/lupa-sandi')
	);

	const unreadMessagesCount = $derived(
		portfolioStore.messages.filter((m) => !m.isRead).length
	);

	const currentPageTitle = $derived.by(() => {
		const path = page.url.pathname;
		if (path.includes('/admin/kategori')) return 'Master Kategori Karya';
		if (path.includes('/admin/karya')) return 'Karya & Studi Kasus';
		if (path.includes('/admin/pengalaman')) return 'Pengalaman';
		if (path.includes('/admin/keahlian')) return 'Keahlian & Spesialisasi';
		if (path.includes('/admin/profil')) return 'Profil & Tentang';
		if (path.includes('/admin/pesan')) return 'Pesan Masuk';
		return 'Ringkasan Dashboard';
	});
</script>

<svelte:head>
	<title>Admin CMS Panel — Portofolio {portfolioStore.profile.name || 'Muhammad Bagiz'}</title>
</svelte:head>

<div class="admin-app">
	{#if !isAuthPage && authStore.isAuthenticated}
		<!-- Mobile Backdrop -->
		{#if mobileSidebarOpen}
			<button
				class="sidebar-backdrop"
				onclick={() => (mobileSidebarOpen = false)}
				aria-label="Tutup Menu"
			></button>
		{/if}

		<!-- Left Sidebar Layout -->
		<aside class="admin-sidebar" class:open={mobileSidebarOpen}>
			<!-- Brand Header -->
			<div class="sidebar-header">
				<a href="/admin" class="sidebar-brand">
					<div class="brand-monogram">
						<span>{portfolioStore.profile.name ? portfolioStore.profile.name.split(' ').filter(Boolean).map((n) => n[0]).slice(0, 2).join('').toUpperCase() : 'MB'}</span>
						<span class="live-dot" title="Tersinkronisasi Real-time"></span>
					</div>
					<div class="brand-meta">
						<div class="brand-title-row">
							<span class="brand-title">Admin CMS</span>
							<span class="brand-pill">Pro v2.5</span>
						</div>
						<span class="brand-sub">Portofolio {portfolioStore.profile.name || 'Muhammad Bagiz'}</span>
					</div>
				</a>

				<button
					class="mobile-close-btn"
					onclick={() => (mobileSidebarOpen = false)}
					aria-label="Tutup sidebar"
				>
					<X size={18} />
				</button>
			</div>

			<!-- Dynamic Navigation Groups -->
			<nav class="sidebar-nav" aria-label="Navigasi Pengelola">
				<!-- Group 1: Utama -->
				<div class="nav-group">
					<span class="nav-group-title">UTAMA</span>
					<a
						href="/admin"
						class="nav-link"
						class:active={page.url.pathname === '/admin' || page.url.pathname === '/admin/'}
					>
						<LayoutDashboard size={18} class="nav-icon" />
						<span class="nav-text">Ringkasan</span>
					</a>
				</div>

				<!-- Group 2: Konten Dinamis -->
				<div class="nav-group">
					<span class="nav-group-title">KONTEN DINAMIS</span>

					<!-- 1. Karya & Studi Kasus -->
					<a
						href="/admin/karya"
						class="nav-link"
						class:active={page.url.pathname === '/admin/karya' || page.url.pathname.startsWith('/admin/karya/')}
					>
						<FolderKanban size={18} class="nav-icon" />
						<span class="nav-text">Karya & Proyek</span>
						<span class="nav-count">{portfolioStore.projects.length}</span>
					</a>

					<!-- 2. Master Kategori -->
					<a
						href="/admin/kategori"
						class="nav-link"
						class:active={page.url.pathname.includes('/admin/kategori')}
					>
						<Tags size={18} class="nav-icon" />
						<span class="nav-text">Master Kategori</span>
						<span class="nav-count">{portfolioStore.categories.length}</span>
					</a>

					<!-- 3. Pengalaman -->
					<a
						href="/admin/pengalaman"
						class="nav-link"
						class:active={page.url.pathname.includes('/admin/pengalaman')}
					>
						<Briefcase size={18} class="nav-icon" />
						<span class="nav-text">Pengalaman</span>
						<span class="nav-count">{portfolioStore.experiences.length}</span>
					</a>

					<!-- 4. Keahlian & Spesialisasi -->
					<a
						href="/admin/keahlian"
						class="nav-link"
						class:active={page.url.pathname.includes('/admin/keahlian')}
					>
						<Layers size={18} class="nav-icon" />
						<span class="nav-text">Keahlian</span>
						<span class="nav-count">{portfolioStore.skillPillars.length}</span>
					</a>

					<!-- 5. Profil & Tentang -->
					<a
						href="/admin/profil"
						class="nav-link"
						class:active={page.url.pathname.includes('/admin/profil')}
					>
						<UserCheck size={18} class="nav-icon" />
						<span class="nav-text">Profil & Tentang</span>
					</a>
				</div>

				<!-- Group 3: Komunikasi & Pesan -->
				<div class="nav-group">
					<span class="nav-group-title">KOMUNIKASI</span>

					<a
						href="/admin/pesan"
						class="nav-link"
						class:active={page.url.pathname.includes('/admin/pesan')}
					>
						<MessageSquare size={18} class="nav-icon" />
						<span class="nav-text">Pesan Masuk</span>
						{#if unreadMessagesCount > 0}
							<span class="nav-count alert">{unreadMessagesCount}</span>
						{:else}
							<span class="nav-count">{portfolioStore.messages.length}</span>
						{/if}
					</a>
				</div>

				<!-- Group 4: Pintasan Luar -->
				<div class="nav-group">
					<span class="nav-group-title">PINTASAN</span>

					<a
						href="/"
						target="_blank"
						rel="noopener"
						class="nav-link external-link"
						title="Buka website publik di tab baru"
					>
						<ExternalLink size={18} class="nav-icon" />
						<span class="nav-text">Lihat Website</span>
						<ArrowUpRight size={14} class="nav-arrow" />
					</a>
				</div>
			</nav>

			<!-- Sidebar Footer User Profile -->
			<div class="sidebar-footer">
				<div class="user-card">
					<div class="user-avatar">
						{#if portfolioStore.profile.avatar}
							<img
								src={portfolioStore.profile.avatar}
								alt={portfolioStore.profile.name}
								class="user-avatar-img"
							/>
						{:else}
							<span>{portfolioStore.profile.name ? portfolioStore.profile.name.split(' ').filter(Boolean).map((n) => n[0]).slice(0, 2).join('').toUpperCase() : 'MB'}</span>
						{/if}
					</div>
					<div class="user-info">
						<span class="user-name">{portfolioStore.profile.name || 'Muhammad Bagiz'}</span>
						<div class="user-badge-row">
							<ShieldCheck size={11} />
							<span>Lead Admin</span>
						</div>
					</div>
					<button
						class="logout-icon-btn"
						onclick={handleLogout}
						title="Keluar dari sesi admin"
						aria-label="Logout"
					>
						<LogOut size={16} />
					</button>
				</div>
				<div class="sync-status-pill">
					<span class="sync-dot"></span>
					<span>Live Sync ke Beranda Aktif</span>
				</div>
			</div>
		</aside>

		<!-- Main Workspace Area -->
		<div class="admin-main-wrap">
			<!-- Topbar -->
			<header class="admin-topbar">
				<div class="topbar-left">
					<button
						class="mobile-menu-btn"
						onclick={toggleMobileSidebar}
						aria-label="Buka navigasi sidebar"
					>
						<Menu size={20} />
					</button>

					<!-- Breadcrumb -->
					<div class="topbar-breadcrumb">
						<span class="crumb-root">Admin CMS</span>
						<ChevronRight size={14} class="crumb-sep" />
						<span class="crumb-current">{currentPageTitle}</span>
					</div>
				</div>

				<div class="topbar-right">
					<div class="live-indicator-pill">
						<span class="indicator-dot"></span>
						<span class="indicator-text">Tersinkronisasi Real-time</span>
					</div>

					<a href="/" target="_blank" rel="noopener" class="preview-site-btn">
						<span>Lihat Website</span>
						<ExternalLink size={13} />
					</a>
				</div>
			</header>

			<!-- Main View Body -->
			<main class="admin-content-area">
				{@render children()}
			</main>
		</div>
	{:else}
		<!-- Pure view for Login and Password Reset -->
		<main class="admin-auth-main">
			{@render children()}
		</main>
	{/if}
</div>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		background-color: #f8fafc;
		font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
	}

	.admin-app {
		display: flex;
		min-height: 100vh;
		background-color: #f8fafc;
		color: #0a1628;
		font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
	}

	/* ==================== SIDEBAR STYLES ==================== */
	.admin-sidebar {
		width: 260px;
		min-width: 260px;
		background: #ffffff;
		border-right: 1px solid rgba(10, 22, 40, 0.08);
		display: flex;
		flex-direction: column;
		position: sticky;
		top: 0;
		height: 100vh;
		z-index: 100;
		box-shadow: 2px 0 16px -4px rgba(10, 22, 40, 0.03);
		transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
	}

	/* Brand Header */
	.sidebar-header {
		padding: 20px 20px 18px;
		border-bottom: 1px solid rgba(10, 22, 40, 0.06);
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.sidebar-brand {
		display: flex;
		align-items: center;
		gap: 12px;
		text-decoration: none;
		color: inherit;
	}

	.brand-monogram {
		width: 40px;
		height: 40px;
		background: #0a1628;
		color: #ffffff;
		border-radius: 12px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 800;
		font-size: 16px;
		letter-spacing: -0.02em;
		position: relative;
		box-shadow: 0 4px 12px rgba(10, 22, 40, 0.15);
	}

	.live-dot {
		position: absolute;
		top: -2px;
		right: -2px;
		width: 10px;
		height: 10px;
		background: #10b981;
		border: 2px solid #ffffff;
		border-radius: 50%;
		animation: pulse-ring 2s infinite;
	}

	@keyframes pulse-ring {
		0%,
		100% {
			transform: scale(1);
			opacity: 1;
		}
		50% {
			transform: scale(1.2);
			opacity: 0.8;
		}
	}

	.brand-meta {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.brand-title-row {
		display: flex;
		align-items: center;
		gap: 6px;
	}

	.brand-title {
		font-size: 15px;
		font-weight: 800;
		color: #0a1628;
		letter-spacing: -0.01em;
	}

	.brand-pill {
		font-size: 10px;
		font-weight: 700;
		background: #eff6ff;
		color: #2563eb;
		padding: 2px 6px;
		border-radius: 9999px;
		border: 1px solid rgba(37, 99, 235, 0.15);
	}

	.brand-sub {
		font-size: 11px;
		color: #64748b;
		font-weight: 500;
	}

	.mobile-close-btn {
		display: none;
		background: transparent;
		border: none;
		color: #64748b;
		cursor: pointer;
		padding: 6px;
		border-radius: 8px;
	}

	/* Navigation */
	.sidebar-nav {
		padding: 16px 14px;
		display: flex;
		flex-direction: column;
		gap: 20px;
		overflow-y: auto;
		flex: 1;
	}

	.nav-group {
		display: flex;
		flex-direction: column;
		gap: 3px;
	}

	.nav-group-title {
		font-size: 10px;
		font-weight: 800;
		letter-spacing: 0.08em;
		color: #94a3b8;
		padding: 0 10px 6px;
	}

	.nav-link {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 9px 12px;
		border-radius: 10px;
		color: #475569;
		text-decoration: none;
		font-size: 13.5px;
		font-weight: 600;
		transition: all 0.18s ease;
		position: relative;
	}

	.nav-link:hover {
		background: #f1f5f9;
		color: #0a1628;
	}

	.nav-link.active {
		background: #0a1628;
		color: #ffffff;
		box-shadow: 0 4px 14px rgba(10, 22, 40, 0.12);
	}

	:global(.nav-icon) {
		flex-shrink: 0;
		opacity: 0.85;
	}

	.nav-link.active :global(.nav-icon) {
		opacity: 1;
		color: #ffffff;
	}

	.nav-text {
		flex: 1;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.nav-count {
		font-size: 11px;
		font-weight: 700;
		background: #f1f5f9;
		color: #475569;
		padding: 2px 7px;
		border-radius: 9999px;
		transition: all 0.18s ease;
	}

	.nav-link.active .nav-count {
		background: rgba(255, 255, 255, 0.2);
		color: #ffffff;
	}

	.nav-count.alert {
		background: #ef4444;
		color: #ffffff;
	}

	.nav-arrow {
		font-size: 12px;
		opacity: 0.6;
	}

	/* Footer User Card */
	.sidebar-footer {
		padding: 14px;
		border-top: 1px solid rgba(10, 22, 40, 0.06);
		background: #fafafa;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.user-card {
		display: flex;
		align-items: center;
		gap: 10px;
		background: #ffffff;
		padding: 8px 10px;
		border-radius: 12px;
		border: 1px solid rgba(10, 22, 40, 0.07);
	}

	.user-avatar {
		width: 34px;
		height: 34px;
		background: #0a1628;
		color: #ffffff;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 12px;
		font-weight: 700;
		flex-shrink: 0;
		overflow: hidden;
		border: 1px solid rgba(10, 22, 40, 0.08);
	}

	.user-avatar-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	.user-info {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-direction: column;
	}

	.user-name {
		font-size: 12.5px;
		font-weight: 700;
		color: #0a1628;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.user-badge-row {
		display: flex;
		align-items: center;
		gap: 4px;
		font-size: 10.5px;
		color: #2563eb;
		font-weight: 600;
	}

	.logout-icon-btn {
		background: transparent;
		border: none;
		color: #94a3b8;
		cursor: pointer;
		padding: 6px;
		border-radius: 8px;
		transition: all 0.15s ease;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.logout-icon-btn:hover {
		background: #fee2e2;
		color: #ef4444;
	}

	.sync-status-pill {
		display: flex;
		align-items: center;
		gap: 6px;
		font-size: 10.5px;
		color: #64748b;
		padding: 0 4px;
		font-weight: 500;
	}

	.sync-dot {
		width: 6px;
		height: 6px;
		background: #10b981;
		border-radius: 50%;
	}

	/* ==================== MAIN WORKSPACE ==================== */
	.admin-main-wrap {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	/* Topbar */
	.admin-topbar {
		height: 64px;
		background: rgba(255, 255, 255, 0.9);
		backdrop-filter: blur(16px);
		-webkit-backdrop-filter: blur(16px);
		border-bottom: 1px solid rgba(10, 22, 40, 0.08);
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 28px;
		position: sticky;
		top: 0;
		z-index: 40;
	}

	.topbar-left {
		display: flex;
		align-items: center;
		gap: 14px;
	}

	.mobile-menu-btn {
		display: none;
		background: transparent;
		border: 1px solid #e2e8f0;
		color: #0a1628;
		padding: 6px;
		border-radius: 8px;
		cursor: pointer;
	}

	.topbar-breadcrumb {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 13.5px;
	}

	.crumb-root {
		color: #64748b;
		font-weight: 500;
	}

	:global(.crumb-sep) {
		color: #cbd5e1;
	}

	.crumb-current {
		color: #0a1628;
		font-weight: 700;
	}

	.topbar-right {
		display: flex;
		align-items: center;
		gap: 14px;
	}

	.live-indicator-pill {
		display: flex;
		align-items: center;
		gap: 7px;
		background: #f0fdf4;
		border: 1px solid #bbf7d0;
		color: #166534;
		font-size: 12px;
		font-weight: 600;
		padding: 5px 12px;
		border-radius: 9999px;
	}

	.indicator-dot {
		width: 7px;
		height: 7px;
		background: #10b981;
		border-radius: 50%;
		animation: pulse-ring 2s infinite;
	}

	.preview-site-btn {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 7px 14px;
		border-radius: 9999px;
		background: #0a1628;
		color: #ffffff;
		font-size: 12.5px;
		font-weight: 600;
		text-decoration: none;
		transition: all 0.2s ease;
	}

	.preview-site-btn:hover {
		background: #162844;
		transform: translateY(-1px);
		box-shadow: 0 4px 12px rgba(10, 22, 40, 0.15);
	}

	/* Content Area */
	.admin-content-area {
		flex: 1;
		padding: 32px 32px 64px;
		max-width: 1400px;
		width: 100%;
		box-sizing: border-box;
		margin: 0 auto;
	}

	.admin-auth-main {
		width: 100%;
		min-height: 100vh;
	}

	/* ==================== RESPONSIVE ==================== */
	@media (max-width: 992px) {
		.admin-sidebar {
			position: fixed;
			top: 0;
			left: 0;
			bottom: 0;
			transform: translateX(-100%);
			z-index: 200;
		}

		.admin-sidebar.open {
			transform: translateX(0);
		}

		.mobile-close-btn {
			display: block;
		}

		.mobile-menu-btn {
			display: flex;
		}

		.sidebar-backdrop {
			position: fixed;
			inset: 0;
			background: rgba(10, 22, 40, 0.45);
			backdrop-filter: blur(4px);
			z-index: 150;
			border: none;
			cursor: pointer;
		}

		.admin-content-area {
			padding: 20px 16px 48px;
		}

		.admin-topbar {
			padding: 0 16px;
		}

		.live-indicator-pill {
			display: none;
		}
	}
</style>
