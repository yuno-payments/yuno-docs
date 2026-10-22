export const Ic = ({ n, size = 20 }) => {
  const P = {
    arrowUpRight: <path d="M7 17 17 7M8 7h9v9" />,
    arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
    globe: <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3 12h18M12 3c2.5 2.5 3.5 5.5 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-5.5-3.5-9S9.5 5.5 12 3z" />,
    shield: <path d="M12 3 4.5 6v5.5c0 4.5 3 8 7.5 9.5 4.5-1.5 7.5-5 7.5-9.5V6zM8.5 12l2.5 2.5 4.5-5" />,
    store: <path d="M4 9.5 5.5 4h13L20 9.5M4 9.5c0 1.4 1.1 2.5 2.5 2.5S9 10.9 9 9.5c0 1.4 1.1 2.5 3 2.5s3-1.1 3-2.5c0 1.4 1.1 2.5 2.5 2.5S20 10.9 20 9.5M5.5 12v8h13v-8M10 20v-4.5h4V20" />,
    chart: <path d="M4 20V4M4 20h16M8 17v-5M12 17V7M16 17v-8M20 17v-3" />,
    arrowDown: <path d="M12 5v14M6 13l6 6 6-6" />,
    squares: <path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" />,
    sliders: <path d="M4 7h9M17 7h3M4 17h3M11 17h9M13 4v6M7 14v6" />,
    server: <path d="M4 4h16v6H4zM4 14h16v6H4zM7.5 7h.01M7.5 17h.01" />,
    card: <path d="M3 6h18v12H3zM3 10h18M6.5 15h3" />,
    save: <path d="M3 6h18v12H3zM3 10h18M15 15h3" />,
    refund: <path d="M20 12a8 8 0 0 0-14-5.3L4 9M4 4v5h5" />,
    bell: <path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15zM10 21h4" />,
    refresh: <path d="M20 12a8 8 0 0 0-14-5.3L4 9M4 4v5h5M4 12a8 8 0 0 0 14 5.3L20 15M20 20v-5h-5" />,
    split: <path d="M12 21v-8M12 13 6 6M12 13l6-7M4 8V4h4M16 4h4v4" />,
    payout: <path d="M12 20V6M6 12l6-6 6 6M4 20h16" />,
  };
  return (
    <svg className="yd-ic" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {P[n]}
    </svg>
  );
};
