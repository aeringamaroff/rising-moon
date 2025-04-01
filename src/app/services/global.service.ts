import { Injectable } from '@angular/core';
import {
  AlertController,
  LoadingController,
  ModalController,
  ToastController,
} from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  loading: boolean = false;

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private modalController: ModalController
  ) {}

  async showAlert(message: string, header?: string, buttons?: any) {
    await this.alertController
      .create({
        header,
        message,
        buttons,
      })
      .then((alert) => {
        alert.present();
      });
  }

  async showToast(
    message: string,
    duration: number,
    color: string,
    position: any
  ) {
    const toast = await this.toastController.create({
      message,
      duration: duration ? duration : 3000,
      color,
      position,
    });

    await toast.present();
  }

  async showLoader(message?: string) {
    this.loading = true;

    return await this.loadingController
      .create({
        message,
        spinner: 'bubbles',
      })
      .then((loader) => {
        loader.present().then(() => {
          if (!this.loading) {
            loader.dismiss().then(() => {
              console.log('loader dismissed');
            });
          }
        });
      })
      .catch((error) => {
        console.error('error showing loader', error);
      });
  }

  async hideLoader() {
    this.loading = false;

    return await this.loadingController.dismiss();
  }

  async createModal(options: any) {
    const modal = await this.modalController.create(options);

    await modal.present();

    const { data } = await modal.onWillDismiss();

    console.log('modal data', data);

    if (data) return data;
  }
}
