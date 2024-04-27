import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  private router = inject(Router);
  constructor() {}

  navigate(path: string) {
    this.router.navigate([path], { replaceUrl: true });
  }
}
