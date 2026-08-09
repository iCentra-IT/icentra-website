// import Link from "next/link";
// import Image from "next/image";

// interface DiscoverBannerProps {
//   headline: string;
//   subtext: string;
//   primaryCta: { label: string; href: string };
//   secondaryCta?: { label: string; href: string };
//   image: string;
//   imageAlt: string;
// }

// export default function DiscoverBanner({
//   headline,
//   subtext,
//   primaryCta,
//   secondaryCta,
//   image,
//   imageAlt,
// }: DiscoverBannerProps) {
//   return (
//     <section className="w-full grid grid-cols-1 lg:grid-cols-2 overflow-hidden" style={{ minHeight: "320px" }}>

//       {/* ── LEFT — blue panel with hex pattern ── */}
//       <div
//         className="relative flex-1 flex items-center px-10 py-14 lg:px-16 lg:py-20"
//         bg-no-repeat bg-cover style={{
//       backgroundImage: "url('/images/bg.jpg')"
//     }}
//       >
        
//         {/* Content */}
//         <div className="relative z-10 max-w-130 m-auto">
//           {/* Headline */}
//           <h2 className="text-white text-[30px] md:text-[38px] lg:text-[44px] font-bold leading-[1.1] mb-4">
//             {headline.split("\n").map((line, i) => (
//               <span key={i} className="block">{line}</span>
//             ))}
//           </h2>

//           {/* Subtext */}
//           <p className="text-white/70 text-[14px] lg:text-[15px] leading-relaxed mb-8 max-w-100">
//             {subtext}
//           </p>

//           {/* CTAs */}
//           <div className="flex flex-wrap gap-3">
//             <Link
//               href={primaryCta.href}
//               className="inline-flex items-center px-6 py-3 rounded-full bg-[#0066FF] text-white text-[14px] font-semibold transition-colors"
//             >
//               {primaryCta.label}
//             </Link>
//             {secondaryCta && (
//               <Link
//                 href={secondaryCta.href}
//                 className="inline-flex items-center px-6 py-3 rounded-full bg-[#0066FF] text-white text-[14px] font-semibold transition-colors"
//               >
//                 {secondaryCta.label}
//               </Link>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* ── RIGHT — full bleed photo ── */}
//       <div className="relative w-full min-h-70 lg:min-h-0">
//         <Image
//           src={image}
//           alt={imageAlt}
//           fill
//           className="object-cover object-center"
//           sizes="(max-width: 1024px) 100vw, 50vw"
//           priority
//         />
//       </div>

//     </section>
//   );
// }

import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";

interface DiscoverBannerProps {
  headline: string;
  subtext: string;
  /**
   * primaryCta accepts either:
   * - { label, href }  → renders a plain <Link> button
   * - { label, modal } → renders a modal trigger (pass the modal component as JSX)
   *
   * Examples:
   *   primaryCta={{ label: "Contact Us", href: "/contact" }}
   *   primaryCta={{ label: "Start Transformation", modal: <HomepageFormModal triggerLabel="Start Transformation" /> }}
   */
  primaryCta: { label: string; href?: string; modal?: ReactNode };
  secondaryCta?: { label: string; href?: string; modal?: ReactNode } | null;
  image: string;
  imageAlt: string;
}

/* ─── tiny helper — renders a link OR a modal trigger ─── */
function CtaButton({
  cta,
}: {
  cta: { label: string; href?: string; modal?: ReactNode };
}) {
  /* If a modal node is provided, render it directly.
     The modal component already contains its own styled trigger button. */
  if (cta.modal) {
    return <>{cta.modal}</>;
  }

  /* Otherwise fall back to a plain Link */
  return (
    <Link
      href={cta.href ?? "#"}
      className="inline-flex items-center px-6 py-3 rounded-full bg-[#0066FF] text-white text-[14px] font-semibold hover:bg-[#00DBFF] hover:text-[#1A274F] transition-colors"
    >
      {cta.label}
    </Link>
  );
}

export default function DiscoverBanner({
  headline,
  subtext,
  primaryCta,
  secondaryCta,
  image,
  imageAlt,
}: DiscoverBannerProps) {
  return (
    <section
      className="w-full grid grid-cols-1 lg:grid-cols-2 overflow-hidden"
      style={{ minHeight: "320px" }}
    >
      {/* ── LEFT — blue panel with bg image ── */}
      <div
        className="relative flex items-center px-10 py-14 lg:px-16 lg:py-20 bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: "url('/images/bg.jpg')" }}
      >
        <div className="relative z-10 max-w-[520px] mx-auto">
          {/* Headline */}
          <h2 className="text-white text-[30px] md:text-[38px] lg:text-[44px] font-bold leading-[1.1] mb-4">
            {headline.split("\n").map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h2>

          {/* Subtext */}
          <p className="text-white/70 text-[14px] lg:text-[15px] leading-relaxed mb-8 max-w-[400px]">
            {subtext}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <CtaButton cta={primaryCta} />
            {secondaryCta && <CtaButton cta={secondaryCta} />}
          </div>
        </div>
      </div>

      {/* ── RIGHT — full bleed photo ── */}
      <div className="relative w-full min-h-[280px] lg:min-h-0">
        <Image
          src={image}
          alt={imageAlt}
          fill
          className="object-cover object-center"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
      </div>
    </section>
  );
}