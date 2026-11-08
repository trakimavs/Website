interface MonogramProps {
  size?: number
  className?: string
}

export default function Monogram({ size = 36, className = '' }: MonogramProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="130 35 540 530"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Left tavli-point */}
      <polyline
        points="160,530 310,80 460,530"
        stroke="currentColor"
        strokeWidth="22"
        strokeLinejoin="miter"
        strokeMiterlimit="10"
        strokeLinecap="butt"
        fill="none"
      />
      {/* Right tavli-point */}
      <polyline
        points="340,530 490,80 640,530"
        stroke="currentColor"
        strokeWidth="22"
        strokeLinejoin="miter"
        strokeMiterlimit="10"
        strokeLinecap="butt"
        fill="none"
      />
      {/* Base of inner Δ */}
      <line
        x1="340" y1="530" x2="460" y2="530"
        stroke="currentColor"
        strokeWidth="22"
        strokeLinecap="butt"
      />
    </svg>
  )
}
