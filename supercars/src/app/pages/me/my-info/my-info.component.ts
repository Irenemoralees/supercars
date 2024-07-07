import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule  } from '@angular/forms';
import { User } from '../../../interfaces/user';
import { MyInfoService } from '../../../services/my-info.service';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-my-info',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './my-info.component.html',
  styleUrls: ['./my-info.component.css'],
})
export class MyInfoComponent implements OnInit {
  user: User | null = null;
  form: FormGroup;

  constructor(
    private myInfoService: MyInfoService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: [''],
      email: ['']
    });
  }

  ngOnInit(): void {
    this.myInfoService.getUserInfo().subscribe({
      next: (response) => {
        console.log('User info received:', response);
        this.user = response;
        this.form.patchValue({
          name: this.user.name,
          email: this.user.email
        });
      },
      error: (error) => {
        console.error('Error fetching user info:', error);
        Swal.fire({
          title: 'Error',
          text: 'No se pudo cargar la información del usuario',
          icon: 'error',
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  }

  actualizar(): void {
    if (this.user) {
      const updatedUser = { ...this.user, ...this.form.value };
      this.myInfoService.updateUserInfo(updatedUser).subscribe({
        next: (response) => {
          console.log('User info updated:', response);
          this.user = response;
          Swal.fire({
            title: 'Actualización exitosa',
            text: 'Tu información ha sido actualizada correctamente',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000
          });
        },
        error: (error) => {
          console.error('Error updating user info:', error);
          Swal.fire({
            title: 'Error',
            text: 'No se pudo actualizar la información',
            icon: 'error',
            showConfirmButton: false,
            timer: 1500
          });
        }
      });
    }
  }

  eliminar(): void {
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
        this.myInfoService.deleteUser().subscribe({
          next: () => {
            Swal.fire({
              title: "¡Usuario eliminado!",
              text: "Tu usuario ha sido eliminado correctamente",
              icon: "success",
              showConfirmButton: false,
              timer: 2000
            });
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

  editar(): void {
    if (this.user) {
      Swal.fire({
        title: 'Cambiar Contraseña',
        input: 'password',
        inputLabel: 'Nueva Contraseña',
        inputPlaceholder: 'Ingrese su nueva contraseña',
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed && result.value) {
          const updatedUser = { ...this.user, password: result.value };
          this.myInfoService.updateUserInfo(updatedUser).subscribe({
            next: (response) => {
              console.log('Password updated:', response);
              Swal.fire({
                title: 'Contraseña Actualizada',
                text: 'Tu contraseña ha sido actualizada correctamente',
                icon: 'success',
                showConfirmButton: false,
                timer: 2000
              });
            },
            error: (error) => {
              console.error('Error updating password:', error);
              Swal.fire({
                title: 'Error',
                text: 'No se pudo actualizar la contraseña',
                icon: 'error',
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










// import { Component, OnInit } from '@angular/core';
// import { User } from '../../../interfaces/user';
// import { MyInfoService } from '../../../services/my-info.service';
// import { AuthService } from '../../../services/auth.service';
// import Swal from 'sweetalert2';


// @Component({
//   selector: 'app-my-info',
//   templateUrl: './my-info.component.html',
//   styleUrls: ['./my-info.component.css'],
// })
// export class MyInfoComponent implements OnInit {
//   user: User | null = null;

//   constructor(private myInfoService: MyInfoService, private authService: AuthService) {}

//   ngOnInit(): void {
//     this.myInfoService.getUserInfo().subscribe({
//       next: (response) => {
//         console.log('User info received:', response); // Añadir log
//         this.user = response;
//       },
//       error: (error) => {
//         console.error('Error fetching user info:', error); // Añadir log
//         Swal.fire({
//           title: 'Error',
//           text: 'No se pudo cargar la información del usuario',
//           icon: 'error',
//           showConfirmButton: false,
//           timer: 1500
//         });
//       }
//     });
//   }

//   actualizar(): void {
//     if (this.user) {
//       this.myInfoService.updateUserInfo(this.user).subscribe({
//         next: (updatedUser) => {
//           console.log('User info updated:', updatedUser); // Añadir log
//           this.user = updatedUser;
//           Swal.fire({
//             title: 'Actualización exitosa',
//             text: 'Tu información ha sido actualizada correctamente',
//             icon: 'success',
//             showConfirmButton: false,
//             timer: 2000
//           });
//         },
//         error: (error) => {
//           console.error('Error updating user info:', error); // Añadir log
//           Swal.fire({
//             title: 'Error',
//             text: 'No se pudo actualizar la información',
//             icon: 'error',
//             showConfirmButton: false,
//             timer: 1500
//           });
//         }
//       });
//     }
//   }

//   eliminar(userId: string) {
//     Swal.fire({
//       title: "¿Estás seguro?",
//       text: "No podrás revertir esta acción",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Sí, eliminar"
//     }).then((result) => {
//       if (result.isConfirmed) {
//         this.userService.deleteUser(userId).subscribe({
//           next: () => {
//             Swal.fire({
//               title: "¡Usuario eliminada!",
//               text: "Tu usuario ha sido eliminada correctamente",
//               icon: "success",
//               showConfirmButton: false,
//               timer: 2000
//             });

//             this.user = this.user.filter(x => x.id !== userId);
//           },
//           error: () => {
//             Swal.fire({
//               title: "Oops!",
//               text: "Ha ocurrido un error",
//               icon: "error",
//               showConfirmButton: false,
//               timer: 1500
//             });
//           }
//         });
//       }
//     });
//   }

//   editar(userId: string) {
//     console.log('Editar usuario:', userId)
//     const usuarioEditar: User | undefined | null = this.users.find(x => x._id === userId);
//     if (usuarioEditar) {
//       console.log('Editar usuario:', usuarioEditar)

//       Swal.fire({
//         title: `Editar contraseña del usuario  ${usuarioEditar.user.email} `,
//         html: `<div>
//           <div>
//             <label class="form-label">Password</label>
//             <input id="startDate" type="date" class="form-control" value="${usuarioEditar.user.password}">
//           </div>
//           <div>
//             <label class="form-label">Fecha fin</label>
//             <input id="endDate" type="date" class="form-control" value="${reservaEditar.endDate}">
//           </div>
//           <div>
//             <label class="form-label">Nuevo precio</label>
//             <p id="newPrice"></p>
//           </div>
//         </div>`,
//         showCancelButton: true,
//         confirmButtonText: 'Guardar cambios',
//         cancelButtonText: 'Cancelar',
// }
