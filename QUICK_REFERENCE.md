# ⚡ MangaUniversal - Quick Reference

## 🚀 Commands

```bash
npm install          # Install dependencies
npm start            # Start dev server (port 4200)
npm run build        # Production build
npm test             # Run tests
```

## 📂 Key Files

| File                                | Purpose                  |
| ----------------------------------- | ------------------------ |
| `src/app/services/manga.service.ts` | API calls                |
| `src/app/services/theme.service.ts` | Theme logic              |
| `src/styles.scss`                   | Global styles + Tailwind |
| `tailwind.config.js`                | Tailwind theme config    |
| `src/app/app-routing.module.ts`     | Routes                   |

## 🛣️ Routes

```typescript
/                                    // Search page
/manga/:id/:slug                     // Manga details
/manga/:id/:slug/read/:chapter/:page // Reader
```

## 🎨 Theme Colors (CSS Variables)

### Light Mode

```scss
--color-surface: 255 255 255        // White
--color-primary: 59 130 246         // Blue
--color-text-primary: 17 24 39      // Dark gray
```

### Dark Mode

```scss
--color-surface: 15 15 15           // Near black
--color-primary: 96 165 250         // Light blue
--color-text-primary: 243 244 246   // Light gray
```

Edit in: `src/styles.scss`

## 📡 API Endpoints

```typescript
baseUrl = 'http://localhost:8080/api'

GET /manga/search?q={query}         // Search
GET /manga/{id}                     // Details
GET /manga/{id}/chapters            // Chapters
GET /chapter/{id}/pages             // Page URLs
```

Change URL in: `src/app/services/manga.service.ts`

## 🧩 Components

```
HeaderComponent          → App header + theme toggle
SearchComponent          → Homepage + search
MangaCardComponent       → Reusable card
MangaDetailsComponent    → Details page
ChapterListComponent     → Chapter list
ReaderComponent          → Fullscreen reader
```

All are **standalone** with **OnPush** change detection.

## ⌨️ Keyboard Shortcuts (Reader)

```
→ (Right Arrow)    Next page
← (Left Arrow)     Previous page
ESC                Exit reader
```

## 🔧 Common Customizations

### Change Primary Color

```scss
// src/styles.scss
:root {
  --color-primary: 59 130 246; // Your RGB values
}
```

### Change API URL

```typescript
// src/app/services/manga.service.ts
private readonly baseUrl = 'https://your-api.com/api';
```

### Modify Card Grid

```html
<!-- src/app/components/search/search.component.html -->
<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"></div>
```

### Adjust Search Debounce

```typescript
// src/app/components/search/search.component.ts
debounceTime(400); // Change to your preferred ms
```

## 🏗️ Component Structure

```typescript
@Component({
  selector: 'app-example',
  standalone: true,                    // ← Standalone
  imports: [CommonModule, ...],        // ← Direct imports
  templateUrl: './example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush  // ← OnPush
})
export class ExampleComponent {
  data$ = new BehaviorSubject<Data | null>(null);  // ← Reactive state

  constructor(private service: Service) {}

  ngOnDestroy() {
    this.destroy$.next();               // ← Cleanup
    this.destroy$.complete();
  }
}
```

## 📦 State Management Pattern

```typescript
// Component
data$ = new BehaviorSubject<Data[]>([]);
loading$ = new BehaviorSubject<boolean>(false);
error$ = new BehaviorSubject<string | null>(null);

// Template
<div *ngIf="loading$ | async">Loading...</div>
<div *ngIf="error$ | async as error">{{ error }}</div>
<div *ngFor="let item of data$ | async">{{ item }}</div>
```

## 🎯 Service Pattern

```typescript
@Injectable({ providedIn: "root" })
export class DataService {
  getData(): Observable<Data> {
    return this.http.get<Data>(url).pipe(
      map((response) => response.data),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error("Error:", error);
    return throwError(() => new Error("Something went wrong"));
  }
}
```

## 🔄 Resolver Pattern

```typescript
export const dataResolver: ResolveFn<Data | null> = (route, state) => {
  const service = inject(DataService);
  const id = route.paramMap.get('id');

  return service.getData(id).pipe(
    catchError(() => of(null))
  );
};

// In routing
{
  path: 'detail/:id',
  component: DetailComponent,
  resolve: { data: dataResolver }
}
```

## 🎨 Tailwind Utilities

```html
<!-- Spacing -->
<div class="p-4 m-2 space-y-4">
  <!-- Layout -->
  <div class="flex items-center justify-between">
    <div class="grid grid-cols-3 gap-4">
      <!-- Colors -->
      <div class="bg-surface text-text-primary border-border">
        <!-- Responsive -->
        <div class="text-sm md:text-base lg:text-lg">
          <!-- Hover/Focus -->
          <button class="hover:bg-surface-hover focus:ring-2">
            <!-- Transitions -->
            <div class="transition-all duration-200"></div>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
```

## 🐛 Debugging Tips

### Check HTTP Calls

```typescript
// Enable logging in service
console.log("Request:", url, params);
console.log("Response:", data);
```

### Check Theme

```javascript
// In browser console
document.documentElement.classList; // Should have 'dark' or 'light'
localStorage.getItem("manga-universal-theme");
```

### Check Routes

```javascript
// In browser console
ng.probe($0).componentInstance; // Get component instance
```

### Common Errors

**CORS Error:**

- Enable CORS on backend
- Check backend is running on port 8080

**Theme not applying:**

- Check CSS variables in DevTools
- Clear localStorage: `localStorage.clear()`

**Images not loading:**

- Check image URLs in Network tab
- Verify API returns correct URLs

## 📚 Documentation Files

```
CHECKLIST.md         → Complete feature list
SETUP_GUIDE.md       → Detailed setup instructions
FRONTEND_README.md   → Full documentation
PROJECT_SUMMARY.md   → Overview and status
ARCHITECTURE.md      → Visual diagrams
API_REFERENCE.md     → API specification
QUICK_REFERENCE.md   → This file!
```

## 🎉 Quick Test

```bash
# 1. Install
npm install

# 2. Start
npm start

# 3. Open browser
http://localhost:4200

# 4. Search
Type "one piece" → see results

# 5. Click card
View manga details

# 6. Click chapter
Open reader

# 7. Navigate
Use arrow keys or click

# 8. Toggle theme
Click sun/moon icon
```

## ✅ Production Checklist

- [ ] Backend running on port 8080
- [ ] Environment variables configured
- [ ] API endpoints tested
- [ ] Theme toggle works
- [ ] All routes accessible
- [ ] Images loading correctly
- [ ] Keyboard navigation working
- [ ] Mobile responsive
- [ ] Production build successful
- [ ] Error handling working

---

**Need more help? Check the other documentation files!**
