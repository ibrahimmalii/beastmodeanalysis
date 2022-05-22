import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PricingComponent } from '../pricing/pricing/pricing.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgPipesModule, NgStringPipesModule } from 'ngx-pipes';

const routes: Routes = [{ path: '', component: PricingComponent }];

@NgModule({
  declarations: [PricingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    NgPipesModule,
    NgStringPipesModule,
    SharedModule,
  ],
})
export class PricingModule {}
