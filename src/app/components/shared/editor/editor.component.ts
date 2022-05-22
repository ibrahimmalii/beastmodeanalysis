import { Component, OnInit } from '@angular/core';
// import { EditorModule } from 'primeng/editor';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})
export class EditorComponent implements OnInit {
  constructor() {}
  blurred = false;
  focused = false;

  created(event: any) {
    // tslint:disable-next-line:no-console
    console.log('editor-created', event);
  }

  changedEditor(event: any) {
    // tslint:disable-next-line:no-console
    console.log('editor-change', event);
  }

  focus(event: any) {
    // tslint:disable-next-line:no-console
    this.focused = true;
    this.blurred = false;
  }

  blur(event: any) {
    // tslint:disable-next-line:no-console
    this.focused = false;
    this.blurred = true;
  }
  ngOnInit(): void {}
}
