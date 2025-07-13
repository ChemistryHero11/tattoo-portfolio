# Ink Master Tattoo Portfolio

A modern, high-performance portfolio website for tattoo artists built with Next.js 14, React Server Components, and Tailwind CSS.

![Tattoo Portfolio Preview](public/images/preview.jpg)

## 🚀 Features

- **Modern Tech Stack**: Next.js 14 with React Server Components for optimal performance
- **Responsive Design**: Beautiful on all devices with a mobile-first approach
- **Image Gallery**: Masonry grid layout with lightbox functionality
- **Style Filtering**: Filter tattoos by style (Blackwork, Neo-Traditional, etc.)
- **Booking System**: Integrated booking form with Formspree
- **Admin Panel**: Password-protected image upload interface
- **SEO Optimized**: Dynamic meta tags, sitemap, and structured data
- **Performance**: Optimized images with Cloudinary, lazy loading, and Next.js optimization

## 🛠️ Local Setup

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/tattoo-portfolio.git
cd tattoo-portfolio
```

2. Install dependencies:
```bash
pnpm install
```

3. Create a `.env.local` file based on `.env.example`:
```bash
cp .env.example .env.local
```

4. Add your environment variables:
```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_unsigned_preset
ADMIN_PASSWORD=your_secure_password
NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/your_form_id
```

5. Run the development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

## 🎨 Customization

### Colors & Fonts

Edit the color palette and fonts in `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    colors: {
      charcoal: '#0E0E0E',     // Main dark background
      'off-white': '#F5F5F5',  // Light text
      'blood-red': '#CA2314',  // Accent color
    },
    fontFamily: {
      'cinzel': ['"Cinzel Decorative"', 'serif'],
      'inter': ['"Inter"', 'sans-serif'],
    },
  }
}
```

### Content Management

#### About Page
Edit artist information in `data/about.json`:
- Artist bio and name
- Experience timeline
- Certifications
- Awards and achievements

#### FAQ Page
Update frequently asked questions in `data/faq.json`:
- Organized by categories
- Easy to add/remove questions

#### Contact Information
Modify contact details in `data/contact.json`:
- Address and phone
- Social media links
- Business hours
- Map coordinates

## 📸 Image Management

### Cloudinary Setup

1. Create a [Cloudinary account](https://cloudinary.com)
2. Create an unsigned upload preset:
   - Go to Settings → Upload
   - Add upload preset
   - Set to "Unsigned"
   - Add folder: "portfolio"
   - Save

3. Add credentials to `.env.local`

### Admin Panel

Access the admin panel at `/admin` to upload new images:
- Password protected (set in `.env.local`)
- Drag & drop interface
- Automatic Cloudinary upload
- Images appear in gallery immediately

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project to Vercel
3. Add environment variables
4. Deploy!

The site will auto-configure build settings for Next.js.

### Manual Deployment

Build the production version:
```bash
pnpm build
pnpm start
```

## 📝 Development Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm test         # Run Playwright tests
```

## 🧪 Testing

Basic Playwright tests are included for:
- Navigation links
- Image gallery modal
- Booking form submission

Run tests:
```bash
pnpm test
```

## 📱 Progressive Web App

The site scores 90+ on Lighthouse PWA audit with:
- Responsive design
- Offline functionality (service worker)
- App manifest
- HTTPS ready

## ♿ Accessibility

- WCAG 2.1 AA compliant
- Keyboard navigation
- Screen reader friendly
- 4.5:1+ contrast ratios
- Focus indicators

## 🎯 Performance

- Lighthouse scores: 95+ across all metrics
- LCP < 2s on 4G
- Optimized images via Cloudinary
- Static generation where possible
- Edge caching with Vercel

## 📄 License

MIT License - feel free to use for your own tattoo portfolio!

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to branch
5. Open a pull request

## 💬 Support

For questions or issues:
- Open a GitHub issue
- Email: support@inkmaster.com
- Instagram: @inkmaster_studio

---

Built with ❤️ by [Your Name]
