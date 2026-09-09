"use client";

import { useEffect, useRef, useState } from "react";
import { portfolio } from "@/data/portfolio";

export type IconName = "gmail" | "sms" | "facebook" | "instagram" | "telegram" | "linkedin" | "github";

export function ChannelIcon({ name }: { name: IconName }) {
  const common = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };

  switch (name) {
    case "gmail":
      return <svg {...common}><path d="M3 6.5 12 13l9-6.5"/><rect x="3" y="5" width="18" height="14" rx="2"/></svg>;
    case "sms":
      return <svg {...common}><path d="M21 15a3 3 0 0 1-3 3H8l-5 3V6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3z"/><path d="M7 9h10M7 13h7"/></svg>;
    case "facebook":
      return <svg {...common}><path d="M14 8h3V4h-3c-3 0-5 2-5 5v3H6v4h3v5h4v-5h3l1-4h-4V9c0-.7.3-1 1-1z"/></svg>;
    case "instagram":
      return <svg {...common}><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>;
    case "telegram":
      return <svg {...common}><path d="m21 4-4 16-6-5-4 3 1-5 10-7-13 5-4-2z"/></svg>;
    case "linkedin":
      return <svg {...common}><rect x="4" y="9" width="4" height="11"/><path d="M6 4.5v.01M12 20V9h4v2c1-1.5 2.3-2.3 4-2 1.6.3 2 1.6 2 4v7h-4v-6c0-1.3-.4-2-1.5-2S16 13 16 14v6z"/></svg>;
    case "github":
      return <svg {...common}><path d="M12 2a10 10 0 0 0-3.16 19.5c.5.1.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.94 0-1.1.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.75c0 .26.18.58.69.48A10 10 0 0 0 12 2z"/></svg>;
  }
}

export default function ContactMenu({
  triggerClassName = "contact-menu-trigger",
  triggerLabel = "Contact",
  align = "right",
}: {
  triggerClassName?: string;
  triggerLabel?: string;
  align?: "left" | "right";
}) {
  const [open, setOpen] = useState(false);
  const [pinned, setPinned] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeOnOutside = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) { setOpen(false); setPinned(false); }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); setPinned(false); }
    };
    document.addEventListener("mousedown", closeOnOutside);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeOnOutside);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return (
    <div
      className={`contact-menu ${open ? "is-open" : ""} ${align === "left" ? "align-left" : ""}`}
      ref={rootRef}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => { if (!pinned) setOpen(false); }}
    >
      <button
        type="button"
        className={triggerClassName}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => { const next = !pinned; setPinned(next); setOpen(next); }}
      >
        {triggerLabel}
      </button>

      <div className="contact-popover" role="menu" aria-label="Contact channels">
        <div className="contact-popover-head">
          <span>Contact channels</span>
          <small>Choose where to reach me</small>
        </div>
        <div className="contact-channel-grid">
          {portfolio.contactChannels.map((channel) => {
            const enabled = Boolean(channel.href);
            if (enabled) {
              return (
                <a
                  key={channel.id}
                  className="contact-channel"
                  href={channel.href}
                  target={channel.external ? "_blank" : undefined}
                  rel={channel.external ? "noreferrer" : undefined}
                  role="menuitem"
                  aria-label={`${channel.label}: ${channel.value}`}
                >
                  <span className="contact-channel-icon"><ChannelIcon name={channel.id as IconName} /></span>
                  <span><b>{channel.label}</b><small>{channel.value}</small></span>
                </a>
              );
            }

            return (
              <div className="contact-channel is-disabled" key={channel.id} aria-disabled="true">
                <span className="contact-channel-icon"><ChannelIcon name={channel.id as IconName} /></span>
                <span><b>{channel.label}</b><small>{channel.value}</small></span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
