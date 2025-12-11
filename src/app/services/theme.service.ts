import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

export type Theme = 'light' | 'dark' | 'auto';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly THEME_STORAGE_KEY = 'manga-universal-theme';
  private themeSubject: BehaviorSubject<Theme>;
  private mediaQuery?: MediaQueryList;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    const savedTheme = this.getSavedTheme();
    this.themeSubject = new BehaviorSubject<Theme>(savedTheme);

    if (isPlatformBrowser(this.platformId)) {
      this.initializeTheme();
      this.setupMediaQueryListener();
    }
  }

  /**
   * Get the current theme as an observable
   */
  get theme$(): Observable<Theme> {
    return this.themeSubject.asObservable();
  }

  /**
   * Get the current theme value
   */
  get currentTheme(): Theme {
    return this.themeSubject.value;
  }

  /**
   * Set the theme manually
   * @param theme - 'light', 'dark', or 'auto'
   */
  setTheme(theme: Theme): void {
    this.themeSubject.next(theme);
    this.saveTheme(theme);
    this.applyTheme(theme);
  }

  /**
   * Toggle between light and dark themes
   */
  toggleTheme(): void {
    const currentTheme = this.currentTheme;
    const effectiveTheme = this.getEffectiveTheme(currentTheme);
    const newTheme: Theme = effectiveTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }

  /**
   * Get the effective theme (resolves 'auto' to 'light' or 'dark')
   */
  getEffectiveTheme(theme: Theme = this.currentTheme): 'light' | 'dark' {
    if (theme === 'auto') {
      return this.getSystemTheme();
    }
    return theme;
  }

  /**
   * Initialize theme on app startup
   */
  private initializeTheme(): void {
    const theme = this.currentTheme;
    this.applyTheme(theme);
  }

  /**
   * Apply theme to the document
   */
  private applyTheme(theme: Theme): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const effectiveTheme = this.getEffectiveTheme(theme);
    const root = document.documentElement;

    // Remove both classes first
    root.classList.remove('light', 'dark');

    // Add the effective theme class
    root.classList.add(effectiveTheme);

    // Update meta theme-color for mobile browsers
    this.updateMetaThemeColor(effectiveTheme);
  }

  /**
   * Setup media query listener for system theme changes
   */
  private setupMediaQueryListener(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // Listen for system theme changes
    this.mediaQuery.addEventListener('change', (e) => {
      if (this.currentTheme === 'auto') {
        this.applyTheme('auto');
      }
    });
  }

  /**
   * Get system theme preference
   */
  private getSystemTheme(): 'light' | 'dark' {
    if (!isPlatformBrowser(this.platformId)) {
      return 'light';
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  /**
   * Get saved theme from localStorage
   */
  private getSavedTheme(): Theme {
    if (!isPlatformBrowser(this.platformId)) {
      return 'auto';
    }

    const saved = localStorage.getItem(this.THEME_STORAGE_KEY);
    if (saved === 'light' || saved === 'dark' || saved === 'auto') {
      return saved;
    }
    return 'auto';
  }

  /**
   * Save theme to localStorage
   */
  private saveTheme(theme: Theme): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    localStorage.setItem(this.THEME_STORAGE_KEY, theme);
  }

  /**
   * Update meta theme-color tag for mobile browsers
   */
  private updateMetaThemeColor(theme: 'light' | 'dark'): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    const color = theme === 'dark' ? '#0f0f0f' : '#ffffff';

    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', color);
    }
  }
}
