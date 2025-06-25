import React from "react";

type PieceProps = {
  className?: string;
};

const SvgWithFilter = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 45 45"
    className={className}
  >
    <defs>
      <filter id="emboss" x="-0.2" y="-0.2" width="1.4" height="1.4">
        <feDropShadow dx="0.5" dy="0.5" stdDeviation="0.5" floodColor="#000" floodOpacity="0.4" />
        <feDropShadow dx="-0.5" dy="-0.5" stdDeviation="0.5" floodColor="#fff" floodOpacity="0.4" />
      </filter>
    </defs>
    <g style={{ filter: 'url(#emboss)' }}>
      {children}
    </g>
  </svg>
);

export const WhiteKing = ({ className }: PieceProps) => (
  <SvgWithFilter className={className}>
    <g fill="#FFF" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.5 11.63V6M20 8h5" />
      <path d="M22.5 25s4.5-7.5 3-10.5c0 0-1.5-1-3 .5-1.5-1.5-3-.5-3-.5-1.5 3 3 10.5 3 10.5" strokeLinecap="butt" />
      <path d="M12.5 37c5.5-8 14.5-8 20 0" strokeLinecap="butt" />
      <path d="M12.5 37c5.5-8 14.5-8 20 0" strokeLinecap="butt" transform="matrix(1 0 0 -1 0 62)" />
      <path d="M12.5 37v-4.5h20V37zM12.5 25h20" strokeLinecap="butt" />
    </g>
  </SvgWithFilter>
);

export const WhiteQueen = ({ className }: PieceProps) => (
  <SvgWithFilter className={className}>
    <g fill="#FFF" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 12l2-5 3.5 4 3-6 3 6 3.5-4 2 5h-17z" />
      <path d="M11.5 37c5.5-8 16.5-8 22 0" strokeLinecap="butt" />
      <path d="M11.5 37c5.5-8 16.5-8 22 0" strokeLinecap="butt" transform="matrix(1 0 0 -1 0 62)" />
      <path d="M11.5 37v-4.5h22V37zM11.5 25h22" strokeLinecap="butt" />
      <path d="M22.5 25s4.5-7.5 3-10.5c0 0-1.5-1-3 .5-1.5-1.5-3-.5-3-.5-1.5 3 3 10.5 3 10.5" strokeLinecap="butt" />
    </g>
  </SvgWithFilter>
);

export const WhiteRook = ({ className }: PieceProps) => (
  <SvgWithFilter className={className}>
    <g fill="#FFF" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 14h17v-3h-17zM16 14v-5h3v5h-3zm5.5 0v-5h4v5h-4zm5.5 0v-5h3v5h-3z" />
      <path d="M14 14v11h17V14H14zM14 25h17v5H14v-5zm-2.5 5h22v4.5h-22z" />
    </g>
  </SvgWithFilter>
);

export const WhiteBishop = ({ className }: PieceProps) => (
  <SvgWithFilter className={className}>
    <g fill="#FFF" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 14.5c0-2 1.5-2.5 4.5-2.5s4.5.5 4.5 2.5-2 2.5-4.5 2.5-4.5-.5-4.5-2.5z" />
      <path d="M22.5 12V10" />
      <path d="M20 30c-2-2-2.5-7.5-2.5-7.5s-1-5.5 5-5.5 5 5.5 5 5.5-1 6-2.5 7.5" strokeLinecap="butt" strokeMiterlimit="4" />
      <path d="M17.5 22.5s-1-2 .5-4-3-4-3-4" />
      <path d="M12.5 37c5.5-8 14.5-8 20 0" strokeLinecap="butt" />
      <path d="M12.5 37c5.5-8 14.5-8 20 0" strokeLinecap="butt" transform="matrix(1 0 0 -1 0 62)" />
      <path d="M12.5 37v-4.5h20V37zM12.5 25h20" strokeLinecap="butt" />
    </g>
  </SvgWithFilter>
);

export const WhiteKnight = ({ className }: PieceProps) => (
  <SvgWithFilter className={className}>
    <g fill="#FFF" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10c11 0 11 15 0 16-7 0-9-5-9-5-2 9-11 11-11 11" />
      <path d="M22 26C11 26 11 11 22 10c0 1-1 2-1 3-2 1-3 2-3 4-1 3 0 5 2 6-2 1-4 2-4 3" />
      <path d="M11.5 37.5h22v-4h-22z" />
    </g>
  </SvgWithFilter>
);

export const WhitePawn = ({ className }: PieceProps) => (
  <SvgWithFilter className={className}>
    <g fill="#FFF" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.5 9.5c2.5 0 4.5 2 4.5 4.5s-2 4.5-4.5 4.5-4.5-2-4.5-4.5 2-4.5 4.5-4.5z" />
      <path d="M14.5 37.5h16v-4h-16zM17.5 25.5h10v8h-10z" />
    </g>
  </SvgWithFilter>
);


export const BlackKing = ({ className }: PieceProps) => (
  <SvgWithFilter className={className}>
    <g fill="#333" stroke="#AAA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.5 11.63V6M20 8h5" />
      <path d="M22.5 25s4.5-7.5 3-10.5c0 0-1.5-1-3 .5-1.5-1.5-3-.5-3-.5-1.5 3 3 10.5 3 10.5" strokeLinecap="butt" />
      <path d="M12.5 37c5.5-8 14.5-8 20 0" strokeLinecap="butt" />
      <path d="M12.5 37c5.5-8 14.5-8 20 0" strokeLinecap="butt" transform="matrix(1 0 0 -1 0 62)" />
      <path d="M12.5 37v-4.5h20V37zM12.5 25h20" strokeLinecap="butt" />
    </g>
  </SvgWithFilter>
);

export const BlackQueen = ({ className }: PieceProps) => (
  <SvgWithFilter className={className}>
    <g fill="#333" stroke="#AAA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 12l2-5 3.5 4 3-6 3 6 3.5-4 2 5h-17z" />
      <path d="M11.5 37c5.5-8 16.5-8 22 0" strokeLinecap="butt" />
      <path d="M11.5 37c5.5-8 16.5-8 22 0" strokeLinecap="butt" transform="matrix(1 0 0 -1 0 62)" />
      <path d="M11.5 37v-4.5h22V37zM11.5 25h22" strokeLinecap="butt" />
      <path d="M22.5 25s4.5-7.5 3-10.5c0 0-1.5-1-3 .5-1.5-1.5-3-.5-3-.5-1.5 3 3 10.5 3 10.5" strokeLinecap="butt" />
    </g>
  </SvgWithFilter>
);

export const BlackRook = ({ className }: PieceProps) => (
  <SvgWithFilter className={className}>
    <g fill="#333" stroke="#AAA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 14h17v-3h-17zM16 14v-5h3v5h-3zm5.5 0v-5h4v5h-4zm5.5 0v-5h3v5h-3z" />
      <path d="M14 14v11h17V14H14zM14 25h17v5H14v-5zm-2.5 5h22v4.5h-22z" />
    </g>
  </SvgWithFilter>
);

export const BlackBishop = ({ className }: PieceProps) => (
  <SvgWithFilter className={className}>
    <g fill="#333" stroke="#AAA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 14.5c0-2 1.5-2.5 4.5-2.5s4.5.5 4.5 2.5-2 2.5-4.5 2.5-4.5-.5-4.5-2.5z" />
      <path d="M22.5 12V10" />
      <path d="M20 30c-2-2-2.5-7.5-2.5-7.5s-1-5.5 5-5.5 5 5.5 5 5.5-1 6-2.5 7.5" strokeLinecap="butt" strokeMiterlimit="4" />
      <path d="M17.5 22.5s-1-2 .5-4-3-4-3-4" />
      <path d="M12.5 37c5.5-8 14.5-8 20 0" strokeLinecap="butt" />
      <path d="M12.5 37c5.5-8 14.5-8 20 0" strokeLinecap="butt" transform="matrix(1 0 0 -1 0 62)" />
      <path d="M12.5 37v-4.5h20V37zM12.5 25h20" strokeLinecap="butt" />
    </g>
  </SvgWithFilter>
);

export const BlackKnight = ({ className }: PieceProps) => (
  <SvgWithFilter className={className}>
    <g fill="#333" stroke="#AAA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10c11 0 11 15 0 16-7 0-9-5-9-5-2 9-11 11-11 11" />
      <path d="M22 26C11 26 11 11 22 10c0 1-1 2-1 3-2 1-3 2-3 4-1 3 0 5 2 6-2 1-4 2-4 3" />
      <path d="M11.5 37.5h22v-4h-22z" />
    </g>
  </SvgWithFilter>
);

export const BlackPawn = ({ className }: PieceProps) => (
  <SvgWithFilter className={className}>
    <g fill="#333" stroke="#AAA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.5 9.5c2.5 0 4.5 2 4.5 4.5s-2 4.5-4.5 4.5-4.5-2-4.5-4.5 2-4.5 4.5-4.5z" />
      <path d="M14.5 37.5h16v-4h-16zM17.5 25.5h10v8h-10z" />
    </g>
  </SvgWithFilter>
);

export const PieceComponents = {
    k: { w: WhiteKing, b: BlackKing },
    q: { w: WhiteQueen, b: BlackQueen },
    r: { w: WhiteRook, b: BlackRook },
    b: { w: WhiteBishop, b: BlackBishop },
    n: { w: WhiteKnight, b: BlackKnight },
    p: { w: WhitePawn, b: BlackPawn },
};
