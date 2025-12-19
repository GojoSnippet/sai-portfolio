# Sai's Portfolio Website

A modern 3D portfolio website built with React, Three.js, and Tailwind CSS.

## 🚀 Features

- **3D Hero Section** with floating clouds and animated character
- **Responsive Design** - works on all devices
- **Smooth Animations** with Framer Motion
- **Interactive Experience Timeline** with 3D character
- **Project Showcase** with hover effects
- **Contact Form** (ready for EmailJS integration)
- **Modern UI** with glass morphism and gradient effects

## 🛠️ Tech Stack

- React 18 + TypeScript
- Vite (build tool)
- Three.js + React Three Fiber + Drei
- Tailwind CSS v4
- Framer Motion

## 📦 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Extract the zip file
2. Navigate to the project folder:
   ```bash
   cd sai-portfolio
   ```

3. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

5. Open http://localhost:5173 in your browser

### Build for Production

```bash
npm run build
```

The build files will be in the `dist` folder.

## 🎨 Customization

### Update Your Information

Edit `src/constants/index.ts` to update:
- Your name and title
- About section content
- Experience/work history
- Projects
- Social links
- Contact information

### Change Colors

Edit `tailwind.config.js` and `src/index.css` to modify the color scheme.

### Swap 3D Models

Replace the 3D character in:
- `src/components/canvas/HeroCanvas.tsx` (hero character)
- `src/components/Experience.tsx` (experience section character)

You can find free 3D models at:
- Sketchfab (https://sketchfab.com/features/gltf)
- ReadyPlayerMe (https://readyplayer.me/)
- Poly Pizza (https://poly.pizza/)

## 📧 Email Integration

To enable the contact form:

1. Sign up at EmailJS (https://www.emailjs.com/)
2. Create a service and email template
3. Add your credentials to a `.env` file:
   ```
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```
4. Update `src/components/Contact.tsx` to use EmailJS

## 🚀 Deployment

### Netlify

1. Push your code to GitHub
2. Connect your repo to Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`

### Vercel

1. Push your code to GitHub
2. Import project to Vercel
3. It will auto-detect Vite settings

## 📝 License

Feel free to use this template for your own portfolio!

---

Built with ❤️ by Sai
