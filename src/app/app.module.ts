import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppComponent } from 'app/app.component';
import { AppInitializationService } from 'app/app-initialization.service';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    KeycloakAngularModule,
    HttpClientModule
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

export function appInitializerFactory(appInitialization: AppInitializationService): () => Promise<any> {
  return (): Promise<any> => appInitialization.initApplication();
}
