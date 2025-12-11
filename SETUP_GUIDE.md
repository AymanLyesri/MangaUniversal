# MangaUniversal - Complete Setup Guide

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm installed
- Backend API running on `http://localhost:8080`

### Start Development Server

```bash
# Install dependencies (first time only)
npm install

# Start the app
npm start
```

Open http://localhost:4200 in your browser!

---

## 📁 Project Overview

This is a complete Angular manga reader with:

✅ **Search functionality** - Find manga by title
✅ **Manga details** - View cover, description, tags, authors
✅ **Chapter list** - Browse all available chapters
✅ **Reader** - Full-screen reading experience with navigation
✅ **Dark/Light theme** - Auto-detects system preference
✅ **Responsive design** - Works on all devices

---

## 🎨 Design Features

### Minimalistic UI

- Clean, distraction-free interface
- Generous spacing with Tailwind utilities
- Smooth transitions and hover effects
- Custom semantic color tokens

### Theme System

- Automatic OS theme detection
- Manual theme toggle (sun/moon icon in header)
- Instant theme switching without flicker
- Custom CSS variables for easy customization

### Reader Experience

- Fullscreen mode with auto-hiding controls
- Keyboard navigation (arrows + ESC)
- Click navigation (left/right zones)
- Page number input for quick jumping
- Mobile-friendly touch controls

---

## 🏗️ Architecture

### Components

```
HeaderComponent (Standalone)
├── Theme toggle button
└── Logo/navigation

SearchComponent (Standalone)
├── Search input with debounce
├── Results grid (responsive)
└── MangaCardComponent (x N)

MangaDetailsComponent (Standalone)
├── Cover image
├── Metadata sidebar
├── Description & tags
└── ChapterListComponent
    └── Chapter links to reader

ReaderComponent (Standalone)
├── Fullscreen page display
├── Navigation controls
└── Keyboard/mouse handlers
```

### Services

**MangaService**

- HTTP calls to backend API
- Typed responses with RxJS
- Error handling

**ThemeService**

- System theme detection
- Manual theme override
- LocalStorage persistence

### Routing

- `/` → Search page
- `/manga/:id/:slug` → Details page (with resolvers)
- `/manga/:id/:slug/read/:chapter/:page` → Reader

---

## 🔧 Customization

### Colors

Edit `src/styles.scss`:

```scss
:root {
  --color-primary: 59 130 246; /* Blue */
  --color-surface: 255 255 255; /* White */
}

.dark {
  --color-primary: 96 165 250; /* Light blue */
  --color-surface: 15 15 15; /* Near black */
}
```

### Tailwind Theme

Edit `tailwind.config.js`:

```js
theme: {
  extend: {
    colors: {
      primary: 'rgb(var(--color-primary) / <alpha-value>)',
    }
  }
}
```

### API Endpoint

Change the base URL in `src/app/services/manga.service.ts`:

```typescript
private readonly baseUrl = 'http://localhost:8080/api';
```

---

## 📡 Backend Requirements

The frontend expects these endpoints:

- `GET /api/manga/search?q={query}`
- `GET /api/manga/{id}`
- `GET /api/manga/{id}/chapters`
- `GET /api/chapter/{id}/pages`

See `API_REFERENCE.md` for full specifications.

---

## 🧪 Testing

```bash
# Run unit tests
npm test

# Build for production
npm run build
```

---

## 📦 File Structure

```
src/
├── app/
│   ├── components/
│   │   ├── header/
│   │   ├── search/
│   │   ├── manga-card/
│   │   ├── manga-details/
│   │   ├── chapter-list/
│   │   └── reader/
│   ├── services/
│   │   ├── manga.service.ts
│   │   └── theme.service.ts
│   ├── models/
│   │   └── manga.model.ts
│   ├── resolvers/
│   │   ├── manga-details.resolver.ts
│   │   └── chapters.resolver.ts
│   ├── utils/
│   │   └── helpers.ts
│   ├── app-routing.module.ts
│   ├── app.component.ts
│   └── app.module.ts
├── styles.scss
└── index.html
```

---

## 💡 Key Features Explained

### 1. Automatic Theme Detection

The app detects your OS theme preference on load using:

```typescript
window.matchMedia("(prefers-color-scheme: dark)");
```

### 2. Route Resolvers

Data is loaded before navigation completes:

```typescript
resolve: {
  manga: mangaDetailsResolver,
  chapters: chaptersResolver
}
```

### 3. OnPush Change Detection

All components use `ChangeDetectionStrategy.OnPush` for better performance.

### 4. Debounced Search

Search input has 400ms debounce to avoid excessive API calls.

### 5. Responsive Grid

Manga cards use Tailwind's responsive grid:

```html
grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6
```

---

## 🐛 Troubleshooting

### Backend Connection Issues

- Ensure backend is running on port 8080
- Check CORS is enabled on backend
- Verify API endpoints match specification

### Tailwind Not Working

- Run `npm install` to ensure Tailwind is installed
- Check `styles.scss` has `@tailwind` directives
- Verify `tailwind.config.js` exists

### Theme Not Switching

- Check browser DevTools for errors
- Verify ThemeService is provided in root
- Clear localStorage: `localStorage.clear()`

---

## 📝 Next Steps

1. **Start the app**: `npm start`
2. **Search for manga**: Try "One Piece" or "Naruto"
3. **Browse chapters**: Click a manga card
4. **Read**: Click a chapter to open the reader
5. **Toggle theme**: Click sun/moon icon in header

---

## 🎯 Best Practices Used

✅ Standalone components
✅ OnPush change detection
✅ Async pipe (no manual subscriptions)
✅ Route resolvers for data loading
✅ Reactive state with BehaviorSubject
✅ TypeScript strict mode
✅ Semantic HTML
✅ Accessible keyboard navigation
✅ Error handling and loading states
✅ Responsive design
✅ SEO-friendly meta tags

---

## 📚 Learn More

- [Angular Documentation](https://angular.io/docs)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [RxJS Guide](https://rxjs.dev/guide/overview)
- API Reference: See `API_REFERENCE.md`

---

**Enjoy reading manga! 📖**
