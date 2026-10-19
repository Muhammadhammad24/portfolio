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

function Mark({ src, label, glow, className, style }: Props & { src: string; label: string; glow: string }) {
  return (
    // The mark keeps the size the call site asks for; the glow is painted
    // behind it by `.mark`, in the brand's own colour, with no edge of its own.
    <span className={`mark ${className ?? ""}`} style={{ "--glow": glow } as React.CSSProperties}>
      <img
        src={src}
        alt=""
        aria-hidden="true"
        data-brand={label}
        // Three tiny files that sit in the hero, the contact card and the
        // footer: deferring them only buys a blank square where a logo goes.
        loading="eager"
        decoding="async"
        className="h-full w-full"
        style={{ ...style, color: undefined, objectFit: "contain" }}
      />
    </span>
  )
}

export const GitHubMark = (p: Props) => <Mark src="/brands/si-github.svg" label="GitHub" glow="247 248 250" {...p} />

export const LinkedInMark = (p: Props) => <Mark src="/brands/si-linkedin.svg" label="LinkedIn" glow="10 102 194" {...p} />

export const GmailMark = (p: Props) => <Mark src="/brands/si-gmail.svg" label="Gmail" glow="234 67 53" {...p} />

/** A telephone has no brand, so this one is drawn in the page's text colour. */
export const PhoneMark = (p: Props) => <Mark src="/brands/phone.svg" label="Phone" glow="247 248 250" {...p} />

/** The location row: Google's own pin, in its own colours. */
export const MapsMark = (p: Props) => <Mark src="/brands/google-maps.svg" label="Google Maps" glow="52 168 83" {...p} />
