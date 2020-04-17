import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { assetUrl } from 'src/single-spa/asset-url';

export enum ImageType {
  'ICON' = 1
}

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(
    public iconRegistry: MatIconRegistry,
    public sanitizer: DomSanitizer) {
    this.registerImg();

  }

  registerImg() {
    this.register('ic_alarm.svg', ImageType.ICON);
    this.register('ic_alarm_notification.svg', ImageType.ICON);
    this.register('ic-alert-list.svg', ImageType.ICON);
    this.register('ic-alert-list-read.svg', ImageType.ICON);
    this.register('ic-panic_button-read.svg', ImageType.ICON);
    this.register('ic-panic-button.svg', ImageType.ICON);
    this.register('ic-battery.svg', ImageType.ICON);
    this.register('ic-battery-read.svg', ImageType.ICON);
    this.register('ic_user.svg', ImageType.ICON);
    this.register('ic_no_alerts.svg', ImageType.ICON); 
    this.register('ic-alerts-error.svg', ImageType.ICON);     
  }

  register(iconName: string, iconType: ImageType = ImageType.ICON) {
    let base = assetUrl('img/');

    switch (iconType) {
      case ImageType.ICON:
          base += 'iconos/';
          break;
      default:
        base += '';
        break;
    }
    this.iconRegistry.addSvgIcon(iconName, this.sanitizer.bypassSecurityTrustResourceUrl(base + iconName));
  }
}
