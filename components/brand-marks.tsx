/**
 * The three marks that belong to somebody else.
 *
 * GitHub, LinkedIn and Gmail all publish a logo, and a drawn-by-hand
 * approximation of one is the kind of detail a reader notices without being
 * able to say why. These are the official marks, served from `public/brands`
 * beside the toolbox logos, in each brand's own colour — GitHub's in its light
 * form, because its black mark would disappear on this page.
 *
 * They take the same `className` the icon set they replaced did, so a call
 * site keeps saying `h-4 w-4` and nothing else moves.
 */

type Props = { className?: string }

function Mark({ src, label, className }: Props & { src: string; label: string }) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      data-brand={label}
      // Three tiny files that sit in the hero, the contact card and the
      // footer: deferring them only buys a blank square where a logo goes.
      loading="eager"
      decoding="async"
      className={className}
      style={{ objectFit: "contain" }}
    />
  )
}

export const GitHubMark = ({ className }: Props) => (
  <Mark src="/brands/si-github.svg" label="GitHub" className={className} />
)

export const LinkedInMark = ({ className }: Props) => (
  <Mark src="/brands/si-linkedin.svg" label="LinkedIn" className={className} />
)

export const GmailMark = ({ className }: Props) => (
  <Mark src="/brands/si-gmail.svg" label="Gmail" className={className} />
)
