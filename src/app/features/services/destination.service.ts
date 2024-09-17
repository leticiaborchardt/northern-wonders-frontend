import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Destination } from '../../core/models/destination.model';

@Injectable({
  providedIn: 'root'
})
export class DestinationService {
  private url: string = "http://localhost:8080/destination";

  constructor(private httpClient: HttpClient) { }

  getDestinations(): Observable<Destination[]> {
    return this.httpClient.get<Destination[]>(this.url);
  }
}
