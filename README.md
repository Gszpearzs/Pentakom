# ⚡ Pentakom CM-PM Form (Online Field Report)

Aplikasi web formulir pelaporan pemeliharaan **Corrective Maintenance (CM)** & **Preventive Maintenance (PM)** untuk teknisi lapangan Pentakom. Sistem ini mengintegrasikan **GitHub Pages** (sebagai hosting web gratis yang dapat diakses tim di daerah) dan **Google Drive & Google Sheets** (sebagai database dan penyimpanan foto bukti kerja otomatis).

---

## 🌟 Fitur Utama

- **Akses Fleksibel**: Dapat dibuka langsung melalui HP Android, iPhone, tablet, maupun laptop via link GitHub Pages.
- **Dua Mode Pemeliharaan**:
  - **CM (Corrective Maintenance)**: Input gejala kerusakan, analisis akar masalah (root cause), tindakan solusi, dan sparepart yang diganti.
  - **PM (Preventive Maintenance)**: Checklist pemeriksaan rutin (kebersihan, kabel, tegangan/UPS, pendingin/fan, throughput test, backup) dan catatan kondisi.
- **Kompresi Foto Otomatis**: Foto dokumentasi (*Before*, *During*, *After*) langsung dikompres di sisi klien (*client-side*) sehingga hemat kuota dan cepat terkirim meski sinyal di lokasi lemah.
- **Tanda Tangan Digital**: Fitur tanda tangan langsung pada layar sentuh untuk Teknisi dan PIC Klien.
- **Auto-Save Draf (Offline Protection)**: Data yang sedang diketik tersimpan otomatis di cache browser teknisi agar tidak hilang jika terputus koneksi.
- **Zero Server Cost**: 100% gratis menggunakan kombinasi GitHub Pages + Google Apps Script + Google Drive.

---

## 🚀 Panduan Setup (Hanya 2 Langkah)

### LANGKAH 1: Setup Backend Google Drive & Google Sheets

1. Buka [Google Drive](https://drive.google.com/) Anda dan buat **Google Spreadsheet** baru (beri nama misalnya: `Rekap Laporan Pentakom`).
2. Di dalam Google Spreadsheet, klik menu **Ekstensi** (Extensions) ➔ **Apps Script**.
3. Hapus semua teks yang ada di jendela Apps Script.
4. Buka file [google-apps-script.js](file:///Users/gv2-2024/iCloud%20Drive%20%28Archive%29/Desktop/PRIBADI/Pentakom%20CM-PM%20Form/google-apps-script.js) di project ini, lalu salin (**Copy**) seluruh isinya dan tempel (**Paste**) ke jendela Apps Script.
5. Klik tombol **Deploy** (Terapkan) di pojok kanan atas ➔ pilih **New deployment** (Deployment baru).
6. Klik ikon gerigi ⚙️ (Select type) ➔ pilih **Web app**.
7. Isi pengaturan sebagai berikut:
   - **Description**: `Pentakom CM-PM API`
   - **Execute as**: `Me (email Anda)`
   - **Who has access**: `Anyone` *(PENTING: Pilih "Anyone" agar form web dapat mengirim data tanpa perlu login akun Google)*
8. Klik **Deploy**.
9. Jika muncul jendela izin akses:
   - Klik **Review permissions**.
   - Pilih akun Google Anda.
   - Klik **Advanced** (Lanjutan) ➔ klik **Go to script (unsafe)** ➔ klik **Allow**.
10. Salin **Web app URL** yang dihasilkan (berakhiran `/exec`). Simpan URL ini!

---

### LANGKAH 2: Publish Web ke GitHub & Aktifkan GitHub Pages

1. **Inisialisasi Git di Komputer Anda**:
   Buka terminal di folder project ini lalu jalankan:
   ```bash
   git init
   git branch -M main
   git add .
   git commit -m "Initial release: Pentakom CM-PM Form"
   ```

2. **Buat Repository di GitHub**:
   - Buka [github.com/new](https://github.com/new).
   - Beri nama repository: `pentakom-cm-pm` (pilih Public).
   - Jangan centang *"Add a README file"*.
   - Klik **Create repository**.

3. **Hubungkan & Upload (Push)**:
   Jalankan perintah berikut di terminal (ganti `USERNAME_GITHUB` dengan username akun GitHub Anda):
   ```bash
   git remote add origin https://github.com/USERNAME_GITHUB/pentakom-cm-pm.git
   git push -u origin main
   ```

4. **Aktifkan Link Online (GitHub Pages)**:
   - Di halaman repository GitHub Anda, klik tab **Settings**.
   - Pada menu sebelah kiri, klik **Pages**.
   - Di bagian **Branch**, pilih `main` dan folder `/ (root)`.
   - Klik **Save**.
   - Tunggu 1–2 menit, Anda akan mendapatkan link publik seperti:  
     👉 `https://USERNAME_GITHUB.github.io/pentakom-cm-pm/`

---

## 📱 Cara Penggunaan untuk Tim Lapangan

1. Bagikan link GitHub Pages ke grup WhatsApp tim teknisi di daerah.
2. Saat pertama kali dibuka:
   - Klik ikon gerigi **⚙️** di pojok kanan atas.
   - Tempelkan URL Google Apps Script yang Anda dapatkan dari Langkah 1.
   - Klik **Simpan Pengaturan** *(cukup dilakukan 1x di perangkat teknisi)*.
3. Teknisi mengisi formulir, mengambil foto bukti kerja di site, membubuhkan tanda tangan, lalu klik **Kirim Laporan**.
4. Semua data langsung tersimpan rapi:
   - Tabel laporan masuk ke **Google Sheets**.
   - Foto Before, During, After, dan TTD masuk ke folder **Pentakom CM-PM Bukti Foto** di Google Drive Anda.

---

## 📂 Struktur File Project

```
├── index.html              # Antarmuka form web utama
├── style.css               # Desain modern, responsif & mobile-friendly
├── app.js                  # Logika form, kompresi foto & integrasi API
├── google-apps-script.js   # Script backend untuk Google Sheets & Drive
└── README.md               # Dokumentasi panduan lengkap
```
