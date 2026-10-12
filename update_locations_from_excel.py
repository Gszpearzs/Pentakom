#!/usr/bin/env python3
"""
Skrip Otomatisasi Pentakom:
Membaca file data teknis (Template_Data_Teknis_Pentakom.csv atau .xlsx)
dan memperbarui database lokasi di 'locations.js' untuk auto-fill di web app.
"""

import os
import sys
import csv
import json
import zipfile
import xml.etree.ElementTree as ET

def col_to_index(col_str):
    res = 0
    for char in col_str:
        if 'A' <= char <= 'Z':
            res = res * 26 + (ord(char) - ord('A') + 1)
    return res - 1

def read_from_xlsx(xlsx_path):
    if not os.path.exists(xlsx_path):
        return None
    try:
        with zipfile.ZipFile(xlsx_path, 'r') as z:
            sheet_content = z.read('xl/worksheets/sheet1.xml')
            root = ET.fromstring(sheet_content)
            ns = {'ns': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
            
            rows_data = []
            for row in root.findall('.//ns:sheetData/ns:row', ns):
                cells = {}
                max_c = 0
                for c in row.findall('ns:c', ns):
                    ref = c.attrib.get('r', '')
                    col_letters = ''.join([ch for ch in ref if ch.isalpha()])
                    col_idx = col_to_index(col_letters)
                    max_c = max(max_c, col_idx)
                    
                    val = ''
                    # inlineStr
                    is_elem = c.find('ns:is/ns:t', ns)
                    if is_elem is not None and is_elem.text:
                        val = is_elem.text
                    else:
                        v_elem = c.find('ns:v', ns)
                        if v_elem is not None and v_elem.text:
                            val = v_elem.text
                    cells[col_idx] = val.strip()

                if cells:
                    row_list = [cells.get(i, '') for i in range(max_c + 1)]
                    rows_data.append(row_list)

            if len(rows_data) < 2:
                return None

            header = [str(h).strip().upper() for h in rows_data[0]]
            parsed = []
            for r in rows_data[1:]:
                if not any(r):
                    continue
                row_dict = {}
                for idx, h in enumerate(header):
                    row_dict[h] = r[idx] if idx < len(r) else ''
                parsed.append(row_dict)
            return parsed
    except Exception as e:
        print(f"Peringatan: Gagal membaca file xlsx secara langsung ({e}), menggunakan fallback CSV...")
        return None

def read_from_csv(csv_path):
    if not os.path.exists(csv_path):
        return None
    with open(csv_path, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        return list(reader)

def main():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    xlsx_path = os.path.join(base_dir, 'Template_Data_Teknis_Pentakom.xlsx')
    csv_path = os.path.join(base_dir, 'Template_Data_Teknis_Pentakom.csv')
    loc_path = os.path.join(base_dir, 'locations.js')

    print("=== PENTAKOM DATA TEKNIS IMPORTER ===")
    
    records = None
    if os.path.exists(xlsx_path):
        print(f"Mencoba membaca dari Excel: {xlsx_path}")
        records = read_from_xlsx(xlsx_path)

    if not records and os.path.exists(csv_path):
        print(f"Membaca dari CSV: {csv_path}")
        records = read_from_csv(csv_path)

    if not records:
        print("Error: Tidak ditemukan file Template_Data_Teknis_Pentakom.xlsx atau .csv!")
        sys.exit(1)

    print(f"Berhasil membaca {len(records)} baris data.")

    # Ambil existing master database jika ada
    existing_db = []
    logo1 = ''
    logo2 = ''
    if os.path.exists(loc_path):
        with open(loc_path, 'r', encoding='utf-8') as f:
            for l in f:
                if l.startswith('const LOCATION_DB = '):
                    try:
                        prefix = 'const LOCATION_DB = '
                        existing_db = json.loads(l[len(prefix):].rstrip(';\n'))
                    except:
                        pass
                elif l.startswith('const LOGO1_B64'):
                    logo1 = l.strip()
                elif l.startswith('const LOGO2_B64'):
                    logo2 = l.strip()

    # Buat map existing berdasarkan ID
    merged_map = {item['id']: item for item in existing_db if 'id' in item}

    updated_count = 0
    added_count = 0

    for r in records:
        site_id = (r.get('SITE_ID') or '').strip()
        nama = (r.get('NAMA_SITE') or '').strip()
        if not site_id and not nama:
            continue

        lat_val = (r.get('LATITUDE') or '').strip()
        lon_val = (r.get('LONGITUDE') or '').strip()
        try:
            lat = float(lat_val) if lat_val else ''
        except:
            lat = lat_val
        try:
            lon = float(lon_val) if lon_val else ''
        except:
            lon = lon_val

        item_data = {
            'id': site_id,
            'nama': nama,
            'pemilik': (r.get('PEMILIK_SITE') or 'PT Pentakom').strip(),
            'tipe': (r.get('TIPE_LOKASI') or '').strip(),
            'provinsi': (r.get('PROVINSI') or '').strip(),
            'kabupaten': (r.get('KABUPATEN_KOTA') or '').strip(),
            'alamat': (r.get('ALAMAT') or '').strip(),
            'kategori': (r.get('KATEGORI') or '').strip(),
            'lat': lat,
            'lon': lon,
            'sn': {
                'modem': (r.get('SN_MODEM') or '').strip(),
                'router': (r.get('SN_ROUTER') or '').strip(),
                'ap1': (r.get('SN_AP_INDOOR') or '').strip(),
                'ap2': (r.get('SN_AP_OUTDOOR') or '').strip(),
                'antenna': (r.get('SN_ANTENNA') or '').strip(),
                'transiver': (r.get('SN_BUC_TRANSCEIVER') or '').strip(),
                'rack': (r.get('SN_RACK') or '').strip(),
                'stabilizer': (r.get('SN_STABILIZER') or '').strip()
            }
        }

        if site_id in merged_map:
            merged_map[site_id].update(item_data)
            updated_count += 1
        else:
            merged_map[site_id] = item_data
            added_count += 1

    final_db = list(merged_map.values())
    print(f"Hasil: {updated_count} site diperbarui, {added_count} site baru ditambahkan.")
    print(f"Total database saat ini: {len(final_db)} site.")

    # Tulis ulang locations.js
    with open(loc_path, 'w', encoding='utf-8') as f:
        f.write(f"const LOCATION_DB = {json.dumps(final_db, ensure_ascii=False)};\n")
        if logo1:
            f.write(f"{logo1}\n")
        if logo2:
            f.write(f"{logo2}\n")

    print(f"Sukses! File '{loc_path}' berhasil diperbarui.")
    print("Sekarang jalankan 'git add . && git commit -m \"Update data teknis\" && git push origin main'")

if __name__ == '__main__':
    main()
