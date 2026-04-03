# Bladi | بلادي

> **An interactive mobile app wireframe celebrating Morocco's rich cultural heritage.**

Bladi (Arabic for *"Heritage"*) is a high-fidelity interactive wireframe for a mobile-first cultural discovery platform. It lets users explore Moroccan cities, artisan crafts, heritage sites, and local traditions — guided by an AI voice narrator and an immersive map-first experience.

---

## ✨ Features

| Screen | Description |
|--------|-------------|
| 🗺️ **Home / Map** | Interactive Morocco map with city markers and region-based discovery |
| 🏛️ **Heritage Detail** | Deep-dive into historical sites, stories, and local context |
| 🌍 **Region Detail** | Curated content per Moroccan region — culture, crafts, cuisine |
| 🛍️ **Marketplace** | Browse and purchase authentic artisan products |
| 👤 **Artisan Profile** | Meet the makers — craftsmanship bios and product galleries |
| 🛒 **Checkout** | Streamlined purchase flow |
| 🗓️ **Itinerary** | Build and manage personalized cultural travel plans |
| 🎤 **Voice AI Guide** | AI-powered audio narration for heritage sites and stories |
| 🏅 **Challenges** | Gamified cultural discovery with badges and progress tracking |
| 🔐 **Onboarding** | Smooth multi-step introduction to the app experience |
| ⚙️ **Settings / Profile** | User preferences, language, and account management |

---

## 🏗️ Tech Stack

- **Framework** — [Next.js](https://nextjs.org) (App Router, TypeScript)
- **Styling** — [Tailwind CSS v4](https://tailwindcss.com) + custom design tokens
- **Animation** — [Framer Motion](https://www.framer.com/motion/) for micro-interactions and screen transitions
- **UI Components** — [Radix UI](https://www.radix-ui.com/) primitives + [shadcn/ui](https://ui.shadcn.com/)
- **Icons** — [Lucide React](https://lucide.dev/)
- **Maps** — Custom interactive SVG/image-based Morocco map with percentage-based city positioning
- **AI Avatar** — Spring-animated guide avatar with typewriter Arabic narration and sound wave indicators

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **pnpm** (recommended) or npm / yarn

### Install dependencies

```bash
pnpm install
# or
npm install
```

### Run the development server

```bash
pnpm dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

The wireframe renders inside a phone maquette that fits the viewport — no scrolling required.

---

## 📁 Project Structure

```
turath-wireframes-ng/
├── app/
│   ├── layout.tsx          # Root layout & metadata
│   ├── page.tsx            # Entry point
│   └── globals.css         # Global styles & design tokens
├── components/
│   └── turath/
│       ├── screens/        # All 12 app screens
│       ├── app-shell.tsx   # Main shell with navigation
│       ├── animated-avatar.tsx     # AI guide avatar
│       ├── bottom-navigation.tsx   # Tab bar navigation
│       ├── interactive-morocco-map.tsx  # SVG city map
│       ├── navigation-provider.tsx # Navigation context
│       ├── phone-frame.tsx         # Mobile maquette frame
│       └── screen-gallery.tsx      # Screen transition manager
├── hooks/                  # Custom React hooks
├── lib/                    # Shared utilities
└── public/                 # Static assets (map, icons, audio)
```

---

## 🎨 Design Philosophy

Turath is designed with a **mobile-first, immersive aesthetic** inspired by Moroccan visual culture:

- **Warm earthy tones** — terracotta, saffron, deep indigo
- **Arabic-first content** — RTL layouts with proper Arabic typography
- **Fluid motion** — spring-based animations for a tactile, native-app feel
- **Gamified discovery** — challenges and badges to encourage cultural exploration

---

## 📦 Deployment

The project is ready to deploy on [Vercel](https://vercel.com):

```bash
pnpm build
```

Or connect the repository to Vercel for automatic CI/CD deployments.

---

## 📄 License

This project is a design prototype and wireframe demonstration. All content related to Moroccan heritage is used for educational and cultural appreciation purposes.
