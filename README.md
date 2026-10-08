# Portfoliov3

Personal portfolio of Sahan Chamod, DevSecOps Engineer and Cybersecurity Researcher.

Built with Next.js 15, React 19, Tailwind CSS, and Framer Motion. The hero features a canvas-rendered 3D globe with real continent data and an animated attack-chain simulation.

## Development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Production

```bash
npm run build
npm start
```

## Structure

- `app/` – layout, page, metadata, robots and sitemap
- `components/` – page sections and the hero globe
- `lib/data.ts` – all portfolio content (experience, education, projects, skills, achievements)
- `lib/landMask.ts` – generated land bitmap used by the globe
