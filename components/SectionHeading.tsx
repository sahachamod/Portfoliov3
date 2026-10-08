"use client";

import { motion } from "framer-motion";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
};

export function SectionHeading({ eyebrow, title, subtitle, align = "left" }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}
    >
      {eyebrow ? <p className="technical-label">{eyebrow}</p> : null}
      <h2 className="mt-3 text-3xl font-semibold tracking-normal text-white sm:text-5xl">{title}</h2>
      {subtitle ? <p className="mt-4 text-base leading-7 text-slate-300 sm:text-lg">{subtitle}</p> : null}
    </motion.div>
  );
}
