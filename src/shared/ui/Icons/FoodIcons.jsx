export function BurgerIcon({ size = 22, color = "#ffffff" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12H3c0-5 4-8 9-8s9 3 9 8z"/>
      <line x1="3" y1="14" x2="21" y2="14"/>
      <path d="M4 16h16v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2z"/>
    </svg>
  );
}

export function PizzaIcon({ size = 22, color = "#ffffff" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L3 20h18L12 2z"/>
      <circle cx="10" cy="13" r="1" fill={color} stroke="none"/>
      <circle cx="14" cy="15" r="1" fill={color} stroke="none"/>
      <circle cx="11" cy="17" r="1" fill={color} stroke="none"/>
    </svg>
  );
}

export function SandwichIcon({ size = 22, color = "#ffffff" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 14l9-10 9 10H3z"/>
      <line x1="3" y1="16.5" x2="21" y2="16.5"/>
      <path d="M4 18.5h16v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-1z"/>
    </svg>
  );
}

export function FriesIcon({ size = 22, color = "#ffffff" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 12h12l-1.5 9h-9L6 12z"/>
      <line x1="8" y1="12" x2="7" y2="4"/>
      <line x1="11" y1="12" x2="10.5" y2="3"/>
      <line x1="13.5" y1="12" x2="14" y2="4"/>
      <line x1="17" y1="12" x2="17.5" y2="5"/>
    </svg>
  );
}

export function SauceIcon({ size = 16, color = "#ffffff" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 3h4v4h3l-5 14-5-14h3V3z"/>
    </svg>
  );
}

export function MeatIcon({ size = 16, color = "#ffffff" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="12" rx="9" ry="6"/>
      <ellipse cx="12" cy="12" rx="5" ry="3"/>
    </svg>
  );
}

export function CheeseIcon({ size = 16, color = "#ffffff" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 20L12 4l10 16H2z"/>
      <circle cx="8" cy="16" r="1.5" fill={color} stroke="none"/>
      <circle cx="14" cy="14" r="1" fill={color} stroke="none"/>
    </svg>
  );
}

export function MushroomIcon({ size = 16, color = "#ffffff" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 4a8 8 0 0 0-8 8h16a8 8 0 0 0-8-8z" />
      <path d="M10 12v7a2 2 0 0 0 4 0v-7" />
      <line x1="8" y1="12" x2="8" y2="14" />
      <line x1="16" y1="12" x2="16" y2="14" />
    </svg>
  );
}

export function BreadIcon({ size = 16, color = "#ffffff" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 21h10a2 2 0 0 0 2-2v-5a5 5 0 0 0-2.8-4.5A4 4 0 0 0 12 3a4 4 0 0 0-4.2 6.5A5 5 0 0 0 5 14v5a2 2 0 0 0 2 2z" />
      <circle cx="9" cy="12" r="0.5" fill={color} />
      <circle cx="15" cy="12" r="0.5" fill={color} />
      <circle cx="12" cy="15" r="0.5" fill={color} />
    </svg>
  );
}

export function SaladIcon({ size = 16, color = "#ffffff" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 11a9 9 0 0 0 18 0H3z" />
      <path d="M6 11c0-2 2-3 4-3s2 1 2 2" />
      <path d="M12 11c0-3 3-4 5-2" />
      <path d="M8 8c0-1.5 1-2.5 2.5-2.5" />
      <circle cx="14" cy="9" r="1.5" />
    </svg>
  );
}

export function BaconIcon({ size = 16, color = "#ffffff" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 14c2.5-2 3.5-2 6 0s3.5 2 6 0 3.5-2 6 0" />
      <path d="M3 10c2.5-2 3.5-2 6 0s3.5 2 6 0 3.5-2 6 0" />
    </svg>
  );
}

export function WrapIcon({ size = 22, color = "#ffffff" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 4c0 0 2 1 7 1s7-1 7-1v4c0 7-3.5 13-7 13S5 15 5 8V4z"/>
      <path d="M9 9c0 0 1.5 1 3 1s3-1 3-1"/>
      <path d="M10 13c0 0 1 .5 2 .5s2-.5 2-.5"/>
    </svg>
  );
}

export function GrillIcon({ size = 22, color = "#ffffff" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 2l-2 6"/>
      <path d="M12 6a4 4 0 0 0-4 4v1h12v-1a4 4 0 0 0-4-4h-4z"/>
      <path d="M8 11v2c0 3 1.5 5 4 5s4-2 4-5v-2"/>
      <line x1="10" y1="18" x2="8" y2="22"/>
      <line x1="14" y1="18" x2="16" y2="22"/>
    </svg>
  );
}

export function ComboIcon({ size = 22, color = "#ffffff" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M8 9l2 2-2 2"/>
      <line x1="12" y1="9" x2="12" y2="15"/>
      <path d="M16 9l-2 2 2 2"/>
    </svg>
  );
}
