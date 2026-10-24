import { ImageIcon } from "lucide-react";
import type { Project } from "@/lib/content";

/** A project's cover, or a swatch that marks where its screenshot will go. */
export default function Media({ project, index = 0, src }: { project: Project; index?: number; src?: string }) {
  const image = src ?? project.images[0];
  if (image) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={image} alt={`${project.name}: ${project.kind}`} className="media-img" draggable={false} />;
  }
  const initials = project.name
    .split(/\s+/)
    .filter((w) => /^[A-Za-z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
  return (
    <span className="placeholder" data-tone={index % 3}>
      <span className="placeholder-top code">
        <ImageIcon size={14} strokeWidth={2} aria-hidden /> Screenshot coming
      </span>
      <span className="placeholder-mark display" aria-hidden>
        {initials}
      </span>
    </span>
  );
}
