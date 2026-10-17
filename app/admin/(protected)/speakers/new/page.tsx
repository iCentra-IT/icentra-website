"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import SpeakerForm from "@/components/admin/speaker-form";
import { useStaffMutation } from "@/lib/admin/queries";
import { staffCreateSpeaker, type SpeakerInput, type StaffSpeaker } from "@/lib/api/speakers";

export default function NewSpeakerPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const createMutation = useStaffMutation<{ data: SpeakerInput; photo: File | null }, StaffSpeaker>((token, { data, photo }) =>
    staffCreateSpeaker(token, data, photo)
  );

  async function handleSubmit(data: SpeakerInput, photo: File | null) {
    const speaker = await createMutation.mutateAsync({ data, photo });
    queryClient.invalidateQueries({ queryKey: ["speakers"] });
    toast.success("Speaker created.");
    router.push(`/admin/speakers/${speaker.id}/edit`);
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Link href="/admin/speakers" className="inline-flex items-center gap-1.5 text-[#6B7280] text-sm hover:text-[#1A274F] transition-colors mb-4">
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        All speakers
      </Link>
      <h1 className="text-[#1A274F] text-xl lg:text-2xl font-bold mb-6">New Speaker</h1>
      <SpeakerForm submitLabel="Create Speaker" onSubmit={handleSubmit} />
    </div>
  );
}
