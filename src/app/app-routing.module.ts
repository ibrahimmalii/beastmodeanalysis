import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { OffersComponent } from './components/offers/offers.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { TermsOfUseComponent } from './components/terms-of-use/terms-of-use.component';


const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule)
  }, {
    path: 'side-by-side',
    loadChildren: () => import('./components/pricing/pricing.module').then(m => m.PricingModule)
    ,canActivate:[AuthGuard]
  }, {
    path: 'score-card',
    loadChildren: () => import('./components/filter-companies/filter-companies.module').then(m => m.FilterCompaniesModule)
    ,canActivate:[AuthGuard]
  },
  {path : 'me', component : ProfileComponent, canActivate : [AuthGuard]},
  {path : 'home', component : LandingPageComponent},
  {path : 'pricing', component : OffersComponent},
  {path : 'contact-us', component : ContactUsComponent},
  {path : 'privacy-policy', component : PrivacyPolicyComponent},
  {path : 'terms-of-use', component : TermsOfUseComponent},
  {path : '', component : LandingPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
