import { Component, inject, OnInit } from '@angular/core';
import { TravelPackage } from '../../../core/models/travel-package.model';
import { TravelPackageService } from '../../services/travel-package.service';
import { AlertService } from '../../../core/services/alert.service';
import { CommonModule } from '@angular/common';
import { HasPermissionDirective } from '../../../core/directives/has-permission.directive';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TravelPackageModalComponent } from '../../components/travel-package-modal/travel-package-modal.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { NoDataFoundComponent } from '../../components/no-data-found/no-data-found.component';

@Component({
  selector: 'app-travel-packages',
  standalone: true,
  imports: [CommonModule, HasPermissionDirective, MatDialogModule, MatProgressSpinnerModule, MatIconModule, NoDataFoundComponent],
  templateUrl: './travel-packages.component.html',
  styleUrl: './travel-packages.component.scss'
})
export class TravelPackagesComponent implements OnInit {
  travelPackages: TravelPackage[] = [];
  loading: boolean = false;
  readonly dialog = inject(MatDialog);

  constructor(
    private travelPackageService: TravelPackageService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getTravelPackages();
  }

  getTravelPackages(): void {
    this.loading = true;

    this.travelPackageService.getTravelPackages().subscribe({
      next: (response) => {
        this.travelPackages = response;
      },
      error: () => this.alertService.showAlert('Unable to load items, please try again later.', 'error'),
      complete: () => this.loading = false
    })
  }

  openDetailsPage(id: string): void {
    this.router.navigate(['/travel-package', id]);
  }

  openCreateModal(): void {
    this.dialog.open(TravelPackageModalComponent)
      .afterClosed()
      .subscribe(result => {
        this.getTravelPackages();
      });
  }

  openEditModal(travelPackage: TravelPackage): void {
    this.dialog.open(TravelPackageModalComponent, { data: travelPackage })
      .afterClosed()
      .subscribe(result => {
        this.getTravelPackages();
      });
  }

  deleteTravelPackage(id: string): void {
    this.dialog.open(ConfirmDialogComponent, {
      data: { message: `Are you sure you want to delete this travel package?` }
    })
      .afterClosed()
      .subscribe(confirm => {
        if (confirm) {
          this.travelPackageService.deleteTravelPackage(id).subscribe({
            next: () => {
              this.alertService.showAlert('Travel package removed successfully!', 'success');
              this.getTravelPackages();
            },
            error: () => this.alertService.showAlert('Could not remove travel package, please try again later.', 'error')
          });
        }
      });
  }
}
