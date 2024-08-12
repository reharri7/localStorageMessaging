import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddMessageComponent} from './add-message.component';

describe('AddMessageComponent', () => {
  let component: AddMessageComponent;
  let fixture: ComponentFixture<AddMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMessageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
