import React from "react";

interface TeacherIconProps extends React.SVGProps<SVGSVGElement> {}

export function TeacherIcon(
  props: TeacherIconProps,
): React.ReactElement<TeacherIconProps> {
  return (
    <svg
      {...props}
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M311.6 592.8c-80.4 0-145.7-65.4-145.7-145.7s65.4-145.7 145.7-145.7S457.3 366.7 457.3 447s-65.4 145.8-145.7 145.8z m0-243.6c-53.9 0-97.8 43.9-97.8 97.8s43.9 97.8 97.8 97.8 97.8-43.9 97.8-97.8-43.9-97.8-97.8-97.8zM556.5 902.6h-47.9V758.3c0-56.4-45.9-102.3-102.3-102.3H216.8c-56.4 0-102.3 45.9-102.3 102.3v144.3H66.6V758.3C66.6 675.4 134 608 216.8 608h189.4c82.8 0 150.2 67.4 150.2 150.2v144.4z"
        fill="#333333"
      />
      <path
        d="M957.4 798.7H657.8v-47.9h251.7V159.5H272.4v107.9h-47.9V111.6h732.9z"
        fill="#333333"
      />
      <path
        d="M510.715 892.736l184.668-411.903 43.709 19.596-184.668 411.903z"
        fill="#333333"
      />
    </svg>
  );
}
