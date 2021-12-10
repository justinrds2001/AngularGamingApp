import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  subs: Subscription | undefined;
  loginError: any;
  userInfo: any = {
    username: '',
    password: '',
  };

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  onSubmit(form: NgForm): void {
    this.userInfo.username = form.value.username;
    this.userInfo.password = form.value.password;
    this.authService
      .login(this.userInfo.username, this.userInfo.password!)
      .subscribe((res) => {
        if (res) {
          console.log('login successful: ' + res);
          this.router.navigate(['../'], { relativeTo: this.route });
        } else {
          console.log('login failed: ' + res);
          this.loginError = 'User not found or password is invalid';
        }
      });
  }

  validEmail(control: FormControl): { [s: string]: boolean } | null {
    const email = control.value;
    const regexp = new RegExp(
      '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'
    );
    if (regexp.test(email) !== true) {
      return { email: false };
    } else {
      return null;
    }
  }

  validPassword(control: FormControl): { [s: string]: boolean } | null {
    const password = control.value;
    const regexp = new RegExp('^[a-zA-Z]([a-zA-Z0-9]){2,14}');
    const test = regexp.test(password);
    if (regexp.test(password) !== true) {
      return { password: false };
    } else {
      return null;
    }
  }
}
