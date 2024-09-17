import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TravelPackage } from '../../core/models/travel-package.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TravelPackageService {
  private url: string = "http://localhost:8080/travelpackage";

  constructor(private httpClient: HttpClient) { }

  getTravelPackages(): Observable<TravelPackage[]> {
    return this.httpClient.get<TravelPackage[]>(this.url);
  }

  createTravelPackage(travelPackage: TravelPackage): Observable<TravelPackage> {
    return this.httpClient.post<TravelPackage>(this.url, travelPackage);
  }

  updateTravelPackage(id: string, travelPackage: TravelPackage): Observable<TravelPackage> {
    return this.httpClient.put<TravelPackage>(`${this.url}/${id}`, travelPackage);
  }

  deleteTravelPackage(id: string): Observable<any> {
    return this.httpClient.delete<any>(`${this.url}/${id}`);
  }
}
