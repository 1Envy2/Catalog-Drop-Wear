import Midtrans from "midtrans-client";
import { NextResponse } from "next/server";

// Inisialisasi Snap client Midtrans
const snap = new Midtrans.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY || "",
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || "",
});

// Interface untuk request body agar tipe data jelas
interface TokenizerRequest {
  id: string;
  price: number;
  quantity: number;
  productName: string;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as TokenizerRequest;
    const { id, price, productName } = body;

    // 1. Validasi input wajib
    if (!id || !price) {
      return NextResponse.json(
        { error: "Missing required fields: id or price" },
        { status: 400 }
      );
    }

    // 2. Truncate nama produk agar tidak lebih dari 50 karakter (Aturan Midtrans)
    const truncatedName = `Order ${id.slice(0, 8)}...`.slice(0, 50);

    // 3. Konfigurasi Parameter
    const parameter = {
      transaction_details: {
        order_id: id,
        gross_amount: Math.round(price),
      },
      item_details: [
        {
          id: id.slice(0, 20),
          price: Math.round(price),
          quantity: 1,
          name: truncatedName,
        },
      ],
      enabled_payments: [
        "credit_card", "cimb_clicks", "mandiri_clickpay", "bca_klikbca", 
        "bca_klikpay", "bri_epay", "echannel", "permata_va", 
        "bca_va", "bni_va", "bri_va", "cimb_va", "other_va", 
        "gopay", "indomaret", "alfamart", "shopeepay"
      ],
    };

    // Buat Transaction Token
    const transaction = await snap.createTransaction(parameter);
    
    return NextResponse.json({ token: transaction.token });

  } catch (error) {
    // Pengganti 'any': Gunakan pengecekan tipe manual
    console.error("Tokenizer Server Error:", error);
    
    let errorMessage = "Failed to create transaction token";
    
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}