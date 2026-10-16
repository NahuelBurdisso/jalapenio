/**
 * The brand claim as the hero's typographic protagonist.
 * Purely presentational (no JS): the mask-reveal is CSS-driven via the
 * `.claim-line` rule + the IntersectionObserver in RevealScript, so this
 * renders as static HTML with zero client JS and paints at FCP.
 */
export function KineticClaim() {
  const lines = [
    <>
      si no <span className="text-ember">arde</span>,
    </>,
    <>
      no <span className="text-paper">impacta</span>
    </>,
  ]

  return (
    <p className="display text-paper text-[clamp(2.25rem,7vw,5rem)] leading-[0.86]">
      {lines.map((line, i) => (
        <span key={i} className="block overflow-clip pb-[0.06em]">
          <span
            className="claim-line block"
            style={{ animationDelay: `${0.1 + i * 0.12}s` }}
          >
            {line}
          </span>
        </span>
      ))}
    </p>
  )
}
