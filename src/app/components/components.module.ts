import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FooterComponent } from './footer/footer.component';
import { DescriptionComponent } from './description/description.component';

const components = [
  SearchComponent,
  SearchResultComponent,
  FooterComponent,
  DescriptionComponent,
];

@NgModule({
  declarations: [components],
  imports: [CommonModule, ReactiveFormsModule, MatProgressSpinnerModule],
  exports: [components],
})
export class ComponentsModule {}
