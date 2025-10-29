export default function ProfitabilityPattern() {
  return (
    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="profitability-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          {/* Upward pointing triangles at various opacities */}
          <polygon points="50,10 70,50 30,50" fill="#2D7A4F" opacity="0.15" />
          <polygon points="10,60 30,100 -10,100" fill="#2D7A4F" opacity="0.1" />
          <polygon points="90,60 110,100 70,100" fill="#2D7A4F" opacity="0.12" />
          <polygon points="50,80 65,110 35,110" fill="#2D7A4F" opacity="0.08" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#profitability-pattern)" />
    </svg>
  );
}
