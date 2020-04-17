
import { enableProdMode, NgZone } from '@angular/core';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Router } from '@angular/router';
import { ɵAnimationEngine as AnimationEngine } from '@angular/animations/browser'; 
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import singleSpaAngular from 'single-spa-angular';
import { singleSpaPropsSubject } from './single-spa/single-spa-props';

if (environment.production) {
  enableProdMode();
}

const lifecycles = singleSpaAngular({
  bootstrapFunction: singleSpaProps => {

    console.log("microfrontend alarmas");    
    console.log(singleSpaProps);

    singleSpaPropsSubject.next(singleSpaProps);
    return platformBrowserDynamic().bootstrapModule(AppModule);
  },

  // situar la posicion del microfrontend
  domElementGetter: function(){
    let el = window.document.getElementById('alarms');
    if (!el) {
        el = window.document.createElement('alarms');
        el.id = 'alarms';
        window.document.body.appendChild(el);
    }
    return el;
  },
  //

  template: '<satrack-alarms-web-root />',
  Router,
  NgZone: NgZone,
  AnimationEngine: AnimationEngine,
});

export const bootstrap = lifecycles.bootstrap;
export const mount = lifecycles.mount;
export const unmount = lifecycles.unmount;