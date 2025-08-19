"use client";

import Script from "next/script";
import { useEffect } from "react";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // You can initialize things like jQuery plugins here
    if (typeof window !== "undefined") {
      // init plugins
    }
  }, []);
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css';
    link.href = "https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
    link.integrity = 'sha384-...'; // Add integrity hash if required
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <>
      {children}

      {/* Place scripts here */}
      <Script src="assets/js/popper.min.js" strategy="lazyOnload" />
        <Script src="assets/js/bootstrap.min.js" strategy="lazyOnload" />
        <Script src="assets/js/owl.carousel.min.js" strategy="lazyOnload" />
        <Script src="assets/js/metismenu.min.js" strategy="lazyOnload" />
        <Script src="assets/js/jquery.slimscroll.min.js" strategy="lazyOnload" />
        <Script src="assets/js/jquery.slicknav.min.js" strategy="lazyOnload" />
        <Script src="assets/js/jquery.datatables.js" strategy="lazyOnload" />
        <Script src="assets/js/datatables.bootstrap4.js" strategy="lazyOnload" />
        <Script src="assets/js/plugins.js" strategy="lazyOnload" />
        <Script src="assets/js/scripts.js" strategy="lazyOnload" />
    </>
  );
}
