import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MangaDetail, Chapter } from '../../models/manga.model';
import { ChapterListComponent } from '../chapter-list/chapter-list.component';
import { generateSlug } from '../../utils/helpers';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-manga-details',
  standalone: true,
  imports: [CommonModule, RouterModule, ChapterListComponent],
  templateUrl: './manga-details.component.html',
  styleUrls: ['./manga-details.component.scss'],
})
export class MangaDetailsComponent implements OnInit {
  manga$ = new BehaviorSubject<MangaDetail | null>(null);
  chapters$ = new BehaviorSubject<Chapter[]>([]);
  loading$ = new BehaviorSubject<boolean>(true);
  error$ = new BehaviorSubject<string | null>(null);

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Get data from resolver
    const manga = this.route.snapshot.data['manga'] as MangaDetail | null;
    const chapters = this.route.snapshot.data['chapters'] as Chapter[] | null;

    console.log('Manga data:', manga);
    console.log('Has title:', manga?.title);
    console.log('Has description:', manga?.description);

    if (!manga) {
      this.error$.next('Manga not found');
      this.loading$.next(false);
      return;
    }

    this.manga$.next(manga);
    this.chapters$.next(chapters || []);
    this.loading$.next(false);
  }

  get mangaSlug(): string {
    const manga = this.manga$.value;
    return manga ? generateSlug(manga.title) : '';
  }

  getStatusColor(status: string): string {
    const colors: Record<string, string> = {
      ongoing: 'bg-green-500',
      completed: 'bg-blue-500',
      hiatus: 'bg-yellow-500',
      cancelled: 'bg-red-500',
    };
    return colors[status] || 'bg-gray-500';
  }

  coverImageSrc(originalSrc: string): string {
    if (environment.disableImages) {
      return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='400'%3E%3Crect width='300' height='400' fill='%23334155'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-size='16' font-family='system-ui'%3EImage Disabled%3C/text%3E%3C/svg%3E";
    }
    return originalSrc;
  }
}
