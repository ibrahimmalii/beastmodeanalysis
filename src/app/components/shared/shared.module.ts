import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule, Routes } from '@angular/router';
import { EditorComponent } from './editor/editor.component';
import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import QuillType from 'quill';

const routes: Routes = [];

@NgModule({
  declarations: [HeaderComponent, FooterComponent, EditorComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    QuillModule.forRoot(),
  ],
  exports: [HeaderComponent, FooterComponent, EditorComponent],
})
export class SharedModule {}
