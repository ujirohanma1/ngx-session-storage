import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxSessionStorage } from './ngx-session-storage';

describe('NgxSessionStorage', () => {
  let component: NgxSessionStorage;
  let fixture: ComponentFixture<NgxSessionStorage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxSessionStorage],
    }).compileComponents();

    fixture = TestBed.createComponent(NgxSessionStorage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
