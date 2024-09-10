import { Component } from '@angular/core';
import { User } from '../../core/interfaces/user';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../core/services/authentication/auth.service';
import { ViewChild } from '@angular/core';
import { AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements AfterViewInit {
  newUser: User = { first_name: '', last_name: '', email: '', password: '' };
  @ViewChild('signUpForm') signUpForm!: NgForm;
  formError: boolean = false;
  warning: boolean = false;
  success: boolean = false;
  submitted: boolean = false;
  message: string = '';

  constructor(public authService: AuthService) {}

  onSubmit(signUpForm: NgForm) {
    if (
      signUpForm.invalid ||
      signUpForm.value.password !== signUpForm.value.confirm_password
    ) {
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
          'Your account has been created successfully. Please verify your email address.';
        this.signUpForm.resetForm();
        this.newUser = {
          first_name: '',
          last_name: '',
          email: '',
          password: '',
        };
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

  ngAfterViewInit() {
    this.signUpForm.form.valueChanges.subscribe(() => {
      this.checkFormValidity();
      // Reset form controls to untouched state
      Object.keys(this.signUpForm.form.controls).forEach((key) => {
        const control = this.signUpForm.form.get(key);
        if (control) {
          control.markAsUntouched();
        }
      });
    });
  }

  checkFormValidity() {
    if (
      this.signUpForm.form.valid &&
      this.signUpForm.value.password === this.signUpForm.value.confirm_password
    ) {
      this.formError = false;
      this.warning = false;
      this.success = false;
      this.message = '';
    }
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
