import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  private isVisible$ = new BehaviorSubject<boolean>(true);

  constructor() {}

  /**
   * Get the current visibility state of the navbar
   */
  getVisibility(): Observable<boolean> {
    return this.isVisible$.asObservable();
  }

  /**
   * Show the navbar
   */
  show(): void {
    this.isVisible$.next(true);
  }

  /**
   * Hide the navbar
   */
  hide(): void {
    this.isVisible$.next(false);
  }

  /**
   * Toggle the navbar visibility
   */
  toggle(): void {
    this.isVisible$.next(!this.isVisible$.value);
  }
}
