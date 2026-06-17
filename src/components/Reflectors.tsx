/**
 * Page-wide stage reflectors: two big light halos anchored at the bottom of
 * the viewport, sweeping horizontally across the whole background. Fixed +
 * `mix-blend-screen` so they only add light over dark sections and quietly
 * do nothing over the light (paper) section. Pointer-none, GPU-only.
 */
export function Reflectors() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden mix-blend-screen"
    >
      <div className="reflector reflector-a" />
      <div className="reflector reflector-b" />
    </div>
  )
}
