import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Chapter } from '../../models/manga.model';
import { formatDate } from '../../utils/helpers';
import { MangaService } from '../../services/manga.service';

@Component({
  selector: 'app-chapter-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './chapter-list.component.html',
  styleUrls: ['./chapter-list.component.scss'],
})
export class ChapterListComponent {
  @Input() chapters: Chapter[] = [];
  @Input() mangaId!: string;
  @Input() mangaSlug!: string;

  expandedChapters = new Set<string>();
  chapterPages = new Map<string, string[]>();
  loadingPages = new Set<string>();

  constructor(private mangaService: MangaService) {}

  formatDate(dateString: string): string {
    return formatDate(dateString);
  }

  trackByChapterId(index: number, chapter: Chapter): string {
    return chapter.id;
  }

  toggleChapter(chapterId: string, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    if (this.expandedChapters.has(chapterId)) {
      this.expandedChapters.delete(chapterId);
    } else {
      this.expandedChapters.add(chapterId);
      // Fetch pages if not already loaded
      if (
        !this.chapterPages.has(chapterId) &&
        !this.loadingPages.has(chapterId)
      ) {
        this.loadPages(chapterId);
      }
    }
  }

  private loadPages(chapterId: string): void {
    this.loadingPages.add(chapterId);
    this.mangaService.getChapterPages(chapterId).subscribe({
      next: (pages) => {
        console.log(pages);

        this.chapterPages.set(chapterId, pages);
        this.loadingPages.delete(chapterId);
      },
      error: (error) => {
        console.error('Error loading pages:', error);
        this.loadingPages.delete(chapterId);
      },
    });
  }

  isLoadingPages(chapterId: string): boolean {
    return this.loadingPages.has(chapterId);
  }

  getActualPageCount(chapterId: string): number {
    return this.chapterPages.get(chapterId)?.length || 0;
  }

  isExpanded(chapterId: string): boolean {
    return this.expandedChapters.has(chapterId);
  }

  getPageNumbers(totalPages: number): number[] {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
}
