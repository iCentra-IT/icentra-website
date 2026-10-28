"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { getConsent } from "@/lib/consent";

/**
 * Google Tag Manager loader.
 *
 * Safe no-op until NEXT_PUBLIC_GTM_ID is set — renders nothing, loads
 * nothing. Once an ID is configured, the container only loads after the
 * visitor has accepted cookies (GTM itself is responsible for whether GA4,
 * ads tags, etc. actually fire — that's configured inside the GTM container,
 * not here).
 */
export default function GoogleTagManager() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    if (!gtmId) return;

    function sync() {
      setConsented(getConsent() === "accepted");
    }

    sync();
    window.addEventListener("icentra-consent-change", sync);
    return () => window.removeEventListener("icentra-consent-change", sync);
  }, [gtmId]);

  if (!gtmId || !consented) return null;

  return (
    <>
      <Script id="gtm-init" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`}
      </Script>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
          title="Google Tag Manager"
        />
      </noscript>
    </>
  );
}
