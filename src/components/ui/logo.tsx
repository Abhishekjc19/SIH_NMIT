import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 160 30"
      width="128"
      height="24"
      aria-label="ShikshaLite"
      {...props}
    >
      <g fill="hsl(var(--primary))">
        <text
          x="0"
          y="22"
          fontFamily="'PT Sans', sans-serif"
          fontSize="24"
          fontWeight="bold"
        >
          Shiksha
          <tspan fill="hsl(var(--accent))">Lite</tspan>
        </text>
      </g>
    </svg>
  );
}
