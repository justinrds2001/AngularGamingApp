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
  sub?: Subscription;
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
    this.sub?.unsubscribe();
  }

  onSubmit(form: NgForm): void {
    this.userInfo.username = form.value.username;
    this.userInfo.password = form.value.password;
    this.sub = this.authService
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
}
