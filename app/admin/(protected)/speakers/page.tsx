"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { withFreshToken, SessionExpiredError } from "@/lib/admin/session";
import { staffListSpeakers, staffDeleteSpeaker, type StaffSpeaker } from "@/lib/api/speakers";

export default function AdminSpeakersPage() {
  const router = useRouter();
  const [speakers, setSpeakers] = useState<StaffSpeaker[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    withFreshToken((token) => staffListSpeakers(token))
      .then((data) => {
        if (!cancelled) setSpeakers(data);
      })
      .catch((err) => {
        if (cancelled) return;
        if (err instanceof SessionExpiredError) {
          router.replace("/admin/login");
          return;
        }
        setError("Couldn't load speakers. Please try again.");
      });
    return () => {
      cancelled = true;
    };
  }, [router]);

  async function handleDelete(id: number, name: string) {
    if (!window.confirm(`Delete "${name}"? This can't be undone.`)) return;
    setDeletingId(id);
    try {
      await withFreshToken((token) => staffDeleteSpeaker(token, id));
      setSpeakers((prev) => prev?.filter((s) => s.id !== id) ?? null);
    } catch (err) {
      if (err instanceof SessionExpiredError) {
        router.replace("/admin/login");
        return;
      }
      window.alert("Couldn't delete this speaker. Please try again.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-[#1A274F] text-xl lg:text-2xl font-bold">Speakers</h1>
          <p className="text-[#6B7280] text-sm mt-1">Attach speakers to events from the event form.</p>
        </div>
        <Link
          href="/admin/speakers/new"
          className="inline-flex items-center px-5 py-2.5 rounded-full bg-[#0066FF] text-white text-sm font-semibold hover:bg-[#25429A] transition-colors shrink-0"
        >
          + New Speaker
        </Link>
      </div>

      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

      {speakers === null && !error && (
        <div className="flex items-center justify-center py-20">
          <div className="w-6 h-6 border-2 border-[#DCE0E8] border-t-[#0066FF] rounded-full animate-spin" />
        </div>
      )}

      {speakers !== null && speakers.length === 0 && (
        <div className="bg-white rounded-2xl border border-[#DCE0E8] p-10 text-center text-[#6B7280] text-sm">
          No speakers yet. Create the first one.
        </div>
      )}

      {speakers !== null && speakers.length > 0 && (
        <div className="bg-white rounded-2xl border border-[#DCE0E8] overflow-hidden">
          {speakers.map((speaker, i) => (
            <div
              key={speaker.id}
              className={`flex items-center justify-between gap-4 px-6 py-4 ${i !== 0 ? "border-t border-[#DCE0E8]" : ""}`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-[#EAF3FB] shrink-0">
                  {speaker.photo && <Image src={speaker.photo} alt={speaker.name} fill className="object-cover" sizes="40px" />}
                </div>
                <div className="min-w-0">
                  <p className="text-[#1A274F] text-sm font-semibold truncate">{speaker.name}</p>
                  <p className="text-[#9CA3AF] text-xs truncate">
                    {[speaker.job_title, speaker.organization].filter(Boolean).join(", ") || "—"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    speaker.is_active ? "bg-[#DCFCE7] text-[#15803D]" : "bg-[#F7F9FC] text-[#6B7280]"
                  }`}
                >
                  {speaker.is_active ? "Active" : "Inactive"}
                </span>
                <Link href={`/admin/speakers/${speaker.id}/edit`} className="text-[#0066FF] text-sm font-semibold hover:text-[#25429A] transition-colors">
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(speaker.id, speaker.name)}
                  disabled={deletingId === speaker.id}
                  className="text-red-600 text-sm font-semibold hover:text-red-800 transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {deletingId === speaker.id ? "Deleting…" : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
