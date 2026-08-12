"use client";

import { motion } from "framer-motion";

export default function AnimatedSolutionsHero() {
  return (
    <>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-white text-[36px] sm:text-[46px] lg:text-[58px] font-extrabold leading-[1.08] max-w-230 mb-5"
      >
        Empower Organizational<br />
        Excellence: iCentra Solutions
      </motion.h1>

      {/* Cyan underline accent */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
        style={{ transformOrigin: "left" }}
        className="w-27.5 h-1 rounded-full bg-light-blue mb-7"
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.25 }}
        className="max-w-215 flex flex-col gap-4"
      >
        <p className="text-white/75 text-base lg:text-base leading-[1.8]">
          iCentra offers a holistic suite of transformative services designed to propel
          organizations toward sustainable success we provide integrated solutions that
          address the complex challenges of modern businesses.
        </p>
        <p className="text-white/75 text-base leading-[1.8]">
          We are strategic partners who leverage deep expertise, cutting-edge technologies,
          and tailored methodologies to unlock your organization&apos;s full possibilities.
          Whether you&apos;re seeking digital innovation, robust cybersecurity, strategic
          alignment, or skill development, iCentra delivers comprehensive solutions that
          drive performance, mitigate risks, and create lasting value.
        </p>
        <p className="text-white/75 text-base leading-[1.8]">
          From reimagining business processes to implementing advanced technologies, from
          managing organizational change to building resilient security frameworks, we
          transform challenges into opportunities.
        </p>
      </motion.div>
    </>
  );
}
