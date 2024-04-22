import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';
import { NavController } from '@ionic/angular';
import { LocalService } from '../services/local.service';
import { addIcons } from 'ionicons';
import { FormControl, FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  //inyeccion de servicios
  private authService = inject(AuthService);
  private router = inject(Router);
  private alertService = inject(AlertService);
  private localService = inject(LocalService);

  //inyeccion de dependencias
  private navController = inject(NavController);

  //declaracion de propiedades
  protected loading: boolean = false;
  private returnUrl: string = 'tabs/home';
  protected alertHeader: string = '';
  protected alertMessage: string = '';
  protected alertButtons: any = [];
  protected isAlertOpen: boolean = false;
  loginForm: FormGroup;

  constructor() {
    var currentUser = this.authService.getCurrentUser();

    if (currentUser != undefined) {
      this.router.navigate(['']);
    }

    this.loginForm = new FormGroup({
      nickname: new FormControl(localStorage.getItem('remember_user')!),
      password: new FormControl(),
    });
  }

  ngOnInit() {}

  async onLogin() {
    if (this.loginForm.valid) {
      await this.alertService.presentLoading();

      this.authService
        .login(
          this.loginForm.controls['nickname'].value,
          this.loginForm.controls['password'].value
        )
        .subscribe({
          next: async (res) => {
            const user = res.data.user;
            this.localService.saveData('currentUser', user);
            this.authService.setCurrUser(user);
            this.alertService.dismissDefaultLoading();
            await this.alertService.basicAlert(
              'Éxito!',
              'Se ha autenticado correctamente.',
              [
                {
                  text: 'OK',
                  role: 'OK',
                  handler: () => {
                    this.navController.navigateForward(this.returnUrl);
                  },
                },
              ]
            );
          },
          error: async (err) => {
            await this.alertService.dismissDefaultLoading();
            await this.alertService.basicAlert(
              'Error!',
              err.error.message ||
                'Ocurrió un error al conectar con el servidor',
              ['Ok']
            );
          },
        });
    }
  }
}
