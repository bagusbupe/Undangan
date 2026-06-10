# Admin CMS - Quick Start

## Akses CMS Admin

### 1. Mulai Dev Server
```bash
npm run dev
```
Server akan berjalan di `http://localhost:5173`

### 2. Akses Login Admin
Ada 2 cara:

**Cara A - Langsung ke URL**
```
http://localhost:5173/admin/login
```

**Cara B - Via Landing Page**
1. Buka `http://localhost:5173`
2. Klik tombol "Admin" di pojok kanan atas

### 3. Login dengan Kredensial Demo
```
Username: admin
Password: admin123
```

### 4. Kelola Template
1. Dari dashboard, pilih template yang ingin diubah
2. Klik tombol "Edit Template"
3. Ubah data sesuai kebutuhan
4. Klik "Simpan Data"
5. Klik "Preview" untuk melihat hasil

## Folder Struktur CMS

```
src/
├── contexts/AdminContext.jsx          ← Auth logic
├── pages/
│   ├── AdminLogin.jsx                 ← Login form
│   ├── AdminDashboard.jsx             ← Template list
│   └── AdminEditor.jsx                ← Edit form
├── components/ProtectedRoute.jsx      ← Route protection
└── main.jsx                           ← Router config
```

## Fitur CMS

✅ Login/Logout admin
✅ Dashboard template
✅ Edit nama pengantin
✅ Edit tanggal pernikahan
✅ Edit data hadiah (rekening, penerima)
✅ Edit link lokasi
✅ Preview langsung
✅ Auto-save ke localStorage
✅ Protected routes

## Default Admin

- **Username:** admin
- **Password:** admin123
- **Akses:** Semua template

## Data Tersimpan Di

- **Dev:** localStorage browser
- **Prod:** localStorage (dapat diganti ke Firebase)

## Template Yang Bisa Diubah

1. **simple** - Template minimalis
2. **base** - Template dasar
3. **template1** - Template Lia & Amir
4. **template2** - Template Siti & Rian

Setiap template memiliki data default yang bisa diubah sepenuhnya melalui CMS.

## Tips & Trik

### Preview Hasil Edit
```
1. Edit data di CMS
2. Klik "Simpan Data"
3. Klik tombol "Preview"
4. Template baru akan terbuka di tab baru
```

### Lihat Data Tersimpan
```javascript
// Di browser console
localStorage.getItem('template_template1')
```

### Reset Data Template
```javascript
// Di browser console
localStorage.removeItem('template_template1')
```

### Logout
Klik tombol "Logout" di header dashboard atau editor.

Setelah logout, Anda akan otomatis redirect ke halaman login.

## Dokumentasi Lengkap

Lihat [CMS_GUIDE.md](./CMS_GUIDE.md) untuk dokumentasi lengkap dan features lanjutan.
