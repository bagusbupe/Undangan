# CMS Extension Guide

## Menambah Field Baru di Editor

### Contoh: Menambah Field "Venue Address"

#### 1. Update AdminEditor.jsx

Di section venue, tambahkan field baru:

```jsx
// Sebelumnya
<div>
  <label className="block text-sm font-semibold text-primary mb-2">Link Google Maps</label>
  <input
    type="text"
    value={data.venue?.link || ''}
    onChange={(e) => handleFieldChange('venue.link', e.target.value)}
    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
    placeholder="https://maps.app.goo.gl/..."
  />
</div>

// Sesudahnya
<div>
  <label className="block text-sm font-semibold text-primary mb-2">Alamat Venue</label>
  <input
    type="text"
    value={data.venue?.address || ''}
    onChange={(e) => handleFieldChange('venue.address', e.target.value)}
    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
    placeholder="Contoh: Jl. Sudirman No. 123"
  />
</div>

<div>
  <label className="block text-sm font-semibold text-primary mb-2">Link Google Maps</label>
  <input
    type="text"
    value={data.venue?.link || ''}
    onChange={(e) => handleFieldChange('venue.link', e.target.value)}
    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
    placeholder="https://maps.app.goo.gl/..."
  />
</div>
```

#### 2. Update Default Data

```jsx
const getDefaultData = () => ({
  // ... existing data
  venue: {
    address: 'SMP Al Amanah - Tangerang Selatan',  // ← Tambahan
    mapSrc: 'https://www.google.com/maps/embed?pb=...',
    link: 'https://maps.app.goo.gl/...',
  },
  // ... rest of data
});
```

#### 3. Update Template untuk Menggunakan Field Baru

Di `src/templates/BaseTemplate.jsx`:

```jsx
<section className="mb-8">
  <h2 className="text-3xl font-nameFont1 text-primary mb-6 text-center">Lokasi</h2>
  <p className="text-primary text-center mb-4">{venue.address}</p>
  {/* ... existing map code ... */}
</section>
```

## Menambah Section Baru (Contoh: Dress Code)

### 1. Add Field di AdminEditor.jsx

```jsx
{/* Dress Code Section */}
<section className="mb-8">
  <h2 className="text-xl font-semibold text-primary mb-4">Dress Code</h2>
  <div className="space-y-4">
    <div>
      <label className="block text-sm font-semibold text-primary mb-2">Deskripsi Dress Code</label>
      <textarea
        value={data.dressCode?.description || ''}
        onChange={(e) => handleFieldChange('dressCode.description', e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
        rows="4"
        placeholder="Contoh: Batik atau kebaya, warna-warna cerah"
      />
    </div>
  </div>
</section>
```

### 2. Update Default Data

```jsx
const getDefaultData = () => ({
  // ... existing
  dressCode: {
    description: 'Batik atau kebaya, warna-warna cerah',
  },
  // ...
});
```

### 3. Update Template

```jsx
{/* Di BaseTemplate.jsx */}
{data.dressCode?.description && (
  <section className="mb-8">
    <h2 className="text-3xl font-nameFont1 text-primary mb-4 text-center">Dress Code</h2>
    <p className="text-primary text-center">{data.dressCode.description}</p>
  </section>
)}
```

## Integrasi Firebase

### 1. Update AdminContext untuk Firebase Auth

```jsx
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase/config';

export function AdminProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setAdmin(userCredential.user);
      localStorage.setItem('admin', JSON.stringify(userCredential.user));
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setAdmin(null);
      localStorage.removeItem('admin');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // ... rest of code
}
```

### 2. Update AdminEditor untuk Firebase Storage

```jsx
import { db } from '../firebase/config';
import { doc, setDoc } from 'firebase/firestore';

const handleSave = async () => {
  setSaving(true);
  try {
    // Save to localStorage
    localStorage.setItem(`template_${templateId}`, JSON.stringify(data));
    
    // Also save to Firebase
    await setDoc(doc(db, 'templates', templateId), {
      data,
      updatedAt: new Date().toISOString(),
      updatedBy: admin.email,
    });
    
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  } catch (error) {
    alert('Error saving data: ' + error.message);
  }
  setSaving(false);
};
```

## Menambah Role Permission

### Update AdminContext

```jsx
const DEFAULT_ROLES = {
  admin: ['view', 'edit', 'delete'],
  editor: ['view', 'edit'],
  viewer: ['view'],
};

export function AdminProvider({ children }) {
  const [admin, setAdmin] = useState(null);

  const canAccess = (action) => {
    if (!admin) return false;
    const permissions = DEFAULT_ROLES[admin.role] || [];
    return permissions.includes(action);
  };

  // ... rest
}

// Usage di component
if (!canAccess('edit')) {
  return <div>You don't have permission to edit</div>;
}
```

## Multi-Template Support

Untuk menambah template baru:

### 1. Buat Template Component

```jsx
// src/templates/Template3.jsx
import BaseTemplate from './BaseTemplate';
import { mergeInvitationData } from '../utils/templateData';

export default function Template3({ data, shared, ...props }) {
  const defaults = {
    couple: {
      bride: { fullName: 'Jane Doe', ... },
      groom: { fullName: 'John Doe', ... },
    },
    // ... default data
  };

  const mergedData = mergeInvitationData(defaults, data || props);
  return <BaseTemplate data={mergedData} shared={shared} />;
}
```

### 2. Register di TemplateRegistry

```jsx
import Template3 from './Template3';

const registry = new Map();
registry.set('template3', Template3);
```

## Best Practices

1. **Validation**
   - Validasi input sebelum save
   - Show error message jika ada

2. **Loading States**
   - Disable button saat menyimpan
   - Show loading indicator

3. **Error Handling**
   - Try-catch untuk async operations
   - Friendly error messages

4. **Data Backup**
   - Auto-save ke localStorage
   - Periodic backup ke database

5. **Code Organization**
   - Pisah logic ke hooks
   - Reusable components
   - Clear file structure

## Contoh: Custom Hook untuk Edit Form

```jsx
// src/hooks/useTemplateEditor.js
import { useState, useEffect } from 'react';

export function useTemplateEditor(templateId) {
  const [data, setData] = useState(null);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(`template_${templateId}`);
    setData(stored ? JSON.parse(stored) : getDefaultData());
    setLoading(false);
  }, [templateId]);

  const updateField = (path, value) => {
    setData(prev => {
      // Update logic
      return updated;
    });
    setSaved(false);
  };

  const save = async () => {
    localStorage.setItem(`template_${templateId}`, JSON.stringify(data));
    setSaved(true);
  };

  return { data, loading, saved, updateField, save };
}
```

Gunakan di component:
```jsx
const { data, updateField, save } = useTemplateEditor('template1');
```

## Testing CMS

### Manual Testing Checklist
- [ ] Login dengan kredensial benar
- [ ] Login dengan kredensial salah → error
- [ ] Edit semua field → simpan → preview
- [ ] Logout → redirect ke login
- [ ] Protected route → redirect jika tidak login
- [ ] Data persist setelah refresh
- [ ] Edit form validation bekerja

## Deployment Considerations

1. **Environment Variables**
   ```
   VITE_FIREBASE_API_KEY=xxx
   VITE_ADMIN_PASSWORD=xxx
   ```

2. **Security**
   - Use proper authentication
   - Encrypt sensitive data
   - Implement rate limiting

3. **Performance**
   - Lazy load heavy components
   - Optimize bundle size
   - Cache template data

4. **Monitoring**
   - Log admin actions
   - Track template changes
   - Monitor error rates
