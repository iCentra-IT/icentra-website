import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { SanityLive } from "@/sanity/lib/live";
import QueryProvider from "@/components/providers/query-provider";
import CookieConsent from "@/components/ui/cookie-consent";
import GoogleTagManager from "@/components/analytics/gtm";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <GoogleTagManager />
      <div className="min-h-full flex flex-col">
        <Navbar />
        {children}
        <Footer />
        <SanityLive />
      </div>
      <CookieConsent />
    </QueryProvider>
  );
}
