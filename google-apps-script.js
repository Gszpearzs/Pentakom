// BACKEND GOOGLE APPS SCRIPT - LAPORAN PEMELIHARAAN BAKTI
// Deploy sebagai Web app: Execute as = Me, Who has access = Anyone

var FOLDER_NAME = "Laporan Pemeliharaan BAKTI";

function doPost(e) {
  try {
    var rawContents = e.postData.contents;
    var data = JSON.parse(rawContents);

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("Rekap Laporan BAKTI");
    if (!sheet) {
      sheet = ss.insertSheet("Rekap Laporan BAKTI");
    }

    setupHeaderIfEmpty(sheet);

    // Cari atau buat folder induk di Google Drive
    var driveFolder = getOrCreateFolder(FOLDER_NAME);

    // Buat subfolder khusus per Site & Tanggal agar rapi
    var sitePrefix = (data.siteId ? data.siteId : "SITE") + "_" + (data.workDate ? data.workDate.replace(/-/g, "") : "");
    var subFolder = driveFolder.createFolder(sitePrefix);
    subFolder.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

    // 1. Simpan Berkas Dokumen PDF (.pdf)
    var urlPdf = "";
    if (data.pdfBase64) {
      urlPdf = saveBase64ToFolder(
        subFolder,
        data.pdfBase64,
        "LAPORAN_BAKTI_" + sitePrefix + ".pdf",
        "application/pdf"
      );
    } else if (data.docxBase64) {
      urlPdf = saveBase64ToFolder(
        subFolder,
        data.docxBase64,
        "LAPORAN_BAKTI_" + sitePrefix + ".docx",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      );
    }

    // 2. Simpan Foto-Foto jika ada
    if (data.photos && typeof data.photos === "object") {
      for (var photoKey in data.photos) {
        if (data.photos[photoKey]) {
          saveBase64ToFolder(
            subFolder,
            data.photos[photoKey],
            photoKey + ".jpg",
            "image/jpeg"
          );
        }
      }
    }

    // 3. Tambah Baris Rekap ke Google Sheets
    var rowData = [
      new Date(),
      data.siteOwner || "-",
      data.siteId || "-",
      data.siteName || "-",
      data.siteAddress || "-",
      data.province || "-",
      data.kabupaten || "-",
      data.desa || "-",
      data.latitude || "-",
      data.longitude || "-",
      data.picName || "-",
      data.picPhone || "-",
      data.techName || "-",
      data.workDate || "-",
      data.timeArrival || "-",
      data.timeDeparture || "-",
      data.kegiatanType || "-",
      data.issueNotes || "-",
      urlPdf,
      subFolder.getUrl()
    ];

    sheet.appendRow(rowData);

    // 4. Update Database "Data SN Perangkat" dengan SN Perangkat Sesudah
    var snUpdateInfo = updateDataSnPerangkat(ss, data);

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Laporan PDF dan update Data SN Perangkat berhasil disimpan ke Google Drive dan Google Sheets.",
      siteId: data.siteId,
      pdfUrl: urlPdf,
      folderUrl: subFolder.getUrl(),
      snUpdate: snUpdateInfo
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// -----------------------------------------------------------------------------
// FUNGSI UPDATE DATABASE "DATA SN PERANGKAT" DI GOOGLE SHEETS
// -----------------------------------------------------------------------------
function updateDataSnPerangkat(ss, data) {
  var sheetName = "Data SN Perangkat";
  var snSheet = ss.getSheetByName(sheetName);
  if (!snSheet) {
    snSheet = ss.insertSheet(sheetName);
  }

  setupDataSnHeaderIfEmpty(snSheet);

  var siteId = (data.siteId || "").toString().trim();
  if (!siteId) return { updated: false, reason: "Site ID kosong" };

  var snAfter = data.snAfter || {};
  var snBefore = data.snBefore || {};
  var eff = data.effectiveSn || {};

  // Pemetaan 8 perangkat: MODEM, ROUTER, AP Indoor, AP Outdoor, ANTENNA, BUC, RACK, STABILIZER
  // Prioritas utama: SN Sesudah (snAfter), lalu effectiveSn, lalu snBefore
  var modem = (snAfter.modem || eff.modem || snBefore.modem || "").toString().trim();
  var router = (snAfter.router || eff.router || snBefore.router || "").toString().trim();
  var apIndoor = (snAfter.apIndoor || eff.apIndoor || snBefore.apIndoor || "").toString().trim();
  var apOutdoor = (snAfter.apOutdoor || eff.apOutdoor || snBefore.apOutdoor || "").toString().trim();
  var antenna = (snAfter.antenna || eff.antenna || snBefore.antenna || "").toString().trim();
  var buc = (snAfter.buc || eff.buc || snBefore.buc || "").toString().trim();
  var rack = (snAfter.rack || eff.rack || snBefore.rack || "").toString().trim();
  var stabilizer = (snAfter.stabilizer || eff.stabilizer || snBefore.stabilizer || "").toString().trim();

  var siteName = (data.siteName || "").toString().trim();
  var siteOwner = (data.siteOwner || "").toString().trim();
  var techName = (data.techName || "").toString().trim();
  var now = new Date();

  var lastRow = snSheet.getLastRow();
  var foundRow = -1;

  if (lastRow > 1) {
    // Cari Site ID di Kolom A
    var idRange = snSheet.getRange(2, 1, lastRow - 1, 1).getValues();
    for (var i = 0; i < idRange.length; i++) {
      if (idRange[i][0] && idRange[i][0].toString().trim().toUpperCase() === siteId.toUpperCase()) {
        foundRow = i + 2; // Baris riil di sheet (1-indexed)
        break;
      }
    }
  }

  if (foundRow > 0) {
    // Baris ditemukan: perbarui dengan SN Sesudah, pertahankan nilai lama jika field kosong
    var existingRow = snSheet.getRange(foundRow, 1, 1, 13).getValues()[0];

    var finalModem = modem || existingRow[1] || "";
    var finalRouter = router || existingRow[2] || "";
    var finalApIndoor = apIndoor || existingRow[3] || "";
    var finalApOutdoor = apOutdoor || existingRow[4] || "";
    var finalAntenna = antenna || existingRow[5] || "";
    var finalBuc = buc || existingRow[6] || "";
    var finalRack = rack || existingRow[7] || "";
    var finalStabilizer = stabilizer || existingRow[8] || "";
    var finalSiteName = siteName || existingRow[9] || "";
    var finalSiteOwner = siteOwner || existingRow[10] || "";

    var updatedRow = [
      siteId,
      finalModem,
      finalRouter,
      finalApIndoor,
      finalApOutdoor,
      finalAntenna,
      finalBuc,
      finalRack,
      finalStabilizer,
      finalSiteName,
      finalSiteOwner,
      now,
      techName
    ];

    snSheet.getRange(foundRow, 1, 1, updatedRow.length).setValues([updatedRow]);
    return { updated: true, action: "updated", row: foundRow, siteId: siteId };
  } else {
    // Site baru: tambahkan baris baru
    var newRow = [
      siteId,
      modem,
      router,
      apIndoor,
      apOutdoor,
      antenna,
      buc,
      rack,
      stabilizer,
      siteName,
      siteOwner,
      now,
      techName
    ];
    snSheet.appendRow(newRow);
    return { updated: true, action: "inserted", row: snSheet.getLastRow(), siteId: siteId };
  }
}

function setupDataSnHeaderIfEmpty(sheet) {
  if (sheet.getLastRow() === 0) {
    var headers = [
      "Site ID (Kode Lokasi)",
      "MODEM",
      "ROUTER",
      "AP Indoor",
      "AP Outdoor",
      "ANTENNA",
      "BUC",
      "RACK",
      "STABILIZER",
      "Nama Site",
      "Pemilik Site",
      "Terakhir Diperbarui",
      "Petugas / Teknisi"
    ];

    sheet.appendRow(headers);

    var headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground("#0f2942");
    headerRange.setFontColor("#ffffff");
    headerRange.setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "online",
    service: "BAKTI Maintenance Report API",
    timestamp: new Date()
  })).setMimeType(ContentService.MimeType.JSON);
}

function setupHeaderIfEmpty(sheet) {
  if (sheet.getLastRow() === 0) {
    var headers = [
      "Timestamp Input", "Pemilik Site", "Site ID", "Nama Site", "Alamat Site",
      "Provinsi", "Kabupaten", "Kelurahan/Desa", "Latitude", "Longitude",
      "Nama PIC", "No HP PIC", "Petugas / Teknisi", "Tanggal Kunjungan",
      "Waktu Tiba", "Waktu Selesai", "Kegiatan (CM/PM)", "Ringkasan Gangguan/Kondisi",
      "Link File PDF (.pdf)", "Link Folder Bukti & Foto (Drive)"
    ];

    sheet.appendRow(headers);

    var headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground("#0f2942");
    headerRange.setFontColor("#ffffff");
    headerRange.setFontWeight("bold");
    sheet.setFrozenRows(1);
  } else {
    try {
      var col19 = sheet.getRange(1, 19).getValue();
      if (col19 && col19.toString().indexOf("Word") > -1) {
        sheet.getRange(1, 19).setValue("Link File PDF (.pdf)");
      }
    } catch(e) {}
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

function saveBase64ToFolder(folder, base64Data, filename, mimeType) {
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
