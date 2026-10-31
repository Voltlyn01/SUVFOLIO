# Suvajit Saha — Personal Portfolio Website

A fast, lightweight, and modern personal portfolio website built with **pure HTML5, CSS3, and vanilla JavaScript (ES6+)**. Framework-free with zero runtime dependencies.

---

## 🌟 Overview & Identity

- **Name:** SUVAJIT SAHA
- **Profession:** WEB DEVELOPER / UI/UX DESIGNER
- **Role:** Founder — [Vyronix LabsDevs](https://vyronix-labsdevs.vercel.app/)
- **Contact Email:** [workwithsuvajit@gmail.com](mailto:workwithsuvajit@gmail.com)
- **Instagram:** [@noteryx.in](https://www.instagram.com/noteryx.in?srtk=ODN5MnRxZXRiZHRh)
- **LinkedIn:** [suvajitsaha123](https://www.linkedin.com/in/suvajitsaha123/)

---

## 🚀 Key Features

1. **Framework-Free Static Architecture:** Zero React, JSX, Tailwind, or bundler bloat. Runs instantly directly from disk or any static host.
2. **Futuristic Dark Aesthetic:** Cohesive cyan, electric blue, and purple neon glow effects with glassmorphic cards and floating workspace illustration.
3. **Responsive & Mobile First:** Seamlessly tested across desktop (1440px), laptop (1024px), tablet (768px), mobile (390px), and compact screens (320px).
4. **Accessible (WCAG Compliance):** Keyboard navigation, semantic landmarks (`header`, `nav`, `main`, `section`, `article`, `footer`), visible focus rings, and `aria-live` status announcements.
5. **Interactive UI:** Smooth anchor scrolling, active section scroll spy, mobile hamburger drawer, modal dialogs, and expandable biography.
6. **Formspree Contact Form:** Clean AJAX submission with duplicate prevention, loading spinner, and graceful feedback states.

---

## 📁 Project Structure

```
PORTFOLIO/
├── index.html                  # Semantic HTML5 single-page application structure
├── css/
│   └── style.css              # Consolidated modular CSS3 styling system
├── js/
│   └── script.js              # Vanilla JavaScript (ES6+) interactivity & Formspree AJAX
├── assets/
│   ├── images/
│   │   ├── hero.png           # Hero illustration backdrop asset
│   │   ├── fitindia-preview.svg      # XY.FITNESS project preview
│   │   └── securechatting-preview.svg # VanishText SecureChatting preview
│   ├── icons/
│   │   └── favicon.svg        # Official SS logo vector favicon
│   └── resume.pdf             # Official curriculum vitae PDF
├── favicon.svg                 # Root level favicon fallback
├── resume.pdf                  # Root level resume download fallback
├── .gitignore                  # Git ignore rules for clean repository
└── README.md                   # Complete documentation & deployment guide
```

---

## 📬 Formspree Setup Instructions

The contact form is configured to work with [Formspree](https://formspree.io) to deliver submissions directly to `workwithsuvajit@gmail.com` without any paid API keys.

### Configured Formspree Endpoint:
- **Formspree Form ID:** `mbggzgzn`
- **Formspree Action Endpoint:** `https://formspree.io/f/mbggzgzn`
- **Destination Email:** `workwithsuvajit@gmail.com`

The contact form is already configured with your live endpoint in both `js/script.js` and `index.html`. You can test form submissions directly on your live website or local environment.

---

## 🌐 Deployment Instructions

### 1. Deploy to GitHub Pages (Free)

1. Create a new GitHub repository (e.g., `portfolio` or `<your-username>.github.io`).
2. Push or upload all repository files (`index.html`, `css/`, `js/`, `assets/`, `README.md`, etc.) to the `main` branch:
   ```bash
   git init
   git add .
   git commit -m "Convert portfolio to pure HTML, CSS & vanilla JS"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
3. In GitHub, navigate to **Settings** → **Pages** (under Code and automation).
4. Under **Branch**, select `main` and `/ (root)`, then click **Save**.
5. Your website will be live in 1–2 minutes at `https://<your-username>.github.io/<repo-name>/`.

---

### 2. Deploy to Vercel (Free)

1. Visit [vercel.com](https://vercel.com) and log in with your GitHub account.
2. Click **"Add New..."** → **"Project"**.
3. Import your GitHub portfolio repository.
4. In the configuration screen:
   - **Framework Preset:** Select `Other` (Static HTML).
   - **Root Directory:** `./`
   - **Build Command:** Leave blank (no build step needed).
   - **Output Directory:** Leave blank (root).
5. Click **"Deploy"**.
6. Vercel will instantly publish your static website globally on edge CDN at `https://<your-project>.vercel.app`.

---

## 🛠️ Local Development & Testing

Since this is a 100% static project, you do not need `npm install` or any build tooling:
- **Direct file opening:** Double-click `index.html` to open directly in Google Chrome, Mozilla Firefox, Microsoft Edge, or Apple Safari.
- **Local Static Server:**
  ```bash
  # Python 3
  python -m http.server 8000

  # Node.js npx
  npx serve .
  ```
- Open `http://localhost:8000` in your web browser.

---

## 📄 License & Ownership

&copy; 2026 Suvajit Saha. All rights reserved.
Founder — [Vyronix LabsDevs](https://vyronix-labsdevs.vercel.app/).
