import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { User } from '../user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  user: User = new User();
  sub?: Subscription;
  registerError: any;

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
    let user: User = {
      _id: undefined,
      username: form.value.username,
      password: form.value.password,
      token: undefined,
    };
    this.sub = this.authService.register(user).subscribe((res) => {
      if (res) {
        console.log('register successful: ' + res);
        this.router.navigate(['../'], { relativeTo: this.route });
      } else {
        console.log('register failed: ' + res);
        this.registerError = 'Username already exists';
      }
    });
  }
}
