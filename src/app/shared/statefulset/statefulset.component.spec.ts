import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatefulsetComponent } from './statefulset.component';

describe('StatefulsetComponent', () => {
  let component: StatefulsetComponent;
  let fixture: ComponentFixture<StatefulsetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatefulsetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatefulsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
