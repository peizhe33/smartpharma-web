import { Fragment } from "react";

const PLACEHOLDER_SPLIT = /(\[ADD[^\]]*\])/g;

/**
 * Renders text, wrapping any "[ADD ...]" placeholder in a visibly styled,
 * searchable <mark> so unfilled content can never be mistaken for real content.
 */
export function Ph({ text }: { text: string }) {
  const parts = text.split(PLACEHOLDER_SPLIT);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("[ADD") ? (
          <mark key={i} className="ph">
            {part}
          </mark>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

export function hasPlaceholder(text: string): boolean {
  return /\[ADD[^\]]*\]/.test(text);
}
