import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import ContactPageClient from "./contact-client";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us",
  description:
    "Reach iCentra's teams in Texas, London, and Abuja. Fill out a short form and we'll get back to you as soon as possible.",
  path: "/contact",
  image: "/images/about/discover-icentra.jpg",
});

export default function ContactPage() {
  return <ContactPageClient />;
}
