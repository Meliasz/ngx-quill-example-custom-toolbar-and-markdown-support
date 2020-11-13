import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { distinctUntilChanged, filter } from 'rxjs/operators';
import { MarkdownEditorComponent } from './markdown-editor/markdown-editor.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import 'quill-mention';
const atValues = [
  { id: 1, value: "Variable1" },
  { id: 2, value: "Variable2" },
  { id: 3, value: 'Variable3' }
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('markdownInstance') markdownInstance: any;
  @ViewChild('content') content: any;
  title = 'test';
  templateForm: FormGroup;
  closeResult = '';
  quillConfig = {
    mention: {
      allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
      mentionDenotationChars: ["@", "#"],
      source: function (searchTerm, renderList, mentionChar) {
        let values;

        if (mentionChar === "@") {
          values = atValues;
        } else {
          values = atValues;
        }

        if (searchTerm.length === 0) {
          renderList(values, searchTerm);
        } else {
          const matches = [];
          for (let i = 0; i < values.length; i++)
            if (
              ~values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase())
            )
              matches.push(values[i]);
          renderList(matches, searchTerm);
        }
      }
    },
    toolbar: {
      handlers: {
        'pawel': this.customBoldHandler.bind(this),
        'pawel2': this.customBoldHandler2.bind(this),
        'raz': this.customBoldHandlerRaz.bind(this),
        'dwa': this.customBoldHandlerDwa.bind(this),
        'pawel3': (e) => { console.log(e, 'tak'); this.test2(e) },
        'modal': this.open.bind(this),
      },
      container: [
        // ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        //  ['blockquote', 'code-block'],

        [{ 'header': 1 }],               // custom button values
        // [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        //     [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        //  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        //   [{ 'direction': 'rtl' }],                         // text direction

        //  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        //  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        //  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        //   [{ 'font': [] }],
        //   [{ 'align': [] }],

        // ['clean'],                                         // remove formatting button
        ['pawel'],
        ['pawel2']

        , [{ 'pawel3': ['raz', 'dwa', 'trzy'] }],
        ['modal']
      ]
      // ['link', 'image', 'video']                         // link and image, video
    }
  }
  constructor(private fb: FormBuilder, private modalService: NgbModal) {
    this.templateForm = this.fb.group({
      template2: ['<h1>HEader text</h1>', Validators.required],
    });
  }
  open() {
    this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  closeTest(str) {

    this.modalService.dismissAll();
    console.log(this.markdownInstance.getInstance())
    this.markdownInstance.getInstance().focus();
    this.generic(str);
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  test2(e) {
    this.generic(e)
  }


  mentionTemp() {
    this.modalService.dismissAll();
    this.markdownInstance.getInstance().focus();
    var a = this.markdownInstance.getInstance().getSelection();
    this.markdownInstance.getInstance().pasteHTML(a.index,
      `<span class="mention" data-index="2" data-denotation-char="@" data-id="3" data-value="Variable3">&#65279;<span contenteditable="false"><span class="ql-mention-denotation-char">@</span>Variable3</span>&#65279;</span>`


      , 'silent');

  }

  customBoldHandler() {

    console.log('handler', this.markdownInstance.getInstance().getSelection());

    var a = this.markdownInstance.getInstance().getSelection();
    this.markdownInstance.getInstance().pasteHTML(a.index, '<p>{{variableName}}</p>', 'silent')

  }

  customBoldHandler2() {

    console.log('handler2', this.markdownInstance.getInstance().getSelection());

    var a = this.markdownInstance.getInstance().getSelection();
    this.markdownInstance.getInstance().pasteHTML(a.index, '<p>{{variableName2}}</p>', 'silent')

  }

  customBoldHandlerRaz() {
    console.log('handlerRaz', this.markdownInstance.getInstance().getSelection());

    var a = this.markdownInstance.getInstance().getSelection();
    this.markdownInstance.getInstance().pasteHTML(a.index, '{{One}}', 'silent')

  }

  customBoldHandlerDwa() {
    console.log('handlerDwa', this.markdownInstance.getInstance().getSelection());

    var a = this.markdownInstance.getInstance().getSelection();
    this.markdownInstance.getInstance().pasteHTML(a.index, '{{Two}}', 'silent')

  }

  generic(variableName, boo?: boolean) {
    var a = this.markdownInstance.getInstance().getSelection();
    console.log(a)
    this.markdownInstance.getInstance().pasteHTML(boo ? 0 : a.index, '{{' + variableName + '}}', 'silent')
  }
  ngOnInit() {
    this.templateForm.get('template2').valueChanges.pipe(distinctUntilChanged(), filter(v => v))
      .subscribe(v => {
        console.log(v, 'value changed')
        console.log(this.markdownInstance.getValueAsMarkdown(), 'html to markdown');
        console.log(this.markdownInstance.markdownToHtml(this.markdownInstance.getValueAsMarkdown()), 'markdown to html');
      })

  }

  handleContentChange(e) {
    console.log(e, 'contentChanged')
  }

  handleSelectionChange(e) {
    console.log(e, 'selectionChanged')
  }

  test() {
    console.log(this.templateForm.get('template2').value)
  }

}
