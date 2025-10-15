# 3NIMBelakang_ConnectionDb

Express JS app untuk koneksi database **MySQL** dan endpoint **GET** untuk mengambil data dari tabel `biodata` di database `mahasiswa`.

## Struktur Project
```
3NIMBelakang_ConnectionDb/
├─ src/
│  └─ app.js
├─ schema.sql
├─ .env.example
├─ package.json
├─ .gitignore
└─ README.md
```

## Requirements
- Node.js 18+
- MySQL 8+ (atau 5.7+)
- (opsional) Postman / curl

## Setup Database
1. Buka MySQL client (Workbench/CLI) dan jalankan:
   ```sql
   SOURCE /path/ke/folder/ini/schema.sql;
   ```
   Atau copy-paste isi `schema.sql` ke MySQL dan jalankan.

   Ini akan membuat:
   - Database: `mahasiswa`
   - Tabel: `biodata` dengan kolom: `id (PK)`, `nama`, `nim`, `kelas`
   - Data contoh 3 baris

## Konfigurasi Environment
1. Copy file `.env.example` menjadi `.env` lalu isi kredensial MySQL:
   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=mahasiswa
   PORT=3000
   ```

## Jalankan Aplikasi
```bash
npm install
npm run dev     # hot-reload (nodemon)
# atau
npm start       # production
```

Jika berhasil, server siap di: `http://localhost:3000`

## Endpoint
- `GET /api/biodata` → ambil semua data
- `GET /api/biodata/:id` → ambil satu data by id (opsional/bonus)

### Contoh Response
```json
[
  { "id": 1, "nama": "Budi Santoso", "nim": "20230140001", "kelas": "TI-3A" },
  { "id": 2, "nama": "Siti Aminah",  "nim": "20230140002", "kelas": "TI-3A" },
  { "id": 3, "nama": "Andi Wijaya",  "nim": "20230140003", "kelas": "TI-3B" }
]
```

### Cek via Browser
Buka:
```
http://localhost:3000/api/biodata
```

### Cek via curl
```bash
curl http://localhost:3000/api/biodata
```

## Push ke GitHub
```bash
# ganti NIM kamu
REPO=3NIMBelakang_ConnectionDb
git init
git add .
git commit -m "feat: express mysql connection + GET biodata"
git branch -M main
git remote add origin https://github.com/<username>/$REPO.git
git push -u origin main
```

## Screenshot (tambahkan ke README)
- Ambil screenshot hasil **GET /api/biodata** dari browser atau Postman.
- Simpan gambar di folder `screenshots/` lalu tambahkan ke README seperti ini:
  ```md
  ## Screenshot
  ![GET biodata](./screenshots/get-biodata.png)
  ```

## Catatan
- Jika koneksi gagal, pastikan service MySQL jalan dan `.env` sudah benar.
- User `root` harus punya akses ke DB `mahasiswa`.
- Untuk produksi, pertimbangkan variabel env dan akun MySQL non-root.

---

Made with ❤️ using Express + mysql2.