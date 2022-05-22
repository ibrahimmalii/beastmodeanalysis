import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FilterAndSearchComponent } from './filter-and-search/filter-and-search.component';
import { ChartModule } from 'angular-highcharts';
import { NgPipesModule, NgStringPipesModule } from 'ngx-pipes';

const routes: Routes = [
  { path: '', component: FilterAndSearchComponent },
];

@NgModule({
  declarations: [FilterAndSearchComponent],
  imports: [
  CommonModule,
    RouterModule.forChild(routes),
    ChartModule,
    NgPipesModule,
    NgStringPipesModule
  ],
})
export class FilterCompaniesModule {}
