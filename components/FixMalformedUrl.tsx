"use client";

import { useEffect } from "react";

export default function FixMalformedUrl() {
  useEffect(() => {
    const href = window.location.href;

    if (href.includes("%255C") || href.includes("extras%3D")) {
      const decoded = decodeURIComponent(href);

      // Fix encoded `\` or `extras%3D`
      const normalized = decoded
        .replace(/\\/, "/") // fix path separator if needed
        .replace("extras=", "?extras="); // correct query if malformed

      // Prevent redirect loops
      if (normalized !== href) {
        window.location.href = normalized;
      }
    }
  }, []);

  return null;
}
