import type { Metadata } from "next";
import EventDetail from "@/components/sections/events/event-detail";
import { pageMetadata } from "@/lib/seo";
import { listEvents, getEvent } from "@/lib/api/events";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  // Defensive: a flaky/rate-limited API response here must not fail the whole
  // build — falling back to on-demand rendering for these slugs is fine.
  const events = await listEvents().catch(() => []);
  return events.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEvent(slug).catch(() => null);
  if (!event) return {};

  return pageMetadata({
    title: `${event.title} | Events`,
    description: event.subtitle || event.description.slice(0, 160),
    path: `/events/${event.slug}`,
    image: event.cover_image ?? "/images/event/inntech-summit.jpg",
  });
}

export default async function EventDetailPage({ params }: PageProps) {
  const { slug } = await params;

  return (
    <main className="w-full overflow-x-hidden">
      <EventDetail slug={slug} />
    </main>
  );
}
