import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { InspectionsService } from '../services/inspections.service';

@Injectable({
  providedIn: 'root',
})
export class InspectionGuard implements CanActivate {
  inspectionsService = inject(InspectionsService);

  constructor(private router: Router) {}

  canActivate(): boolean {
    if (this.inspectionsService.currentInspection() != undefined) {
      return true;
    } else {
      this.router.navigate(['/tabs/inspection']);
      return false;
    }
  }
}
