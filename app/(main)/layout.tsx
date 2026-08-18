import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { SanityLive } from "@/sanity/lib/live";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-full flex flex-col">
      <Navbar />
      {children}
      <Footer />
      <SanityLive />
    </div>
  );
}
