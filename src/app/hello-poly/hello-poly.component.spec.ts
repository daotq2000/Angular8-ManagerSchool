import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelloPolyComponent } from './hello-poly.component';

describe('HelloPolyComponent', () => {
  let component: HelloPolyComponent;
  let fixture: ComponentFixture<HelloPolyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelloPolyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelloPolyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
