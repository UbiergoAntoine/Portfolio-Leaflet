import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemePageComponent } from './theme-page.component';

describe('Theme-pageComponent', () => {
  let component: ThemePageComponent;
  let fixture: ComponentFixture<ThemePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ThemePageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
