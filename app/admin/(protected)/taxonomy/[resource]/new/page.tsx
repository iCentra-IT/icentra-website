"use client";

import { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import TaxonomyForm from "@/components/admin/taxonomy-form";
import { withFreshToken, SessionExpiredError } from "@/lib/admin/session";
import { TAXONOMY_REGISTRY } from "@/lib/admin/taxonomy-registry";

export default function NewTaxonomyItemPage({ params }: { params: Promise<{ resource: string }> }) {
  const { resource } = use(params);
  const config = TAXONOMY_REGISTRY[resource];
  const router = useRouter();

  if (!config) {
    return <p className="text-[#6B7280] text-sm">Unknown resource &ldquo;{resource}&rdquo;.</p>;
  }

  async function handleSubmit(data: Record<string, unknown>) {
    try {
      await withFreshToken((token) => config.create(token, data));
      router.push(`/admin/taxonomy/${resource}`);
    } catch (err) {
      if (err instanceof SessionExpiredError) {
        router.replace("/admin/login");
        return;
      }
      throw err;
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Link
        href={`/admin/taxonomy/${resource}`}
        className="inline-flex items-center gap-1.5 text-[#6B7280] text-sm hover:text-[#1A274F] transition-colors mb-4"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        All {config.label}
      </Link>
      <h1 className="text-[#1A274F] text-xl lg:text-2xl font-bold mb-6">New {config.singularLabel}</h1>
      <TaxonomyForm config={config} submitLabel={`Create ${config.singularLabel}`} onSubmit={handleSubmit} />
    </div>
  );
}
