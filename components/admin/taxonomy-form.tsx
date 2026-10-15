"use client";

import { useState } from "react";
import { FormField, FormTextarea } from "@/components/forms/form-component";
import { ApiError } from "@/lib/api/client";
import type { TaxonomyConfig, TaxonomyItem } from "@/lib/admin/taxonomy-registry";

interface TaxonomyFormProps {
  config: TaxonomyConfig;
  initial?: TaxonomyItem;
  submitLabel: string;
  onSubmit: (data: Record<string, unknown>) => Promise<void>;
  extraActions?: React.ReactNode;
}

export default function TaxonomyForm({ config, initial, submitLabel, onSubmit, extraActions }: TaxonomyFormProps) {
  const [name, setName] = useState(initial?.name ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [isActive, setIsActive] = useState(initial?.is_active ?? true);
  const [sortOrder, setSortOrder] = useState(initial?.sort_order ?? 0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const data: Record<string, unknown> = { name, slug: slug.trim() || undefined };
    if (config.fields.includes("description")) data.description = description;
    if (config.fields.includes("is_active")) data.is_active = isActive;
    if (config.fields.includes("sort_order")) data.sort_order = sortOrder;

    try {
      await onSubmit(data);
    } catch (err) {
      setError(err instanceof ApiError ? err.firstFieldError ?? err.message : "Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <div className="bg-white rounded-2xl border border-[#DCE0E8] p-6 lg:p-8 flex flex-col gap-5">
        <FormField label="Name" required value={name} onChange={(e) => setName(e.target.value)} />
        <FormField
          label="Slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="Auto-generated from name if left blank"
        />
        {config.fields.includes("description") && (
          <FormTextarea label="Description" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
        )}
        {config.fields.includes("sort_order") && (
          <FormField
            label="Sort Order"
            type="number"
            value={sortOrder}
            onChange={(e) => setSortOrder(Number(e.target.value))}
          />
        )}
        {config.fields.includes("is_active") && (
          <label className="flex items-center gap-3 cursor-pointer w-fit">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="w-4 h-4 accent-[#0066FF]"
            />
            <span className="text-[#374151] text-sm font-medium">Active (shown publicly)</span>
          </label>
        )}
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <div className="flex items-center justify-between gap-4">
        <div>{extraActions}</div>
        <button
          type="submit"
          disabled={submitting}
          className="px-8 py-3.5 rounded-full bg-[#0066FF] text-white text-sm font-semibold hover:bg-[#25429A] transition-colors disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        >
          {submitting ? "Saving…" : submitLabel}
        </button>
      </div>
    </form>
  );
}
