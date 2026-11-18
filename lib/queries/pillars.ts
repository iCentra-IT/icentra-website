"use client";

import { useQuery } from "@tanstack/react-query";
import { listPillars, type PillarItem } from "@/lib/api/pillars";

export function usePillars() {
  return useQuery<PillarItem[]>({
    queryKey: ["pillars"],
    queryFn: listPillars,
  });
}
