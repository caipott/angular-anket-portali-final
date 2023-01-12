import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CevaplarComponent } from './cevaplar.component';

describe('CevaplarComponent', () => {
  let component: CevaplarComponent;
  let fixture: ComponentFixture<CevaplarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CevaplarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CevaplarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
