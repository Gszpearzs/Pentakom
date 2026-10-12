// BACKEND GOOGLE APPS SCRIPT - PENTAKOM CM-PM FORM
// Deploy sebagai Web app: Execute as = Me, Who has access = Anyone

var FOLDER_NAME = "Pentakom CM-PM Bukti & Laporan";

function doPost(e) {
  try {
    var rawContents = e.postData.contents;
    var data = JSON.parse(rawContents);

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("Laporan CM-PM");
    if (!sheet) {
      sheet = ss.insertSheet("Laporan CM-PM");
    }

    // Siapkan header jika sheet masih kosong
    setupHeaderIfEmpty(sheet);

    // Cari atau buat folder di Google Drive
    var driveFolder = getOrCreateFolder(FOLDER_NAME);

    var ticketPrefix = data.ticketNo ? data.ticketNo : "PKM-" + new Date().getTime();

    // 1. Simpan Berkas Dokumen Word (.docx) ke Google Drive jika ada
    var urlDocx = "";
    if (data.docxBase64) {
      urlDocx = saveBase64ToDrive(
        driveFolder,
        data.docxBase64,
        ticketPrefix + "_LAPORAN.docx",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      );
    }

    // 2. Simpan Foto-Foto Bukti ke Google Drive
    var urlPhotoBefore = "";
    var urlPhotoDuring = "";
    var urlPhotoAfter = "";
    var urlPhotoPic = "";

    if (data.photoBefore) {
      urlPhotoBefore = saveBase64ToDrive(driveFolder, data.photoBefore, ticketPrefix + "_BEFORE.jpg", "image/jpeg");
    }
    if (data.photoDuring) {
      urlPhotoDuring = saveBase64ToDrive(driveFolder, data.photoDuring, ticketPrefix + "_DURING.jpg", "image/jpeg");
    }
    if (data.photoAfter) {
      urlPhotoAfter = saveBase64ToDrive(driveFolder, data.photoAfter, ticketPrefix + "_AFTER.jpg", "image/jpeg");
    }
    if (data.photoPic) {
      urlPhotoPic = saveBase64ToDrive(driveFolder, data.photoPic, ticketPrefix + "_BA_PIC.jpg", "image/jpeg");
    }

    // 3. Masukkan Baris Rekap ke Google Sheets
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
      data.pmChecklist || "-",        // Status Komponen (PM)
      data.workStatus || "-",         // Status Akhir
      data.recommendations || "-",    // Rekomendasi
      urlDocx,                        // Link Berkas Word .docx (Drive)
      urlPhotoBefore,                 // Link Foto Before (Drive)
      urlPhotoDuring,                 // Link Foto During (Drive)
      urlPhotoAfter,                  // Link Foto After (Drive)
      urlPhotoPic                     // Link Foto BA/PIC (Drive)
    ];

    sheet.appendRow(rowData);

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Laporan & berkas Word berhasil disimpan ke Google Drive dan Google Sheets.",
      ticketNo: data.ticketNo,
      docxUrl: urlDocx
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "online",
    service: "Pentakom CM-PM API Service",
    timestamp: new Date()
  })).setMimeType(ContentService.MimeType.JSON);
}

function setupHeaderIfEmpty(sheet) {
  if (sheet.getLastRow() === 0) {
    var headers = [
      "Timestamp Input", "No Tiket", "Tipe Pekerjaan", "Waktu Pengerjaan",
      "Wilayah", "Nama Teknisi", "No WA Teknisi", "Klien / Pelanggan",
      "Nama Site", "Alamat Site", "PIC Site", "Kontak PIC",
      "Tipe Perangkat", "Merk / Seri", "Serial Number",
      "Gejala Kerusakan (CM)", "Akar Masalah (CM)", "Tindakan Korektif (CM)", "Sparepart (CM)",
      "Status Pemeriksaan Komponen (PM)", "Status Pekerjaan", "Rekomendasi",
      "Link File Word .docx (Drive)",
      "Link Foto Before (Drive)", "Link Foto During (Drive)", "Link Foto After (Drive)",
      "Link Foto BA/PIC (Drive)"
    ];

    sheet.appendRow(headers);

    var headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground("#0f2942");
    headerRange.setFontColor("#ffffff");
    headerRange.setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
}

function getOrCreateFolder(folderName) {
  var folders = DriveApp.getFoldersByName(folderName);
  if (folders.hasNext()) {
    return folders.next();
  } else {
    var newFolder = DriveApp.createFolder(folderName);
    newFolder.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    return newFolder;
  }
}

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
