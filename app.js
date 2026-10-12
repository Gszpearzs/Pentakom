/**
 * Pentakom CM-PM Form - Client Application Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const form = document.getElementById('cmpmForm');
  const radioCM = document.getElementById('radioCM');
  const radioPM = document.getElementById('radioPM');
  const sectionCM = document.getElementById('sectionCM');
  const sectionPM = document.getElementById('sectionPM');
  const ticketNoInput = document.getElementById('ticketNo');
  const btnGenTicket = document.getElementById('btnGenTicket');
  const workDateInput = document.getElementById('workDate');
  const techNameInput = document.getElementById('techName');
  const picNameInput = document.getElementById('picName');
  const captionTechName = document.getElementById('captionTechName');
  const captionPicName = document.getElementById('captionPicName');

  // Photo Elements
  const photos = {
    before: {
      input: document.getElementById('inputPhotoBefore'),
      wrapper: document.getElementById('previewWrapperBefore'),
      placeholder: document.getElementById('placeholderBefore'),
      img: document.getElementById('imgPreviewBefore'),
      removeBtn: document.getElementById('btnRemoveBefore'),
      base64: null
    },
    during: {
      input: document.getElementById('inputPhotoDuring'),
      wrapper: document.getElementById('previewWrapperDuring'),
      placeholder: document.getElementById('placeholderDuring'),
      img: document.getElementById('imgPreviewDuring'),
      removeBtn: document.getElementById('btnRemoveDuring'),
      base64: null
    },
    after: {
      input: document.getElementById('inputPhotoAfter'),
      wrapper: document.getElementById('previewWrapperAfter'),
      placeholder: document.getElementById('placeholderAfter'),
      img: document.getElementById('imgPreviewAfter'),
      removeBtn: document.getElementById('btnRemoveAfter'),
      base64: null
    }
  };

  // Signature Elements
  const canvasTech = document.getElementById('canvasSigTech');
  const canvasPic = document.getElementById('canvasSigPic');
  const btnClearSigTech = document.getElementById('btnClearSigTech');
  const btnClearSigPic = document.getElementById('btnClearSigPic');

  // Modals & Notifs
  const modalConfig = document.getElementById('modalConfig');
  const btnOpenConfig = document.getElementById('btnOpenConfig');
  const btnCloseConfig = document.getElementById('btnCloseConfig');
  const btnSaveConfig = document.getElementById('btnSaveConfig');
  const inputScriptUrl = document.getElementById('inputScriptUrl');
  const connStatusText = document.getElementById('connStatusText');
  const connStatusIcon = document.getElementById('connStatusIcon');
  const configStatusDot = document.getElementById('configStatusDot');

  const draftNotice = document.getElementById('draftNotice');
  const btnRestoreDraft = document.getElementById('btnRestoreDraft');
  const btnDismissDraft = document.getElementById('btnDismissDraft');

  const modalLoading = document.getElementById('modalLoading');
  const modalSuccess = document.getElementById('modalSuccess');
  const btnNewReport = document.getElementById('btnNewReport');

  // Success Card Fields
  const successTicketNo = document.getElementById('successTicketNo');
  const successWorkType = document.getElementById('successWorkType');
  const successClientSite = document.getElementById('successClientSite');
  const successStatus = document.getElementById('successStatus');

  // LocalStorage Keys
  const STORAGE_KEY_GAS_URL = 'pentakom_gas_endpoint_url';
  const STORAGE_KEY_DRAFT = 'pentakom_cmpm_form_draft';

  // 1. Initial State Setup
  initDateTime();
  initTicketNumber();
  initSignaturePad(canvasTech);
  initSignaturePad(canvasPic);
  setupPhotoHandlers();
  checkGasConfig();
  checkDraftAvailable();

  // 2. Dynamic Work Type Switching (CM vs PM)
  function toggleWorkType(type) {
    if (type === 'CM') {
      sectionCM.classList.remove('hidden');
      sectionPM.classList.add('hidden');
      document.getElementById('cmIssue').required = true;
      document.getElementById('cmAction').required = true;
    } else {
      sectionCM.classList.add('hidden');
      sectionPM.classList.remove('hidden');
      document.getElementById('cmIssue').required = false;
      document.getElementById('cmAction').required = false;
    }
  }

  radioCM.addEventListener('change', () => toggleWorkType('CM'));
  radioPM.addEventListener('change', () => toggleWorkType('PM'));

  // 3. Ticket Number Generation
  function generateTicketId() {
    const today = new Date();
    const dateStr = today.toISOString().slice(0, 10).replace(/-/g, '');
    const randPart = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `PKM-${dateStr}-${randPart}`;
  }

  function initTicketNumber() {
    if (!ticketNoInput.value) {
      ticketNoInput.value = generateTicketId();
    }
  }

  btnGenTicket.addEventListener('click', () => {
    ticketNoInput.value = generateTicketId();
    saveDraft();
  });

  // 4. Set Current Date & Time default
  function initDateTime() {
    if (!workDateInput.value) {
      const now = new Date();
      now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
      workDateInput.value = now.toISOString().slice(0, 16);
    }
  }

  // 5. Signature Pad Implementation (Touch & Mouse Support)
  function initSignaturePad(canvas) {
    const ctx = canvas.getContext('2d');
    let isDrawing = false;
    let hasDrawn = false;

    // Resize canvas internal buffer to match display width
    function resizeCanvas() {
      const rect = canvas.getBoundingClientRect();
      const ratio = window.devicePixelRatio || 1;
      canvas.width = rect.width * ratio;
      canvas.height = rect.height * ratio;
      ctx.scale(ratio, ratio);
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    function getPos(e) {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    }

    function startDraw(e) {
      e.preventDefault();
      isDrawing = true;
      hasDrawn = true;
      const pos = getPos(e);
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
    }

    function moveDraw(e) {
      if (!isDrawing) return;
      e.preventDefault();
      const pos = getPos(e);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    }

    function stopDraw() {
      if (isDrawing) {
        isDrawing = false;
        ctx.closePath();
      }
    }

    // Touch events
    canvas.addEventListener('touchstart', startDraw, { passive: false });
    canvas.addEventListener('touchmove', moveDraw, { passive: false });
    canvas.addEventListener('touchend', stopDraw);

    // Mouse events
    canvas.addEventListener('mousedown', startDraw);
    canvas.addEventListener('mousemove', moveDraw);
    window.addEventListener('mouseup', stopDraw);

    canvas.clear = function() {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      hasDrawn = false;
    };

    canvas.hasSignature = function() {
      return hasDrawn;
    };

    canvas.getImageDataURL = function() {
      if (!hasDrawn) return '';
      return canvas.toDataURL('image/png');
    };
  }

  btnClearSigTech.addEventListener('click', () => canvasTech.clear());
  btnClearSigPic.addEventListener('click', () => canvasPic.clear());

  // Sync Names with Signature Captions
  techNameInput.addEventListener('input', (e) => {
    captionTechName.textContent = e.target.value.trim() ? `Teknisi: ${e.target.value}` : 'Teknisi Pentakom';
    saveDraft();
  });

  picNameInput.addEventListener('input', (e) => {
    captionPicName.textContent = e.target.value.trim() ? `PIC: ${e.target.value}` : 'PIC / Pendamping Site';
    saveDraft();
  });

  // 6. Photo Picker & Client-Side Image Compression (Max 1280px, ~200KB)
  function setupPhotoHandlers() {
    ['before', 'during', 'after'].forEach((key) => {
      const item = photos[key];

      item.wrapper.addEventListener('click', (e) => {
        if (e.target !== item.removeBtn) {
          item.input.click();
        }
      });

      item.input.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
          const compressedBase64 = await compressImage(file, 1280, 0.72);
          item.base64 = compressedBase64;
          item.img.src = compressedBase64;
          item.img.classList.remove('hidden');
          item.placeholder.classList.add('hidden');
          item.removeBtn.classList.remove('hidden');
        } catch (err) {
          alert('Gagal memproses gambar: ' + err.message);
        }
      });

      item.removeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        item.input.value = '';
        item.base64 = null;
        item.img.src = '';
        item.img.classList.add('hidden');
        item.placeholder.classList.remove('hidden');
        item.removeBtn.classList.add('hidden');
      });
    });
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

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', quality));
        };
        img.onerror = () => reject(new Error('Format file gambar tidak didukung'));
        img.src = e.target.result;
      };
      reader.onerror = () => reject(new Error('Gagal membaca file gambar'));
      reader.readAsDataURL(file);
    });
  }

  // 7. Local Draft Auto-Save & Restore
  form.addEventListener('input', debounce(saveDraft, 600));
  form.addEventListener('change', debounce(saveDraft, 600));

  function saveDraft() {
    const formData = new FormData(form);
    const draft = {};
    for (const [k, v] of formData.entries()) {
      if (k === 'pmChecklist') {
        if (!draft[k]) draft[k] = [];
        draft[k].push(v);
      } else {
        draft[k] = v;
      }
    }
    localStorage.setItem(STORAGE_KEY_DRAFT, JSON.stringify(draft));
  }

  function checkDraftAvailable() {
    const saved = localStorage.getItem(STORAGE_KEY_DRAFT);
    if (saved) {
      draftNotice.classList.remove('hidden');
    }
  }

  btnRestoreDraft.addEventListener('click', () => {
    try {
      const draft = JSON.parse(localStorage.getItem(STORAGE_KEY_DRAFT));
      if (!draft) return;

      Object.keys(draft).forEach((k) => {
        if (k === 'workType') {
          if (draft[k] === 'PM') {
            radioPM.checked = true;
            toggleWorkType('PM');
          } else {
            radioCM.checked = true;
            toggleWorkType('CM');
          }
        } else if (k === 'pmChecklist' && Array.isArray(draft[k])) {
          document.querySelectorAll('input[name="pmChecklist"]').forEach((cb) => {
            cb.checked = draft[k].includes(cb.value);
          });
        } else {
          const el = form.elements[k];
          if (el && el.type !== 'file' && el.type !== 'radio') {
            el.value = draft[k];
          }
        }
      });

      if (draft.techName) captionTechName.textContent = `Teknisi: ${draft.techName}`;
      if (draft.picName) captionPicName.textContent = `PIC: ${draft.picName}`;

      draftNotice.classList.add('hidden');
    } catch (e) {
      console.warn('Gagal memulihkan draf:', e);
    }
  });

  btnDismissDraft.addEventListener('click', () => {
    draftNotice.classList.add('hidden');
  });

  function clearDraft() {
    localStorage.removeItem(STORAGE_KEY_DRAFT);
    draftNotice.classList.add('hidden');
  }

  // 8. Configuration Modal (Google Apps Script URL)
  btnOpenConfig.addEventListener('click', () => {
    inputScriptUrl.value = localStorage.getItem(STORAGE_KEY_GAS_URL) || '';
    modalConfig.classList.remove('hidden');
  });

  btnCloseConfig.addEventListener('click', () => {
    modalConfig.classList.add('hidden');
  });

  btnSaveConfig.addEventListener('click', () => {
    const url = inputScriptUrl.value.trim();
    if (url) {
      localStorage.setItem(STORAGE_KEY_GAS_URL, url);
    } else {
      localStorage.removeItem(STORAGE_KEY_GAS_URL);
    }
    checkGasConfig();
    modalConfig.classList.add('hidden');
  });

  function checkGasConfig() {
    const url = localStorage.getItem(STORAGE_KEY_GAS_URL);
    if (url) {
      configStatusDot.classList.add('active');
      connStatusIcon.textContent = '✅';
      connStatusText.textContent = 'Status: Terhubung ke Google Apps Script Web App';
    } else {
      configStatusDot.classList.remove('active');
      connStatusIcon.textContent = '⚠️';
      connStatusText.textContent = 'Status: Belum ada URL Google Apps Script';
    }
  }

  // 9. Reset Form
  document.getElementById('btnResetForm').addEventListener('click', () => {
    if (confirm('Yakin ingin mengosongkan seluruh formulir? Data draf juga akan dihapus.')) {
      form.reset();
      canvasTech.clear();
      canvasPic.clear();
      ['before', 'during', 'after'].forEach((k) => photos[k].removeBtn.click());
      clearDraft();
      initDateTime();
      initTicketNumber();
      toggleWorkType('CM');
    }
  });

  // 10. Form Submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validasi HTML5 bawaan
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // Validasi Foto Before & After
    if (!photos.before.base64) {
      alert('Peringatan: Harap lampirkan Foto Sebelum (Before) pengerjaan.');
      photos.before.wrapper.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    if (!photos.after.base64) {
      alert('Peringatan: Harap lampirkan Foto Sesudah (After) pengerjaan.');
      photos.after.wrapper.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    // Cek Google Apps Script URL
    let gasUrl = localStorage.getItem(STORAGE_KEY_GAS_URL);
    if (!gasUrl) {
      const askUrl = prompt(
        'Harap masukkan URL Google Apps Script Web App Anda:\n(Contoh: https://script.google.com/macros/s/.../exec)'
      );
      if (askUrl && askUrl.trim()) {
        gasUrl = askUrl.trim();
        localStorage.setItem(STORAGE_KEY_GAS_URL, gasUrl);
        checkGasConfig();
      } else {
        alert('Pengiriman dibatalkan. URL Google Apps Script diperlukan untuk menyimpan laporan ke Google Drive & Sheets.');
        return;
      }
    }

    // Kumpulkan checklist PM jika ada
    const pmChecklistSelected = [];
    document.querySelectorAll('input[name="pmChecklist"]:checked').forEach((cb) => {
      pmChecklistSelected.push(cb.value);
    });

    const currentWorkType = radioCM.checked ? 'CM' : 'PM';

    // Susun Payload Lengkap
    const payload = {
      ticketNo: ticketNoInput.value.trim(),
      workType: currentWorkType,
      workDate: workDateInput.value,
      techName: techNameInput.value.trim(),
      techPhone: document.getElementById('techPhone').value.trim(),
      techRegion: document.getElementById('techRegion').value,
      clientName: document.getElementById('clientName').value.trim(),
      siteName: document.getElementById('siteName').value.trim(),
      siteAddress: document.getElementById('siteAddress').value.trim(),
      picName: picNameInput.value.trim(),
      picContact: document.getElementById('picContact').value.trim(),
      deviceType: document.getElementById('deviceType').value.trim(),
      deviceBrand: document.getElementById('deviceBrand').value.trim(),
      deviceSerial: document.getElementById('deviceSerial').value.trim(),
      
      // CM Specific
      cmIssue: currentWorkType === 'CM' ? document.getElementById('cmIssue').value.trim() : '-',
      cmRootCause: currentWorkType === 'CM' ? document.getElementById('cmRootCause').value.trim() : '-',
      cmAction: currentWorkType === 'CM' ? document.getElementById('cmAction').value.trim() : '-',
      cmSparepart: currentWorkType === 'CM' ? document.getElementById('cmSparepart').value.trim() : '-',
      
      // PM Specific
      pmChecklist: currentWorkType === 'PM' ? pmChecklistSelected.join(', ') : '-',
      pmNotes: currentWorkType === 'PM' ? document.getElementById('pmNotes').value.trim() : '-',

      // Final Status
      workStatus: document.getElementById('workStatus').value,
      recommendations: document.getElementById('recommendations').value.trim(),

      // Attachments & Signatures (Base64)
      photoBefore: photos.before.base64 || '',
      photoDuring: photos.during.base64 || '',
      photoAfter: photos.after.base64 || '',
      sigTech: canvasTech.getImageDataURL(),
      sigPic: canvasPic.getImageDataURL()
    };

    // Tampilkan Modal Loading
    modalLoading.classList.remove('hidden');

    try {
      // Kirim via POST text/plain JSON agar aman dari blokir CORS pada Google Apps Script
      const response = await fetch(gasUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify(payload)
      });

      let resultText = await response.text();
      let resultJson = null;
      try {
        resultJson = JSON.parse(resultText);
      } catch (err) {
        // jika respon tidak dalam format json tapi 200 OK
      }

      modalLoading.classList.add('hidden');

      // Tampilkan Modal Sukses
      successTicketNo.textContent = payload.ticketNo;
      successWorkType.textContent = payload.workType === 'CM' ? 'Corrective Maintenance (CM)' : 'Preventive Maintenance (PM)';
      successClientSite.textContent = `${payload.clientName} - ${payload.siteName}`;
      successStatus.textContent = payload.workStatus;

      modalSuccess.classList.remove('hidden');
      clearDraft();

    } catch (err) {
      modalLoading.classList.add('hidden');
      alert(
        'Gagal mengirim laporan ke Google Apps Script.\n\n' +
        'Kemungkinan penyebab:\n' +
        '1. URL Web App belum diset "Who has access: Anyone"\n' +
        '2. Koneksi internet terputus\n\n' +
        'Detail: ' + err.message
      );
    }
  });

  // 11. Modal Success Action
  btnNewReport.addEventListener('click', () => {
    modalSuccess.classList.add('hidden');
    form.reset();
    canvasTech.clear();
    canvasPic.clear();
    ['before', 'during', 'after'].forEach((k) => photos[k].removeBtn.click());
    initDateTime();
    initTicketNumber();
    toggleWorkType('CM');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Utility: Debounce
  function debounce(fn, delay) {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn.apply(this, args), delay);
    };
  }
});
