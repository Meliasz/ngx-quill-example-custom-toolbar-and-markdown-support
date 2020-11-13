import { Injectable } from '@angular/core';
import TurndownService  from 'turndown';
import marked   from 'marked';

@Injectable({
  providedIn: 'root'
})
export class MarkdownService {
  turndown: TurndownService;
  constructor() { this.turndown = new TurndownService({ codeBlockStyle: 'fenced', hr: '---', headingStyle: 'atx' }); }

  htmlToMarkdown(html: string): string {
    marked.setOptions({ headerIds: false });
    return this.turndown.turndown(html);
  }

  markdownToHtml(markdown: string): string {
    return marked(markdown);
  }

}
