<script lang="ts">
	import { portfolioStore } from '$lib/stores/portfolioStore.svelte';
	import type { CategoryItem } from '$lib/types/portfolio';
	import {
		Tags,
		Plus,
		Search,
		Edit3,
		Trash2,
		CheckCircle2,
		X,
		Check,
		RotateCcw,
		AlertTriangle,
		Layers,
		FolderKanban,
		Palette,
		Hash,
		Sparkles,
		Eye,
		EyeOff,
		ExternalLink
	} from 'lucide-svelte';

	// Filters
	let searchQuery = $state('');
	let statusFilter: 'semua' | 'aktif' | 'nonaktif' = $state('semua');

	// Toast notification
	let toastMessage = $state('');
	let toastTimer: any = null;

	function showToast(msg: string) {
		if (toastTimer) clearTimeout(toastTimer);
		toastMessage = msg;
		toastTimer = setTimeout(() => (toastMessage = ''), 3200);
	}

	// Modal states
	let isFormModalOpen = $state(false);
	let isEditMode = $state(false);
	let editingId: string | null = $state(null);

	let isDeleteModalOpen = $state(false);
	let categoryToDelete: CategoryItem | null = $state(null);

	let isResetModalOpen = $state(false);

	// Preset color palette for categories
	const colorPresets = [
		{ hex: '#2563eb', label: 'Royal Blue' },
		{ hex: '#10b981', label: 'Emerald' },
		{ hex: '#8b5cf6', label: 'Violet' },
		{ hex: '#f59e0b', label: 'Amber' },
		{ hex: '#f43f5e', label: 'Rose' },
		{ hex: '#06b6d4', label: 'Cyan' },
		{ hex: '#6366f1', label: 'Indigo' },
		{ hex: '#0a1628', label: 'Navy Textio' },
		{ hex: '#475569', label: 'Slate' }
	];

	// Form state
	let formData = $state({
		name: '',
		slug: '',
		description: '',
		color: '#2563eb',
		displayOrder: 1,
		isActive: true
	});

	function slugify(text: string) {
		return text
			.toLowerCase()
			.trim()
			.replace(/[^\w\s-]/g, '')
			.replace(/[\s_-]+/g, '-')
			.replace(/^-+|-+$/g, '');
	}

	function handleNameInput(e: Event) {
		const target = e.target as HTMLInputElement;
		formData.name = target.value;
		if (!isEditMode) {
			formData.slug = slugify(target.value);
		}
	}

	function openAddModal() {
		isEditMode = false;
		editingId = null;
		formData = {
			name: '',
			slug: '',
			description: '',
			color: '#2563eb',
			displayOrder: (portfolioStore.categories.length || 0) + 1,
			isActive: true
		};
		isFormModalOpen = true;
	}

	function openEditModal(cat: CategoryItem) {
		isEditMode = true;
		editingId = cat.id;
		formData = {
			name: cat.name,
			slug: cat.slug,
			description: cat.description || '',
			color: cat.color || '#2563eb',
			displayOrder: cat.displayOrder ?? 1,
			isActive: cat.isActive !== false
		};
		isFormModalOpen = true;
	}

	function handleFormSubmit(e: Event) {
		e.preventDefault();
		const name = formData.name.trim();
		if (!name) {
			alert('Nama kategori wajib diisi.');
			return;
		}

		const slug = formData.slug.trim() || slugify(name);

		if (isEditMode && editingId) {
			portfolioStore.updateCategory(editingId, {
				name,
				slug,
				description: formData.description.trim(),
				color: formData.color,
				displayOrder: Number(formData.displayOrder) || 1,
				isActive: formData.isActive
			});
			showToast(`Kategori "${name}" berhasil diperbarui.`);
		} else {
			portfolioStore.addCategory({
				name,
				slug,
				description: formData.description.trim(),
				color: formData.color,
				displayOrder: Number(formData.displayOrder) || 1,
				isActive: formData.isActive
			});
			showToast(`Kategori baru "${name}" berhasil ditambahkan.`);
		}

		isFormModalOpen = false;
	}

	function openDeleteModal(cat: CategoryItem) {
		categoryToDelete = cat;
		isDeleteModalOpen = true;
	}

	function confirmDelete() {
		if (categoryToDelete) {
			const name = categoryToDelete.name;
			portfolioStore.deleteCategory(categoryToDelete.id);
			showToast(`Kategori "${name}" berhasil dihapus.`);
			isDeleteModalOpen = false;
			categoryToDelete = null;
		}
	}

	function toggleActive(cat: CategoryItem) {
		portfolioStore.toggleCategoryActive(cat.id);
		showToast(
			`Status kategori "${cat.name}" diubah menjadi ${!cat.isActive ? 'Aktif' : 'Non-aktif'}.`
		);
	}

	function confirmReset() {
		portfolioStore.resetCategories();
		showToast('Daftar kategori berhasil di-reset ke nilai default bawaan.');
		isResetModalOpen = false;
	}

	// Projects associated count
	function getProjectCount(catName: string) {
		return portfolioStore.projects.filter(
			(p) => p.category.toLowerCase() === catName.toLowerCase()
		).length;
	}

	// Metric summaries
	const totalCategories = $derived(portfolioStore.categories.length);
	const activeCategories = $derived(
		portfolioStore.categories.filter((c) => c.isActive).length
	);
	const inactiveCategories = $derived(
		portfolioStore.categories.filter((c) => !c.isActive).length
	);
	const categorizedProjectsCount = $derived(
		portfolioStore.projects.filter((p) =>
			portfolioStore.categories.some((c) => c.name.toLowerCase() === p.category.toLowerCase())
		).length
	);

	// Filtered list
	const displayedCategories = $derived.by(() => {
		const q = searchQuery.toLowerCase().trim();
		return portfolioStore.categories
			.filter((cat) => {
				// Status
				if (statusFilter === 'aktif' && !cat.isActive) return false;
				if (statusFilter === 'nonaktif' && cat.isActive) return false;

				// Search
				if (!q) return true;
				return (
					cat.name.toLowerCase().includes(q) ||
					cat.slug.toLowerCase().includes(q) ||
					(cat.description && cat.description.toLowerCase().includes(q))
				);
			})
			.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
	});

	// Affected projects when deleting
	const affectedProjects = $derived.by(() => {
		if (!categoryToDelete) return [];
		return portfolioStore.projects.filter(
			(p) => p.category.toLowerCase() === categoryToDelete?.name.toLowerCase()
		);
	});
</script>

<svelte:head>
	<title>Master Kategori — Admin CMS Bagiz</title>
</svelte:head>

<div class="kategori-admin-container">
	<!-- Floating Toast -->
	{#if toastMessage}
		<div class="toast-floating" role="status">
			<CheckCircle2 size={16} />
			<span>{toastMessage}</span>
		</div>
	{/if}

	<!-- Page Header -->
	<header class="page-header">
		<div>
			<div class="badge-pill">
				<Tags size={13} />
				<span>MASTER DATA & TAKSONOMI</span>
			</div>
			<h1 class="page-title">Master Kategori Karya</h1>
			<p class="page-desc">
				Kelola kategori dan bidang keahlian portofolio. Kategori ini digunakan untuk filter karya di beranda dan formulir karya.
			</p>
		</div>

		<div class="header-actions">
			<button class="btn-outline" onclick={() => (isResetModalOpen = true)}>
				<RotateCcw size={14} />
				<span>Reset Default</span>
			</button>
			<button class="btn-primary" onclick={openAddModal}>
				<Plus size={15} />
				<span>Tambah Kategori</span>
			</button>
		</div>
	</header>

	<!-- Metric Cards Grid -->
	<section class="stats-row" aria-label="Statistik Kategori">
		<div class="stat-card">
			<div class="stat-icon-wrap blue">
				<Tags size={20} />
			</div>
			<div class="stat-info">
				<span class="stat-value">{totalCategories}</span>
				<span class="stat-label">Total Kategori</span>
			</div>
		</div>

		<div class="stat-card">
			<div class="stat-icon-wrap emerald">
				<CheckCircle2 size={20} />
			</div>
			<div class="stat-info">
				<span class="stat-value">{activeCategories}</span>
				<span class="stat-label">Kategori Aktif</span>
			</div>
		</div>

		<div class="stat-card">
			<div class="stat-icon-wrap purple">
				<FolderKanban size={20} />
			</div>
			<div class="stat-info">
				<span class="stat-value">{categorizedProjectsCount}</span>
				<span class="stat-label">Proyek Terkait</span>
			</div>
		</div>

		<div class="stat-card">
			<div class="stat-icon-wrap slate">
				<EyeOff size={20} />
			</div>
			<div class="stat-info">
				<span class="stat-value">{inactiveCategories}</span>
				<span class="stat-label">Non-aktif</span>
			</div>
		</div>
	</section>

	<!-- Toolbar Filter & Search -->
	<div class="toolbar-card">
		<div class="toolbar-left">
			<div class="search-input-wrap">
				<Search size={15} class="search-icon" />
				<input
					type="text"
					placeholder="Cari nama, slug, atau deskripsi kategori..."
					bind:value={searchQuery}
					class="search-input"
				/>
				{#if searchQuery}
					<button
						class="clear-search-btn"
						onclick={() => (searchQuery = '')}
						aria-label="Bersihkan pencarian"
					>
						<X size={13} />
					</button>
				{/if}
			</div>

			<div class="status-filter-wrap">
				<select class="custom-select" bind:value={statusFilter}>
					<option value="semua">Semua Status ({totalCategories})</option>
					<option value="aktif">Hanya Aktif ({activeCategories})</option>
					<option value="nonaktif">Hanya Non-aktif ({inactiveCategories})</option>
				</select>
			</div>
		</div>

		<div class="toolbar-right">
			<span class="item-count-text">
				Menampilkan <strong>{displayedCategories.length}</strong> dari {totalCategories} kategori
			</span>
		</div>
	</div>

	<!-- Data Table Card -->
	<div class="data-table-card">
		{#if displayedCategories.length === 0}
			<div class="empty-state">
				<div class="empty-icon-box">
					<Tags size={28} />
				</div>
				<h3 class="empty-title">Tidak ada kategori ditemukan</h3>
				<p class="empty-desc">
					{#if searchQuery}
						Tidak ada kategori yang cocok dengan kata kunci "{searchQuery}".
					{:else}
						Belum ada data kategori. Klik tombol di bawah untuk menambahkan.
					{/if}
				</p>
				{#if searchQuery}
					<button class="btn-outline btn-sm" onclick={() => (searchQuery = '')}>
						Hapus Filter Pencarian
					</button>
				{:else}
					<button class="btn-primary btn-sm" onclick={openAddModal}>
						<Plus size={14} />
						<span>Tambah Kategori Sekarang</span>
					</button>
				{/if}
			</div>
		{:else}
			<div class="table-responsive">
				<table class="cms-table">
					<thead>
						<tr>
							<th class="th-order">Urutan</th>
							<th class="th-name">Kategori & Slug</th>
							<th class="th-desc">Deskripsi Bidang</th>
							<th class="th-count text-center">Proyek</th>
							<th class="th-status text-center">Status</th>
							<th class="th-actions text-right">Aksi</th>
						</tr>
					</thead>
					<tbody>
						{#each displayedCategories as cat (cat.id)}
							{@const projectCount = getProjectCount(cat.name)}
							<tr class="table-row" class:row-disabled={!cat.isActive}>
								<!-- Order & Color Swatch -->
								<td class="td-order">
									<div class="order-badge">
										<span
											class="color-dot"
											style="background-color: {cat.color || '#2563eb'}"
											title="Warna tema: {cat.color}"
										></span>
										<span class="order-num">#{cat.displayOrder || 1}</span>
									</div>
								</td>

								<!-- Name & Slug -->
								<td class="td-name">
									<div class="cat-title-row">
										<span class="cat-name-text">{cat.name}</span>
										<span
											class="cat-badge-chip"
											style="--badge-color: {cat.color || '#2563eb'}"
										>
											<span class="badge-dot"></span>
											<span>{cat.name}</span>
										</span>
									</div>
									<div class="slug-row">
										<span class="slug-label">Slug:</span>
										<code class="slug-code">/{cat.slug}</code>
									</div>
								</td>

								<!-- Description -->
								<td class="td-desc">
									{#if cat.description}
										<p class="desc-text">{cat.description}</p>
									{:else}
										<span class="desc-empty">Belum ada deskripsi</span>
									{/if}
								</td>

								<!-- Associated Projects Count -->
								<td class="td-count text-center">
									<a
										href="/admin/karya"
										class="project-count-pill"
										title="Lihat proyek dengan kategori ini di menu Karya"
									>
										<FolderKanban size={13} />
										<span>{projectCount} Proyek</span>
									</a>
								</td>

								<!-- Status Toggle -->
								<td class="td-status text-center">
									<button
										class="status-toggle-btn"
										class:active={cat.isActive}
										onclick={() => toggleActive(cat)}
										title={cat.isActive ? 'Klik untuk non-aktifkan' : 'Klik untuk aktifkan'}
									>
										{#if cat.isActive}
											<Eye size={13} />
											<span>Aktif</span>
										{:else}
											<EyeOff size={13} />
											<span>Non-aktif</span>
										{/if}
									</button>
								</td>

								<!-- Actions -->
								<td class="td-actions text-right">
									<div class="actions-group">
										<button
											class="action-btn edit-btn"
											onclick={() => openEditModal(cat)}
											title="Edit kategori"
											aria-label="Edit"
										>
											<Edit3 size={15} />
										</button>
										<button
											class="action-btn delete-btn"
											onclick={() => openDeleteModal(cat)}
											title="Hapus kategori"
											aria-label="Hapus"
										>
											<Trash2 size={15} />
										</button>
									</div>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{/if}
	</div>
</div>

<!-- ==================== FORM MODAL (ADD / EDIT) ==================== -->
{#if isFormModalOpen}
	<div
		class="modal-backdrop"
		onclick={() => (isFormModalOpen = false)}
		onkeydown={(e) => e.key === 'Escape' && (isFormModalOpen = false)}
		role="presentation"
	>
		<div
			class="modal-box"
			onclick={(e) => e.stopPropagation()}
			onkeydown={(e) => e.stopPropagation()}
			role="dialog"
			tabindex="-1"
			aria-labelledby="modal-title"
		>
			<div class="modal-header">
				<div class="modal-header-left">
					<div class="modal-icon-badge">
						<Tags size={18} />
					</div>
					<div>
						<h2 id="modal-title" class="modal-title">
							{isEditMode ? 'Edit Kategori' : 'Tambah Kategori Baru'}
						</h2>
						<p class="modal-sub">
							{isEditMode
								? 'Perbarui detail nama, slug, warna, dan status taksonomi.'
								: 'Definisikan kategori baru untuk mengelompokkan karya portofolio.'}
						</p>
					</div>
				</div>
				<button
					class="modal-close-btn"
					onclick={() => (isFormModalOpen = false)}
					aria-label="Tutup modal"
				>
					<X size={18} />
				</button>
			</div>

			<form onsubmit={handleFormSubmit} class="modal-form">
				<!-- Nama Kategori & Slug -->
				<div class="form-grid-2">
					<div class="form-group">
						<label for="cat-name" class="field-label">Nama Kategori *</label>
						<input
							id="cat-name"
							type="text"
							class="input-text"
							placeholder="e.g. Desain, Bisnis, Mobile App..."
							value={formData.name}
							oninput={handleNameInput}
							required
						/>
					</div>

					<div class="form-group">
						<label for="cat-slug" class="field-label">Slug URL *</label>
						<div class="slug-input-wrapper">
							<span class="slug-prefix">/karya?cat=</span>
							<input
								id="cat-slug"
								type="text"
								class="input-text slug-input"
								placeholder="e.g. desain"
								bind:value={formData.slug}
								required
							/>
						</div>
					</div>
				</div>

				<!-- Deskripsi Kategori -->
				<div class="form-group">
					<label for="cat-desc" class="field-label">Deskripsi Bidang / Taksonomi</label>
					<textarea
						id="cat-desc"
						class="input-textarea"
						rows="3"
						placeholder="Jelaskan cakupan bidang ini (misal: UI/UX, Design System, Arsitektur Antarmuka & Aksesibilitas WCAG)..."
						bind:value={formData.description}
					></textarea>
				</div>

				<!-- Warna Kategori & Urutan -->
				<div class="form-grid-2">
					<!-- Color Selection -->
					<div class="form-group">
						<label for="cat-color" class="field-label">Warna Aksen Kategori</label>
						<div class="color-picker-row">
							<div class="color-preview-box" style="background-color: {formData.color}">
								<input
									id="cat-color"
									type="color"
									bind:value={formData.color}
									class="native-color-input"
									title="Pilih warna kustom"
								/>
							</div>
							<input
								type="text"
								class="input-text hex-input"
								bind:value={formData.color}
								placeholder="#2563eb"
							/>
						</div>

						<!-- Quick Presets -->
						<div class="color-preset-pills">
							{#each colorPresets as preset}
								<button
									type="button"
									class="preset-dot"
									class:active={formData.color.toLowerCase() === preset.hex.toLowerCase()}
									style="background-color: {preset.hex}"
									onclick={() => (formData.color = preset.hex)}
									title="{preset.label} ({preset.hex})"
								></button>
							{/each}
						</div>
					</div>

					<!-- Display Order & Active status -->
					<div class="form-group">
						<label for="cat-order" class="field-label">Urutan Tampilan</label>
						<input
							id="cat-order"
							type="number"
							min="1"
							max="99"
							class="input-text"
							bind:value={formData.displayOrder}
						/>
						<span class="field-hint">Menentukan urutan tombol tab filter pada halaman beranda.</span>
					</div>
				</div>

				<!-- Checkbox Aktif -->
				<div class="form-checkbox-group">
					<label class="custom-checkbox-label">
						<input
							type="checkbox"
							bind:checked={formData.isActive}
							class="custom-checkbox"
						/>
						<div class="checkbox-text-wrap">
							<span class="checkbox-title">Aktifkan Kategori</span>
							<span class="checkbox-desc">
								Jika dicentang, kategori ini akan muncul di filter karya publik dan formulir penambahan karya.
							</span>
						</div>
					</label>
				</div>

				<!-- Live Preview Pill -->
				<div class="preview-badge-box">
					<span class="preview-box-label">Pratinjau Badge Tag:</span>
					<div class="preview-pill" style="--preview-color: {formData.color || '#2563eb'}">
						<span class="preview-dot"></span>
						<span class="preview-text">{formData.name || 'Nama Kategori'}</span>
					</div>
				</div>

				<!-- Modal Actions -->
				<div class="modal-actions">
					<button
						type="button"
						class="btn-outline"
						onclick={() => (isFormModalOpen = false)}
					>
						Batal
					</button>
					<button type="submit" class="btn-primary">
						<Check size={16} />
						<span>{isEditMode ? 'Simpan Perubahan' : 'Tambahkan Kategori'}</span>
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}

<!-- ==================== DELETE MODAL ==================== -->
{#if isDeleteModalOpen && categoryToDelete}
	<div
		class="modal-backdrop"
		onclick={() => (isDeleteModalOpen = false)}
		onkeydown={(e) => e.key === 'Escape' && (isDeleteModalOpen = false)}
		role="presentation"
	>
		<div
			class="modal-box modal-box-sm"
			onclick={(e) => e.stopPropagation()}
			onkeydown={(e) => e.stopPropagation()}
			role="alertdialog"
			tabindex="-1"
			aria-labelledby="delete-title"
		>
			<div class="modal-header">
				<div class="modal-header-left">
					<div class="modal-icon-badge danger">
						<AlertTriangle size={18} />
					</div>
					<div>
						<h2 id="delete-title" class="modal-title">Hapus Kategori</h2>
						<p class="modal-sub">Konfirmasi penghapusan data kategori master.</p>
					</div>
				</div>
				<button
					class="modal-close-btn"
					onclick={() => (isDeleteModalOpen = false)}
					aria-label="Tutup modal"
				>
					<X size={18} />
				</button>
			</div>

			<div class="delete-modal-body">
				<p class="delete-warning-text">
					Apakah Anda yakin ingin menghapus kategori <strong>"{categoryToDelete.name}"</strong>?
				</p>

				{#if affectedProjects.length > 0}
					<div class="alert-box-warning">
						<AlertTriangle size={16} class="alert-icon" />
						<div>
							<strong>Perhatian:</strong>
							<span>
								Terdapat <strong>{affectedProjects.length} proyek</strong> yang saat ini menggunakan kategori ini. Menghapus kategori tidak akan menghapus proyek tersebut, tetapi filter kategori karya akan terpengaruh.
							</span>
						</div>
					</div>
				{/if}
			</div>

			<div class="modal-actions">
				<button
					type="button"
					class="btn-outline"
					onclick={() => (isDeleteModalOpen = false)}
				>
					Batal
				</button>
				<button type="button" class="btn-danger" onclick={confirmDelete}>
					<Trash2 size={15} />
					<span>Ya, Hapus Kategori</span>
				</button>
			</div>
		</div>
	</div>
{/if}

<!-- ==================== RESET MODAL ==================== -->
{#if isResetModalOpen}
	<div
		class="modal-backdrop"
		onclick={() => (isResetModalOpen = false)}
		onkeydown={(e) => e.key === 'Escape' && (isResetModalOpen = false)}
		role="presentation"
	>
		<div
			class="modal-box modal-box-sm"
			onclick={(e) => e.stopPropagation()}
			onkeydown={(e) => e.stopPropagation()}
			role="alertdialog"
			tabindex="-1"
			aria-labelledby="reset-title"
		>
			<div class="modal-header">
				<div class="modal-header-left">
					<div class="modal-icon-badge warning">
						<RotateCcw size={18} />
					</div>
					<div>
						<h2 id="reset-title" class="modal-title">Reset ke Kategori Bawaan</h2>
						<p class="modal-sub">Kembalikan daftar kategori default sistem.</p>
					</div>
				</div>
				<button
					class="modal-close-btn"
					onclick={() => (isResetModalOpen = false)}
					aria-label="Tutup modal"
				>
					<X size={18} />
				</button>
			</div>

			<div class="delete-modal-body">
				<p class="delete-warning-text">
					Daftar kategori akan dikembalikan ke 3 kategori bawaan: <strong>Desain, Bisnis, dan Hybrid</strong>. Seluruh kategori tambahan yang Anda buat akan di-reset.
				</p>
			</div>

			<div class="modal-actions">
				<button
					type="button"
					class="btn-outline"
					onclick={() => (isResetModalOpen = false)}
				>
					Batal
				</button>
				<button type="button" class="btn-primary" onclick={confirmReset}>
					<RotateCcw size={15} />
					<span>Ya, Reset Default</span>
				</button>
			</div>
		</div>
	</div>
{/if}

<style>
	.kategori-admin-container {
		padding: 24px 32px 64px;
		max-width: 1380px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: 24px;
	}

	/* Toast Floating */
	.toast-floating {
		position: fixed;
		bottom: 24px;
		right: 24px;
		background: #0a1628;
		color: #ffffff;
		padding: 12px 20px;
		border-radius: 12px;
		display: flex;
		align-items: center;
		gap: 10px;
		font-size: 13.5px;
		font-weight: 600;
		box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.25);
		z-index: 9999;
		animation: slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1);
		border: 1px solid rgba(255, 255, 255, 0.1);
	}

	@keyframes slideUp {
		from {
			opacity: 0;
			transform: translateY(12px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* Page Header */
	.page-header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 20px;
		flex-wrap: wrap;
	}

	.badge-pill {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		background: #eff6ff;
		color: #2563eb;
		font-size: 11px;
		font-weight: 800;
		letter-spacing: 0.08em;
		padding: 4px 10px;
		border-radius: 9999px;
		margin-bottom: 8px;
		border: 1px solid #bfdbfe;
	}

	.page-title {
		font-size: 26px;
		font-weight: 800;
		color: #0a1628;
		letter-spacing: -0.02em;
		margin: 0 0 6px;
		font-family: 'Syne', 'Plus Jakarta Sans', sans-serif;
	}

	.page-desc {
		font-size: 14px;
		color: #64748b;
		margin: 0;
		max-width: 650px;
		line-height: 1.5;
	}

	.header-actions {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	/* Buttons */
	.btn-primary {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		background: #2563eb;
		color: #ffffff;
		border: none;
		padding: 9px 18px;
		border-radius: 10px;
		font-size: 13.5px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.18s ease;
		box-shadow: 0 2px 6px rgba(37, 99, 235, 0.25);
	}

	.btn-primary:hover {
		background: #1d4ed8;
		transform: translateY(-1px);
		box-shadow: 0 4px 12px rgba(37, 99, 235, 0.35);
	}

	.btn-outline {
		display: inline-flex;
		align-items: center;
		gap: 7px;
		background: #ffffff;
		color: #475569;
		border: 1px solid #cbd5e1;
		padding: 9px 16px;
		border-radius: 10px;
		font-size: 13.5px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.18s ease;
	}

	.btn-outline:hover {
		background: #f8fafc;
		border-color: #94a3b8;
		color: #0a1628;
	}

	.btn-danger {
		display: inline-flex;
		align-items: center;
		gap: 7px;
		background: #ef4444;
		color: #ffffff;
		border: none;
		padding: 9px 18px;
		border-radius: 10px;
		font-size: 13.5px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.18s ease;
	}

	.btn-danger:hover {
		background: #dc2626;
	}

	.btn-sm {
		padding: 7px 14px;
		font-size: 12.5px;
	}

	/* Stats Row */
	.stats-row {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 16px;
	}

	.stat-card {
		background: #ffffff;
		border: 1px solid rgba(10, 22, 40, 0.08);
		border-radius: 14px;
		padding: 16px 20px;
		display: flex;
		align-items: center;
		gap: 14px;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
	}

	.stat-icon-wrap {
		width: 44px;
		height: 44px;
		border-radius: 12px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.stat-icon-wrap.blue {
		background: #eff6ff;
		color: #2563eb;
	}
	.stat-icon-wrap.emerald {
		background: #ecfdf5;
		color: #10b981;
	}
	.stat-icon-wrap.purple {
		background: #f5f3ff;
		color: #8b5cf6;
	}
	.stat-icon-wrap.slate {
		background: #f1f5f9;
		color: #64748b;
	}

	.stat-info {
		display: flex;
		flex-direction: column;
	}

	.stat-value {
		font-size: 22px;
		font-weight: 800;
		color: #0a1628;
		letter-spacing: -0.02em;
		line-height: 1.1;
	}

	.stat-label {
		font-size: 12px;
		font-weight: 600;
		color: #64748b;
		margin-top: 3px;
	}

	/* Toolbar */
	.toolbar-card {
		background: #ffffff;
		border: 1px solid rgba(10, 22, 40, 0.08);
		border-radius: 14px;
		padding: 12px 18px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		flex-wrap: wrap;
	}

	.toolbar-left {
		display: flex;
		align-items: center;
		gap: 12px;
		flex: 1;
		min-width: 280px;
	}

	.search-input-wrap {
		position: relative;
		display: flex;
		align-items: center;
		flex: 1;
		max-width: 380px;
	}

	:global(.search-icon) {
		position: absolute;
		left: 12px;
		color: #94a3b8;
		pointer-events: none;
	}

	.search-input {
		width: 100%;
		padding: 8px 34px 8px 36px;
		border: 1px solid #cbd5e1;
		border-radius: 9px;
		font-size: 13px;
		color: #0a1628;
		background: #f8fafc;
		outline: none;
		transition: all 0.15s ease;
	}

	.search-input:focus {
		background: #ffffff;
		border-color: #2563eb;
		box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
	}

	.clear-search-btn {
		position: absolute;
		right: 10px;
		background: none;
		border: none;
		color: #94a3b8;
		cursor: pointer;
		padding: 3px;
		border-radius: 4px;
	}

	.clear-search-btn:hover {
		color: #0a1628;
	}

	.status-filter-wrap select {
		padding: 8px 12px;
		border: 1px solid #cbd5e1;
		border-radius: 9px;
		font-size: 13px;
		color: #334155;
		background: #ffffff;
		outline: none;
		cursor: pointer;
	}

	.status-filter-wrap select:focus {
		border-color: #2563eb;
	}

	.item-count-text {
		font-size: 12.5px;
		color: #64748b;
	}

	/* Data Table Card */
	.data-table-card {
		background: #ffffff;
		border: 1px solid rgba(10, 22, 40, 0.08);
		border-radius: 14px;
		overflow: hidden;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
	}

	.table-responsive {
		width: 100%;
		overflow-x: auto;
	}

	.cms-table {
		width: 100%;
		border-collapse: collapse;
		text-align: left;
		font-size: 13.5px;
	}

	.cms-table th {
		background: #f8fafc;
		padding: 12px 16px;
		font-size: 11.5px;
		font-weight: 700;
		letter-spacing: 0.04em;
		color: #475569;
		border-bottom: 1px solid #e2e8f0;
		text-transform: uppercase;
	}

	.cms-table td {
		padding: 14px 16px;
		border-bottom: 1px solid #f1f5f9;
		vertical-align: middle;
	}

	.table-row:hover {
		background: #f8fafc;
	}

	.table-row.row-disabled {
		opacity: 0.65;
		background: #fafafa;
	}

	.th-order {
		width: 90px;
	}
	.th-name {
		width: 260px;
	}
	.th-count {
		width: 130px;
	}
	.th-status {
		width: 120px;
	}
	.th-actions {
		width: 110px;
	}

	.text-center {
		text-align: center;
	}
	.text-right {
		text-align: right;
	}

	/* Order Badge */
	.order-badge {
		display: inline-flex;
		align-items: center;
		gap: 8px;
	}

	.color-dot {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		flex-shrink: 0;
		border: 1px solid rgba(0, 0, 0, 0.1);
	}

	.order-num {
		font-weight: 700;
		color: #64748b;
		font-size: 12px;
	}

	/* Name & Slug */
	.cat-title-row {
		display: flex;
		align-items: center;
		gap: 8px;
		flex-wrap: wrap;
	}

	.cat-name-text {
		font-weight: 700;
		color: #0a1628;
		font-size: 14px;
	}

	.cat-badge-chip {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		font-size: 11px;
		font-weight: 700;
		padding: 2px 8px;
		border-radius: 9999px;
		background: color-mix(in srgb, var(--badge-color) 12%, #ffffff);
		color: var(--badge-color);
		border: 1px solid color-mix(in srgb, var(--badge-color) 30%, transparent);
	}

	.badge-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--badge-color);
	}

	.slug-row {
		margin-top: 4px;
		display: flex;
		align-items: center;
		gap: 4px;
	}

	.slug-label {
		font-size: 11px;
		color: #94a3b8;
		font-weight: 600;
	}

	.slug-code {
		font-size: 11px;
		color: #475569;
		background: #f1f5f9;
		padding: 2px 6px;
		border-radius: 5px;
		font-family: ui-monospace, SFMono-Regular, monospace;
	}

	/* Description */
	.desc-text {
		margin: 0;
		font-size: 13px;
		color: #475569;
		line-height: 1.45;
		max-width: 480px;
	}

	.desc-empty {
		font-size: 12px;
		color: #94a3b8;
		font-style: italic;
	}

	/* Project Count Pill */
	.project-count-pill {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		background: #f1f5f9;
		color: #334155;
		padding: 4px 10px;
		border-radius: 8px;
		font-size: 12px;
		font-weight: 700;
		text-decoration: none;
		transition: all 0.15s ease;
	}

	.project-count-pill:hover {
		background: #e2e8f0;
		color: #0a1628;
	}

	/* Status Toggle Button */
	.status-toggle-btn {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		padding: 4px 10px;
		border-radius: 9999px;
		font-size: 11.5px;
		font-weight: 700;
		border: 1px solid #cbd5e1;
		background: #f8fafc;
		color: #64748b;
		cursor: pointer;
		transition: all 0.15s ease;
	}

	.status-toggle-btn.active {
		background: #ecfdf5;
		color: #047857;
		border-color: #a7f3d0;
	}

	.status-toggle-btn:hover {
		transform: scale(1.02);
	}

	/* Action Buttons */
	.actions-group {
		display: inline-flex;
		align-items: center;
		gap: 6px;
	}

	.action-btn {
		width: 32px;
		height: 32px;
		border-radius: 8px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border: 1px solid #e2e8f0;
		background: #ffffff;
		color: #64748b;
		cursor: pointer;
		transition: all 0.15s ease;
	}

	.action-btn.edit-btn:hover {
		background: #eff6ff;
		color: #2563eb;
		border-color: #bfdbfe;
	}

	.action-btn.delete-btn:hover {
		background: #fef2f2;
		color: #ef4444;
		border-color: #fecaca;
	}

	/* Empty State */
	.empty-state {
		padding: 60px 24px;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.empty-icon-box {
		width: 56px;
		height: 56px;
		border-radius: 16px;
		background: #f1f5f9;
		color: #64748b;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 14px;
	}

	.empty-title {
		font-size: 17px;
		font-weight: 700;
		color: #0a1628;
		margin: 0 0 6px;
	}

	.empty-desc {
		font-size: 13.5px;
		color: #64748b;
		max-width: 420px;
		margin: 0 0 18px;
		line-height: 1.5;
	}

	/* ==================== MODALS ==================== */
	.modal-backdrop {
		position: fixed;
		inset: 0;
		background: rgba(10, 22, 40, 0.6);
		backdrop-filter: blur(4px);
		z-index: 9999;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 20px;
	}

	.modal-box {
		background: #ffffff;
		border-radius: 18px;
		max-width: 620px;
		width: 100%;
		max-height: 90vh;
		overflow-y: auto;
		box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.3);
		border: 1px solid rgba(255, 255, 255, 0.1);
		animation: modalZoom 0.2s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.modal-box.modal-box-sm {
		max-width: 480px;
	}

	@keyframes modalZoom {
		from {
			opacity: 0;
			transform: scale(0.96);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}

	.modal-header {
		padding: 20px 24px;
		border-bottom: 1px solid #e2e8f0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
	}

	.modal-header-left {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.modal-icon-badge {
		width: 38px;
		height: 38px;
		border-radius: 10px;
		background: #eff6ff;
		color: #2563eb;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.modal-icon-badge.danger {
		background: #fef2f2;
		color: #ef4444;
	}

	.modal-icon-badge.warning {
		background: #fffbeb;
		color: #f59e0b;
	}

	.modal-title {
		font-size: 18px;
		font-weight: 800;
		color: #0a1628;
		margin: 0;
		letter-spacing: -0.01em;
	}

	.modal-sub {
		font-size: 12.5px;
		color: #64748b;
		margin: 2px 0 0;
	}

	.modal-close-btn {
		width: 32px;
		height: 32px;
		border-radius: 8px;
		border: none;
		background: #f1f5f9;
		color: #64748b;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.15s ease;
	}

	.modal-close-btn:hover {
		background: #e2e8f0;
		color: #0a1628;
	}

	.modal-form {
		padding: 22px 24px;
		display: flex;
		flex-direction: column;
		gap: 18px;
	}

	.form-grid-2 {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 14px;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.field-label {
		font-size: 12.5px;
		font-weight: 700;
		color: #334155;
	}

	.input-text,
	.input-textarea {
		width: 100%;
		padding: 9px 12px;
		border: 1px solid #cbd5e1;
		border-radius: 9px;
		font-size: 13.5px;
		color: #0a1628;
		background: #ffffff;
		outline: none;
		transition: all 0.15s ease;
		box-sizing: border-box;
		font-family: inherit;
	}

	.input-text:focus,
	.input-textarea:focus {
		border-color: #2563eb;
		box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
	}

	.slug-input-wrapper {
		display: flex;
		align-items: center;
		border: 1px solid #cbd5e1;
		border-radius: 9px;
		overflow: hidden;
		background: #f8fafc;
	}

	.slug-prefix {
		font-size: 12px;
		color: #64748b;
		padding: 0 8px 0 12px;
		font-family: ui-monospace, monospace;
		user-select: none;
	}

	.slug-input {
		border: none;
		background: #ffffff;
		border-radius: 0;
	}

	.field-hint {
		font-size: 11px;
		color: #64748b;
		margin-top: 3px;
	}

	/* Color Picker Row */
	.color-picker-row {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.color-preview-box {
		width: 38px;
		height: 38px;
		border-radius: 8px;
		border: 1px solid rgba(10, 22, 40, 0.15);
		position: relative;
		overflow: hidden;
		flex-shrink: 0;
		cursor: pointer;
	}

	.native-color-input {
		position: absolute;
		top: -10px;
		left: -10px;
		width: 60px;
		height: 60px;
		cursor: pointer;
		opacity: 0;
	}

	.hex-input {
		flex: 1;
		font-family: ui-monospace, monospace;
		font-size: 13px;
	}

	.color-preset-pills {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-top: 8px;
		flex-wrap: wrap;
	}

	.preset-dot {
		width: 22px;
		height: 22px;
		border-radius: 50%;
		border: 2px solid #ffffff;
		box-shadow: 0 0 0 1px rgba(10, 22, 40, 0.15);
		cursor: pointer;
		transition: transform 0.15s ease;
	}

	.preset-dot:hover {
		transform: scale(1.15);
	}

	.preset-dot.active {
		box-shadow: 0 0 0 2px #2563eb;
		transform: scale(1.1);
	}

	/* Checkbox */
	.form-checkbox-group {
		background: #f8fafc;
		border: 1px solid #e2e8f0;
		padding: 12px 14px;
		border-radius: 10px;
	}

	.custom-checkbox-label {
		display: flex;
		align-items: flex-start;
		gap: 10px;
		cursor: pointer;
	}

	.custom-checkbox {
		margin-top: 3px;
		width: 16px;
		height: 16px;
		accent-color: #2563eb;
	}

	.checkbox-text-wrap {
		display: flex;
		flex-direction: column;
	}

	.checkbox-title {
		font-size: 13px;
		font-weight: 700;
		color: #0a1628;
	}

	.checkbox-desc {
		font-size: 11.5px;
		color: #64748b;
		margin-top: 2px;
		line-height: 1.4;
	}

	/* Live preview badge box */
	.preview-badge-box {
		padding: 12px 14px;
		background: #ffffff;
		border: 1px dashed #cbd5e1;
		border-radius: 10px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
	}

	.preview-box-label {
		font-size: 12px;
		font-weight: 600;
		color: #64748b;
	}

	.preview-pill {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		font-size: 12px;
		font-weight: 700;
		padding: 4px 12px;
		border-radius: 9999px;
		background: color-mix(in srgb, var(--preview-color) 12%, #ffffff);
		color: var(--preview-color);
		border: 1px solid color-mix(in srgb, var(--preview-color) 35%, transparent);
	}

	.preview-dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: var(--preview-color);
	}

	.preview-text {
		letter-spacing: 0.01em;
	}

	.modal-actions {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: 10px;
		padding-top: 6px;
	}

	/* Delete modal styles */
	.delete-modal-body {
		padding: 20px 24px;
		display: flex;
		flex-direction: column;
		gap: 14px;
	}

	.delete-warning-text {
		font-size: 14px;
		color: #334155;
		margin: 0;
		line-height: 1.5;
	}

	.alert-box-warning {
		background: #fffbeb;
		border: 1px solid #fde68a;
		border-radius: 10px;
		padding: 12px 14px;
		display: flex;
		gap: 10px;
		font-size: 12.5px;
		color: #92400e;
		line-height: 1.45;
	}

	:global(.alert-icon) {
		color: #d97706;
		flex-shrink: 0;
		margin-top: 2px;
	}

	@media (max-width: 900px) {
		.stats-row {
			grid-template-columns: repeat(2, 1fr);
		}
		.form-grid-2 {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 600px) {
		.kategori-admin-container {
			padding: 16px 16px 48px;
		}
		.stats-row {
			grid-template-columns: 1fr;
		}
		.page-header {
			flex-direction: column;
			align-items: stretch;
		}
		.header-actions {
			justify-content: stretch;
		}
		.header-actions button {
			flex: 1;
		}
	}
</style>
