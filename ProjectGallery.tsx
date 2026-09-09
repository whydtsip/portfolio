"use client";

import { useEffect, useState } from "react";

type GalleryItem = {
  src: string;
  title: string;
  caption: string;
};

export default function ProjectGallery({
  projectName,
  platform,
  items,
}: {
  projectName: string;
  platform: string;
  items: readonly GalleryItem[];
}) {
  const [selected, setSelected] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const current = items[selected];

  const move = (direction: number) => {
    setSelected((index) => (index + direction + items.length) % items.length);
  };

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightboxOpen(false);
      if (event.key === "ArrowRight") move(1);
      if (event.key === "ArrowLeft") move(-1);
    };
    const onScroll = () => setLightboxOpen(false);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("scroll", onScroll);
    };
  }, [lightboxOpen, items.length]);

  return (
    <div className={`project-gallery gallery-${platform}`}>
      <button
        className="gallery-stage"
        type="button"
        onClick={() => setLightboxOpen(true)}
        aria-label={`Open ${projectName} interface gallery`}
      >
        {platform === "desktop" && (
          <div className="browser-chrome" aria-hidden="true">
            <span /><span /><span />
            <b>{projectName.toLowerCase().replaceAll(" ", "-")}.app</b>
          </div>
        )}
        <div className="gallery-image-wrap">
          <img src={current.src} alt={`${projectName} — ${current.title}`} />
        </div>
        <span className="gallery-expand">View interface <b>↗</b></span>
      </button>

      <div className="gallery-meta">
        <div>
          <span className="mini-label">Interface / {String(selected + 1).padStart(2, "0")}</span>
          <h4>{current.title}</h4>
          <p>{current.caption}</p>
        </div>
        <div className="gallery-arrows" aria-label="Gallery navigation">
          <button type="button" onClick={() => move(-1)} aria-label="Previous screenshot">←</button>
          <button type="button" onClick={() => move(1)} aria-label="Next screenshot">→</button>
        </div>
      </div>

      <div className="gallery-thumbs" aria-label={`${projectName} screenshots`}>
        {items.map((item, index) => (
          <button
            type="button"
            key={item.src}
            className={index === selected ? "active" : ""}
            onClick={() => setSelected(index)}
            aria-label={`Show ${item.title}`}
            aria-current={index === selected ? "true" : undefined}
          >
            <img src={item.src} alt="" />
            <span>{String(index + 1).padStart(2, "0")}</span>
          </button>
        ))}
      </div>

      {lightboxOpen && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${projectName} screenshot viewer`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setLightboxOpen(false);
            }
          }}
        >
          <button className="lightbox-close" type="button" onClick={() => setLightboxOpen(false)} aria-label="Close gallery">×</button>
          <button className="lightbox-nav lightbox-prev" type="button" onClick={(event) => { event.stopPropagation(); move(-1); }} aria-label="Previous screenshot">←</button>
          <figure onMouseDown={(event) => event.stopPropagation()}>
            <img src={current.src} alt={`${projectName} — ${current.title}`} />
            <figcaption>
              <span>{projectName}</span>
              <strong>{current.title}</strong>
              <p>{current.caption}</p>
            </figcaption>
          </figure>
          <button className="lightbox-nav lightbox-next" type="button" onClick={(event) => { event.stopPropagation(); move(1); }} aria-label="Next screenshot">→</button>
        </div>
      )}
    </div>
  );
}
