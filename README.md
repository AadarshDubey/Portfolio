# Aadarsh Dubey — GenAI Developer Portfolio

A premium, production-ready portfolio website built with **Next.js 16**, **TypeScript**, **Tailwind CSS v4**, and **Framer Motion**. Features a cinematic scroll-driven hero animation using 192 sequential frames rendered on a `<canvas>` element.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout, fonts, SEO metadata, JSON-LD
│   ├── page.tsx            # Main page composing all sections
│   ├── globals.css         # Global styles, color palette, utilities
│   ├── api/contact/route.ts # Contact form API endpoint
│   ├── sitemap.ts          # Dynamic sitemap generation
│   └── robots.ts           # Robots.txt config
├── components/
│   ├── Header.tsx          # Sticky nav with mobile menu
│   ├── Footer.tsx          # Footer with quick links
│   ├── SectionWrapper.tsx  # Reusable section with scroll animation
│   ├── AnimatedCounter.tsx # Number counting animation
│   └── sections/           # All page sections
│       ├── HeroSection.tsx
│       ├── HighlightsSection.tsx
│       ├── ProjectsSection.tsx
│       ├── SkillsSection.tsx
│       ├── ExperienceSection.tsx
│       ├── CertificationsSection.tsx
│       ├── AchievementsSection.tsx
│       ├── AboutSection.tsx
│       └── ContactSection.tsx
├── content/
│   └── content.ts          # ⭐ ALL editable content lives here
├── hooks/
│   └── useFrameSequence.ts # Canvas scroll animation engine
└── lib/
    └── utils.ts            # Utility functions
public/
└── frames/                 # 192 hero animation frames
    └── ezgif-frame-001.jpg ... ezgif-frame-192.jpg
```

## ✏️ How to Edit Content

**All content is in a single file:** `src/content/content.ts`

### Update Your Info
```typescript
export const siteConfig: SiteConfig = {
  name: "Aadarsh Dubey",
  title: "GenAI Developer",
  email: "your-email@example.com",
  resumeUrl: "/resume.pdf",        // Place resume.pdf in /public
  social: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
  },
};
```

### Add a Project
Add an entry to the `projects` array:
```typescript
{
  id: "my-project",
  title: "My New Project",
  outcome: "Impact statement",
  description: "What it does",
  tags: ["RAG", "NLP"],
  stack: ["Python", "FastAPI"],
  links: { github: "https://...", live: "https://..." },
  featured: true,  // true = large card, false = grid card
}
```

### Add a Certification
```typescript
{
  id: "my-cert",
  title: "Certificate Name",
  issuer: "Issuing Organization",
  date: "2024",
  credentialUrl: "https://credential-link",
}
```

## 🎬 Hero Animation (Frame Sequence)

The hero uses a **canvas-based scroll-driven animation** with 192 frames:

### How It Works
1. **Scroll zone**: The hero section has a height of `300vh`, creating a scroll area
2. **Sticky canvas**: A `<canvas>` element stays fixed on screen while the user scrolls
3. **Frame mapping**: Scroll progress `[0..1]` maps to frame index `[0..191]`
4. **Progressive loading**: Frame 1 loads immediately → next 20 → rest in background batches

### Replace Animation Frames
1. Place your new frames in `public/frames/`
2. Name them: `ezgif-frame-001.jpg`, `ezgif-frame-002.jpg`, ... (3-digit zero-padded)
3. Update `heroConfig` in `content.ts`:
```typescript
export const heroConfig = {
  frameCount: 192,       // change if different number of frames
  framePathPattern: "/frames/ezgif-frame-{index}.jpg",
  heroScrollLength: "300vh",
  frameIndexPad: 3,
};
```

### Accessibility
- **Reduced motion**: If `prefers-reduced-motion` is enabled, a static frame is shown instead
- The overlay text remains accessible regardless of animation state

## 📧 Contact Form

The contact form uses an API route at `/api/contact`:
- **Validation**: Name, email, and message are validated server-side
- **Anti-spam**: Hidden honeypot field + IP-based rate limiting (5 requests/hour)
- **Currently**: Logs submissions to console
- **To add email**: Replace the `console.log` in `src/app/api/contact/route.ts` with your email provider (Resend, SendGrid, etc.)

## 🚢 Deploy to Vercel

```bash
npm i -g vercel
vercel
```

Or connect your GitHub repo to [vercel.com](https://vercel.com) for automatic deployments.

## 🎨 Design System

| Token | Color | Usage |
|-------|-------|-------|
| `warm-50` → `warm-950` | Beige → Charcoal | Backgrounds, text, borders |
| `accent` | Muted Teal `#4ECDC4` | CTAs, highlights, links |
| Font | Inter | All text |

## 📋 Tech Stack

- **Next.js 16** (App Router, Server Actions)
- **TypeScript** (strict mode)
- **Tailwind CSS v4**
- **Framer Motion** (section animations, mobile menu)
- **Lucide Icons**
- **Zod** (contact form validation)
