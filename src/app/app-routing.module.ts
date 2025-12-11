import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { MangaDetailsComponent } from './components/manga-details/manga-details.component';
import { ReaderComponent } from './components/reader/reader.component';
import { mangaDetailsResolver } from './resolvers/manga-details.resolver';
import { chaptersResolver } from './resolvers/chapters.resolver';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'MangaUniversal - Popular Manga',
  },
  {
    path: 'search',
    component: SearchComponent,
    title: 'Search - MangaUniversal',
  },
  {
    path: 'manga/:id/:slug',
    component: MangaDetailsComponent,
    title: 'Manga Details - MangaUniversal',
    resolve: {
      manga: mangaDetailsResolver,
      chapters: chaptersResolver,
    },
  },
  {
    path: 'manga/:id/:slug/read/:chapter/:page',
    component: ReaderComponent,
    title: 'Reader - MangaUniversal',
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
