import * as pillars from "@/lib/api/pillars";
import * as newsletter from "@/lib/api/newsletter";
import * as volunteer from "@/lib/api/volunteer";

export type TaxonomyField = "description" | "is_active" | "sort_order";

/** The common shape every taxonomy item has, regardless of resource. */
export interface TaxonomyItem {
  id: number;
  name: string;
  slug: string;
  description?: string;
  is_active?: boolean;
  sort_order?: number;
}

export interface TaxonomyConfig {
  key: string;
  label: string;
  singularLabel: string;
  fields: TaxonomyField[];
  list: (accessToken: string) => Promise<TaxonomyItem[]>;
  create: (accessToken: string, data: Record<string, unknown>) => Promise<TaxonomyItem>;
  update: (accessToken: string, slug: string, data: Record<string, unknown>) => Promise<TaxonomyItem>;
  remove: (accessToken: string, slug: string) => Promise<void>;
}

/**
 * Each resource's real API functions take a narrower, resource-specific
 * input type (e.g. `{ name: string; ... }` instead of `Record<string, unknown>`).
 * They're structurally compatible at runtime — TaxonomyForm always sends a
 * `name` — so this file is built without the TaxonomyConfig annotation and
 * cast once at the end, rather than fighting parameter contravariance per entry.
 */
const registry = {
  pillars: {
    key: "pillars",
    label: "Pillars",
    singularLabel: "Pillar",
    fields: ["description", "is_active"],
    list: pillars.staffListPillars,
    create: pillars.staffCreatePillar,
    update: pillars.staffUpdatePillar,
    remove: pillars.staffDeletePillar,
  },
  "newsletter-categories": {
    key: "newsletter-categories",
    label: "Newsletter Categories",
    singularLabel: "Category",
    fields: ["description", "is_active"],
    list: newsletter.staffListNewsletterCategories,
    create: newsletter.staffCreateNewsletterCategory,
    update: newsletter.staffUpdateNewsletterCategory,
    remove: newsletter.staffDeleteNewsletterCategory,
  },
  "volunteer-skills": {
    key: "volunteer-skills",
    label: "Volunteer Skills",
    singularLabel: "Skill",
    fields: ["is_active"],
    list: volunteer.staffListSkills,
    create: volunteer.staffCreateSkill,
    update: volunteer.staffUpdateSkill,
    remove: volunteer.staffDeleteSkill,
  },
  "volunteer-availability": {
    key: "volunteer-availability",
    label: "Volunteer Availability",
    singularLabel: "Slot",
    fields: ["sort_order"],
    list: volunteer.staffListAvailability,
    create: volunteer.staffCreateAvailability,
    update: volunteer.staffUpdateAvailability,
    remove: volunteer.staffDeleteAvailability,
  },
};

export const TAXONOMY_REGISTRY = registry as unknown as Record<string, TaxonomyConfig>;
