"use client";

import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  // Do not show footer on the home page ("/")
  if (pathname === "/") return null;

  return (
    <footer>
      <div className="footer-area">
        <p>
          © Copyright {new Date().getFullYear()}. All right reserved. Skyt Technologies {" "}
        </p>
      </div>
    </footer>
  );
}
