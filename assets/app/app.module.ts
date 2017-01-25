import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Feature Modules
import { MessageModule } from './messages/message.module';

import { AppComponent } from "./app.component";

import { AuthenticationComponent } from './auth/authentication.component';
import { LogoutComponent } from './auth/logout.component';
import { SignUpComponent } from './auth/sign-up.component';
import { SignInComponent } from './auth/sign-in.component';
import { AuthService } from './auth/auth.service';

import { ErrorComponent }  from './errors/error.component';
import { ErrorService } from './errors/error.service';

import { HeaderComponent } from './shared/header.component';
import { routing } from './app.routing';

@NgModule({
    declarations: [
        AppComponent,
        AuthenticationComponent,
        LogoutComponent,
        SignUpComponent,
        SignInComponent,
        ErrorComponent,
        HeaderComponent
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
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
