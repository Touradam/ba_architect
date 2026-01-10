# Aminata Bah - Architecture Portfolio (Next.js)

A modern, elegant portfolio website built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui for Masters in Architecture student Aminata Bah.

## ✨ Features

- **Modern Stack**: Built with Next.js 14, React 18, and TypeScript
- **Beautiful UI**: Styled with Tailwind CSS and shadcn/ui components
- **Smooth Animations**: Powered by Framer Motion
- **PDF Integration**: View and download portfolio and resume directly from the site
- **Fully Responsive**: Optimized for all devices (desktop, tablet, mobile)
- **Performance Optimized**: Static export for fast loading and easy deployment
- **SEO Friendly**: Proper meta tags and semantic HTML

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Add your PDF files:
Place `BA.A portfolio.pdf` and `BA.A resume.pdf` in the `public/` directory.

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Build & Deploy

### Build for Production

```bash
npm run build
```

This creates a static export in the `/out` directory.

### Deployment Options

#### Vercel (Recommended)
1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Deploy automatically

#### Netlify
1. Run `npm run build`
2. Drag and drop the `/out` folder to [Netlify](https://netlify.com)

#### GitHub Pages
1. Run `npm run build`
2. Push the `/out` directory to your `gh-pages` branch

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 📂 Project Structure

```
portfolio-nextjs/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── AboutSection.tsx
│   ├── ContactSection.tsx
│   ├── Footer.tsx
│   ├── HeroSection.tsx
│   ├── Navigation.tsx
│   ├── PDFViewer.tsx
│   └── WorkSection.tsx
├── lib/
│   └── utils.ts
├── public/
│   ├── BA.A portfolio.pdf
│   └── BA.A resume.pdf
└── package.json
```

## 🎨 Customization

### Update Personal Information

Edit the following files:
- `app/layout.tsx` - Meta description and title
- `components/HeroSection.tsx` - Name and subtitle
- `components/AboutSection.tsx` - About text and stats
- `components/ContactSection.tsx` - Email and LinkedIn

### Change Colors

Modify the color scheme in `app/globals.css` under the `:root` CSS variables.

### Add More Sections

Create new components in the `components/` folder and import them in `app/page.tsx`.

## 📄 License

This project is open source and available for personal and commercial use.

## 👤 Contact

**Aminata Bah**
- Email: aminatabah01012018@icloud.com
- LinkedIn: [Aminata Bah](https://www.linkedin.com/in/aminata-bah-bb6398399/)

---

**Built with 💜 for architecture portfolios**


