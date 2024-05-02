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
    { title: 'Inspecciones abiertas', url: '/registros', icon: 'folder-open' },
    { title: 'Inspecciones cerradas', url: '/cuentas', icon: 'folder' },
  ];

  public labels = [
    { title: 'Tipos de daños', icon: 'list-circle', url: '/categorias' },
    { title: 'Piezas', icon: 'list-circle', url: '/categorias' },
    { title: 'Accesorios', icon: 'list-circle', url: '/categorias' },
  ];

  protected currentUser = this.authService.currentUser;

  constructor() {}

  onLogout() {
    this.authService.logout();
    this.navController.navigateRoot('/login');
  }
}
