import { ArrowUpRight, FileText, Mail } from "lucide-react";
import { careers, person, type CareerId } from "@/lib/content";

const ask: Record<CareerId, string> = {
  engineer: "Hiring an engineer?",
  design: "Need a brand or a screen?",
  automation: "Got a process that eats your week?",
};

export default function Contact({ career }: { career: CareerId }) {
  const c = careers[career];
  return (
    <footer id="contact" className="contact on-ink">
      <div className="wrap">
        <h2 className="contact-title display">{ask[career]}</h2>
        <a className="contact-email display" href={`mailto:${person.email}`}>
          {person.email}
        </a>
        <div className="contact-actions">
          <a href={`mailto:${person.email}?subject=${encodeURIComponent(`Hello John — ${c.title}`)}`} className="btn btn-solid">
            <Mail size={18} aria-hidden /> Email John
          </a>
          <a href={c.resume} className="btn btn-ghost" download>
            <FileText size={18} aria-hidden /> Résumé (PDF)
          </a>
        </div>
        <ul className="contact-links">
          {person.links.map((l) => (
            <li key={l.href}>
              <a href={l.href} target="_blank" rel="noreferrer">
                {l.label} <ArrowUpRight size={16} aria-hidden />
              </a>
            </li>
          ))}
        </ul>
        <div className="contact-foot">
          <span>© 2026 {person.name}</span>
          <span>{person.location}</span>
          <span className="code">{c.inkName}</span>
        </div>
      </div>
    </footer>
  );
}
