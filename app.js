/**
 * ==============================================================================
 * PENTAKOM CM-PM FORM - APPLICATION LOGIC
 * Struktur & Pola Terinspirasi dari brilliantnb/LAPORAN-KUNJUNGAN
 * Fitur:
 * - Toggle Kondisi Baik / Buruk (PM Inspection)
 * - Auto-Generate & Download Dokumen Word (.docx) langsung di browser
 * - Upload Data & Foto ke Google Drive & Sheets via Apps Script Backend
 * - Auto-Save Draf Lokal di HP / Laptop (Offline Safe)
 * ==============================================================================
 */

// 1. Komponen Standar untuk Pemeriksaan PM
const PM_COMPONENTS = [
  { id: "fisik", name: "Kebersihan Fisik & Rak Unit" },
  { id: "kabel", name: "Kerapihan Kabel, Port & Konektor" },
  { id: "power", name: "Tegangan Power Supply & Baterai UPS" },
  { id: "suhu",  name: "Suhu Operasional & Sirkulasi Fan" },
  { id: "link",  name: "Konektivitas Jaringan & Ping Test" },
  { id: "backup", name: "Pencadangan (Backup) Konfigurasi" }
];

// 2. Definisi Slot Foto Dokumentasi
const PHOTO_SLOTS = [
  { id: "before", label: "1. Foto Sebelum (Before)", req: true },
  { id: "during", label: "2. Foto Pengerjaan (During)", req: false },
  { id: "after",  label: "3. Foto Sesudah (After)",  req: true },
  { id: "pic",    label: "4. Foto Berita Acara / PIC Site", req: false }
];

// State Penyimpanan Gambar
const photoData = {
  before: null,
  during: null,
  after: null,
  pic: null
};

// State Pemeriksaan PM
const pmState = {};

// Key LocalStorage
const STORAGE_CFG_URL = "pentakom_apps_script_url";
const STORAGE_DRAFT   = "pentakom_cmpm_draft";

// Inisialisasi saat Halaman Dimuat
document.addEventListener("DOMContentLoaded", () => {
  initDefaults();
  renderCompareItems();
  renderPhotoGrid();
  loadConfig();
  restoreDraft();
  setupAutoSave();
});

// -------------------------------------------------------------
// KONFIGURASI URL APPS SCRIPT
// -------------------------------------------------------------
function toggleConfig() {
  const wrap = document.getElementById("configWrap");
  wrap.classList.toggle("show");
}

function saveConfig() {
  const url = document.getElementById("cfgAppsScriptUrl").value.trim();
  localStorage.setItem(STORAGE_CFG_URL, url);
  const msg = document.getElementById("cfgSavedMsg");
  msg.textContent = "✔ Tersimpan!";
  setTimeout(() => { msg.textContent = ""; }, 2500);
}

function loadConfig() {
  const savedUrl = localStorage.getItem(STORAGE_CFG_URL) || "";
  document.getElementById("cfgAppsScriptUrl").value = savedUrl;
}

// -------------------------------------------------------------
// DEFAULT VALUE & TIKET
// -------------------------------------------------------------
function initDefaults() {
  // Generate Nomor Tiket
  const today = new Date();
  const dStr = today.toISOString().slice(0, 10).replace(/-/g, "");
  const rPart = Math.random().toString(36).substring(2, 6).toUpperCase();
  document.getElementById("ticketNo").value = `PKM-${dStr}-${rPart}`;

  // Default Tanggal & Waktu Hari Ini
  document.getElementById("workDate").value = today.toISOString().slice(0, 10);
  const hours = String(today.getHours()).padStart(2, '0');
  const minutes = String(today.getMinutes()).padStart(2, '0');
  document.getElementById("workTime").value = `${hours}:${minutes}`;
}

// -------------------------------------------------------------
// WORK TYPE SWITCHER (CM vs PM)
// -------------------------------------------------------------
function setWorkType(type) {
  document.getElementById("workType").value = type;
  const btnPM = document.getElementById("btnTabPM");
  const btnCM = document.getElementById("btnTabCM");
  const cardPM = document.getElementById("cardPM");
  const cardCM = document.getElementById("cardCM");

  if (type === "PM") {
    btnPM.className = "work-type-btn active-pm";
    btnCM.className = "work-type-btn";
    cardPM.classList.remove("hidden");
    cardCM.classList.add("hidden");
  } else {
    btnPM.className = "work-type-btn";
    btnCM.className = "work-type-btn active-cm";
    cardPM.classList.add("hidden");
    cardCM.classList.remove("hidden");
  }
}

// -------------------------------------------------------------
// RENDER STATUS INSPEKSI PM (TOGGLE BAIK / BURUK)
// -------------------------------------------------------------
function renderCompareItems() {
  const container = document.getElementById("compareItemsList");
  container.innerHTML = "";

  PM_COMPONENTS.forEach((comp) => {
    pmState[comp.id] = {
      before: "Baik",
      after: "Baik",
      notes: ""
    };

    const item = document.createElement("div");
    item.className = "compare-item";
    item.innerHTML = `
      <div class="ci-label">📌 ${comp.name}</div>
      <div class="ci-grid">
        <div class="ci-col">
          <span class="ci-tag">Kondisi Awal (Sebelum)</span>
          <div class="toggle-group">
            <button type="button" class="toggle-btn active-baik" id="btn_${comp.id}_b_baik" onclick="setPmStatus('${comp.id}', 'before', 'Baik')">Baik</button>
            <button type="button" class="toggle-btn" id="btn_${comp.id}_b_buruk" onclick="setPmStatus('${comp.id}', 'before', 'Buruk')">Buruk</button>
          </div>
        </div>
        <div class="ci-col">
          <span class="ci-tag">Kondisi Akhir (Sesudah)</span>
          <div class="toggle-group">
            <button type="button" class="toggle-btn active-baik" id="btn_${comp.id}_a_baik" onclick="setPmStatus('${comp.id}', 'after', 'Baik')">Baik</button>
            <button type="button" class="toggle-btn" id="btn_${comp.id}_a_buruk" onclick="setPmStatus('${comp.id}', 'after', 'Buruk')">Buruk</button>
          </div>
        </div>
      </div>
      <div class="extra-field">
        <input type="text" id="note_${comp.id}" placeholder="Catatan kondisi ${comp.name} (opsional)..." oninput="pmState['${comp.id}'].notes = this.value">
      </div>
    `;
    container.appendChild(item);
  });
}

function setPmStatus(compId, phase, status) {
  pmState[compId][phase] = status;
  const btnBaik = document.getElementById(`btn_${compId}_${phase === 'before' ? 'b' : 'a'}_baik`);
  const btnBuruk = document.getElementById(`btn_${compId}_${phase === 'before' ? 'b' : 'a'}_buruk`);

  if (status === "Baik") {
    btnBaik.className = "toggle-btn active-baik";
    btnBuruk.className = "toggle-btn";
  } else {
    btnBaik.className = "toggle-btn";
    btnBuruk.className = "toggle-btn active-buruk";
  }
}

// -------------------------------------------------------------
// RENDER & KOMPRESI FOTO
// -------------------------------------------------------------
function renderPhotoGrid() {
  const grid = document.getElementById("photoGrid");
  grid.innerHTML = "";

  PHOTO_SLOTS.forEach((slot) => {
    const box = document.createElement("div");
    box.className = "photo-slot";
    box.id = `slot_${slot.id}`;
    box.innerHTML = `
      <div class="ps-label">${slot.label} ${slot.req ? '<span style="color:var(--danger)">*</span>' : ''}</div>
      <div class="photo-preview" id="preview_${slot.id}" onclick="document.getElementById('input_${slot.id}').click()">
        <span id="ph_${slot.id}">📷 Klik / Ambil Foto</span>
      </div>
      <div class="photo-actions">
        <label class="upl" for="input_${slot.id}">Pilih Foto</label>
        <button type="button" class="clear-btn" onclick="clearPhoto('${slot.id}')">Hapus</button>
      </div>
      <input type="file" id="input_${slot.id}" accept="image/*" capture="environment" onchange="handlePhotoUpload('${slot.id}', this)">
    `;
    grid.appendChild(box);
  });
}

async function handlePhotoUpload(slotId, inputEl) {
  const file = inputEl.files[0];
  if (!file) return;

  try {
    const compressedBase64 = await compressImage(file, 1200, 0.72);
    photoData[slotId] = compressedBase64;

    const preview = document.getElementById(`preview_${slotId}`);
    preview.innerHTML = `<img src="${compressedBase64}" alt="${slotId}">`;
    document.getElementById(`slot_${slotId}`).classList.add("filled");
  } catch (err) {
    alert("Gagal memproses gambar: " + err.message);
  }
}

function clearPhoto(slotId) {
  photoData[slotId] = null;
  const inputEl = document.getElementById(`input_${slotId}`);
  if (inputEl) inputEl.value = "";
  const preview = document.getElementById(`preview_${slotId}`);
  preview.innerHTML = `<span id="ph_${slotId}">📷 Klik / Ambil Foto</span>`;
  document.getElementById(`slot_${slotId}`).classList.remove("filled");
}

function compressImage(file, maxDimension, quality) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = () => reject(new Error("Format gambar tidak didukung"));
      img.src = e.target.result;
    };
    reader.onerror = () => reject(new Error("Gagal membaca file gambar"));
    reader.readAsDataURL(file);
  });
}

// -------------------------------------------------------------
// AUTO-SAVE & DRAFT LOCALSTORAGE
// -------------------------------------------------------------
function setupAutoSave() {
  document.getElementById("mainForm").addEventListener("input", () => {
    saveDraft();
  });
}

function saveDraft() {
  const draft = {
    workType: document.getElementById("workType").value,
    techName: document.getElementById("techName").value,
    techPhone: document.getElementById("techPhone").value,
    techRegion: document.getElementById("techRegion").value,
    clientName: document.getElementById("clientName").value,
    siteName: document.getElementById("siteName").value,
    siteAddress: document.getElementById("siteAddress").value,
    picName: document.getElementById("picName").value,
    picPhone: document.getElementById("picPhone").value,
    deviceType: document.getElementById("deviceType").value,
    deviceBrand: document.getElementById("deviceBrand").value,
    deviceSerial: document.getElementById("deviceSerial").value,
    cmIssue: document.getElementById("cmIssue").value,
    cmRootCause: document.getElementById("cmRootCause").value,
    cmAction: document.getElementById("cmAction").value,
    cmSparepart: document.getElementById("cmSparepart").value,
    workStatus: document.getElementById("workStatus").value,
    recommendations: document.getElementById("recommendations").value
  };
  localStorage.setItem(STORAGE_DRAFT, JSON.stringify(draft));
}

function restoreDraft() {
  try {
    const raw = localStorage.getItem(STORAGE_DRAFT);
    if (!raw) return;
    const d = JSON.parse(raw);
    if (d.workType) setWorkType(d.workType);
    if (d.techName) document.getElementById("techName").value = d.techName;
    if (d.techPhone) document.getElementById("techPhone").value = d.techPhone;
    if (d.techRegion) document.getElementById("techRegion").value = d.techRegion;
    if (d.clientName) document.getElementById("clientName").value = d.clientName;
    if (d.siteName) document.getElementById("siteName").value = d.siteName;
    if (d.siteAddress) document.getElementById("siteAddress").value = d.siteAddress;
    if (d.picName) document.getElementById("picName").value = d.picName;
    if (d.picPhone) document.getElementById("picPhone").value = d.picPhone;
    if (d.deviceType) document.getElementById("deviceType").value = d.deviceType;
    if (d.deviceBrand) document.getElementById("deviceBrand").value = d.deviceBrand;
    if (d.deviceSerial) document.getElementById("deviceSerial").value = d.deviceSerial;
    if (d.cmIssue) document.getElementById("cmIssue").value = d.cmIssue;
    if (d.cmRootCause) document.getElementById("cmRootCause").value = d.cmRootCause;
    if (d.cmAction) document.getElementById("cmAction").value = d.cmAction;
    if (d.cmSparepart) document.getElementById("cmSparepart").value = d.cmSparepart;
    if (d.workStatus) document.getElementById("workStatus").value = d.workStatus;
    if (d.recommendations) document.getElementById("recommendations").value = d.recommendations;
  } catch (e) {
    console.warn("Gagal memulihkan draf:", e);
  }
}

// -------------------------------------------------------------
// GENERATE & DOWNLOAD WORD (.DOCX) DI BROWSER (MENGGUNAKAN DOCX.JS)
// -------------------------------------------------------------
async function generateDocxBlob() {
  if (typeof docx === "undefined") {
    throw new Error("Library docx belum siap dimuat. Periksa koneksi internet.");
  }

  const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, AlignmentType, HeadingLevel, ImageRun, BorderStyle } = docx;

  const ticketNo = document.getElementById("ticketNo").value;
  const workType = document.getElementById("workType").value;
  const workDate = document.getElementById("workDate").value;
  const workTime = document.getElementById("workTime").value;
  const techName = document.getElementById("techName").value || "-";
  const techPhone = document.getElementById("techPhone").value || "-";
  const techRegion = document.getElementById("techRegion").value || "-";
  const clientName = document.getElementById("clientName").value || "-";
  const siteName = document.getElementById("siteName").value || "-";
  const siteAddress = document.getElementById("siteAddress").value || "-";
  const picName = document.getElementById("picName").value || "-";
  const picPhone = document.getElementById("picPhone").value || "-";
  const deviceType = document.getElementById("deviceType").value || "-";
  const deviceBrand = document.getElementById("deviceBrand").value || "-";
  const deviceSerial = document.getElementById("deviceSerial").value || "-";
  const workStatus = document.getElementById("workStatus").value;
  const recommendations = document.getElementById("recommendations").value || "-";

  // Helper Baris Tabel Metadata
  function makeMetaRow(label1, val1, label2, val2) {
    return new TableRow({
      children: [
        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: label1, bold: true })] })], width: { size: 22, type: WidthType.PERCENTAGE } }),
        new TableCell({ children: [new Paragraph(val1)], width: { size: 28, type: WidthType.PERCENTAGE } }),
        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: label2, bold: true })] })], width: { size: 22, type: WidthType.PERCENTAGE } }),
        new TableCell({ children: [new Paragraph(val2)], width: { size: 28, type: WidthType.PERCENTAGE } })
      ]
    });
  }

  const docChildren = [
    // Judul Dokumen
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({ text: "PT. PENTAKOM TEKNOLOGI SERVIS", bold: true, size: 28, color: "0F2942" })
      ]
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({ text: `BERITA ACARA & LAPORAN PEMELIHARAAN (${workType === 'CM' ? 'CORRECTIVE MAINTENANCE' : 'PREVENTIVE MAINTENANCE'})`, bold: true, size: 24, color: "2F6FED" })
      ]
    }),
    new Paragraph({ text: "" }),

    // Tabel Informasi Umum
    new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: "1. INFORMASI PELAKSANAAN & SITE", bold: true, size: 20 })] }),
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        makeMetaRow("No. Tiket / BA", ticketNo, "Tipe Pekerjaan", workType === "CM" ? "Corrective (CM)" : "Preventive (PM)"),
        makeMetaRow("Tanggal Kunjungan", workDate, "Waktu Pengerjaan", workTime),
        makeMetaRow("Nama Teknisi", techName, "No. Kontak Teknisi", techPhone),
        makeMetaRow("Wilayah / Regional", techRegion, "Nama Pelanggan / Klien", clientName),
        makeMetaRow("Nama Site / Cabang", siteName, "PIC Klien Setempat", `${picName} (${picPhone})`),
        makeMetaRow("Perangkat Diperiksa", deviceType, "Merk & Model", deviceBrand),
        makeMetaRow("Serial Number (S/N)", deviceSerial, "Alamat Site", siteAddress)
      ]
    }),
    new Paragraph({ text: "" })
  ];

  // Bagian Detail Teknis
  if (workType === "CM") {
    const cmIssue = document.getElementById("cmIssue").value || "-";
    const cmRootCause = document.getElementById("cmRootCause").value || "-";
    const cmAction = document.getElementById("cmAction").value || "-";
    const cmSparepart = document.getElementById("cmSparepart").value || "-";

    docChildren.push(
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: "2. RINCIAN PERBAIKAN KERUSAKAN (CM)", bold: true, size: 20 })] }),
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [
          new TableRow({ children: [new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Gejala Kerusakan Awal", bold: true })] })], width: { size: 30, type: WidthType.PERCENTAGE } }), new TableCell({ children: [new Paragraph(cmIssue)], width: { size: 70, type: WidthType.PERCENTAGE } })] }),
          new TableRow({ children: [new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Analisis Akar Masalah", bold: true })] })] }), new TableCell({ children: [new Paragraph(cmRootCause)] })] }),
          new TableRow({ children: [new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Tindakan Solusi / Perbaikan", bold: true })] })] }), new TableCell({ children: [new Paragraph(cmAction)] })] }),
          new TableRow({ children: [new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Penggantian Sparepart", bold: true })] })] }), new TableCell({ children: [new Paragraph(cmSparepart)] })] })
        ]
      }),
      new Paragraph({ text: "" })
    );
  } else {
    // Tabel Status Pemeriksaan PM
    const pmRows = [
      new TableRow({
        children: [
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "No", bold: true })] })], width: { size: 8, type: WidthType.PERCENTAGE } }),
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Komponen / Item Pemeriksaan", bold: true })] })], width: { size: 38, type: WidthType.PERCENTAGE } }),
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Kondisi Awal", bold: true })] })], width: { size: 18, type: WidthType.PERCENTAGE } }),
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Kondisi Akhir", bold: true })] })], width: { size: 18, type: WidthType.PERCENTAGE } }),
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Catatan", bold: true })] })], width: { size: 18, type: WidthType.PERCENTAGE } })
        ]
      })
    ];

    PM_COMPONENTS.forEach((comp, idx) => {
      const state = pmState[comp.id] || { before: "Baik", after: "Baik", notes: "" };
      pmRows.push(
        new TableRow({
          children: [
            new TableCell({ children: [new Paragraph(String(idx + 1))] }),
            new TableCell({ children: [new Paragraph(comp.name)] }),
            new TableCell({ children: [new Paragraph(state.before)] }),
            new TableCell({ children: [new Paragraph(state.after)] }),
            new TableCell({ children: [new Paragraph(state.notes || "-")] })
          ]
        })
      );
    });

    docChildren.push(
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: "2. STATUS PEMERIKSAAN RUTIN (PM)", bold: true, size: 20 })] }),
      new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, rows: pmRows }),
      new Paragraph({ text: "" })
    );
  }

  // Bagian Hasil Akhir
  docChildren.push(
    new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: "3. HASIL AKHIR & REKOMENDASI", bold: true, size: 20 })] }),
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({ children: [new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Status Pekerjaan", bold: true })] })], width: { size: 30, type: WidthType.PERCENTAGE } }), new TableCell({ children: [new Paragraph(workStatus)], width: { size: 70, type: WidthType.PERCENTAGE } })] }),
        new TableRow({ children: [new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Rekomendasi Tindak Lanjut", bold: true })] })] }), new TableCell({ children: [new Paragraph(recommendations)] })] })
      ]
    }),
    new Paragraph({ text: "" })
  );

  // Bagian Foto Bukti (Jika Ada)
  docChildren.push(
    new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: "4. DOKUMENTASI FOTO PEKERJAAN", bold: true, size: 20 })] })
  );

  for (const slot of PHOTO_SLOTS) {
    if (photoData[slot.id]) {
      const base64Clean = photoData[slot.id].replace(/^data:image\/\w+;base64,/, "");
      const binaryString = atob(base64Clean);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      docChildren.push(
        new Paragraph({ children: [new TextRun({ text: slot.label, bold: true })] }),
        new Paragraph({
          children: [
            new ImageRun({
              data: bytes,
              transformation: { width: 320, height: 240 }
            })
          ]
        }),
        new Paragraph({ text: "" })
      );
    }
  }

  // Tanda Tangan / Lembar Pengesahan
  docChildren.push(
    new Paragraph({ text: "" }),
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Teknisi Pelaksana,", bold: true })] })], width: { size: 50, type: WidthType.PERCENTAGE } }),
            new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Pendamping / PIC Site,", bold: true })] })], width: { size: 50, type: WidthType.PERCENTAGE } })
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

  const doc = new Document({
    sections: [{ children: docChildren }]
  });

  return await Packer.toBlob(doc);
}

// Handler Tombol: "Simpan ke HP / Laptop"
async function downloadLocalWord() {
  const logEl = document.getElementById("statusLog");
  logEl.classList.add("show");
  logEl.textContent = "⏳ Sedang membuat berkas Word (.docx)...";

  try {
    const blob = await generateDocxBlob();
    const ticketNo = document.getElementById("ticketNo").value;
    const client = (document.getElementById("clientName").value || "Klien").replace(/[^a-zA-Z0-9]/g, "_");
    const filename = `${ticketNo}_${client}.docx`;

    const downloadUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(downloadUrl);

    logEl.textContent = `✔ Berkas berhasil diunduh ke perangkat Anda:\n📂 ${filename}`;
  } catch (err) {
    logEl.textContent = `❌ Gagal membuat berkas Word: ${err.message}`;
  }
}

// -------------------------------------------------------------
// SUBMIT KE GOOGLE DRIVE & GOOGLE SHEETS
// -------------------------------------------------------------
async function submitReport() {
  const logEl = document.getElementById("statusLog");
  const pWrap = document.getElementById("progressWrap");
  const pBar = document.getElementById("progressBar");
  const btn = document.getElementById("submitBtn");

  // Validasi Input Wajib
  const techName = document.getElementById("techName").value.trim();
  const clientName = document.getElementById("clientName").value.trim();
  const siteName = document.getElementById("siteName").value.trim();
  const deviceSerial = document.getElementById("deviceSerial").value.trim();

  if (!techName || !clientName || !siteName || !deviceSerial) {
    alert("Harap lengkapi:\n- Nama Teknisi\n- Nama Pelanggan / Klien\n- Nama Site\n- Serial Number Perangkat");
    return;
  }

  if (!photoData.before || !photoData.after) {
    alert("Harap sertakan minimal Foto Sebelum (Before) dan Foto Sesudah (After) pengerjaan!");
    return;
  }

  const gasUrl = localStorage.getItem(STORAGE_CFG_URL);
  if (!gasUrl) {
    toggleConfig();
    alert("Harap masukkan URL Google Apps Script Backend di baris Pengaturan atas!");
    return;
  }

  logEl.classList.add("show");
  pWrap.style.display = "block";
  pBar.style.width = "20%";
  btn.disabled = true;

  logEl.textContent = "⏳ [1/3] Membuat dokumen Word laporan (.docx)...";

  try {
    // 1. Generate Word Blob
    const docxBlob = await generateDocxBlob();
    pBar.style.width = "40%";

    // Convert Blob to Base64
    logEl.textContent = "⏳ [2/3] Mengompresi berkas dan menyusun payload data...";
    const reader = new FileReader();
    const docxBase64 = await new Promise((resolve, reject) => {
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(docxBlob);
    });

    pBar.style.width = "65%";
    logEl.textContent = "⏳ [3/3] Mengirimkan data dan berkas ke Google Drive & Sheets...";

    // Siapkan checklist PM jika tipe PM
    const pmSummary = [];
    PM_COMPONENTS.forEach((c) => {
      const st = pmState[c.id];
      if (st) {
        pmSummary.push(`${c.name}: [Awal: ${st.before}, Akhir: ${st.after}] ${st.notes ? '(' + st.notes + ')' : ''}`);
      }
    });

    const payload = {
      ticketNo: document.getElementById("ticketNo").value,
      workType: document.getElementById("workType").value,
      workDate: document.getElementById("workDate").value + " " + document.getElementById("workTime").value,
      techName: techName,
      techPhone: document.getElementById("techPhone").value,
      techRegion: document.getElementById("techRegion").value,
      clientName: clientName,
      siteName: siteName,
      siteAddress: document.getElementById("siteAddress").value,
      picName: document.getElementById("picName").value,
      picContact: document.getElementById("picPhone").value,
      deviceType: document.getElementById("deviceType").value,
      deviceBrand: document.getElementById("deviceBrand").value,
      deviceSerial: deviceSerial,
      cmIssue: document.getElementById("cmIssue").value || "-",
      cmRootCause: document.getElementById("cmRootCause").value || "-",
      cmAction: document.getElementById("cmAction").value || "-",
      cmSparepart: document.getElementById("cmSparepart").value || "-",
      pmChecklist: pmSummary.join(" | "),
      pmNotes: "-",
      workStatus: document.getElementById("workStatus").value,
      recommendations: document.getElementById("recommendations").value,
      photoBefore: photoData.before || "",
      photoDuring: photoData.during || "",
      photoAfter: photoData.after || "",
      photoPic: photoData.pic || "",
      docxBase64: docxBase64
    };

    const res = await fetch(gasUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload)
    });

    const resText = await res.text();
    pBar.style.width = "100%";
    btn.disabled = false;

    logEl.textContent = `🎉 LAPORAN BERHASIL DISIMPAN!\n` +
      `Nomor Tiket : ${payload.ticketNo}\n` +
      `Klien & Site: ${payload.clientName} - ${payload.siteName}\n` +
      `Berkas Word (.docx) dan foto bukti kerja telah diarsipkan ke Google Drive Pentakom.`;

    // Hapus draft setelah berhasil
    localStorage.removeItem(STORAGE_DRAFT);

  } catch (err) {
    pBar.style.width = "0%";
    btn.disabled = false;
    logEl.textContent = `❌ Terjadi kesalahan saat pengiriman:\n${err.message}\n\nPastikan URL Web App Google Apps Script sudah benar & hak akses: 'Anyone'.`;
  }
}
