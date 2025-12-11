import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MangaSearchResult } from '../../models/manga.model';
import { generateSlug, truncate } from '../../utils/helpers';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-manga-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './manga-card.component.html',
  styleUrls: ['./manga-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MangaCardComponent {
  @Input() manga!: MangaSearchResult;
  private readonly maxDisplayTags = 3;

  get mangaSlug(): string {
    return generateSlug(this.manga.title);
  }

  get truncatedDescription(): string {
    return truncate(this.manga.description, 120);
  }

  get displayTags(): string[] {
    return this.manga.tags?.slice(0, this.maxDisplayTags) || [];
  }

  get remainingTagsCount(): number {
    const totalTags = this.manga.tags?.length || 0;
    return Math.max(0, totalTags - this.maxDisplayTags);
  }

  get coverImageSrc(): string {
    if (environment.disableImages) {
      return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='400'%3E%3Crect width='300' height='400' fill='%23334155'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-size='16' font-family='system-ui'%3EImage Disabled%3C/text%3E%3C/svg%3E";
    }
    return this.manga.cover;
  }
}
