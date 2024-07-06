import { Component } from '@angular/core';
import { Booking } from '../../../interfaces/booking';
import { BookingService } from '../../../services/booking.service';
import { FormatDatePipe } from '../../../pipes/format-date.pipe';
import { DivisaPipe } from '../../../pipes/divisa.pipe';
import { AuthService } from '../../../services/auth.service';
import Swal from "sweetalert2"
import { CanCancelPipe } from '../../../pipes/can-cancel.pipe';


@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [FormatDatePipe,DivisaPipe,CanCancelPipe],
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.css',
})
export class MyBookingsComponent {
  bookings: Booking[] = [];

  constructor(private bookingService: BookingService, private authService: AuthService){
    this.bookingService.getBookingsByUserId(authService.user!.id).subscribe({
      next: (response)=>{
        this.bookings = response as Booking[]
      },
      error: ()=>{

      }
    })
  }

  eliminar(bookingId: string){
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.bookingService.deleteBooking(bookingId).subscribe({
          next: ()=>{
            Swal.fire({
              title: "¡Reserva eliminada!",
              text: "Tu reserva ha sido eliminada correctamente",
              icon: "success",
              showConfirmButton: false,
              timer: 2000
            });

            window.location.reload(); // Recargar la página
this.bookings = this.bookings.filter(x=>x._id !== bookingId)
          },
          error:()=>{
            Swal.fire({
              title: "Oops!",
              text: "Ha ocurrido un error",
              icon: "error",
              showConfirmButton: false,
              timer: 1500
            })
          }
        })
      }
    });
  }

  editar(bookingId: string){
    const reservaEditar: Booking | undefined= this.bookings.find(x => x._id === bookingId);
    if (reservaEditar) {
      Swal.fire({
        title: `Edita tu reserva del ${reservaEditar.vehicle.brand } ${reservaEditar.vehicle.model}`,
        html: `
          <div>
            <div>
              <label class="form-label">Fecha inicio</label>
              <input type="date" id="startDate" class="form-control" value="${new Date(reservaEditar.startDate).toISOString().slice(0, 10)}">
            </div>
            <div>
              <label class="form-label">Fecha fin</label>
              <input type="date" id="endDate" class="form-control" value="${new Date(reservaEditar.endDate).toISOString().slice(0, 10)}">
            </div>
          </div>`,
        showCancelButton: true,
        confirmButtonText: "Guardar",
        preConfirm: () => {
          const startDate = (document.getElementById('startDate') as HTMLInputElement).value;
          const endDate = (document.getElementById('endDate') as HTMLInputElement).value;
        

          return { startDate, endDate };
        }
      }).then((result) => {
        if (result.isConfirmed) {
          const { startDate, endDate } = result.value!;
          this.bookingService.editar(bookingId, startDate, endDate).subscribe({
            next: (updatedBooking) => {
              Swal.fire({
                title: "¡Reserva actualizada!",
                text: "Tu reserva ha sido actualizada correctamente",
                icon: "success",
                showConfirmButton: false,
                timer: 2000
              });

                window.location.reload(); // Recargar la página
                this.bookings = this.bookings.map(booking => 
                booking._id === bookingId ? updatedBooking : booking
              );
            },
            error: () => {
              Swal.fire({
                title: "Oops!",
                text: "Ha ocurrido un error",
                icon: "error",
                showConfirmButton: false,
                timer: 1500
              });
          
            }
          });
        }
      });
    }
  }
}