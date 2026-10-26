# Muhammad baghiz — Portfolio & Admin CMS

Website portofolio profesional dan Admin Content Management System (CMS) untuk **Muhammad baghiz** (Lead UX/UI Designer & Business Strategist).

---

## 🚀 Fitur Utama

### 1. **Public Portfolio**

- **Hero Section**: Headline profesional, statistik karir, dan CTA interaktif.
- **Profil & Filosofi**: Kisah karir, pendekatan desain human-centric, dan prinsip kerja.
- **Karya Terpilih (Portfolio Showcase)**: Galeri proyek UX/UI dengan filter kategori, modal detail studi kasus, dan galeri interaktif.
- **Keahlian & Toolkit**: Visualisasi tingkat keahlian (Expert, Advanced, Intermediate) serta daftar software & metodologi desain.
- **Pengalaman Karir**: Timeline riwayat pekerjaan dan pencapaian strategis.
- **Kontak & Inquiry**: Form kontak terintegrasi dan direct channels (LinkedIn, Email, WhatsApp).

### 2. **Admin CMS Dashboard (`/admin`)**

- **Sistem Autentikasi**: Proteksi login admin dengan session persistence (`localStorage`).
- **Sidebar Navigasi Moderen**: Tab navigasi terorganisir untuk tiap bagian dinamis:
  - 📊 **Ringkasan**: Overview metrik, status sistem, dan aksi cepat.
  - 👤 **Profil & Bio**: Edit foto profil, headline, bio, dan statistik.
  - 💼 **Karya & Proyek**: CRUD portofolio lengkap dengan upload gambar, tag, dan deskripsi detail.
  - ⚡ **Keahlian**: Kelola skill dengan indikator level kecakapan (Expert / Advanced / Intermediate).
  - 🏢 **Pengalaman**: Kelola riwayat karir, jabatan, nama perusahaan, periode, dan bullet points pencapaian.
- **Desain UI/UX Premium**: Desain modal clean, tabel data terstruktur, konsistensi ikon (Lucide-family icons), dan feedback visual responsif.

---

## 🛠️ Tech Stack

- **Framework**: [SvelteKit](https://kit.svelte.dev/) (Svelte 5 Runes)
- **Language**: TypeScript
- **Styling**: Tailwind CSS & Vanilla CSS Design Tokens
- **Icons**: Lucide Icons
- **Bundler / Dev Server**: Vite

---

## 💻 Panduan Instalasi & Menjalankan Lokal

1. **Clone Repository**:

   ```bash
   git clone https://github.com/llLanisterll/porto-baghiz.git
   cd "Porto baghiz"
   ```

2. **Install Dependensi**:

   ```bash
   npm install
   ```

3. **Jalankan Development Server**:

   ```bash
   npm run dev
   ```

   Akses website di `http://localhost:5173` dan dashboard admin di `http://localhost:5173/admin`.

4. **Build untuk Production**:
   ```bash
   npm run build
   ```

---

## 👤 Author & Lisensi

- **Muhammad baghiz** — Lead UX/UI Designer & Business Strategist
- Developed with SvelteKit & Modern Web Design Standards.
