"use client";

import { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import TaxonomyForm from "@/components/admin/taxonomy-form";
import { useStaffMutation } from "@/lib/admin/queries";
import { TAXONOMY_REGISTRY, type TaxonomyItem } from "@/lib/admin/taxonomy-registry";

export default function NewTaxonomyItemPage({ params }: { params: Promise<{ resource: string }> }) {
  const { resource } = use(params);
  const config = TAXONOMY_REGISTRY[resource];
  const router = useRouter();
  const queryClient = useQueryClient();
  const createMutation = useStaffMutation<Record<string, unknown>, TaxonomyItem>((token, data) => {
    if (!config) throw new Error(`Unknown resource "${resource}"`);
    return config.create(token, data);
  });

  if (!config) {
    return <p className="text-[#6B7280] text-sm">Unknown resource &ldquo;{resource}&rdquo;.</p>;
  }

  async function handleSubmit(data: Record<string, unknown>) {
    await createMutation.mutateAsync(data);
    queryClient.invalidateQueries({ queryKey: ["taxonomy", resource] });
    toast.success(`${config.singularLabel} created.`);
    router.push(`/admin/taxonomy/${resource}`);
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
