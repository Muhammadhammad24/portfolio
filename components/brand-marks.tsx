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

type Props = {
  className?: string
  /** Call sites that used an icon font pass a colour here; a mark ignores it
      but keeps anything else, such as a size. */
  style?: React.CSSProperties
}

function Mark({ src, label, className, style }: Props & { src: string; label: string }) {
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
      style={{ ...style, color: undefined, objectFit: "contain" }}
    />
  )
}

export const GitHubMark = (p: Props) => <Mark src="/brands/si-github.svg" label="GitHub" {...p} />

export const LinkedInMark = (p: Props) => <Mark src="/brands/si-linkedin.svg" label="LinkedIn" {...p} />

export const GmailMark = (p: Props) => <Mark src="/brands/si-gmail.svg" label="Gmail" {...p} />

/** A telephone has no brand, so this one is drawn in the page's own greys. */
export const PhoneMark = (p: Props) => <Mark src="/brands/call.svg" label="Phone" {...p} />
