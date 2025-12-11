export type MangaStatus = 'ongoing' | 'completed' | 'hiatus' | 'cancelled';

export interface MangaSearchResult {
  id: string;
  title: string;
  description: string;
  status: MangaStatus;
  year: number;
  cover: string;
  tags: string[];
}

export interface MangaDetail {
  id: string;
  title: string;
  description: string;
  status: MangaStatus;
  year: number;
  cover: string;
  tags: string[];
  authors: string[];
  artists: string[];
}

export interface Chapter {
  id: string;
  chapter: string;
  title: string;
  volume: string;
  pages: number;
  translatedLanguage: string;
  publishAt: string;
  scanlationGroup: string;
}

export interface SearchResponse {
  results: MangaSearchResult[];
}

export interface ChaptersResponse {
  chapters: Chapter[];
}

export interface PagesResponse {
  pages: string[];
}

export interface ErrorResponse {
  error: string;
  status: number;
}

export interface PopularMangaItem {
  id: string;
  title: string;
  description: string | null;
  followers: number | null;
  coverUrl: string | null;
}

export interface PopularMangaResponse {
  total: number;
  limit: number;
  offset: number;
  results: PopularMangaItem[];
}
