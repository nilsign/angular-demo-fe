import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AppComponent } from 'app/app.component';
import { KeycloakAngularModule, KeycloakService} from 'keycloak-angular';
import { AppInitializationService } from 'app/app-initialization.service';
import { AppRoutingModule } from 'app/app-routing.module';
import { SharedModule} from 'shared/shared.module';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    KeycloakAngularModule,
    SharedModule
  ],
  declarations: [
    AppComponent
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
