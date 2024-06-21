import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardActorComponent } from './card-actor.component';

describe('CardActorComponent', () => {
  let component: CardActorComponent;
  let fixture: ComponentFixture<CardActorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardActorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardActorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
