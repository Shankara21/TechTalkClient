import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexArticleComponent } from './index-article.component';

describe('IndexArticleComponent', () => {
  let component: IndexArticleComponent;
  let fixture: ComponentFixture<IndexArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexArticleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
