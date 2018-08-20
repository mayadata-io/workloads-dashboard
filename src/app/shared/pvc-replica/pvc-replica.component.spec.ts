import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PvcReplicaComponent } from './pvc-replica.component';

describe('PvcReplicaComponent', () => {
  let component: PvcReplicaComponent;
  let fixture: ComponentFixture<PvcReplicaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PvcReplicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PvcReplicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
