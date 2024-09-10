import { Component } from '@angular/core';
import { AuthService } from '../../core/services/authentication/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-send-reset-email',
  templateUrl: './send-reset-email.component.html',
  styleUrl: './send-reset-email.component.css',
})
export class SendResetEmailComponent {
  success: boolean = false;
  message: string = '';
  error: boolean = false;

  constructor(private authSerive: AuthService) {}

  onSubmit(sendEmailForm: NgForm) {
    if (sendEmailForm.invalid) {
      this.markFormGroupTouched(sendEmailForm);
      return;
    }

    const emailObj = {
      email: sendEmailForm.value.email,
    };
    this.authSerive.sendResetPasswordEmail(emailObj).subscribe(
      (res) => {
        this.success = true;
        this.message = res.message;
      },
      (error) => {
        this.error = true;
        this.message = error.error.message;
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
