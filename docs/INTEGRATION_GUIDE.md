# Panduan Integrasi Dashboard, Katalog, Tentang Kami, dan Kontak

## Overview

Aplikasi Katalog Wear sekarang memiliki struktur lengkap dengan integrasi penuh antara:

- Dashboard/Landing Page (Halaman Utama)
- Katalog Produk
- Halaman Tentang Kami
- Halaman Kontak
- Keranjang Belanja

Semua halaman menggunakan color scheme yang konsisten: **Orange, Red, dan Green**.

---

## Struktur Folder & Routing

### Pages Structure

```
app/
├── page.tsx                    # Landing Page / Dashboard (Beranda)
├── katalog/
│   └── page.tsx              # Halaman Katalog Produk
├── produk/
│   └── [slug]/
│       └── page.tsx          # Halaman Detail Produk
├── tentang-kami/             # NEW
│   └── page.tsx              # Halaman Tentang Kami
├── kontak/                   # NEW
│   └── page.tsx              # Halaman Kontak
├── keranjang/
│   └── page.tsx              # Halaman Keranjang Belanja
└── checkout/
    └── page.tsx              # Halaman Checkout
```

### Components Structure

```
components/
├── common/
│   ├── Header.tsx            # Updated - Navigation links
│   └── Footer.tsx            # Updated - Color consistency
├── features/
│   ├── ProductCatalog.tsx    # Updated - Color consistency
│   ├── ProductCard.tsx       # Updated - Color scheme
│   ├── ProductDetail.tsx     # Enhanced - Animations
│   ├── ShoppingCart.tsx      # Updated - Color scheme
│   └── FilterSection.tsx     # Color consistency
└── ui/
    ├── button.tsx
    ├── input.tsx
    ├── select.tsx
    └── textarea.tsx
```

---

## Navigation Menu

Header sekarang menampilkan menu lengkap:

```
Beranda | Katalog | Tentang Kami | Kontak | 🛒 (Cart Icon)
```

### Navigation Links

| Menu          | URL             | Deskripsi                                              |
| ------------- | --------------- | ------------------------------------------------------ |
| Beranda       | `/`             | Landing page dengan hero section dan featured products |
| Katalog       | `/katalog`      | Daftar lengkap produk dengan filter                    |
| Tentang Kami  | `/tentang-kami` | Profil, visi, misi, dan nilai-nilai perusahaan         |
| Kontak        | `/kontak`       | Form kontak dan informasi kontak langsung              |
| Keranjang     | `/keranjang`    | Tampilan cart dengan summary belanja                   |
| Checkout      | `/checkout`     | Form pembayaran dan pengiriman                         |
| Detail Produk | `/produk/[id]`  | Page detail produk dengan galeri dan review            |

---

## Color Scheme Konsistensi

### Primary Colors

- **Orange**: `bg-orange-600`, `hover:bg-orange-700`, `text-orange-600`
  - Digunakan untuk: CTA buttons, links, accents
- **Red**: `bg-red-600`, `text-red-600`
  - Digunakan untuk: Sale badges, delete actions, warnings
- **Green**: `bg-green-600`, `hover:bg-green-700`
  - Digunakan untuk: WhatsApp buttons, success messages

### Using in Components

```tsx
// CTA Button
<Button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3">
  Lanjut ke Checkout
</Button>

// Delete/Remove
<button className="text-red-500 hover:text-red-700">
  <Trash2 size={18} />
</button>

// WhatsApp
<a
  href={whatsappLink}
  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
>
  Hubungi via WhatsApp
</a>
```

---

## Database Integration

### New Tables

#### 1. store_info

Menyimpan informasi toko untuk halaman Tentang Kami.

```sql
-- Fields
- store_name: VARCHAR(255)
- description: TEXT
- vision: TEXT
- mission: TEXT
- address: VARCHAR(255)
- phone: VARCHAR(20)
- email: VARCHAR(255)
- whatsapp_number: VARCHAR(20)
- opening_hours: JSONB
- team_description: TEXT
```

#### 2. contact_messages

Menyimpan pesan yang dikirim melalui form kontak.

```sql
-- Fields
- id: UUID
- name: VARCHAR(255)
- email: VARCHAR(255)
- subject: VARCHAR(255)
- message: TEXT
- status: VARCHAR(50) [unread/read/replied]
- created_at: TIMESTAMP
```

### Database Updates Required

1. Jalankan SQL dari `docs/DATABASE_SCHEMA_UPDATED.sql`
2. Update `store_info` dengan data toko Anda
3. Setup email notification untuk `contact_messages` (optional)

---

## Fitur-Fitur Baru

### 1. Landing Page (app/page.tsx)

- ✅ Hero section dengan gradient warna
- ✅ Featured products dengan stagger animations
- ✅ Campaign section
- ✅ Lookbook gallery
- ✅ Services showcase
- ✅ Contact form
- ✅ Scroll-triggered animations

### 2. Halaman Tentang Kami (app/tentang-kami/page.tsx)

- ✅ Story section - cerita berdirinya toko
- ✅ Visi, Misi, dan Values dalam card layout
- ✅ Timeline atau history (dapat ditambahkan)
- ✅ Team information (dapat ditambahkan)
- ✅ Scroll animations

### 3. Halaman Kontak (app/kontak/page.tsx)

- ✅ Contact form dengan validation
- ✅ Direct contact options (Phone, Email, WhatsApp, Map)
- ✅ Operating hours
- ✅ Integration dengan WhatsApp API

### 4. Enhanced Product Detail (components/features/ProductDetail.tsx)

- ✅ Image carousel dengan navigation
- ✅ Wishlist button
- ✅ Star rating display
- ✅ Color picker (swatches)
- ✅ Size selector (chips)
- ✅ Quantity selector (+/- buttons)
- ✅ Add to cart & WhatsApp integration
- ✅ Scroll animations

---

## Environment Variables

Update `.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# WhatsApp
NEXT_PUBLIC_WHATSAPP_NUMBER=62812345678

# Email (optional, untuk contact form)
NEXT_PUBLIC_CONTACT_EMAIL=info@katalogwear.com
```

---

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
# atau
yarn install
```

### 2. Update Database

```bash
# Akses Supabase Dashboard
# Buka SQL Editor
# Copy & paste isi dari docs/DATABASE_SCHEMA_UPDATED.sql
# Jalankan semua queries
```

### 3. Update Environment Variables

```bash
# Copy .env.example ke .env.local dan update values
cp .env.local.example .env.local
```

### 4. Run Development Server

```bash
npm run dev
# Akses http://localhost:3000
```

### 5. Build untuk Production

```bash
npm run build
npm start
```

---

## Customization Guide

### Mengubah Store Information

Edit `app/tentang-kami/page.tsx` atau query dari database:

```tsx
// Fetch dari store_info table
const { data: storeInfo } = await supabase
  .from("store_info")
  .select("*")
  .single();
```

### Mengubah Warna

Ganti color classes di:

1. `components/common/Header.tsx` - Logo, links, cart badge
2. `components/common/Footer.tsx` - Footer text, social links
3. `components/features/ProductCard.tsx` - Price, buttons
4. `components/features/ShoppingCart.tsx` - CTA buttons
5. `app/page.tsx` - Hero gradients
6. `app/tentang-kami/page.tsx` - Section backgrounds
7. `app/kontak/page.tsx` - Button colors

### Mengubah Contact Information

Update di:

- `app/kontak/page.tsx` - Phone, email, WhatsApp, address
- `components/common/Footer.tsx` - Footer contact details
- Database `store_info` table

---

## Integration Points

### 1. Header Navigation

```tsx
<Link href="/">Beranda</Link>
<Link href="/katalog">Katalog</Link>
<Link href="/tentang-kami">Tentang Kami</Link>
<Link href="/kontak">Kontak</Link>
```

### 2. Footer Links

```tsx
<Link href="/tentang-kami">Tentang Kami</Link>
<Link href="/kontak">Kontak</Link>
<Link href="/kebijakan-privasi">Kebijakan Privasi</Link>
<Link href="/syarat-ketentuan">Syarat & Ketentuan</Link>
```

### 3. Product to Cart Flow

Landing Page → Katalog → Product Detail → Add to Cart → Checkout

### 4. Contact Flow

Landing Page → Kontak → Fill Form → Receive Message

---

## Testing Checklist

- [ ] Navigation links bekerja semua
- [ ] Landing page animations smooth
- [ ] Tentang Kami page loading with animations
- [ ] Kontak form dapat disubmit
- [ ] WhatsApp links berfungsi
- [ ] Add to cart working
- [ ] Color scheme consistent
- [ ] Responsive di mobile, tablet, desktop
- [ ] Database connection stable
- [ ] Environment variables configured

---

## Performance Tips

1. **Images**: Use Next.js Image component (sudah implemented)
2. **Animations**: Gunakan `triggerOnce: true` pada useInView
3. **Database**: Implement pagination untuk product catalog
4. **Caching**: Setup ISR (Incremental Static Regeneration) untuk pages

---

## Deployment

### Vercel (Recommended)

```bash
# Login to Vercel
vercel login

# Deploy
vercel deploy
```

### Environment Variables di Vercel

1. Buka project settings di Vercel Dashboard
2. Tambahkan semua environment variables
3. Redeploy

---

## Support & Maintenance

- Monitor analytics di dashboard
- Update product inventory regularly
- Review contact messages regularly
- Backup database secara berkala

---

Dokumentasi ini akan di-update seiring dengan pengembangan aplikasi lebih lanjut.
