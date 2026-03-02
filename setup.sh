#!/usr/bin/env bash

# Katalog Wear - Quick Setup Script
# Run this script untuk cepat setup project

echo "🚀 Katalog Wear - Quick Setup"
echo "================================"

# 1. Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

# 2. Check if .env.local exists
if [ ! -f .env.local ]; then
    echo ""
    echo "⚠️  File .env.local tidak ditemukan!"
    echo "📝 Buat file .env.local dengan content:"
    echo "---"
    echo "NEXT_PUBLIC_SUPABASE_URL=your_url_here"
    echo "NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key_here"
    echo "NEXT_PUBLIC_WHATSAPP_NUMBER=62812345678"
    echo "---"
    echo "Kemudian jalankan: npm run dev"
else
    echo ""
    echo "✅ File .env.local sudah ada"
fi

# 3. Build check
echo ""
echo "🔨 Running build check..."
npm run build

echo ""
echo "✅ Setup selesai!"
echo "===================================="
echo ""
echo "📝 Next steps:"
echo "1. Update .env.local dengan Supabase credentials"
echo "2. Setup database dari DATABASE_SCHEMA.sql"
echo "3. Insert sample data dari SAMPLE_DATA.sql"
echo "4. Run: npm run dev"
echo "5. Open http://localhost:3000"
echo ""
echo "Happy coding! 🎉"
