import { CartItem } from "@/lib/schemas/product";

// Tambahkan interface baru untuk menyertakan nama produk
export interface WhatsAppCartItem extends CartItem {
  product_name: string; // Tambahkan ini agar kita bisa cetak nama barangnya
}

export const generateWhatsAppMessage = (
  customerName: string,
  items: WhatsAppCartItem[], // Gunakan interface baru
  totalPrice: number,
  notes?: string,
): string => {
  let message = `*KONFIRMASI PESANAN - DROP.WEAR* 🏷️\n`;
  message += `----------------------------------\n`;
  message += `👤 *Customer:* ${customerName}\n`;
  message += `📅 *Tanggal:* ${new Date().toLocaleDateString("id-ID")}\n\n`;
  
  message += `📦 *Detail Item:*\n`;

  items.forEach((item, index) => {
    // Tampilan Nama Produk & Jumlah
    message += `*${index + 1}. ${item.product_name.toUpperCase()}* x${item.quantity}\n`;
    
    // Tampilan Ukuran dan Warna jika ada
    if (item.size) message += `   - Size: ${item.size}\n`;
    if (item.color) message += `   - Color: ${item.color}\n`;
    
    // Harga per item
    message += `   - Harga: Rp ${(item.price * item.quantity).toLocaleString("id-ID")}\n`;
    message += `\n`;
  });

  message += `----------------------------------\n`;
  message += `💰 *TOTAL PEMBAYARAN:* Rp ${totalPrice.toLocaleString("id-ID")}\n`;

  if (notes) {
    message += `\n📝 *Catatan Tambahan:*\n_${notes}_\n`;
  }

  message += `\nMohon konfirmasi ketersediaan stok dan instruksi pembayaran. Terima kasih! 🙏`;

  return message;
};

export const createWhatsAppLink = (
  phoneNumber: string,
  message: string,
): string => {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
};

export const shareProductViaWhatsApp = (
  productName: string,
  productUrl: string,
): string => {
  const message = `Hai! Coba lihat produk ini: ${productName}\n${productUrl}`;
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "62812345678";
  return createWhatsAppLink(phoneNumber, message);
};
