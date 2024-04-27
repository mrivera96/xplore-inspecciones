import { Injectable } from '@angular/core';
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  public photos: any[] = [];
  constructor() {}

  public async addNewToGallery() {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 80,
    });

    this.photos.unshift(capturedPhoto.base64String);
  }

  clearPhotos() {
    this.photos = [];
  }
}
