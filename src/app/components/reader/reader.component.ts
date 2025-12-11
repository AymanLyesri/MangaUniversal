import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MangaService } from '../../services/manga.service';
import { NavbarService } from '../../services/navbar.service';
import { Chapter } from '../../models/manga.model';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-reader',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReaderComponent implements OnInit, OnDestroy {
  pages$ = new BehaviorSubject<string[]>([]);
  loading$ = new BehaviorSubject<boolean>(true);
  error$ = new BehaviorSubject<string | null>(null);
  showControls$ = new BehaviorSubject<boolean>(true);

  mangaId!: string;
  mangaSlug!: string;
  currentChapter!: string;
  currentPage = 1;
  totalPages = 0;
  chapterId?: string;

  private destroy$ = new Subject<void>();
  private controlsTimeout?: number;
  private lastScrollY = 0;
  private scrollThreshold = 50;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mangaService: MangaService,
    private navbarService: NavbarService
  ) {}

  ngOnInit(): void {
    // Hide navbar when entering reader mode
    this.navbarService.hide();

    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      this.mangaId = params.get('id') || '';
      this.mangaSlug = params.get('slug') || '';
      this.chapterId = params.get('chapter') || '';
      this.currentPage = parseInt(params.get('page') || '1', 10);

      if (this.chapterId) {
        this.loadPages(this.chapterId);
      }
    });

    this.resetControlsTimeout();
  }

  ngOnDestroy(): void {
    // Show navbar when exiting reader mode
    this.navbarService.show();

    this.destroy$.next();
    this.destroy$.complete();
    if (this.controlsTimeout) {
      window.clearTimeout(this.controlsTimeout);
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowLeft':
        this.previousPage();
        break;
      case 'ArrowRight':
        this.nextPage();
        break;
      case 'Escape':
        this.exitReader();
        break;
      case 'h':
      case 'H':
        // Toggle controls visibility with 'H' key
        this.showControls$.next(!this.showControls$.value);
        if (this.showControls$.value) {
          this.resetControlsTimeout();
        }
        break;
    }
  }

  @HostListener('window:scroll')
  onScroll(): void {
    const currentScrollY = window.scrollY || window.pageYOffset;

    // Show controls when scrolling up, hide when scrolling down
    if (Math.abs(currentScrollY - this.lastScrollY) > this.scrollThreshold) {
      if (currentScrollY < this.lastScrollY) {
        // Scrolling up - show controls
        this.showControls$.next(true);
        this.resetControlsTimeout();
      } else {
        // Scrolling down - hide controls
        this.showControls$.next(false);
      }
      this.lastScrollY = currentScrollY;
    }
  }

  @HostListener('document:mousemove')
  onMouseMove(): void {
    this.showControls$.next(true);
    this.resetControlsTimeout();
  }

  @HostListener('click')
  onClick(): void {
    // Toggle controls on click (mobile friendly)
    const currentState = this.showControls$.value;
    this.showControls$.next(!currentState);
    if (!currentState) {
      this.resetControlsTimeout();
    }
  }

  private loadPages(chapterId: string): void {
    this.loading$.next(true);
    this.error$.next(null);
    this.mangaService
      .getChapterPages(chapterId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (pages) => {
          this.pages$.next(pages);
          this.totalPages = pages.length;
          this.loading$.next(false);
        },
        error: (error) => {
          this.error$.next(error.message);
          this.loading$.next(false);
        },
      });
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.navigateToPage(this.currentPage + 1);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.navigateToPage(this.currentPage - 1);
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.navigateToPage(page);
    }
  }

  private navigateToPage(page: number): void {
    this.router.navigate([
      '/manga',
      this.mangaId,
      this.mangaSlug,
      'read',
      this.chapterId,
      page,
    ]);
  }

  exitReader(): void {
    this.router.navigate(['/manga', this.mangaId, this.mangaSlug]);
  }

  private resetControlsTimeout(): void {
    if (this.controlsTimeout) {
      window.clearTimeout(this.controlsTimeout);
    }
    this.controlsTimeout = window.setTimeout(() => {
      this.showControls$.next(false);
    }, 1000);
  }

  get currentPageUrl(): string {
    if (environment.disableImages) {
      return (
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='1200'%3E%3Crect width='800' height='1200' fill='%23334155'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-size='24' font-family='system-ui'%3EImages Disabled (Dev Mode)%3C/text%3E%3Ctext x='50%25' y='55%25' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-size='16' font-family='system-ui'%3EPage " +
        this.currentPage +
        ' of ' +
        this.totalPages +
        '%3C/text%3E%3C/svg%3E'
      );
    }
    const pages = this.pages$.value;
    return pages[this.currentPage - 1] || '';
  }

  get hasNextPage(): boolean {
    return this.currentPage < this.totalPages;
  }

  get hasPreviousPage(): boolean {
    return this.currentPage > 1;
  }
}
