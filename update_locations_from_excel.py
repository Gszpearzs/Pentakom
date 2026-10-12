#!/usr/bin/env python3
"""
=============================================================================
PENTAKOM - PEMBARU DATA TEKNIS LOKASI (AUTOMATED SITE IMPORTER)
=============================================================================
Skrip otomatisasi untuk:
1. Membaca file data teknis dari Excel (.xlsx) atau CSV (.csv)
   yang memiliki struktur kolom sesuai Gambar 1:
   - Pemilik Site
   - Site ID ( Kode Lokasi )
   - Nama Site ( Nama Lokasi )
   - Alamat Lengkap Site / Lokasi
   - Provinsi
   - Kabupaten / Kota
   - Kelurahan / Desa
   - Latitude (Desimal)
   - Longitude (Desimal)
   (Serta kolom opsional Serial Number jika tersedia)

2. Menggabungkan data ke dalam 'locations.js' untuk auto-fill di web app form,
   dengan mempertahankan serial number hardware dan logo base64.

3. Memperbarui file template 'Template_Data_Teknis_Pentakom.csv' & '.xlsx'
   agar teknisi / admin selalu memiliki format standar terkini.
=============================================================================
"""

import os
import sys
import csv
import json
import zipfile
import re
import xml.etree.ElementTree as ET

def col_to_index(col_str):
    res = 0
    for char in col_str:
        if 'A' <= char <= 'Z':
            res = res * 26 + (ord(char) - ord('A') + 1)
    return res - 1

def normalize_owner(owner_str):
    if not owner_str:
        return ""
    s = owner_str.upper().replace('.', '').strip()
    s = re.sub(r'\s+', ' ', s)
    if 'PRIMACOM' in s:
        return 'PT Primacom Interbuana'
    if 'TRANSTEL' in s:
        return 'PT Transtel Universal'
    if 'DUTAKOM' in s:
        return 'PT Dutakom Wibawa Putra'
    if 'PENTAKOM' in s:
        return ''
    return owner_str.strip()

def clean_key(key):
    return re.sub(r'[^A-Z0-9]', '', str(key).upper())

def read_from_xlsx(xlsx_path):
    if not os.path.exists(xlsx_path):
        return None
    try:
        with zipfile.ZipFile(xlsx_path, 'r') as z:
            ns = {'ns': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
            
            # 1. Baca shared strings jika ada
            sst = []
            if 'xl/sharedStrings.xml' in z.namelist():
                root_sst = ET.fromstring(z.read('xl/sharedStrings.xml'))
                for si in root_sst.findall('.//ns:si', ns):
                    texts = [t.text for t in si.findall('.//ns:t', ns) if t.text]
                    sst.append(''.join(texts))

            # 2. Cari sheet1
            sheet_name = 'xl/worksheets/sheet1.xml'
            if sheet_name not in z.namelist():
                candidates = [f for f in z.namelist() if f.startswith('xl/worksheets/sheet')]
                if candidates:
                    sheet_name = candidates[0]
                else:
                    return None

            root_sheet = ET.fromstring(z.read(sheet_name))
            rows_data = []
            for row in root_sheet.findall('.//ns:sheetData/ns:row', ns):
                cells = {}
                max_c = 0
                for c in row.findall('ns:c', ns):
                    ref = c.attrib.get('r', '')
                    col_letters = ''.join([ch for ch in ref if ch.isalpha()])
                    col_idx = col_to_index(col_letters)
                    max_c = max(max_c, col_idx)
                    
                    cell_type = c.attrib.get('t', '')
                    v_elem = c.find('ns:v', ns)
                    is_elem = c.find('ns:is/ns:t', ns)
                    
                    val = ''
                    if is_elem is not None and is_elem.text:
                        val = is_elem.text
                    elif v_elem is not None and v_elem.text:
                        raw_v = v_elem.text
                        if cell_type == 's' and raw_v.isdigit():
                            idx = int(raw_v)
                            val = sst[idx] if idx < len(sst) else ''
                        else:
                            val = raw_v
                    cells[col_idx] = val.strip()

                if cells:
                    row_list = [cells.get(i, '') for i in range(max_c + 1)]
                    rows_data.append(row_list)

            if len(rows_data) < 2:
                return None

            headers = [h.strip() for h in rows_data[0]]
            parsed = []
            for r in rows_data[1:]:
                if not any(r):
                    continue
                row_dict = {}
                for idx, h in enumerate(headers):
                    row_dict[h] = r[idx] if idx < len(r) else ''
                parsed.append(row_dict)
            return parsed
    except Exception as e:
        print(f"Peringatan: Gagal membaca file xlsx ({e}).")
        return None

def read_from_csv(csv_path):
    if not os.path.exists(csv_path):
        return None
    try:
        # Deteksi encoding & separator
        with open(csv_path, 'rb') as fb:
            raw = fb.read(4096).decode('utf-8-sig', errors='replace')
        first_line = raw.split('\n')[0]
        sep = ';' if first_line.count(';') > first_line.count(',') else ','

        with open(csv_path, 'r', encoding='utf-8-sig', errors='replace') as f:
            reader = csv.DictReader(f, delimiter=sep)
            # Bersihkan whitespace di key header
            rows = []
            for row in reader:
                clean_row = {k.strip(): (v.strip() if v else '') for k, v in row.items() if k is not None}
                rows.append(clean_row)
            return rows
    except Exception as e:
        print(f"Peringatan: Gagal membaca file CSV ({e}).")
        return None

def extract_field(row, patterns):
    """Mencari nilai kolom berdasarkan pola kecocokan nama header."""
    for p in patterns:
        clean_p = clean_key(p)
        for k, v in row.items():
            ck = clean_key(k)
            if ck == clean_p or clean_p in ck:
                if v:
                    return str(v).strip()
    return ""

def main():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    loc_path = os.path.join(base_dir, 'locations.js')
    
    # Sumber data yang diutamakan
    preferred_sources = [
        os.path.join(base_dir, 'Data_Teknis'),
        os.path.join(base_dir, 'Data_Teknis.csv'),
        os.path.join(base_dir, 'Data Site - Teknisi.xlsx'),
        os.path.join(base_dir, 'Data Site - Teknisi.csv'),
        os.path.join(base_dir, 'Template_Data_Teknis_Pentakom.xlsx'),
        os.path.join(base_dir, 'Template_Data_Teknis_Pentakom.csv')
    ]

    # Cek apakah ada argumen file khusus dari CLI
    if len(sys.argv) > 1:
        custom_file = sys.argv[1]
        if not os.path.isabs(custom_file):
            custom_file = os.path.join(base_dir, custom_file)
        preferred_sources.insert(0, custom_file)

    print("======================================================")
    print("      PENTAKOM - DATA TEKNIS IMPORTER & SYNC          ")
    print("======================================================")

    records = None
    loaded_source = None
    for src in preferred_sources:
        if os.path.exists(src):
            print(f"Memeriksa file: {os.path.basename(src)}...")
            if src.endswith('.xlsx') or src.endswith('.xls'):
                records = read_from_xlsx(src)
            else:
                records = read_from_csv(src)
            if records:
                loaded_source = src
                print(f"✓ Berhasil membaca {len(records)} baris data dari '{os.path.basename(src)}'.")
                break

    if not records:
        print("Error: Tidak ditemukan file data teknis yang valid!")
        print("Letakkan 'Data Site - Teknisi.xlsx' atau 'Data Site - Teknisi.csv' di folder ini.")
        sys.exit(1)

    # 1. Ambil existing database di locations.js jika ada
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

    merged_map = {item['id']: item for item in existing_db if 'id' in item}

    # 2. Proses data baru (Format Gambar 1)
    updated_count = 0
    added_count = 0

    for r in records:
        site_id = extract_field(r, ["SITEIDKODELOKASI", "SITEID", "KODELOKASI", "ID"])
        nama = extract_field(r, ["NAMASITENAMALOKASI", "NAMASITE", "NAMALOKASI", "NAMA"])
        if not site_id and not nama:
            continue

        raw_owner = extract_field(r, ["PEMILIKSITE", "PEMILIK"])
        pemilik = normalize_owner(raw_owner)
        
        alamat = extract_field(r, ["ALAMATLENGKAPSITELOKASI", "ALAMATLENGKAP", "ALAMAT"])
        provinsi = extract_field(r, ["PROVINSI"])
        kabupaten = extract_field(r, ["KABUPATENKOTA", "KABUPATEN", "KOTA"])
        desa = extract_field(r, ["KELURAHANDESA", "KELURAHAN", "DESA"])
        
        lat_val = extract_field(r, ["LATITUDEDESIMAL", "LATITUDE", "LAT"])
        lon_val = extract_field(r, ["LONGITUDEDESIMAL", "LONGITUDE", "LON", "LONG"])
        try:
            lat = float(lat_val) if lat_val else ''
        except:
            lat = lat_val
        try:
            lon = float(lon_val) if lon_val else ''
        except:
            lon = lon_val

        # Serial numbers (jika ada di file masukan)
        sn_modem = extract_field(r, ["SNMODEM", "MODEM"])
        sn_router = extract_field(r, ["SNROUTER", "ROUTER"])
        sn_ap1 = extract_field(r, ["SNAPINDOOR", "APINDOOR", "AP1"])
        sn_ap2 = extract_field(r, ["SNAPOUTDOOR", "APOUTDOOR", "AP2"])
        sn_ant = extract_field(r, ["SNANTENNA", "ANTENNA"])
        sn_buc = extract_field(r, ["SNBUCTRANSCEIVER", "SNBUC", "TRANSCEIVER", "BUC"])
        sn_rack = extract_field(r, ["SNRACK", "RACK"])
        sn_stab = extract_field(r, ["SNSTABILIZER", "STABILIZER"])

        existing_item = merged_map.get(site_id, {})
        existing_sn = existing_item.get('sn', {})

        # Merge SN: utamakan yang baru jika terisi, jika tidak pertahankan yang lama
        final_sn = {
            'modem': sn_modem or existing_sn.get('modem', ''),
            'router': sn_router or existing_sn.get('router', ''),
            'ap1': sn_ap1 or existing_sn.get('ap1', ''),
            'ap2': sn_ap2 or existing_sn.get('ap2', ''),
            'antenna': sn_ant or existing_sn.get('antenna', ''),
            'transiver': sn_buc or existing_sn.get('transiver', ''),
            'rack': sn_rack or existing_sn.get('rack', ''),
            'stabilizer': sn_stab or existing_sn.get('stabilizer', '')
        }

        item_data = {
            'id': site_id,
            'nama': nama,
            'pemilik': pemilik,
            'tipe': existing_item.get('tipe', 'Kantor Pemerintahan'),
            'provinsi': provinsi or existing_item.get('provinsi', ''),
            'kabupaten': kabupaten or existing_item.get('kabupaten', ''),
            'desa': desa or existing_item.get('desa', ''),
            'alamat': alamat or existing_item.get('alamat', ''),
            'kategori': existing_item.get('kategori', ''),
            'lat': lat if lat != '' else existing_item.get('lat', ''),
            'lon': lon if lon != '' else existing_item.get('lon', ''),
            'sn': final_sn
        }

        if site_id in merged_map:
            merged_map[site_id].update(item_data)
            updated_count += 1
        else:
            merged_map[site_id] = item_data
            added_count += 1

    # Hapus data yang tidak memiliki pemilik site atau berpemilik PT Pentakom
    final_db = [
        item for item in merged_map.values()
        if item.get('pemilik')
        and str(item.get('pemilik')).strip()
        and str(item.get('pemilik')).strip().lower() != 'unknown'
        and 'pentakom' not in str(item.get('pemilik')).lower()
    ]
    print(f"Hasil Penggabungan:")
    print(f" - Site diperbarui : {updated_count}")
    print(f" - Site baru       : {added_count}")
    print(f" - Total Database (dengan Pemilik) : {len(final_db)} site")

    # 2.5 Sinkronisasi SN Perangkat dari Data_SN_Perangkat.csv jika ada (abaikan SN kosong)
    sn_files = [os.path.join(base_dir, 'Data_SN_Perangkat.csv'), os.path.join(base_dir, 'Data_Perangkat.csv')]
    for sn_f in sn_files:
        if os.path.exists(sn_f):
            try:
                with open(sn_f, 'r', encoding='utf-8') as f:
                    sn_reader = csv.reader(f, delimiter=';')
                    sn_header = next(sn_reader, None)
                    sn_matched = 0
                    for row in sn_reader:
                        if not row or not row[0].strip():
                            continue
                        s_id = row[0].strip()
                        raw_vals = [c.strip() for c in row[1:9]]
                        if not any(raw_vals):
                            continue  # Abaikan baris SN yang kosong
                        target_site = next((s for s in final_db if s.get('id', '').strip() == s_id), None)
                        if target_site:
                            target_site.setdefault('sn', {})
                            if len(row) > 1 and row[1].strip(): target_site['sn']['modem'] = row[1].strip()
                            if len(row) > 2 and row[2].strip(): target_site['sn']['router'] = row[2].strip()
                            if len(row) > 3 and row[3].strip(): target_site['sn']['ap1'] = row[3].strip()
                            if len(row) > 4 and row[4].strip(): target_site['sn']['ap2'] = row[4].strip()
                            if len(row) > 5 and row[5].strip(): target_site['sn']['antenna'] = row[5].strip()
                            if len(row) > 6 and row[6].strip(): target_site['sn']['transiver'] = row[6].strip()
                            if len(row) > 7 and row[7].strip(): target_site['sn']['rack'] = row[7].strip()
                            if len(row) > 8 and row[8].strip(): target_site['sn']['stabilizer'] = row[8].strip()
                            sn_matched += 1
                    print(f"✓ Berhasil memetakan {sn_matched} site dari '{os.path.basename(sn_f)}'.")
                    break
            except Exception as e:
                print(f"Peringatan saat membaca file SN '{os.path.basename(sn_f)}': {e}")

    # Ringkasan per pemilik
    owner_stats = {}
    for s in final_db:
        o = s.get('pemilik', 'Unknown')
        owner_stats[o] = owner_stats.get(o, 0) + 1
    print("\nSebaran Pemilik Site:")
    for o, count in owner_stats.items():
        print(f"  • {o}: {count} site")

    # 3. Tulis ulang locations.js
    with open(loc_path, 'w', encoding='utf-8') as f:
        f.write(f"const LOCATION_DB = {json.dumps(final_db, ensure_ascii=False)};\n")
        if logo1:
            f.write(f"{logo1}\n")
        if logo2:
            f.write(f"{logo2}\n")
    print(f"\n✓ Berhasil memperbarui '{os.path.basename(loc_path)}'!")

    # 4. Tulis Template_Data_Teknis_Pentakom.csv berisikan format Gambar 1
    template_csv = os.path.join(base_dir, 'Template_Data_Teknis_Pentakom.csv')
    with open(template_csv, 'w', encoding='utf-8-sig', newline='') as f:
        writer = csv.writer(f, delimiter=';')
        writer.writerow([
            "Pemilik Site",
            "Site ID ( Kode Lokasi )",
            "Nama Site ( Nama Lokasi )",
            "Alamat Lengkap Site / Lokasi",
            "Provinsi",
            "Kabupaten / Kota",
            "Kelurahan / Desa",
            "Latitude (Desimal)",
            "Longitude (Desimal)"
        ])
        for s in final_db:
            writer.writerow([
                s.get('pemilik', ''),
                s.get('id', ''),
                s.get('nama', ''),
                s.get('alamat', ''),
                s.get('provinsi', ''),
                s.get('kabupaten', ''),
                s.get('desa', ''),
                s.get('lat', ''),
                s.get('lon', '')
            ])
    print(f"✓ Berhasil mengekspor format Gambar 1 ke '{os.path.basename(template_csv)}' ({len(final_db)} baris)!")

    # 5. Tulis Template_Data_Teknis_Pentakom.xlsx berisikan format Gambar 1
    template_xlsx = os.path.join(base_dir, 'Template_Data_Teknis_Pentakom.xlsx')
    if os.path.exists(template_xlsx):
        try:
            import xml.sax.saxutils
            sheet_xml = ['<?xml version="1.0" encoding="UTF-8" standalone="yes"?>']
            sheet_xml.append('<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">')
            sheet_xml.append('<cols>')
            widths = [26, 24, 34, 45, 20, 24, 24, 18, 18]
            for i, w in enumerate(widths, 1):
                sheet_xml.append(f'<col min="{i}" max="{i}" width="{w}" customWidth="1"/>')
            sheet_xml.append('</cols>')
            sheet_xml.append('<sheetData>')

            header_cols = [
                "Pemilik Site", "Site ID ( Kode Lokasi )", "Nama Site ( Nama Lokasi )",
                "Alamat Lengkap Site / Lokasi", "Provinsi", "Kabupaten / Kota",
                "Kelurahan / Desa", "Latitude (Desimal)", "Longitude (Desimal)"
            ]
            all_rows = [header_cols]
            for s in final_db:
                all_rows.append([
                    s.get('pemilik', ''),
                    s.get('id', ''),
                    s.get('nama', ''),
                    s.get('alamat', ''),
                    s.get('provinsi', ''),
                    s.get('kabupaten', ''),
                    s.get('desa', ''),
                    str(s.get('lat', '')),
                    str(s.get('lon', ''))
                ])

            def idx_to_col(ci):
                res = ''
                while ci >= 0:
                    res = chr(ci % 26 + ord('A')) + res
                    ci = ci // 26 - 1
                return res

            for r_i, row in enumerate(all_rows, 1):
                sheet_xml.append(f'<row r="{r_i}">')
                for c_i, val in enumerate(row):
                    cell_ref = f'{idx_to_col(c_i)}{r_i}'
                    escaped = xml.sax.saxutils.escape(str(val))
                    sheet_xml.append(f'<c r="{cell_ref}" t="inlineStr"><is><t>{escaped}</t></is></c>')
                sheet_xml.append('</row>')

            sheet_xml.append('</sheetData>')
            sheet_xml.append('</worksheet>')
            sheet_bytes = ''.join(sheet_xml).encode('utf-8')

            tmp_xlsx = os.path.join(base_dir, 'Template_Data_Teknis_tmp.xlsx')
            with zipfile.ZipFile(template_xlsx, 'r') as zin:
                with zipfile.ZipFile(tmp_xlsx, 'w', compression=zipfile.ZIP_DEFLATED) as zout:
                    for it in zin.infolist():
                        if it.filename == 'xl/worksheets/sheet1.xml':
                            zout.writestr(it.filename, sheet_bytes)
                        else:
                            zout.writestr(it.filename, zin.read(it.filename))
            os.replace(tmp_xlsx, template_xlsx)
            print(f"✓ Berhasil mengekspor format Gambar 1 ke '{os.path.basename(template_xlsx)}' ({len(final_db)} baris)!")
        except Exception as ex:
            print(f"Catatan: Pembaruan Excel template dilewati ({ex}).")

    print("\nLangkah selanjutnya:")
    print("git add . && git commit -m \"Update data teknis dan filter pemilik site\" && git push origin main")

if __name__ == '__main__':
    main()
