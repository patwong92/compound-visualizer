import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, take, tap } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  isLoading$!: Observable<boolean>;

  searchForm: FormGroup = this.fb.group({
    query: this.fb.control(''),
  });

  constructor(private searchService: SearchService, private fb: FormBuilder) {}

  ngOnInit() {
    this.isLoading$ = this.searchService.isLoading$
      .asObservable()
      .pipe(tap((x) => console.log('triggered', x)));
  }

  search() {
    const query = this.searchForm.get('query')?.value;
    this.searchService.search$(query).pipe(take(1)).subscribe();
  }
}
