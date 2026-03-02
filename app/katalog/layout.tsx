import { AppSidebar } from "@/components/common/AppSidebar";

export default function KatalogLayout({ children }: { children: React.ReactNode }) {
  return (
    // Gunakan relative di sini agar sidebar sticky tahu batasnya
    <div className="relative flex flex-1 items-start"> 
      <AppSidebar /> 
      
      {/* Tambahkan border-l agar ada pemisah visual yang jelas antara sidebar dan konten */}
      <main className="flex-1 w-full min-h-[calc(100vh-73px)] border-l">
        <div className="p-6 lg:p-10">
          {children}
        </div>
      </main>
    </div>
  );
}