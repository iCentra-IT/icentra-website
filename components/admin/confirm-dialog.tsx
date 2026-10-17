"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface ConfirmOptions {
  title: string;
  description?: string;
  confirmLabel?: string;
  tone?: "danger" | "default";
}

type ConfirmFn = (options: ConfirmOptions) => Promise<boolean>;

const ConfirmContext = createContext<ConfirmFn | null>(null);

export function ConfirmProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<{ options: ConfirmOptions; resolve: (value: boolean) => void } | null>(null);

  const confirm = useCallback<ConfirmFn>(
    (options) => new Promise((resolve) => setState({ options, resolve })),
    []
  );

  function settle(result: boolean) {
    state?.resolve(result);
    setState(null);
  }

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      <AnimatePresence>
        {state && (
          <div className="fixed inset-0 z-[400] flex items-center justify-center p-4" role="alertdialog" aria-modal="true">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => settle(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative z-10 w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl"
            >
              <h3 className="text-[#1A274F] text-lg font-bold mb-2">{state.options.title}</h3>
              {state.options.description && (
                <p className="text-[#6B7280] text-sm leading-relaxed mb-6">{state.options.description}</p>
              )}
              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => settle(false)}
                  className="px-5 py-2.5 rounded-full border border-[#DCE0E8] text-[#374151] text-sm font-semibold hover:border-[#0066FF] hover:text-[#0066FF] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => settle(true)}
                  className={`px-5 py-2.5 rounded-full text-white text-sm font-semibold transition-colors cursor-pointer ${
                    state.options.tone === "danger" ? "bg-red-600 hover:bg-red-700" : "bg-[#0066FF] hover:bg-[#25429A]"
                  }`}
                >
                  {state.options.confirmLabel ?? "Confirm"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </ConfirmContext.Provider>
  );
}

export function useConfirm(): ConfirmFn {
  const ctx = useContext(ConfirmContext);
  if (!ctx) throw new Error("useConfirm must be used within ConfirmProvider");
  return ctx;
}
