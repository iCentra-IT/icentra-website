import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Staff Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-[#F7F9FC]">{children}</div>;
}
