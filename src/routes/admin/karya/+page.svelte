<script lang="ts">
	import { portfolioStore } from '$lib/stores/portfolioStore.svelte';
	import type { Project, ProjectCategory } from '$lib/types/portfolio';
	import {
		Plus,
		Search,
		Edit3,
		Trash2,
		Eye,
		EyeOff,
		Sparkles,
		Flame,
		Check,
		X,
		Layers,
		FolderKanban,
		AlertTriangle,
		RotateCcw,
		ExternalLink,
		ArrowUpRight,
		Copy,
		ArrowUp,
		ArrowDown,
		ChevronUp,
		ChevronDown,
		LayoutGrid,
		Table as TableIcon,
		SlidersHorizontal,
		CheckCircle2,
		Globe,
		Tag,
		ChevronRight,
		FileText,
		Image as ImageIcon,
		BarChart3,
		Link as LinkIcon,
		Star,
		Palette,
		Briefcase,
		User,
		Calendar,
		TrendingUp
	} from 'lucide-svelte';

	// Filters and Views
	let searchQuery = $state('');
	let categoryFilter: string = $state('Semua');
	let statusFilter: 'semua' | 'terbit' | 'draf' | 'unggulan' = $state('semua');
	let sortBy: 'order' | 'title' | 'newest' = $state('order');
	let viewMode: 'table' | 'grid' = $state('table');

	// Active tab in Modal Editor
	let activeFormTab: 'dasar' | 'media' | 'studi-kasus' | 'tautan' = $state('dasar');

	// Toast notification state
	let toastMessage = $state('');
	let toastType: 'success' | 'info' | 'error' = $state('success');
	let toastTimer: any = null;

	function showToast(msg: string, type: 'success' | 'info' | 'error' = 'success') {
		if (toastTimer) clearTimeout(toastTimer);
		toastMessage = msg;
		toastType = type;
		toastTimer = setTimeout(() => {
			toastMessage = '';
		}, 3200);
	}

	// Modal states
	let isFormModalOpen = $state(false);
	let isEditMode = $state(false);
	let currentEditId: string | null = $state(null);

	// Delete confirmation modal state
	let isDeleteModalOpen = $state(false);
	let projectToDelete: Project | null = $state(null);

	// Reset confirmation modal state
	let isResetModalOpen = $state(false);

	// Form model
	let formData = $state({
		title: '',
		slug: '',
		subtitle: '',
		category: 'Desain' as ProjectCategory,
		summary: '',
		thumbnail: '',
		role: '',
		duration: '',
		toolsInput: '',
		isFeatured: false,
		isNew: false,
		isPublished: true,
		displayOrder: 1,
		background: '',
		problem: '',
		solution: '',
		processInput: '',
		impact: '',
		metric1Label: '',
		metric1Value: '',
		metric2Label: '',
		metric2Value: '',
		linkFigma: '',
		linkLiveDemo: '',
		linkPitchDeck: '',
		linkGithub: ''
	});

	// Quick tool tags suggestions
	const popularToolTags = [
		'Figma',
		'Design System',
		'Framer',
		'Prototyping',
		'UX Research',
		'Notion',
		'Lean Canvas',
		'Mixpanel',
		'Tailwind CSS',
		'Next.js',
		'SvelteKit'
	];

	function addToolTag(tag: string) {
		const current = formData.toolsInput
			.split(',')
			.map((t) => t.trim())
			.filter(Boolean);
		if (!current.includes(tag)) {
			current.push(tag);
			formData.toolsInput = current.join(', ');
		}
	}

	// Category counts & list
	const filterCategories = $derived([
		'Semua',
		...portfolioStore.categories.map((c) => c.name)
	]);

	const categoryCounts = $derived.by(() => {
		const counts: Record<string, number> = {
			Semua: portfolioStore.projects.length
		};
		portfolioStore.categories.forEach((c) => {
			counts[c.name] = portfolioStore.projects.filter((p) => p.category === c.name).length;
		});
		return counts;
	});

	// Filtered & Sorted project list
	const displayedProjects = $derived.by(() => {
		let list = portfolioStore.projects.filter((p) => {
			// Category filter
			const matchCat = categoryFilter === 'Semua' || p.category === categoryFilter;

			// Status filter
			let matchStatus = true;
			if (statusFilter === 'terbit') matchStatus = p.isPublished;
			else if (statusFilter === 'draf') matchStatus = !p.isPublished;
			else if (statusFilter === 'unggulan') matchStatus = p.isFeatured;

			// Search query
			const q = searchQuery.toLowerCase().trim();
			const matchSearch =
				!q ||
				p.title.toLowerCase().includes(q) ||
				p.category.toLowerCase().includes(q) ||
				p.summary.toLowerCase().includes(q) ||
				p.slug.toLowerCase().includes(q) ||
				p.role.toLowerCase().includes(q) ||
				(p.subtitle && p.subtitle.toLowerCase().includes(q));

			return matchCat && matchStatus && matchSearch;
		});

		// Sorting
		return list.sort((a, b) => {
			if (sortBy === 'order') {
				return (a.displayOrder || 0) - (b.displayOrder || 0);
			} else if (sortBy === 'title') {
				return a.title.localeCompare(b.title);
			} else if (sortBy === 'newest') {
				return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
			}
			return 0;
		});
	});

	function generateSlug(text: string): string {
		return text
			.toLowerCase()
			.replace(/[^\w\s-]/g, '')
			.replace(/[\s_-]+/g, '-')
			.replace(/^-+|-+$/g, '');
	}

	function openAddModal() {
		isEditMode = false;
		currentEditId = null;
		activeFormTab = 'dasar';
		formData = {
			title: '',
			slug: '',
			subtitle: '',
			category: portfolioStore.categories[0]?.name || 'Umum',
			summary: '',
			thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
			role: 'Lead Product Designer',
			duration: '3 Bulan',
			toolsInput: 'Figma, Design System, Prototyping',
			isFeatured: false,
			isNew: true,
			isPublished: true,
			displayOrder: portfolioStore.projects.length + 1,
			background: '',
			problem: '',
			solution: '',
			processInput: '',
			impact: '',
			metric1Label: 'Peningkatan Konversi',
			metric1Value: '+35%',
			metric2Label: 'Efisiensi Waktu Alur',
			metric2Value: '40%',
			linkFigma: '',
			linkLiveDemo: '',
			linkPitchDeck: '',
			linkGithub: ''
		};
		isFormModalOpen = true;
	}

	function openEditModal(project: Project) {
		isEditMode = true;
		currentEditId = project.id;
		activeFormTab = 'dasar';
		formData = {
			title: project.title,
			slug: project.slug,
			subtitle: project.subtitle || '',
			category: project.category,
			summary: project.summary,
			thumbnail: project.thumbnail,
			role: project.role,
			duration: project.duration,
			toolsInput: project.tools.join(', '),
			isFeatured: project.isFeatured,
			isNew: project.isNew,
			isPublished: project.isPublished,
			displayOrder: project.displayOrder,
			background: project.caseStudy.background,
			problem: project.caseStudy.problem,
			solution: project.caseStudy.solution,
			processInput: (project.caseStudy.process || []).join('\n'),
			impact: project.caseStudy.impact,
			metric1Label: project.metrics?.[0]?.label || '',
			metric1Value: project.metrics?.[0]?.value || '',
			metric2Label: project.metrics?.[1]?.label || '',
			metric2Value: project.metrics?.[1]?.value || '',
			linkFigma: project.links.figma || '',
			linkLiveDemo: project.links.liveDemo || '',
			linkPitchDeck: project.links.pitchDeck || '',
			linkGithub: project.links.github || ''
		};
		isFormModalOpen = true;
	}

	function handleTitleChange() {
		if (!isEditMode && (!formData.slug || formData.slug === generateSlug(formData.title.slice(0, -1)))) {
			formData.slug = generateSlug(formData.title);
		}
	}

	function handleFormSubmit(e: Event) {
		e.preventDefault();

		const tools = formData.toolsInput
			.split(',')
			.map((t) => t.trim())
			.filter(Boolean);

		const process = formData.processInput
			.split('\n')
			.map((p) => p.trim())
			.filter(Boolean);

		const metrics = [];
		if (formData.metric1Label && formData.metric1Value) {
			metrics.push({ label: formData.metric1Label, value: formData.metric1Value });
		}
		if (formData.metric2Label && formData.metric2Value) {
			metrics.push({ label: formData.metric2Label, value: formData.metric2Value });
		}

		const projectPayload = {
			title: formData.title,
			slug: formData.slug || generateSlug(formData.title),
			subtitle: formData.subtitle,
			category: formData.category,
			summary: formData.summary,
			thumbnail: formData.thumbnail || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
			images: [formData.thumbnail || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80'],
			role: formData.role,
			duration: formData.duration,
			tools: tools.length > 0 ? tools : ['Figma'],
			isFeatured: formData.isFeatured,
			isNew: formData.isNew,
			displayOrder: Number(formData.displayOrder) || 1,
			isPublished: formData.isPublished,
			publishedAt: new Date().toISOString(),
			metrics,
			caseStudy: {
				background: formData.background,
				problem: formData.problem,
				solution: formData.solution,
				process: process.length > 0 ? process : ['Riset & eksplorasi', 'Perancangan prototipe', 'Validasi & rilis'],
				impact: formData.impact
			},
			links: {
				figma: formData.linkFigma || undefined,
				liveDemo: formData.linkLiveDemo || undefined,
				pitchDeck: formData.linkPitchDeck || undefined,
				github: formData.linkGithub || undefined
			}
		};

		if (isEditMode && currentEditId) {
			portfolioStore.updateProject(currentEditId, projectPayload);
			showToast('Karya berhasil diperbarui!', 'success');
		} else {
			portfolioStore.addProject(projectPayload);
			showToast('Karya baru berhasil ditambahkan ke portofolio!', 'success');
		}

		isFormModalOpen = false;
	}

	function confirmDelete(project: Project) {
		projectToDelete = project;
		isDeleteModalOpen = true;
	}

	function executeDelete() {
		if (projectToDelete) {
			portfolioStore.deleteProject(projectToDelete.id);
			showToast(`Karya "${projectToDelete.title}" telah dihapus.`, 'info');
			projectToDelete = null;
			isDeleteModalOpen = false;
		}
	}

	function handleDuplicate(project: Project) {
		const cloned = portfolioStore.duplicateProject(project.id);
		if (cloned) {
			showToast(`Salinan karya dibuat: "${cloned.title}"`, 'success');
		}
	}

	function handleToggleFeatured(id: string) {
		portfolioStore.toggleFeatured(id);
		const p = portfolioStore.projects.find((proj) => proj.id === id);
		showToast(p?.isFeatured ? 'Karya ditandai sebagai Unggulan.' : 'Karya dihapus dari Unggulan.', 'info');
	}

	function handleTogglePublished(id: string) {
		portfolioStore.togglePublished(id);
		const p = portfolioStore.projects.find((proj) => proj.id === id);
		showToast(p?.isPublished ? 'Karya dipublikasikan ke website publik.' : 'Karya dialihkan ke status Draf.', 'info');
	}

	function handleOrderChange(id: string, newOrder: number) {
		portfolioStore.updateOrder(id, Math.max(1, newOrder));
		showToast('Urutan prioritas karya diperbarui.', 'info');
	}

	function moveOrder(id: string, delta: number) {
		const p = portfolioStore.projects.find((proj) => proj.id === id);
		if (p) {
			const current = p.displayOrder || 1;
			const nextOrder = Math.max(1, current + delta);
			portfolioStore.updateOrder(id, nextOrder);
			showToast(`Urutan diubah ke #${nextOrder}`, 'info');
		}
	}

	function executeResetDefaults() {
		portfolioStore.resetToDefaults();
		isResetModalOpen = false;
		showToast('Seluruh data karya dikembalikan ke setelan awal.', 'info');
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			if (isFormModalOpen) isFormModalOpen = false;
			if (isDeleteModalOpen) isDeleteModalOpen = false;
			if (isResetModalOpen) isResetModalOpen = false;
		}
	}
</script>

<svelte:window onkeydown={handleKeyDown} />

<div class="cms-container">
	<!-- Floating Toast Notification -->
	{#if toastMessage}
		<div class="toast-floating {toastType}" role="status">
			<CheckCircle2 size={16} />
			<span>{toastMessage}</span>
		</div>
	{/if}

	<!-- Top Header & Main Actions -->
	<header class="cms-header">
		<div class="header-text-block">
			<div class="badge-pill">
				<FolderKanban size={13} />
				<span>KONTEN DINAMIS</span>
			</div>
			<h1 class="cms-title">Katalog Karya & Studi Kasus</h1>
			<p class="cms-sub">
				Atur visibilitas, urutan prioritas di beranda, serta kelola konten studi kasus interaktif secara real-time.
			</p>
		</div>

		<div class="cms-actions">
			<a href="/#karya" target="_blank" rel="noopener" class="btn-preview-link">
				<span>Lihat di Beranda</span>
				<ExternalLink size={13} />
			</a>

			<button
				class="btn-reset"
				onclick={() => (isResetModalOpen = true)}
				title="Kembalikan semua proyek ke data default"
			>
				<RotateCcw size={14} />
				<span>Reset Bawaan</span>
			</button>

			<button class="btn-add" onclick={openAddModal}>
				<Plus size={16} />
				<span>Tambah Karya Baru</span>
			</button>
		</div>
	</header>

	<!-- Interactive KPI Stats Row -->
	<div class="stats-cards-row">
		<!-- Total Projects -->
		<button
			class="stat-card"
			class:active-filter={categoryFilter === 'Semua' && statusFilter === 'semua'}
			onclick={() => {
				categoryFilter = 'Semua';
				statusFilter = 'semua';
			}}
			title="Tampilkan semua karya"
		>
			<div class="stat-top">
				<div class="stat-icon-wrap icon-total">
					<Layers size={18} />
				</div>
				<span class="stat-pill neutral">Total</span>
			</div>
			<div class="stat-number">{portfolioStore.projects.length}</div>
			<div class="stat-title">Semua Karya Terdaftar</div>
		</button>

		<!-- Published -->
		<button
			class="stat-card"
			class:active-filter={statusFilter === 'terbit'}
			onclick={() => (statusFilter = statusFilter === 'terbit' ? 'semua' : 'terbit')}
			title="Filter karya terpublikasi"
		>
			<div class="stat-top">
				<div class="stat-icon-wrap icon-published">
					<Check size={18} />
				</div>
				<span class="stat-pill success">
					{Math.round(
						(portfolioStore.projects.filter((p) => p.isPublished).length /
							(portfolioStore.projects.length || 1)) *
							100
					)}% Live
				</span>
			</div>
			<div class="stat-number text-emerald">
				{portfolioStore.projects.filter((p) => p.isPublished).length}
			</div>
			<div class="stat-title">Terbit di Website</div>
		</button>

		<!-- Featured -->
		<button
			class="stat-card"
			class:active-filter={statusFilter === 'unggulan'}
			onclick={() => (statusFilter = statusFilter === 'unggulan' ? 'semua' : 'unggulan')}
			title="Filter karya unggulan"
		>
			<div class="stat-top">
				<div class="stat-icon-wrap icon-featured">
					<Sparkles size={18} />
				</div>
				<span class="stat-pill warning">Showcase</span>
			</div>
			<div class="stat-number text-amber">
				{portfolioStore.projects.filter((p) => p.isFeatured).length}
			</div>
			<div class="stat-title">Karya Unggulan Hero</div>
		</button>

		<!-- New Label -->
		<button
			class="stat-card"
			class:active-filter={sortBy === 'newest'}
			onclick={() => (sortBy = sortBy === 'newest' ? 'order' : 'newest')}
			title="Urutkan proyek baru ke atas"
		>
			<div class="stat-top">
				<div class="stat-icon-wrap icon-new">
					<Flame size={18} />
				</div>
				<span class="stat-pill rose">Terbaru</span>
			</div>
			<div class="stat-number text-rose">
				{portfolioStore.projects.filter((p) => p.isNew).length}
			</div>
			<div class="stat-title">Label "Baru" Aktif</div>
		</button>
	</div>

	<!-- Controls & Filter Toolbar -->
	<div class="table-toolbar">
		<div class="toolbar-left">
			<!-- Search Bar -->
			<div class="search-wrap">
				<Search size={15} class="search-icon" />
				<input
					type="search"
					class="search-input"
					placeholder="Cari judul, kategori, slug, atau role..."
					bind:value={searchQuery}
				/>
				{#if searchQuery}
					<button class="clear-search-btn" onclick={() => (searchQuery = '')} title="Hapus pencarian">
						<X size={13} />
					</button>
				{/if}
			</div>

			<!-- Category Pills -->
			<div class="filter-group">
				{#each filterCategories as cat}
					<button
						class="cat-filter-btn"
						class:active={categoryFilter === cat}
						onclick={() => (categoryFilter = cat)}
					>
						<span>{cat}</span>
						<span class="cat-count">
							{categoryCounts[cat] ?? 0}
						</span>
					</button>
				{/each}
			</div>
		</div>

		<div class="toolbar-right">
			<!-- Status Filter Dropdown -->
			<div class="select-wrap">
				<select class="custom-select" bind:value={statusFilter}>
					<option value="semua">Semua Status</option>
					<option value="terbit">Hanya Terbit</option>
					<option value="draf">Hanya Draf</option>
					<option value="unggulan">Hanya Unggulan</option>
				</select>
			</div>

			<!-- Sort Dropdown -->
			<div class="select-wrap">
				<select class="custom-select" bind:value={sortBy}>
					<option value="order">Urut: Prioritas</option>
					<option value="title">Urut: Judul (A-Z)</option>
					<option value="newest">Urut: Label Baru</option>
				</select>
			</div>

			<!-- View Switcher -->
			<div class="view-switch-box">
				<button
					class="view-btn"
					class:active={viewMode === 'table'}
					onclick={() => (viewMode = 'table')}
					title="Tampilan Tabel (List View)"
					aria-label="Tampilan Tabel"
				>
					<TableIcon size={15} />
				</button>
				<button
					class="view-btn"
					class:active={viewMode === 'grid'}
					onclick={() => (viewMode = 'grid')}
					title="Tampilan Galeri Kartu (Grid View)"
					aria-label="Tampilan Galeri Kartu"
				>
					<LayoutGrid size={15} />
				</button>
			</div>
		</div>
	</div>

	<!-- Results Indicator -->
	<div class="results-meta-bar">
		<span class="results-text">
			Menampilkan <strong>{displayedProjects.length}</strong> dari {portfolioStore.projects.length} karya
			{#if categoryFilter !== 'Semua' || statusFilter !== 'semua' || searchQuery}
				<span class="filtered-tag">• Tersaring</span>
			{/if}
		</span>

		{#if categoryFilter !== 'Semua' || statusFilter !== 'semua' || searchQuery}
			<button
				class="reset-filters-link"
				onclick={() => {
					categoryFilter = 'Semua';
					statusFilter = 'semua';
					searchQuery = '';
				}}
			>
				Reset Semua Filter
			</button>
		{/if}
	</div>

	<!-- MAIN CONTENT: TABLE OR GRID VIEW -->
	{#if viewMode === 'table'}
		<div class="table-wrapper">
			<table class="cms-table">
				<thead>
					<tr>
						<th style="width: 80px; text-align: center;">Urutan</th>
						<th style="width: 105px;">Visual</th>
						<th>Judul & Studi Kasus</th>
						<th style="width: 135px;">Kategori</th>
						<th style="width: 210px;">Peran & Durasi</th>
						<th style="text-align: center; width: 130px;">Tampilan Beranda</th>
						<th style="text-align: center; width: 115px;">Status Rilis</th>
						<th style="text-align: right; width: 150px;">Aksi</th>
					</tr>
				</thead>
				<tbody>
					{#if displayedProjects.length === 0}
						<tr>
							<td colspan="8" class="empty-cell">
								<div class="empty-state">
									<div class="empty-icon-wrap">
										<Layers size={32} />
									</div>
									<div class="empty-title">Tidak ada karya yang sesuai</div>
									<div class="empty-desc">
										{#if searchQuery}
											Pencarian "{searchQuery}" tidak menghasilkan karya apa pun.
										{:else}
											Belum ada karya untuk filter yang dipilih saat ini.
										{/if}
									</div>
									<button class="btn-add-empty" onclick={openAddModal}>
										<Plus size={15} />
										<span>Tambah Karya Baru</span>
									</button>
								</div>
							</td>
						</tr>
					{:else}
						{#each displayedProjects as project (project.id)}
							<tr class:unpublished={!project.isPublished}>
								<!-- Display Order Stepper -->
								<td style="text-align: center;">
									<div class="order-cell">
										<span class="order-num">#{project.displayOrder}</span>
										<div class="order-arrows">
											<button
												class="order-arrow-btn"
												onclick={() => moveOrder(project.id, -1)}
												title="Pindah ke atas"
											>
												<ChevronUp size={13} />
											</button>
											<button
												class="order-arrow-btn"
												onclick={() => moveOrder(project.id, 1)}
												title="Pindah ke bawah"
											>
												<ChevronDown size={13} />
											</button>
										</div>
									</div>
								</td>

								<!-- Thumbnail -->
								<td>
									<div class="thumb-container">
										<img
											src={project.thumbnail}
											alt={project.title}
											class="table-thumb"
											loading="lazy"
											onerror={(e) => {
												(e.currentTarget as HTMLImageElement).src =
													'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80';
											}}
										/>
										{#if project.isNew}
											<span class="badge-new-clean" title="Label Baru">
												<Flame size={10} />
												<span>Baru</span>
											</span>
										{/if}
									</div>
								</td>

								<!-- Title & Details -->
								<td>
									<div class="project-title-row">
										<button type="button" class="project-title-text" onclick={() => openEditModal(project)}>
											{project.title}
										</button>
									</div>
									<div class="project-sub-text">
										{project.subtitle || project.summary}
									</div>
									<a
										href="/karya/{project.slug}"
										target="_blank"
										rel="noopener"
										class="project-slug-tag"
										title="Buka studi kasus publik"
									>
										<Globe size={11} />
										<span>/karya/{project.slug}</span>
										<ArrowUpRight size={11} />
									</a>
								</td>

								<!-- Category -->
								<td>
									<span class="cat-pill {project.category.toLowerCase()}">
										{#if project.category === 'Desain'}
											<Palette size={12} />
										{:else if project.category === 'Bisnis'}
											<TrendingUp size={12} />
										{:else}
											<Layers size={12} />
										{/if}
										<span>{project.category}</span>
									</span>
								</td>

								<!-- Role & Duration -->
								<td>
									<div class="role-text">
										<User size={12} class="meta-icon" />
										<span>{project.role}</span>
									</div>
									<div class="duration-text">
										<Calendar size={11} class="meta-icon" />
										<span>{project.duration}</span>
									</div>
								</td>

								<!-- Featured Toggle Button -->
								<td style="text-align: center;">
									<button
										class="toggle-featured-btn"
										class:featured={project.isFeatured}
										onclick={() => handleToggleFeatured(project.id)}
										title={project.isFeatured ? 'Karya unggulan di beranda (Klik untuk batalkan)' : 'Jadikan karya unggulan di beranda'}
									>
										<Star size={13} fill={project.isFeatured ? 'currentColor' : 'none'} />
										<span>{project.isFeatured ? 'Unggulan' : 'Standar'}</span>
									</button>
								</td>

								<!-- Published Toggle Button -->
								<td style="text-align: center;">
									<button
										class="status-toggle-btn"
										class:published={project.isPublished}
										onclick={() => handleTogglePublished(project.id)}
										title={project.isPublished ? 'Status: Terbit di website (Klik untuk jadikan Draf)' : 'Status: Draf (Klik untuk terbitkan)'}
									>
										{#if project.isPublished}
											<CheckCircle2 size={13} />
											<span>Terbit</span>
										{:else}
											<EyeOff size={13} />
											<span>Draf</span>
										{/if}
									</button>
								</td>

								<!-- Actions Group -->
								<td style="text-align: right;">
									<div class="actions-group">
										<a
											href="/karya/{project.slug}"
											target="_blank"
											rel="noopener"
											class="action-btn"
											title="Lihat Pratinjau Publik"
										>
											<ExternalLink size={14} />
										</a>
										<button
											class="action-btn"
											onclick={() => openEditModal(project)}
											title="Sunting Karya"
										>
											<Edit3 size={14} />
										</button>
										<button
											class="action-btn"
											onclick={() => handleDuplicate(project)}
											title="Duplikat / Salin Karya"
										>
											<Copy size={14} />
										</button>
										<button
											class="action-btn delete"
											onclick={() => confirmDelete(project)}
											title="Hapus Karya"
										>
											<Trash2 size={14} />
										</button>
									</div>
								</td>
							</tr>
						{/each}
					{/if}
				</tbody>
			</table>
		</div>
	{:else}
		<!-- GRID / CARD VIEW -->
		<div class="cards-grid">
			{#if displayedProjects.length === 0}
				<div class="grid-empty-state">
					<Layers size={36} />
					<div class="empty-title">Tidak ada karya yang sesuai</div>
					<div class="empty-desc">Coba sesuaikan pencarian atau filter kategori Anda.</div>
				</div>
			{:else}
				{#each displayedProjects as project (project.id)}
					<div class="project-grid-card" class:unpublished={!project.isPublished}>
						<!-- Card Media Top -->
						<div class="card-media-wrap">
							<img
								src={project.thumbnail}
								alt={project.title}
								class="card-img"
								loading="lazy"
								onerror={(e) => {
									(e.currentTarget as HTMLImageElement).src =
										'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80';
								}}
							/>
							<div class="card-badges-overlay">
								<span class="cat-pill {project.category.toLowerCase()}">
									{#if project.category === 'Desain'}
										<Palette size={11} />
									{:else if project.category === 'Bisnis'}
										<TrendingUp size={11} />
									{:else}
										<Layers size={11} />
									{/if}
									<span>{project.category}</span>
								</span>

								<div class="overlay-right">
									{#if project.isNew}
										<span class="card-tag-new">
											<Flame size={10} />
											<span>Baru</span>
										</span>
									{/if}
									{#if project.isFeatured}
										<span class="card-tag-featured" title="Karya Unggulan">
											<Star size={11} fill="currentColor" />
										</span>
									{/if}
								</div>
							</div>
						</div>

						<!-- Card Content -->
						<div class="card-body">
							<div class="card-meta-row">
								<span class="card-order-badge">#{project.displayOrder}</span>
								<span class="card-role"><User size={11} class="meta-icon" /> {project.role}</span>
								<span class="meta-sep">•</span>
								<span class="card-duration"><Calendar size={11} class="meta-icon" /> {project.duration}</span>
							</div>

							<h3 class="card-title">
								<button type="button" class="card-title-btn" onclick={() => openEditModal(project)}>
									{project.title}
								</button>
							</h3>

							<p class="card-summary">{project.summary}</p>

							<!-- Tools tags -->
							{#if project.tools && project.tools.length > 0}
								<div class="card-tools-row">
									{#each project.tools.slice(0, 3) as tool}
										<span class="tool-tag-pill">{tool}</span>
									{/each}
									{#if project.tools.length > 3}
										<span class="tool-tag-pill more">+{project.tools.length - 3}</span>
									{/if}
								</div>
							{/if}
						</div>

						<!-- Card Footer / Actions -->
						<div class="card-footer">
							<div class="footer-left">
								<button
									class="status-toggle-btn"
									class:published={project.isPublished}
									onclick={() => handleTogglePublished(project.id)}
									title={project.isPublished ? 'Klik untuk alihkan ke Draf' : 'Klik untuk rilis ke website'}
								>
									{#if project.isPublished}
										<CheckCircle2 size={12} />
										<span>Terbit</span>
									{:else}
										<EyeOff size={12} />
										<span>Draf</span>
									{/if}
								</button>
							</div>

							<div class="footer-actions">
								<button
									class="action-btn"
									class:featured={project.isFeatured}
									onclick={() => handleToggleFeatured(project.id)}
									title={project.isFeatured ? 'Karya Unggulan (Klik untuk ubah)' : 'Jadikan Unggulan'}
								>
									<Star size={13} fill={project.isFeatured ? 'currentColor' : 'none'} />
								</button>
								<a
									href="/karya/{project.slug}"
									target="_blank"
									rel="noopener"
									class="action-btn"
									title="Buka Pratinjau Publik"
								>
									<ExternalLink size={13} />
								</a>
								<button
									class="action-btn"
									onclick={() => openEditModal(project)}
									title="Sunting Karya"
								>
									<Edit3 size={13} />
								</button>
								<button
									class="action-btn"
									onclick={() => handleDuplicate(project)}
									title="Duplikat Karya"
								>
									<Copy size={13} />
								</button>
								<button
									class="action-btn delete"
									onclick={() => confirmDelete(project)}
									title="Hapus Karya"
								>
									<Trash2 size={13} />
								</button>
							</div>
						</div>
					</div>
				{/each}
			{/if}
		</div>
	{/if}
</div>

<!-- ================= MODAL EDITOR CMS KARYA ================= -->
{#if isFormModalOpen}
	<div
		class="modal-backdrop"
		role="dialog"
		aria-modal="true"
		aria-labelledby="form-modal-title"
	>
		<button
			type="button"
			class="backdrop-dismiss"
			onclick={() => (isFormModalOpen = false)}
			aria-label="Tutup jendela modal"
		></button>

		<div class="modal-panel">
			<!-- Header -->
			<div class="modal-header">
				<div class="modal-title-col">
					<div class="modal-badge-row">
						<span class="modal-cms-tag">Editor Studio CMS</span>
						<span class="mode-tag">{isEditMode ? 'Mode Edit' : 'Proyek Baru'}</span>
					</div>
					<h2 id="form-modal-title" class="modal-title">
						{isEditMode ? 'Sunting Karya Portofolio' : 'Tambah Karya Baru'}
					</h2>
				</div>
				<button
					type="button"
					class="modal-close-btn"
					onclick={() => (isFormModalOpen = false)}
					title="Tutup (Esc)"
				>
					<X size={18} />
				</button>
			</div>

			<!-- Tab Navigation -->
			<div class="modal-tabs">
				<button
					type="button"
					class="modal-tab-btn"
					class:active={activeFormTab === 'dasar'}
					onclick={() => (activeFormTab = 'dasar')}
				>
					<FileText size={15} />
					<span>Informasi Dasar</span>
				</button>

				<button
					type="button"
					class="modal-tab-btn"
					class:active={activeFormTab === 'media'}
					onclick={() => (activeFormTab = 'media')}
				>
					<ImageIcon size={15} />
					<span>Media & Tampilan</span>
				</button>

				<button
					type="button"
					class="modal-tab-btn"
					class:active={activeFormTab === 'studi-kasus'}
					onclick={() => (activeFormTab = 'studi-kasus')}
				>
					<BarChart3 size={15} />
					<span>Studi Kasus & Metrik</span>
				</button>

				<button
					type="button"
					class="modal-tab-btn"
					class:active={activeFormTab === 'tautan'}
					onclick={() => (activeFormTab = 'tautan')}
				>
					<LinkIcon size={15} />
					<span>Tautan Eksternal</span>
				</button>
			</div>

			<!-- Form Body -->
			<form onsubmit={handleFormSubmit} class="modal-form">
				<div class="modal-tab-content">
					<!-- TAB 1: INFORMASI DASAR -->
					{#if activeFormTab === 'dasar'}
						<div class="tab-pane">
							<div class="form-grid-2">
								<div class="form-group">
									<label for="form-title" class="field-label">Judul Karya / Proyek *</label>
									<input
										id="form-title"
										type="text"
										class="input-text"
										bind:value={formData.title}
										oninput={handleTitleChange}
										placeholder="e.g. NexaPay — Redesign Dompet Digital"
										required
									/>
									<span class="field-hint">Gunakan nama produk yang jelas dan menarik.</span>
								</div>

								<div class="form-group">
									<label for="form-slug" class="field-label">URL Slug Publik *</label>
									<div class="slug-wrap">
										<span class="slug-prefix">/karya/</span>
										<input
											id="form-slug"
											type="text"
											class="input-text slug-input"
											bind:value={formData.slug}
											placeholder="nexapay-redesign"
											required
										/>
									</div>
									<span class="field-hint">Tautan ramah SEO untuk studi kasus lengkap.</span>
								</div>
							</div>

							<div class="form-grid-2">
								<div class="form-group">
									<label for="form-category" class="field-label">Kategori Karya *</label>
									<select id="form-category" class="input-select" bind:value={formData.category}>
										{#if portfolioStore.categories.length === 0}
											<option value="Umum">Umum (Belum ada master kategori)</option>
										{:else}
											{#each portfolioStore.categories as cat}
												<option value={cat.name}>{cat.name} {cat.description ? `— ${cat.description.slice(0, 42)}...` : ''}</option>
											{/each}
										{/if}
									</select>
								</div>

								<div class="form-group">
									<label for="form-subtitle" class="field-label">Subjudul / Fokus Utama</label>
									<input
										id="form-subtitle"
										type="text"
										class="input-text"
										bind:value={formData.subtitle}
										placeholder="e.g. Revitalisasi Alur Transaksi & Sistem Retensi"
									/>
								</div>
							</div>

							<div class="form-group">
								<label for="form-summary" class="field-label">Ringkasan Eksekutif (Summary) *</label>
								<textarea
									id="form-summary"
									class="input-textarea"
									rows="3"
									bind:value={formData.summary}
									placeholder="Jelaskan ringkasan proyek dan nilai tambah utamanya dalam 2-3 kalimat..."
									required
								></textarea>
							</div>

							<div class="form-grid-3">
								<div class="form-group">
									<label for="form-role" class="field-label">Peran / Posisi *</label>
									<input
										id="form-role"
										type="text"
										class="input-text"
										bind:value={formData.role}
										placeholder="e.g. Lead Product Designer"
										required
									/>
								</div>

								<div class="form-group">
									<label for="form-duration" class="field-label">Durasi Pengerjaan *</label>
									<input
										id="form-duration"
										type="text"
										class="input-text"
										bind:value={formData.duration}
										placeholder="e.g. 4 Bulan (Q3 2025)"
										required
									/>
								</div>

								<div class="form-group">
									<label for="form-order" class="field-label">Nomor Urutan Tampilan</label>
									<input
										id="form-order"
										type="number"
										class="input-text"
										bind:value={formData.displayOrder}
										min="1"
									/>
								</div>
							</div>
						</div>

					<!-- TAB 2: MEDIA & TAMPILAN -->
					{:else if activeFormTab === 'media'}
						<div class="tab-pane">
							<div class="media-preview-section">
								<div class="media-input-col">
									<div class="form-group">
										<label for="form-thumbnail" class="field-label">URL Cover / Thumbnail (HTTPS)</label>
										<input
											id="form-thumbnail"
											type="url"
											class="input-text"
											bind:value={formData.thumbnail}
											placeholder="https://images.unsplash.com/..."
										/>
										<span class="field-hint">Gunakan tautan gambar resolusi tinggi (16:9 disarankan).</span>
									</div>

									<div class="form-group">
										<label for="form-tools" class="field-label">Tools & Perangkat Kerja</label>
										<input
											id="form-tools"
											type="text"
											class="input-text"
											bind:value={formData.toolsInput}
											placeholder="Figma, Framer, Mixpanel, Notion..."
										/>
										<div class="quick-tags-wrap">
											<span class="quick-tag-label">Klik untuk tambah cepat:</span>
											{#each popularToolTags as t}
												<button
													type="button"
													class="quick-tag-btn"
													onclick={() => addToolTag(t)}
												>
													+{t}
												</button>
											{/each}
										</div>
									</div>
								</div>

								<!-- Live Thumbnail Box -->
								<div class="live-preview-box">
									<div class="preview-header-label">Pratinjau Cover Visual</div>
									<div class="preview-img-frame">
										<img
											src={formData.thumbnail || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80'}
											alt="Thumbnail preview"
											class="preview-img"
											onerror={(e) => {
												(e.currentTarget as HTMLImageElement).src =
													'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80';
											}}
										/>
										<div class="preview-overlay">
											<span class="cat-pill {formData.category.toLowerCase()}">
												{formData.category}
											</span>
											{#if formData.isFeatured}
												<span class="featured-indicator">
													<Sparkles size={11} />
													Unggulan
												</span>
											{/if}
										</div>
									</div>
								</div>
							</div>

							<!-- Switches Section -->
							<div class="switches-grid">
								<div class="switch-card" class:active={formData.isFeatured}>
									<div class="switch-content">
										<div class="switch-title-row">
											<div class="switch-icon-box featured">
												<Sparkles size={15} />
											</div>
											<div>
												<div class="switch-title">Jadikan Karya Unggulan</div>
												<div class="switch-desc">Tempatkan di posisi atas halaman beranda utama.</div>
											</div>
										</div>
									</div>
									<label class="toggle-switch">
										<input type="checkbox" bind:checked={formData.isFeatured} />
										<span class="slider"></span>
									</label>
								</div>

								<div class="switch-card" class:active={formData.isNew}>
									<div class="switch-content">
										<div class="switch-title-row">
											<div class="switch-icon-box new">
												<Flame size={15} />
											</div>
											<div>
												<div class="switch-title">Tampilkan Label "Baru"</div>
												<div class="switch-desc">Lencana visual mencolok bahwa karya ini baru dirilis.</div>
											</div>
										</div>
									</div>
									<label class="toggle-switch">
										<input type="checkbox" bind:checked={formData.isNew} />
										<span class="slider"></span>
									</label>
								</div>

								<div class="switch-card" class:active={formData.isPublished}>
									<div class="switch-content">
										<div class="switch-title-row">
											<div class="switch-icon-box pub">
												<Globe size={15} />
											</div>
											<div>
												<div class="switch-title">Status Publikasi Langsung</div>
												<div class="switch-desc">Jika nonaktif, proyek hanya tersimpan sebagai draf internal.</div>
											</div>
										</div>
									</div>
									<label class="toggle-switch">
										<input type="checkbox" bind:checked={formData.isPublished} />
										<span class="slider"></span>
									</label>
								</div>
							</div>
						</div>

					<!-- TAB 3: STUDI KASUS & METRIK -->
					{:else if activeFormTab === 'studi-kasus'}
						<div class="tab-pane">
							<div class="form-group">
								<label for="form-bg" class="field-label">Latar Belakang & Konteks (Background)</label>
								<textarea
									id="form-bg"
									class="input-textarea"
									rows="2"
									bind:value={formData.background}
									placeholder="Konteks industri, lanskap pasar, atau alasan proyek ini dimulai..."
								></textarea>
							</div>

							<div class="form-grid-2">
								<div class="form-group">
									<label for="form-prob" class="field-label">Masalah Utama (The Problem)</label>
									<textarea
										id="form-prob"
										class="input-textarea"
										rows="3"
										bind:value={formData.problem}
										placeholder="Tantangan spesifik dan friksi yang dihadapi pengguna / bisnis..."
									></textarea>
								</div>

								<div class="form-group">
									<label for="form-sol" class="field-label">Solusi & Strategi (The Solution)</label>
									<textarea
										id="form-sol"
										class="input-textarea"
										rows="3"
										bind:value={formData.solution}
										placeholder="Inovasi antarmuka, optimasi alur, dan strategi eksekusi yang diterapkan..."
									></textarea>
								</div>
							</div>

							<div class="form-group">
								<label for="form-process" class="field-label">Tahapan Proses Pengerjaan (1 baris per langkah)</label>
								<textarea
									id="form-process"
									class="input-textarea"
									rows="3"
									bind:value={formData.processInput}
									placeholder="1. Wawancara pengguna & analisis funnel&#10;2. Eksplorasi wireframe & penataan design system&#10;3. Pengujian kegunaan prototipe & validasi konversi"
								></textarea>
							</div>

							<div class="form-group">
								<label for="form-impact" class="field-label">Dampak & Hasil Akhir (Impact Summary)</label>
								<input
									id="form-impact"
									type="text"
									class="input-text"
									bind:value={formData.impact}
									placeholder="e.g. Tingkat konversi onboarding meningkat 42% dalam 3 bulan pertama."
								/>
							</div>

							<!-- Metrics Grid -->
							<div class="metrics-grid">
								<div class="metric-builder-card">
									<div class="metric-card-header">
										<div class="metric-card-badge">
											<TrendingUp size={14} />
											<span>Metrik Kinerja Utama 1</span>
										</div>
									</div>
									<div class="metric-inputs-row">
										<div class="metric-input-field value-field">
											<label for="form-m1-val">Nilai / Angka</label>
											<input
												id="form-m1-val"
												type="text"
												class="input-text metric-val"
												bind:value={formData.metric1Value}
												placeholder="+42%"
											/>
										</div>
										<div class="metric-input-field label-field">
											<label for="form-m1-lbl">Label Indikator</label>
											<input
												id="form-m1-lbl"
												type="text"
												class="input-text"
												bind:value={formData.metric1Label}
												placeholder="Peningkatan Konversi"
											/>
										</div>
									</div>
								</div>

								<div class="metric-builder-card">
									<div class="metric-card-header">
										<div class="metric-card-badge">
											<TrendingUp size={14} />
											<span>Metrik Kinerja Utama 2</span>
										</div>
									</div>
									<div class="metric-inputs-row">
										<div class="metric-input-field value-field">
											<label for="form-m2-val">Nilai / Angka</label>
											<input
												id="form-m2-val"
												type="text"
												class="input-text metric-val"
												bind:value={formData.metric2Value}
												placeholder="2.8x"
											/>
										</div>
										<div class="metric-input-field label-field">
											<label for="form-m2-lbl">Label Indikator</label>
											<input
												id="form-m2-lbl"
												type="text"
												class="input-text"
												bind:value={formData.metric2Label}
												placeholder="Retensi Pengguna Aktif"
											/>
										</div>
									</div>
								</div>
							</div>
						</div>

					<!-- TAB 4: TAUTAN EKSTERNAL -->
					{:else if activeFormTab === 'tautan'}
						<div class="tab-pane">
							<div class="form-grid-2">
								<div class="form-group link-field-group">
									<label for="form-link-figma" class="field-label link-label">
										<Palette size={14} />
										<span>Tautan Figma (File / Prototipe)</span>
									</label>
									<input
										id="form-link-figma"
										type="url"
										class="input-text"
										bind:value={formData.linkFigma}
										placeholder="https://figma.com/design/..."
									/>
									<span class="field-hint">Akses langsung melihat komponen & flow interaktif.</span>
								</div>

								<div class="form-group link-field-group">
									<label for="form-link-demo" class="field-label link-label">
										<Globe size={14} />
										<span>Tautan Website Live / Demo</span>
									</label>
									<input
										id="form-link-demo"
										type="url"
										class="input-text"
										bind:value={formData.linkLiveDemo}
										placeholder="https://aplikasi-anda.com"
									/>
									<span class="field-hint">Tautan produk nyata yang telah dipublikasikan.</span>
								</div>
							</div>

							<div class="form-grid-2">
								<div class="form-group link-field-group">
									<label for="form-link-deck" class="field-label link-label">
										<FileText size={14} />
										<span>Tautan Pitch Deck / Presentasi</span>
									</label>
									<input
										id="form-link-deck"
										type="url"
										class="input-text"
										bind:value={formData.linkPitchDeck}
										placeholder="https://speakerdeck.com/..."
									/>
									<span class="field-hint">Slide deck atau dokumentasi riset PDF.</span>
								</div>

								<div class="form-group link-field-group">
									<label for="form-link-github" class="field-label link-label">
										<ExternalLink size={14} />
										<span>Tautan GitHub / Repositori</span>
									</label>
									<input
										id="form-link-github"
										type="url"
										class="input-text"
										bind:value={formData.linkGithub}
										placeholder="https://github.com/..."
									/>
									<span class="field-hint">Jika proyek melibatkan implementasi kode.</span>
								</div>
							</div>
						</div>
					{/if}
				</div>

				<!-- Modal Actions Footer -->
				<div class="modal-footer">
					<div class="footer-left-info">
						<span class="kbd-hint">Tekan <strong>Esc</strong> untuk keluar</span>
					</div>
					<div class="footer-buttons">
						<button
							type="button"
							class="btn-cancel"
							onclick={() => (isFormModalOpen = false)}
						>
							Batal
						</button>
						<button type="submit" class="btn-save">
							<Check size={16} />
							<span>{isEditMode ? 'Simpan Perubahan' : 'Terbitkan Karya'}</span>
						</button>
					</div>
				</div>
			</form>
		</div>
	</div>
{/if}

<!-- ================= MODAL KONFIRMASI HAPUS ================= -->
{#if isDeleteModalOpen && projectToDelete}
	<div
		class="modal-backdrop"
		role="dialog"
		aria-modal="true"
		aria-labelledby="delete-modal-title"
	>
		<button
			type="button"
			class="backdrop-dismiss"
			onclick={() => (isDeleteModalOpen = false)}
			aria-label="Tutup jendela konfirmasi"
		></button>

		<div class="modal-confirm-panel">
			<div class="confirm-icon-box danger">
				<AlertTriangle size={24} />
			</div>
			<h3 id="delete-modal-title" class="confirm-title">Hapus Karya Ini?</h3>
			<p class="confirm-desc">
				Apakah Anda yakin ingin menghapus karya <strong>"{projectToDelete.title}"</strong>?
				Tindakan ini akan menghapus seluruh data proyek dan halaman studi kasus publik.
			</p>

			<div class="confirm-actions">
				<button class="btn-cancel" onclick={() => (isDeleteModalOpen = false)}>
					Batal
				</button>
				<button class="btn-danger" onclick={executeDelete}>
					<Trash2 size={15} />
					<span>Ya, Hapus Karya</span>
				</button>
			</div>
		</div>
	</div>
{/if}

<!-- ================= MODAL KONFIRMASI RESET ================= -->
{#if isResetModalOpen}
	<div
		class="modal-backdrop"
		role="dialog"
		aria-modal="true"
		aria-labelledby="reset-modal-title"
	>
		<button
			type="button"
			class="backdrop-dismiss"
			onclick={() => (isResetModalOpen = false)}
			aria-label="Tutup jendela reset"
		></button>

		<div class="modal-confirm-panel">
			<div class="confirm-icon-box reset">
				<RotateCcw size={24} />
			</div>
			<h3 id="reset-modal-title" class="confirm-title">Reset ke Data Portofolio Awal?</h3>
			<p class="confirm-desc">
				Tindakan ini akan mengembalikan seluruh daftar proyek kembali ke data portofolio contoh (mock projects).
				Seluruh karya yang telah Anda tambahkan atau sunting akan diatur ulang.
			</p>

			<div class="confirm-actions">
				<button class="btn-cancel" onclick={() => (isResetModalOpen = false)}>
					Batal
				</button>
				<button class="btn-danger" onclick={executeResetDefaults}>
					<RotateCcw size={15} />
					<span>Ya, Reset Sekarang</span>
				</button>
			</div>
		</div>
	</div>
{/if}

<style>
	/* Container & Global Layout */
	.cms-container {
		width: 100%;
	}

	/* Toast Notification */
	.toast-floating {
		position: fixed;
		bottom: 28px;
		right: 28px;
		z-index: 9999;
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 12px 20px;
		border-radius: 12px;
		font-size: 13.5px;
		font-weight: 600;
		box-shadow: 0 12px 30px rgba(15, 23, 42, 0.25);
		animation: toastSlide 0.3s cubic-bezier(0.16, 1, 0.3, 1);
		background: #0f172a;
		color: #ffffff;
		border: 1px solid rgba(255, 255, 255, 0.1);
	}
	@keyframes toastSlide {
		from { transform: translateY(20px); opacity: 0; }
		to { transform: translateY(0); opacity: 1; }
	}

	/* Header */
	.cms-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 20px;
		margin-bottom: 28px;
		flex-wrap: wrap;
	}

	.badge-pill {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		background: #eff6ff;
		color: #2563eb;
		padding: 4px 10px;
		border-radius: 9999px;
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		margin-bottom: 8px;
		border: 1px solid rgba(37, 99, 235, 0.15);
	}

	.cms-title {
		font-size: 26px;
		font-weight: 800;
		color: #0a1628;
		letter-spacing: -0.025em;
		margin: 0;
		line-height: 1.25;
	}

	.cms-sub {
		font-size: 14px;
		color: #64748b;
		margin: 6px 0 0;
		max-width: 680px;
		line-height: 1.5;
	}

	.cms-actions {
		display: flex;
		align-items: center;
		gap: 10px;
		flex-wrap: wrap;
	}

	.btn-preview-link {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 9px 14px;
		border-radius: 10px;
		font-size: 13px;
		font-weight: 600;
		background: #ffffff;
		border: 1px solid #e2e8f0;
		color: #475569;
		text-decoration: none;
		transition: all 0.2s ease;
		box-shadow: 0 1px 2px rgba(10, 22, 40, 0.03);
	}
	.btn-preview-link:hover {
		background: #f8fafc;
		color: #0a1628;
		border-color: #cbd5e1;
	}

	.btn-reset {
		display: inline-flex;
		align-items: center;
		gap: 7px;
		padding: 9px 15px;
		border-radius: 10px;
		font-size: 13px;
		font-weight: 600;
		background: #ffffff;
		border: 1px solid #e2e8f0;
		color: #64748b;
		cursor: pointer;
		transition: all 0.2s ease;
		box-shadow: 0 1px 2px rgba(10, 22, 40, 0.03);
	}
	.btn-reset:hover {
		background: #f8fafc;
		border-color: #cbd5e1;
		color: #0a1628;
	}

	.btn-add {
		display: inline-flex;
		align-items: center;
		gap: 7px;
		padding: 9px 18px;
		border-radius: 10px;
		font-size: 13px;
		font-weight: 700;
		background: #0a1628;
		border: 1px solid #0a1628;
		color: #ffffff;
		cursor: pointer;
		transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
		box-shadow: 0 4px 14px rgba(10, 22, 40, 0.16);
	}
	.btn-add:hover {
		background: #162844;
		border-color: #162844;
		transform: translateY(-1px);
		box-shadow: 0 6px 20px rgba(10, 22, 40, 0.22);
	}

	/* KPI Stats Cards */
	.stats-cards-row {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 16px;
		margin-bottom: 24px;
	}
	.stat-card {
		background: #ffffff;
		border: 1px solid #e2e8f0;
		border-radius: 16px;
		padding: 18px 20px;
		text-align: left;
		cursor: pointer;
		transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
		box-shadow: 0 1px 3px rgba(10, 22, 40, 0.02);
		position: relative;
		overflow: hidden;
		font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
	}
	.stat-card:hover {
		transform: translateY(-2px);
		border-color: #cbd5e1;
		box-shadow: 0 8px 24px rgba(10, 22, 40, 0.06);
	}
	.stat-card.active-filter {
		border-color: #0a1628;
		background: #ffffff;
		box-shadow: 0 0 0 1px #0a1628, 0 8px 24px rgba(10, 22, 40, 0.08);
	}
	.stat-top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 12px;
	}
	.stat-icon-wrap {
		width: 36px;
		height: 36px;
		border-radius: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.icon-total { background: #eff6ff; color: #2563eb; }
	.icon-published { background: #ecfdf5; color: #059669; }
	.icon-featured { background: #fffbeb; color: #d97706; }
	.icon-new { background: #fff1f2; color: #e11d48; }

	.stat-pill {
		font-size: 11px;
		font-weight: 700;
		padding: 3px 8px;
		border-radius: 6px;
	}
	.stat-pill.neutral { background: #f1f5f9; color: #475569; }
	.stat-pill.success { background: #ecfdf5; color: #059669; }
	.stat-pill.warning { background: #fffbeb; color: #d97706; }
	.stat-pill.rose { background: #fff1f2; color: #e11d48; }

	.stat-number {
		font-size: 28px;
		font-weight: 800;
		color: #0a1628;
		font-variant-numeric: tabular-nums;
		letter-spacing: -0.02em;
		line-height: 1.1;
		margin-bottom: 4px;
	}
	.text-emerald { color: #059669; }
	.text-amber { color: #d97706; }
	.text-rose { color: #e11d48; }

	.stat-title {
		font-size: 12.5px;
		color: #64748b;
		font-weight: 500;
	}

	/* Toolbar */
	.table-toolbar {
		background: #ffffff;
		border: 1px solid #e2e8f0;
		border-radius: 16px;
		padding: 12px 16px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 16px;
		margin-bottom: 12px;
		flex-wrap: wrap;
	}
	.toolbar-left {
		display: flex;
		align-items: center;
		gap: 12px;
		flex: 1;
		flex-wrap: wrap;
	}
	.toolbar-right {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.search-wrap {
		position: relative;
		min-width: 280px;
		flex: 1;
		max-width: 380px;
	}
	:global(.search-icon) {
		position: absolute;
		left: 12px;
		top: 50%;
		transform: translateY(-50%);
		color: #94a3b8;
		pointer-events: none;
	}
	.search-input {
		width: 100%;
		height: 40px;
		padding: 0 34px 0 38px;
		background: #f8fafc;
		border: 1px solid #e2e8f0;
		border-radius: 10px;
		font-size: 13px;
		font-weight: 500;
		font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
		color: #0a1628;
		outline: none;
		box-sizing: border-box;
		transition: all 0.2s ease;
	}
	.search-input:focus {
		background: #ffffff;
		border-color: #2563eb;
		box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
	}
	.clear-search-btn {
		position: absolute;
		right: 10px;
		top: 50%;
		transform: translateY(-50%);
		background: #e2e8f0;
		border: none;
		color: #475569;
		width: 18px;
		height: 18px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
	}

	.filter-group {
		display: flex;
		align-items: center;
		gap: 4px;
		background: #f1f5f9;
		padding: 4px;
		border-radius: 10px;
		height: 40px;
		box-sizing: border-box;
	}
	.cat-filter-btn {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		height: 32px;
		padding: 0 12px;
		border-radius: 7px;
		font-size: 12.5px;
		font-weight: 600;
		font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
		border: none;
		background: transparent;
		color: #64748b;
		cursor: pointer;
		transition: all 0.15s ease;
	}
	.cat-filter-btn:hover {
		color: #0a1628;
	}
	.cat-filter-btn.active {
		background: #0a1628;
		color: #ffffff;
		box-shadow: 0 2px 6px rgba(10, 22, 40, 0.12);
	}
	.cat-count {
		font-size: 10.5px;
		font-weight: 700;
		background: #e2e8f0;
		color: #475569;
		padding: 1px 6px;
		border-radius: 9999px;
	}
	.cat-filter-btn.active .cat-count {
		background: rgba(255, 255, 255, 0.22);
		color: #ffffff;
	}

	.select-wrap {
		position: relative;
	}
	.custom-select {
		height: 40px;
		padding: 0 14px;
		background: #f8fafc;
		border: 1px solid #e2e8f0;
		border-radius: 10px;
		font-size: 12.5px;
		font-weight: 600;
		font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
		color: #334155;
		cursor: pointer;
		outline: none;
		transition: all 0.15s ease;
	}
	.custom-select:focus {
		border-color: #2563eb;
		background: #ffffff;
		box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
	}

	.view-switch-box {
		display: flex;
		background: #f1f5f9;
		padding: 3px;
		border-radius: 10px;
		gap: 2px;
		height: 40px;
		box-sizing: border-box;
		align-items: center;
	}
	.view-btn {
		background: transparent;
		border: none;
		width: 34px;
		height: 34px;
		border-radius: 7px;
		color: #64748b;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.15s ease;
	}
	.view-btn:hover {
		color: #0a1628;
	}
	.view-btn.active {
		background: #ffffff;
		color: #0a1628;
		box-shadow: 0 1px 3px rgba(10, 22, 40, 0.08);
	}

	/* Results Meta Bar */
	.results-meta-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 4px 6px 14px;
		font-size: 12.5px;
		color: #64748b;
		font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
	}
	.filtered-tag {
		color: #2563eb;
		font-weight: 600;
		margin-left: 4px;
	}
	.reset-filters-link {
		background: none;
		border: none;
		color: #2563eb;
		font-weight: 600;
		cursor: pointer;
		padding: 0;
		font-size: 12px;
		font-family: inherit;
	}
	.reset-filters-link:hover {
		text-decoration: underline;
	}

	/* TABLE VIEW */
	.table-wrapper {
		background: #ffffff;
		border: 1px solid #e2e8f0;
		border-radius: 16px;
		overflow: hidden;
		box-shadow: 0 2px 12px -2px rgba(10, 22, 40, 0.04);
	}
	.cms-table {
		width: 100%;
		border-collapse: separate;
		border-spacing: 0;
		font-size: 13.5px;
		font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
	}
	.cms-table thead {
		background: #f8fafc;
	}
	.cms-table th {
		padding: 14px 18px;
		text-align: left;
		font-size: 11px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: #64748b;
		border-bottom: 1px solid #e2e8f0;
		font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
	}
	.cms-table tbody tr {
		transition: background-color 0.15s ease;
	}
	.cms-table tbody tr:hover td {
		background: #f8fafc;
	}
	.cms-table tbody tr.unpublished {
		opacity: 0.65;
		background: rgba(241, 245, 249, 0.4);
	}
	.cms-table td {
		padding: 16px 18px;
		vertical-align: middle;
		border-bottom: 1px solid #f1f5f9;
		background: #ffffff;
		font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
	}
	.cms-table tbody tr:last-child td {
		border-bottom: none;
	}

	/* Order Cell Badge + Stepper */
	.order-cell {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		justify-content: center;
		background: #f8fafc;
		border: 1px solid #e2e8f0;
		border-radius: 8px;
		padding: 3px 6px;
	}
	.order-num {
		font-size: 13px;
		font-weight: 700;
		color: #0a1628;
		min-width: 20px;
	}
	.order-arrows {
		display: flex;
		flex-direction: column;
		gap: 1px;
	}
	.order-arrow-btn {
		background: transparent;
		border: none;
		padding: 1px;
		color: #94a3b8;
		cursor: pointer;
		border-radius: 3px;
		display: flex;
		align-items: center;
		justify-content: center;
		line-height: 1;
		transition: all 0.12s ease;
	}
	.order-arrow-btn:hover {
		background: #e2e8f0;
		color: #0a1628;
	}

	/* Thumbnail */
	.thumb-container {
		width: 86px;
		height: 54px;
		border-radius: 10px;
		position: relative;
		overflow: hidden;
		background: #f1f5f9;
		border: 1px solid #e2e8f0;
		box-shadow: 0 1px 3px rgba(10, 22, 40, 0.04);
	}
	.table-thumb {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
	}
	.thumb-container:hover .table-thumb {
		transform: scale(1.06);
	}
	.badge-new-clean {
		position: absolute;
		top: 4px;
		left: 4px;
		background: #ef4444;
		color: #ffffff;
		font-size: 9px;
		font-weight: 800;
		padding: 2px 5px;
		border-radius: 4px;
		display: inline-flex;
		align-items: center;
		gap: 2.5px;
		box-shadow: 0 2px 5px rgba(239, 68, 68, 0.35);
		line-height: 1;
	}

	/* Project Title & Slug */
	.project-title-row {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-bottom: 4px;
		flex-wrap: wrap;
	}
	.project-title-text {
		all: unset;
		cursor: pointer;
		font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
		font-size: 14.5px;
		font-weight: 700;
		color: #0a1628;
		line-height: 1.4;
		display: inline-block;
		text-align: left;
		transition: color 0.15s ease;
	}
	.project-title-text:hover {
		color: #2563eb;
		text-decoration: underline;
	}
	.featured-indicator {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		font-size: 10.5px;
		font-weight: 700;
		background: #fef3c7;
		color: #92400e;
		border: 1px solid rgba(245, 158, 11, 0.3);
		padding: 2px 7px;
		border-radius: 6px;
	}
	.project-sub-text {
		font-size: 12.5px;
		color: #64748b;
		margin-bottom: 6px;
		max-width: 440px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		line-height: 1.45;
		font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
	}
	.project-slug-tag {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		font-size: 11px;
		font-weight: 600;
		color: #2563eb;
		text-decoration: none;
		background: #eff6ff;
		border: 1px solid rgba(37, 99, 235, 0.15);
		padding: 2px 8px;
		border-radius: 6px;
		font-family: 'Plus Jakarta Sans', ui-monospace, monospace;
		transition: all 0.15s ease;
	}
	.project-slug-tag:hover {
		background: #dbeafe;
		border-color: rgba(37, 99, 235, 0.3);
	}

	/* Category Pills */
	.cat-pill {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		font-size: 11.5px;
		font-weight: 700;
		padding: 4px 10px;
		border-radius: 9999px;
		letter-spacing: 0.01em;
		font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
	}
	.cat-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
	}
	.cat-pill.desain {
		background: #eff6ff;
		color: #1d4ed8;
		border: 1px solid #bfdbfe;
	}
	.cat-pill.desain .cat-dot { background: #2563eb; }

	.cat-pill.bisnis {
		background: #ecfdf5;
		color: #047857;
		border: 1px solid #a7f3d0;
	}
	.cat-pill.bisnis .cat-dot { background: #10b981; }

	.cat-pill.hybrid {
		background: #f5f3ff;
		color: #6d28d9;
		border: 1px solid #ddd6fe;
	}
	.cat-pill.hybrid .cat-dot { background: #7c3aed; }

	/* Roles & Duration */
	.role-text {
		font-size: 13px;
		font-weight: 600;
		color: #0a1628;
		line-height: 1.35;
		margin-bottom: 3px;
		font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
		display: flex;
		align-items: flex-start;
		gap: 6px;
	}
	.role-text :global(.meta-icon) {
		margin-top: 2.5px;
	}
	.duration-text {
		font-size: 11.5px;
		color: #64748b;
		line-height: 1.3;
		font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
		display: flex;
		align-items: center;
		gap: 6px;
	}
	.meta-icon {
		color: #94a3b8;
		flex-shrink: 0;
	}

	/* Toggle Buttons */
	.toggle-featured-btn {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		padding: 5px 11px;
		border-radius: 9999px;
		font-size: 11.5px;
		font-weight: 700;
		font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
		border: 1px solid #e2e8f0;
		background: #f8fafc;
		color: #94a3b8;
		cursor: pointer;
		transition: all 0.18s ease;
	}
	.toggle-featured-btn:hover {
		border-color: #cbd5e1;
		color: #475569;
	}
	.toggle-featured-btn.featured {
		background: #fffbeb;
		border-color: #fde68a;
		color: #b45309;
	}

	.status-toggle-btn {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 5px 12px;
		border-radius: 9999px;
		font-size: 11.5px;
		font-weight: 700;
		font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
		border: 1px solid #e2e8f0;
		background: #f8fafc;
		color: #94a3b8;
		cursor: pointer;
		transition: all 0.18s ease;
	}
	.status-toggle-btn:hover {
		border-color: #cbd5e1;
		color: #475569;
	}
	.status-toggle-btn.published {
		background: #ecfdf5;
		border-color: #bbf7d0;
		color: #047857;
	}
	.status-toggle-btn .status-dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: #94a3b8;
	}
	.status-toggle-btn.published .status-dot {
		background: #10b981;
		box-shadow: 0 0 6px rgba(16, 185, 129, 0.6);
	}

	/* Action buttons */
	.actions-group {
		display: inline-flex;
		align-items: center;
		gap: 5px;
	}
	.action-btn {
		width: 32px;
		height: 32px;
		border-radius: 8px;
		background: #ffffff;
		border: 1px solid #e2e8f0;
		color: #475569;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: all 0.15s ease;
		text-decoration: none;
	}
	.action-btn:hover {
		background: #f1f5f9;
		color: #0a1628;
		border-color: #cbd5e1;
	}
	.action-btn.delete:hover {
		background: #fee2e2;
		color: #ef4444;
		border-color: #fca5a5;
	}

	/* GRID / CARD VIEW */
	.cards-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
		gap: 20px;
	}
	.project-grid-card {
		background: #ffffff;
		border: 1px solid rgba(15, 23, 42, 0.08);
		border-radius: 16px;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
		box-shadow: 0 1px 3px rgba(15, 23, 42, 0.02);
	}
	.project-grid-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 10px 25px rgba(15, 23, 42, 0.06);
		border-color: rgba(99, 102, 241, 0.2);
	}
	.project-grid-card.unpublished {
		opacity: 0.7;
	}
	.card-media-wrap {
		width: 100%;
		height: 190px;
		position: relative;
		overflow: hidden;
		background: #0f172a;
	}
	.card-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.3s ease;
	}
	.project-grid-card:hover .card-img {
		transform: scale(1.04);
	}
	.card-badges-overlay {
		position: absolute;
		top: 12px;
		left: 12px;
		right: 12px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.overlay-right {
		display: flex;
		gap: 6px;
	}
	.card-tag-new {
		background: #ef4444;
		color: #ffffff;
		font-size: 10px;
		font-weight: 800;
		padding: 2.5px 7px;
		border-radius: 6px;
		display: inline-flex;
		align-items: center;
		gap: 3px;
		box-shadow: 0 2px 6px rgba(239, 68, 68, 0.35);
		line-height: 1;
	}
	.card-tag-featured {
		background: rgba(15, 23, 42, 0.85);
		color: #fbbf24;
		border: 1px solid rgba(251, 191, 36, 0.4);
		padding: 4px;
		border-radius: 6px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.card-body {
		padding: 18px 20px;
		flex: 1;
		display: flex;
		flex-direction: column;
	}
	.card-meta-row {
		display: flex;
		align-items: center;
		gap: 6px;
		font-size: 11.5px;
		color: #64748b;
		margin-bottom: 8px;
		flex-wrap: wrap;
	}
	.card-order-badge {
		font-weight: 800;
		color: #0f172a;
		background: #f1f5f9;
		padding: 1px 6px;
		border-radius: 4px;
	}
	.card-role,
	.card-duration {
		font-weight: 600;
		color: #475569;
		display: inline-flex;
		align-items: center;
		gap: 4px;
	}
	.meta-sep { opacity: 0.4; }
	.card-title {
		margin: 0 0 6px;
		line-height: 1.35;
	}
	.card-title-btn {
		all: unset;
		cursor: pointer;
		font-family: inherit;
		font-size: 15.5px;
		font-weight: 700;
		color: #0a1628;
		line-height: 1.4;
		display: block;
		text-align: left;
		transition: color 0.15s ease;
	}
	.card-title-btn:hover {
		color: #2563eb;
	}
	.card-summary {
		font-size: 13px;
		color: #64748b;
		line-height: 1.5;
		margin: 0 0 14px;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
	.card-tools-row {
		display: flex;
		gap: 6px;
		margin-top: auto;
		flex-wrap: wrap;
	}
	.tool-tag-pill {
		font-size: 11px;
		font-weight: 600;
		color: #475569;
		background: #f1f5f9;
		padding: 2px 8px;
		border-radius: 6px;
	}

	.card-footer {
		padding: 12px 18px;
		background: #f8fafc;
		border-top: 1px solid rgba(15, 23, 42, 0.06);
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.footer-actions {
		display: inline-flex;
		align-items: center;
		gap: 5px;
	}
	.action-btn.featured {
		background: #fffbeb;
		border-color: #fde68a;
		color: #d97706;
	}
	.action-btn.featured:hover {
		background: #fef3c7;
		border-color: #f59e0b;
		color: #b45309;
	}

	/* Empty state */
	.empty-state, .grid-empty-state {
		padding: 60px 20px;
		text-align: center;
		color: #64748b;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.empty-icon-wrap {
		width: 64px;
		height: 64px;
		background: #f1f5f9;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #94a3b8;
		margin-bottom: 16px;
	}
	.empty-title {
		font-size: 16px;
		font-weight: 700;
		color: #0f172a;
		margin-bottom: 6px;
	}
	.empty-desc {
		font-size: 13.5px;
		color: #64748b;
		max-width: 360px;
		margin-bottom: 20px;
	}
	.btn-add-empty {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 9px 18px;
		background: #0f172a;
		color: #ffffff;
		border: none;
		border-radius: 10px;
		font-weight: 600;
		font-size: 13px;
		cursor: pointer;
	}

	/* ================= MODAL EDITOR ================= */
	.modal-backdrop {
		position: fixed;
		inset: 0;
		z-index: 999;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 24px;
		animation: fadeIn 0.2s ease;
	}
	.backdrop-dismiss {
		position: absolute;
		inset: 0;
		background: rgba(15, 23, 42, 0.6);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		border: none;
		cursor: pointer;
	}
	.modal-panel {
		position: relative;
		width: 100%;
		max-width: 880px;
		max-height: 90vh;
		background: #ffffff;
		border-radius: 20px;
		box-shadow: 0 25px 60px -15px rgba(15, 23, 42, 0.35);
		display: flex;
		flex-direction: column;
		overflow: hidden;
		animation: modalPop 0.25s cubic-bezier(0.16, 1, 0.3, 1);
		border: 1px solid rgba(255, 255, 255, 0.8);
	}
	@keyframes fadeIn {
		from { opacity: 0; }
		to { opacity: 1; }
	}
	@keyframes modalPop {
		from { transform: scale(0.96) translateY(12px); opacity: 0; }
		to { transform: scale(1) translateY(0); opacity: 1; }
	}

	.modal-header {
		padding: 20px 24px;
		border-bottom: 1px solid #e2e8f0;
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		background: #f8fafc;
	}
	.modal-badge-row {
		display: flex;
		gap: 8px;
		margin-bottom: 4px;
	}
	.modal-cms-tag {
		font-size: 11px;
		font-weight: 700;
		color: #2563eb;
		background: #eff6ff;
		padding: 2px 7px;
		border-radius: 4px;
		border: 1px solid rgba(37, 99, 235, 0.15);
	}
	.mode-tag {
		font-size: 11px;
		color: #64748b;
		font-weight: 600;
	}
	.modal-title {
		font-size: 20px;
		font-weight: 800;
		color: #0a1628;
		letter-spacing: -0.02em;
		margin: 0;
	}
	.modal-close-btn {
		width: 34px;
		height: 34px;
		background: transparent;
		border: 1px solid #e2e8f0;
		color: #64748b;
		cursor: pointer;
		padding: 0;
		border-radius: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.15s ease;
	}
	.modal-close-btn:hover {
		background: #f1f5f9;
		color: #0a1628;
		border-color: #cbd5e1;
	}

	/* Modal Tabs */
	.modal-tabs {
		display: flex;
		border-bottom: 1px solid #e2e8f0;
		background: #ffffff;
		padding: 0 16px;
		gap: 6px;
		overflow-x: auto;
		-webkit-overflow-scrolling: touch;
		scrollbar-width: none;
	}
	.modal-tabs::-webkit-scrollbar {
		display: none;
	}
	.modal-tab-btn {
		flex-shrink: 0;
		white-space: nowrap;
		display: inline-flex;
		align-items: center;
		gap: 7px;
		padding: 12px 16px;
		border: none;
		background: transparent;
		font-size: 13px;
		font-weight: 600;
		color: #64748b;
		cursor: pointer;
		position: relative;
		transition: all 0.15s ease;
		font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
	}
	.modal-tab-btn:hover {
		color: #0a1628;
	}
	.modal-tab-btn.active {
		color: #2563eb;
		font-weight: 700;
	}
	.modal-tab-btn.active::after {
		content: '';
		position: absolute;
		bottom: -1px;
		left: 0;
		right: 0;
		height: 2px;
		background: #2563eb;
		border-radius: 2px 2px 0 0;
	}

	.modal-form {
		display: flex;
		flex-direction: column;
		flex: 1;
		overflow: hidden;
	}
	.modal-tab-content {
		padding: 24px;
		overflow-y: auto;
		flex: 1;
	}

	.form-grid-2 {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 16px;
	}
	.form-grid-3 {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: 16px;
	}
	.form-group {
		display: flex;
		flex-direction: column;
		gap: 6px;
		margin-bottom: 16px;
	}
	.field-label {
		font-size: 12.5px;
		font-weight: 700;
		color: #0a1628;
	}
	.field-hint {
		font-size: 11.5px;
		color: #94a3b8;
	}

	.link-label {
		display: inline-flex;
		align-items: center;
		gap: 6px;
	}

	.input-text, .input-select, .input-textarea {
		width: 100%;
		padding: 10px 14px;
		border: 1px solid #cbd5e1;
		border-radius: 10px;
		font-size: 13.5px;
		color: #0a1628;
		background: #ffffff;
		outline: none;
		font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
		transition: all 0.2s ease;
	}
	.input-text:focus, .input-select:focus, .input-textarea:focus {
		border-color: #2563eb;
		box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
	}
	.input-textarea {
		resize: vertical;
		line-height: 1.5;
	}

	.slug-wrap {
		display: flex;
		align-items: center;
		background: #ffffff;
		border: 1px solid #cbd5e1;
		border-radius: 10px;
		overflow: hidden;
		transition: all 0.2s ease;
	}
	.slug-wrap:focus-within {
		border-color: #2563eb;
		box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
	}
	.slug-prefix {
		padding: 10px 14px;
		font-size: 13px;
		color: #475569;
		background: #f8fafc;
		border-right: 1px solid #e2e8f0;
		font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
		font-weight: 600;
		user-select: none;
	}
	.slug-input {
		border: none !important;
		box-shadow: none !important;
		padding: 10px 14px;
		background: transparent;
		flex: 1;
	}

	/* Media tab layout */
	.media-preview-section {
		display: grid;
		grid-template-columns: 1.2fr 1fr;
		gap: 20px;
		margin-bottom: 24px;
	}
	.quick-tags-wrap {
		display: flex;
		align-items: center;
		gap: 6px;
		flex-wrap: wrap;
		margin-top: 6px;
	}
	.quick-tag-label {
		font-size: 11px;
		color: #64748b;
		font-weight: 600;
	}
	.quick-tag-btn {
		font-size: 11px;
		font-weight: 600;
		color: #4f46e5;
		background: #eef2ff;
		border: 1px solid #c7d2fe;
		padding: 2px 7px;
		border-radius: 6px;
		cursor: pointer;
		transition: all 0.15s ease;
	}
	.quick-tag-btn:hover {
		background: #4f46e5;
		color: #ffffff;
	}

	.live-preview-box {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}
	.preview-header-label {
		font-size: 12px;
		font-weight: 700;
		color: #475569;
	}
	.preview-img-frame {
		width: 100%;
		height: 170px;
		border-radius: 12px;
		overflow: hidden;
		position: relative;
		background: #0f172a;
		border: 1px solid rgba(15, 23, 42, 0.1);
	}
	.preview-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.preview-overlay {
		position: absolute;
		bottom: 10px;
		left: 10px;
		right: 10px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	/* Switches Grid */
	.switches-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 12px;
	}
	.switch-card {
		background: #ffffff;
		border: 1px solid #e2e8f0;
		border-radius: 14px;
		padding: 14px 16px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		transition: all 0.2s ease;
	}
	.switch-card:hover {
		border-color: #cbd5e1;
		background: #f8fafc;
	}
	.switch-card.active {
		border-color: #bfdbfe;
		background: #f0f7ff;
	}
	.switch-content {
		flex: 1;
		min-width: 0;
	}
	.switch-title-row {
		display: flex;
		align-items: flex-start;
		gap: 10px;
	}
	.switch-icon-box {
		width: 30px;
		height: 30px;
		border-radius: 8px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}
	.switch-icon-box.featured {
		background: #eff6ff;
		color: #2563eb;
	}
	.switch-icon-box.new {
		background: #fff7ed;
		color: #ea580c;
	}
	.switch-icon-box.pub {
		background: #ecfdf5;
		color: #059669;
	}
	.switch-title {
		font-size: 13px;
		font-weight: 700;
		color: #0a1628;
		line-height: 1.3;
	}
	.switch-desc {
		font-size: 11px;
		color: #64748b;
		margin-top: 2px;
		line-height: 1.4;
	}

	/* Modern iOS-style toggle switch */
	.toggle-switch {
		position: relative;
		display: inline-block;
		width: 44px;
		height: 24px;
		flex-shrink: 0;
	}
	.toggle-switch input {
		opacity: 0;
		width: 0;
		height: 0;
	}
	.slider {
		position: absolute;
		cursor: pointer;
		inset: 0;
		background-color: #cbd5e1;
		transition: 0.2s;
		border-radius: 24px;
	}
	.slider:before {
		position: absolute;
		content: "";
		height: 18px;
		width: 18px;
		left: 3px;
		bottom: 3px;
		background-color: white;
		transition: 0.2s;
		border-radius: 50%;
		box-shadow: 0 1px 3px rgba(0,0,0,0.2);
	}
	input:checked + .slider {
		background-color: #10b981;
	}
	input:checked + .slider:before {
		transform: translateX(20px);
	}

	/* Metrics Grid */
	.metrics-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 16px;
	}
	.metric-builder-card {
		background: #f8fafc;
		border: 1px solid #e2e8f0;
		border-radius: 14px;
		padding: 16px;
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
	.metric-card-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.metric-card-badge {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		font-size: 11.5px;
		font-weight: 700;
		color: #2563eb;
		background: #eff6ff;
		padding: 3px 8px;
		border-radius: 6px;
		border: 1px solid rgba(37, 99, 235, 0.15);
	}
	.metric-inputs-row {
		display: grid;
		grid-template-columns: 110px 1fr;
		gap: 10px;
	}
	.metric-input-field {
		display: flex;
		flex-direction: column;
		gap: 5px;
	}
	.metric-input-field label {
		font-size: 11px;
		font-weight: 700;
		color: #475569;
	}
	.metric-val {
		font-weight: 800;
		color: #2563eb;
		text-align: center;
	}

	/* Modal Footer */
	.modal-footer {
		padding: 16px 24px;
		border-top: 1px solid rgba(15, 23, 42, 0.08);
		background: #f8fafc;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.kbd-hint {
		font-size: 11.5px;
		color: #94a3b8;
	}
	.kbd-hint strong {
		color: #475569;
		background: #e2e8f0;
		padding: 1px 5px;
		border-radius: 4px;
	}
	.footer-buttons {
		display: flex;
		gap: 10px;
	}
	.btn-cancel {
		padding: 9px 18px;
		background: #ffffff;
		border: 1px solid rgba(15, 23, 42, 0.12);
		border-radius: 10px;
		font-size: 13px;
		font-weight: 600;
		color: #475569;
		cursor: pointer;
		transition: all 0.15s ease;
	}
	.btn-cancel:hover {
		background: #f1f5f9;
		color: #0f172a;
	}
	.btn-save {
		display: inline-flex;
		align-items: center;
		gap: 7px;
		padding: 9px 20px;
		background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
		border: 1px solid #0f172a;
		border-radius: 10px;
		font-size: 13px;
		font-weight: 700;
		color: #ffffff;
		cursor: pointer;
		transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
		box-shadow: 0 4px 12px rgba(15, 23, 42, 0.18);
	}
	.btn-save:hover {
		background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
		transform: translateY(-1px);
	}

	/* Modal Confirm Panels */
	.modal-confirm-panel {
		position: relative;
		width: 100%;
		max-width: 440px;
		background: #ffffff;
		border-radius: 20px;
		padding: 28px;
		box-shadow: 0 25px 60px -15px rgba(15, 23, 42, 0.35);
		text-align: center;
		animation: modalPop 0.25s cubic-bezier(0.16, 1, 0.3, 1);
		border: 1px solid rgba(255, 255, 255, 0.8);
	}
	.confirm-icon-box {
		width: 52px;
		height: 52px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 auto 16px;
	}
	.confirm-icon-box.danger {
		background: #fef2f2;
		color: #dc2626;
	}
	.confirm-icon-box.reset {
		background: #fffbeb;
		color: #d97706;
	}
	.confirm-title {
		font-size: 18px;
		font-weight: 800;
		color: #0f172a;
		margin: 0 0 8px;
	}
	.confirm-desc {
		font-size: 13.5px;
		color: #64748b;
		line-height: 1.5;
		margin: 0 0 24px;
	}
	.confirm-actions {
		display: flex;
		gap: 10px;
		justify-content: center;
	}
	.btn-danger {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 9px 18px;
		background: #dc2626;
		color: #ffffff;
		border: 1px solid #dc2626;
		border-radius: 10px;
		font-size: 13px;
		font-weight: 700;
		cursor: pointer;
		transition: all 0.15s ease;
		box-shadow: 0 4px 12px rgba(220, 38, 38, 0.25);
	}
	.btn-danger:hover {
		background: #b91c1c;
		border-color: #b91c1c;
	}

	@media (max-width: 900px) {
		.stats-cards-row {
			grid-template-columns: repeat(2, 1fr);
		}
		.cards-grid {
			grid-template-columns: 1fr;
		}
		.media-preview-section {
			grid-template-columns: 1fr;
		}
		.form-grid-2, .form-grid-3, .switches-grid, .metrics-grid {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 600px) {
		.stats-cards-row {
			grid-template-columns: 1fr;
		}
		.page-header {
			flex-direction: column;
			align-items: stretch;
		}
		.header-actions {
			flex-direction: column;
			align-items: stretch;
		}
		.header-actions :global(.btn-primary) {
			width: 100%;
			justify-content: center;
		}
		.filter-bar {
			flex-direction: column;
			align-items: stretch;
		}
		.modal-panel {
			max-height: 94vh;
			margin: 8px;
			width: calc(100% - 16px);
			border-radius: 16px;
		}
		.modal-header {
			padding: 14px 16px;
		}
		.modal-footer {
			padding: 12px 16px;
			flex-direction: column;
			align-items: stretch;
		}
		.footer-buttons {
			width: 100%;
			flex-direction: column;
			align-items: stretch;
		}
		.footer-buttons button {
			width: 100%;
			justify-content: center;
		}
	}
</style>
