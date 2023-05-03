const Logo = ({ color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      className="logo_style"
      style={{ color: color }}
      viewBox="0 0 24 24"
    >
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 16V8l-4-5H7L3 8v8l4 5h10l4-5z"
      ></path>
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17 14.667V9.5L15 7H9L7 9.5v5.167L9 17h6l2-2.333zM7 21l2-4M15 17l2 4M7 3l2 4M15 7l2-4M3 8l4 1.5M3 16l4-1.5M21 16l-4-1.5M17 9.5L21 8"
      ></path>
    </svg>
  );
};

export default Logo;
