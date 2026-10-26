import type { Project, Skill, VolunteerExperience, UserProfile, CategoryItem } from '#lib/types/portfolio';

export const mockCategories: CategoryItem[] = [
	{
		id: 'cat-desain',
		name: 'Desain',
		slug: 'desain',
		description: 'UI/UX, Design System Skalabel, Arsitektur Antarmuka & Aksesibilitas WCAG',
		color: '#2563eb',
		displayOrder: 1,
		isActive: true,
		createdAt: '2026-01-01T00:00:00Z'
	},
	{
		id: 'cat-bisnis',
		name: 'Bisnis',
		slug: 'bisnis',
		description: 'Strategi Produk, Validasi Pasar, Unit Economics, Model Monetisasi & SaaS',
		color: '#10b981',
		displayOrder: 2,
		isActive: true,
		createdAt: '2026-01-01T00:00:00Z'
	},
	{
		id: 'cat-hybrid',
		name: 'Hybrid',
		slug: 'hybrid',
		description: 'Sinergi Desain Antarmuka, Optimasi Konversi, Gamifikasi & Pertumbuhan Komersial',
		color: '#8b5cf6',
		displayOrder: 3,
		isActive: true,
		createdAt: '2026-01-01T00:00:00Z'
	}
];

export const mockProfile: UserProfile = {
	name: 'Muhammad Bagiz',
	tagline: 'Bridging Design Aesthetics with Business Impact',
	headline: 'Product Designer & Business Strategist',
	bio: 'Menggabungkan keahlian desain antarmuka berbasis empati pengguna dengan analisis strategi bisnis yang terukur untuk melahirkan produk digital bernilai tinggi.',
	aboutNarrative: [
		'Saya adalah seorang praktisi hibrida yang percaya bahwa desain yang hebat bukan hanya memanjakan mata, melainkan juga menggerakkan jarum metrik bisnis nyata.',
		'Dengan latar belakang ganda di bidang Product Design (UI/UX) dan Business Strategy, saya mendampingi startup hingga perusahaan mapan dalam merumuskan strategi produk dari nol: mulai dari riset pasar, pemodelan finansial, perancangan prototipe interaktif, hingga implementasi design system berskala besar.',
		'Fokus utama saya adalah menciptakan produk yang intuitif, scalable, dan memberikan ROI berkelanjutan bagi stakeholders.'
	],
	avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
	location: 'Jakarta, Indonesia (Willing to relocate / Remote)',
	availability: 'Tersedia untuk Proyek Baru & Kolaborasi Strategis',
	resumeUrl: '/cv-muhammad-bagiz.pdf',
	stats: [
		{ label: 'Tahun Pengalaman', value: '4+', description: 'Desain Produk & Riset Bisnis' },
		{ label: 'Proyek Selesai', value: '25+', description: 'Aplikasi Web & Mobile' },
		{ label: 'Rata-rata Peningkatan Metrik', value: '+38%', description: 'Konversi & Efisiensi Pengguna' },
		{ label: 'Total Pendanaan Diakuisisi', value: '$2.5M+', description: 'Dukungan Riset & Pitch Deck' }
	],
	socialLinks: {
		email: 'bagiz.design@gmail.com',
		linkedin: 'https://linkedin.com/in/bagiz-product',
		behance: 'https://behance.net/bagizdesign',
		dribbble: 'https://dribbble.com/bagiz',
		github: 'https://github.com/bagiz-dev',
		instagram: 'https://instagram.com/bagiz.design'
	},
	education: [
		{
			degree: 'Sarjana Manajemen Bisnis & Teknologi Informasi',
			institution: 'Universitas Indonesia',
			period: '2019 - 2023',
			achievements: [
				'Lulusan dengan predikat Pujian (Cum Laude - IPK 3.84/4.00)',
				'Juara 1 National Business Case Competition 2022',
				'Ketua Divisi Riset & Strategi Inkubator Bisnis Mahasiswa'
			]
		},
		{
			degree: 'Certified Professional Product Management & UX Architecture',
			institution: 'Interaction Design Foundation (IxDF) & Reforge',
			period: '2023 - 2024',
			achievements: [
				'Spesialisasi: Enterprise Design Systems & Product Monetization Strategy'
			]
		}
	]
};

export const mockProjects: Project[] = [
	{
		id: 'proj-001',
		slug: 'nexapay-fintech-redesign',
		title: 'NexaPay - Redesign Aplikasi Dompet Digital & Strategi Retensi Pengguna',
		subtitle: 'Revitalisasi Alur Transaksi & Sistem Gamifikasi Finansial',
		category: 'Hybrid',
		summary: 'Mendesain ulang alur transaksi dompet digital dan merancang strategi loyalti bertingkat yang meningkatkan konversi pengguna baru sebesar 42% dan retensi bulanan hingga 2.8x.',
		thumbnail: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
		images: [
			'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
			'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
			'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80'
		],
		isFeatured: true,
		isNew: true,
		displayOrder: 1,
		isPublished: true,
		publishedAt: '2026-03-15T08:00:00Z',
		role: 'Lead Product Designer & Growth Analyst',
		duration: '4 Bulan (Nov 2025 - Feb 2026)',
		tools: ['Figma', 'Framer', 'Mixpanel', 'SQL', 'FigJam'],
		metrics: [
			{ label: 'Konversi Onboarding', value: '+42%', change: 'MoM pasca rilis' },
			{ label: 'Monthly Active Users', value: '2.8x', change: 'dalam kuartal pertama' },
			{ label: 'Penurunan Friction Drop-off', value: '-35%', change: 'pada checkout multi-rekening' },
			{ label: 'Rating App Store', value: '4.8/5', change: 'dari 15.000+ ulasan' }
		],
		caseStudy: {
			background: 'NexaPay menghadapi churn tinggi saat proses registrasi identitas (KYC) dan transaksi transfer antar bank yang lambat. Pengguna generasi muda merasa tampilan terlalu kaku dan tidak memotivasi kebiasaan menabung.',
			problem: '64% pengguna baru terhenti di tahapan verifikasi KYC karena instruksi membingungkan, serta rasio transaksi berulang (repeat rate) tertahan di angka 18%.',
			solution: 'Merancang alur verifikasi interaktif berbasis micro-steps dengan validasi waktu nyata, memadukannya dengan widget "Smart Budget Goals" yang memberikan cashback instan.',
			process: [
				'Riset kualitatif dengan 24 pengguna aktif dompet digital lintas demografi usia',
				'Pemetaan User Journey & Drop-off Funnel Analysis menggunakan data Mixpanel',
				'Penyusunan High-Fidelity Interactive Prototype & Pengujian Usability (SUS Score: 86.5)',
				'Penyusunan Unit Economics & Model Finansial insentif program referral'
			],
			impact: 'Pertumbuhan eksponensial dalam volume transaksi harian (GTV) hingga Rp 48 Miliar dalam 90 hari pertama pasca rilis nasional.'
		},
		links: {
			figma: 'https://figma.com/@bagiz/nexapay-case-study',
			liveDemo: 'https://nexapay-showcase.vercel.app',
			pitchDeck: 'https://speakerdeck.com/bagiz/nexapay-growth-deck'
		}
	},
	{
		id: 'proj-002',
		slug: 'aura-commerce-design-system',
		title: 'Aura Commerce - Design System Skalabel & Pengalaman Belanja Omnichannel',
		subtitle: 'Fondasi 120+ Komponen Dinamis untuk Brand Fashion Skala Internasional',
		category: 'Desain',
		summary: 'Membangun arsitektur Design System multi-brand dari awal dengan dokumentasi token terstandarisasi, memangkas waktu pengiriman fitur engineering sebesar 55% dan menekan cart abandonment hingga 28%.',
		thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
		images: [
			'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
			'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80'
		],
		isFeatured: true,
		isNew: false,
		displayOrder: 2,
		isPublished: true,
		publishedAt: '2026-01-20T10:00:00Z',
		role: 'Design System Architect & Senior UI Designer',
		duration: '5 Bulan',
		tools: ['Figma Tokens', 'Storybook', 'Tailwind CSS', 'Zeroheight'],
		metrics: [
			{ label: 'Efisiensi Desain & Dev', value: '55%', change: 'pengurangan cycle sprint' },
			{ label: 'Cart Abandonment', value: '-28%', change: 'redesign 1-page checkout' },
			{ label: 'Konsistensi Aset UI', value: '99.4%', change: 'audit menyeluruh' }
		],
		caseStudy: {
			background: 'Aura Commerce mengelola 3 sub-brand ritel berbeda namun menghadapi fragmentasi desain UI yang parah dan keterlambatan rilis frontend.',
			problem: 'Tiap tim pengembangan menulis komponen tombol dan formulir yang redundan, menghasilkan inkonsistensi visual dan beban teknis yang berat.',
			solution: 'Mengembangkan sistem token semantik berbasis Tailwind CSS dan Figma Variables yang mendukung otomatisasi dark mode dan multi-theme switching.',
			process: [
				'Audit 400+ komponen visual di seluruh web dan aplikasi mobile',
				'Mendefinisikan hierarki token: Global, Alias, dan Semantic Component Tokens',
				'Sinkronisasi Figma Variables dengan repositori GitHub via plugin otomatis',
				'Workshop pelatihan internal untuk 18 desainer dan developer lintas divisi'
			],
			impact: 'Waktu dari konsep UI ke staging berkurang dari rata-rata 3 minggu menjadi hanya 4 hari kerja.'
		},
		links: {
			figma: 'https://figma.com/@bagiz/aura-ds',
			liveDemo: 'https://aura-design-system.dev'
		}
	},
	{
		id: 'proj-003',
		slug: 'velo-logistics-b2b-optimization',
		title: 'Velo Logistics - Optimasi Armada Distribusi & Model Finansial SaaS',
		subtitle: 'Transformasi Digital Efisiensi Rute Logistik B2B Antar Kota',
		category: 'Bisnis',
		summary: 'Merancang analisis model bisnis berlangganan (SaaS), kalkulasi unit economics penghematan bahan bakar armada, dan memvalidasi go-to-market strategy yang menghasilkan $1.4M ARR.',
		thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
		images: [
			'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
			'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1200&q=80'
		],
		isFeatured: true,
		isNew: false,
		displayOrder: 3,
		isPublished: true,
		publishedAt: '2025-11-10T14:30:00Z',
		role: 'Lead Business Strategist & Product Operations',
		duration: '6 Bulan',
		tools: ['Excel Financial Modeling', 'Tableau', 'Notion', 'Python'],
		metrics: [
			{ label: 'Penghematan Bahan Bakar', value: '-19%', change: 'algoritma routing baru' },
			{ label: 'Annual Recurring Revenue', value: '$1.4M', change: 'dalam 12 bulan' },
			{ label: 'Net Promoter Score', value: '+74', change: 'kategori enterprise fleet' }
		],
		caseStudy: {
			background: 'Penyedia logistik tradisional mengalami lonjakan biaya bahan bakar dan keterlambatan pengiriman paket rantai dingin (cold chain logistics).',
			problem: 'Harga layanan tidak mencerminkan volatilitas rute aktual dan armada sering mengalami perjalanan pulang kosong (empty miles) hingga 34%.',
			solution: 'Membangun kalkulator dinamis margin profit rute, menyusun struktur langganan SaaS bertingkat, dan menyusun dashboard metrik utilisasi armada.',
			process: [
				'Studi lapangan bersama 35 manajer gudang dan supir ekspedisi',
				'Penyusunan model finansial estimasi Break-Even Point (BEP) dan payback period',
				'Perancangan struktur harga bertingkat: Starter, Professional, dan Custom Enterprise',
				'Penyusunan materi presentasi Pitch B2B untuk klien korporasi manufaktur'
			],
			impact: 'Membantu Velo memenangkan kontrak jangka panjang dengan 8 perusahaan FMCG terkemuka di Indonesia.'
		},
		links: {
			pitchDeck: 'https://speakerdeck.com/bagiz/velo-logistics-strategy',
			liveDemo: 'https://velo-demo.internal-analytics.com'
		}
	},
	{
		id: 'proj-004',
		slug: 'fintrack-pro-umkm-saas',
		title: 'FinTrack Pro - Dashboard Manajemen Kas UMKM & Strategi Monetisasi',
		subtitle: 'SaaS Pembukuan Finansial Cerdas dengan Rekonsiliasi Otomatis',
		category: 'Hybrid',
		summary: 'Mengombinasikan UX dashboard akuntansi yang mudah dipahami pemilik bisnis pemula dengan strategi freemium to paid tier yang berhasil mengonversi 54% pengguna aktif.',
		thumbnail: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
		images: [
			'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80'
		],
		isFeatured: false,
		isNew: true,
		displayOrder: 4,
		isPublished: true,
		publishedAt: '2026-02-28T09:15:00Z',
		role: 'Product Designer & Pricing Strategist',
		duration: '3 Bulan',
		tools: ['Figma', 'Supabase', 'Chart.js', 'Google Analytics'],
		metrics: [
			{ label: 'UMKM Onboarded', value: '12,500+', change: 'dalam 60 hari' },
			{ label: 'Upgrade ke Pro Tier', value: '+54%', change: 'free trial conversion' },
			{ label: 'Kepuasan Pengguna (CSAT)', value: '4.9/5', change: 'fitur invoice cepat' }
		],
		caseStudy: {
			background: 'Ratusan ribu pemilik UMKM kesulitan melacak arus kas harian dan kerap mencampur rekening pribadi dengan operasional toko.',
			problem: 'Software akuntansi konvensional terlalu rumit dipahami oleh pedagang yang tidak memiliki latar belakang akuntansi.',
			solution: 'Merancang antarmuka kartu arus kas sederhana dengan auto-categorization berbasis scan nota (OCR) dan pengingat piutang otomatis via WhatsApp.',
			process: [
				'Wawancara mendalam dengan 40 pemilik warung, kafe, dan toko online',
				'Iterasi cepat prototype interaktif di Figma dan pengujian di lapangan',
				'Perancangan struktur harga langganan: Free tier (dasar) vs Pro tier (laporan pajak & OCR)',
				'Penyusunan onboarding tour interaktif tanpa friksi pendaftaran berbelit'
			],
			impact: 'Tercapai 12.500+ UMKM terdaftar aktif dengan retention rate 30 hari sebesar 72%.'
		},
		links: {
			figma: 'https://figma.com/@bagiz/fintrack',
			liveDemo: 'https://fintrack-pro.vercel.app'
		}
	},
	{
		id: 'proj-005',
		slug: 'lumina-health-telemedicine',
		title: 'Lumina Health - Portal Pasien & Desain Antarmuka Inklusif Ramah Lansia',
		subtitle: 'Standarisasi Aksesibilitas WCAG AAA untuk Platform Layanan Kesehatan',
		category: 'Desain',
		summary: 'Riset pengalaman pengguna dan perancangan portal konsultasi medis dengan kontras tinggi, navigasi suara, dan ukuran target sentuh ramah bagi pengguna lanjut usia.',
		thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
		images: [
			'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80'
		],
		isFeatured: false,
		isNew: false,
		displayOrder: 5,
		isPublished: true,
		publishedAt: '2025-09-14T11:00:00Z',
		role: 'UX Researcher & Accessibility Specialist',
		duration: '4 Bulan',
		tools: ['Figma', 'Maze', 'UserTesting', 'Stark Accessibility'],
		metrics: [
			{ label: 'Tingkat Kepatuhan WCAG', value: 'AAA', change: 'standar internasional' },
			{ label: 'Kemudahan Pengguna Lansia', value: '+65%', change: 'penyelesaian janji dokter' },
			{ label: 'Penurunan Komplain CS', value: '-40%', change: 'terkait alur tebus obat' }
		],
		caseStudy: {
			background: 'Pasien rawat jalan lanjut usia sering bingung menjadwalkan pemeriksaan berkala dan memesan ulang obat resep secara mandiri.',
			problem: 'Ukuran huruf kecil, hierarki tombol yang bertumpuk, dan istilah medis yang membingungkan menyebabkan tingkat kegagalan tinggi.',
			solution: 'Merancang antarmuka bersih dengan mode kontras tinggi bawaan, tombol sentuh berukuran minimal 48x48dp, dan konfirmasi bahasa sederhana.',
			process: [
				'Sesi observasi langsung dengan 15 pasien geriatri beserta pendamping',
				'Audit kontras warna dan readability teks dengan tools WCAG 2.2',
				'Pengembangan prototype mode panduan audio langkah demi langkah',
				'Uji coba klinis kepuasan pengguna di 3 fasilitas kesehatan swasta'
			],
			impact: 'Waktu rata-rata booking janji temu dokter terpangkas dari 12 menit menjadi hanya 3 menit.'
		},
		links: {
			figma: 'https://figma.com/@bagiz/lumina-health',
			liveDemo: 'https://lumina-health.preview.app'
		}
	},
	{
		id: 'proj-006',
		slug: 'kolektif-hijau-circular-economy',
		title: 'Kolektif Hijau - Studi Kelayakan Bisnis & Pitch Deck Investasi Daur Ulang',
		subtitle: 'Strategi Akselerasi Investasi Rp 3.5 Miliar untuk Ekonomi Sirkular',
		category: 'Bisnis',
		summary: 'Menyusun riset mendalam pasar limbah plastik, proyeksi cash flow 5 tahun, dan rancangan visual pitch deck yang berhasil mengamankan pendanaan benih sebesar Rp 3.5 Miliar.',
		thumbnail: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1200&q=80',
		images: [
			'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1200&q=80'
		],
		isFeatured: false,
		isNew: false,
		displayOrder: 6,
		isPublished: true,
		publishedAt: '2025-07-05T16:00:00Z',
		role: 'Strategic Planner & Investment Deck Architect',
		duration: '2.5 Bulan',
		tools: ['Keynote', 'Pitch', 'Financial DCF', 'Canva Pro'],
		metrics: [
			{ label: 'Pendanaan Terkumpul', value: 'Rp 3.5M', change: 'Seed round oversubscribed' },
			{ label: 'Mitra Korporat FMCG', value: '6 Brand', change: 'komitmen off-taker limbah' },
			{ label: 'Valuasi Pasca Pendanaan', value: '3.2x', change: 'pertumbuhan valuasi awal' }
		],
		caseStudy: {
			background: 'Startup daur ulang membutuhkan pendanaan untuk memperluas pabrik peletisasi plastik ramah lingkungan namun kesulitan menjelaskan model bisnis kepada pemodal ventura.',
			problem: 'Narasi presentasi terlalu fokus pada aspek teknis mesin dan kurang mengeksplorasi unit economics, captive market, dan regulasi ESG.',
			solution: 'Menyusun ulang narasi problem-solution berbasis data regulasi internasional, mendesain slide pitch deck yang elegan, dan menguji simulasi tanya jawab investor.',
			process: [
				'Analisis pasar total addressable market (TAM/SAM/SOM) industri daur ulang nasional',
				'Penyusunan proyeksi finansial DCF, margin laba per ton, dan titik impas mesin',
				'Perancangan visual storytelling deck 18 slide dengan visual infografis tajam',
				'Penyusunan Data Room dan ringkasan eksekutif satu halaman (One-Pager)'
			],
			impact: 'Pendanaan putaran awal berhasil ditutup dalam tempo 7 minggu dengan partisipasi sindikat angel investor dan dana ventura dampak hijau.'
		},
		links: {
			pitchDeck: 'https://speakerdeck.com/bagiz/kolektif-hijau-seed-deck'
		}
	}
];

export const mockSkills: Skill[] = [
	// Keahlian Desain
	{
		id: 'skill-ui-ux',
		name: 'UI/UX Design & Wireframing',
		category: 'Desain',
		level: 'Ahli',
		proficiencyPercent: 95,
		tools: ['Figma', 'Framer', 'FigJam', 'Miro'],
		description: 'Perancangan antarmuka pengguna responsif, wireframe low-fidelity hingga prototype interaktif dengan fokus pada micro-interactions dan kepuasan pengguna.',
		iconName: 'LayoutGrid'
	},
	{
		id: 'skill-design-systems',
		name: 'Design Systems & UI Tokens',
		category: 'Desain',
		level: 'Ahli',
		proficiencyPercent: 92,
		tools: ['Figma Variables', 'Storybook', 'Tailwind CSS', 'Zeroheight'],
		description: 'Penyusunan arsitektur pustaka komponen multi-brand, token semantik otomatis, dan standarisasi dokumentasi antarmuka skala korporasi.',
		iconName: 'Layers'
	},
	{
		id: 'skill-ux-research',
		name: 'User Research & Usability Testing',
		category: 'Desain',
		level: 'Mahir',
		proficiencyPercent: 88,
		tools: ['Maze', 'Dovetail', 'Hotjar', 'UserTesting'],
		description: 'Eksplorasi kebutuhan pengguna melalui wawancara mendalam, cognitive walkthrough, uji usability kualitatif/kuantitatif, dan analisis funnel.',
		iconName: 'SearchCheck'
	},
	{
		id: 'skill-visual-branding',
		name: 'Visual Identity & Creative Prototyping',
		category: 'Desain',
		level: 'Mahir',
		proficiencyPercent: 86,
		tools: ['Adobe Illustrator', 'Photoshop', 'Spline 3D', 'After Effects'],
		description: 'Penyusunan identitas visual merek yang konsisten, palet tipografi harmonis, ilustrasi vektor, dan prototype 3D interaktif.',
		iconName: 'Palette'
	},

	// Keahlian Bisnis
	{
		id: 'skill-product-strategy',
		name: 'Product Strategy & Monetization',
		category: 'Bisnis',
		level: 'Ahli',
		proficiencyPercent: 92,
		tools: ['Lean Canvas', 'Value Proposition Design', 'Notion', 'Pricing Tier Modeling'],
		description: 'Perumusan roadmap produk jangka panjang, diferensiasi pasar, penetapan strategi harga (freemium/tiered), dan alignment tujuan bisnis.',
		iconName: 'TrendingUp'
	},
	{
		id: 'skill-business-analysis',
		name: 'Business Analysis & Unit Economics',
		category: 'Bisnis',
		level: 'Mahir',
		proficiencyPercent: 89,
		tools: ['Excel Advanced', 'Financial DCF', 'Break-Even Analysis', 'Google Sheets'],
		description: 'Kalkulasi CAC/LTV, estimasi biaya operasional, proyeksi arus kas 3-5 tahun, dan evaluasi kelayakan finansial inisiatif teknologi.',
		iconName: 'Calculator'
	},
	{
		id: 'skill-product-analytics',
		name: 'Product Analytics & Funnel Optimization',
		category: 'Bisnis',
		level: 'Mahir',
		proficiencyPercent: 87,
		tools: ['Mixpanel', 'Google Analytics 4', 'SQL Basic', 'PostHog'],
		description: 'Pelacakan metrik retensi (cohort analysis), identifikasi drop-off corong konversi transaksi, dan pengujian hipotesis A/B testing terukur.',
		iconName: 'BarChart3'
	},
	{
		id: 'skill-pitch-deck',
		name: 'Pitch Deck & Strategic Storytelling',
		category: 'Bisnis',
		level: 'Mahir',
		proficiencyPercent: 90,
		tools: ['Keynote', 'Pitch.com', 'Storyboarding', 'Investor Data Room'],
		description: 'Penyusunan narasi investasi persuasif untuk fundraising venture capital, kompetisi bisnis nasional, dan proposal kemitraan B2B enterprise.',
		iconName: 'Presentation'
	}
];

export const mockVolunteerExperiences: VolunteerExperience[] = [
	{
		id: 'vol-001',
		role: 'Lead Mentor UI/UX & Design Thinking',
		organization: 'Google Developer Student Clubs (GDSC) Chapter UI',
		period: '2022 - 2023',
		location: 'Depok, Jawa Barat',
		description: 'Membimbing lebih dari 150 mahasiswa dalam workshop intensif perancangan produk digital berbasis prinsip Human-Centered Design.',
		highlights: [
			'Menyelenggarakan 8 sesi bootcamp desain antarmuka dengan tingkat kepuasan peserta 94%',
			'Membimbing 6 tim mahasiswa hingga masuk tahap finalis Solution Challenge global'
		],
		type: 'volunteer',
		badge: 'Komunitas Teknologi'
	},
	{
		id: 'vol-002',
		role: 'Head of Business Strategy & Innovation Hub',
		organization: 'BEM Fakultas Ekonomi & Bisnis Universitas Indonesia',
		period: '2021 - 2022',
		location: 'Jakarta',
		description: 'Memimpin divisi pengembangan ide bisnis mahasiswa dan menginisiasi program pendampingan digitalisasi bagi 30+ pelaku UMKM binaan.',
		highlights: [
			'Mengelola program akselerasi bisnis mahasiswa dengan total hibah inisiatif sebesar Rp 75 Juta',
			'Membantu pembuatan katalog digital dan optimasi sistem pembayaran QRIS untuk UMKM lokal'
		],
		type: 'organizational',
		badge: 'Kepemimpinan'
	},
	{
		id: 'vol-003',
		role: 'Volunteer Fasilitator Literasi Digital Remaja',
		organization: 'Indonesia Menyala & Yayasan Gerakan Literasi',
		period: '2020 - 2021',
		location: 'Jawa Barat & Banten',
		description: 'Memberikan pelatihan dasar etika digital, pemanfaatan internet untuk kreasi konten produktif, dan pengenalan karir teknologi di 12 sekolah binaan.',
		highlights: [
			'Menyusun modul belajar interaktif pengenalan desain grafis dan logika pemrograman dasar',
			'Menggalang donasi perangkat gawai untuk fasilitas lab komputer sekolah mitra'
		],
		type: 'community',
		badge: 'Sosial & Pendidikan'
	}
];

export const mockExperiences: import('$lib/types/portfolio').ExperienceItem[] = [
	{
		id: 'exp-1',
		period: '2024 — Sekarang',
		yearBadge: 'Terkini',
		role: 'Lead UX/UI Designer & Product Strategist',
		company: 'NexaPay Financial Ecosystem',
		location: 'Jakarta, Indonesia (Hybrid)',
		employmentType: 'Full-time',
		badge: 'Design Leadership',
		isCurrent: true,
		summary: 'Memimpin tim multidisiplin beranggotakan 6 desainer UI/UX, berkolaborasi langsung dengan VP of Product dan Head of Engineering.',
		achievements: [
			'Merancang ulang arsitektur transaksi dompet digital yang melipatgandakan konversi onboarding +42%',
			'Membangun Nexa Design System v3.0 dengan 140+ komponen teruji aksesibilitas WCAG 2.1 AA',
			'Memangkas waktu time-to-market perilisan fitur baru hingga 35% antar platform web dan mobile'
		],
		tools: ['Figma', 'Framer', 'Mixpanel', 'Storybook', 'FigJam'],
		projectSlug: 'nexapay-fintech-redesign'
	},
	{
		id: 'exp-2',
		period: '2022 — 2024',
		yearBadge: '2 Tahun',
		role: 'Senior UI/UX Designer & Design System Lead',
		company: 'Aura Commerce Omnichannel',
		location: 'Singapura & Jakarta (Remote)',
		employmentType: 'Full-time',
		badge: 'Scale-Up Specialist',
		summary: 'Menginisiasi standarisasi sistem desain global untuk platform e-commerce multi-region yang beroperasi di 4 negara Asia Tenggara.',
		achievements: [
			'Membangun fondasi 120+ token warna dan tipografi semantik yang digunakan oleh 20+ tim engineer',
			'Meningkatkan checkout conversion rate sebesar +27% melalui penyederhanaan alur pembayaran',
			'Menjalankan usability testing berkala dengan 40+ responden internasional untuk validasi hipotesis'
		],
		tools: ['Figma', 'Zeroheight', 'Tokens Studio', 'UserTesting', 'Hotjar'],
		projectSlug: 'aura-commerce-design-system'
	},
	{
		id: 'exp-3',
		period: '2021 — 2022',
		yearBadge: '1.5 Tahun',
		role: 'Product Business Analyst & UX Researcher',
		company: 'Velo Logistics SaaS',
		location: 'Bandung, Indonesia',
		employmentType: 'Contract',
		badge: 'B2B SaaS Growth',
		summary: 'Menghubungkan riset lapangan pengemudi dan operator armada dengan pemodelan unit economics SaaS manajemen logistik.',
		achievements: [
			'Merumuskan model pricing tier B2B yang meningkatkan Average Revenue Per User (ARPU) sebesar +34%',
			'Menyusun dashboard fleet monitoring real-time yang memangkas waktu tunggu dispatch armada hingga -40%',
			'Menyusun pitch deck strategis yang membantu tim meraih pendanaan lanjutan Seed Round $1.8M'
		],
		tools: ['Miro', 'Mixpanel', 'Tableau', 'Google Analytics 4', 'SQL'],
		projectSlug: 'velo-logistics-saas'
	},
	{
		id: 'exp-4',
		period: '2020 — 2021',
		yearBadge: '1 Tahun',
		role: 'Junior Interaction Designer & Growth Strategist',
		company: 'EduKarsa Digital Academy',
		location: 'Jakarta, Indonesia',
		employmentType: 'Full-time',
		badge: 'EdTech Foundation',
		summary: 'Fokus pada perancangan antarmuka gamifikasi belajar interaktif dan optimasi corong registrasi pengguna baru platform edtech.',
		achievements: [
			'Merancang antarmuka modul kursus interaktif dengan completion rate mencapai 78% (di atas rata-rata industri)',
			'Mengoptimasi landing page pendaftaran program bootcamp dengan kenaikan rasio konversi leads +19%'
		],
		tools: ['Adobe XD', 'Illustrator', 'Notion', 'Hotjar'],
		projectSlug: ''
	}
];

export const mockSkillPillars: import('$lib/types/portfolio').SkillPillar[] = [
	{
		id: 'pillar-1',
		badge: 'DESAIN PRODUK & INTERAKSI',
		title: 'UI/UX & Product Design',
		subtitle: 'End-to-End User Experience',
		desc: 'Merancang antarmuka digital yang intuitif, estetis, dan teruji melalui metodologi riset pengguna mendalam serta prototipe interaktif berstandar industri.',
		skills: [
			{ label: 'User Research & Journey Mapping', level: 'Expert', tier: 4 },
			{ label: 'Wireframing & Hi-Fi Prototyping', level: 'Master', tier: 4 },
			{ label: 'Micro-interactions & Motion UX', level: 'Advanced', tier: 3 },
			{ label: 'Usability Testing & Heuristic Audit', level: 'Expert', tier: 4 }
		],
		tools: ['Figma', 'FigJam', 'Framer', 'Protopie', 'Principle']
	},
	{
		id: 'pillar-2',
		badge: 'SKALABILITAS & TATA KELOLA',
		title: 'Enterprise Design Systems',
		subtitle: 'Tokens & Multi-Brand Architecture',
		desc: 'Membangun fondasi sistem desain terukur dengan arsitektur token semantik, varian komponen atomik, dan dokumentasi handoff lintas tim developer.',
		isFeatured: true,
		skills: [
			{ label: 'Semantic Token Architecture', level: 'Master', tier: 4 },
			{ label: 'Atomic Component Libraries', level: 'Master', tier: 4 },
			{ label: 'Accessibility (WCAG 2.1 AA/AAA)', level: 'Advanced', tier: 3 },
			{ label: 'Developer Handoff & Versioning', level: 'Expert', tier: 4 }
		],
		tools: ['Figma Variables', 'Tokens Studio', 'Storybook', 'Zeroheight', 'Tailwind']
	},
	{
		id: 'pillar-3',
		badge: 'STRATEGI & PERTUMBUHAN BISNIS',
		title: 'Business Strategy & Growth',
		subtitle: 'Metrics, Monetization & ROI',
		desc: 'Menyelaraskan tujuan desain dengan metrik finansial terukur, diferensiasi proposisi nilai, pemodelan unit economics, serta strategi penetapan harga.',
		skills: [
			{ label: 'Product Monetization Strategy', level: 'Expert', tier: 4 },
			{ label: 'Unit Economics & CAC/LTV Model', level: 'Master', tier: 4 },
			{ label: 'Market Research & Competitive Moat', level: 'Advanced', tier: 3 },
			{ label: 'Pitch Deck & Venture Storytelling', level: 'Specialist', tier: 4 }
		],
		tools: ['Lean Canvas', 'Value Prop Canvas', 'Financial DCF', 'Keynote', 'Pitch']
	},
	{
		id: 'pillar-4',
		badge: 'ANALISIS DATA & VALIDASI',
		title: 'Product Analytics & Optimization',
		subtitle: 'Data-Informed Experimentation',
		desc: 'Menganalisis perilaku pengguna berbasis corong konversi, analisis kohort retensi, dan perancangan eksperimen A/B testing untuk validasi berkelanjutan.',
		skills: [
			{ label: 'Funnel & Cohort Retention Analysis', level: 'Expert', tier: 4 },
			{ label: 'A/B Testing & Hypothesis Design', level: 'Advanced', tier: 3 },
			{ label: 'Behavioral Event Tracking Schema', level: 'Master', tier: 4 },
			{ label: 'Quantitative Usability Metrics (SUS)', level: 'Specialist', tier: 4 }
		],
		tools: ['Mixpanel', 'Google Analytics 4', 'Hotjar', 'PostHog', 'SQL Basic']
	}
];

export const mockContactMessages: import('$lib/types/portfolio').ContactMessage[] = [
	{
		id: 'msg-1',
		name: 'Rian Pratama',
		email: 'rian.pratama@fintechindonesia.id',
		service: 'UI/UX Redesign Enterprise',
		message: 'Halo Mas Bagiz, kami tertarik mendiskusikan redesign aplikasi pembayaran B2B kami untuk kuartal depan. Mohon info ketersediaan waktu untuk discovery call 30 menit.',
		createdAt: '2026-10-24T09:30:00Z',
		isRead: false,
		isReplied: false
	},
	{
		id: 'msg-2',
		name: 'Stephanie Tan',
		email: 'stephanie@luminaventures.sg',
		service: 'Design System & Token Architecture',
		message: 'Hi Bagiz, saw your NexaPay case study on Behance. Would love to invite you as guest speaker and explore consulting work for our portfolio startups.',
		createdAt: '2026-10-22T14:15:00Z',
		isRead: true,
		isReplied: true
	}
];

