# 🛍️ Katalog Wear - UMKM Online Store

Toko pakaian online modern untuk UMKM lokal dengan integrasi WhatsApp. Dibangun dengan Next.js, Supabase, Zustand, Zod, dan shadcn/ui.

## ✨ Fitur Utama

- 📦 **Katalog Produk** - Grid responsif dengan filter kategori, ukuran, warna, harga
- 🛒 **Shopping Cart** - Cart persisten dengan add/remove/edit quantity
- 📱 **WhatsApp Integration** - Pemesanan langsung via WhatsApp
- 🎨 **Modern UI** - Tailwind CSS + shadcn/ui components
- ✅ **Form Validation** - Zod + React Hook Form
- 📊 **State Management** - Zustand untuk cart & filter
- 🗄️ **Database** - Supabase PostgreSQL
- 📱 **Responsive** - Mobile-first design

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Environment Variables

Buat file `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_WHATSAPP_NUMBER=62812345678
```

### 3. Setup Database

1. Buat akun di [supabase.com](https://supabase.com)
2. Buat project baru
3. Buka SQL Editor
4. Copy-paste semua query dari `DATABASE_SCHEMA.sql`
5. Jalankan query

### 4. Run Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

## 📚 Documentation

- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Panduan lengkap setup & fitur
- **[FILE_STRUCTURE.md](./FILE_STRUCTURE.md)** - Struktur file & komponen
- **[DATABASE_SCHEMA.sql](./DATABASE_SCHEMA.sql)** - SQL untuk database
- **[SAMPLE_DATA.sql](./SAMPLE_DATA.sql)** - Contoh data untuk testing

## 📁 Tech Stack

- **Framework**: Next.js 16
- **Language**: TypeScript
- **Style**: Tailwind CSS + shadcn/ui
- **State**: Zustand
- **Form**: React Hook Form + Zod
- **Database**: Supabase (PostgreSQL)
- **Icons**: Lucide React

## 🎯 File Structure

```
components/
  ├── common/           # Header, Footer
  ├── features/         # ProductCatalog, Cart, Detail, Filter
  └── ui/              # Button, Input, Select, Textarea

lib/
  ├── supabase/        # Supabase client
  ├── schemas/         # Zod validation
  ├── stores/          # Zustand stores
  ├── whatsapp.ts      # WhatsApp utils
  └── formatters.ts    # Helper functions

app/
  ├── page.tsx         # Home
  ├── katalog/         # Catalog page
  ├── produk/[slug]/   # Product detail
  ├── keranjang/       # Cart
  └── checkout/        # Checkout form
```

## 🔧 Main Components

### ProductCatalog

Menampilkan grid produk dari database

### FilterSection

Filter by kategori, ukuran, warna, harga, search

### ShoppingCart

Manage cart items dengan add/remove/edit quantity

### ProductDetail

Halaman detail produk dengan pilih ukuran & warna

### CheckoutForm

Form validasi customer data sebelum WhatsApp checkout

## 📊 Database Schema

### products

- id, name, description, price
- image_url, category
- size[], color[], stock

### orders

- id, customer_name, phone, email
- items (JSONB), total_price
- status, notes

### order_items

- order_id, product_id
- quantity, price, size, color

## 🎨 Customization

### Ganti Warna Primary

Edit Tailwind colors di `globals.css`

### Update Logo/Brand

Edit `components/common/Header.tsx`

### Ganti WhatsApp Number

Update `.env.local` → `NEXT_PUBLIC_WHATSAPP_NUMBER`

### Tambah Kategori

Edit `app/katalog/page.tsx` → `categories` array

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Push ke GitHub terlebih dahulu
# Buka vercel.com → Create new project
# Import repository → Setup env variables → Deploy
```

### Environment Variables untuk Production

Pastikan setup semua env vars di Vercel dashboard:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_WHATSAPP_NUMBER`

## 📝 License

MIT - Bebas digunakan untuk keperluan komersial & personal

## 🤝 Support

Butuh bantuan? Baca dokumentasi di SETUP_GUIDE.md atau FILE_STRUCTURE.md

---

**Made with ❤️ untuk UMKM Indonesia**
