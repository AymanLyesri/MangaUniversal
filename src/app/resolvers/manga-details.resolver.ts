import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { MangaDetail } from '../models/manga.model';
import { MangaService } from '../services/manga.service';
import { catchError, of } from 'rxjs';

export const mangaDetailsResolver: ResolveFn<MangaDetail | null> = (
  route,
  state
) => {
  const mangaService = inject(MangaService);
  const mangaId = route.paramMap.get('id');

  if (!mangaId) {
    return of(null);
  }

  return mangaService.getMangaDetails(mangaId).pipe(
    catchError((error) => {
      console.error('Error loading manga details:', error);
      return of(null);
    })
  );
};
