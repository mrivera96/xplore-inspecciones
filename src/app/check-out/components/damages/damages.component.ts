import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-damages',
  templateUrl: './damages.component.html',
  styleUrls: ['./damages.component.scss'],
  standalone: true,
})
export class DamagesComponent implements OnInit {
  @Input('step') currentStep: number = 3;
  constructor() {}

  ngOnInit() {}
}
