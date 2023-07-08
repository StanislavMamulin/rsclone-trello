import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalHotkeysComponent } from './modal-hotkeys.component';

describe('ModalHotkeysComponent', () => {
  let component: ModalHotkeysComponent;
  let fixture: ComponentFixture<ModalHotkeysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalHotkeysComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalHotkeysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
