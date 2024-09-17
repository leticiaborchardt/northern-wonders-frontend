import { ChangeDetectionStrategy, Component, Inject, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TravelPackageService } from '../../services/travel-package.service';
import { AlertService } from '../../../core/services/alert.service';
import { TravelPackage } from '../../../core/models/travel-package.model';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { Destination } from '../../../core/models/destination.model';
import { DestinationService } from '../../services/destination.service';
import { CommonModule } from '@angular/common';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-travel-package-modal',
  standalone: true,
  providers: [
    provideNativeDateAdapter(),
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { hideRequiredMarker: true }
    }
  ],
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatSelectModule, MatDialogModule],
  templateUrl: './travel-package-modal.component.html',
  styleUrl: './travel-package-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TravelPackageModalComponent implements OnInit {
  travelPackageForm: FormGroup;
  destinations: Destination[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: TravelPackage | null,
    private fb: FormBuilder,
    private travelPackageService: TravelPackageService,
    private destinationService: DestinationService,
    public dialogRef: MatDialogRef<TravelPackageModalComponent>,
    private alertService: AlertService,
  ) {
    this.travelPackageForm = this.fb.group({
      destination: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      imageUrl: new FormControl('', [Validators.required]),
      hotelName: new FormControl(''),
      airline: new FormControl(''),
      flightNumber: new FormControl(''),
      price: new FormControl(0, [Validators.required, Validators.min(0.1)]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.getDestinationList();

    if (this.data) {
      this.travelPackageForm.patchValue(this.data);
    }
  }

  getDestinationList(): void {
    this.destinationService.getDestinations().subscribe({
      next: (response: Destination[]) => {
        this.destinations = response;
      },
      error: () => {
        this.alertService.showAlert('Unable to load destinations, please try again later.', 'error');
        this.closeModal();
      }
    });
  }

  closeModal() {
    this.data = null;
    this.travelPackageForm.reset();
    this.dialogRef.close();
  }

  handleSubmit() {
    if (this.travelPackageForm.valid) {
      if (this.data) {
        this.travelPackageService.updateTravelPackage(this.data.id as string, this.travelPackageForm.value)
          .subscribe({
            next: () => {
              this.alertService.showAlert("Travel package updated successfully!", "success");
              this.closeModal();
            },
            error: () => this.alertService.showAlert('Unable to update travel package, please try again later.', 'error')
          });
      } else {
        this.travelPackageService.createTravelPackage(this.travelPackageForm.value).subscribe({
          next: () => {
            this.alertService.showAlert("Travel package created successfully!", "success");
            this.closeModal();
          },
          error: () => this.alertService.showAlert('Unable to create travel package, please try again later.', 'error')
        });
      }
    } else {
      this.travelPackageForm.markAllAsTouched();
    }
  }
}
