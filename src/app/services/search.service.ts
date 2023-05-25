import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  finalize,
  of,
  switchMap,
  tap,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  hasError$ = new BehaviorSubject<boolean>(false);
  query$ = new BehaviorSubject<string>('');
  isLoading$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  search$(query: string) {
    return of(this.resetQuerySettings()).pipe(
      switchMap(() =>
        this.http.get(
          `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${query}/json`
        )
      ),
      tap(() => {
        this.hasError$.next(false);
        this.query$.next(query);
      }),
      catchError((error) => {
        this.hasError$.next(true);
        this.query$.next('');
        return of(error);
      }),
      finalize(() => {
        this.isLoading$.next(false);
      })
    );
  }

  private resetQuerySettings() {
    this.hasError$.next(false);
    this.isLoading$.next(true);
    this.query$.next('');
  }
}
