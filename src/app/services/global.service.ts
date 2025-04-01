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
  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private modalController: ModalController
  ) {}

  getIcon(title: string) {
    const name = title.toLowerCase();

    switch (name) {
      case 'home':
        return 'home-outline';
      case 'work':
        return 'briefcase-outline';
      default:
        return 'location-outline';
    }
  }

  showAlert(message: string, header?: string, buttons?: any) {
    this.alertController
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
    return await this.loadingController
      .create({
        message,
        spinner: 'bubbles',
      })
      .then((loader) => {
        loader.present();
      })
      .catch((error) => {
        console.error('error showing loader', error);
      });
  }

  async hideLoader() {
    return await this.loadingController.dismiss();
  }

  async createModal(options: any) {
    const modal = await this.modalController.create(options);

    await modal.present();

    const { data } = await modal.onWillDismiss();

    console.log('modal data', data);

    if (data) return data;
  }

  async dismissModal(value?: any) {
    let data;

    if (value) {
      data = value;
    }

    await this.modalController.dismiss(data);
  }
}
