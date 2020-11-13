import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownEditorComponent } from './markdown-editor.component';
import { QuillModule } from 'ngx-quill';

@NgModule({
  imports: [
    CommonModule,
    QuillModule.forRoot({
    })
  ],
  declarations: [MarkdownEditorComponent],
  exports: [MarkdownEditorComponent]
})
export class MarkdownEditorModule { }
