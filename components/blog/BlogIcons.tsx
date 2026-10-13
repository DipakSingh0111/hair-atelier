type IconProps = { className?: string };

const base = {
  "aria-hidden": true,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export function CalendarIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} strokeWidth={1.8} className={className}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
  );
}

export function SearchIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} strokeWidth={2.2} className={className}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

export function ChevronRightIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} strokeWidth={2} className={className}>
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

export function LongArrowIcon({ className = "h-4 w-6" }: IconProps) {
  return (
    <svg {...base} strokeWidth={1.8} className={className}>
      <path d="M2 12h19M16 7l5 5-5 5" />
    </svg>
  );
}

export function ArrowIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} strokeWidth={2} className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function CrownIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} strokeWidth={1.8} className={className}>
      <path d="M3 8l4.5 4L12 5l4.5 7L21 8l-2 11H5z" />
      <path d="M5 19h14" />
    </svg>
  );
}

export function DocumentIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} strokeWidth={1.6} className={className}>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M8 7h8M8 11h8M8 15h5" />
    </svg>
  );
}

export function TagIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} strokeWidth={1.8} className={className}>
      <path d="M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9z" />
      <circle cx="7.5" cy="7.5" r="1.5" />
    </svg>
  );
}
