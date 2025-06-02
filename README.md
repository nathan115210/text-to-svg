# Text-to-SVG Web App

[![MIT License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![CI](https://img.shields.io/github/actions/workflow/status/your-org/text-to-svg/ci.yml?branch=main\&label=CI)](https://github.com/your-org/text-to-svg/actions)
[![Built with Vite](https://img.shields.io/badge/Built%20with-Vite-646CFF?logo=vite\&logoColor=white)](https://vitejs.dev/)

Text-to-SVG Web App is an easy‑to‑use tool that lets you turn any text into beautiful, customizable SVG images. Whether you're creating logos, social‑media graphics, or personalised designs, this app lets you adjust the font, size, and colour to fit your style. Preview in real‑time, then download the SVG or copy its code to use anywhere.

---

## Table of Contents

* [Features](#features)
* [Tech Stack](#tech-stack)
* [Setup & Installation](#setup--installation)
* [Usage](#usage)
* [Scripts](#scripts)
* [Testing](#testing)
* [Deployment](#deployment)
* [Contributing](#contributing)
* [Author & Contact](#author--contact)
* [License](#license)

---

## Features

* Convert input text to SVG with live preview
* Select from **5 preloaded popular fonts** and load additional fonts via Google CDN
* Customise font size and colour
* Responsive SVG sizing:

  * **Fit‑to‑Content** (default)
  * Manual width (px) with **aspect‑ratio lock**
  * Quick **Small / Medium / Large** presets
* Export options:

  * **Download SVG** file
  * **Copy SVG code** to clipboard
* *Future*: per‑glyph SVG‑path generation using **opentype.js**

---

## Tech Stack

| Layer              | Tech                              |
| ------------------ | --------------------------------- |
| Framework          | Next.js 15 (App Router)           |
| Build / Dev Server | **Vite** + pnpm                   |
| Language           | TypeScript                        |
| Styling            | SCSS                              |
| Fonts              | Google Fonts (static & on‑demand) |
| Testing            | Vitest + jsdom                    |
| CI / CD / Hosting  | GitHub Actions → Vercel           |

---

## Setup & Installation

> **Prerequisites**
> • Node **18+**
> • Git
> • pnpm (**corepack enable**)

```bash
# 1 · Clone the repository
$ git clone https://github.com/<your-org>/text-to-svg.git
$ cd text-to-svg

# 2 · Install dependencies
$ corepack enable  # ensures pnpm is available
$ pnpm install
```

---

## Usage

Start the Vite development server:

```bash
pnpm dev
```

Open **[http://localhost:5173](http://localhost:5173)** in your browser.
Edit files inside **/src** and Vite will hot‑reload the preview.

---

## Scripts

| Command           | Purpose                              |
| ----------------- | ------------------------------------ |
| `pnpm dev`        | Start local dev server (Vite)        |
| `pnpm build`      | Create production build              |
| `pnpm preview`    | Preview the production build locally |
| `pnpm lint`       | Run ESLint & Prettier checks         |
| `pnpm test`       | Run unit tests with Vitest           |
| `pnpm test:watch` | Watch‑mode tests                     |

---

## Testing

Run all tests with coverage:

```bash
pnpm test -- --coverage
```

Watch mode:

```bash
pnpm test:watch
```

---

## Deployment

This repo ships with a **GitHub Actions** workflow (`.github/workflows/ci.yml`) that:

1. Installs dependencies with **pnpm**
2. Lints and tests via **Vitest**
3. Builds the production bundle
4. Can auto‑deploy to **Vercel** when commits land on `main`

> **Manual deploy**: push to GitHub, then connect the repo to Vercel and follow its onboarding steps.

Further details: [Next.js Deployment Docs](https://nextjs.org/docs/app/building-your-application/deploying).

---

## Contributing

Pull requests are welcome! Please follow these guidelines:

1. **Branch naming**: `feature/<topic>` or `fix/<issue-id>`
2. **Lint & test** before committing (`pnpm lint && pnpm test`)
3. Use [Conventional Commits](https://www.conventionalcommits.org/) for messages
4. For major changes, open an Issue or Discussion first.

---

## Author & Contact

| Role       | Name            | Email                                                          | GitHub                                        |
| ---------- |-----------------| -------------------------------------------------------------- |-----------------------------------------------|
| Maintainer | **Zhao Hongyu** | [nathan\_115210@hotmail.com](mailto:nathan_115210@hotmail.com) | [Zhao Hongyu](https://github.com/nathan115210) |

Feel free to reach out for questions, suggestions, or contributions.

---

## License

Licensed under the **[MIT License](LICENSE)**.
