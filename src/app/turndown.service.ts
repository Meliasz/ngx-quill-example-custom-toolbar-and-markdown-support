import { Injectable } from '@angular/core';
import TurndownService from 'turndown';
import * as marked from 'marked';

@Injectable({
  providedIn: 'root'
})
export class MarkdownService {
  turndown;
  constructor() {  this.turndown = new TurndownService(	{codeBlockStyle: 'fenced',
	hr: '---',
	headingStyle: 'atx' } ) }

  htmlToMarkDown(input) {
 marked.setOptions({headerIds: false})
 var z = this.turndown.turndown(input);
 console.log(z);
 const htmlA = marked(z);
 console.log(htmlA)
  }
}
