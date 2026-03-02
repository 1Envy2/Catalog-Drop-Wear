-- Sample Data for Testing

-- Insert sample products
INSERT INTO products (name, description, price, image_url, category, size, color, stock) VALUES
('Kaos Polos Putih', 'Kaos polos berkualitas tinggi bahan katun 100%', 65000, 'https://via.placeholder.com/400x400?text=Kaos+Putih', 'T-Shirt', ARRAY['S', 'M', 'L', 'XL', 'XXL'], ARRAY['#FFFFFF', '#000000', '#FF0000'], 50),
('Kemeja Formal Biru', 'Kemeja formal bahan premium untuk acara', 185000, 'https://via.placeholder.com/400x400?text=Kemeja+Biru', 'Kemeja', ARRAY['S', 'M', 'L', 'XL'], ARRAY['#0000FF', '#FFFFFF'], 30),
('Celana Jeans Promo', 'Celana jeans model terbaru dengan harga spesial', 150000, 'https://via.placeholder.com/400x400?text=Celana+Jeans', 'Celana', ARRAY['28', '30', '32', '34', '36'], ARRAY['#1E3A8A'], 40),
('Dress Casual Wanita', 'Dress casual nyaman untuk aktivitas sehari-hari', 95000, 'https://via.placeholder.com/400x400?text=Dress+Casual', 'Dress', ARRAY['S', 'M', 'L', 'XL'], ARRAY['#FF69B4', '#FF0000', '#008000'], 25),
('Topi Basebal Premium', 'Topi basebal dengan desain trendy', 45000, 'https://via.placeholder.com/400x400?text=Topi+Basebal', 'Aksesoris', ARRAY['One Size'], ARRAY['#000000', '#FFFFFF', '#FF0000'], 60);

-- Contoh query untuk mendapatkan produk
SELECT * FROM products ORDER BY created_at DESC;

-- Contoh query filter berdasarkan kategori dan harga
SELECT * FROM products 
WHERE category = 'T-Shirt' 
AND price >= 50000 
AND price <= 100000;

-- Contoh insert order (setelah checkout)
INSERT INTO orders (customer_name, customer_phone, customer_email, items, total_price, status, notes)
VALUES (
  'Budi Santoso',
  '628123456789',
  'budi@example.com',
  '[{"product_id": "xxx", "quantity": 2, "price": 65000, "size": "M", "color": "#FFFFFF"}]'::jsonb,
  130000,
  'pending',
  'Pengiriman ke Jakarta'
);
