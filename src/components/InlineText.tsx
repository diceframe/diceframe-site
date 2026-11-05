import { Fragment } from "react";
import { parseInlineLinks } from "~/content/inlineLinks";

/** Renders copy containing `[label](url)` markup as text with citation links. */
export function InlineText({ text }: { text: string }) {
  return (
    <>
      {parseInlineLinks(text).map((segment, index) =>
        segment.kind === "link" ? (
          <a
            className="cite-link"
            href={segment.href}
            key={index}
            target="_blank"
            rel="noopener noreferrer"
          >
            {segment.text}
          </a>
        ) : (
          <Fragment key={index}>{segment.text}</Fragment>
        ),
      )}
    </>
  );
}
