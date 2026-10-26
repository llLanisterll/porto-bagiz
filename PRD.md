# Product Requirements Document (PRD): Portofolio Digital Bisnis & Desain

## 1. Gambaran Umum Proyek
Aplikasi web Portofolio Digital Bisnis & Desain berbasis **SvelteKit (Svelte 5 Runes)** dan **Tailwind CSS**. Aplikasi ini memiliki dua sisi:
1. **Halaman Publik (Showcase):** Menampilkan profil, keahlian desain & bisnis, galeri karya beserta studi kasus mendalam, highlight karya terbaru, dan formulir ajakan kerja sama.
2. **Panel Pengelola (Admin CMS):** Memungkinkan pemilik portofolio login untuk menambah, mengedit, menghapus, dan mengatur urutan tampil karya secara dinamis.

## 2. Tech Stack & Aturan Teknis
- **Framework:** SvelteKit 2 + Svelte 5 (WAJIB menggunakan sintaks Runes: `$state`, `$derived`, `$props`, `$effect`).
- **Bahasa:** TypeScript.
- **Styling:** Tailwind CSS + `lucide-svelte` untuk ikon + `svelte/transition` untuk animasi UI.
- **Penyimpanan Data & Auth:** Gunakan arsitektur modular di `src/lib/server/` (mulai dengan JSON/SQLite lokal atau Supabase agar mudah dijalankan di environment lokal, dilengkapi proteksi session di `src/hooks.server.ts`).

## 3. Spesifikasi Fitur & Fase Pembangunan

### FASE 1: Galeri Karya
- **Daftar Karya:** Grid responsif menampilkan kartu proyek (Thumbnail, Judul, Kategori, Ringkasan singkat).
- **Karya Unggulan:** Seksi khusus di bagian atas untuk menampilkan karya dengan flag `isFeatured: true`.
- **Filter Kategori:** Filter interaktif (`Semua`, `Desain`, `Bisnis`, `Hybrid`) menggunakan `$state` dan `$derived` tanpa reload halaman.
- **Pencarian & Sortir:** Input pencarian instan berdasarkan judul/tools.

### FASE 2: Detail Karya, Daftar Keahlian, & Perkenalan Diri
- **Detail Karya (`/karya/[slug]`):**
  - *Gambar Karya Besar:* Hero image resolusi tinggi dan galeri gambar dengan fitur Lightbox modal.
  - *Cerita Proyek:* Studi kasus terstruktur (Latar Belakang Masalah, Proses & Solusi, Hasil/Dampak).
  - *Tautan Prototipe:* Tombol eksternal menuju Figma / Live Demo / Pitch Deck.
  - *Metrik & Peran:* Info Role, Durasi, Tools, dan metrik keberhasilan proyek.
- **Daftar Keahlian:**
  - *Keahlian Desain:* UI/UX, Prototyping, Design System, Visual Branding.
  - *Keahlian Bisnis:* Business Analysis, Market Research, Product Strategy, Financial Modeling.
  - *Tingkat Kemahiran:* Indikator visual level kemahiran (Progress bar / Level badge).
  - *Tools:* Daftar perangkat lunak yang dikuasai.
- **Perkenalan Diri:**
  - *Foto Profil & Tentang Saya:* Hero & About section dengan narasi profesional.
  - *Riwayat Pendidikan:* Timeline vertikal riwayat pendidikan & pencapaian.
  - *Unduh CV:* Tombol unduh file CV dalam format PDF.

### FASE 3: Kontak & Ajak Kerja Sama
- **Formulir Pesan:** Form interaktif (Nama, Email, Subjek/Jenis Kolaborasi, Pesan) dengan SvelteKit Form Actions dan umpan balik status pengiriman.
- **Tautan Media Sosial:** Link ke LinkedIn, GitHub, Instagram, dan Email.
- **Tombol Ajak Kerja Sama:** CTA menonjol di Navbar dan seksi bawah halaman.

### FASE 4: Login Pengelola & Kelola Karya (Admin CMS)
- **Login Pengelola (`/admin/login`):**
  - *Masuk Akun:* Form autentikasi email & password.
  - *Keluar Aman:* Action logout untuk menghapus session cookie.
  - *Pemulihan Kata Sandi:* Halaman `/admin/lupa-sandi` untuk alur reset kata sandi.
- **Kelola Karya (`/admin/karya`):**
  - *Tambah Karya Baru:* Form input seluruh atribut proyek.
  - *Ubah & Hapus Karya:* Edit data proyek & hapus proyek dengan modal konfirmasi.
  - *Atur Urutan Tampil:* Pengaturan angka urutan prioritas (`displayOrder`) dan toggle Karya Unggulan (`isFeatured`).
  - *Status Publikasi:* Toggle Draft vs Published (`isPublished`).

### FASE 5: Kabar Karya Baru
- **Label Terbaru:** Badge visual "BARU" otomatis pada proyek yang baru rilis (`isNew: true` atau dipublikasikan dalam 30 hari terakhir).
- **Bagian Pembaruan:** Banner/seksi khusus di beranda yang menyoroti pembaruan atau karya terbaru.
