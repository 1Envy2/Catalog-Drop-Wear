import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import ShoppingCart from "@/components/features/ShoppingCart";

export default function CartPage() {
  return (
    <>
      <main className="max-w-7xl mx-auto px-4 py-12">
        <ShoppingCart />
      </main>
    </>
  );
}
