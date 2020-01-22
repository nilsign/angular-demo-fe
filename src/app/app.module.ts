import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppInitializationService } from './app-initialization.service';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    KeycloakAngularModule
  ],
  providers: [
    KeycloakService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      multi: true,
      deps: [AppInitializationService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

export function appInitializerFactory(appInitializer: AppInitializationService): () => Promise<any> {
  return (): Promise<any> => appInitializer.initApplication();
}
