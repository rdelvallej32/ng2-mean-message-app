import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html'
})

export class SignInComponent {
    myForm: FormGroup;

    ngOnInit() {
        this.myForm = new FormGroup({
            email: new FormControl('', [
                Validators.required,
                Validators.pattern('/^(([^<>()[]\.,;:s@"]+(.[^<>()[]\.,;:s@"]+)*)|(".+"))@(([[0 - 9]{1,3}.[0 - 9]{1,3}.[0 - 9]{1,3}.[0 - 9]{1,3}]) | (([a - zA - Z - 0 - 9] +.)+ [a - zA - Z]{2,}))$ / ')
            ]),
            password: new FormControl('', Validators.required),
        });
    }

    onSubmit() {
        console.log(this.myForm);
    }
}
