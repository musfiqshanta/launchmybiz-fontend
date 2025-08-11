## LLC Formation Frontend (React + Vite)

Modern single‑page application for LLC formation and related services. Built with React, Vite, Material UI, React Router, and Stripe. Includes production Docker build served by NGINX, and a dev proxy to the backend.

### Key Features
- **Marketing pages**: Home, Why Us, Testimonials, FAQs
- **LLC workflow**: Multi‑step forms (`BusinessForm`), package selection modal
- **Auth/Admin**: `Signin`, `SignUp`, protected routes via `AdminRoute`, `AdminPanel`
- **Payments**: Stripe integration (`@stripe/stripe-js`), success handling
- **Quality of life**: React Query, Formik + Yup validation, Lottie animations

### Tech Stack
- **Frontend**: React 19, Vite 6, React Router 7, MUI 7
- **State/Data**: @tanstack/react-query
- **Forms**: Formik + Yup
- **Animations/UI**: framer-motion, lottie-react, Keen Slider/Swiper
- **Tooling**: ESLint 9, vite dev server proxy

---

## Getting Started

### Prerequisites
- Node.js 18+ (Docker uses `node:18-alpine`)
- npm 9+

### Install
```bash
npm install
```

### Run (development)
```bash
npm run dev
```

The app runs on `http://localhost:5173` by default. A dev proxy forwards `/api` requests to the configured backend (see Proxy section below).

### Lint
```bash
npm run lint
```

### Build (production)
```bash
npm run build
```

### Preview production build
```bash
npm run preview
```

---

## Project Scripts
- **dev**: start Vite dev server with HMR
- **build**: create optimized production build in `dist`
- **preview**: serve `dist` locally for sanity checks
- **lint**: run ESLint against the project

---

## Environment Variables
Use a `.env` file in the project root. Variables consumed by Vite must be prefixed with `VITE_`.

Common examples (adjust as needed):
```env
# Example: Stripe publishable key
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Example: API base URL used by your code (if not relying on the dev proxy)
VITE_API_BASE_URL=https://your.api.example.com
```

Access in code via `import.meta.env.VITE_*`.

---

## API Proxy (development)
The dev server proxies `/api` to your backend. See `vite.config.js`:

```js
server: {
  proxy: {
    '/api': {
      target: 'https://lauchbackend-896056687002.europe-west1.run.app',
      changeOrigin: true,
      secure: false,
    },
  },
}
```

- During `npm run dev`, any request to `/api/...` is forwarded to the backend.
- For production builds, ensure your frontend fetches the correct backend URL (via environment variables, relative paths behind the same domain, or your reverse proxy).

---

## Docker (production image)

This repo includes a multi‑stage Dockerfile that builds the React app and serves it via NGINX.

### Build image
```bash
docker build -t llc-frontend .
```

### Run container
```bash
docker run --rm -p 8080:80 llc-frontend
```

App will be available at `http://localhost:8080`.

### NGINX
`nginx.conf` is configured for single‑page apps:

```nginx
location / {
  root /usr/share/nginx/html;
  index index.html;
  try_files $uri $uri/ /index.html;
}
```

---

## Folder Structure (high level)
```
launch/
  public/                # static assets (robots.txt, sitemap.xml, images)
  src/
    assets/              # images and static media
    components/          # UI components and feature modules
      modals/
    Screens/             # routed pages/layouts
    lib/                 # helpers (e.g., AdminRoute)
    animations/          # Lottie JSON
  vite.config.js         # dev proxy, plugins
  Dockerfile             # production build and NGINX serve
  nginx.conf             # SPA routing
```

Notable components/pages (non‑exhaustive):
- `components/AdminLoginPage.jsx`, `components/AdminPanel.jsx`
- `components/StripePaymentInfro.jsx`, `components/PaymentSuccess.jsx`
- `Screens/HomePage.jsx`, `Screens/BusinessForm.jsx`, `Screens/DashboardLayout.jsx`
- `lib/AdminRoute.jsx` for guarding admin routes

---

## Troubleshooting
- If API calls fail in dev, verify the proxy target in `vite.config.js` is correct and reachable.
- For 404s on hard refresh in production, ensure your reverse proxy mirrors the SPA `try_files` rule.
- If Stripe fails to initialize, verify `VITE_STRIPE_PUBLISHABLE_KEY` is set and the domain/origin is allowed in your Stripe dashboard.
- Node version mismatches can cause install/build issues; use Node 18+.

---

## License
Proprietary. All rights reserved. Contact the owner for usage permissions.
