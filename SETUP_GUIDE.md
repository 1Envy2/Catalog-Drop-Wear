# 📖 Panduan Setup Katalog Wear Website

Website ini adalah toko pakaian online UMKM yang menggunakan:
- **Next.js 16** - Framework React
- **Supabase** - Database & Real-time
- **Tailwind CSS + shadcn/ui** - UI Component Library
- **Zustand** - State Management
- **Zod** - Validasi Schema
- **React Hook Form** - Form Management

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment Variables

Buat file `.env.local` di root project dengan:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_WHATSAPP_NUMBER=62812345678
```

### 3. Setup Database Supabase

1. Buat akun di [supabase.com](https://supabase.com)
2. Buat project baru
3. Buka SQL Editor
4. Copy & paste semua query dari file `DATABASE_SCHEMA.sql`
5. Jalankan query untuk membuat tabel

### 4. Mulai Development
```bash
npm run dev
```

Server akan berjalan di `http://localhost:3000`

---

## 📁 Struktur Project

```
my-katalog-wear/
├── app/
│   ├── page.tsx              # Home page
│   ├── katalog/              # Halaman katalog
│   ├── produk/[slug]/        # Detail produk
│   ├── keranjang/            # Shopping cart
│   ├── checkout/             # Checkout page
│   └── api/                  # API routes (untuk backend)
├── components/
│   ├── common/               # Komponen reusable
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── features/             # Komponen fitur utama
│   │   ├── ProductCatalog.tsx
│   │   ├── ProductCard.tsx
│   │   ├── ProductDetail.tsx
│   │   ├── ShoppingCart.tsx
│   │   └── FilterSection.tsx
│   └── ui/                   # shadcn/ui components
├── lib/
│   ├── supabase/
│   │   └── client.ts         # Supabase client config
│   ├── schemas/
│   │   └── product.ts        # Zod schemas
│   ├── stores/
│   │   ├── cartStore.ts      # Zustand cart store
│   │   └── filterStore.ts    # Filter state
│   ├── whatsapp.ts           # WhatsApp integration
│   ├── formatters.ts         # Helper formatters
│   └── utils.ts              # Utility functions
└── DATABASE_SCHEMA.sql       # Database schema
```

---

## 🎯 Fitur Utama

### 1. **Katalog Produk**
- Menampilkan grid produk responsif
- Filter berdasarkan kategori, ukuran, warna, dan harga
- Search produk
- Responsive design untuk mobile & desktop

### 2. **Detail Produk**
- Menampilkan gambar produk
- Informasi lengkap (deskripsi, harga, stok)
- Pilih ukuran dan warna
- Tombol "Tambah ke Keranjang" & "Beli via WhatsApp"

### 3. **Shopping Cart**
- Persisten (disimpan di localStorage)
- Hapus/edit jumlah item
- Rangkuman harga
- Checkout button

### 4. **Checkout & WhatsApp**
- Form validasi customer data (Zod + React Hook Form)
- Kirim pesanan via WhatsApp otomatis
- Pesan ter-format dengan detail produk & harga

### 5. **WhatsApp Integration**
- Auto-generate pesanan message
- Link WhatsApp yang siap pakai
- Share produk via WhatsApp

---

## 🔧 Tech Stack Details

### State Management (Zustand)
```typescript
// Cart Store
useCartStore() // Manajemen keranjang

// Filter Store
useFilterStore() // Manajemen filter produk
```

### Form Validation (Zod + React Hook Form)
```typescript
// Skema validasi di lib/schemas/product.ts
ProductSchema
OrderSchema
CartItemSchema
```

### Database (Supabase)
```sql
-- Tabel utama:
products          -- Detail produk
orders            -- Pesanan customer
order_items       -- Detail item per pesanan
favorites         -- Wishlist/favorit
```

---

## 📝 Implementasi Fitur

### Tambahkan Produk ke Database
```typescript
const { data, error } = await supabase
  .from("products")
  .insert([{
    name: "Kaos Polos",
    price: 50000,
    image_url: "https://...",
    category: "T-Shirt",
    stock: 100,
    size: ["S", "M", "L", "XL"],
    color: ["#000000", "#FFFFFF"]
  }]);
```

### Ambil Data Produk
```typescript
const { data } = await supabase
  .from("products")
  .select("*")
  .eq("category", "T-Shirt");
```

---

## 🚀 Deployment

### Deploy ke Vercel
1. Push code ke GitHub
2. Buka [vercel.com](https://vercel.com)
3. Import repository
4. Setup environment variables
5. Deploy!

```bash
# CLI deployment
npm i -g vercel
vercel
```

---

## 📱 Mobile Responsiveness

Website sudah responsive dengan:
- ✅ Mobile-first design
- ✅ Tailwind CSS responsive classes
- ✅ Flexible grid layout
- ✅ Touch-friendly buttons

---

## 🔐 Security Tips

1. **API Key**: Gunakan `NEXT_PUBLIC_` prefix hanya untuk public data
2. **Authentication**: Tambahkan Supabase Auth untuk admin dashboard
3. **CORS**: Setup CORS di Supabase jika perlu
4. **Validation**: Selalu validasi data di server-side

---

## 📚 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Zustand](https://github.com/pmndrs/zustand)
- [Zod](https://zod.dev)

---

## 🆘 Troubleshooting

### Produk tidak muncul
- Cek environment variables
- Pastikan Supabase project aktif
- Cek browser console untuk error

### WhatsApp link tidak berfungsi
- Validasi nomor WhatsApp (format: 62xxx)
- Cek `NEXT_PUBLIC_WHATSAPP_NUMBER`

### Style tidak muncul
- Clear `.next` folder: `rm -rf .next`
- Rebuild: `npm run build`

---

## 💡 Next Steps

Untuk fitur lebih advanced:
1. Add Supabase Authentication untuk admin panel
2. Payment gateway integration (Midtrans, Stripe)
3. Email notifications
4. Product reviews & ratings
5. Inventory management dashboard
6. Analytics & reporting

Happy Coding! 🎉
