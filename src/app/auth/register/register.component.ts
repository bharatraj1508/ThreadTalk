import { Component } from '@angular/core';
import { User } from '../../core/interfaces/user';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../core/services/authentication/auth.service';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  newUser: User = { first_name: '', last_name: '', email: '', password: '' };
  @ViewChild('signUpForm') signUpForm!: NgForm;
  formError: boolean = false;
  warning: boolean = false;
  success: boolean = false;
  submitted: boolean = false;
  message: string = '';

  constructor(public authService: AuthService) {}

  onSubmit(signUpForm: NgForm) {
    if (signUpForm.invalid) {
      this.formError = true;
      this.message =
        'Please review and correct the highlighted fields before submitting.';
      this.markFormGroupTouched(this.signUpForm.form);
      return;
    }

    this.newUser = signUpForm.value;
    this.authService.register(this.newUser).subscribe(
      (res) => {
        this.success = true;
        this.message =
          'Your account has been created successfully. Please login with your credentials';
      },
      (error) => {
        if (error.status == 409) {
          this.warning = true;
          this.message =
            'We are umnable to create the account. This email has already been taken';
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
}
