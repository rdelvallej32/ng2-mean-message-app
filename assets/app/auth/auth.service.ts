import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { ErrorService } from '../errors/error.service';

import { Observable } from 'rxjs/Observable';

import { User } from './user.model';

@Injectable()
export class AuthService {
    private userUrl = 'https://ng2-mean-message-app.herokuapp.com/api/users';

    constructor(private http: Http, private errorService: ErrorService) { }

    private extractData(res: Response) {
        const body = res.json();
        return body || {};
    }

    private errorHandler(err: Response | any) {
        this.errorService.handleError(err.json());
        return Observable.throw(err.json());
    }

    signup(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.userUrl, body, { headers: headers })
            .map((res: Response) => this.extractData(res))
            .catch(this.errorHandler);
    }

    signin(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(`${this.userUrl}/sign-in`, body, { headers: headers })
            .map((res: Response) => this.extractData(res))
            .catch(this.errorHandler);
    }

    logout() {
        localStorage.clear();
    }

    isLoggedIn() {
        return localStorage.getItem('token') !== null;
    }
}
