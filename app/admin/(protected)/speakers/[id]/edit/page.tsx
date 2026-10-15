"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SpeakerForm from "@/components/admin/speaker-form";
import { withFreshToken, SessionExpiredError } from "@/lib/admin/session";
import { staffGetSpeaker, staffUpdateSpeaker, staffDeleteSpeaker, type SpeakerInput, type StaffSpeaker } from "@/lib/api/speakers";

export default function EditSpeakerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const speakerId = Number(id);
  const router = useRouter();
  const [speaker, setSpeaker] = useState<StaffSpeaker | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    withFreshToken((token) => staffGetSpeaker(token, speakerId))
      .then((data) => {
        if (!cancelled) setSpeaker(data);
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
  }, [router, speakerId]);

  async function handleSubmit(data: SpeakerInput, photo: File | null) {
    try {
      const updated = await withFreshToken((token) => staffUpdateSpeaker(token, speakerId, data, photo));
      setSpeaker(updated);
    } catch (err) {
      if (err instanceof SessionExpiredError) {
        router.replace("/admin/login");
        return;
      }
      throw err;
    }
  }

  async function handleDelete() {
    if (!speaker || !window.confirm(`Delete "${speaker.name}"? This can't be undone.`)) return;
    setDeleting(true);
    try {
      await withFreshToken((token) => staffDeleteSpeaker(token, speakerId));
      router.push("/admin/speakers");
    } catch (err) {
      if (err instanceof SessionExpiredError) {
        router.replace("/admin/login");
        return;
      }
      window.alert("Couldn't delete this speaker. Please try again.");
      setDeleting(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Link href="/admin/speakers" className="inline-flex items-center gap-1.5 text-[#6B7280] text-sm hover:text-[#1A274F] transition-colors mb-4">
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        All speakers
      </Link>

      {notFound && <p className="text-[#6B7280] text-sm">This speaker couldn&apos;t be found.</p>}

      {!notFound && !speaker && (
        <div className="flex items-center justify-center py-20">
          <div className="w-6 h-6 border-2 border-[#DCE0E8] border-t-[#0066FF] rounded-full animate-spin" />
        </div>
      )}

      {speaker && (
        <>
          <h1 className="text-[#1A274F] text-xl lg:text-2xl font-bold mb-6">Edit Speaker</h1>
          <SpeakerForm
            initial={speaker}
            submitLabel="Save Changes"
            onSubmit={handleSubmit}
            extraActions={
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="px-5 py-2.5 rounded-full border border-red-200 text-red-600 text-sm font-semibold hover:bg-red-50 transition-colors disabled:opacity-50 cursor-pointer"
              >
                {deleting ? "Deleting…" : "Delete Speaker"}
              </button>
            }
          />
        </>
      )}
    </div>
  );
}
