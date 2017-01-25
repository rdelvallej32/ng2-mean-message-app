import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

// Feature Modules
import { MessageModule } from './messages/message.module';

import { AppComponent } from "./app.component";

import { AuthenticationComponent } from './auth/authentication.component';
import { AuthService } from './auth/auth.service';

import { ErrorComponent }  from './errors/error.component';
import { ErrorService } from './errors/error.service';

import { HeaderComponent } from './shared/header.component';
import { routing } from './app.routing';

@NgModule({
    declarations: [
        AppComponent,
        AuthenticationComponent,
        ErrorComponent,
        HeaderComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        routing,
        MessageModule
    ],
    providers: [
        AuthService,
        ErrorService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}
