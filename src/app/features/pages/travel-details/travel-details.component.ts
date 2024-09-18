import { Component, Input, OnInit } from '@angular/core';
import { TravelPackage } from '../../../core/models/travel-package.model';
import { TravelPackageService } from '../../services/travel-package.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../../core/services/alert.service';
import { CommonModule } from '@angular/common';
import { NoDataFoundComponent } from '../../components/no-data-found/no-data-found.component';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-travel-details',
  standalone: true,
  imports: [CommonModule, NoDataFoundComponent, MatIcon],
  templateUrl: './travel-details.component.html',
  styleUrl: './travel-details.component.scss'
})
export class TravelDetailsComponent implements OnInit {
  travelPackage!: TravelPackage;

  constructor(
    private travelPackageService: TravelPackageService,
    private alertService: AlertService,
    private route: ActivatedRoute, 
    private router: Router, 
  ) {}

  ngOnInit(): void {
    this.getTravelPackage();
  }

  getTravelPackage() {
    const id = this.route.snapshot.paramMap.get('id');

    this.travelPackageService.getTravelPackageById(id!).subscribe({
      next: (response) => {
        this.travelPackage = response;
      },
      error: () => {
        this.alertService.showAlert('Unable to load travel package, please try again later.', 'error');
        this.router.navigateByUrl('/travel-packages');
      }
    })
  }
}
