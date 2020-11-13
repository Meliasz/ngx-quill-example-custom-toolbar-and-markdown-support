import { MarkdownEditorModule } from './markdown-editor/markdown-editor.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


//import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

//import 'froala-editor/js/plugins.pkgd.min.js';

// Import a single Froala Editor plugin.
//import 'froala-editor/js/plugins/align.min.js';

// Import a third-party plugin.
// import 'froala-editor/js/third_party/font_awesome.min';
// import 'froala-editor/js/third_party/image_tui.min';
// import 'froala-editor/js/third_party/embedly.min';

// Import Angular plugin.

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
//import { QuillModule } from 'ngx-quill'
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { CustomToolbarComponent } from './custom-toolbar/custom-toolbar.component';
//import { NgxSummernoteModule } from 'ngx-summernote';
// import { HttpClient, HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [	
    AppComponent,
      //CustomToolbarComponent
   ],
  imports: [
    BrowserModule,
    MarkdownEditorModule,
    NgbModule,
    // CKEditorModule,
    FormsModule ,
    ReactiveFormsModule,
    // NgxSummernoteModule,
    // FroalaEditorModule.forRoot(), 
    // FroalaViewModule.forRoot(),
    // QuillModule.forRoot({
    // })

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
