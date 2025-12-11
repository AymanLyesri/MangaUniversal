import {
  Component,
  ChangeDetectionStrategy,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MangaService } from '../../services/manga.service';
import { MangaSearchResult } from '../../models/manga.model';
import { MangaCardComponent } from '../manga-card/manga-card.component';
import { Subject, BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, MangaCardComponent],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit, OnDestroy {
  searchQuery = '';
  searchResults$ = new BehaviorSubject<MangaSearchResult[]>([]);
  loading$ = new BehaviorSubject<boolean>(false);
  error$ = new BehaviorSubject<string | null>(null);

  private destroy$ = new Subject<void>();

  constructor(
    private mangaService: MangaService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        const query = params['q'];
        if (query) {
          this.searchQuery = query;
          this.performSearch(query);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private performSearch(query: string): void {
    if (!query || query.trim().length === 0) {
      return;
    }

    this.loading$.next(true);
    this.error$.next(null);

    this.mangaService.searchManga(query).subscribe({
      next: (results) => {
        this.searchResults$.next(results);
        this.loading$.next(false);
      },
      error: (error) => {
        this.error$.next(error.message || 'Failed to search manga');
        this.loading$.next(false);
      },
    });
  }

  trackByMangaId(index: number, manga: MangaSearchResult): string {
    return manga.id;
  }
}
