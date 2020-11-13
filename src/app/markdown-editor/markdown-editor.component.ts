import { MarkdownService } from './services/markdown.service';
import { DEFAULT_MODULE } from './models/defaultToolbar';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { QuillChanges } from './models/quillChanges';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-markdown-editor',
  templateUrl: './markdown-editor.component.html',
  styleUrls: ['./markdown-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: MarkdownEditorComponent,
      multi: true
    }
  ]
})
export class MarkdownEditorComponent implements ControlValueAccessor {
  @ViewChild('a') a: any;
  onChange: (value: string) => {}; 
  value: string;
  @Input() moduleConfig?: object = DEFAULT_MODULE;
  @Output() onContentChanged: EventEmitter<QuillChanges> = new EventEmitter();
  @Output() onSelectionChanged: EventEmitter<QuillChanges> = new EventEmitter();

  constructor(private markdownSerice: MarkdownService) { }

getInstance() {
  console.log('child', this.a.quillEditor.editor);
  return this.a.quillEditor;
}

  initValue(e){
    e.pasteHTML(0, this.markdownToHtml(this.value), 'silent'); // https://quilljs.com/docs/api/
  }

  handleContentChange(event: QuillChanges) {
    this.onContentChanged.emit(event);
    this.writeValue(event.html);
    this.onChange(event.html);

  }
  handleSelection(event: QuillChanges) {
    this.onSelectionChanged.emit(event);
  }

  htmlToMarkdown(html: string): string {
      return this.markdownSerice.htmlToMarkdown(html);
  }

  markdownToHtml(markdown: string): string {
    return this.markdownSerice.markdownToHtml(markdown);
  }

  writeValue(value) {
    this.value = value;
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) { }

  getValueAsMarkdown() {
    return this.htmlToMarkdown(this.value);
  }
  
  getValueAsHtml() {
    return this.markdownToHtml(this.value);
  }
}
