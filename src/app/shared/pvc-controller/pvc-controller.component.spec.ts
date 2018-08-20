import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PvcControllerComponent } from './pvc-controller.component';

describe('PvcControllerComponent', () => {
  let component: PvcControllerComponent;
  let fixture: ComponentFixture<PvcControllerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PvcControllerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PvcControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
