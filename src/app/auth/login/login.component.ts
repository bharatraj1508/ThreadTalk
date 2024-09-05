import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../core/services/authentication/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  formError: boolean = false;
  error: boolean = false;
  message: string = '';

  constructor(public authService: AuthService) {}

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
        loginForm.reset();
        this.resetErrorAndValidation();
        console.log(res);
        //store access token to local storage here and nvaigate the user to dashboard
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
}
