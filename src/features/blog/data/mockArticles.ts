import type { BlogArticle } from "../types";

export const mockBlogArticles: BlogArticle[] = [
  {
    id: "what-id-tell-myself-before-learning-to-code",
    date: "2024-12-04",
    title: "What I'd Tell Myself Before Learning to Code",
    description:
      "The myths, mistakes, and mindset shifts that separate people who learn to code from those who quit.",
    thumbnail: "/images/portal-ending.jpg",
    tags: ["tech", "life"],
    content:
      "A candid look at the early mistakes that slowed me down and the systems that finally made learning click.",
  },
  {
    id: "building-a-lab-notebook-for-modern-projects",
    date: "2024-11-18",
    title: "Building a Lab Notebook for Modern Projects",
    description:
      "How I document experiments, decisions, and iterations so projects stay aligned under pressure.",
    thumbnail: "/images/setup-dev-portal.png",
    tags: ["work", "tech"],
    content:
      "Documentation as a living system: structured notes, repeatable checklists, and evidence-based updates.",
  },
  {
    id: "a-quiet-weekend-in-the-archive",
    date: "2024-10-02",
    title: "A Quiet Weekend in the Archive",
    description:
      "Reflections on slowing down, recharging, and finding signal in the noise of production cycles.",
    thumbnail: "/images/portal-ending.jpg",
    tags: ["life"],
    content:
      "Time away from the lab can be the strongest catalyst for better ideas and cleaner execution.",
  },
  {
    id: "college-notes-on-systems-thinking",
    date: "2024-09-15",
    title: "College Notes on Systems Thinking",
    description:
      "Lessons from engineering lectures that still guide how I design interfaces today.",
    thumbnail: "/images/setup-dev-portal.png",
    tags: ["college", "tech"],
    content:
      "Tracing feedback loops, building resilient flows, and documenting architecture with clarity.",
  },
  {
    id: "designing-technical-archives",
    date: "2024-08-20",
    title: "Designing Technical Archives",
    description:
      "Why museum-like layouts work so well for developer portfolios and technical storytelling.",
    thumbnail: "/images/portal-ending.jpg",
    tags: ["work", "life"],
    content:
      "A visual system that respects hierarchy, gives space to experiments, and invites exploration.",
  },
  {
    id: "lessons-from-shipping-under-pressure",
    date: "2024-07-07",
    title: "Lessons From Shipping Under Pressure",
    description:
      "Field notes on constraints, trade-offs, and staying calm when the deadline is real.",
    thumbnail: "/images/setup-dev-portal.png",
    tags: ["work"],
    content:
      "Focus on the core loop, cut noise early, and preserve a clear communication channel.",
  },
];

export const mockFeaturedIds = [
  "what-id-tell-myself-before-learning-to-code",
  "building-a-lab-notebook-for-modern-projects",
  "designing-technical-archives",
];

export const getMockArticleById = (id: string) =>
  mockBlogArticles.find((article) => article.id === id) ?? null;
