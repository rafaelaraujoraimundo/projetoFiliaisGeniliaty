/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListNewComponent } from './list-new.component';

describe('ListNewComponent', () => {
  let component: ListNewComponent;
  let fixture: ComponentFixture<ListNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
