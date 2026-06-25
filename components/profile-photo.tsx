"use client"

import { motion } from "framer-motion"

export function ProfilePhoto() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="relative mx-auto flex items-center justify-center"
      style={{ width: 220, height: 220 }}
    >
      {/* Slow rotating outer dashed ring */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{ border: '1px dashed var(--border)' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      />

      {/* Static inner ring */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{ inset: 10, border: '1px solid var(--border)' }}
      />

      {/* Photo container — NO filter here, must be isolated */}
      <div
        className="absolute rounded-full overflow-hidden"
        style={{
          inset: 18,
          border: '2.5px solid var(--border-hot)',
          boxShadow: '0 0 0 1px var(--border), 0 0 30px var(--green-glow), 0 0 60px var(--green-glow2)',
          /* Isolate from any parent filter */
          isolation: 'isolate',
          transform: 'translateZ(0)',
        }}
      >
        {/* The actual photo — zero CSS filters, pure natural colors */}
        <img
          src="/photo_hammad.jpg"
          alt="Muhammad Hammad"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 8%',
            display: 'block',
            /* Force GPU layer, no filter whatsoever */
            transform: 'translateZ(0)',
            filter: 'none',
            WebkitFilter: 'none',
          }}
        />
      </div>

      {/* Online pulse dot */}
      <motion.div
        className="absolute rounded-full z-20"
        style={{
          width: 14, height: 14,
          bottom: 22, right: 22,
          background: 'var(--green)',
          border: '2px solid var(--bg)',
          boxShadow: '0 0 8px var(--green), 0 0 16px var(--green-glow)',
        }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  )
}
