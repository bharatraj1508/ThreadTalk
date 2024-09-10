import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core/services/authentication/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent {
  success: boolean = false;
  error: boolean = false;
  message: string = '';
  token: string = '';

  constructor(
    private router: ActivatedRoute,
    private authService: AuthService
  ) {
    this.router.queryParams.subscribe((params) => {
      if (params['t']) {
        this.token = params['t'];

        if (this.isValidJWT(this.token)) {
          if (this.isTokenExpired(this.token)) {
            this.error = true;
            this.message =
              'The password reset link has expired. Please request a new one.';
          }
        } else {
          this.error = true;
          this.message =
            'Invalid reset password link. Please request a new one.';
        }
      } else {
        this.error = true;
        this.message = 'Something went wrong. Please requeset a new link.';
      }
    });
  }

  onSubmit(passwordResetForm: NgForm) {
    if (
      passwordResetForm.invalid ||
      passwordResetForm.value.password !==
        passwordResetForm.value.confirm_password
    ) {
      this.markFormGroupTouched(passwordResetForm);
      return;
    }

    const passObj = {
      password: passwordResetForm.value.password,
    };
    console.log(passObj);
    this.authService.resetPassword(passObj, this.token).subscribe(
      (res) => {
        this.success = true;
        this.message = 'Your password has been reset successfully.';
        passwordResetForm.reset();
      },
      (error) => {
        this.error = true;
        this.message = 'Something went wrong. Please request a new link.';
      }
    );
  }

  private isValidJWT(token: string): boolean {
    return token.split('.').length === 3;
  }

  private isTokenExpired(token: string): boolean {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return Date.now() >= payload.exp * 1000;
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
}
