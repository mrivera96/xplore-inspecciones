import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  //inyeccion de servicios

  //inyeccion de dependencias
  private router = inject(Router);
  constructor() {}

  navigate(path: string) {
    this.router.navigate([path], { replaceUrl: true });
  }

  goToCheckOut() {
    this.router.navigate(['tabs/inspections/checkout'], {
      state: { stage: 'checkout' },
    });
  }
  goToCheckIn() {
    this.router.navigate(['tabs/inspections/checkin'], {
      state: { stage: 'checkin' },
    });
  }
}
