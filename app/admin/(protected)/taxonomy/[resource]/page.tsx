"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { withFreshToken, SessionExpiredError } from "@/lib/admin/session";
import { TAXONOMY_REGISTRY, type TaxonomyItem } from "@/lib/admin/taxonomy-registry";

export default function TaxonomyListPage({ params }: { params: Promise<{ resource: string }> }) {
  const { resource } = use(params);
  const config = TAXONOMY_REGISTRY[resource];
  const router = useRouter();
  const [items, setItems] = useState<TaxonomyItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);

  useEffect(() => {
    if (!config) return;
    let cancelled = false;
    withFreshToken((token) => config.list(token))
      .then((data) => {
        if (!cancelled) setItems(data);
      })
      .catch((err) => {
        if (cancelled) return;
        if (err instanceof SessionExpiredError) {
          router.replace("/admin/login");
          return;
        }
        setError(`Couldn't load ${config.label.toLowerCase()}. Please try again.`);
      });
    return () => {
      cancelled = true;
    };
  }, [config, router]);

  if (!config) {
    return <p className="text-[#6B7280] text-sm">Unknown resource &ldquo;{resource}&rdquo;.</p>;
  }

  async function handleDelete(slug: string, name: string) {
    if (!window.confirm(`Delete "${name}"? This can't be undone.`)) return;
    setDeletingSlug(slug);
    try {
      await withFreshToken((token) => config.remove(token, slug));
      setItems((prev) => prev?.filter((i) => i.slug !== slug) ?? null);
    } catch (err) {
      if (err instanceof SessionExpiredError) {
        router.replace("/admin/login");
        return;
      }
      window.alert(`Couldn't delete this ${config.singularLabel.toLowerCase()}. Please try again.`);
    } finally {
      setDeletingSlug(null);
    }
  }

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

      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

      {items === null && !error && (
        <div className="flex items-center justify-center py-20">
          <div className="w-6 h-6 border-2 border-[#DCE0E8] border-t-[#0066FF] rounded-full animate-spin" />
        </div>
      )}

      {items !== null && items.length === 0 && (
        <div className="bg-white rounded-2xl border border-[#DCE0E8] p-10 text-center text-[#6B7280] text-sm">
          None yet. Create the first one.
        </div>
      )}

      {items !== null && items.length > 0 && (
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
                  disabled={deletingSlug === item.slug}
                  className="text-red-600 text-sm font-semibold hover:text-red-800 transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {deletingSlug === item.slug ? "Deleting…" : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
