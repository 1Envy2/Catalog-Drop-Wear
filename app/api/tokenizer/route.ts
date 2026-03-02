import Midtrans from "midtrans-client";
import { NextResponse } from "next/server";

let snap = new Midtrans.Snap({
  isProduction: false, // Set ke true jika sudah live
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY,
});

export async function POST(request: Request) {
  const { id, productName, price, quantity } = await request.json();

  let parameter = {
    transaction_details: {
      order_id: id, // ID unik dari pesanan (bisa UUID)
      gross_amount: price * quantity,
    },
    item_details: [
      {
        id: id,
        price: price,
        quantity: quantity,
        name: productName,
      },
    ],
  };

  const token = await snap.createTransactionToken(parameter);
  return NextResponse.json({ token });
}