import SideNav from '@/app/ui/dashboard/sidenav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex h-screen flex-col md:flex-row md:overflow-hidden"
      style={{
        backgroundImage: "url('/bg_dashboard.png')", // Mengatur gambar latar
        backgroundSize: 'cover', // Membuat gambar memenuhi latar
        backgroundPosition: 'center', // Memusatkan gambar
        backgroundRepeat: 'no-repeat', // Menghindari pengulangan gambar
      }}
    >
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}
