export default function GrowthPattern() {
  return (
    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="growth-pattern" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
          {/* Concentric circles suggesting expansion */}
          <circle cx="60" cy="60" r="15" fill="none" stroke="#1a2f4d" strokeWidth="2" opacity="0.35" />
          <circle cx="60" cy="60" r="30" fill="none" stroke="#1a2f4d" strokeWidth="2" opacity="0.28" />
          <circle cx="60" cy="60" r="45" fill="none" stroke="#1a2f4d" strokeWidth="2" opacity="0.20" />
          <circle cx="0" cy="0" r="20" fill="none" stroke="#1a2f4d" strokeWidth="2" opacity="0.25" />
          <circle cx="120" cy="120" r="20" fill="none" stroke="#1a2f4d" strokeWidth="2" opacity="0.25" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#growth-pattern)" />
    </svg>
  );
}
