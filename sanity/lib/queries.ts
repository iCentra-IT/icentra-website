/**
 * Centralized GROQ queries.
 *
 * Category model: top-level categories (e.g. "Spotlights", "Insights", "Case study")
 * can have sub-categories via the `parent` reference (e.g. "Cybersecurity" is a
 * sub-category of "Insights"). Queries below resolve a post's category membership
 * through BOTH a direct match and a parent match, so fetching by a parent slug
 * (like "insights") returns posts tagged with any of its sub-categories too.
 */

// Every top-level category, each with its sub-categories and live post counts.
export const CATEGORY_TREE_QUERY = `
  *[_type == "category" && !defined(parent)] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    "postCount": count(*[_type == "post" && references(^._id)]),
    "children": *[_type == "category" && parent._ref == ^._id] | order(title asc) {
      _id,
      title,
      "slug": slug.current,
      "postCount": count(*[_type == "post" && references(^._id)]),
    }
  }
`;

// Posts for one category slug. If the slug belongs to a parent category, posts
// tagged with any of its sub-categories are included too.
export const POSTS_BY_CATEGORY_QUERY = `
  *[
    _type == "post" &&
    count(categories[@->slug.current == $slug || @->parent->slug.current == $slug]) > 0
  ] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    mainImage,
    publishedAt,
    "plainBody": pt::text(body),
    "categories": categories[]->{ title, "slug": slug.current }
  }
`;

// Posts belonging to any of the given top-level category slugs (or their
// sub-categories) — powers the /news listing page.
export const POSTS_FOR_SLUGS_QUERY = `
  *[
    _type == "post" &&
    count(categories[@->slug.current in $slugs || @->parent->slug.current in $slugs]) > 0
  ] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    mainImage,
    publishedAt,
    "plainBody": pt::text(body),
    "categories": categories[]->{
      title,
      "slug": slug.current,
      "parentSlug": parent->slug.current
    }
  }
`;

// Every post, newest first — general feed / search source.
export const ALL_POSTS_QUERY = `
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    mainImage,
    publishedAt,
    "categories": categories[]->{ title, "slug": slug.current }
  }
`;

// Single post detail by slug, including full portable-text body.
export const POST_BY_SLUG_QUERY = `
  *[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    mainImage,
    publishedAt,
    body,
    "categories": categories[]->{
      title,
      "slug": slug.current,
      "parent": parent->{ title, "slug": slug.current }
    }
  }
`;

// Up to 3 other posts sharing at least one of the given category slugs.
export const RELATED_POSTS_QUERY = `
  *[
    _type == "post" &&
    slug.current != $slug &&
    count(categories[@->slug.current in $categorySlugs]) > 0
  ] | order(publishedAt desc) [0...4] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    mainImage,
    publishedAt,
    "plainBody": pt::text(body)
  }
`;

// All published post slugs — powers generateStaticParams for /news/[slug].
export const ALL_POST_SLUGS_QUERY = `*[_type == "post" && defined(slug.current)].slug.current`;

// Slugs of every post tagged "case-study" — powers generateStaticParams for
// /industry/case-study/[slug].
export const CASE_STUDY_SLUGS_QUERY = `
  *[
    _type == "post" &&
    defined(slug.current) &&
    count(categories[@->slug.current == "case-study"]) > 0
  ].slug.current
`;
