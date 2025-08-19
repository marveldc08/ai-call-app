// app/ClientHead.tsx
"use client";

import { useEffect } from "react";

export default function ClientHead() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://www.amcharts.com/lib/3/plugins/export/export.css";
    link.type = "text/css";
    link.crossOrigin = "anonymous";
    document.head.appendChild(link);

    // Cleanup on unmount (optional)
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return null;
}
