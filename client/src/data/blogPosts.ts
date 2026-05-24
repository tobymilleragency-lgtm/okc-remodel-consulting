export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  hero: string;
  takeaways: string[];
  sections: { heading: string; paragraphs: string[] }[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-start-an-okc-remodel",
    title: "How to Start a Remodeling Project in Oklahoma City",
    description: "A practical homeowner guide for sending useful remodel details, photos, timing notes, and project goals to Brothers Remodeling OKC.",
    date: "2026-05-24",
    hero: "Clear details help a remodeling conversation start faster and stay more useful.",
    takeaways: ["Describe the room or exterior area", "Send photos when possible", "Share timing, access, and finish expectations"],
    sections: [
      { heading: "Start with the room and the problem", paragraphs: ["A good remodel request names the room, the problem, and the result the homeowner wants. That can be a kitchen that needs better storage, a bathroom that needs a cleaner shower, flooring that needs replacement, or exterior work that needs repair and paint."] },
      { heading: "Photos make the first conversation better", paragraphs: ["Photos help Brothers Remodeling OKC understand existing surfaces, transitions, doors, windows, trim, access, and repair conditions before the next step is discussed."] }
    ]
  }
];
