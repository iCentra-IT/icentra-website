"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ComingSoonProps {
  title: string;
  description?: string;
}

/**
 * ComingSoon
 * Full-screen placeholder for routes that are linked (navbar/footer) but not built yet.
 * "Go Back" returns to whatever page the visitor actually came from.
 */
export default function ComingSoon({ title, description }: ComingSoonProps) {
  const router = useRouter();
  const message =
    title +
    " is on its way. Our team is still putting the finishing touches on this page" +
    (description ? " — " + description : ". Please check back soon.");

  return (
    <main
      className="relative min-h-[calc(100vh-4.25rem)] w-full overflow-hidden bg-no-repeat bg-cover flex items-center justify-center"
      style={{ backgroundImage: "url('/images/bg.jpg')" }}
    >
      <div className="relative z-10 max-w-2xl mx-auto px-6 py-20 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-20 h-20 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mb-8"
        >
          <svg
            className="w-9 h-9 text-light-blue"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.75}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l2.5 2.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="text-white font-extrabold leading-tight text-3xl sm:text-4xl lg:text-5xl"
        >
          Coming Soon
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.25 }}
          className="mt-4 mb-6 w-20 h-1 rounded-full bg-light-blue"
        />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          className="text-white/75 text-[15px] lg:text-[16px] leading-[1.8] max-w-xl"
        >
          {message}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          className="mt-9 flex flex-col sm:flex-row items-center gap-4"
        >
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#0066FF] text-white text-[14px] font-semibold hover:bg-light-blue hover:text-[#1A274F] transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Go Back
          </button>
          <Link
            href="/"
            className="inline-flex items-center px-7 py-3.5 rounded-full border border-white/40 text-white text-[14px] font-semibold hover:bg-white hover:text-[#1A274F] transition-colors"
          >
            Back to Home
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
