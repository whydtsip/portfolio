"use client";

import { useEffect, useState } from "react";

export default function DocumentPreview({
  image,
  title,
  label,
  placeholder = false,
}: {
  image: string;
  title: string;
  label: string;
  placeholder?: boolean;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onScroll = () => setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className={`document-preview ${placeholder ? "is-placeholder" : ""}`}
        onClick={() => setOpen(true)}
        aria-label={`Open ${label}`}
      >
        <img src={image} alt={`${title} ${label}`} />
        <span className="document-preview-bar"><b>{label}</b><em>View ↗</em></span>
      </button>

      {open && (
        <div className="document-lightbox" role="presentation" onMouseDown={() => setOpen(false)}>
          <figure role="dialog" aria-modal="true" aria-label={label} onMouseDown={(event) => event.stopPropagation()}>
            <div className="document-lightbox-top">
              <div><span>{label}</span><strong>{title}</strong></div>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close document preview">×</button>
            </div>
            <img src={image} alt={`${title} ${label}`} />
            {placeholder && (
              <figcaption>
                Replace this placeholder with your real scanned diploma at <code>public/credentials/bsit-diploma.png</code>, then update the path in <code>src/data/portfolio.ts</code>.
              </figcaption>
            )}
          </figure>
        </div>
      )}
    </>
  );
}
