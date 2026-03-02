import { z } from "zod";

// --- Product Schema ---
export const ProductSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(3, "Nama produk minimal 3 karakter"),
  description: z.string().optional().nullable(),
  price: z.number().min(0, "Harga tidak boleh negatif"),
  image_url: z.string().url("URL gambar harus valid"),
  category: z.string(),
  size: z.array(z.string()).optional().nullable(),
  color: z.array(z.string()).optional().nullable(),
  stock: z.number().min(0),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
});

export type Product = z.infer<typeof ProductSchema>;

// --- Cart Item Schema ---
export const CartItemSchema = z.object({
  product_id: z.string().uuid(),
  quantity: z.number().min(1, "Jumlah minimal 1"),
  size: z.string().optional().nullable(),
  color: z.string().optional().nullable(),
  price: z.number().min(0),
});

export type CartItem = z.infer<typeof CartItemSchema>;

// --- Order Schema (Data Form Checkout) ---
// Gunakan schema ini di useForm checkout kamu
export const OrderSchema = z.object({
  customer_name: z.string().min(3, "Nama minimal 3 karakter"),
  customer_phone: z
    .string()
    .min(10, "Nomor terlalu pendek")
    .regex(/^62[0-9]{9,12}$/, "Format harus 628xxxxxx (Gunakan 62, bukan 0)"),
  customer_email: z.string().email("Email tidak valid").optional().or(z.string().length(0)),
  notes: z.string().optional(),
  status: z.enum(["pending", "confirmed", "shipped", "delivered", "cancelled"]).default("pending"),
});

// Ini untuk tipe data form
export type CheckoutFormData = z.infer<typeof OrderSchema>;

// Ini untuk tipe data lengkap Order di database
export interface Order extends CheckoutFormData {
  id: string;
  items: CartItem[];
  total_price: number;
  created_at: string;
}

// --- Filter Schema ---
export const FilterSchema = z.object({
  category: z.string().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  size: z.string().optional(),
  color: z.string().optional(),
  search: z.string().optional(),
});

export type Filter = z.infer<typeof FilterSchema>;