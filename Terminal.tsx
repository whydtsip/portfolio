"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { portfolio } from "@/data/portfolio";

type Line = { kind: "command" | "output"; text: string };

const welcome: Line[] = [
  { kind: "output", text: `Welcome to ${portfolio.name}'s developer workspace.` },
  { kind: "output", text: 'Type "help" to see available commands.' },
];

export default function Terminal() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [lines, setLines] = useState<Line[]>(welcome);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "y") {
        event.preventDefault();
        setOpen((value) => !value);
      }
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  const outputFor = (command: string): string[] => {
    const normalized = command.trim().toLowerCase();

    switch (normalized) {
      case "help":
        return [
          "help         show commands",
          "whoami       developer profile",
          "roles        professional roles",
          "projects     selected projects",
          "ui           interface gallery index",
          "skills       technical & creative stack",
          "experience   professional experience",
          "education    academic background",
          "credentials  credentials & training",
          "contact      contact details",
          "clear        clear terminal",
        ];
      case "whoami":
      case "about":
        return [
          `${portfolio.name} — ${portfolio.primaryRole} / ${portfolio.secondaryRole}`,
          `${portfolio.location} · ${portfolio.availability}`,
          portfolio.credential,
          portfolio.about,
        ];
      case "roles":
        return portfolio.roles.map((role, index) => `${index + 1}. ${role}`);
      case "projects":
        return portfolio.projects.map((project) => `${project.number}. ${project.name} — ${project.status}`);
      case "ui":
        return portfolio.projects.map((project) => `${project.number}. ${project.name}: ${project.gallery.map((item) => item.title).join(" · ")}`);
      case "skills":
        return Object.entries(portfolio.skills).map(([group, skills]) => `${group}: ${skills.join(", ")}`);
      case "experience":
        return portfolio.experience.map((item) => `${item.period} | ${item.title} — ${item.organization}`);
      case "education":
        return portfolio.education.map((item) => `${item.period} | ${item.program} — ${item.school}`);
      case "credentials":
        return portfolio.credentials.map((item) => `${item.name} — ${item.issuer}`);
      case "contact":
        return portfolio.contactChannels.map((channel) => `${channel.label}: ${channel.href || channel.value}`);
      case "":
        return [];
      default:
        return [`Command not found: ${command}`, 'Type "help" for available commands.'];
    }
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const command = input.trim();

    if (command.toLowerCase() === "clear") {
      setLines([]);
      setInput("");
      return;
    }

    setLines((current) => [
      ...current,
      { kind: "command", text: command },
      ...outputFor(command).map((text) => ({ kind: "output" as const, text })),
    ]);
    setInput("");
  };

  if (!open) {
    return (
      <button className="terminal-launch" onClick={() => setOpen(true)} aria-label="Open developer terminal">
        <span>⌘</span> Dev Mode <kbd>Ctrl Y</kbd>
      </button>
    );
  }

  return (
    <div className="terminal-backdrop" role="presentation" onMouseDown={() => setOpen(false)}>
      <section className="terminal" role="dialog" aria-modal="true" aria-label="Developer terminal" onMouseDown={(e) => e.stopPropagation()}>
        <div className="terminal-bar">
          <div className="terminal-dots" aria-hidden="true"><span /><span /><span /></div>
          <span>ylyssa@portfolio — terminal</span>
          <button onClick={() => setOpen(false)} aria-label="Close terminal">×</button>
        </div>
        <div className="terminal-body" ref={scrollRef} onClick={() => inputRef.current?.focus()}>
          {lines.map((line, index) => (
            <div className={line.kind === "command" ? "terminal-command" : "terminal-output"} key={`${line.text}-${index}`}>
              {line.kind === "command" && <span className="prompt">visitor@ylyssa:~$</span>} {line.text}
            </div>
          ))}
          <form className="terminal-input-row" onSubmit={submit}>
            <span className="prompt">visitor@ylyssa:~$</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              autoComplete="off"
              spellCheck={false}
              aria-label="Terminal command"
            />
          </form>
        </div>
      </section>
    </div>
  );
}
