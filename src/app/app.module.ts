import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './components/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ListViewModule } from '@progress/kendo-angular-listview';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileComponent } from './components/profile/profile.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { NgPipesModule } from 'ngx-pipes';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { OffersComponent } from './components/offers/offers.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { TermsOfUseComponent } from './components/terms-of-use/terms-of-use.component';

//* About Editor
// import { CKEditorModule } from 'ng2-ckeditor';
import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import QuillType from 'quill';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    LandingPageComponent,
    ContactUsComponent,
    OffersComponent,
    PrivacyPolicyComponent,
    TermsOfUseComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    ListViewModule,
    BrowserAnimationsModule,
    NgPipesModule,
    FormsModule,
    // CKEditorModule,
    QuillModule.forRoot(),
    // QuillType,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
