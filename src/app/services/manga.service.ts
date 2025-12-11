import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  MangaSearchResult,
  MangaDetail,
  Chapter,
  SearchResponse,
  ChaptersResponse,
  PagesResponse,
  ErrorResponse,
} from '../models/manga.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MangaService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Search for manga by title
   * @param query - The manga title to search for
   * @returns Observable of search results
   */
  searchManga(query: string): Observable<MangaSearchResult[]> {
    if (!query || query.trim().length === 0) {
      return throwError(() => new Error('Search query cannot be empty'));
    }

    const encodedQuery = encodeURIComponent(query);
    return this.http
      .get<SearchResponse>(`${this.baseUrl}/manga/search?q=${encodedQuery}`)
      .pipe(
        map((response) => response.results),
        catchError(this.handleError)
      );
  }

  /**
   * Get detailed information about a specific manga
   * @param mangaId - The MangaDex manga ID
   * @returns Observable of manga details
   */
  getMangaDetails(mangaId: string): Observable<MangaDetail> {
    return this.http
      .get<MangaDetail>(`${this.baseUrl}/manga/${mangaId}`)
      .pipe(catchError(this.handleError));
  }

  /**
   * Get the list of chapters for a specific manga
   * @param mangaId - The MangaDex manga ID
   * @returns Observable of chapters array
   */
  getMangaChapters(mangaId: string): Observable<Chapter[]> {
    return this.http
      .get<ChaptersResponse>(`${this.baseUrl}/manga/${mangaId}/chapters`)
      .pipe(
        map((response) => response.chapters),
        catchError(this.handleError)
      );
  }

  /**
   * Get the page URLs for a specific chapter
   * @param chapterId - The MangaDex chapter ID
   * @returns Observable of page URLs array
   */
  getChapterPages(chapterId: string): Observable<string[]> {
    return this.http
      .get<PagesResponse>(`${this.baseUrl}/manga/chapter/${chapterId}/pages`)
      .pipe(
        map((response) => response.pages),
        catchError(this.handleError)
      );
  }

  /**
   * Handle HTTP errors
   * @param error - The HTTP error response
   * @returns Observable error
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Network Error: ${error.error.message}`;
    } else if (error.status === 0) {
      // CORS error or network failure
      errorMessage =
        'Unable to connect to the server. Please check your internet connection or try again later.';
    } else {
      // Backend returned an unsuccessful response code
      const errorResponse = error.error as ErrorResponse;
      errorMessage =
        errorResponse?.error || `Error ${error.status}: ${error.message}`;
    }

    console.error('MangaService Error:', {
      status: error.status,
      message: error.message,
      url: error.url,
      error: errorMessage,
    });
    return throwError(() => new Error(errorMessage));
  }
}
