"use client";

import { useMutation } from "@tanstack/react-query";
import { submitSpeakerApplication, type SpeakerApplicationInput } from "@/lib/api/speakers";

export function useSubmitSpeakerApplication() {
  return useMutation({
    mutationFn: (data: SpeakerApplicationInput) => submitSpeakerApplication(data),
  });
}
