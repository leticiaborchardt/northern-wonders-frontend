import { Component, inject, OnInit } from '@angular/core';
import { TravelPackage } from '../../../core/models/travel-package.model';
import { TravelPackageService } from '../../services/travel-package.service';
import { AlertService } from '../../../core/services/alert.service';
import { CommonModule } from '@angular/common';
import { HasPermissionDirective } from '../../../core/directives/has-permission.directive';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TravelPackageModalComponent } from '../../components/travel-package-modal/travel-package-modal.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-travel-packages',
  standalone: true,
  imports: [CommonModule, HasPermissionDirective, MatDialogModule],
  templateUrl: './travel-packages.component.html',
  styleUrl: './travel-packages.component.scss'
})
export class TravelPackagesComponent implements OnInit {
  travelPackages: TravelPackage[] = [];
  readonly dialog = inject(MatDialog);

  constructor(
    private travelPackageService: TravelPackageService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.getTravelPackages();
  }

  getTravelPackages(): void {
    this.travelPackageService.getTravelPackages().subscribe({
      next: (response) => {
        this.travelPackages = response;
      },
      error: () => this.alertService.showAlert('Unable to load items, please try again later.', 'error')
    })
  }

  openCreateModal(): void {
    const dialogRef = this.dialog.open(TravelPackageModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      // update list
    });
  }

  openEditModal(travelPackage: TravelPackage): void {
    const dialogRef = this.dialog.open(TravelPackageModalComponent, {
      data: travelPackage
    });

    dialogRef.afterClosed().subscribe(result => {
      // update list
    });
  }

  deleteTravelPackage(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: `Are you sure you want to delete this travel package?` }
    });

    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        this.travelPackageService.deleteTravelPackage(id).subscribe({
          next: () => {
            this.travelPackages = this.travelPackages.filter(item => item.id !== id);

            this.alertService.showAlert('Travel package removed successfully!', 'success');
          },
          error: () => this.alertService.showAlert('Could not remove travel package, please try again later.', 'error')
        });
      }
    });
  }
}
