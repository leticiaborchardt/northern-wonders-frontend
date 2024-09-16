import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertService } from '../../services/alert.service';
import { UserRole } from '../../models/user-role';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { Customer } from '../../models/customer.model';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../../../features/services/customer.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, RouterLink, MatFormFieldModule, MatInputModule, MatDatepickerModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private customerService: CustomerService, private router: Router, private alertService: AlertService) {
    this.form = this.fb.group({
      user: this.fb.group({
        login: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
        role: new FormControl(UserRole.CLIENT)
      }),
      customer: this.fb.group({
        name: new FormControl('', [Validators.required]),
        phone: new FormControl('', [Validators.required]),
        birthDate: new FormControl('', [Validators.required]),
        documentNumber: new FormControl('', [Validators.required]),
        address: new FormControl('', [Validators.required])
      })
    });
  }

  handleSubmit(): void {
    if (this.form.valid) {
      this.customerService.createCustomer(this.form.value).subscribe({
        next: (res: Customer) => {
          this.alertService.showAlert('User created successfully!', 'success');
          this.router.navigate(["/login"]);
        },
        error: (error) => {
          this.alertService.showAlert('error', 'error');
        }
      })
    } else {
      this.form.markAllAsTouched();
    }
  }
}
