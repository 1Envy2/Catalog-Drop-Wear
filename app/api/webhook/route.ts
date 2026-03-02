import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/client";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // 1. Verifikasi Signature Key (Keamanan)
    // Midtrans menyertakan signature untuk memastikan data benar-benar dari mereka
    const serverKey = process.env.MIDTRANS_SERVER_KEY || "";
    const hashed = crypto
      .createHash("sha512")
      .update(`${body.order_id}${body.status_code}${body.gross_amount}${serverKey}`)
      .digest("hex");

    if (hashed !== body.signature_key) {
      return NextResponse.json({ message: "Invalid Signature" }, { status: 403 });
    }

    // 2. Ambil data penting dari body Midtrans
    const orderId = body.order_id;
    const transactionStatus = body.transaction_status;
    const paymentType = body.payment_type;

    // 3. Mapping status Midtrans ke status database kamu
    let finalStatus = "pending";

    if (transactionStatus === "capture" || transactionStatus === "settlement") {
      finalStatus = "settlement"; // Pembayaran Berhasil
    } else if (
      transactionStatus === "deny" ||
      transactionStatus === "cancel" ||
      transactionStatus === "expire"
    ) {
      finalStatus = transactionStatus; // Pembayaran Gagal/Kadaluarsa
    } else if (transactionStatus === "pending") {
      finalStatus = "pending";
    }

    // 4. Update tabel 'orders' di Supabase
    const { error } = await supabase
      .from("orders")
      .update({ 
        status: finalStatus,
        payment_type: paymentType,
        midtrans_transaction_id: body.transaction_id,
        updated_at: new Date().toISOString()
      })
      .eq("id", orderId);

    if (error) {
      console.error("Supabase Update Error:", error);
      return NextResponse.json({ message: "Database Update Failed" }, { status: 500 });
    }

    return NextResponse.json({ message: "Webhook received and processed" });
  } catch (err) {
    console.error("Webhook Error:", err);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}