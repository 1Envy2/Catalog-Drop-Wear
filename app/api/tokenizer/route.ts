import Midtrans from "midtrans-client";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

// Inisialisasi Snap client Midtrans
const snap = new Midtrans.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY || "",
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || "",
});

// Interface untuk request body agar tipe data jelas
interface TokenizerRequest {
  id: string;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as TokenizerRequest;
    const { id } = body;

    // 1. Validasi input wajib
    if (!id) {
      return NextResponse.json(
        { error: "Missing required field: id" },
        { status: 400 },
      );
    }

    // 2. Ambil data asli (termasuk harga) dari database menggunakan Admin Client
    // Hal ini untuk mencegah "Price Manipulation" dari request client
    const { data: order, error: dbError } = await supabaseAdmin
      .from("orders")
      .select("total_price, items")
      .eq("id", id)
      .single();

    if (dbError || !order) {
      console.error("Supabase Error:", dbError);
      return NextResponse.json(
        { error: "Order not found or database error" },
        { status: 404 }
      );
    }

    const actualPrice = order.total_price;

    // 3. Truncate nama produk agar tidak lebih dari 50 karakter (Aturan Midtrans)
    const truncatedName = `Order ${id.slice(0, 8)}...`.slice(0, 50);

    // 4. Konfigurasi Parameter
    const parameter = {
      transaction_details: {
        order_id: id,
        gross_amount: Math.round(actualPrice),
      },
      item_details: [
        {
          id: id.slice(0, 20),
          price: Math.round(actualPrice),
          quantity: 1,
          name: truncatedName,
        },
      ],
      callbacks: {
        // Memaksa Midtrans kembali ke halaman sukses aplikasi kita, bukan ke example.com
        finish: `${request.headers.get("origin") || "http://localhost:3000"}/order-success?order_id=${id}`
      }
    };

    // Buat Transaction Token
    // 'as any' digunakan karena type definition dari 'midtrans-client' 
    // belum mendukung property 'callbacks' meskipun API aslinya mendukung.
    const transaction = await snap.createTransaction(parameter as any);

    return NextResponse.json({ token: transaction.token });
  } catch (error) {
    // Pengganti 'any': Gunakan pengecekan tipe manual
    console.error("Tokenizer Server Error:", error);

    let errorMessage = "Failed to create transaction token";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
