# Research Notes & Thoughts

Blog: [blogs.tilakkadlaskar.tech](https://blogs.tilakkadlaskar.tech)

## Run locally

**Prerequisites:** Node.js

1. Install: `npm install`
2. Optional: create `.env.local` with `GEMINI_API_KEY=your-key` for the Research Assistant
3. Dev server: `npm run dev` → open http://localhost:3000
4. Production build: `npm run build` then `npm run preview`

## Deploy (GitHub Pages)

- Push to `main`; the **Deploy to GitHub Pages** workflow builds and deploys.
- In repo **Settings → Pages**, set **Source** to **GitHub Actions** (not “Deploy from a branch”).
- Custom domain: set in **Settings → Pages → Custom domain** and add a CNAME record in DNS.
