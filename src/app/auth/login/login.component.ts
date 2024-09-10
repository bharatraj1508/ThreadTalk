import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/services/authentication/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  formError: boolean = false;
  error: boolean = false;
  message: string = '';
  token: string = '';
  verified: boolean = false;

  constructor(
    private authService: AuthService,
    private router: ActivatedRoute,
    private route: Router
  ) {
    this.router.queryParams.subscribe((params) => {
      if (params['t']) {
        this.token = params['t'];
        this.checkEmailVerification();
      }
    });
  }

  onSubmit(loginForm: NgForm) {
    const existingUser = {
      email: loginForm.value.email,
      password: loginForm.value.password,
    };

    if (loginForm.invalid) {
      this.formError = true;
      this.markFormGroupTouched(loginForm.form);
      return;
    }

    this.authService.login(existingUser).subscribe(
      (res) => {
        localStorage.setItem('t', res.access_token);
        loginForm.reset();
        this.resetErrorAndValidation();
        this.route.navigate(['/d']);
      },
      (error) => {
        if (error.status == 401 || 404) {
          this.error = true;
          this.message = error.error.message;
        }
      }
    );
  }

  //this funciton will visit all the controls in the form, to check the invalid controls
  private markFormGroupTouched(formGroup: any) {
    Object.values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  private resetErrorAndValidation() {
    this.message = '';
    this.formError = false;
    this.error = false;
  }

  private checkEmailVerification() {
    this.authService.verifyEmail(this.token).subscribe(
      (res) => {
        this.verified = true;
        this.message =
          'Email has been succesfully verified. Please login with your new credentials';
      },
      (error) => {
        console.log(error);
        this.error = true;
        this.message =
          'Soemthing went wrong to verify your email. Please contact admin.';
      }
    );
  }
}
