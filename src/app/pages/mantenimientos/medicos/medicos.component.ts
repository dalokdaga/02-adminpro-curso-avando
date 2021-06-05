import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Medico } from 'src/app/models/responseMedicos.models';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {
  public medicos: Medico[] = [];
  public medicosTemp: Medico[] = [];
  public cargando:boolean = true;
  public imgSubs: Subscription;
  constructor(private medicoServices: MedicoService,
              private busquedaServices: BusquedasService,
              private modalImagenSercice: ModalImagenService) { }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarMedicos();
    this.imgSubs = this.modalImagenSercice.nuevaImagen
    .pipe(
      delay(1000)
    )
      .subscribe(img => this.cargarMedicos());
  }

  cargarMedicos(){
    this.cargando = true;
    this.medicoServices.cargarMedicos()
        .subscribe(resp => {          
          this.medicos = resp;
          this.medicosTemp = resp;
          this.cargando = false;
        });
  }

  eliminarMedico(medico:Medico){

    Swal.fire({
      title: '¿Estas seguro de esta accion?',
      text: `Eliminar a  ${medico.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminars'
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicoServices.eliminarMedico(medico._id)
            .subscribe(resp =>{          
              Swal.fire('Eliminado',resp.msg,'success');
              this.cargarMedicos();
            });           
      }
    })    
  }

  buscar(termino:string){
    if (termino.length === 0 ) {
      this.medicos = this.medicosTemp;
    }else{  
      this.busquedaServices.busquedas('medicos',termino)
          .subscribe((resp:Medico[]) => 
          {
            this.medicos = resp
          });
    }
  }

  abrirModal( medico:Medico){
    this.modalImagenSercice.abrirModal("medicos",medico._id,medico.img);
  }
}
