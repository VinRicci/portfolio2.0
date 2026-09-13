export default function ProjectPlaceholder({
  accent,
  index,
  label,
  showLabel = true,
  className = "",
}: {
  accent: [string, string];
  index: number;
  label: string;
  showLabel?: boolean;
  className?: string;
}) {
  const gradientId = `pp-grad-${accent[0].slice(1)}-${index}`;
  const seed = index * 37;

  return (
    <svg
      viewBox="0 0 800 500"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role="img"
      aria-label={label}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={accent[0]} />
          <stop offset="100%" stopColor={accent[1]} />
        </linearGradient>
      </defs>

      <rect width="800" height="500" fill={`url(#${gradientId})`} />

      {/* faint decorative shapes */}
      <circle
        cx={120 + seed}
        cy={380}
        r="160"
        fill="white"
        opacity="0.08"
      />
      <circle cx={680 - seed} cy={90} r="110" fill="black" opacity="0.12" />

      {/* mock browser chrome */}
      <rect x="40" y="40" width="720" height="420" rx="14" fill="black" opacity="0.18" />
      <rect x="40" y="40" width="720" height="44" rx="14" fill="black" opacity="0.22" />
      <circle cx="66" cy="62" r="6" fill="white" opacity="0.6" />
      <circle cx="86" cy="62" r="6" fill="white" opacity="0.45" />
      <circle cx="106" cy="62" r="6" fill="white" opacity="0.3" />

      {/* mock content blocks */}
      <rect x="66" y="112" width="220" height="18" rx="4" fill="white" opacity="0.5" />
      <rect x="66" y="144" width="150" height="12" rx="4" fill="white" opacity="0.3" />
      <rect x="66" y="190" width="668" height="1" fill="white" opacity="0.2" />
      <rect x="66" y="216" width="210" height="120" rx="8" fill="white" opacity="0.15" />
      <rect x="295" y="216" width="210" height="120" rx="8" fill="white" opacity="0.22" />
      <rect x="524" y="216" width="164" height="120" rx="8" fill="white" opacity="0.15" />

      {showLabel && (
        <>
          <text
            x="66"
            y="410"
            fontFamily="ui-monospace, monospace"
            fontSize="14"
            letterSpacing="0.08em"
            fill="white"
            opacity="0.75"
          >
            {label.toUpperCase()}
          </text>
          <text
            x="734"
            y="410"
            textAnchor="end"
            fontFamily="ui-monospace, monospace"
            fontSize="14"
            fill="white"
            opacity="0.5"
          >
            {String(index + 1).padStart(2, "0")}
          </text>
        </>
      )}
    </svg>
  );
}
