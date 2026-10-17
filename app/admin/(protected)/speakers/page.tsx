"use client";

import Image from "next/image";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useConfirm } from "@/components/admin/confirm-dialog";
import { ListSkeleton, EmptyState, ErrorState } from "@/components/admin/list-states";
import { MicIcon } from "@/components/admin/icons";
import { useStaffMutation, useStaffQuery } from "@/lib/admin/queries";
import { staffListSpeakers, staffDeleteSpeaker, type StaffSpeaker } from "@/lib/api/speakers";

export default function AdminSpeakersPage() {
  const queryClient = useQueryClient();
  const confirm = useConfirm();
  const speakersQuery = useStaffQuery<StaffSpeaker[]>(["speakers"], staffListSpeakers);
  const deleteMutation = useStaffMutation<number, void>((token, id) => staffDeleteSpeaker(token, id));

  async function handleDelete(id: number, name: string) {
    const ok = await confirm({ title: `Delete "${name}"?`, description: "This can't be undone.", confirmLabel: "Delete", tone: "danger" });
    if (!ok) return;
    try {
      await deleteMutation.mutateAsync(id);
      queryClient.setQueryData<StaffSpeaker[]>(["speakers"], (prev) => prev?.filter((s) => s.id !== id));
      toast.success("Speaker deleted.");
    } catch {
      toast.error("Couldn't delete this speaker. Please try again.");
    }
  }

  const speakers = speakersQuery.data;

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

      {speakersQuery.isLoading && <ListSkeleton />}

      {speakersQuery.isError && <ErrorState message="Couldn't load speakers. Please try again." onRetry={() => speakersQuery.refetch()} />}

      {speakers && speakers.length === 0 && (
        <EmptyState
          icon={<MicIcon />}
          title="No speakers yet"
          description="Create the first one to attach them to an event."
          action={
            <Link href="/admin/speakers/new" className="text-[#0066FF] text-sm font-semibold hover:text-[#25429A] transition-colors mt-1">
              + New Speaker
            </Link>
          }
        />
      )}

      {speakers && speakers.length > 0 && (
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
                  disabled={deleteMutation.isPending}
                  className="text-red-600 text-sm font-semibold hover:text-red-800 transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {deleteMutation.isPending && deleteMutation.variables === speaker.id ? "Deleting…" : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
