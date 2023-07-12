import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

import * as firebase from 'firebase/app';
import { environment } from './environments/environment';
const firebaseConfig = environment.firebaseConfig;

if (environment.production) {
  enableProdMode();
}

firebase.initializeApp(firebaseConfig);

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
