import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'login-component',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit {
    constructor(
        private router: Router
    ) {}

    username = new FormControl('', Validators.required)
    password = new FormControl('', Validators.required)

    ngOnInit(): void {}

    login($event: any): void {
        $event.preventDefault()
        const userData = { username: this.username.value, password: this.password.value }
        if (this.username.errors === null && this.password.errors === null) {
            this.router.navigate(['/dashboard-movies']);
            localStorage.setItem('userData', JSON.stringify(userData))
        }
    }
}
