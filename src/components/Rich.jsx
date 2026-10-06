import { Fragment } from "react";

const token =
  /(\*\*[^*]+\*\*|`[^`]+`|«[^»]+»)/g;

function part(text, key) {
  if (text.startsWith("**") && text.endsWith("**")) {
    return <strong key={key}>{text.slice(2, -2)}</strong>;
  }
  if (text.startsWith("`") && text.endsWith("`")) {
    return <code key={key}>{text.slice(1, -1)}</code>;
  }
  if (text.startsWith("«") && text.endsWith("»")) {
    return (
      <span
        key={key}
        className="rounded bg-brand-100 px-1.5 py-0.5 font-mono text-xs font-semibold text-brand-700"
      >
        {text.slice(1, -1)}
      </span>
    );
  }
  return <Fragment key={key}>{text}</Fragment>;
}

export default function Rich({ children }) {
  if (typeof children !== "string") return children;
  const pieces = children.split(token);
  return <>{pieces.map((p, i) => part(p, i))}</>;
}
