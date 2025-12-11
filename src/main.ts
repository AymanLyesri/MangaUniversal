import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { APP_INITIALIZER, isDevMode } from '@angular/core';
import { inject } from '@vercel/analytics/*';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));

bootstrapApplication(AppComponent, {
  providers: [
    // provideRouter(routes), // Uncomment if you use the provideRouter config
    {
      // Use APP_INITIALIZER to run code when the app starts
      provide: APP_INITIALIZER,
      useFactory: () => {
        return () => {
          inject({
            // Optional: set mode to 'development' or 'production'
            mode: isDevMode() ? 'development' : 'production',
          });
        };
      },
      multi: true, // Required for APP_INITIALIZER
    },
  ],
}).catch((err) => console.error(err));
