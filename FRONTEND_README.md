# MangaUniversal - Angular Manga Reader

A modern, minimalistic manga reader built with **Angular 16**, **TypeScript**, and **TailwindCSS**.

## Features

✨ **Minimalistic & Clean Design** - Distraction-free reading experience
🌓 **Auto Dark/Light Mode** - Automatically adapts to system theme with manual toggle
📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile
⌨️ **Keyboard Navigation** - Arrow keys for page navigation, ESC to exit reader
🎨 **Tailwind CSS** - Modern utility-first styling with custom theme
🚀 **Angular Best Practices** - Standalone components, OnPush change detection, resolvers
📖 **Fullscreen Reader** - Immersive reading with auto-hiding controls

## Tech Stack

- **Angular 16** - Frontend framework
- **TypeScript** - Type-safe development
- **TailwindCSS** - Utility-first CSS framework
- **RxJS** - Reactive programming
- **MangaDex API** - Backend manga data source (via local proxy)

## Project Structure

```
src/app/
├── components/
│   ├── header/              # App header with theme toggle
│   ├── search/              # Homepage with manga search
│   ├── manga-card/          # Reusable manga card component
│   ├── manga-details/       # Manga details page
│   ├── chapter-list/        # Chapter list component
│   └── reader/              # Fullscreen reader
├── services/
│   ├── manga.service.ts     # API service for manga data
│   └── theme.service.ts     # Theme management
├── models/
│   └── manga.model.ts       # TypeScript interfaces
├── resolvers/
│   ├── manga-details.resolver.ts
│   └── chapters.resolver.ts
└── utils/
    └── helpers.ts           # Utility functions
```

## Routes

- `/` - Homepage with search
- `/manga/:id/:slug` - Manga details with chapter list
- `/manga/:id/:slug/read/:chapter/:page` - Reader

## Prerequisites

- Node.js 16+ and npm
- Angular CLI (`npm install -g @angular/cli`)
- Backend API running on `http://localhost:8080` (see API_REFERENCE.md)

## Installation

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start the development server:**

   ```bash
   npm start
   ```

3. **Open your browser:**
   Navigate to `http://localhost:4200`

## Backend Setup

This frontend requires a backend API running on `http://localhost:8080`. Refer to `API_REFERENCE.md` for the complete API specification.

## Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Theme System

The app uses a dual-theme system:

- **Auto Mode (Default)**: Detects system preference via `prefers-color-scheme`
- **Manual Override**: Click the theme toggle in the header
- **CSS Variables**: Semantic color tokens for easy customization

### Customizing Theme Colors

Edit `src/styles.scss` to modify theme colors:

```scss
:root {
  --color-surface: 255 255 255;
  --color-primary: 59 130 246;
  // ... more colors
}

.dark {
  --color-surface: 15 15 15;
  --color-primary: 96 165 250;
  // ... more colors
}
```

## Reader Controls

### Keyboard Shortcuts

- `→` - Next page
- `←` - Previous page
- `ESC` - Exit reader

### Mouse Controls

- Click left side - Previous page
- Click right side - Next page
- Bottom controls - Page navigation

## Development

### Component Architecture

All components use:

- Standalone components
- OnPush change detection
- Async pipe for subscriptions
- Reactive state management with BehaviorSubject

### Code Style

- Use semantic HTML
- Tailwind utility classes for styling
- TypeScript strict mode
- RxJS best practices (takeUntil for cleanup)

## API Integration

The `MangaService` provides methods for:

- `searchManga(query)` - Search manga by title
- `getMangaDetails(id)` - Get manga details
- `getMangaChapters(id)` - Get chapter list
- `getChapterPages(chapterId)` - Get page URLs

All methods return Observables with proper error handling.

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## License

This project is for educational purposes.

## Credits

- Manga data provided by MangaDex API
- Icons from Heroicons
