export default function EfficiencyPattern() {
  return (
    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="efficiency-pattern" x="0" y="0" width="100" height="87" patternUnits="userSpaceOnUse">
          {/* Hexagonal grid suggesting systematic efficiency */}
          <path d="M50,0 L93.3,25 L93.3,62 L50,87 L6.7,62 L6.7,25 Z" 
                fill="none" stroke="#c25a35" strokeWidth="2" opacity="0.35" />
          <path d="M0,43.5 L43.3,68.5 L43.3,105.5 L0,130.5" 
                fill="none" stroke="#c25a35" strokeWidth="2" opacity="0.25" />
          <path d="M100,43.5 L56.7,68.5 L56.7,105.5 L100,130.5" 
                fill="none" stroke="#c25a35" strokeWidth="2" opacity="0.30" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#efficiency-pattern)" />
    </svg>
  );
}
