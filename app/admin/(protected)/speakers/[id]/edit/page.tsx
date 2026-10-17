"use client";

import { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import SpeakerForm from "@/components/admin/speaker-form";
import { useConfirm } from "@/components/admin/confirm-dialog";
import { useStaffMutation, useStaffQuery } from "@/lib/admin/queries";
import { staffGetSpeaker, staffUpdateSpeaker, staffDeleteSpeaker, type SpeakerInput, type StaffSpeaker } from "@/lib/api/speakers";

export default function EditSpeakerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const speakerId = Number(id);
  const router = useRouter();
  const queryClient = useQueryClient();
  const confirm = useConfirm();

  const speakerQuery = useStaffQuery<StaffSpeaker>(["speaker", speakerId], (token) => staffGetSpeaker(token, speakerId));
  const updateMutation = useStaffMutation<{ data: SpeakerInput; photo: File | null }, StaffSpeaker>((token, { data, photo }) =>
    staffUpdateSpeaker(token, speakerId, data, photo)
  );
  const deleteMutation = useStaffMutation<void, void>((token) => staffDeleteSpeaker(token, speakerId));

  async function handleSubmit(data: SpeakerInput, photo: File | null) {
    const updated = await updateMutation.mutateAsync({ data, photo });
    queryClient.setQueryData(["speaker", speakerId], updated);
    queryClient.invalidateQueries({ queryKey: ["speakers"] });
    toast.success("Speaker saved.");
  }

  async function handleDelete() {
    const speaker = speakerQuery.data;
    if (!speaker) return;
    const ok = await confirm({ title: `Delete "${speaker.name}"?`, description: "This can't be undone.", confirmLabel: "Delete", tone: "danger" });
    if (!ok) return;
    try {
      await deleteMutation.mutateAsync();
      queryClient.invalidateQueries({ queryKey: ["speakers"] });
      toast.success("Speaker deleted.");
      router.push("/admin/speakers");
    } catch {
      toast.error("Couldn't delete this speaker. Please try again.");
    }
  }

  const speaker = speakerQuery.data;

  return (
    <div className="max-w-2xl mx-auto">
      <Link href="/admin/speakers" className="inline-flex items-center gap-1.5 text-[#6B7280] text-sm hover:text-[#1A274F] transition-colors mb-4">
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        All speakers
      </Link>

      {speakerQuery.isError && <p className="text-[#6B7280] text-sm">This speaker couldn&apos;t be found.</p>}

      {speakerQuery.isLoading && (
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
                disabled={deleteMutation.isPending}
                className="px-5 py-2.5 rounded-full border border-red-200 text-red-600 text-sm font-semibold hover:bg-red-50 transition-colors disabled:opacity-50 cursor-pointer"
              >
                {deleteMutation.isPending ? "Deleting…" : "Delete Speaker"}
              </button>
            }
          />
        </>
      )}
    </div>
  );
}
