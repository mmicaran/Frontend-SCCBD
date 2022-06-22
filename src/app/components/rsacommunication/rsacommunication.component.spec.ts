import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RSAcommunicationComponent } from './rsacommunication.component';

describe('RSAcommunicationComponent', () => {
  let component: RSAcommunicationComponent;
  let fixture: ComponentFixture<RSAcommunicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RSAcommunicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RSAcommunicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
