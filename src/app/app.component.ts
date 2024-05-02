import { Component, inject } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { AuthService } from './shared/services/auth.service';
import { NavController } from '@ionic/angular';

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
  //declaracion de propiedades
  public appPages = [
    { title: 'Inicio', url: '/home', icon: 'home' },
    { title: 'Registros', url: '/registros', icon: 'list' },
    { title: 'Cuentas', url: '/cuentas', icon: 'wallet' },
    { title: 'Préstamos', url: '/prestamos', icon: 'cash' },
  ];

  public labels = [
    { title: 'Categorías', icon: 'list-circle', url: '/categorias' },
  ];

  protected currentUser = this.authService.currentUser;

  constructor() {}

  onLogout() {
    this.authService.logout();
    this.navController.navigateRoot('/login');
  }
}
