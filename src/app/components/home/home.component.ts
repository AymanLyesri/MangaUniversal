import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MangaService } from '../../services/manga.service';
import { PopularMangaItem } from '../../models/manga.model';
import { MangaCardComponent } from '../manga-card/manga-card.component';
import { BehaviorSubject } from 'rxjs';
import { generateSlug } from '../../utils/helpers';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, MangaCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  popularManga$ = new BehaviorSubject<PopularMangaItem[]>([]);
  loading$ = new BehaviorSubject<boolean>(true);
  error$ = new BehaviorSubject<string | null>(null);

  constructor(private mangaService: MangaService, private router: Router) {}

  ngOnInit(): void {
    this.loadPopularManga();
  }

  private loadPopularManga(): void {
    this.loading$.next(true);
    this.error$.next(null);

    this.mangaService.getPopularManga(30, 0).subscribe({
      next: (response) => {
        this.popularManga$.next(response.results);
        this.loading$.next(false);
      },
      error: (error) => {
        this.error$.next(error.message || 'Failed to load popular manga');
        this.loading$.next(false);
      },
    });
  }

  navigateToManga(manga: PopularMangaItem): void {
    const slug = generateSlug(manga.title);
    this.router.navigate(['/manga', manga.id, slug]);
  }

  trackByMangaId(index: number, manga: PopularMangaItem): string {
    return manga.id;
  }

  generateSlug(title: string): string {
    return generateSlug(title);
  }

  formatFollowers(followers: number | null): string {
    if (!followers) return '0';
    if (followers >= 1000000) {
      return (followers / 1000000).toFixed(1) + 'M';
    }
    if (followers >= 1000) {
      return (followers / 1000).toFixed(1) + 'K';
    }
    return followers.toString();
  }
}
