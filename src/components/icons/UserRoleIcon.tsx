export function UserRoleIcon(props: React.SVGAttributes<SVGSVGElement>) {
  return (
    <svg
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      height="1rem"
      width="1rem"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      style={{ color: props.color, ...props.style }}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M4 8v-2a2 2 0 0 1 2 -2h2"></path>
      <path d="M4 16v2a2 2 0 0 0 2 2h2"></path>
      <path d="M16 4h2a2 2 0 0 1 2 2v2"></path>
      <path d="M16 20h2a2 2 0 0 0 2 -2v-2"></path>
      <path d="M8 11m0 1a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1v3a1 1 0 0 1 -1 1h-6a1 1 0 0 1 -1 -1z"></path>
      <path d="M10 11v-2a2 2 0 1 1 4 0v2"></path>
    </svg>
  );
}
