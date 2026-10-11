"use client"

import Link from "next/link"
import { ArrowUpRight, Github } from "lucide-react"
import { motion } from "framer-motion"

interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  demoUrl?: string
  repoUrl?: string
  metric?: string
  metricLabel?: string
  features?: string[]
  number?: string
}

export function ProjectCard({
  title, description, tags, demoUrl, repoUrl, metric, metricLabel, features, number,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      className="panel flex h-full flex-col p-6 pl-7"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="text-[12.5px]" style={{ color: "var(--text-muted)" }}>
          {demoUrl ? "Live" : "Open source"}
        </span>
        {number && (
          <span className="text-xs tabular-nums" style={{ color: "var(--border-dark)" }}>
            {number}
          </span>
        )}
      </div>

      <h3 className="mb-3 font-semibold leading-snug" style={{ fontSize: 19, color: "var(--text)" }}>
        {title}
      </h3>

      <p className="mb-5 text-sm" style={{ lineHeight: 1.65, color: "var(--text-dim)" }}>
        {description}
      </p>

      {metric && (
        <div className="mb-5 text-sm font-medium" style={{ color: "var(--accent)" }}>
          {metric}
          {metricLabel && (
            <span className="ml-2 font-normal" style={{ color: "var(--text-muted)" }}>
              {metricLabel}
            </span>
          )}
        </div>
      )}

      {features && features.length > 0 && (
        <ul className="mb-6 space-y-2">
          {features.map((f) => (
            <li key={f} className="flex gap-2.5 text-[13px] leading-relaxed" style={{ color: "var(--text-dim)" }}>
              <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full" style={{ background: "var(--accent)" }} />
              {f}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-auto">
        <div className="mb-5 text-[12.5px] leading-relaxed" style={{ color: "var(--text-muted)" }}>
          {tags.join(" · ")}
        </div>

        <div className="flex items-center gap-5 pt-4" style={{ borderTop: "1px solid var(--border)" }}>
          {repoUrl && (
            <Link
              href={repoUrl}
              target="_blank"
              className="flex items-center gap-1.5 text-[13px] font-medium"
              style={{ color: "var(--text-dim)" }}
            >
              <Github className="h-4 w-4" />
              View code
            </Link>
          )}
          {demoUrl && (
            <Link
              href={demoUrl}
              target="_blank"
              className="ml-auto flex items-center gap-1.5 text-[13px] font-medium"
              style={{ color: "var(--accent)" }}
            >
              Live site
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  )
}
