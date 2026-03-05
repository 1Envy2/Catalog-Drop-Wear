import { AppSidebar } from "@/components/common/AppSidebar";

export default function KatalogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex flex-1 items-start bg-white"> 
      <AppSidebar /> 
      
      {/* Main content dengan responsive padding */}
      <main className="flex-1 w-full min-h-[calc(100vh-73px)] border-l border-gray-100">
        <div className="p-4 md:p-8 lg:p-10">
          {children}
        </div>
      </main>
    </div>
  );
}