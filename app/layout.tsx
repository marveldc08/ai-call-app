import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import "../public/assets/css/styles.css";
import "../public/assets/css/bootstrap.min.css";
// import "../public/assets/css/font-awesome.min.css";
import "../public/assets/css/themify-icons.css";
import "../public/assets/css/metisMenu.css" ;
import "../public/assets/css/slicknav.min.css" ;
import "../public/assets/css/sb-admin-2.css" ;
import "../public/assets/css/dataTables.bootstrap4.css" ;
import "../public/assets/css/typography.css" ;
import "../public/assets/css/default-css.css";
import "../public/assets/css/responsive.css" ;
// import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'




import ClientWrapper from "../components/ClientWrapper";
import ClientHead from "../components/ClientHead";
import Loader from "../components/Loader";
import Header from "../components/Header";
import Footer from "../components/Footer";

// app/layout.tsx or app/layout.jsx

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";








const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Oriental Dashboard Login",
  description: "Login to access the Oriental dashboard",
  
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {


  return (
    <html lang="en" className="no-js">
      <ClientHead />

      <body className={inter.className}>
        {/* loader */}
        <Loader />
        <ToastContainer position="top-right" autoClose={3000} />

        {/* Page Content */}
        <ClientWrapper>
          <div>
            {/* <Header pageName="Login" moduleName="Dashboard" /> */}
            {children}
           <Footer/>
          </div>
        </ClientWrapper>


        {/* Scripts using next/script for optimization */}
        <Script
          src="assets/js/vendor/jquery-2.2.4.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://code.jquery.com/jquery-3.6.0.min.js"
          strategy="beforeInteractive"
        />
        {/* <Script
          src="/scripts.js" // your loader script
          strategy="afterInteractive"
        /> */}
      </body>
    </html>
  );
}
