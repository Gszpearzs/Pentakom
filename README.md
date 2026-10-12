# ⚡ Pentakom CM-PM Form (Online Field Report)

Aplikasi web laporan pemeliharaan teknisi **Pentakom** (Corrective Maintenance & Preventive Maintenance) dengan struktur dan fitur terinspirasi dari `brilliantnb/LAPORAN-KUNJUNGAN`.

---

## 🌟 Fitur Utama

- **Struktur Simpel & Ringan**: Cukup 2 berkas utama (`index.html` dan `app.js`), langsung aktif di **GitHub Pages**.
- **Generate Dokumen Word (.docx) Otomatis**: Teknisi dapat mengunduh berkas laporan resmi Microsoft Word (`.docx`) langsung di HP atau laptop tanpa perlu software tambahan.
- **Toggle Pemeriksaan Status (Baik / Buruk)**: Mode Preventive Maintenance (PM) dilengkapi tombol cepat kondisi awal & akhir untuk setiap komponen unit.
- **Mode Perbaikan Insidental (CM)**: Uraian gejala awal, analisis akar masalah (root cause), solusi, dan sparepart yang diganti.
- **Kompresi Foto Bukti Otomatis**: Foto dikompres otomatis di HP teknisi sebelum diunggah ke Google Drive dan disematkan ke dokumen Word.
- **Tersambung ke Google Drive & Sheets**: Data otomatis terekap ke Google Sheets, sementara berkas Word (.docx) dan foto tersimpan di folder Google Drive.
- **Auto-Save Draf Lokal**: Data yang sedang diketik aman dari risiko sinyal hilang di lapangan.

---

## 🚀 Panduan Setup Singkat (2 Langkah)

### 1. Pasang Backend di Google Drive & Sheets
1. Buka [Google Drive](https://drive.google.com/) ➔ Buat Spreadsheet baru (misal: `Rekap Laporan Pentakom`).
2. Klik menu **Ekstensi** (Extensions) ➔ **Apps Script**.
3. Hapus kode bawaan di `Code.gs`, lalu salin seluruh isi [google-apps-script.js](google-apps-script.js) dan tempel di sana.
4. Klik **Deploy** ➔ **New deployment** ➔ Pilih **Web app**:
   - *Execute as*: **Me**
   - *Who has access*: **Anyone** *(Wajib agar form web bisa mengirim data)*
5. Klik **Deploy** ➔ Beri izin akses akun Google Anda ➔ Salin **Web app URL** yang muncul.

### 2. Aktifkan di GitHub Pages
1. Buat repository baru di [github.com/new](https://github.com/new) bernama `pentakom-cm-pm`.
2. Hubungkan dan upload:
   ```bash
   git remote add origin https://github.com/USERNAME_GITHUB/pentakom-cm-pm.git
   git push -u origin main
   ```
3. Di tab **Settings** ➔ **Pages** pada repository GitHub:
   - Pilih Branch: `main` dan folder `/ (root)`.
   - Klik **Save**.
   - Link publik Anda siap digunakan: `https://USERNAME_GITHUB.github.io/pentakom-cm-pm/`

---

## 📱 Penggunaan untuk Teknisi

1. Buka link web dari HP.
2. Klik tombol **⚙️ Pengaturan** di baris atas untuk memasukkan Web App URL dari Langkah 1 *(cukup 1x simpan)*.
3. Isi data pemeliharaan, lakukan pengecekan status (Baik/Buruk), dan ambil foto dokumentasi di lapangan.
4. Klik **💾 Simpan Word (.docx)** untuk download salinan berkas Word di HP, atau klik **🚀 Selesai & Upload ke Drive** untuk langsung mengirimkan laporan ke arsip pusat Pentakom.
