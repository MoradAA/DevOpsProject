import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeslissingsAlgoritmeComponent } from './beslissings-algoritme.component';

describe('BeslissingsAlgoritmeComponent', () => {
  let component: BeslissingsAlgoritmeComponent;
  let fixture: ComponentFixture<BeslissingsAlgoritmeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeslissingsAlgoritmeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeslissingsAlgoritmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
