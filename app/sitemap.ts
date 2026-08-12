import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { sanityFetch } from "@/sanity/lib/live";
import { ALL_POST_SLUGS_QUERY, CASE_STUDY_SLUGS_QUERY, JOB_SLUGS_QUERY } from "@/sanity/lib/queries";

const STATIC_ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" },
  { path: "/careers", priority: 0.8, changeFrequency: "weekly" },
  { path: "/contact", priority: 0.7, changeFrequency: "monthly" },
  { path: "/enterprise", priority: 0.6, changeFrequency: "monthly" },
  { path: "/events", priority: 0.7, changeFrequency: "weekly" },
  { path: "/industry", priority: 0.8, changeFrequency: "weekly" },
  { path: "/legal/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/legal/terms", priority: 0.3, changeFrequency: "yearly" },
  { path: "/news", priority: 0.9, changeFrequency: "daily" },
  { path: "/what-we-do/continuous-transformation", priority: 0.8, changeFrequency: "monthly" },
  { path: "/what-we-do/platforms", priority: 0.5, changeFrequency: "monthly" },
  { path: "/what-we-do/solutions", priority: 0.8, changeFrequency: "monthly" },
  { path: "/what-we-do/solutions/cybersecurity", priority: 0.8, changeFrequency: "monthly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [{ data: postSlugs }, { data: caseStudySlugs }, { data: jobSlugs }] = await Promise.all([
    sanityFetch({ query: ALL_POST_SLUGS_QUERY }),
    sanityFetch({ query: CASE_STUDY_SLUGS_QUERY }),
    sanityFetch({ query: JOB_SLUGS_QUERY }),
  ]);

  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const postEntries: MetadataRoute.Sitemap = ((postSlugs ?? []) as string[]).map((slug) => ({
    url: `${SITE_URL}/news/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const caseStudyEntries: MetadataRoute.Sitemap = ((caseStudySlugs ?? []) as string[]).map((slug) => ({
    url: `${SITE_URL}/industry/case-study/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const jobEntries: MetadataRoute.Sitemap = ((jobSlugs ?? []) as string[]).map((slug) => ({
    url: `${SITE_URL}/careers/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  return [...staticEntries, ...postEntries, ...caseStudyEntries, ...jobEntries];
}
