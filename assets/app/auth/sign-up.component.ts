import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { User } from './user.model';
import { AuthService } from './auth.service';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html'
})

export class SignUpComponent implements OnInit {
    myForm: FormGroup;

    constructor(private authService: AuthService) { }

    ngOnInit() {
        this.myForm = new FormGroup({
            firstName: new FormControl('', Validators.required),
            lastName: new FormControl('', Validators.required),
            email: new FormControl('', [
                Validators.required,
                Validators.pattern('/^(([^<>()[]\.,;:s@"]+(.[^<>()[]\.,;:s@"]+)*)|(".+"))@(([[0 - 9]{1,3}.[0 - 9]{1,3}.[0 - 9]{1,3}.[0 - 9]{1,3}]) | (([a - zA - Z - 0 - 9] +.)+ [a - zA - Z]{2,}))$ / ')
            ]),
            password: new FormControl('', Validators.required),
        });
    }

    onSubmit() {
        const user = new User(
            this.myForm.value.email,
            this.myForm.value.password,
            this.myForm.value.firstName,
            this.myForm.value.lastName
        );
        this.authService.signup(user)
            .subscribe(
            res => console.log(res),
            err => console.log(err)
            )
        this.myForm.reset();
    }
}
