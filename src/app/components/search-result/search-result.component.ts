import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, map, tap } from 'rxjs';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent implements OnInit, OnDestroy {
  subscription = new Subscription();

  error$!: Observable<boolean>;
  imageUrl$!: Observable<string>;
  isLoading$!: Observable<boolean>;

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.imageUrl$ = this.searchService.query$
      .asObservable()
      .pipe(
        map((query) =>
          query
            ? `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${query}/png`
            : ''
        )
      );
    this.error$ = this.searchService.hasError$.asObservable();
    this.isLoading$ = this.searchService.isLoading$.asObservable();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
