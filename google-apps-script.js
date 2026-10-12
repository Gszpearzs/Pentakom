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

    // 1. Simpan Berkas Dokumen Word (.docx)
    var urlDocx = "";
    if (data.docxBase64) {
      urlDocx = saveBase64ToFolder(
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
      urlDocx,
      subFolder.getUrl()
    ];

    sheet.appendRow(rowData);

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Laporan berhasil disimpan ke Google Drive dan Google Sheets.",
      siteId: data.siteId,
      docxUrl: urlDocx,
      folderUrl: subFolder.getUrl()
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
      "Link File Word (.docx)", "Link Folder Bukti & Foto (Drive)"
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
