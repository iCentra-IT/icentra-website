import type { Metadata } from "next";

// NOTE: assumed production domain based on WP_BASE_URL / brand name found in
// this codebase. Update this if the real production domain differs.
export const SITE_URL = "https://icentra.com";
export const SITE_NAME = "iCentra";
export const DEFAULT_TITLE = "iCentra | Transforming People & Organizations for Excellent Performance";
export const DEFAULT_DESCRIPTION =
  "iCentra partners with organizations to drive continuous transformation, cybersecurity, strategy and execution, and learning & talent development — turning ambition into measurable performance.";
export const DEFAULT_OG_IMAGE = "/images/banner/discover-icentra.png";

interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
  image?: string;
  noIndex?: boolean;
}

/**
 * Builds a consistent Metadata object for a single page: canonical URL,
 * Open Graph, and Twitter card, all derived from the page's own title/description.
 */
export function pageMetadata({ title, description, path, image, noIndex }: PageMetadataInput): Metadata {
  const url = `${SITE_URL}${path}`;
  const ogImage = image ?? DEFAULT_OG_IMAGE;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: [{ url: ogImage }],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}

/** Same as pageMetadata, but for an article-like page (og:type "article"). */
export function articleMetadata({
  title,
  description,
  path,
  image,
  publishedTime,
}: PageMetadataInput & { publishedTime?: string }): Metadata {
  const base = pageMetadata({ title, description, path, image });
  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      type: "article",
      ...(publishedTime ? { publishedTime } : {}),
    },
  };
}

/* ─────────────────────────────────────────
   JSON-LD STRUCTURED DATA
───────────────────────────────────────── */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    sameAs: [
      "https://twitter.com/icentra",
      "https://facebook.com/icentra",
      "https://instagram.com/icentra",
      "https://youtube.com/icentra",
    ],
  };
}

export function articleJsonLd({
  title,
  description,
  url,
  image,
  datePublished,
}: {
  title: string;
  description?: string;
  url: string;
  image?: string | null;
  datePublished: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: image ? [image] : undefined,
    datePublished,
    dateModified: datePublished,
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
}

export function jobPostingJsonLd({
  title,
  description,
  url,
  datePosted,
  employmentType,
  location,
}: {
  title: string;
  description: string;
  url: string;
  datePosted: string;
  employmentType: string;
  location: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title,
    description,
    url,
    datePosted,
    employmentType: employmentType.toUpperCase().includes("INTERN") ? "INTERN" : "FULL_TIME",
    hiringOrganization: {
      "@type": "Organization",
      name: SITE_NAME,
      sameAs: SITE_URL,
    },
    jobLocation: {
      "@type": "Place",
      address: { "@type": "PostalAddress", addressLocality: location },
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}
