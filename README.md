# Ad Campaign Management Platform - Frontend

Modern, production-ready frontend for ad campaign management and analytics, built with Next.js 14, React, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern Stack**: Next.js 14 App Router, React 18, TypeScript
- **Responsive Design**: Mobile-first with Tailwind CSS
- **Dark Mode**: Professional dark theme UI
- **Authentication**: JWT-based auth with automatic token refresh
- **Campaign Management**: Create, edit, and manage ad campaigns
- **Real-time Analytics**: Interactive charts and metrics with Recharts
- **Form Validation**: React Hook Form with Zod validation
- **API Integration**: Axios with interceptors for seamless backend communication
- **Production Ready**: Optimized builds, SEO-friendly, fast performance

## 📋 Prerequisites

- **Node.js**: v18.x or higher
- **npm**: v9.x or higher
- **Backend API**: ads-platform-backend running

## 🛠️ Installation

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ads-platform-frontend.git
   cd ads-platform-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=https://ads-platform-backend-9eej.onrender.com/api
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Build for Production

```bash
npm run build
npm start
```

The optimized production build will be available at `http://localhost:3000`.

## 🐳 Docker Deployment

### Build the Docker image

```bash
docker build -t ads-platform-frontend .
```

### Run with Docker

```bash
docker run -d \
  -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api \
  --name ads-frontend \
  ads-platform-frontend
```

## ☁️ Vercel Deployment (Recommended)

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/ads-platform-frontend)

### Manual Deployment

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Set Environment Variables**
   
   In Vercel Dashboard → Settings → Environment Variables:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-api.com/api
   ```

4. **Deploy to Production**
   ```bash
   vercel --prod
   ```

### Vercel Configuration

The project includes optimized settings for Vercel:
- Automatic deployments on git push
- Preview deployments for PRs
- Edge Network for global CDN
- Automatic HTTPS
- Zero-config deployment

### Custom Domain

1. Go to Vercel Dashboard → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. SSL certificates are automatically provisioned

## 🌍 Environment Variables

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | `https://ads-platform-backend-9eej.onrender.com/api` | Yes |

**Important**: All environment variables used in client-side code must be prefixed with `NEXT_PUBLIC_`.

## 📁 Project Structure

```
ads-platform-frontend/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (auth)/            # Authentication pages
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── (dashboard)/       # Protected dashboard pages
│   │   │   ├── dashboard/
│   │   │   ├── campaigns/
│   │   │   └── analytics/
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Landing page
│   ├── components/
│   │   ├── layout/            # Layout components
│   │   │   ├── Sidebar.tsx
│   │   │   └── Navbar.tsx
│   │   └── ui/                # Reusable UI components
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Input.tsx
│   │       ├── Table.tsx
│   │       └── Badge.tsx
│   ├── lib/                   # Utilities
│   │   ├── api.ts            # Axios instance
│   │   ├── auth.ts           # Auth utilities
│   │   └── utils.ts          # Helper functions
│   └── types/                 # TypeScript types
│       └── index.ts
├── public/                    # Static assets
├── .env.local.example        # Environment template
├── next.config.js            # Next.js configuration
├── tailwind.config.js        # Tailwind CSS config
├── tsconfig.json             # TypeScript config
├── Dockerfile                # Docker configuration
└── package.json
```

## 🎨 UI Components

### Button Component
```tsx
<Button variant="primary" size="md" onClick={handleClick}>
  Click me
</Button>
```

Variants: `primary`, `secondary`, `outline`, `ghost`, `danger`

### Card Component
```tsx
<Card>
  <Card.Header>
    <h3>Title</h3>
  </Card.Header>
  <Card.Content>Content here</Card.Content>
</Card>
```

### Form Components
```tsx
<Input
  label="Email"
  type="email"
  placeholder="Enter email"
  error={errors.email?.message}
/>
```

## 🔐 Authentication

### Demo Credentials

For testing purposes:
- **Email**: admin@example.com
- **Password**: admin123

### Auth Flow

1. Login/Register at `/login` or `/register`
2. JWT tokens stored in localStorage
3. Automatic token refresh on API calls
4. Protected routes redirect to login if unauthenticated
5. Role-based access (Admin features only for admin users)

### Token Management

Tokens are automatically managed:
- Access token stored in localStorage
- Refresh token used to get new access token
- Automatic retry on 401 errors
- Logout clears all tokens

## 📊 Available Pages

| Route | Description | Auth Required |
|-------|-------------|---------------|
| `/` | Landing page | No |
| `/login` | User login | No |
| `/register` | User registration | No |
| `/dashboard` | Main dashboard | Yes |
| `/campaigns` | Campaign list | Yes |
| `/campaigns/new` | Create campaign | Yes |
| `/analytics` | Analytics overview | Yes |

## 🚀 Deployment Options

### Vercel (Recommended)
- **Pros**: Zero-config, automatic deployments, global CDN, serverless
- **Setup**: Connect GitHub repo, add env vars, deploy
- **Free Tier**: Generous limits for most projects

### Netlify
```bash
npm run build
netlify deploy --prod --dir=.next
```

### AWS Amplify
1. Connect GitHub repository
2. Set build settings: `npm run build`
3. Add environment variables
4. Deploy automatically

### DigitalOcean App Platform
1. Create new app from GitHub
2. Select repository
3. Configure environment variables
4. Auto-deploy on push

### Docker + Any VPS
```bash
docker build -t ads-frontend .
docker run -d -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api \
  ads-frontend
```

## 🎯 Performance Optimization

This app includes:
- **Static Generation**: Pages pre-rendered at build time
- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Next.js Image component
- **Font Optimization**: Automatic font optimization
- **Bundle Analysis**: Use `npm run build` to see bundle sizes

## 🧪 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
```

### Code Quality

- **TypeScript**: Full type safety
- **ESLint**: Code linting and formatting
- **Tailwind CSS**: Utility-first styling
- **Component Library**: Reusable UI components

## 🐛 Troubleshooting

### API Connection Issues
- Verify backend is running
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Ensure CORS is configured on backend
- Check browser console for errors

### Build Errors
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Vercel Deployment Issues
- Check build logs in Vercel dashboard
- Verify environment variables are set
- Ensure backend API is accessible from Vercel servers
- Check API URL includes protocol (https://)

### Authentication Problems
- Clear localStorage: `localStorage.clear()`
- Check network tab for API responses
- Verify JWT tokens are valid
- Ensure backend JWT_SECRET matches

## 🔧 Configuration

### Next.js Config
Edit `next.config.js` for:
- Custom webpack config
- Image domains
- Redirects and rewrites
- Environment variables

### Tailwind Config
Edit `tailwind.config.js` for:
- Custom colors
- Typography
- Spacing
- Breakpoints

## 📱 Responsive Design

Breakpoints:
- **sm**: 640px (Mobile)
- **md**: 768px (Tablet)
- **lg**: 1024px (Desktop)
- **xl**: 1280px (Large Desktop)
- **2xl**: 1536px (Extra Large)

## 🎨 Theming

The app uses a dark theme by default. To customize:

1. Edit `tailwind.config.js` colors
2. Update component styles
3. Modify `src/app/globals.css`

## 📈 Analytics Integration

To add analytics (Google Analytics, Mixpanel, etc.):

1. Install analytics package
2. Add tracking code in `src/app/layout.tsx`
3. Track events in components
4. Add `NEXT_PUBLIC_GA_ID` to environment variables

## 🔐 Security

- All API calls use HTTPS in production
- JWT tokens stored in localStorage (consider httpOnly cookies for enhanced security)
- CSRF protection via SameSite cookies
- XSS protection via React's automatic escaping
- No sensitive data in client-side code

## 📝 License

MIT

## 👥 Support

For issues and questions:
- Open an issue on GitHub
- Check backend API status
- Review Vercel deployment logs
- Check browser console for errors

---

Built with ❤️ using Next.js, React, TypeScript, and Tailwind CSS
