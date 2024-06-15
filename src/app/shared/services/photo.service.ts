import { Injectable, inject, signal } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Platform } from '@ionic/angular';
@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  private platform = inject(Platform);
  public photos = signal<any[]>([]);
  constructor() {}

  public async addNewToGallery() {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 80,
    });
    // To unlock orientation which will default back to the global setting:
    //await ScreenOrientation.unlock();
    this.photos.set([capturedPhoto.base64String]);
  }

  clearPhotos() {
    this.photos.set([]);
  }
}
