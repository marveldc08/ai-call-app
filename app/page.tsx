"use client";

import { motion } from "framer-motion";
import { Sparkles, Mic, Bot } from "lucide-react";
import styles from "./Landing.module.css";
import { useRouter } from "next/navigation";


export default function Home() {
  const router = useRouter();
  const handleLoginClick = () => {
    router.push("/login");
  };
  return (
    <div className={styles.container}>
      {/* Navbar */}
      <header className={styles.navbar}>
        <h1 className={styles.logo}>
          Skyt<span className={styles.logoAccent}>Call Agent</span>
        </h1>
        <nav className={styles.navLinks}>
          {/* <a href="#features">Features</a> */}
          {/* <a href="#pricing">Pricing</a> */}
          {/* <a href="#contact">Contact</a> */}
        </nav>
        <button className={styles.primaryBtn} onClick={() => router.push("/signup")}>Get Started</button>
      </header>

      {/* Hero Section */}
      <main className={styles.hero}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={styles.heroTitle}
        >
          Smarter Calls with{" "}
          <span className={styles.highlight}>Skyt Call Agent</span>
        </motion.h2>
        <p className={styles.heroSubtitle}>
          Automate handling your calls, sort contacts, and highlight
          action items so you never miss a detail.
        </p>
        <div className={styles.heroButtons}>
          <button className={styles.primaryBtn} onClick={handleLoginClick}>Log In</button>
          <button className={styles.secondaryBtn}>Learn More</button>
        </div>

        {/* Floating Mockup */}
        {/* <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className={styles.mockup}
          >
          <Image src="/assets/images/bg/ai-bg.jpg" alt="App Preview" width={400} height={300} />
        </motion.div> */}
      </main>

      {/* Features Section */}
      {/* <section id="features" className={styles.features}>
        <h3 className={styles.sectionTitle}>Why Choose CallMateAI?</h3>
        <div className={styles.featureGrid}>
          {[
            {
              icon: <Mic size={28} color="#6366f1" />,
              title: "Live Call Notes",
              desc: "Real-time transcription and note-taking during calls.",
            },
            {
              icon: <Sparkles size={28} color="#6366f1" />,
              title: "AI Summaries",
              desc: "Get instant summaries and action items after every call.",
            },
            {
              icon: <Bot size={28} color="#6366f1" />,
              title: "Smart Call Agentance",
              desc: "Ask the AI to clarify details or schedule follow-ups.",
            },
          ].map((f, i) => (
            <div key={i} className={styles.featureCard}>
              <div className={styles.featureIcon}>{f.icon}</div>
              <h4>{f.title}</h4>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section> */}

      {/* Footer */}
      <footer className={styles.footer}>
        © {new Date().getFullYear()} Skyt Technologies. All rights reserved.
      </footer>
    </div>
  );
}
