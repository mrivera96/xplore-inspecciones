import { Injectable, inject } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ScreenOrientation } from '@capacitor/screen-orientation';
import { Platform } from '@ionic/angular';
@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  private platform = inject(Platform);
  public photos: any[] = [];
  constructor() {}

  public async addNewToGallery() {
    if (this.platform.is('mobile')) {
      await Camera.requestPermissions();
      await ScreenOrientation.lock({ orientation: 'landscape' });
    }

    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 80,
    });
    // To unlock orientation which will default back to the global setting:
    await ScreenOrientation.unlock();
    this.photos.unshift(capturedPhoto.base64String);
  }

  clearPhotos() {
    this.photos = [];
  }
}
