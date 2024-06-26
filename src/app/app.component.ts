import { Component, inject } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { AuthService } from './shared/services/auth.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

register();
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  //inyección de servicios
  private authService = inject(AuthService);
  //inyección de dependencias
  private navController = inject(NavController);
  private router = inject(Router);
  //declaracion de propiedades
  public appPages = [
    { title: 'Inicio', url: '/home', icon: 'home' },
  ];

  public labels = [
    { title: 'Tipos de Daños', icon: 'list-circle', url: '/damage-types' },
    { title: 'Piezas', icon: 'list-circle', url: '/auto-parts' },
    { title: 'Accesorios', icon: 'list-circle', url: '/accessories' },
  ];

  protected currentUser = this.authService.currentUser;

  constructor() {}

  onLogout() {
    this.authService.logout();
    this.navController.navigateRoot('/login');
  }

  goToCheckouts() {
    this.router.navigate(['inspections/checkout'], {
      state: { stage: 'checkout' },
    });
  }

  goToCheckins() {
    this.router.navigate(['inspections/checkin'], {
      state: { stage: 'checkin' },
    });
  }
}
