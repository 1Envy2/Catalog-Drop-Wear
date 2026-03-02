// API endpoint untuk create product (untuk admin)
// File: app/api/products/route.ts

import { supabase } from "@/lib/supabase/client";
import { ProductSchema } from "@/lib/schemas/product";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validasi dengan Zod
    const validatedData = ProductSchema.parse(body);

    // Insert ke Supabase
    const { data, error } = await supabase
      .from("products")
      .insert([validatedData])
      .select();

    if (error) throw error;

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Gagal membuat produk",
      },
      { status: 400 }
    );
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Gagal mengambil data",
      },
      { status: 500 }
    );
  }
}
