import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Hospital } from 'src/app/models/responseHospitales.models';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy {
  public hospitales: Hospital[] = [];
  private hospitalesTemp: Hospital[] = [];
  public cargando:boolean = true;
  public imgSubs: Subscription;

  constructor(private hospitalServices:HospitalService,
              private modalImagenSercice: ModalImagenService,
              private busquedasSevices:BusquedasService) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarHospitales();
    this.imgSubs = this.modalImagenSercice.nuevaImagen
        .pipe(
          delay(1000)
        )
          .subscribe(img => this.cargarHospitales());
  }

  cargarHospitales(){
    this.cargando = true;
    this.hospitalServices.cargarHospitales()
        .subscribe(resp=>{
          this.hospitales = resp;
          this.hospitalesTemp = this.hospitales;          
          this.cargando = false;
        })
  }

  guardarCambios(hospital: Hospital){
    this.hospitalServices.actualizarHospital(hospital._id,hospital.nombre)
        .subscribe(resp => {
          Swal.fire('Actualizado',hospital.nombre,'success');
        });
  }

  eliminarHospital(hospital:Hospital){

    Swal.fire({
      title: '¿Estas seguro de esta accion?',
      text: `Eliminar a  ${hospital.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminars'
    }).then((result) => {
      if (result.isConfirmed) {
        this.hospitalServices.eliminarHospital(hospital._id)
            .subscribe(resp =>{          
              Swal.fire('Eliminado',resp.msg,'success');
              this.cargarHospitales();
            });           
      }
    })    


  }

  async abrirSweeAlert(){
    const { value = '' } = await Swal.fire<string>({
      input: 'text',
      inputLabel: 'Hospital a ingresar',
      inputPlaceholder: 'Ingresa nombre de hospital'
    })
    if (value.length > 0) {
      this.hospitalServices.crearHospital(value)
          .subscribe(resp =>{
            Swal.fire('Se agrego:',resp.nombre,'success');
            this.cargarHospitales();
          });      
    }
  }

  abrirModal( hospital:Hospital){
    this.modalImagenSercice.abrirModal("hospitales",hospital._id,hospital.img);
  }

  buscar(termino:string){
    if (termino.length === 0) {
      return this.hospitales = [... this.hospitalesTemp];
    }
    this.busquedasSevices.busquedas('hospitales',termino)
        .subscribe((resp: Hospital[]) =>{
          this.hospitales = resp;
        },(error)=>{
         this.hospitales =[];
        });
  }
}
