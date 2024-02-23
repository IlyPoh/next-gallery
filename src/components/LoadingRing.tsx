import { CSSProperties } from "react";

export default function LoadingRing({ size = 2 }: Readonly<{ size?: number }>) {
  const customStyle = {
    "--size": `${size}rem`,
  } as CSSProperties;

  return (
    <div className="lds-ring" style={customStyle}>
      {Array.from(Array(4).keys()).map((item) => (
        <div key={item}></div>
      ))}
    </div>
  );
}
