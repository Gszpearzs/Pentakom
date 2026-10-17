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
// GENERATE DOKUMEN PDF (.PDF) - FORMAT 100% PERSIS DOKUMEN RESMI BAKTI
// -----------------------------------------------------------------------------
function escapeHtml(str) {
  if (!str) return "-";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

let currentPdfContainer = null;
let currentPdfFilename = "LAPORAN_BAKTI.pdf";

function buildBaktiPdfContainer() {
  const siteIdRaw = (document.getElementById("siteId")?.value || "").trim();
  const siteId = siteIdRaw || "SITE";

  // Ambil referensi lokasi dari LOCATION_DB jika ada
  let loc = null;
  if (typeof LOCATION_DB !== "undefined" && Array.isArray(LOCATION_DB)) {
    loc = LOCATION_DB.find(l => l.id.toLowerCase() === siteId.toLowerCase()) || null;
  }

  // 1. Pemilik Site
  let siteOwner = (document.getElementById("siteOwner")?.value || "").trim();
  if (!siteOwner || siteOwner === "ALL") {
    if (loc && loc.pemilik) siteOwner = loc.pemilik;
  }
  if (!siteOwner || siteOwner === "ALL") siteOwner = "BAKTI / KEMKOMINFO";

  // 2. Nama Site
  let siteName = (document.getElementById("siteName")?.value || "").trim();
  if (!siteName && loc && loc.nama) siteName = loc.nama;
  siteName = siteName || "-";

  // 3. Alamat Site
  let siteAddress = (document.getElementById("siteAddress")?.value || "").trim();
  if (!siteAddress && loc && loc.alamat) siteAddress = loc.alamat;
  siteAddress = siteAddress || "-";

  // 4. Wilayah
  let province = (document.getElementById("province")?.value || "").trim();
  if (!province && loc && loc.provinsi) province = loc.provinsi;
  province = province || "-";

  let kabupaten = (document.getElementById("kabupaten")?.value || "").trim();
  if (!kabupaten && loc && loc.kabupaten) kabupaten = loc.kabupaten;
  kabupaten = kabupaten || "-";

  let desa = (document.getElementById("desa")?.value || "").trim();
  if (!desa && loc && loc.desa) desa = loc.desa;
  desa = desa || "-";

  // 5. Koordinat
  let latitude = (document.getElementById("latitude")?.value || "").trim();
  if (!latitude && loc && loc.lat) latitude = loc.lat;
  latitude = latitude || "-";

  let longitude = (document.getElementById("longitude")?.value || "").trim();
  if (!longitude && loc && loc.lon) longitude = loc.lon;
  longitude = longitude || "-";

  // 6. PIC Lokasi
  let picName = (document.getElementById("picName")?.value || "").trim();
  if (!picName && loc && loc.pic) picName = loc.pic;
  picName = picName || "Penanggung Jawab Lokasi";

  let picPhone = (document.getElementById("picPhone")?.value || "").trim();
  if (!picPhone && loc && loc.picPhone) picPhone = loc.picPhone;
  picPhone = picPhone || "-";

  // 7. Teknisi & Waktu
  const techName = (document.getElementById("techName")?.value || "").trim() || "Teknisi Maintenance";
  const workDate = (document.getElementById("workDate")?.value || "").trim() || new Date().toISOString().slice(0, 10);
  const timeArrival = (document.getElementById("timeArrival")?.value || "").trim() || "09:00";
  const timeDeparture = (document.getElementById("timeDeparture")?.value || "").trim() || "17:00";
  const kegiatanType = (document.getElementById("kegiatanType")?.value || "").trim() || "Preventive Maintenance (PM)";
  const issueNotes = (document.getElementById("issueNotes")?.value || "").trim() || "Kondisi perangkat dan jaringan beroperasi normal saat kunjungan pemeliharaan.";

  // Parameter Power
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

  // Alternatif Jaringan
  const sel4g = document.getElementById("selular4g")?.value || "Tidak Ada";
  const op4g = document.getElementById("operator4g")?.value || "-";
  const sel3g = document.getElementById("selular3g")?.value || "Tidak Ada";
  const op3g = document.getElementById("operator3g")?.value || "-";
  const altRl = document.getElementById("altRl")?.value || "Tidak Ada";
  const altFo = document.getElementById("altFo")?.value || "Tidak Ada";

  // Tabel Outdoor (11 Item)
  let outRowsHtml = "";
  OUTDOOR_ITEMS.forEach((name, i) => {
    const st = outdoorState[i] || { before: "Berfungsi", after: "Berfungsi" };
    outRowsHtml += `<tr>
      <td style="padding: 4px 7px; border: 1px solid #cbd5e1; width: 52%;">${escapeHtml(name)}</td>
      <td style="padding: 4px 7px; border: 1px solid #cbd5e1; text-align: center; width: 24%;">${escapeHtml(st.before)}</td>
      <td style="padding: 4px 7px; border: 1px solid #cbd5e1; text-align: center; width: 24%;">${escapeHtml(st.after)}</td>
    </tr>`;
  });

  // Tabel Indoor (16 Item)
  let inRowsHtml = "";
  INDOOR_ITEMS.forEach((name, i) => {
    const st = indoorState[i] || { before: "Berfungsi", after: "Berfungsi" };
    inRowsHtml += `<tr>
      <td style="padding: 4px 7px; border: 1px solid #cbd5e1; width: 52%;">${escapeHtml(name)}</td>
      <td style="padding: 4px 7px; border: 1px solid #cbd5e1; text-align: center; width: 24%;">${escapeHtml(st.before)}</td>
      <td style="padding: 4px 7px; border: 1px solid #cbd5e1; text-align: center; width: 24%;">${escapeHtml(st.after)}</td>
    </tr>`;
  });

  // Tabel SN Perangkat (Prioritaskan input, fallback ke database loc.sn, fallback Sesudah = Sebelum)
  let snRowsHtml = "";
  const snKeyMap = ["ap1", "ap2", "router", "modem", "antenna", "transiver", "rack", "stabilizer"];
  SN_ITEMS.forEach((name, i) => {
    let snB = (document.getElementById(`sn_b_${i}`)?.value || "").trim();
    if (!snB && loc && loc.sn) {
      const key = snKeyMap[i];
      if (key && loc.sn[key]) snB = loc.sn[key];
    }
    let snA = (document.getElementById(`sn_a_${i}`)?.value || "").trim();
    if (!snA && snB) snA = snB;

    snRowsHtml += `<tr>
      <td style="text-align: center; padding: 4px 6px; border: 1px solid #cbd5e1; width: 8%;">${i + 1}</td>
      <td style="padding: 4px 7px; border: 1px solid #cbd5e1; width: 34%;"><strong>${escapeHtml(name)}</strong></td>
      <td style="padding: 4px 7px; border: 1px solid #cbd5e1; width: 29%;">${escapeHtml(snB || "-")}</td>
      <td style="padding: 4px 7px; border: 1px solid #cbd5e1; width: 29%;">${escapeHtml(snA || "-")}</td>
    </tr>`;
  });

  // Kumpulkan foto dokumentasi yang aktif
  const activePhotoItems = [];
  PHOTO_PAIRS.forEach((pair) => {
    const leftB64 = photos[pair.left.id];
    const rightB64 = photos[pair.right.id];
    if (leftB64 || rightB64) {
      activePhotoItems.push({ pair, leftB64, rightB64 });
    }
  });

  function renderPhotoCardHtml(item) {
    const leftContent = item.leftB64
      ? `<img class="pdf-photo-img" src="${item.leftB64}" alt="${escapeHtml(item.pair.left.label)}"><div class="pdf-photo-lbl">${escapeHtml(item.pair.left.label)}</div>`
      : `<div class="pdf-photo-empty">[${escapeHtml(item.pair.left.label)}: Tidak Terlampir]</div>`;

    const rightContent = item.rightB64
      ? `<img class="pdf-photo-img" src="${item.rightB64}" alt="${escapeHtml(item.pair.right.label)}"><div class="pdf-photo-lbl">${escapeHtml(item.pair.right.label)}</div>`
      : `<div class="pdf-photo-empty">[${escapeHtml(item.pair.right.label)}: Tidak Terlampir]</div>`;

    return `
      <div class="pdf-photo-card" style="border: 1px solid #cbd5e1; background: #ffffff; border-radius: 4px; padding: 6px; margin-bottom: 8px;">
        <div class="pdf-photo-title" style="font-weight: 700; font-size: 9.5px; color: #0f2942; margin-bottom: 4px; border-bottom: 1px solid #f1f5f9; padding-bottom: 2px;">📍 ${escapeHtml(item.pair.title)}</div>
        <table class="pdf-photo-table" style="width: 100%; border-collapse: collapse; table-layout: fixed; border: none;">
          <tr>
            <td style="width: 50%; vertical-align: top; text-align: center; border: none; padding: 2px 4px;">${leftContent}</td>
            <td style="width: 50%; vertical-align: top; text-align: center; border: none; padding: 2px 4px;">${rightContent}</td>
          </tr>
        </table>
      </div>
    `;
  }

  // Lembar Pengesahan (Tanda Tangan)
  const signatureBlockHtml = `
    <table class="pdf-sign-table" style="width: 100%; table-layout: fixed; border: none; margin-top: 25px; page-break-inside: avoid; break-inside: avoid;">
      <tr>
        <td style="width: 50%; text-align: center; border: none; vertical-align: top; padding: 0 15px;">
          <div style="font-weight: 700; font-size: 9.5px; color: #0f2942; margin-bottom: 55px;">Petugas / Teknisi Pelaksana,</div>
          <div style="font-weight: 700; font-size: 9.5px; text-decoration: underline; color: #1e293b;">( ${escapeHtml(techName)} )</div>
          <div style="font-size: 8.5px; color: #64748b; margin-top: 2px;">Teknisi Pemeliharaan</div>
        </td>
        <td style="width: 50%; text-align: center; border: none; vertical-align: top; padding: 0 15px;">
          <div style="font-weight: 700; font-size: 9.5px; color: #0f2942; margin-bottom: 55px;">Penanggung Jawab / PIC Lokasi,</div>
          <div style="font-weight: 700; font-size: 9.5px; text-decoration: underline; color: #1e293b;">( ${escapeHtml(picName)} )</div>
          <div style="font-size: 8.5px; color: #64748b; margin-top: 2px;">PIC / Pengelola Lokasi</div>
        </td>
      </tr>
    </table>
  `;

  // Logo Resmi BAKTI (Base64 PNG agar 100% ter-render tajam di PDF & Pratinjau tanpa kendala CORS)
  const BAKTI_LOGO_DATA_URI = "data:image/png;base64,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";

  // Susun lembar foto
  let photoSheetsHtml = "";
  let totalPages = 3;

  if (activePhotoItems.length === 0) {
    totalPages = 3;
    photoSheetsHtml = `
      <div class="pdf-paper-sheet" id="pdfSheet3">
        <div class="pdf-running-header">
          <div class="pdf-running-title">LAPORAN PEMELIHARAAN (CM & PM) &mdash; <span style="color: #2563eb;">${escapeHtml(siteId)}</span> <span style="font-size: 8.5px; color: #64748b; font-weight: 600;">(${escapeHtml(siteName)})</span></div>
          <img class="pdf-running-logo" src="${BAKTI_LOGO_DATA_URI}" alt="BAKTI">
        </div>
        <div class="pdf-section-title">VII. DOKUMENTASI FOTO SEBELUM & SESUDAH CM/PM</div>
        <div style="padding: 12px; border: 1px dashed #cbd5e1; border-radius: 4px; text-align: center; color: #64748b; font-style: italic; margin-bottom: 20px;">
          Tidak ada foto dokumentasi yang dilampirkan.
        </div>
        ${signatureBlockHtml}
        <div class="pdf-sheet-footer">
          <div>Dokumen Resmi Pemeliharaan Perangkat Telekomunikasi &mdash; BAKTI Kominfo</div>
          <div>Lembar 3 dari 3</div>
        </div>
      </div>
    `;
  } else if (activePhotoItems.length <= 3) {
    totalPages = 3;
    const cardsHtml = activePhotoItems.map(renderPhotoCardHtml).join("");
    photoSheetsHtml = `
      <div class="pdf-paper-sheet" id="pdfSheet3">
        <div class="pdf-running-header">
          <div class="pdf-running-title">LAPORAN PEMELIHARAAN (CM & PM) &mdash; <span style="color: #2563eb;">${escapeHtml(siteId)}</span> <span style="font-size: 8.5px; color: #64748b; font-weight: 600;">(${escapeHtml(siteName)})</span></div>
          <img class="pdf-running-logo" src="${BAKTI_LOGO_DATA_URI}" alt="BAKTI">
        </div>
        <div class="pdf-section-title">VII. DOKUMENTASI FOTO SEBELUM & SESUDAH CM/PM</div>
        ${cardsHtml}
        ${signatureBlockHtml}
        <div class="pdf-sheet-footer">
          <div>Dokumen Resmi Pemeliharaan Perangkat Telekomunikasi &mdash; BAKTI Kominfo</div>
          <div>Lembar 3 dari 3</div>
        </div>
      </div>
    `;
  } else {
    const chunks = [];
    for (let i = 0; i < activePhotoItems.length; i += 3) {
      chunks.push(activePhotoItems.slice(i, i + 3));
    }
    totalPages = 2 + chunks.length;

    photoSheetsHtml = chunks.map((chunk, cIdx) => {
      const pageNum = 3 + cIdx;
      const isLastChunk = (cIdx === chunks.length - 1);
      const cards = chunk.map(renderPhotoCardHtml).join("");
      return `
        <div class="pdf-paper-sheet" id="pdfSheet${pageNum}">
          <div class="pdf-running-header">
            <div class="pdf-running-title">LAPORAN PEMELIHARAAN (CM & PM) &mdash; <span style="color: #2563eb;">${escapeHtml(siteId)}</span> <span style="font-size: 8.5px; color: #64748b; font-weight: 600;">(${escapeHtml(siteName)})</span></div>
            <img class="pdf-running-logo" src="${BAKTI_LOGO_DATA_URI}" alt="BAKTI">
          </div>
          <div class="pdf-section-title">VII. DOKUMENTASI FOTO SEBELUM & SESUDAH CM/PM ${chunks.length > 1 ? `(Bagian ${cIdx + 1})` : ""}</div>
          ${cards}
          ${isLastChunk ? signatureBlockHtml : ""}
          <div class="pdf-sheet-footer">
            <div>Dokumen Resmi Pemeliharaan Perangkat Telekomunikasi &mdash; BAKTI Kominfo</div>
            <div>Lembar ${pageNum} dari ${totalPages}</div>
          </div>
        </div>
      `;
    }).join("");
  }

  // Buat Container Utama
  const container = document.createElement("div");
  container.id = "baktiPdfReportContent";
  container.className = "pdf-report-root";

  container.innerHTML = `
    <style>
      .pdf-report-root {
        width: 794px;
        box-sizing: border-box;
        color: #1e293b;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        font-size: 9.5px;
        line-height: 1.35;
        margin: 0 auto;
      }
      .pdf-paper-sheet {
        background: #ffffff;
        width: 794px;
        min-width: 794px;
        min-height: 1123px;
        box-sizing: border-box;
        /* Margin Standar Microsoft Word (.docx) Normal = 2.54 cm (25.4 mm / 96px pada 96 DPI) di keempat sisi */
        padding: 96px;
        margin-bottom: 24px;
        box-shadow: 0 4px 18px rgba(0,0,0,0.25);
        border-radius: 2px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        page-break-after: always;
        break-after: page;
      }
      .pdf-paper-sheet:last-child {
        page-break-after: auto;
        break-after: auto;
        margin-bottom: 0;
      }
      .pdf-header-main {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 2px solid #0f2942;
        padding-bottom: 6px;
        margin-bottom: 10px;
      }
      .pdf-header-title {
        font-size: 13px;
        font-weight: 800;
        color: #0f2942;
        text-transform: uppercase;
        letter-spacing: 0.4px;
      }
      .pdf-header-sub {
        font-size: 8.5px;
        color: #64748b;
        font-weight: 600;
        margin-top: 2px;
      }
      .pdf-bakti-logo {
        height: 34px;
        width: auto;
        object-fit: contain;
        display: block;
      }
      .pdf-running-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1.5px solid #0f2942;
        padding-bottom: 4px;
        margin-bottom: 8px;
      }
      .pdf-running-title {
        font-size: 9.5px;
        font-weight: 800;
        color: #0f2942;
        text-transform: uppercase;
      }
      .pdf-running-logo {
        height: 22px;
        width: auto;
        object-fit: contain;
        display: block;
      }
      .pdf-section-title {
        background: #0f2942;
        color: #ffffff;
        font-size: 9px;
        font-weight: 700;
        padding: 4px 7px;
        border-radius: 3px;
        margin-top: 8px;
        margin-bottom: 5px;
        text-transform: uppercase;
        page-break-after: avoid;
        break-after: avoid;
      }
      .pdf-table {
        width: 100%;
        border-collapse: collapse;
        table-layout: fixed;
        margin-bottom: 8px;
        font-size: 9px;
      }
      .pdf-table th {
        background: #0f2942;
        color: #ffffff;
        font-weight: 700;
        border: 1px solid #cbd5e1;
        padding: 4px 6px;
        text-align: left;
      }
      .pdf-table td {
        border: 1px solid #cbd5e1;
        padding: 3.5px 6px;
        vertical-align: middle;
        word-break: break-word;
      }
      .pdf-table-admin td:first-child {
        background: #f8fafc;
        font-weight: 600;
        width: 32%;
        color: #334155;
      }
      /* Penyesuaian kepadatan Lembar 2 agar 4 tabel muat utuh dalam 1 halaman ber-margin Word 2.54cm */
      #pdfSheet2 .pdf-section-title {
        margin-top: 5px;
        margin-bottom: 3.5px;
        padding: 3px 6px;
        font-size: 8.8px;
      }
      #pdfSheet2 .pdf-table {
        margin-bottom: 5px;
        font-size: 8.4px;
      }
      #pdfSheet2 .pdf-table th,
      #pdfSheet2 .pdf-table td {
        padding: 2.4px 5.5px !important;
        line-height: 1.2;
      }
      .pdf-issue-box {
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        border-left: 3.5px solid #2f6fed;
        padding: 6px 9px;
        font-size: 9px;
        margin-bottom: 8px;
        border-radius: 3px;
        line-height: 1.4;
      }
      .pdf-photo-card {
        page-break-inside: avoid;
        break-inside: avoid;
        border: 1px solid #cbd5e1;
        background: #ffffff;
        border-radius: 4px;
        padding: 6px;
        margin-bottom: 7px;
      }
      .pdf-photo-title {
        font-weight: 700;
        font-size: 9px;
        color: #0f2942;
        margin-bottom: 4px;
        border-bottom: 1px solid #f1f5f9;
        padding-bottom: 2px;
      }
      .pdf-photo-table {
        width: 100%;
        border-collapse: collapse;
        table-layout: fixed;
        border: none;
      }
      .pdf-photo-table td {
        width: 50%;
        vertical-align: top;
        text-align: center;
        border: none;
        padding: 2px 4px;
      }
      .pdf-photo-img {
        width: 100%;
        max-height: 135px;
        object-fit: contain;
        border: 1px solid #cbd5e1;
        border-radius: 3px;
        background: #f8fafc;
        display: block;
        margin: 0 auto;
      }
      .pdf-photo-empty {
        height: 85px;
        border: 1px dashed #cbd5e1;
        background: #f8fafc;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #94a3b8;
        font-size: 8.5px;
      }
      .pdf-photo-lbl {
        font-size: 8px;
        font-weight: 600;
        color: #475569;
        margin-top: 3px;
      }
      .pdf-sign-table {
        width: 100%;
        table-layout: fixed;
        border: none;
        margin-top: 18px;
        page-break-inside: avoid;
        break-inside: avoid;
      }
      .pdf-sign-table td {
        border: none;
        text-align: center;
        width: 50%;
        vertical-align: top;
        padding: 0 12px;
      }
      .pdf-sheet-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top: 1px solid #e2e8f0;
        margin-top: auto;
        padding-top: 5px;
        font-size: 8px;
        color: #94a3b8;
      }
    </style>

    <!-- LEMBAR 1: INFORMASI UMUM, KONDISI & STATUS OUTDOOR -->
    <div class="pdf-paper-sheet" id="pdfSheet1">
      <div class="pdf-header-main">
        <div>
          <div class="pdf-header-title">LAPORAN PEMELIHARAAN (CM & PM)</div>
          <div class="pdf-header-sub">PEMELIHARAAN OPERASIONAL & PERANGKAT TELEKOMUNIKASI BAKTI</div>
        </div>
        <img class="pdf-bakti-logo" src="${BAKTI_LOGO_DATA_URI}" alt="BAKTI">
      </div>

      <table class="pdf-table pdf-table-admin">
        <tbody>
          <tr>
            <td style="width: 32%;">Pemilik Site</td>
            <td style="width: 68%;"><strong>${escapeHtml(siteOwner)}</strong></td>
          </tr>
          <tr>
            <td>Site ID (Kode Lokasi)</td>
            <td><strong style="color: #0f2942; font-size: 10px;">${escapeHtml(siteId)}</strong></td>
          </tr>
          <tr>
            <td>Nama Site (Nama Site/Lokasi)</td>
            <td><strong>${escapeHtml(siteName)}</strong></td>
          </tr>
          <tr>
            <td>Alamat Site/Lokasi</td>
            <td>${escapeHtml(siteAddress)}</td>
          </tr>
          <tr>
            <td>Provinsi / Kabupaten</td>
            <td>${escapeHtml(province)} / ${escapeHtml(kabupaten)}</td>
          </tr>
          <tr>
            <td>Kelurahan/Desa</td>
            <td>${escapeHtml(desa)}</td>
          </tr>
          <tr>
            <td>Latitude / Longitude</td>
            <td>Lat: ${escapeHtml(latitude)} | Lon: ${escapeHtml(longitude)}</td>
          </tr>
          <tr>
            <td>Nama & No HP PIC Lokasi</td>
            <td>${escapeHtml(picName)} (${escapeHtml(picPhone)})</td>
          </tr>
          <tr>
            <td>Petugas (Nama Teknisi)</td>
            <td><strong>${escapeHtml(techName)}</strong></td>
          </tr>
          <tr>
            <td>Tanggal Kedatangan</td>
            <td>${escapeHtml(workDate)}</td>
          </tr>
          <tr>
            <td>Waktu Kedatangan & Selesai</td>
            <td>${escapeHtml(timeArrival)} s/d ${escapeHtml(timeDeparture)}</td>
          </tr>
          <tr>
            <td>Kegiatan CM/PM & Layanan</td>
            <td>${escapeHtml(kegiatanType)} (Layanan On-Site)</td>
          </tr>
        </tbody>
      </table>

      <div class="pdf-section-title">I. PENJELASAN RINGKAS KONDISI / GANGGUAN PADA SAAT KEDATANGAN</div>
      <div class="pdf-issue-box">${escapeHtml(issueNotes)}</div>

      <div class="pdf-section-title">II. STATUS OUTDOOR (SEBELUM & SESUDAH MAINTENANCE)</div>
      <table class="pdf-table">
        <thead>
          <tr>
            <th style="width: 52%;">ITEM FISIK OUTDOOR</th>
            <th style="width: 24%; text-align: center;">SEBELUM</th>
            <th style="width: 24%; text-align: center;">SESUDAH</th>
          </tr>
        </thead>
        <tbody>
          ${outRowsHtml}
        </tbody>
      </table>

      <div class="pdf-sheet-footer">
        <div>Dokumen Resmi Pemeliharaan Perangkat Telekomunikasi &mdash; BAKTI Kominfo</div>
        <div>Lembar 1 dari ${totalPages}</div>
      </div>
    </div>

    <!-- LEMBAR 2: STATUS INDOOR, POWER, ALTERNATIF JARINGAN & PERANGKAT TERPASANG -->
    <div class="pdf-paper-sheet" id="pdfSheet2">
      <div class="pdf-running-header">
        <div class="pdf-running-title">LAPORAN PEMELIHARAAN (CM & PM) &mdash; <span style="color: #2563eb;">${escapeHtml(siteId)}</span> <span style="font-size: 8.5px; color: #64748b; font-weight: 600;">(${escapeHtml(siteName)})</span></div>
        <img class="pdf-running-logo" src="${BAKTI_LOGO_DATA_URI}" alt="BAKTI">
      </div>

      <div class="pdf-section-title">III. STATUS INDOOR (SEBELUM & SESUDAH MAINTENANCE)</div>
      <table class="pdf-table">
        <thead>
          <tr>
            <th style="width: 52%;">ITEM FISIK INDOOR</th>
            <th style="width: 24%; text-align: center;">SEBELUM</th>
            <th style="width: 24%; text-align: center;">SESUDAH</th>
          </tr>
        </thead>
        <tbody>
          ${inRowsHtml}
        </tbody>
      </table>

      <div class="pdf-section-title">IV. STATUS POWER</div>
      <table class="pdf-table">
        <thead>
          <tr>
            <th style="width: 50%;">PARAMETER POWER</th>
            <th style="width: 25%; text-align: center;">SEBELUM</th>
            <th style="width: 25%; text-align: center;">SESUDAH</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Fisik UPS</td>
            <td style="text-align: center;">${escapeHtml(upsB)}</td>
            <td style="text-align: center;">${escapeHtml(upsA)}</td>
          </tr>
          <tr>
            <td>Fisik Stabilizer</td>
            <td style="text-align: center;">${escapeHtml(stabB)}</td>
            <td style="text-align: center;">${escapeHtml(stabA)}</td>
          </tr>
          <tr>
            <td>Source Power</td>
            <td style="text-align: center;">${escapeHtml(pwrSrcB)}</td>
            <td style="text-align: center;">${escapeHtml(pwrSrcA)}</td>
          </tr>
          <tr>
            <td>Waktu Operasional</td>
            <td style="text-align: center;">Hari: ${escapeHtml(opDays)} | Jam: ${escapeHtml(opHours)}</td>
            <td style="text-align: center;">Hari: ${escapeHtml(opDays)} | Jam: ${escapeHtml(opHours)}</td>
          </tr>
          <tr>
            <td>Tegangan Input Source Power</td>
            <td style="text-align: center;">${escapeHtml(vIn)}</td>
            <td style="text-align: center;">${escapeHtml(vIn)}</td>
          </tr>
          <tr>
            <td>Tegangan Output UPS</td>
            <td style="text-align: center;">${escapeHtml(vUps)}</td>
            <td style="text-align: center;">${escapeHtml(vUps)}</td>
          </tr>
          <tr>
            <td>Tegangan Output Stabilizer</td>
            <td style="text-align: center;">${escapeHtml(vStab)}</td>
            <td style="text-align: center;">${escapeHtml(vStab)}</td>
          </tr>
          <tr>
            <td>Tegangan Grounding Power Source</td>
            <td style="text-align: center;">${escapeHtml(vGnd)}</td>
            <td style="text-align: center;">${escapeHtml(vGnd)}</td>
          </tr>
        </tbody>
      </table>

      <div class="pdf-section-title">V. ALTERNATIF JARINGAN YANG ADA DI LOKASI</div>
      <table class="pdf-table">
        <thead>
          <tr>
            <th style="width: 40%;">JARINGAN ALTERNATIF</th>
            <th style="width: 25%; text-align: center;">STATUS</th>
            <th style="width: 35%;">NAMA OPERATOR</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Selular (4G)</td>
            <td style="text-align: center;">${escapeHtml(sel4g)}</td>
            <td>${escapeHtml(op4g)}</td>
          </tr>
          <tr>
            <td>Selular (3G / 2G)</td>
            <td style="text-align: center;">${escapeHtml(sel3g)}</td>
            <td>${escapeHtml(op3g)}</td>
          </tr>
          <tr>
            <td>Radio Link (RL)</td>
            <td style="text-align: center;">${escapeHtml(altRl)}</td>
            <td>-</td>
          </tr>
          <tr>
            <td>Fiber Optic (Terpasang / Sekitar)</td>
            <td style="text-align: center;">${escapeHtml(altFo)}</td>
            <td>-</td>
          </tr>
        </tbody>
      </table>

      <div class="pdf-section-title">VI. PERANGKAT TERPASANG (SN / MAC / ALIAS)</div>
      <table class="pdf-table">
        <thead>
          <tr>
            <th style="width: 8%; text-align: center;">NO</th>
            <th style="width: 34%;">PERANGKAT</th>
            <th style="width: 29%;">SN SEBELUM</th>
            <th style="width: 29%;">SN SESUDAH</th>
          </tr>
        </thead>
        <tbody>
          ${snRowsHtml}
        </tbody>
      </table>

      <div class="pdf-sheet-footer">
        <div>Dokumen Resmi Pemeliharaan Perangkat Telekomunikasi &mdash; BAKTI Kominfo</div>
        <div>Lembar 2 dari ${totalPages}</div>
      </div>
    </div>

    <!-- LEMBAR 3+: FOTO DOKUMENTASI & LEMBAR PENGESAHAN -->
    ${photoSheetsHtml}
  `;

  const siteClean = (siteId || "SITE").replace(/[^a-zA-Z0-9]/g, "_");
  const dateClean = (workDate || "").replace(/-/g, "");
  const filename = `LAPORAN_BAKTI_${siteClean}_${dateClean}.pdf`;

  return { container, filename };
}

/**
 * Render setiap lembar (.pdf-paper-sheet) secara presisi ke dalam dokumen A4 (210 x 297 mm)
 * menggunakan Margin Standar Microsoft Word (.docx) Normal:
 * Atas = 2.54 cm (25.4 mm), Bawah = 2.54 cm (25.4 mm), Kiri = 2.54 cm (25.4 mm), Kanan = 2.54 cm (25.4 mm).
 */
async function renderBaktiPdfDocument(sourceContainer) {
  if (typeof html2pdf === "undefined") {
    throw new Error("Pustaka html2pdf belum siap dimuat.");
  }

  const styleEl = sourceContainer.querySelector("style");
  const baseStyleText = styleEl ? styleEl.innerHTML : "";
  const sourceSheets = Array.from(sourceContainer.querySelectorAll(".pdf-paper-sheet"));
  if (sourceSheets.length === 0) {
    throw new Error("Tidak ditemukan lembar laporan untuk dirender.");
  }

  // Area cetak di dalam Margin Standar Word (A4 210x297mm dikurangi 2x25.4mm = 159.2mm x 246.2mm => 602px x 931px pada 96 DPI)
  const CONTENT_W_PX = 602;
  const CONTENT_MIN_H_PX = 931;

  // Buat instance jsPDF A4 Portrait dalam satuan mm (210 x 297 mm)
  const dummyCanvas = document.createElement("canvas");
  dummyCanvas.width = 4;
  dummyCanvas.height = 4;
  const dummyCtx = dummyCanvas.getContext("2d");
  dummyCtx.fillStyle = "#ffffff";
  dummyCtx.fillRect(0, 0, 4, 4);

  const pdf = await html2pdf()
    .set({
      margin: [25.4, 25.4, 25.4, 25.4],
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
    })
    .from(dummyCanvas, "canvas")
    .toPdf()
    .get("pdf");

  // Konstanta Kertas A4 & Margin Standar Microsoft Word (.docx) Normal (2.54 cm = 25.4 mm)
  const PAGE_W_MM = 210.0;
  const PAGE_H_MM = 297.0;
  const MARGIN_TOP_MM = 25.4;
  const MARGIN_BOTTOM_MM = 25.4;
  const MARGIN_LEFT_MM = 25.4;
  const MARGIN_RIGHT_MM = 25.4;
  const USABLE_W_MM = PAGE_W_MM - MARGIN_LEFT_MM - MARGIN_RIGHT_MM; // 159.2 mm
  const USABLE_H_MM = PAGE_H_MM - MARGIN_TOP_MM - MARGIN_BOTTOM_MM; // 246.2 mm

  for (let i = 0; i < sourceSheets.length; i++) {
    const sheetClone = sourceSheets[i].cloneNode(true);
    sheetClone.style.width = CONTENT_W_PX + "px";
    sheetClone.style.minWidth = CONTENT_W_PX + "px";
    sheetClone.style.maxWidth = CONTENT_W_PX + "px";
    sheetClone.style.minHeight = CONTENT_MIN_H_PX + "px";
    sheetClone.style.padding = "0";
    sheetClone.style.margin = "0";
    sheetClone.style.boxShadow = "none";
    sheetClone.style.borderRadius = "0";
    sheetClone.style.backgroundColor = "#ffffff";
    sheetClone.style.boxSizing = "border-box";

    const wrapper = document.createElement("div");
    wrapper.style.width = CONTENT_W_PX + "px";
    wrapper.style.margin = "0";
    wrapper.style.padding = "0";
    wrapper.style.backgroundColor = "#ffffff";
    wrapper.style.boxSizing = "border-box";

    const sheetStyle = document.createElement("style");
    sheetStyle.innerHTML = baseStyleText + `
      .html2pdf__overlay {
        position: fixed !important;
        top: 0px !important;
        left: 0px !important;
        right: auto !important;
        bottom: auto !important;
        width: ${CONTENT_W_PX}px !important;
        overflow: visible !important;
        margin: 0 !important;
        padding: 0 !important;
      }
      .html2pdf__container {
        position: absolute !important;
        top: 0px !important;
        left: 0px !important;
        right: auto !important;
        margin: 0 !important;
        padding: 0 !important;
        width: ${CONTENT_W_PX}px !important;
        min-width: ${CONTENT_W_PX}px !important;
        max-width: ${CONTENT_W_PX}px !important;
        background: #ffffff !important;
        box-sizing: border-box !important;
      }
    `;
    wrapper.appendChild(sheetStyle);
    wrapper.appendChild(sheetClone);

    const sheetOpt = {
      margin: 0,
      enableLinks: false,
      pagebreak: { mode: [] },
      image: { type: "jpeg", quality: 0.96 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        scrollX: 0,
        scrollY: 0,
        x: 0,
        y: 0,
        width: CONTENT_W_PX
      },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
    };

    const canvas = await html2pdf()
      .set(sheetOpt)
      .from(wrapper)
      .toContainer()
      .then(function () {
        if (this.prop.overlay) {
          this.prop.overlay.style.position = "fixed";
          this.prop.overlay.style.top = "0px";
          this.prop.overlay.style.left = "0px";
          this.prop.overlay.style.right = "auto";
          this.prop.overlay.style.bottom = "auto";
          this.prop.overlay.style.width = CONTENT_W_PX + "px";
          this.prop.overlay.style.margin = "0px";
          this.prop.overlay.style.padding = "0px";
          this.prop.overlay.style.overflow = "visible";
        }
        if (this.prop.container) {
          this.prop.container.style.position = "absolute";
          this.prop.container.style.top = "0px";
          this.prop.container.style.left = "0px";
          this.prop.container.style.right = "auto";
          this.prop.container.style.margin = "0px";
          this.prop.container.style.padding = "0px";
          this.prop.container.style.width = CONTENT_W_PX + "px";
          this.prop.container.style.minWidth = CONTENT_W_PX + "px";
          this.prop.container.style.maxWidth = CONTENT_W_PX + "px";
          this.prop.container.style.boxSizing = "border-box";
        }
        const imgs = this.prop.container ? this.prop.container.querySelectorAll("img") : [];
        return Promise.all(Array.from(imgs).map(img => {
          if (img.complete) return Promise.resolve();
          return new Promise(res => {
            img.onload = res;
            img.onerror = res;
          });
        })).then(() => new Promise(r => setTimeout(r, 60)));
      })
      .toCanvas()
      .get("canvas");

    if (i > 0) {
      pdf.addPage();
    }

    const imgDataUrl = canvas.toDataURL("image/jpeg", 0.96);
    let drawW = USABLE_W_MM;
    let drawH = (canvas.height / canvas.width) * drawW;
    if (drawH > USABLE_H_MM) {
      drawH = USABLE_H_MM;
    }

    // Tempatkan tepat pada koordinat Margin Standar Word (.docx): X = 25.4mm (2.54cm), Y = 25.4mm (2.54cm)
    pdf.addImage(imgDataUrl, "JPEG", MARGIN_LEFT_MM, MARGIN_TOP_MM, drawW, drawH);
  }

  return pdf;
}

// Buka Modal Pratinjau Dokumen PDF
function previewBaktiPdf() {
  const siteId = (document.getElementById("siteId")?.value || "").trim();
  if (!siteId) {
    alert("Perhatian: Harap pilih atau ketik 'Site ID (Kode Lokasi)' di Halaman 1 terlebih dahulu!");
    switchTab(0);
    document.getElementById("siteId")?.focus();
    return;
  }

  const techName = (document.getElementById("techName")?.value || "").trim();
  if (!techName) {
    alert("Perhatian: Harap isi 'Petugas (Nama Teknisi)' di Halaman 1 terlebih dahulu!");
    switchTab(0);
    document.getElementById("techName")?.focus();
    return;
  }

  const { container, filename } = buildBaktiPdfContainer();
  currentPdfContainer = container;
  currentPdfFilename = filename;

  const siteName = (document.getElementById("siteName")?.value || "").trim();
  const subEl = document.getElementById("pdfPreviewSubtitle");
  if (subEl) {
    subEl.textContent = `Site ID: ${siteId} ${siteName ? "(" + siteName + ")" : ""} | Margin: Standar Word (2.54 cm) | Berkas: ${filename}`;
  }

  const previewBody = document.getElementById("pdfPreviewBody");
  if (previewBody) {
    previewBody.innerHTML = "";
    previewBody.appendChild(container);
    previewBody.scrollTop = 0;
  }

  const modal = document.getElementById("pdfPreviewModal");
  if (modal) {
    modal.style.display = "flex";
  }
}

// Tutup Modal Pratinjau
function closeBaktiPdfPreview() {
  const modal = document.getElementById("pdfPreviewModal");
  if (modal) {
    modal.style.display = "none";
  }
}

// Cetak Laporan Langsung dari Pratinjau
function printBaktiPdf() {
  window.print();
}

// Unduh Berkas PDF dari Modal Pratinjau dengan Margin Standar Word (.docx)
async function downloadPdfFromPreview() {
  if (!currentPdfContainer) {
    alert("Data laporan belum dimuat. Silakan tutup dan buka pratinjau kembali.");
    return;
  }

  const btn = document.getElementById("btnModalDownload");
  const origText = btn ? btn.innerHTML : "⬇️ Unduh PDF (.pdf)";
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = "⏳ Mengunduh...";
  }

  const log = document.getElementById("statusLog");
  log.classList.add("show");
  log.textContent = "⏳ Memproses berkas PDF Laporan BAKTI (Margin Standar Word 2.54 cm)...";

  try {
    const pdf = await renderBaktiPdfDocument(currentPdfContainer);
    pdf.save(currentPdfFilename);
    log.textContent = `✔ Berkas PDF berhasil diunduh (Margin Standar Word 2.54 cm):\n📂 ${currentPdfFilename}`;
  } catch (err) {
    log.textContent = `❌ Gagal mengunduh PDF: ${err.message}`;
    console.error("Download PDF error:", err);
    alert("Gagal mengunduh PDF: " + err.message);
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = origText;
    }
  }
}

// Handler tombol footer: membuka modal pratinjau terlebih dahulu
async function generateBaktiPdf() {
  previewBaktiPdf();
}

async function generateBaktiWord() {
  previewBaktiPdf();
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
  log.textContent = "⏳ [1/3] Menghasilkan dokumen PDF resmi (Margin Standar Word 2.54 cm)...";
  btn.disabled = true;

  try {
    const { container, filename } = buildBaktiPdfContainer();
    const pdf = await renderBaktiPdfDocument(container);
    const pdfBlob = pdf.output("blob");

    log.textContent = "⏳ [2/3] Mengompres berkas dan menyiapkan payload...";
    const reader = new FileReader();
    const pdfBase64 = await new Promise((res, rej) => {
      reader.onload = () => res(reader.result.split(",")[1]);
      reader.onerror = rej;
      reader.readAsDataURL(pdfBlob);
    });

    log.textContent = "⏳ [3/3] Mengirimkan data dan berkas ke Google Drive & Sheets...";

    // Ambil data SN Perangkat Sebelum dan Sesudah (Halaman 4 - Bagian VI)
    const snBefore = {
      apIndoor: (document.getElementById("sn_b_0")?.value || "").trim(),
      apOutdoor: (document.getElementById("sn_b_1")?.value || "").trim(),
      router: (document.getElementById("sn_b_2")?.value || "").trim(),
      modem: (document.getElementById("sn_b_3")?.value || "").trim(),
      antenna: (document.getElementById("sn_b_4")?.value || "").trim(),
      buc: (document.getElementById("sn_b_5")?.value || "").trim(),
      rack: (document.getElementById("sn_b_6")?.value || "").trim(),
      stabilizer: (document.getElementById("sn_b_7")?.value || "").trim()
    };

    const snAfter = {
      apIndoor: (document.getElementById("sn_a_0")?.value || "").trim(),
      apOutdoor: (document.getElementById("sn_a_1")?.value || "").trim(),
      router: (document.getElementById("sn_a_2")?.value || "").trim(),
      modem: (document.getElementById("sn_a_3")?.value || "").trim(),
      antenna: (document.getElementById("sn_a_4")?.value || "").trim(),
      buc: (document.getElementById("sn_a_5")?.value || "").trim(),
      rack: (document.getElementById("sn_a_6")?.value || "").trim(),
      stabilizer: (document.getElementById("sn_a_7")?.value || "").trim()
    };

    // Nilai efektif untuk update database: utamakan SN Sesudah, fallback ke SN Sebelum jika tidak diganti
    const effectiveSn = {
      modem: snAfter.modem || snBefore.modem || "",
      router: snAfter.router || snBefore.router || "",
      apIndoor: snAfter.apIndoor || snBefore.apIndoor || "",
      apOutdoor: snAfter.apOutdoor || snBefore.apOutdoor || "",
      antenna: snAfter.antenna || snBefore.antenna || "",
      buc: snAfter.buc || snBefore.buc || "",
      rack: snAfter.rack || snBefore.rack || "",
      stabilizer: snAfter.stabilizer || snBefore.stabilizer || ""
    };

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
      snBefore: snBefore,
      snAfter: snAfter,
      effectiveSn: effectiveSn,
      outdoorSummary: JSON.stringify(outdoorState),
      indoorSummary: JSON.stringify(indoorState),
      photos: photos,
      pdfBase64: pdfBase64
    };

    const res = await fetch(gasUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload)
    });

    btn.disabled = false;

    // Otomatis perbarui database lokal aplikasi (LOCATION_DB & localStorage) dengan SN Sesudah
    if (typeof LOCATION_DB !== "undefined" && Array.isArray(LOCATION_DB)) {
      const targetLoc = LOCATION_DB.find((l) => l.id.toLowerCase() === siteId.toLowerCase());
      if (targetLoc) {
        targetLoc.sn = targetLoc.sn || {};
        if (effectiveSn.modem) targetLoc.sn.modem = effectiveSn.modem;
        if (effectiveSn.router) targetLoc.sn.router = effectiveSn.router;
        if (effectiveSn.apIndoor) targetLoc.sn.ap1 = effectiveSn.apIndoor;
        if (effectiveSn.apOutdoor) targetLoc.sn.ap2 = effectiveSn.apOutdoor;
        if (effectiveSn.antenna) targetLoc.sn.antenna = effectiveSn.antenna;
        if (effectiveSn.buc) targetLoc.sn.transiver = effectiveSn.buc;
        if (effectiveSn.rack) targetLoc.sn.rack = effectiveSn.rack;
        if (effectiveSn.stabilizer) targetLoc.sn.stabilizer = effectiveSn.stabilizer;

        try {
          const customRaw = localStorage.getItem("pentakom_custom_locations");
          let customList = customRaw ? JSON.parse(customRaw) : [];
          const cIdx = customList.findIndex((c) => c.id.toLowerCase() === siteId.toLowerCase());
          if (cIdx >= 0) {
            customList[cIdx] = { ...customList[cIdx], ...targetLoc };
          } else {
            customList.push(targetLoc);
          }
          localStorage.setItem("pentakom_custom_locations", JSON.stringify(customList));
        } catch (e) {
          console.warn("Gagal simpan custom locations:", e);
        }
      }
    }

    log.textContent = `🎉 LAPORAN BAKTI BERHASIL DIARSIPKAN!\n` +
      `Site ID : ${siteId} - ${siteName}\n` +
      `Teknisi : ${techName}\n` +
      `✔ Dokumen PDF (.pdf) & foto-foto telah terunggah ke Google Drive.\n` +
      `✔ Rekap laporan tercatat di Google Sheets.\n` +
      `✔ Database 'Data SN Perangkat' otomatis terupdate dengan data SN Sesudah!`;

    localStorage.removeItem("bakti_report_draft");

  } catch (err) {
    btn.disabled = false;
    log.textContent = `❌ Terjadi kesalahan saat pengiriman:\n${err.message}`;
  }
}

// Ekspor Seluruh Data SN Perangkat Terkini ke CSV
function exportDataSnCsv() {
  try {
    if (typeof LOCATION_DB === "undefined" || !Array.isArray(LOCATION_DB)) {
      alert("Database lokasi belum dimuat.");
      return;
    }

    const headers = ["Site ID (Kode Lokasi)", "MODEM", "ROUTER", "AP Indoor", "AP Outdoor", "ANTENNA", "BUC", "RACK", "STABILIZER"];
    const rows = [headers.join(";")];

    // Sinkronkan juga input form aktif jika sedang diedit
    const curSiteId = (document.getElementById("siteId")?.value || "").trim().toLowerCase();
    const curSnA = {
      modem: document.getElementById("sn_a_3")?.value?.trim(),
      router: document.getElementById("sn_a_2")?.value?.trim(),
      ap1: document.getElementById("sn_a_0")?.value?.trim(),
      ap2: document.getElementById("sn_a_1")?.value?.trim(),
      antenna: document.getElementById("sn_a_4")?.value?.trim(),
      transiver: document.getElementById("sn_a_5")?.value?.trim(),
      rack: document.getElementById("sn_a_6")?.value?.trim(),
      stabilizer: document.getElementById("sn_a_7")?.value?.trim()
    };

    LOCATION_DB.forEach((loc) => {
      const sn = { ...(loc.sn || {}) };
      if (curSiteId && loc.id.toLowerCase() === curSiteId) {
        if (curSnA.modem) sn.modem = curSnA.modem;
        if (curSnA.router) sn.router = curSnA.router;
        if (curSnA.ap1) sn.ap1 = curSnA.ap1;
        if (curSnA.ap2) sn.ap2 = curSnA.ap2;
        if (curSnA.antenna) sn.antenna = curSnA.antenna;
        if (curSnA.transiver) sn.transiver = curSnA.transiver;
        if (curSnA.rack) sn.rack = curSnA.rack;
        if (curSnA.stabilizer) sn.stabilizer = curSnA.stabilizer;
      }

      const row = [
        loc.id || "",
        sn.modem || "",
        sn.router || "",
        sn.ap1 || "",
        sn.ap2 || "",
        sn.antenna || "",
        sn.transiver || "",
        sn.rack || "",
        sn.stabilizer || ""
      ];
      rows.push(row.map((cell) => String(cell || "").replace(/;/g, ",")).join(";"));
    });

    const csvContent = rows.join("\r\n");
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const filename = `Data_SN_Perangkat_${dateStr}.csv`;

    // Metode 1: Menggunakan SheetJS jika library tersedia
    if (typeof XLSX !== "undefined") {
      const aoa = rows.map((r) => r.split(";"));
      const ws = XLSX.utils.aoa_to_sheet(aoa);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Data SN Perangkat");
      XLSX.writeFile(wb, filename, { bookType: "csv", FS: ";" });
      return;
    }

    // Metode 2: Standard Blob dengan delay revoke URL
    const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob, filename);
      return;
    }

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      if (document.body.contains(a)) document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 2000);

  } catch (err) {
    alert("Gagal mengunduh CSV: " + err.message);
    console.error("exportDataSnCsv error:", err);
  }
}

// Ekspor Seluruh Data SN Perangkat Terkini ke Excel (.xlsx)
function exportDataSnXlsx() {
  try {
    if (typeof LOCATION_DB === "undefined" || !Array.isArray(LOCATION_DB)) {
      alert("Database lokasi belum dimuat.");
      return;
    }

    const headers = ["Site ID (Kode Lokasi)", "MODEM", "ROUTER", "AP Indoor", "AP Outdoor", "ANTENNA", "BUC", "RACK", "STABILIZER"];
    const curSiteId = (document.getElementById("siteId")?.value || "").trim().toLowerCase();
    const curSnA = {
      modem: document.getElementById("sn_a_3")?.value?.trim(),
      router: document.getElementById("sn_a_2")?.value?.trim(),
      ap1: document.getElementById("sn_a_0")?.value?.trim(),
      ap2: document.getElementById("sn_a_1")?.value?.trim(),
      antenna: document.getElementById("sn_a_4")?.value?.trim(),
      transiver: document.getElementById("sn_a_5")?.value?.trim(),
      rack: document.getElementById("sn_a_6")?.value?.trim(),
      stabilizer: document.getElementById("sn_a_7")?.value?.trim()
    };

    const dataRows = [headers];
    LOCATION_DB.forEach((loc) => {
      const sn = { ...(loc.sn || {}) };
      if (curSiteId && loc.id.toLowerCase() === curSiteId) {
        if (curSnA.modem) sn.modem = curSnA.modem;
        if (curSnA.router) sn.router = curSnA.router;
        if (curSnA.ap1) sn.ap1 = curSnA.ap1;
        if (curSnA.ap2) sn.ap2 = curSnA.ap2;
        if (curSnA.antenna) sn.antenna = curSnA.antenna;
        if (curSnA.transiver) sn.transiver = curSnA.transiver;
        if (curSnA.rack) sn.rack = curSnA.rack;
        if (curSnA.stabilizer) sn.stabilizer = curSnA.stabilizer;
      }

      dataRows.push([
        loc.id || "",
        sn.modem || "",
        sn.router || "",
        sn.ap1 || "",
        sn.ap2 || "",
        sn.antenna || "",
        sn.transiver || "",
        sn.rack || "",
        sn.stabilizer || ""
      ]);
    });

    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const filename = `Data_SN_Perangkat_${dateStr}.xlsx`;

    if (typeof XLSX !== "undefined") {
      const ws = XLSX.utils.aoa_to_sheet(dataRows);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Data SN Perangkat");
      XLSX.writeFile(wb, filename);
    } else {
      exportDataSnCsv();
    }
  } catch (err) {
    alert("Gagal mengunduh Excel: " + err.message);
    console.error("exportDataSnXlsx error:", err);
  }
}
