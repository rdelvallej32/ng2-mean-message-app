import { Routes, RouterModule } from '@angular/router';

import { SignUpComponent } from './sign-up.component';
import { SignInComponent } from './sign-in.component';
import { LogoutComponent } from './logout.component';

const AUTH_ROUTES: Routes = [
    { path: '', redirectTo: 'signup', pathMatch: 'full' },
    { path: 'signup', component: SignUpComponent },
    { path: 'signin', component: SignInComponent },
    { path: 'logout', component: LogoutComponent }
];

export const authRouting = RouterModule.forChild(AUTH_ROUTES);
