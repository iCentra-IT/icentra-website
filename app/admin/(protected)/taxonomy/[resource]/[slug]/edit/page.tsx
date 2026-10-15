"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import TaxonomyForm from "@/components/admin/taxonomy-form";
import { withFreshToken, SessionExpiredError } from "@/lib/admin/session";
import { TAXONOMY_REGISTRY, type TaxonomyItem } from "@/lib/admin/taxonomy-registry";

export default function EditTaxonomyItemPage({ params }: { params: Promise<{ resource: string; slug: string }> }) {
  const { resource, slug } = use(params);
  const config = TAXONOMY_REGISTRY[resource];
  const router = useRouter();
  const [item, setItem] = useState<TaxonomyItem | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!config) return;
    let cancelled = false;
    withFreshToken((token) => config.list(token))
      .then((items) => {
        if (cancelled) return;
        const found = items.find((i) => i.slug === slug);
        if (found) setItem(found);
        else setNotFound(true);
      })
      .catch((err) => {
        if (cancelled) return;
        if (err instanceof SessionExpiredError) {
          router.replace("/admin/login");
          return;
        }
        setNotFound(true);
      });
    return () => {
      cancelled = true;
    };
  }, [config, router, slug]);

  if (!config) {
    return <p className="text-[#6B7280] text-sm">Unknown resource &ldquo;{resource}&rdquo;.</p>;
  }

  async function handleSubmit(data: Record<string, unknown>) {
    try {
      const updated = await withFreshToken((token) => config.update(token, slug, data));
      setItem(updated);
      if (updated.slug !== slug) router.replace(`/admin/taxonomy/${resource}/${updated.slug}/edit`);
    } catch (err) {
      if (err instanceof SessionExpiredError) {
        router.replace("/admin/login");
        return;
      }
      throw err;
    }
  }

  async function handleDelete() {
    if (!item || !window.confirm(`Delete "${item.name}"? This can't be undone.`)) return;
    setDeleting(true);
    try {
      await withFreshToken((token) => config.remove(token, slug));
      router.push(`/admin/taxonomy/${resource}`);
    } catch (err) {
      if (err instanceof SessionExpiredError) {
        router.replace("/admin/login");
        return;
      }
      window.alert(`Couldn't delete this ${config.singularLabel.toLowerCase()}. Please try again.`);
      setDeleting(false);
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

      {!notFound && !item && (
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
                disabled={deleting}
                className="px-5 py-2.5 rounded-full border border-red-200 text-red-600 text-sm font-semibold hover:bg-red-50 transition-colors disabled:opacity-50 cursor-pointer"
              >
                {deleting ? "Deleting…" : `Delete ${config.singularLabel}`}
              </button>
            }
          />
        </>
      )}
    </div>
  );
}
