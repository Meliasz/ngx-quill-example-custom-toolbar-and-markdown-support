import { TestBed } from '@angular/core/testing';

import { MarkdownService } from './turndown.service';

describe('TurndownService', () => {
  let service: MarkdownService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarkdownService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
