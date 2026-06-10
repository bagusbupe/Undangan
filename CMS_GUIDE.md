# Admin CMS - Digital Wedding Invitations

## Overview
Sistem CMS (Content Management System) untuk mengelola undangan pernikahan digital. Admin dapat login dan mengedit data template undangan tanpa coding.

## Features
- ✅ Admin login dengan authentikasi sederhana
- ✅ Dashboard untuk melihat semua template
- ✅ Editor untuk mengubah data template (nama, tanggal, data hadiah, dll)
- ✅ Preview langsung template yang sudah diubah
- ✅ Penyimpanan data di localStorage (dapat diperluas ke Firebase)
- ✅ Protected routes untuk halaman admin

## Access Admin CMS

### 1. Login Page
URL: `http://localhost:5173/admin/login`

**Kredensial Demo:**
- Username: `admin`
- Password: `admin123`

Atau klik tombol "Admin" di pojok kanan atas landing page.

### 2. Dashboard
URL: `http://localhost:5173/admin/dashboard`

Menampilkan semua template yang tersedia:
- Simple
- Base
- Template1
- Template2

### 3. Template Editor
URL: `http://localhost:5173/admin/edit/:templateId`

Contoh: `http://localhost:5173/admin/edit/template1`

## Editing Template Data

### Data yang Dapat Diubah

#### Pengantin Perempuan
- Nama Lengkap
- Nama Pendek
- Orang Tua

#### Pengantin Laki-laki
- Nama Lengkap
- Nama Pendek
- Orang Tua

#### Tanggal & Lokasi
- Tanggal Pernikahan
- Link Google Maps

#### Hadiah
- Nomor Rekening
- Nama Penerima

## File Structure

```
src/
├── contexts/
│   └── AdminContext.jsx          # Context untuk auth admin
├── pages/
│   ├── AdminLogin.jsx            # Halaman login
│   ├── AdminDashboard.jsx        # Dashboard template
│   ├── AdminEditor.jsx           # Editor template
│   └── Landing.jsx               # Updated dengan link admin
├── components/
│   └── ProtectedRoute.jsx        # Wrapper untuk protected routes
└── main.jsx                      # Updated dengan admin routes
```

## Technical Details

### Authentication
- Menggunakan Context API untuk state management
- Session disimpan di localStorage
- Auto-redirect ke login jika session habis

### Data Storage
- Default: localStorage (untuk development)
- Dapat diperluas ke Firebase Realtime Database
- Format data: JSON

### Protected Routes
Halaman admin dilindungi dengan component `ProtectedRoute`:
- Jika tidak login → redirect ke `/admin/login`
- Jika sudah login → tampilkan halaman admin

## Flow Diagram

```
Landing Page
    ↓
Admin Button (top-right)
    ↓
/admin/login
    ↓
[Enter Credentials]
    ↓
/admin/dashboard (Protected)
    ↓
Click "Edit Template"
    ↓
/admin/edit/:templateId (Protected)
    ↓
Edit Form
    ↓
Save → localStorage
    ↓
Preview atau Back to Dashboard
```

## Demo Usage

### Step 1: Akses Login
1. Buka `http://localhost:5173`
2. Klik tombol "Admin" di pojok kanan atas

### Step 2: Login
1. Username: `admin`
2. Password: `admin123`
3. Klik "Login"

### Step 3: Pilih Template
1. Dari dashboard, lihat list template
2. Klik "Edit Template" pada template pilihan

### Step 4: Edit Data
1. Ubah nama pengantin
2. Ubah tanggal pernikahan
3. Ubah nomor rekening
4. Klik "Simpan Data"

### Step 5: Preview
1. Klik tombol "Preview"
2. Template akan terbuka di tab baru dengan data terbaru

## Next Steps (Future Enhancement)

1. **Firebase Integration**
   - Simpan data ke Firebase Realtime Database
   - Multi-user support dengan role management

2. **Advanced Features**
   - Upload custom images
   - Edit event details
   - Manage guests dan RSVPs
   - Analytics dashboard

3. **Security**
   - Real password hashing
   - JWT token authentication
   - Email verification

4. **UI/UX Improvements**
   - Dark mode
   - Drag-and-drop for gallery
   - WYSIWYG editor untuk intro text
   - Real-time preview

## Troubleshooting

### Login tidak berhasil?
- Pastikan username: `admin` dan password: `admin123`
- Clear localStorage: `localStorage.clear()` di browser console
- Refresh halaman

### Data tidak tersimpan?
- Check browser's localStorage
- Open DevTools → Application → LocalStorage
- Cari key: `template_[templateId]`

### Preview tidak berfungsi?
- Pastikan data sudah disimpan terlebih dahulu
- Gunakan tombol "Preview" yang sudah muncul di editor

## Support
Untuk pertanyaan atau issue, hubungi tim development.
