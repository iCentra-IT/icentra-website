"use client";

import { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import TaxonomyForm from "@/components/admin/taxonomy-form";
import { useConfirm } from "@/components/admin/confirm-dialog";
import { useStaffMutation, useStaffQuery } from "@/lib/admin/queries";
import { TAXONOMY_REGISTRY, type TaxonomyItem } from "@/lib/admin/taxonomy-registry";

export default function EditTaxonomyItemPage({ params }: { params: Promise<{ resource: string; slug: string }> }) {
  const { resource, slug } = use(params);
  const config = TAXONOMY_REGISTRY[resource];
  const router = useRouter();
  const queryClient = useQueryClient();
  const confirm = useConfirm();

  const listQuery = useStaffQuery<TaxonomyItem[]>(["taxonomy", resource], (token) => {
    if (!config) throw new Error(`Unknown resource "${resource}"`);
    return config.list(token);
  });
  const updateMutation = useStaffMutation<Record<string, unknown>, TaxonomyItem>((token, data) => {
    if (!config) throw new Error(`Unknown resource "${resource}"`);
    return config.update(token, slug, data);
  });
  const deleteMutation = useStaffMutation<void, void>((token) => {
    if (!config) throw new Error(`Unknown resource "${resource}"`);
    return config.remove(token, slug);
  });

  if (!config) {
    return <p className="text-[#6B7280] text-sm">Unknown resource &ldquo;{resource}&rdquo;.</p>;
  }

  const item = listQuery.data?.find((i) => i.slug === slug);
  const notFound = listQuery.isSuccess && !item;

  async function handleSubmit(data: Record<string, unknown>) {
    const updated = await updateMutation.mutateAsync(data);
    queryClient.invalidateQueries({ queryKey: ["taxonomy", resource] });
    toast.success(`${config.singularLabel} saved.`);
    if (updated.slug !== slug) router.replace(`/admin/taxonomy/${resource}/${updated.slug}/edit`);
  }

  async function handleDelete() {
    if (!item) return;
    const ok = await confirm({ title: `Delete "${item.name}"?`, description: "This can't be undone.", confirmLabel: "Delete", tone: "danger" });
    if (!ok) return;
    try {
      await deleteMutation.mutateAsync();
      queryClient.invalidateQueries({ queryKey: ["taxonomy", resource] });
      toast.success(`${config.singularLabel} deleted.`);
      router.push(`/admin/taxonomy/${resource}`);
    } catch {
      toast.error(`Couldn't delete this ${config.singularLabel.toLowerCase()}. Please try again.`);
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

      {notFound && <p className="text-[#6B7280] text-sm">This {config.singularLabel.toLowerCase()} couldn&apos;t be found.</p>}

      {listQuery.isLoading && (
        <div className="flex items-center justify-center py-20">
          <div className="w-6 h-6 border-2 border-[#DCE0E8] border-t-[#0066FF] rounded-full animate-spin" />
        </div>
      )}

      {item && (
        <>
          <h1 className="text-[#1A274F] text-xl lg:text-2xl font-bold mb-6">Edit {config.singularLabel}</h1>
          <TaxonomyForm
            config={config}
            initial={item}
            submitLabel="Save Changes"
            onSubmit={handleSubmit}
            extraActions={
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleteMutation.isPending}
                className="px-5 py-2.5 rounded-full border border-red-200 text-red-600 text-sm font-semibold hover:bg-red-50 transition-colors disabled:opacity-50 cursor-pointer"
              >
                {deleteMutation.isPending ? "Deleting…" : `Delete ${config.singularLabel}`}
              </button>
            }
          />
        </>
      )}
    </div>
  );
}
