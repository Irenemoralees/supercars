import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Booking } from '../interfaces/booking';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  url: string = 'http://localhost:3000/api/bookings';
  constructor(private http: HttpClient, private authService: AuthService) {}

  getBookingsByUserId(userId: string): Observable<Booking[]> {
    const headers = new HttpHeaders({
      Authorization:` Bearer ${this.authService.user?.token}`,
    });
    return this.http.get<Booking[]>(`${this.url}/user/${userId}`, { headers });
  }

  getAllBookings(): Observable<Booking[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.user?.token}`,
    });
    return this.http.get<Booking[]>(this.url, { headers });
  }

  saveBooking(
    vehicleId: string,
    sDate: string,
    eDate: string,
    price: number,
    discount: number
  ) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.user?.token}`,
    });

    return this.http.post(this.url, {
      vehicle: vehicleId,
      startDate: sDate,
      endDate: eDate,
      price: price,
      discount: discount,
    }, {headers});
  }

  deleteBooking(bookingId: string){
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.user?.token}`,
    });
    return this.http.delete(`${this.url}/${this.authService.user?.id}/${bookingId}`, { headers });
  }

  editar(bookingId: string, startDate: string, endDate: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.user?.token}`,
    });
    return this.http.put<Booking>(`${this.url}/${this.authService.user?.id}/${bookingId}`, {
      startDate,
      endDate,
    }, { headers });
  }
};