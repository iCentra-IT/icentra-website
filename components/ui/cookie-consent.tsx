"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { getConsent, setConsent } from "@/lib/consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // One-time check on mount — localStorage only exists client-side, so
    // this can't be read during render. Not a data-fetch-in-a-loop case.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisible(getConsent() === null);
  }, []);

  function choose(value: "accepted" | "rejected") {
    setConsent(value);
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed inset-x-0 bottom-0 z-[200] px-4 pb-4 sm:px-6 sm:pb-6"
          role="dialog"
          aria-label="Cookie consent"
        >
          <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-[#DCE0E8] shadow-lg p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="text-[#374151] text-sm leading-relaxed flex-1">
              We use cookies to run essential site features and, with your consent, to understand site usage. See our{" "}
              <Link href="/legal/privacy" className="text-[#0066FF] font-semibold hover:text-[#25429A] transition-colors">
                Privacy Policy
              </Link>{" "}
              for details.
            </p>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => choose("rejected")}
                className="px-5 py-2.5 rounded-full border border-[#DCE0E8] text-[#374151] text-sm font-semibold hover:border-[#0066FF] hover:text-[#0066FF] transition-colors cursor-pointer"
              >
                Reject
              </button>
              <button
                onClick={() => choose("accepted")}
                className="px-5 py-2.5 rounded-full bg-[#0066FF] text-white text-sm font-semibold hover:bg-[#25429A] transition-colors cursor-pointer"
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
