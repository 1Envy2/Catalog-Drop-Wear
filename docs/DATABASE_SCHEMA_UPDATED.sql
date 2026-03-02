// Dokumentasi Database Schema untuk Katalog Wear
// Pastikan untuk menjalankan query ini di Supabase Dashboard

// ==================== TABLES ====================

// 1. Products Table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image_url TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  size TEXT[] DEFAULT ARRAY['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  color TEXT[] DEFAULT ARRAY['#000000', '#FFFFFF', '#FF6600', '#FF0000'],
  stock INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_price ON products(price);
CREATE INDEX idx_products_created_at ON products(created_at);

// 2. Orders Table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255),
  customer_phone VARCHAR(20) NOT NULL,
  items JSONB NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE INDEX idx_orders_customer_phone ON orders(customer_phone);

// 3. Order Items Table
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  size VARCHAR(10),
  color VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_product_id ON order_items(product_id);

// 4. Favorites Table
CREATE TABLE favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  user_identifier VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_favorites_product_id ON favorites(product_id);
CREATE INDEX idx_favorites_user ON favorites(user_identifier);

// 5. Store Info Table (NEW - untuk halaman Tentang Kami)
CREATE TABLE store_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_name VARCHAR(255) NOT NULL DEFAULT 'Katalog Wear',
  description TEXT,
  vision TEXT,
  mission TEXT,
  address VARCHAR(255),
  phone VARCHAR(20),
  email VARCHAR(255),
  whatsapp_number VARCHAR(20),
  instagram_url TEXT,
  facebook_url TEXT,
  opening_hours JSONB,
  about_logo_url TEXT,
  team_description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

// 6. Contact Messages Table (NEW - untuk halaman Kontak)
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'unread',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_contact_messages_status ON contact_messages(status);
CREATE INDEX idx_contact_messages_created_at ON contact_messages(created_at);

// ==================== SAMPLE DATA ====================

// Insert Store Info
INSERT INTO store_info (
  store_name,
  description,
  vision,
  mission,
  address,
  phone,
  email,
  whatsapp_number,
  instagram_url,
  facebook_url,
  opening_hours,
  team_description
) VALUES (
  'Katalog Wear',
  'UMKM lokal yang berdedikasi untuk menyediakan pakaian berkualitas tinggi dengan harga terjangkau.',
  'Menjadi pilihan utama UMKM fashion di Indonesia yang menyediakan pakaian berkualitas dengan harga terjangkau.',
  'Menjamin setiap produk memenuhi standar kualitas tertinggi dan memberikan pelayanan terbaik',
  'Jl. Pahlawan No. 123, Bandung, Jawa Barat',
  '+62 878 1234 5678',
  'info@katalogwear.com',
  '62812345678',
  'https://instagram.com/katalogwear',
  'https://facebook.com/katalogwear',
  '{"senin_jumat": "09:00 - 18:00", "sabtu": "10:00 - 16:00", "minggu": "Tutup"}',
  'Tim kami terdiri dari profesional berpengalaman yang passionate dalam bidang fashion dan customer service.'
);

// Insert Sample Products
INSERT INTO products (name, description, price, image_url, category, size, color, stock) VALUES
('T-Shirt Polos Premium', 'T-shirt berkualitas premium dengan bahan katun 100% yang nyaman dan tahan lama', 49000, '/images/tshirt-polos.jpg', 'T-Shirt', ARRAY['XS', 'S', 'M', 'L', 'XL', 'XXL'], ARRAY['#000000', '#FFFFFF', '#FF6600'], 50),
('Kemeja Casual Pria', 'Kemeja casual dengan desain minimalis yang cocok untuk berbagai acara', 129000, '/images/kemeja-casual.jpg', 'Kemeja', ARRAY['S', 'M', 'L', 'XL'], ARRAY['#1E3A8A', '#FFFFFF', '#DC2626'], 30),
('Celana Panjang Jeans', 'Celana jeans premium dengan potongan modern dan nyaman dipakai', 189000, '/images/jeans.jpg', 'Celana', ARRAY['28', '30', '32', '34', '36'], ARRAY['#1F2937'], 25),
('Hoodie Hangat', 'Hoodie dengan bahan fleece yang hangat dan stylish untuk cuaca dingin', 159000, '/images/hoodie.jpg', 'Hoodie', ARRAY['XS', 'S', 'M', 'L', 'XL'], ARRAY['#000000', '#4F46E5', '#DC2626'], 40),
('Jaket Denim Original', 'Jaket denim original dengan kualitas tinggi dan desain klasik tidak akan ketinggalan zaman', 249000, '/images/jaket-denim.jpg', 'Jaket', ARRAY['S', 'M', 'L', 'XL', 'XXL'], ARRAY['#3B82F6'], 20);

// ==================== RLS (ROW LEVEL SECURITY) ====================

// Enable RLS pada tabel
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE store_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

// Policies untuk Products (semua orang bisa baca)
CREATE POLICY "Public can read products"
  ON products FOR SELECT
  USING (true);

// Policies untuk Orders (semua orang bisa insert)
CREATE POLICY "Public can insert orders"
  ON orders FOR INSERT
  WITH CHECK (true);

// Policies untuk Contact Messages (semua orang bisa insert)
CREATE POLICY "Public can insert contact messages"
  ON contact_messages FOR INSERT
  WITH CHECK (true);

// Policies untuk Store Info (semua orang bisa baca)
CREATE POLICY "Public can read store info"
  ON store_info FOR SELECT
  USING (true);

// ==================== NOTES ====================
// 1. Pastikan semua foreign keys sudah referencing UUID yang benar
// 2. RLS policies dapat disesuaikan sesuai kebutuhan authentication
// 3. Email configuration untuk contact form dapat diintegrasikan dengan Resend atau SendGrid
// 4. Backup database secara berkala untuk keamanan data
