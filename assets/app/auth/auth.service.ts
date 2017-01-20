import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { User } from './user.model';

@Injectable()
export class AuthService {
    private userUrl = 'http://localhost:3000/api/users';

    constructor(private http: Http) { }

    private extractData(res: Response) {
        const body = res.json();
        return body || {};
    }

    private errorHandler(err: Response | any) {
        Observable.throw(err.json());
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

}
