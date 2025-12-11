import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MangaService } from '../../services/manga.service';
import { MangaSearchResult } from '../../models/manga.model';
import { MangaCardComponent } from '../manga-card/manga-card.component';
import { Subject, BehaviorSubject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  catchError,
  takeUntil,
} from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, MangaCardComponent],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnDestroy {
  searchQuery = '';
  searchResults$ = new BehaviorSubject<MangaSearchResult[]>([]);
  loading$ = new BehaviorSubject<boolean>(false);
  error$ = new BehaviorSubject<string | null>(null);
  hasSearched$ = new BehaviorSubject<boolean>(false);

  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor(private mangaService: MangaService) {
    this.setupSearch();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setupSearch(): void {
    this.searchSubject
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((query) => {
          if (!query || query.trim().length === 0) {
            this.hasSearched$.next(false);
            return of([]);
          }

          this.loading$.next(true);
          this.error$.next(null);
          this.hasSearched$.next(true);

          return this.mangaService.searchManga(query).pipe(
            catchError((error) => {
              this.error$.next(error.message || 'Failed to search manga');
              return of([]);
            })
          );
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((results) => {
        this.searchResults$.next(results);
        this.loading$.next(false);
      });
  }

  onSearchChange(query: string): void {
    this.searchQuery = query;
    this.searchSubject.next(query);
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.searchSubject.next('');
  }

  trackByMangaId(index: number, manga: MangaSearchResult): string {
    return manga.id;
  }
}
