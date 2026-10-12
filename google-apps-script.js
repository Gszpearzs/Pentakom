/**
 * ==============================================================================
 * BACKEND GOOGLE APPS SCRIPT: PENTAKOM CM-PM FORM
 * ==============================================================================
 * Petunjuk Pemasangan:
 * 1. Buka Google Sheets baru di Google Drive Anda (beri nama misal: "Rekap Laporan Pentakom").
 * 2. Klik menu "Ekstensi" (Extensions) -> "Apps Script".
 * 3. Hapus semua kode default di Apps Script, lalu SALIN & TEMPEL (Copy-Paste) seluruh isi file ini.
 * 4. Klik tombol "Deploy" (Terapkan) di pojok kanan atas -> pilih "New deployment" (Deployment baru).
 * 5. Klik ikon gerigi (Select type) -> pilih "Web app".
 * 6. Atur konfigurasi berikut:
 *    - Description: Pentakom CM-PM Backend
 *    - Execute as: Me (email akun Google Anda)
 *    - Who has access: Anyone (PENTING! Agar form di web bisa mengirim data tanpa login akun Google)
 * 7. Klik "Deploy", izinkan akses izin akun Google (Review Permissions -> Advanced -> Go to script (unsafe) -> Allow).
 * 8. Salin "Web app URL" (akhiran /exec) dan masukkan ke tombol ⚙️ di web form Anda!
 * ==============================================================================
 */

// Nama folder di Google Drive tempat foto & tanda tangan disimpan
var FOLDER_NAME = "Pentakom CM-PM Bukti Foto";

function doPost(e) {
  try {
    var rawContents = e.postData.contents;
    var data = JSON.parse(rawContents);

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("Laporan CM-PM");
    if (!sheet) {
      sheet = ss.insertSheet("Laporan CM-PM");
    }

    // Buat header jika sheet masih kosong
    setupHeaderIfEmpty(sheet);

    // Cari atau buat folder di Google Drive
    var driveFolder = getOrCreateFolder(FOLDER_NAME);

    // Simpan Foto Bukti ke Google Drive & dapatkan URL-nya
    var urlPhotoBefore = "";
    var urlPhotoDuring = "";
    var urlPhotoAfter = "";
    var urlSigTech = "";
    var urlSigPic = "";

    var ticketPrefix = data.ticketNo ? data.ticketNo : "PKM-" + new Date().getTime();

    if (data.photoBefore) {
      urlPhotoBefore = saveBase64ToDrive(driveFolder, data.photoBefore, ticketPrefix + "_BEFORE.jpg", "image/jpeg");
    }
    if (data.photoDuring) {
      urlPhotoDuring = saveBase64ToDrive(driveFolder, data.photoDuring, ticketPrefix + "_DURING.jpg", "image/jpeg");
    }
    if (data.photoAfter) {
      urlPhotoAfter = saveBase64ToDrive(driveFolder, data.photoAfter, ticketPrefix + "_AFTER.jpg", "image/jpeg");
    }
    if (data.sigTech) {
      urlSigTech = saveBase64ToDrive(driveFolder, data.sigTech, ticketPrefix + "_TTD_TEKNISI.png", "image/png");
    }
    if (data.sigPic) {
      urlSigPic = saveBase64ToDrive(driveFolder, data.sigPic, ticketPrefix + "_TTD_PIC.png", "image/png");
    }

    // Susun baris data untuk Google Sheets
    var rowData = [
      new Date(),                     // Timestamp input
      data.ticketNo || "-",           // No. Tiket
      data.workType || "-",           // Tipe (CM/PM)
      data.workDate || "-",           // Waktu Pengerjaan
      data.techRegion || "-",         // Wilayah
      data.techName || "-",           // Nama Teknisi
      data.techPhone || "-",          // No. WhatsApp
      data.clientName || "-",         // Nama Klien
      data.siteName || "-",           // Nama Site
      data.siteAddress || "-",        // Alamat Site
      data.picName || "-",            // PIC Klien
      data.picContact || "-",         // Kontak PIC
      data.deviceType || "-",         // Tipe Perangkat
      data.deviceBrand || "-",        // Merk & Seri
      data.deviceSerial || "-",       // Serial Number
      data.cmIssue || "-",            // Gejala (CM)
      data.cmRootCause || "-",        // Penyebab (CM)
      data.cmAction || "-",           // Solusi / Tindakan (CM)
      data.cmSparepart || "-",        // Sparepart (CM)
      data.pmChecklist || "-",        // Checklist (PM)
      data.pmNotes || "-",            // Catatan PM
      data.workStatus || "-",         // Status Akhir
      data.recommendations || "-",    // Rekomendasi
      urlPhotoBefore,                 // Link Foto Before
      urlPhotoDuring,                 // Link Foto During
      urlPhotoAfter,                  // Link Foto After
      urlSigTech,                     // Link TTD Teknisi
      urlSigPic                       // Link TTD PIC
    ];

    sheet.appendRow(rowData);

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Laporan berhasil disimpan ke Google Sheets dan Google Drive.",
      ticketNo: data.ticketNo
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Menangani permintaan GET sederhana (untuk cek status server)
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "online",
    service: "Pentakom CM-PM API Service",
    timestamp: new Date()
  })).setMimeType(ContentService.MimeType.JSON);
}

// Helper: Menyiapkan Header Tabel jika masih kosong
function setupHeaderIfEmpty(sheet) {
  if (sheet.getLastRow() === 0) {
    var headers = [
      "Timestamp Input", "No Tiket", "Tipe Pekerjaan", "Waktu Pengerjaan",
      "Wilayah", "Nama Teknisi", "No WA Teknisi", "Klien / Pelanggan",
      "Nama Site", "Alamat Site", "PIC Site", "Kontak PIC",
      "Tipe Perangkat", "Merk / Seri", "Serial Number",
      "Gejala Kerusakan (CM)", "Akar Masalah (CM)", "Tindakan Korektif (CM)", "Sparepart (CM)",
      "Checklist PM (PM)", "Catatan PM (PM)", "Status Pekerjaan", "Rekomendasi",
      "Link Foto Before (Drive)", "Link Foto During (Drive)", "Link Foto After (Drive)",
      "Link TTD Teknisi (Drive)", "Link TTD PIC (Drive)"
    ];

    sheet.appendRow(headers);

    // Format styling header
    var headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground("#1e3a8a");
    headerRange.setFontColor("#ffffff");
    headerRange.setFontWeight("bold");
    headerRange.setFontFamily("Plus Jakarta Sans");
    sheet.setFrozenRows(1);
  }
}

// Helper: Mencari atau membuat folder Google Drive
function getOrCreateFolder(folderName) {
  var folders = DriveApp.getFoldersByName(folderName);
  if (folders.hasNext()) {
    return folders.next();
  } else {
    var newFolder = DriveApp.createFolder(folderName);
    // Buka akses viewing agar file foto bisa diakses dengan link
    newFolder.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    return newFolder;
  }
}

// Helper: Menyimpan Data Base64 ke Google Drive
function saveBase64ToDrive(folder, base64Data, filename, mimeType) {
  try {
    var cleanBase64 = base64Data;
    if (base64Data.indexOf(",") > -1) {
      cleanBase64 = base64Data.split(",")[1];
    }

    var decoded = Utilities.base64Decode(cleanBase64);
    var blob = Utilities.newBlob(decoded, mimeType, filename);
    var file = folder.createFile(blob);
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    return file.getUrl();
  } catch (err) {
    return "Error Upload: " + err.toString();
  }
}
