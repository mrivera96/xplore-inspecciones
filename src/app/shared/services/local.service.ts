import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LocalService {
  key = environment.cryptKey;

  constructor() {}

  public saveData(key: string, value: string) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  public getData(key: string) {
    let data = localStorage.getItem(key);
    if (!data) {
      return null;
    }
    return JSON.parse(data);
  }
  public removeData(key: string) {
    localStorage.removeItem(key);
  }
  public clearData() {
    localStorage.clear();
  }
}
