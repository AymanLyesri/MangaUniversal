import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Chapter } from '../models/manga.model';
import { MangaService } from '../services/manga.service';
import { catchError, of } from 'rxjs';

export const chaptersResolver: ResolveFn<Chapter[] | null> = (route, state) => {
  const mangaService = inject(MangaService);
  const mangaId = route.paramMap.get('id');

  if (!mangaId) {
    return of(null);
  }

  return mangaService.getMangaChapters(mangaId).pipe(
    catchError((error) => {
      console.error('Error loading chapters:', error);
      return of(null);
    })
  );
};
