import { Injectable } from '@angular/core';
import { Customer, NewCustomerUser } from '../../core/models/customer.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private url: string = "http://localhost:8080/customer";

  constructor(private httpClient: HttpClient) { }

  createCustomer(userCustomerData: NewCustomerUser): Observable<Customer> {
    return this.httpClient.post<Customer>(`${this.url}`, userCustomerData);
  }
}
