/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListEditComponent } from './list-edit.component';

describe('ListEditComponent', () => {
  let component: ListEditComponent;
  let fixture: ComponentFixture<ListEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
