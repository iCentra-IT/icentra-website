"use client";

import { use } from "react";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useConfirm } from "@/components/admin/confirm-dialog";
import { ListSkeleton, EmptyState, ErrorState } from "@/components/admin/list-states";
import { LayersIcon } from "@/components/admin/icons";
import { useStaffMutation, useStaffQuery } from "@/lib/admin/queries";
import { TAXONOMY_REGISTRY, type TaxonomyItem } from "@/lib/admin/taxonomy-registry";

export default function TaxonomyListPage({ params }: { params: Promise<{ resource: string }> }) {
  const { resource } = use(params);
  const config = TAXONOMY_REGISTRY[resource];
  const queryClient = useQueryClient();
  const confirm = useConfirm();

  const itemsQuery = useStaffQuery<TaxonomyItem[]>(["taxonomy", resource], (token) => {
    if (!config) throw new Error(`Unknown resource "${resource}"`);
    return config.list(token);
  });
  const deleteMutation = useStaffMutation<string, void>((token, slug) => {
    if (!config) throw new Error(`Unknown resource "${resource}"`);
    return config.remove(token, slug);
  });

  if (!config) {
    return <p className="text-[#6B7280] text-sm">Unknown resource &ldquo;{resource}&rdquo;.</p>;
  }

  async function handleDelete(slug: string, name: string) {
    const ok = await confirm({ title: `Delete "${name}"?`, description: "This can't be undone.", confirmLabel: "Delete", tone: "danger" });
    if (!ok) return;
    try {
      await deleteMutation.mutateAsync(slug);
      queryClient.setQueryData<TaxonomyItem[]>(["taxonomy", resource], (prev) => prev?.filter((i) => i.slug !== slug));
      toast.success(`${config.singularLabel} deleted.`);
    } catch {
      toast.error(`Couldn't delete this ${config.singularLabel.toLowerCase()}. Please try again.`);
    }
  }

  const items = itemsQuery.data;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between gap-4 mb-6">
        <h1 className="text-[#1A274F] text-xl lg:text-2xl font-bold">{config.label}</h1>
        <Link
          href={`/admin/taxonomy/${resource}/new`}
          className="inline-flex items-center px-5 py-2.5 rounded-full bg-[#0066FF] text-white text-sm font-semibold hover:bg-[#25429A] transition-colors shrink-0"
        >
          + New {config.singularLabel}
        </Link>
      </div>

      {itemsQuery.isLoading && <ListSkeleton />}

      {itemsQuery.isError && (
        <ErrorState message={`Couldn't load ${config.label.toLowerCase()}. Please try again.`} onRetry={() => itemsQuery.refetch()} />
      )}

      {items && items.length === 0 && (
        <EmptyState
          icon={<LayersIcon />}
          title={`No ${config.label.toLowerCase()} yet`}
          description="Create the first one to make it selectable elsewhere."
          action={
            <Link href={`/admin/taxonomy/${resource}/new`} className="text-[#0066FF] text-sm font-semibold hover:text-[#25429A] transition-colors mt-1">
              + New {config.singularLabel}
            </Link>
          }
        />
      )}

      {items && items.length > 0 && (
        <div className="bg-white rounded-2xl border border-[#DCE0E8] overflow-hidden">
          {items.map((item, i) => (
            <div
              key={item.id}
              className={`flex items-center justify-between gap-4 px-6 py-4 ${i !== 0 ? "border-t border-[#DCE0E8]" : ""}`}
            >
              <div className="min-w-0">
                <p className="text-[#1A274F] text-sm font-semibold truncate">{item.name}</p>
                {item.description && <p className="text-[#9CA3AF] text-xs truncate">{item.description}</p>}
              </div>
              <div className="flex items-center gap-3 shrink-0">
                {item.is_active !== undefined && (
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      item.is_active ? "bg-[#DCFCE7] text-[#15803D]" : "bg-[#F7F9FC] text-[#6B7280]"
                    }`}
                  >
                    {item.is_active ? "Active" : "Inactive"}
                  </span>
                )}
                <Link
                  href={`/admin/taxonomy/${resource}/${item.slug}/edit`}
                  className="text-[#0066FF] text-sm font-semibold hover:text-[#25429A] transition-colors"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(item.slug, item.name)}
                  disabled={deleteMutation.isPending}
                  className="text-red-600 text-sm font-semibold hover:text-red-800 transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {deleteMutation.isPending && deleteMutation.variables === item.slug ? "Deleting…" : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
