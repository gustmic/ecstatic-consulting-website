export default function GrowthPattern() {
  return (
    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="growth-pattern" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
          {/* Concentric circles suggesting expansion */}
          <circle cx="60" cy="60" r="15" fill="none" stroke="#2B4C7E" strokeWidth="1" opacity="0.15" />
          <circle cx="60" cy="60" r="30" fill="none" stroke="#2B4C7E" strokeWidth="1" opacity="0.12" />
          <circle cx="60" cy="60" r="45" fill="none" stroke="#2B4C7E" strokeWidth="1" opacity="0.08" />
          <circle cx="0" cy="0" r="20" fill="none" stroke="#2B4C7E" strokeWidth="1" opacity="0.1" />
          <circle cx="120" cy="120" r="20" fill="none" stroke="#2B4C7E" strokeWidth="1" opacity="0.1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#growth-pattern)" />
    </svg>
  );
}
