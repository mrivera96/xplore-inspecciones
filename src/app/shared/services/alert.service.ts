import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  alert: any;
  loading: any;
  constructor(
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {}

  async basicAlert(header: string, message: string, buttons: any[]) {
    this.alert = await this.alertCtrl.create({
      header,
      message,
      buttons,
    });
    this.alert.present();
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Espere un momento, por favor',
    });
    await this.loading.present();
  }

  async dismissDefaultLoading() {
    await this.loading.dismiss();
  }
}
