import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../services/theme.service';
import { MangaService } from '../../services/manga.service';
import { MangaSearchResult } from '../../models/manga.model';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import {
  map,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  catchError,
  takeUntil,
} from 'rxjs/operators';
import { of } from 'rxjs';
import { generateSlug } from '../../utils/helpers';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnDestroy {
  isDark$: Observable<boolean>;
  searchQuery = '';
  searchResults$ = new BehaviorSubject<MangaSearchResult[]>([]);
  showSearchResults$ = new BehaviorSubject<boolean>(false);
  isSearching$ = new BehaviorSubject<boolean>(false);

  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor(
    private themeService: ThemeService,
    private mangaService: MangaService,
    private router: Router
  ) {
    this.isDark$ = this.themeService.theme$.pipe(
      map((theme) => this.themeService.getEffectiveTheme(theme) === 'dark')
    );
    this.setupSearch();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  private setupSearch(): void {
    this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((query) => {
          if (!query || query.trim().length === 0) {
            this.showSearchResults$.next(false);
            return of([]);
          }

          this.isSearching$.next(true);
          this.showSearchResults$.next(true);

          return this.mangaService
            .searchManga(query)
            .pipe(catchError(() => of([])));
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((results) => {
        this.searchResults$.next(results.slice(0, 5)); // Show only top 5 results
        this.isSearching$.next(false);
      });
  }

  onSearchChange(query: string): void {
    this.searchQuery = query;
    this.searchSubject.next(query);
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.searchSubject.next('');
    this.showSearchResults$.next(false);
  }

  selectManga(manga: MangaSearchResult): void {
    const slug = generateSlug(manga.title);
    this.router.navigate(['/manga', manga.id, slug]);
    this.clearSearch();
  }

  navigateToSearch(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/search'], {
        queryParams: { q: this.searchQuery },
      });
      this.clearSearch();
    }
  }

  hideResults(): void {
    // Delay to allow click events on results
    setTimeout(() => this.showSearchResults$.next(false), 200);
  }
}
