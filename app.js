/**
 * LAPORAN PEMELIHARAAN BAKTI - APLIKASI WEB TEKNISI
 * Sesuai Format Resmi Dokumen BAKTI Kominfo
 */

// 1. DATA ITEM OUTDOOR & INDOOR
const OUTDOOR_ITEMS = [
  "Dish / Antenna VSAT(VSAT)",
  "Radio CPE (RL)",
  "Pedestal Dish/Tower Radio (VSAT & RL)",
  "Antenna Line of Sight (LOS) (VSAT & RL)",
  "Feed Horn (VSAT)",
  "LNA/LNB (VSAT)",
  "RF/BUC/ODU (VSAT)",
  "Konektor (VSAT; RL & FO)",
  "Kabel Grounding (VSAT & RL)",
  "Kekencangan Baut Antena/Tower (VSAT & RL)",
  "Perangkat Lain (VSAT; RL & FO)"
];

const INDOOR_ITEMS = [
  "Modem",
  "Router",
  "POE",
  "Antenna Line of Sight (LOS) (VSAT & RL)",
  "Access Point#1",
  "Access Point#2",
  "RF/BUC/ODU (VSAT)",
  "Kabel Utp Modem - Router",
  "Kabel Utp Router - Access Point#1",
  "Konektor RJ 45",
  "Konektor RG 6 /RG 11 /RG 8",
  "Kabel Grounding",
  "Label Perangkat",
  "Stabilizer",
  "Wallmount Rack",
  "Perangkat lain"
];

const SN_ITEMS = [
  "AP Indoor",
  "AP Outdoor",
  "ROUTER",
  "MODEM",
  "ANTENNA",
  "BUC",
  "RACK",
  "STABILIZER"
];

// 2. PASANGAN FOTO DOKUMENTASI (SESUAI DOKUMEN RESMI BAKTI HALAMAN 5 - 10)
const PHOTO_PAIRS = [
  {
    title: "Sumber Listrik & Plang Lokasi",
    left:  { id: "p_power_src", label: "Sumber Listrik (PLN/Genset/PLTS/UPS)" },
    right: { id: "p_tech_id",   label: "Foto teknisi di depan Info Nama Lokasi" }
  },
  {
    title: "Modem",
    left:  { id: "p_modem_b", label: "Foto Modem (sebelum)" },
    right: { id: "p_modem_a", label: "Foto Modem (sesudah)" }
  },
  {
    title: "Router",
    left:  { id: "p_router_b", label: "Foto Router (sebelum)" },
    right: { id: "p_router_a", label: "Foto Router (sesudah)" }
  },
  {
    title: "Access Point #1",
    left:  { id: "p_ap1_b", label: "Foto Access Point#1 (sebelum)" },
    right: { id: "p_ap1_a", label: "Foto Access Point#1 (sesudah)" }
  },
  {
    title: "Access Point #2",
    left:  { id: "p_ap2_b", label: "Foto Access Point#2 (sebelum)" },
    right: { id: "p_ap2_a", label: "Foto Access Point#2 (sesudah)" }
  },
  {
    title: "Antenna (Tampak Seluruh ODU)",
    left:  { id: "p_ant_odu_b", label: "Foto Antenna (sebelum)-> tampak seluruh ODU" },
    right: { id: "p_ant_odu_a", label: "Foto Antenna (sesudah)-> tampak seluruh ODU" }
  },
  {
    title: "Antenna (Posisi/Tampak LOS)",
    left:  { id: "p_ant_los_b", label: "Foto Antenna (sebelum)-> Posisi/tampak LOS" },
    right: { id: "p_ant_los_a", label: "Foto Antenna (sesudah)-> Posisi/tampak LOS" }
  },
  {
    title: "Transceiver / BUC dan LNB",
    left:  { id: "p_buc_b", label: "Foto Transceiver / BUC & LNB (sebelum)" },
    right: { id: "p_buc_a", label: "Foto BUC dan LNB (sesudah)" }
  },
  {
    title: "Stabilizer",
    left:  { id: "p_stab_b", label: "Foto Stabilizer (sebelum)" },
    right: { id: "p_stab_a", label: "Foto Stabilizer (sesudah)" }
  },
  {
    title: "Wallmount Rack",
    left:  { id: "p_rack_b", label: "Foto Wallmount Rack (sebelum)" },
    right: { id: "p_rack_a", label: "Foto Wallmount Rack (sesudah)" }
  },
  {
    title: "Kabel Grounding",
    left:  { id: "p_ground_b", label: "Foto Grounding (sebelum)" },
    right: { id: "p_ground_a", label: "Foto Grounding (sesudah)" }
  },
  {
    title: "Label Perangkat",
    left:  { id: "p_label_b", label: "Foto Label Perangkat (sebelum)" },
    right: { id: "p_label_a", label: "Foto Label Perangkat (sesudah)" }
  },
  {
    title: "Speedtest Server International - SSID NAMA LOKASI",
    left:  { id: "p_spd_lokasi_b", label: "Capture Speedtest Nama Lokasi (sebelum)" },
    right: { id: "p_spd_lokasi_a", label: "Capture Speedtest Nama Lokasi (sesudah)" }
  },
  {
    title: "Speedtest Server International - SSID BAKTI AKSI",
    left:  { id: "p_spd_bakti_b", label: "Capture Speedtest BAKTI AKSI (sebelum)" },
    right: { id: "p_spd_bakti_a", label: "Capture Speedtest BAKTI AKSI (sesudah)" }
  },
  {
    title: "Wifi Analyzer AP#1",
    left:  { id: "p_wifi_ap1_b", label: "Foto Wifi Analyzer AP#1 (sebelum)" },
    right: { id: "p_wifi_ap1_a", label: "Foto Wifi Analyzer AP#1 (sesudah)" }
  },
  {
    title: "Wifi Analyzer AP#2 - BAKTI AKSI",
    left:  { id: "p_wifi_ap2_b", label: "Foto Wifi Analyzer AP#2 (sebelum)" },
    right: { id: "p_wifi_ap2_a", label: "Foto Wifi Analyzer AP#2 (sesudah)" }
  },
  {
    title: "Dokumen Berita Acara (BA)",
    left:  { id: "p_ba_scan", label: "Scan Berita Acara Maintenance" },
    right: { id: "p_ba_doc",  label: "Dokumen Pendukung Lainnya" }
  }
];

// State Storage
const outdoorState = {};
const indoorState = {};
const photos = {};

// Inisialisasi
document.addEventListener("DOMContentLoaded", () => {
  initDateDefaults();
  loadCustomLocations();
  initSiteDatalists();
  renderInspectionTables();
  renderSnTable();
  renderPhotoPairs();
  loadConfig();
  restoreDraft();
  setupAutoSave();
});

// Memuat data teknis kustom dari localStorage jika ada
function loadCustomLocations() {
  try {
    const raw = localStorage.getItem("pentakom_custom_locations");
    if (raw) {
      const custom = JSON.parse(raw);
      if (Array.isArray(custom) && custom.length > 0) {
        if (typeof LOCATION_DB !== "undefined" && Array.isArray(LOCATION_DB)) {
          const map = new Map(LOCATION_DB.map((s) => [s.id, s]));
          custom.forEach((c) => {
            if (c.id) map.set(c.id, c);
          });
          LOCATION_DB.length = 0;
          LOCATION_DB.push(...map.values());
        }
      }
    }
  } catch (e) {
    console.warn("Gagal membaca custom locations:", e);
  }
}

// Impor file data teknis (.xlsx / .csv) langsung dari browser
function importDataTeknisFile(event) {
  const file = event.target.files[0];
  if (!file) return;

  const isXlsx = file.name.endsWith(".xlsx") || file.name.endsWith(".xls");
  const reader = new FileReader();

  reader.onload = function(e) {
    try {
      let rows = [];
      if (isXlsx && typeof XLSX !== "undefined") {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const firstSheet = workbook.SheetNames[0];
        rows = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheet]);
      } else {
        const text = typeof e.target.result === "string" ? e.target.result : new TextDecoder().decode(e.target.result);
        rows = parseCsvToObjects(text);
      }

      if (!rows || rows.length === 0) {
        alert("File kosong atau format tidak sesuai.");
        return;
      }

      // Helper pencari nilai kolom fleksibel (mendukung format Gambar 1)
      const cleanKey = (k) => String(k || "").toLowerCase().replace(/[^a-z0-9]/g, "");
      const getVal = (r, candidates) => {
        // 1. Direct key lookup
        for (const c of candidates) {
          if (r[c] !== undefined && r[c] !== null && String(r[c]).trim() !== "") {
            return String(r[c]).trim();
          }
        }
        // 2. Normalized key lookup
        const rKeys = Object.keys(r);
        for (const c of candidates) {
          const target = cleanKey(c);
          for (const k of rKeys) {
            const ck = cleanKey(k);
            if (ck === target || ck.includes(target)) {
              if (r[k] !== undefined && r[k] !== null && String(r[k]).trim() !== "") {
                return String(r[k]).trim();
              }
            }
          }
        }
        return "";
      };

      const imported = [];
      rows.forEach((r) => {
        const id = getVal(r, ["SITE ID ( KODE LOKASI )", "SITE_ID", "Site ID", "ID", "KODE LOKASI"]);
        const nama = getVal(r, ["NAMA SITE ( NAMA LOKASI )", "NAMA_SITE", "Nama Site", "Nama", "NAMA LOKASI"]);
        if (!id && !nama) return;

        const rawOwner = getVal(r, ["PEMILIK SITE", "PEMILIK_SITE", "Pemilik Site", "Pemilik"]);
        const pemilik = normalizeOwnerName(rawOwner);
        const alamat = getVal(r, ["ALAMAT LENGKAP SITE / LOKASI", "ALAMAT", "Alamat Lengkap", "Alamat"]);
        const provinsi = getVal(r, ["PROVINSI", "Provinsi"]);
        const kabupaten = getVal(r, ["KABUPATEN / KOTA", "KABUPATEN_KOTA", "Kabupaten", "Kota"]);
        const desa = getVal(r, ["KELURAHAN / DESA", "KELURAHAN_DESA", "Kelurahan", "Desa"]);
        const latRaw = getVal(r, ["LATITUDE (DESIMAL)", "LATITUDE", "Latitude", "Lat"]);
        const lonRaw = getVal(r, ["LONGITUDE (DESIMAL)", "LONGITUDE", "Longitude", "Lon", "Long"]);

        imported.push({
          id: id,
          nama: nama,
          pemilik: pemilik,
          tipe: getVal(r, ["TIPE_LOKASI", "Tipe Lokasi", "Tipe"]) || "Kantor Pemerintahan",
          kategori: getVal(r, ["KATEGORI", "Kategori"]),
          alamat: alamat,
          provinsi: provinsi,
          kabupaten: kabupaten,
          desa: desa,
          lat: parseFloat(latRaw) || latRaw,
          lon: parseFloat(lonRaw) || lonRaw,
          sn: {
            modem: getVal(r, ["SN_MODEM", "SN MODEM", "MODEM"]),
            router: getVal(r, ["SN_ROUTER", "SN ROUTER", "ROUTER"]),
            ap1: getVal(r, ["SN_AP_INDOOR", "SN AP INDOOR", "AP1", "AP INDOOR"]),
            ap2: getVal(r, ["SN_AP_OUTDOOR", "SN AP OUTDOOR", "AP2", "AP OUTDOOR"]),
            antenna: getVal(r, ["SN_ANTENNA", "SN ANTENNA", "ANTENNA"]),
            transiver: getVal(r, ["SN_BUC_TRANSCEIVER", "SN BUC", "BUC", "TRANSCEIVER"]),
            rack: getVal(r, ["SN_RACK", "SN RACK", "RACK"]),
            stabilizer: getVal(r, ["SN_STABILIZER", "SN STABILIZER", "STABILIZER"])
          }
        });
      });

      if (imported.length === 0) {
        alert("Tidak ada baris data site valid yang ditemukan di file.");
        return;
      }

      // Simpan ke localStorage
      localStorage.setItem("pentakom_custom_locations", JSON.stringify(imported));

      // Gabungkan ke LOCATION_DB
      if (typeof LOCATION_DB !== "undefined" && Array.isArray(LOCATION_DB)) {
        const map = new Map(LOCATION_DB.map((s) => [s.id, s]));
        imported.forEach((c) => {
          if (map.has(c.id)) {
            const existing = map.get(c.id);
            // Merge SN jika ada
            c.sn = { ...existing.sn, ...c.sn };
            map.set(c.id, { ...existing, ...c });
          } else {
            map.set(c.id, c);
          }
        });
        LOCATION_DB.length = 0;
        LOCATION_DB.push(...map.values());
      }

      const curOwner = document.getElementById("siteOwner") ? document.getElementById("siteOwner").value : "";
      initSiteDatalists(curOwner);

      const importMsg = document.getElementById("importMsg");
      if (importMsg) {
        importMsg.textContent = `✓ ${imported.length} site berhasil diimpor!`;
        setTimeout(() => { importMsg.textContent = ""; }, 4000);
      }

      alert(`Sukses! ${imported.length} data teknis site berhasil diimpor ke dalam form dan siap digunakan untuk auto-fill.`);
    } catch (err) {
      alert("Gagal memproses file: " + err.message);
    }
  };

  if (isXlsx) {
    reader.readAsArrayBuffer(file);
  } else {
    reader.readAsText(file);
  }
}

// Helper parser CSV fleksibel (Mendukung pemisah semicolon ';' dan comma ',')
function parseCsvToObjects(text) {
  const clean = text.replace(/^\uFEFF/, "");
  const lines = clean.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length < 2) return [];

  const firstLine = lines[0];
  const semiCount = (firstLine.match(/;/g) || []).length;
  const commaCount = (firstLine.match(/,/g) || []).length;
  const tabCount = (firstLine.match(/\t/g) || []).length;
  let sep = ",";
  if (semiCount > commaCount && semiCount > tabCount) sep = ";";
  else if (tabCount > commaCount && tabCount > semiCount) sep = "\t";

  const splitLine = (l) => {
    if (sep === ";") {
      return l.split(/;(?=(?:(?:[^"]*"){2})*[^"]*$)/).map((c) => c.replace(/^["']|["']$/g, "").trim());
    } else if (sep === "\t") {
      return l.split(/\t/).map((c) => c.replace(/^["']|["']$/g, "").trim());
    } else {
      return l.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map((c) => c.replace(/^["']|["']$/g, "").trim());
    }
  };

  const headers = splitLine(lines[0]);
  const list = [];

  for (let i = 1; i < lines.length; i++) {
    const cols = splitLine(lines[i]);
    const obj = {};
    headers.forEach((h, idx) => {
      obj[h] = cols[idx] !== undefined ? cols[idx] : "";
    });
    list.push(obj);
  }
  return list;
}

// Normalisasi nama pemilik site untuk kecocokan fleksibel
function normalizeOwnerName(str) {
  if (!str) return "";
  const s = str.toUpperCase().replace(/\./g, "").replace(/\s+/g, " ").trim();
  if (s.includes("PRIMACOM")) return "PT Primacom Interbuana";
  if (s.includes("TRANSTEL")) return "PT Transtel Universal";
  if (s.includes("DUTAKOM")) return "PT Dutakom Wibawa Putra";
  return str.trim();
}

// Inisialisasi Datalist Pencarian Site (Mendukung Filter per Pemilik Site)
function initSiteDatalists(filterOwner = "") {
  if (typeof LOCATION_DB === "undefined" || !Array.isArray(LOCATION_DB)) return;
  const dlId = document.getElementById("siteIdDatalist");
  const dlName = document.getElementById("siteNameDatalist");
  if (!dlId || !dlName) return;

  dlId.innerHTML = "";
  dlName.innerHTML = "";

  const normTarget = normalizeOwnerName(filterOwner);
  const isAll = !filterOwner || filterOwner === "ALL";

  let filtered = LOCATION_DB;
  if (!isAll && normTarget) {
    filtered = LOCATION_DB.filter((loc) => {
      const locOwner = normalizeOwnerName(loc.pemilik || "");
      return locOwner === normTarget;
    });
  }

  filtered.forEach((loc) => {
    const optId = document.createElement("option");
    optId.value = loc.id;
    optId.label = loc.nama;
    optId.textContent = `${loc.id} - ${loc.nama}`;
    dlId.appendChild(optId);

    const optName = document.createElement("option");
    optName.value = loc.nama;
    optName.label = loc.id;
    optName.textContent = `${loc.nama} (${loc.id})`;
    dlName.appendChild(optName);
  });

  const statusEl = document.getElementById("ownerFilterStatus");
  if (statusEl) {
    if (!isAll && normTarget) {
      statusEl.innerHTML = `🔍 Menampilkan <strong>${filtered.length} site</strong> milik <strong>${normTarget}</strong>.`;
      statusEl.style.color = "var(--accent)";
    } else {
      statusEl.innerHTML = `🌐 Menampilkan semua <strong>${filtered.length} site</strong>.`;
      statusEl.style.color = "var(--muted)";
    }
  }
}

// Handler saat Pemilik Site Dipilih di Dropdown
function handleOwnerFilter(ownerValue) {
  initSiteDatalists(ownerValue);

  // Jika input siteId atau siteName sudah terisi, periksa apakah masih sesuai pemilik
  const curSiteId = (document.getElementById("siteId").value || "").trim().toLowerCase();
  const curSiteName = (document.getElementById("siteName").value || "").trim().toLowerCase();
  
  if (ownerValue && ownerValue !== "ALL" && (curSiteId || curSiteName)) {
    const normTarget = normalizeOwnerName(ownerValue);
    const stillValid = LOCATION_DB.some((loc) => {
      const locOwner = normalizeOwnerName(loc.pemilik || "");
      if (locOwner !== normTarget) return false;
      return loc.id.toLowerCase() === curSiteId || loc.nama.toLowerCase() === curSiteName;
    });

    if (!stillValid) {
      document.getElementById("siteId").value = "";
      document.getElementById("siteName").value = "";
      document.getElementById("siteAddress").value = "";
      document.getElementById("province").value = "";
      document.getElementById("kabupaten").value = "";
      document.getElementById("desa").value = "";
      document.getElementById("latitude").value = "";
      document.getElementById("longitude").value = "";
      SN_ITEMS.forEach((_, idx) => {
        const elB = document.getElementById(`sn_b_${idx}`);
        if (elB) elB.value = "";
      });
      const notice = document.getElementById("siteAutoFillNotice");
      if (notice) notice.style.display = "none";
      const snNotice = document.getElementById("snAutofillStatus");
      if (snNotice) snNotice.style.display = "none";
    }
  }

  saveDraft();
}

// Auto-Fill Otomatis dari Data Teknis saat Site Dipilih / Diketik
function handleSiteSelect(query, type) {
  if (typeof LOCATION_DB === "undefined" || !Array.isArray(LOCATION_DB)) return;
  if (!query || query.trim().length < 2) return;

  const q = query.trim().toLowerCase();
  const ownerEl = document.getElementById("siteOwner");
  const currentOwner = ownerEl ? ownerEl.value : "";
  const normCurrentOwner = (currentOwner && currentOwner !== "ALL") ? normalizeOwnerName(currentOwner) : "";

  // Prioritaskan pencarian di kumpulan site milik pemilik yang sedang dipilih
  let pool = LOCATION_DB;
  if (normCurrentOwner) {
    const ownerPool = LOCATION_DB.filter((loc) => normalizeOwnerName(loc.pemilik || "") === normCurrentOwner);
    if (ownerPool.length > 0) pool = ownerPool;
  }

  // 1. Cari exact match terlebih dahulu di pool
  let match = pool.find((loc) => {
    if (type === "id") {
      return loc.id.toLowerCase() === q;
    } else {
      return loc.nama.toLowerCase() === q;
    }
  });

  // 2. Jika tidak cocok, coba exact match silang di pool
  if (!match) {
    match = pool.find((loc) => loc.id.toLowerCase() === q || loc.nama.toLowerCase() === q);
  }

  // 3. Jika belum cocok di pool terfilter, cari di seluruh database
  if (!match) {
    match = LOCATION_DB.find((loc) => loc.id.toLowerCase() === q || loc.nama.toLowerCase() === q);
  }

  const notice = document.getElementById("siteAutoFillNotice");

  if (match) {
    // 1. Sinkronisasi Pemilik Site otomatis
    if (match.pemilik && ownerEl) {
      const normMatchOwner = normalizeOwnerName(match.pemilik);
      let optFound = false;
      for (let i = 0; i < ownerEl.options.length; i++) {
        if (normalizeOwnerName(ownerEl.options[i].value) === normMatchOwner) {
          ownerEl.selectedIndex = i;
          optFound = true;
          break;
        }
      }
      if (!optFound && normMatchOwner) {
        const newOpt = document.createElement("option");
        newOpt.value = normMatchOwner;
        newOpt.textContent = normMatchOwner;
        ownerEl.appendChild(newOpt);
        ownerEl.value = normMatchOwner;
      }
      initSiteDatalists(normMatchOwner);
    }

    // 2. Informasi Lokasi & Administrasi (Gambar 1)
    const elSiteId = document.getElementById("siteId");
    const elSiteName = document.getElementById("siteName");
    if (elSiteId) elSiteId.value = match.id;
    if (elSiteName) elSiteName.value = match.nama;
    if (match.alamat) document.getElementById("siteAddress").value = match.alamat;
    if (match.provinsi) document.getElementById("province").value = match.provinsi;
    if (match.kabupaten) document.getElementById("kabupaten").value = match.kabupaten;
    if (match.desa) document.getElementById("desa").value = match.desa;
    if (match.lat) document.getElementById("latitude").value = match.lat;
    if (match.lon) document.getElementById("longitude").value = match.lon;

    // 3. Serial Number Perangkat Terpasang (Halaman 4 - Bagian VI)
    // Otomatis terisi jika ada data SN, dan abaikan kolom SN yang kosong (biarkan blank)
    let snCount = 0;
    if (match.sn) {
      const setSn = (id, val) => {
        const el = document.getElementById(id);
        if (el) {
          const clean = (val !== null && val !== undefined) ? String(val).trim() : "";
          el.value = clean;
          if (clean) snCount++;
        }
      };
      setSn("sn_b_0", match.sn.ap1);
      setSn("sn_b_1", match.sn.ap2);
      setSn("sn_b_2", match.sn.router);
      setSn("sn_b_3", match.sn.modem);
      setSn("sn_b_4", match.sn.antenna);
      setSn("sn_b_5", match.sn.transiver);
      setSn("sn_b_6", match.sn.rack);
      setSn("sn_b_7", match.sn.stabilizer);
    }

    // Update banner status di Halaman 4 (Tab 4)
    const snNotice = document.getElementById("snAutofillStatus");
    if (snNotice) {
      if (snCount > 0) {
        snNotice.style.display = "block";
        snNotice.innerHTML = `✅ <strong>Auto-Fill SN Berhasil:</strong> Otomatis mengisi <strong>${snCount} nomor seri</strong> perangkat dari Site ID: <em>${match.id}</em> (${match.nama}). Kolom yang tidak memiliki nomor seri dibiarkan kosong.`;
        snNotice.style.background = "#e8f8f5";
        snNotice.style.color = "#117a65";
        snNotice.style.border = "1px solid #a3e4d7";
      } else {
        snNotice.style.display = "block";
        snNotice.innerHTML = `ℹ️ Site ID <strong>${match.id}</strong> (${match.nama}) tidak memiliki data nomor seri (SN) tersimpan. Kolom nomor seri dibiarkan kosong.`;
        snNotice.style.background = "#fef9e7";
        snNotice.style.color = "#7d6608";
        snNotice.style.border = "1px solid #f9e79f";
      }
    }

    // Update notice di Halaman 1 (Tab 1)
    if (notice) {
      notice.style.display = "block";
      const ownerLabel = match.pemilik ? ` [${match.pemilik}]` : "";
      const snLabel = snCount > 0 ? ` & ${snCount} Serial Number perangkat (Halaman 4)` : "";
      notice.innerHTML = `✅ <strong>Auto-Fill Berhasil:</strong> Data teknis <em>${match.nama}</em> (${match.id})${ownerLabel} telah otomatis mengisi Alamat, Provinsi, Kabupaten, Koordinat GPS${snLabel}!`;
      notice.style.background = "#e8f8f5";
      notice.style.color = "#117a65";
      notice.style.border = "1px solid #a3e4d7";
    }

    saveDraft();
  }
}

// Salin SN Sebelum ke Sesudah (Jika Perangkat Tidak Diganti)
function copySnBeforeToAfter() {
  let copied = 0;
  SN_ITEMS.forEach((_, idx) => {
    const elB = document.getElementById(`sn_b_${idx}`);
    const elA = document.getElementById(`sn_a_${idx}`);
    if (elB && elA && elB.value.trim() && !elA.value.trim()) {
      elA.value = elB.value.trim();
      copied++;
    }
  });
  saveDraft();
  if (copied > 0) {
    alert(`Berhasil menyalin ${copied} nomor seri dari kolom Sebelum ke Sesudah.`);
  } else {
    alert("Kolom SN Sesudah sudah terisi atau kolom SN Sebelum masih kosong.");
  }
}

// Bersihkan / Kosongkan Semua Kolom SN Perangkat (Sebelum & Sesudah)
function clearAllSn() {
  if (!confirm("Apakah Anda yakin ingin mengosongkan seluruh nomor seri (SN) perangkat pada tabel ini?")) return;
  SN_ITEMS.forEach((_, idx) => {
    const elB = document.getElementById(`sn_b_${idx}`);
    const elA = document.getElementById(`sn_a_${idx}`);
    if (elB) elB.value = "";
    if (elA) elA.value = "";
  });
  const snNotice = document.getElementById("snAutofillStatus");
  if (snNotice) snNotice.style.display = "none";
  saveDraft();
}

// Tab Switcher
function switchTab(index) {
  document.querySelectorAll(".nav-tab").forEach((tab, i) => {
    tab.classList.toggle("active", i === index);
  });
  document.querySelectorAll(".section-panel").forEach((panel, i) => {
    panel.classList.toggle("active", i === index);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Config URL
function toggleConfig() {
  document.getElementById("configBox").classList.toggle("show");
}
function saveConfig() {
  const url = document.getElementById("cfgGasUrl").value.trim();
  localStorage.setItem("bakti_gas_url", url);
  const msg = document.getElementById("cfgMsg");
  msg.textContent = "✔ URL Tersimpan!";
  setTimeout(() => { msg.textContent = ""; }, 2500);
}
function loadConfig() {
  document.getElementById("cfgGasUrl").value = localStorage.getItem("bakti_gas_url") || "";
}

// Tanggal Default
function initDateDefaults() {
  const now = new Date();
  document.getElementById("workDate").value = now.toISOString().slice(0, 10);
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  document.getElementById("timeArrival").value = `${hh}:${mm}`;
}

// GPS Auto Detect
function getGpsLocation() {
  if (!navigator.geolocation) {
    alert("Perangkat Anda tidak mendukung fitur Geolocation.");
    return;
  }
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      document.getElementById("latitude").value = pos.coords.latitude.toFixed(6);
      document.getElementById("longitude").value = pos.coords.longitude.toFixed(6);
      alert(`✔ Koordinat berhasil diambil:\nLat: ${pos.coords.latitude.toFixed(6)}\nLon: ${pos.coords.longitude.toFixed(6)}`);
      saveDraft();
    },
    (err) => {
      alert("Gagal membaca GPS: " + err.message + ". Pastikan izin lokasi aktif.");
    },
    { enableHighAccuracy: true, timeout: 10000 }
  );
}

// Render Tabel Outdoor & Indoor
function renderInspectionTables() {
  const tbOutdoor = document.getElementById("tbodyOutdoor");
  tbOutdoor.innerHTML = "";
  OUTDOOR_ITEMS.forEach((name, i) => {
    outdoorState[i] = { before: "Berfungsi", after: "Berfungsi" };
    tbOutdoor.appendChild(createInspectionRow("out", i, name, outdoorState[i]));
  });

  const tbIndoor = document.getElementById("tbodyIndoor");
  tbIndoor.innerHTML = "";
  INDOOR_ITEMS.forEach((name, i) => {
    indoorState[i] = { before: "Berfungsi", after: "Berfungsi" };
    tbIndoor.appendChild(createInspectionRow("in", i, name, indoorState[i]));
  });
}

function createInspectionRow(prefix, idx, name, stateObj) {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td><div class="item-name">${name}</div></td>
    <td>
      <div class="toggle-btn-group">
        <button type="button" class="btn-fn active-ok" id="btn_${prefix}_${idx}_b_ok" onclick="setFnState('${prefix}', ${idx}, 'before', 'Berfungsi')">Berfungsi</button>
        <button type="button" class="btn-fn" id="btn_${prefix}_${idx}_b_bad" onclick="setFnState('${prefix}', ${idx}, 'before', 'Tidak Berfungsi')">Tidak</button>
      </div>
    </td>
    <td>
      <div class="toggle-btn-group">
        <button type="button" class="btn-fn active-ok" id="btn_${prefix}_${idx}_a_ok" onclick="setFnState('${prefix}', ${idx}, 'after', 'Berfungsi')">Berfungsi</button>
        <button type="button" class="btn-fn" id="btn_${prefix}_${idx}_a_bad" onclick="setFnState('${prefix}', ${idx}, 'after', 'Tidak Berfungsi')">Tidak</button>
      </div>
    </td>
  `;
  return tr;
}

function setFnState(prefix, idx, phase, status) {
  const target = prefix === "out" ? outdoorState[idx] : indoorState[idx];
  target[phase] = status;

  const btnOk = document.getElementById(`btn_${prefix}_${idx}_${phase === 'before' ? 'b' : 'a'}_ok`);
  const btnBad = document.getElementById(`btn_${prefix}_${idx}_${phase === 'before' ? 'b' : 'a'}_bad`);

  if (status === "Berfungsi") {
    btnOk.className = "btn-fn active-ok";
    btnBad.className = "btn-fn";
  } else {
    btnOk.className = "btn-fn";
    btnBad.className = "btn-fn active-bad";
  }
  saveDraft();
}

function setAllFn(group, status) {
  const items = group === "outdoor" ? OUTDOOR_ITEMS : INDOOR_ITEMS;
  const prefix = group === "outdoor" ? "out" : "in";
  items.forEach((_, idx) => {
    setFnState(prefix, idx, "before", status);
    setFnState(prefix, idx, "after", status);
  });
}

// Render SN Perangkat
function renderSnTable() {
  const tbody = document.getElementById("tbodySn");
  tbody.innerHTML = "";
  SN_ITEMS.forEach((snItem, idx) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><strong>${idx + 1}. ${snItem}</strong></td>
      <td><input type="text" id="sn_b_${idx}" placeholder="SN Sebelum..."></td>
      <td><input type="text" id="sn_a_${idx}" placeholder="SN Sesudah..."></td>
    `;
    tbody.appendChild(tr);
  });
}

// Render Foto Berpasangan
function renderPhotoPairs() {
  const container = document.getElementById("photoPairsContainer");
  container.innerHTML = "";

  PHOTO_PAIRS.forEach((pair) => {
    const wrap = document.createElement("div");
    wrap.className = "card";
    wrap.style.padding = "10px 12px";
    wrap.style.marginBottom = "10px";
    wrap.innerHTML = `
      <div style="font-size:.82rem; font-weight:800; color:var(--navy); margin-bottom:8px;">📌 ${pair.title}</div>
      <div class="photo-pair-grid">
        ${renderPhotoBoxHtml(pair.left)}
        ${renderPhotoBoxHtml(pair.right)}
      </div>
    `;
    container.appendChild(wrap);
  });
}

function renderPhotoBoxHtml(p) {
  return `
    <div class="photo-card" id="card_${p.id}">
      <div class="photo-title">${p.label}</div>
      <div class="photo-box" id="box_${p.id}" onclick="document.getElementById('file_${p.id}').click()">
        <span id="ph_${p.id}">📷 Klik / Pilih Foto</span>
      </div>
      <div class="photo-actions">
        <label class="btn-choose" for="file_${p.id}">Pilih Foto</label>
        <button type="button" class="btn-del" onclick="clearPhoto('${p.id}')">Hapus</button>
      </div>
      <input type="file" id="file_${p.id}" accept="image/*" capture="environment" onchange="uploadPhoto('${p.id}', this)">
    </div>
  `;
}

async function uploadPhoto(photoId, inputEl) {
  const file = inputEl.files[0];
  if (!file) return;
  try {
    const b64 = await compressImg(file, 1200, 0.72);
    photos[photoId] = b64;
    document.getElementById(`box_${photoId}`).innerHTML = `<img src="${b64}">`;
    document.getElementById(`card_${photoId}`).classList.add("filled");
  } catch (err) {
    alert("Gagal memproses foto: " + err.message);
  }
}

function clearPhoto(photoId) {
  photos[photoId] = null;
  const inputEl = document.getElementById(`file_${photoId}`);
  if (inputEl) inputEl.value = "";
  document.getElementById(`box_${photoId}`).innerHTML = `<span id="ph_${photoId}">📷 Klik / Pilih Foto</span>`;
  document.getElementById(`card_${photoId}`).classList.remove("filled");
}

function compressImg(file, maxDim, quality) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        const c = document.createElement("canvas");
        c.width = width;
        c.height = height;
        const ctx = c.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        resolve(c.toDataURL("image/jpeg", quality));
      };
      img.onerror = () => reject(new Error("Format gambar tidak didukung"));
      img.src = e.target.result;
    };
    r.onerror = () => reject(new Error("Gagal membaca file gambar"));
    r.readAsDataURL(file);
  });
}

// Auto Save Local Draft
function setupAutoSave() {
  document.getElementById("baktiForm").addEventListener("input", debounce(saveDraft, 600));
}

function saveDraft() {
  const snData = {};
  SN_ITEMS.forEach((_, i) => {
    const elB = document.getElementById(`sn_b_${i}`);
    const elA = document.getElementById(`sn_a_${i}`);
    if (elB) snData[`sn_b_${i}`] = elB.value;
    if (elA) snData[`sn_a_${i}`] = elA.value;
  });

  const draft = {
    siteOwner: document.getElementById("siteOwner").value,
    siteId: document.getElementById("siteId").value,
    siteName: document.getElementById("siteName").value,
    siteAddress: document.getElementById("siteAddress").value,
    province: document.getElementById("province").value,
    kabupaten: document.getElementById("kabupaten").value,
    desa: document.getElementById("desa").value,
    latitude: document.getElementById("latitude").value,
    longitude: document.getElementById("longitude").value,
    kegiatanType: document.getElementById("kegiatanType").value,
    picName: document.getElementById("picName").value,
    picPhone: document.getElementById("picPhone").value,
    techName: document.getElementById("techName").value,
    workDate: document.getElementById("workDate").value,
    timeArrival: document.getElementById("timeArrival").value,
    timeDeparture: document.getElementById("timeDeparture").value,
    issueNotes: document.getElementById("issueNotes").value,
    upsBefore: document.getElementById("upsBefore") ? document.getElementById("upsBefore").value : "",
    upsAfter: document.getElementById("upsAfter") ? document.getElementById("upsAfter").value : "",
    stabBefore: document.getElementById("stabBefore") ? document.getElementById("stabBefore").value : "",
    stabAfter: document.getElementById("stabAfter") ? document.getElementById("stabAfter").value : "",
    powerSourceBefore: document.getElementById("powerSourceBefore") ? document.getElementById("powerSourceBefore").value : "",
    powerSourceAfter: document.getElementById("powerSourceAfter") ? document.getElementById("powerSourceAfter").value : "",
    opDays: document.getElementById("opDays") ? document.getElementById("opDays").value : "",
    opHours: document.getElementById("opHours") ? document.getElementById("opHours").value : "",
    voltInput: document.getElementById("voltInput") ? document.getElementById("voltInput").value : "",
    voltUps: document.getElementById("voltUps") ? document.getElementById("voltUps").value : "",
    voltStab: document.getElementById("voltStab") ? document.getElementById("voltStab").value : "",
    voltGround: document.getElementById("voltGround") ? document.getElementById("voltGround").value : "",
    foTx: document.getElementById("foTx") ? document.getElementById("foTx").value : "",
    foRx: document.getElementById("foRx") ? document.getElementById("foRx").value : "",
    foTemp: document.getElementById("foTemp") ? document.getElementById("foTemp").value : "",
    selular4g: document.getElementById("selular4g") ? document.getElementById("selular4g").value : "",
    operator4g: document.getElementById("operator4g") ? document.getElementById("operator4g").value : "",
    selular3g: document.getElementById("selular3g") ? document.getElementById("selular3g").value : "",
    operator3g: document.getElementById("operator3g") ? document.getElementById("operator3g").value : "",
    altRl: document.getElementById("altRl") ? document.getElementById("altRl").value : "",
    altFo: document.getElementById("altFo") ? document.getElementById("altFo").value : "",
    snData,
    outdoorState,
    indoorState
  };
  localStorage.setItem("bakti_report_draft", JSON.stringify(draft));
}

function restoreDraft() {
  try {
    const raw = localStorage.getItem("bakti_report_draft");
    if (!raw) return;
    const d = JSON.parse(raw);
    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if (el && val !== undefined && val !== null) el.value = val;
    };

    setVal("siteOwner", d.siteOwner);
    if (d.siteOwner) initSiteDatalists(d.siteOwner);
    setVal("siteId", d.siteId);
    setVal("siteName", d.siteName);
    setVal("siteAddress", d.siteAddress);
    setVal("province", d.province);
    setVal("kabupaten", d.kabupaten);
    setVal("desa", d.desa);
    setVal("latitude", d.latitude);
    setVal("longitude", d.longitude);
    setVal("kegiatanType", d.kegiatanType);
    setVal("picName", d.picName);
    setVal("picPhone", d.picPhone);
    setVal("techName", d.techName);
    setVal("workDate", d.workDate);
    setVal("timeArrival", d.timeArrival);
    setVal("timeDeparture", d.timeDeparture);
    setVal("issueNotes", d.issueNotes);
    setVal("upsBefore", d.upsBefore);
    setVal("upsAfter", d.upsAfter);
    setVal("stabBefore", d.stabBefore);
    setVal("stabAfter", d.stabAfter);
    setVal("powerSourceBefore", d.powerSourceBefore);
    setVal("powerSourceAfter", d.powerSourceAfter);
    setVal("opDays", d.opDays);
    setVal("opHours", d.opHours);
    setVal("voltInput", d.voltInput);
    setVal("voltUps", d.voltUps);
    setVal("voltStab", d.voltStab);
    setVal("voltGround", d.voltGround);
    setVal("foTx", d.foTx);
    setVal("foRx", d.foRx);
    setVal("foTemp", d.foTemp);
    setVal("selular4g", d.selular4g);
    setVal("operator4g", d.operator4g);
    setVal("selular3g", d.selular3g);
    setVal("operator3g", d.operator3g);
    setVal("altRl", d.altRl);
    setVal("altFo", d.altFo);

    if (d.snData) {
      Object.keys(d.snData).forEach((k) => setVal(k, d.snData[k]));
    }
  } catch (e) {}
}

function debounce(fn, wait) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn.apply(this, args), wait); };
}

// -----------------------------------------------------------------------------
// GENERATE DOKUMEN WORD (.DOCX) - FORMAT 100% PERSIS DOKUMEN RESMI BAKTI
// -----------------------------------------------------------------------------
async function buildBaktiDocx() {
  if (typeof docx === "undefined") {
    throw new Error("Pustaka docx belum siap dimuat.");
  }
  const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, AlignmentType, HeadingLevel, ImageRun } = docx;

  const siteOwner = document.getElementById("siteOwner").value;
  const siteId = document.getElementById("siteId").value || "-";
  const siteName = document.getElementById("siteName").value || "-";
  const siteAddress = document.getElementById("siteAddress").value || "-";
  const province = document.getElementById("province").value || "-";
  const kabupaten = document.getElementById("kabupaten").value || "-";
  const desa = document.getElementById("desa").value || "-";
  const latitude = document.getElementById("latitude").value || "-";
  const longitude = document.getElementById("longitude").value || "-";
  const picName = document.getElementById("picName").value || "-";
  const picPhone = document.getElementById("picPhone").value || "-";
  const techName = document.getElementById("techName").value || "-";
  const workDate = document.getElementById("workDate").value || "-";
  const timeArrival = document.getElementById("timeArrival").value || "-";
  const timeDeparture = document.getElementById("timeDeparture").value || "-";
  const kegiatanType = document.getElementById("kegiatanType").value;
  const issueNotes = document.getElementById("issueNotes").value || "Kondisi normal / Sesuai laporan.";

  function cellText(txt, bold = false, align = AlignmentType.LEFT) {
    return new TableCell({
      children: [new Paragraph({ alignment: align, children: [new TextRun({ text: txt, bold, size: 18 })] })]
    });
  }

  const docSections = [];

  // HALAMAN 1: HEADER & TABEL INFORMASI UMUM
  docSections.push(
    new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "LAPORAN PEMELIHARAAN", bold: true, size: 28 })] }),
    new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "BAKTI", bold: true, size: 26, color: "E53935" })] }),
    new Paragraph({ text: "" }),
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({ children: [cellText("Pemilik Site", true), cellText(siteOwner)] }),
        new TableRow({ children: [cellText("Site ID (Kode Lokasi)", true), cellText(siteId)] }),
        new TableRow({ children: [cellText("Nama Site (Nama Site/Lokasi)", true), cellText(siteName)] }),
        new TableRow({ children: [cellText("Alamat Site/Lokasi", true), cellText(siteAddress)] }),
        new TableRow({ children: [cellText("Provinsi", true), cellText(province)] }),
        new TableRow({ children: [cellText("Kabupaten", true), cellText(kabupaten)] }),
        new TableRow({ children: [cellText("Kelurahan/Desa", true), cellText(desa)] }),
        new TableRow({ children: [cellText("Latitude / Longitude", true), cellText(`Lat: ${latitude} | Lon: ${longitude}`)] }),
        new TableRow({ children: [cellText("Nama PIC Lokasi", true), cellText(picName)] }),
        new TableRow({ children: [cellText("No HP PIC Lokasi", true), cellText(picPhone)] }),
        new TableRow({ children: [cellText("Petugas (Nama Teknisi)", true), cellText(techName)] }),
        new TableRow({ children: [cellText("Tanggal Kedatangan", true), cellText(workDate)] }),
        new TableRow({ children: [cellText("Waktu Kedatangan & Selesai", true), cellText(`${timeArrival} s/d ${timeDeparture}`)] }),
        new TableRow({ children: [cellText("Kegiatan CM/PM", true), cellText(kegiatanType)] }),
        new TableRow({ children: [cellText("Jenis Layanan", true), cellText("On-Site")] })
      ]
    }),
    new Paragraph({ text: "" }),
    new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: "I. PENJELASAN RINGKAS KONDISI / GANGGUAN PADA SAAT KEDATANGAN", bold: true, size: 20 })] }),
    new Paragraph({ children: [new TextRun({ text: issueNotes, size: 18 })] }),
    new Paragraph({ text: "" }),

    // BAGIAN II: STATUS OUTDOOR
    new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: "II. STATUS OUTDOOR (SEBELUM & SESUDAH MAINTENANCE)", bold: true, size: 20 })] })
  );

  // Tabel Outdoor
  const outRows = [
    new TableRow({
      children: [
        cellText("ITEM FISIK OUTDOOR", true),
        cellText("SEBELUM", true, AlignmentType.CENTER),
        cellText("SESUDAH", true, AlignmentType.CENTER)
      ]
    })
  ];
  OUTDOOR_ITEMS.forEach((name, i) => {
    const st = outdoorState[i] || { before: "Berfungsi", after: "Berfungsi" };
    outRows.push(
      new TableRow({
        children: [
          cellText(name),
          cellText(st.before, false, AlignmentType.CENTER),
          cellText(st.after, false, AlignmentType.CENTER)
        ]
      })
    );
  });
  docSections.push(new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, rows: outRows }), new Paragraph({ text: "" }));

  // BAGIAN III: STATUS INDOOR
  docSections.push(
    new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: "III. STATUS INDOOR (SEBELUM & SESUDAH MAINTENANCE)", bold: true, size: 20 })] })
  );
  const inRows = [
    new TableRow({
      children: [
        cellText("ITEM FISIK INDOOR", true),
        cellText("SEBELUM", true, AlignmentType.CENTER),
        cellText("SESUDAH", true, AlignmentType.CENTER)
      ]
    })
  ];
  INDOOR_ITEMS.forEach((name, i) => {
    const st = indoorState[i] || { before: "Berfungsi", after: "Berfungsi" };
    inRows.push(
      new TableRow({
        children: [
          cellText(name),
          cellText(st.before, false, AlignmentType.CENTER),
          cellText(st.after, false, AlignmentType.CENTER)
        ]
      })
    );
  });
  docSections.push(new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, rows: inRows }), new Paragraph({ text: "" }));

  // BAGIAN IV: STATUS POWER & V. ALTERNATIF JARINGAN
  const upsB = document.getElementById("upsBefore") ? document.getElementById("upsBefore").value : "Tidak Ada";
  const upsA = document.getElementById("upsAfter") ? document.getElementById("upsAfter").value : "Tidak Ada";
  const stabB = document.getElementById("stabBefore") ? document.getElementById("stabBefore").value : "Ada";
  const stabA = document.getElementById("stabAfter") ? document.getElementById("stabAfter").value : "Ada";
  const pwrSrcB = document.getElementById("powerSourceBefore") ? document.getElementById("powerSourceBefore").value : "Listrik PLN";
  const pwrSrcA = document.getElementById("powerSourceAfter") ? document.getElementById("powerSourceAfter").value : "Listrik PLN";
  const opDays = document.getElementById("opDays") ? document.getElementById("opDays").value : "24 Jam";
  const opHours = document.getElementById("opHours") ? document.getElementById("opHours").value : "00.00-24.00";
  const vIn = document.getElementById("voltInput") ? document.getElementById("voltInput").value : "220 Volt";
  const vUps = document.getElementById("voltUps") ? document.getElementById("voltUps").value : "-";
  const vStab = document.getElementById("voltStab") ? document.getElementById("voltStab").value : "220 Volt";
  const vGnd = document.getElementById("voltGround") ? document.getElementById("voltGround").value : "0.8 Volt";

  docSections.push(
    new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: "IV. STATUS POWER", bold: true, size: 20 })] }),
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            cellText("PARAMETER POWER", true),
            cellText("SEBELUM", true, AlignmentType.CENTER),
            cellText("SESUDAH", true, AlignmentType.CENTER)
          ]
        }),
        new TableRow({
          children: [
            cellText("Fisik UPS", true),
            cellText(upsB, false, AlignmentType.CENTER),
            cellText(upsA, false, AlignmentType.CENTER)
          ]
        }),
        new TableRow({
          children: [
            cellText("Fisik Stabilizer", true),
            cellText(stabB, false, AlignmentType.CENTER),
            cellText(stabA, false, AlignmentType.CENTER)
          ]
        }),
        new TableRow({
          children: [
            cellText("Source Power", true),
            cellText(pwrSrcB, false, AlignmentType.CENTER),
            cellText(pwrSrcA, false, AlignmentType.CENTER)
          ]
        }),
        new TableRow({
          children: [
            cellText("Waktu Operasional", true),
            cellText(`Hari: ${opDays} | Jam: ${opHours}`, false, AlignmentType.CENTER),
            cellText(`Hari: ${opDays} | Jam: ${opHours}`, false, AlignmentType.CENTER)
          ]
        }),
        new TableRow({
          children: [
            cellText("Teg. Input Source Power", true),
            cellText(vIn, false, AlignmentType.CENTER),
            cellText(vIn, false, AlignmentType.CENTER)
          ]
        }),
        new TableRow({
          children: [
            cellText("Teg. Output UPS", true),
            cellText(vUps, false, AlignmentType.CENTER),
            cellText(vUps, false, AlignmentType.CENTER)
          ]
        }),
        new TableRow({
          children: [
            cellText("Teg. Output Stabilizer", true),
            cellText(vStab, false, AlignmentType.CENTER),
            cellText(vStab, false, AlignmentType.CENTER)
          ]
        }),
        new TableRow({
          children: [
            cellText("Teg. Grounding Power Source", true),
            cellText(vGnd, false, AlignmentType.CENTER),
            cellText(vGnd, false, AlignmentType.CENTER)
          ]
        })
      ]
    }),
    new Paragraph({ text: "" }),
    new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: "V. ALTERNATIF JARINGAN YANG ADA DI LOKASI", bold: true, size: 20 })] }),
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            cellText("JARINGAN ALTERNATIF", true),
            cellText("STATUS", true, AlignmentType.CENTER),
            cellText("NAMA OPERATOR", true)
          ]
        }),
        new TableRow({
          children: [
            cellText("Selular (4G)", true),
            cellText(document.getElementById("selular4g").value || "Tidak Ada", false, AlignmentType.CENTER),
            cellText(document.getElementById("operator4g").value || "-")
          ]
        }),
        new TableRow({
          children: [
            cellText("Selular (3G / 2G)", true),
            cellText(document.getElementById("selular3g").value || "Tidak Ada", false, AlignmentType.CENTER),
            cellText(document.getElementById("operator3g").value || "-")
          ]
        }),
        new TableRow({
          children: [
            cellText("Radio Link (RL)", true),
            cellText(document.getElementById("altRl").value || "Tidak Ada", false, AlignmentType.CENTER),
            cellText("-")
          ]
        }),
        new TableRow({
          children: [
            cellText("Fiber Optic (Sekitar / Terpasang)", true),
            cellText(document.getElementById("altFo").value || "Tidak Ada", false, AlignmentType.CENTER),
            cellText("-")
          ]
        })
      ]
    }),
    new Paragraph({ text: "" })
  );

  // BAGIAN VI: PERANGKAT TERPASANG (SN)
  docSections.push(
    new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: "VI. PERANGKAT TERPASANG (SN / MAC / ALIAS)", bold: true, size: 20 })] })
  );
  const snRows = [
    new TableRow({
      children: [
        cellText("NO", true, AlignmentType.CENTER),
        cellText("PERANGKAT", true),
        cellText("SN SEBELUM", true),
        cellText("SN SESUDAH", true)
      ]
    })
  ];
  SN_ITEMS.forEach((name, i) => {
    const snB = document.getElementById(`sn_b_${i}`).value || "-";
    const snA = document.getElementById(`sn_a_${i}`).value || "-";
    snRows.push(
      new TableRow({
        children: [
          cellText(String(i + 1), false, AlignmentType.CENTER),
          cellText(name, true),
          cellText(snB),
          cellText(snA)
        ]
      })
    );
  });
  docSections.push(new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, rows: snRows }), new Paragraph({ text: "" }));

  // BAGIAN VII: FOTO DOKUMENTASI LENGKAP
  docSections.push(
    new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: "VII. DOKUMENTASI FOTO SEBELUM & SESUDAH CM/PM", bold: true, size: 20 })] })
  );

  for (const pair of PHOTO_PAIRS) {
    const leftB64 = photos[pair.left.id];
    const rightB64 = photos[pair.right.id];

    if (leftB64 || rightB64) {
      docSections.push(
        new Paragraph({ children: [new TextRun({ text: `> ${pair.title}`, bold: true, size: 19 })] })
      );

      const photoCells = [];

      // Left Image
      if (leftB64) {
        const cleanL = leftB64.replace(/^data:image\/\w+;base64,/, "");
        const bL = Uint8Array.from(atob(cleanL), c => c.charCodeAt(0));
        photoCells.push(new TableCell({
          children: [
            new Paragraph({ children: [new TextRun({ text: pair.left.label, bold: true, size: 16 })] }),
            new Paragraph({ children: [new ImageRun({ data: bL, transformation: { width: 280, height: 210 } })] })
          ],
          width: { size: 50, type: WidthType.PERCENTAGE }
        }));
      } else {
        photoCells.push(new TableCell({ children: [new Paragraph(`[${pair.left.label}: Tidak Terlampir]`)], width: { size: 50, type: WidthType.PERCENTAGE } }));
      }

      // Right Image
      if (rightB64) {
        const cleanR = rightB64.replace(/^data:image\/\w+;base64,/, "");
        const bR = Uint8Array.from(atob(cleanR), c => c.charCodeAt(0));
        photoCells.push(new TableCell({
          children: [
            new Paragraph({ children: [new TextRun({ text: pair.right.label, bold: true, size: 16 })] }),
            new Paragraph({ children: [new ImageRun({ data: bR, transformation: { width: 280, height: 210 } })] })
          ],
          width: { size: 50, type: WidthType.PERCENTAGE }
        }));
      } else {
        photoCells.push(new TableCell({ children: [new Paragraph(`[${pair.right.label}: Tidak Terlampir]`)], width: { size: 50, type: WidthType.PERCENTAGE } }));
      }

      docSections.push(new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, rows: [new TableRow({ children: photoCells })] }), new Paragraph({ text: "" }));
    }
  }

  // Lembar Pengesahan
  docSections.push(
    new Paragraph({ text: "" }),
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Petugas / Teknisi Pelaksana,", bold: true })] })], width: { size: 50, type: WidthType.PERCENTAGE } }),
            new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Penanggung Jawab / PIC Lokasi,", bold: true })] })], width: { size: 50, type: WidthType.PERCENTAGE } })
          ]
        }),
        new TableRow({
          children: [
            new TableCell({ children: [new Paragraph("\n\n\n\n"), new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `( ${techName} )`, underline: {} })] })] }),
            new TableCell({ children: [new Paragraph("\n\n\n\n"), new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `( ${picName} )`, underline: {} })] })] })
          ]
        })
      ]
    })
  );

  const doc = new Document({ sections: [{ children: docSections }] });
  return await Packer.toBlob(doc);
}

// Handler Tombol: Unduh Word
async function generateBaktiWord() {
  const log = document.getElementById("statusLog");
  log.classList.add("show");
  log.textContent = "⏳ Sedang menyusun dokumen Word Laporan BAKTI (.docx)...";

  try {
    const blob = await buildBaktiDocx();
    const siteId = (document.getElementById("siteId").value || "SITE").replace(/[^a-zA-Z0-9]/g, "_");
    const workDate = document.getElementById("workDate").value.replace(/-/g, "");
    const filename = `LAPORAN_BAKTI_${siteId}_${workDate}.docx`;

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    log.textContent = `✔ Berkas Word berhasil dibuat dan diunduh:\n📂 ${filename}`;
  } catch (err) {
    log.textContent = `❌ Gagal membuat Word: ${err.message}`;
  }
}

// Handler Tombol: Kirim ke Drive & Sheets
async function submitBaktiCloud() {
  const log = document.getElementById("statusLog");
  const btn = document.getElementById("btnUpload");

  const siteId = document.getElementById("siteId").value.trim();
  const siteName = document.getElementById("siteName").value.trim();
  const techName = document.getElementById("techName").value.trim();

  if (!siteId || !siteName || !techName) {
    alert("Harap lengkapi:\n- Site ID\n- Nama Site\n- Nama Teknisi");
    switchTab(0);
    return;
  }

  const gasUrl = localStorage.getItem("bakti_gas_url");
  if (!gasUrl) {
    toggleConfig();
    alert("Harap masukkan URL Google Apps Script Backend di tombol Pengaturan atas!");
    return;
  }

  log.classList.add("show");
  log.textContent = "⏳ [1/3] Menghasilkan dokumen Word resmi...";
  btn.disabled = true;

  try {
    const docxBlob = await buildBaktiDocx();

    log.textContent = "⏳ [2/3] Mengompres berkas dan menyiapkan payload...";
    const reader = new FileReader();
    const docxBase64 = await new Promise((res, rej) => {
      reader.onload = () => res(reader.result.split(",")[1]);
      reader.onerror = rej;
      reader.readAsDataURL(docxBlob);
    });

    log.textContent = "⏳ [3/3] Mengirimkan data dan berkas ke Google Drive & Sheets...";

    const payload = {
      siteOwner: document.getElementById("siteOwner").value,
      siteId: siteId,
      siteName: siteName,
      siteAddress: document.getElementById("siteAddress").value,
      province: document.getElementById("province").value,
      kabupaten: document.getElementById("kabupaten").value,
      desa: document.getElementById("desa").value,
      latitude: document.getElementById("latitude").value,
      longitude: document.getElementById("longitude").value,
      picName: document.getElementById("picName").value,
      picPhone: document.getElementById("picPhone").value,
      techName: techName,
      workDate: document.getElementById("workDate").value,
      timeArrival: document.getElementById("timeArrival").value,
      timeDeparture: document.getElementById("timeDeparture").value,
      kegiatanType: document.getElementById("kegiatanType").value,
      issueNotes: document.getElementById("issueNotes").value,
      outdoorSummary: JSON.stringify(outdoorState),
      indoorSummary: JSON.stringify(indoorState),
      photos: photos,
      docxBase64: docxBase64
    };

    const res = await fetch(gasUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload)
    });

    btn.disabled = false;
    log.textContent = `🎉 LAPORAN BAKTI BERHASIL DIARSIPKAN!\n` +
      `Site ID : ${siteId} - ${siteName}\n` +
      `Teknisi : ${techName}\n` +
      `Dokumen Word (.docx) & foto-foto telah terunggah ke Google Drive.`;

    localStorage.removeItem("bakti_report_draft");

  } catch (err) {
    btn.disabled = false;
    log.textContent = `❌ Terjadi kesalahan saat pengiriman:\n${err.message}`;
  }
}
