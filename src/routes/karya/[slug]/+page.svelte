<script lang="ts">
	import type { PageData } from './$types';
	import type { Project } from '$lib/types/portfolio';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { ArrowLeft, ExternalLink, X, Maximize2 } from 'lucide-svelte';

	let { data }: { data: PageData } = $props();

	let project = $derived(data.project as Project);

	// Lightbox state
	let activeLightboxImage: string | null = $state(null);
	function openLightbox(img: string) { activeLightboxImage = img; }
	function closeLightbox() { activeLightboxImage = null; }
</script>

<svelte:head>
	<title>{project.title} — Muhammad Bagiz</title>
	<meta name="description" content={project.summary} />
</svelte:head>

<Navbar />

<main style="padding-top: 100px; min-height: 100vh; background: var(--bg-dark);">
	<div style="max-width:900px;margin:0 auto;padding:40px 24px 80px">

		<!-- Back nav -->
		<a
			href="/"
			style="display:inline-flex;align-items:center;gap:8px;color:var(--text-body);font-size:14px;margin-bottom:40px;text-decoration:none;transition:color .3s"
			onmouseenter={(e) => (e.currentTarget as HTMLElement).style.color = 'var(--text-white)'}
			onmouseleave={(e) => (e.currentTarget as HTMLElement).style.color = 'var(--text-body)'}
		>
			<ArrowLeft size={16} /> Kembali ke Portofolio
		</a>

		<!-- Hero banner -->
		<div style="border-radius:20px;overflow:hidden;margin-bottom:48px;border:1px solid rgba(15,30,56,0.08);box-shadow:0 10px 30px rgba(15,30,56,0.05)">
			<img
				src={project.thumbnail || 'https://images.unsplash.com/photo-1555421689-491a97ff2040?w=900&q=80'}
				alt={project.title}
				style="width:100%;aspect-ratio:16/7;object-fit:cover"
			/>
		</div>

		<!-- Header info -->
		<div style="margin-bottom:40px">
			<span style="font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--accent)">{project.category}</span>
			<h1 style="font-size:clamp(28px,5vw,48px);font-weight:800;color:var(--text-white);margin:12px 0 16px">{project.title}</h1>
			<p style="font-size:16px;line-height:28px;color:var(--text-body);max-width:700px">{project.summary}</p>
		</div>

		<!-- Meta row -->
		<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:16px;margin-bottom:48px">
			<div style="background:#ffffff;border:1px solid rgba(15,30,56,0.08);box-shadow:0 2px 10px rgba(15,30,56,0.03);border-radius:14px;padding:20px">
				<div style="font-size:11px;color:var(--text-light);font-weight:700;letter-spacing:1px;text-transform:uppercase;margin-bottom:6px">Role</div>
				<div style="font-size:15px;color:var(--text-white);font-weight:700">{project.role}</div>
			</div>
			<div style="background:#ffffff;border:1px solid rgba(15,30,56,0.08);box-shadow:0 2px 10px rgba(15,30,56,0.03);border-radius:14px;padding:20px">
				<div style="font-size:11px;color:var(--text-light);font-weight:700;letter-spacing:1px;text-transform:uppercase;margin-bottom:6px">Durasi</div>
				<div style="font-size:15px;color:var(--text-white);font-weight:700">{project.duration}</div>
			</div>
			<div style="background:#ffffff;border:1px solid rgba(15,30,56,0.08);box-shadow:0 2px 10px rgba(15,30,56,0.03);border-radius:14px;padding:20px">
				<div style="font-size:11px;color:var(--text-light);font-weight:700;letter-spacing:1px;text-transform:uppercase;margin-bottom:6px">Kategori</div>
				<div style="font-size:15px;color:var(--text-white);font-weight:700">{project.category}</div>
			</div>
			{#if project.publishedAt}
				<div style="background:#ffffff;border:1px solid rgba(15,30,56,0.08);box-shadow:0 2px 10px rgba(15,30,56,0.03);border-radius:14px;padding:20px">
					<div style="font-size:11px;color:var(--text-light);font-weight:700;letter-spacing:1px;text-transform:uppercase;margin-bottom:6px">Dipublikasikan</div>
					<div style="font-size:15px;color:var(--text-white);font-weight:700">{new Date(project.publishedAt).getFullYear()}</div>
				</div>
			{/if}
		</div>

		<!-- Tech stack / tools -->
		{#if project.tools?.length}
			<div style="margin-bottom:40px">
				<h2 style="font-size:20px;font-weight:700;color:var(--text-white);margin-bottom:16px">Tools & Tech Stack</h2>
				<div style="display:flex;flex-wrap:wrap;gap:10px">
					{#each project.tools as tech}
						<span style="font-size:13px;font-weight:600;padding:7px 16px;border-radius:8px;background:#f1f5f9;border:1px solid rgba(15,30,56,0.08);color:#334155">{tech}</span>
					{/each}
				</div>
			</div>
		{/if}

		<!-- Case study -->
		{#if project.caseStudy}
			<div style="margin-bottom:40px">
				<h2 style="font-size:20px;font-weight:700;color:var(--text-white);margin-bottom:20px">Studi Kasus</h2>
				<div style="display:grid;gap:20px">
					{#if project.caseStudy.background}
						<div style="padding:24px;background:#ffffff;border:1px solid rgba(15,30,56,0.08);box-shadow:0 2px 10px rgba(15,30,56,0.03);border-radius:14px">
							<h3 style="font-size:15px;font-weight:700;color:var(--text-white);margin-bottom:10px">Latar Belakang Proyek</h3>
							<p style="font-size:14px;line-height:26px;color:var(--text-body)">{project.caseStudy.background}</p>
						</div>
					{/if}
					{#if project.caseStudy.problem}
						<div style="padding:24px;background:#ffffff;border:1px solid rgba(15,30,56,0.08);box-shadow:0 2px 10px rgba(15,30,56,0.03);border-radius:14px">
							<h3 style="font-size:15px;font-weight:700;color:var(--text-white);margin-bottom:10px">Tantangan & Masalah Utama</h3>
							<p style="font-size:14px;line-height:26px;color:var(--text-body)">{project.caseStudy.problem}</p>
						</div>
					{/if}
					{#if project.caseStudy.solution}
						<div style="padding:24px;background:#ffffff;border:1px solid rgba(15,30,56,0.08);box-shadow:0 2px 10px rgba(15,30,56,0.03);border-radius:14px">
							<h3 style="font-size:15px;font-weight:700;color:var(--text-white);margin-bottom:10px">Solusi & Strategi Desain</h3>
							<p style="font-size:14px;line-height:26px;color:var(--text-body)">{project.caseStudy.solution}</p>
						</div>
					{/if}
					{#if project.caseStudy.process?.length}
						<div style="padding:24px;background:#ffffff;border:1px solid rgba(15,30,56,0.08);box-shadow:0 2px 10px rgba(15,30,56,0.03);border-radius:14px">
							<h3 style="font-size:15px;font-weight:700;color:var(--text-white);margin-bottom:14px">Tahapan Eksekusi</h3>
							<ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:12px">
								{#each project.caseStudy.process as step, sIdx}
									<li style="display:flex;align-items:flex-start;gap:12px;font-size:14px;line-height:24px;color:var(--text-body)">
										<span style="display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:6px;background:var(--accent);color:#ffffff;font-size:12px;font-weight:800;flex-shrink:0;margin-top:1px">{sIdx + 1}</span>
										<span>{step}</span>
									</li>
								{/each}
							</ul>
						</div>
					{/if}
					{#if project.caseStudy.impact}
						<div style="padding:24px;background:#ffffff;border:1px solid rgba(15,30,56,0.08);box-shadow:0 2px 10px rgba(15,30,56,0.03);border-radius:14px">
							<h3 style="font-size:15px;font-weight:700;color:var(--text-white);margin-bottom:10px">Dampak & Hasil Akhir</h3>
							<p style="font-size:14px;line-height:26px;color:var(--text-body)">{project.caseStudy.impact}</p>
						</div>
					{/if}
				</div>
			</div>
		{/if}

		<!-- Metrics -->
		{#if project.metrics?.length}
			<div style="margin-bottom:40px">
				<h2 style="font-size:20px;font-weight:700;color:var(--text-white);margin-bottom:20px">Hasil & Metrik Utama</h2>
				<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:16px">
					{#each project.metrics as metric}
						<div style="padding:24px;background:#ffffff;border:1px solid rgba(15,30,56,0.08);box-shadow:0 2px 10px rgba(15,30,56,0.03);border-radius:16px;text-align:center">
							<div style="font-size:28px;font-weight:800;color:var(--text-white);margin-bottom:6px;font-family:'Outfit',sans-serif">{metric.value}</div>
							<div style="font-size:13px;font-weight:700;color:#1e3a6a;margin-bottom:4px">{metric.label}</div>
							{#if metric.change}
								<div style="font-size:12px;color:var(--text-body)">{metric.change}</div>
							{/if}
						</div>
					{/each}
				</div>
			</div>
		{/if}

		<!-- Image gallery -->
		{#if project.images?.length}
			<div style="margin-bottom:48px">
				<h2 style="font-size:20px;font-weight:700;color:var(--text-white);margin-bottom:20px">Galeri & Tampilan Antarmuka</h2>
				<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:16px">
					{#each project.images as img}
						<button
							style="border-radius:14px;overflow:hidden;border:1px solid rgba(15,30,56,0.08);box-shadow:0 4px 15px rgba(15,30,56,0.04);padding:0;cursor:pointer;position:relative;aspect-ratio:16/10;display:block;width:100%;background:#f1f5f9"
							onclick={() => openLightbox(img)}
							title="Klik untuk memperbesar gambar"
						>
							<img src={img} alt="Tangkapan layar proyek" style="width:100%;height:100%;object-fit:cover;transition:transform .4s ease" onmouseenter={(e) => (e.currentTarget as HTMLElement).style.transform = 'scale(1.04)'} onmouseleave={(e) => (e.currentTarget as HTMLElement).style.transform = 'scale(1)'} />
						</button>
					{/each}
				</div>
			</div>
		{/if}

		<!-- External links -->
		{#if project.links && Object.values(project.links).some(Boolean)}
			<div style="padding:32px;background:#ffffff;border:1px solid rgba(15,30,56,0.08);box-shadow:0 4px 20px rgba(15,30,56,0.04);border-radius:18px">
				<h2 style="font-size:18px;font-weight:700;color:var(--text-white);margin-bottom:18px">Tautan & Dokumentasi Proyek</h2>
				<div style="display:flex;flex-wrap:wrap;gap:12px">
					{#if project.links.figma}
						<a
							href={project.links.figma}
							target="_blank"
							rel="noopener noreferrer"
							style="display:inline-flex;align-items:center;gap:8px;padding:10px 20px;border-radius:10px;background:#f1f5f9;border:1px solid rgba(15,30,56,0.1);color:#0a1628;font-size:13px;font-weight:600;text-decoration:none;transition:all .2s"
							onmouseenter={(e) => (e.currentTarget as HTMLElement).style.background = '#e2e8f0'}
							onmouseleave={(e) => (e.currentTarget as HTMLElement).style.background = '#f1f5f9'}
						>
							Figma Prototype <ExternalLink size={14} />
						</a>
					{/if}
					{#if project.links.liveDemo}
						<a
							href={project.links.liveDemo}
							target="_blank"
							rel="noopener noreferrer"
							style="display:inline-flex;align-items:center;gap:8px;padding:10px 20px;border-radius:10px;background:var(--accent);color:#ffffff;font-size:13px;font-weight:700;text-decoration:none;transition:background .2s;box-shadow:0 4px 15px rgba(15,30,56,0.15)"
							onmouseenter={(e) => (e.currentTarget as HTMLElement).style.background = 'var(--accent-hover)'}
							onmouseleave={(e) => (e.currentTarget as HTMLElement).style.background = 'var(--accent)'}
						>
							Live Application <ExternalLink size={14} />
						</a>
					{/if}
					{#if project.links.pitchDeck}
						<a
							href={project.links.pitchDeck}
							target="_blank"
							rel="noopener noreferrer"
							style="display:inline-flex;align-items:center;gap:8px;padding:10px 20px;border-radius:10px;background:#f1f5f9;border:1px solid rgba(15,30,56,0.1);color:#0a1628;font-size:13px;font-weight:600;text-decoration:none;transition:all .2s"
							onmouseenter={(e) => (e.currentTarget as HTMLElement).style.background = '#e2e8f0'}
							onmouseleave={(e) => (e.currentTarget as HTMLElement).style.background = '#f1f5f9'}
						>
							Pitch Deck & Dokumen <ExternalLink size={14} />
						</a>
					{/if}
					{#if project.links.github}
						<a
							href={project.links.github}
							target="_blank"
							rel="noopener noreferrer"
							style="display:inline-flex;align-items:center;gap:8px;padding:10px 20px;border-radius:10px;background:#f1f5f9;border:1px solid rgba(15,30,56,0.1);color:#0a1628;font-size:13px;font-weight:600;text-decoration:none;transition:all .2s"
							onmouseenter={(e) => (e.currentTarget as HTMLElement).style.background = '#e2e8f0'}
							onmouseleave={(e) => (e.currentTarget as HTMLElement).style.background = '#f1f5f9'}
						>
							GitHub Repository <ExternalLink size={14} />
						</a>
					{/if}
				</div>
			</div>
		{/if}

	</div>
</main>

<!-- Lightbox Modal -->
{#if activeLightboxImage}
	<div
		style="position:fixed;inset:0;background:rgba(0,0,0,0.92);backdrop-filter:blur(10px);z-index:99999;display:flex;align-items:center;justify-content:center;padding:24px"
		role="dialog"
		aria-modal="true"
		tabindex="-1"
	>
		<button
			type="button"
			style="position:absolute;inset:0;background:transparent;border:none;cursor:pointer"
			onclick={closeLightbox}
			aria-label="Tutup pratinjau gambar"
		></button>
		<button
			type="button"
			style="position:absolute;top:24px;right:24px;background:rgba(255,255,255,0.1);border:none;color:white;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:background .2s;z-index:1"
			onclick={closeLightbox}
			aria-label="Tutup pratinjau gambar"
		>
			<X size={20} />
		</button>
		<img
			src={activeLightboxImage}
			alt="Pratinjau karya"
			style="max-width:90vw;max-height:85vh;object-fit:contain;border-radius:12px;box-shadow:0 25px 60px rgba(0,0,0,0.8);position:relative;z-index:1"
		/>
	</div>
{/if}

<Footer />
