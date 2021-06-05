import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Hospital } from 'src/app/models/responseHospitales.models';
import { Medico } from 'src/app/models/responseMedicos.models';
import { HospitalService } from 'src/app/services/hospital.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit, OnDestroy {

  public medicoForm: FormGroup;
  public hospitales: Hospital[] = [];
  public hospitalSeleccionado: Hospital;
  public medicoSeleccionado:Medico;
  public imgSubs: Subscription; 
  
  constructor( private fb: FormBuilder,
               private hospitalServices: HospitalService,
               private medicoService: MedicoService,
               private router: Router,
               private activateRoute: ActivatedRoute,
               private modalImagenSercice: ModalImagenService) {      
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    


    this.activateRoute.params.subscribe(({id}) =>{
      if (id !== 'nuevo') {
        this.cargarMedico(id);        
        this.imgSubs = this.modalImagenSercice.nuevaImagen
        .pipe(
          delay(1000)
        )
          //.subscribe(img => this.router.navigateByUrl(`/dashboard/medico/${this.medicoSeleccionado._id}`) );
          .subscribe(img => this.cargarMedico(id));
    
      }
    })
    
    this.medicoForm = this.fb.group({
      nombre  :['', Validators.required],
      hospital:['', Validators.required],
    });

    this.cargarHospitales();
    this.medicoForm.get('hospital').valueChanges
        .subscribe(IdHospital =>{
          this.hospitalSeleccionado = this.hospitales.find(h => h._id === IdHospital);          
        });
  }

  cargarMedico(id:string){
    this.medicoService.buscarMedico(id)
        .pipe(
          delay(100)
        )
        .subscribe(medico =>{
          this.medicoSeleccionado = medico;
          const {nombre, hospital:{ _id }} = medico;
          this.medicoForm.setValue({nombre,hospital:_id})
        },(error)=> this.router.navigateByUrl(`/dashboard/medicos`));
  }
  cargarHospitales(){
    this.hospitalServices.cargarHospitales()
        .subscribe(hospitales=>{
          this.hospitales = hospitales;
        });
  }

  guardarMedico(){

    if (!this.medicoSeleccionado) {
      // se registra nuevo medico
      this.medicoService.crearMedico(this.medicoForm.value)
      .subscribe((resp:any) => {
        Swal.fire('Se Agrego medico',this.medicoForm.get('nombre').value,'success');
        this.router.navigateByUrl(`/dashboard/medico/${resp.medico._id}`);
      })  
    }else{
      // se actualiza medico
      const data = {...this.medicoForm.value}
      data._id = this.medicoSeleccionado._id;
      // 
      this.medicoService.actualizarMedico(data)
          .subscribe(resp => {
            Swal.fire('Se actualizo al medico',resp.nombre,'success');            
          })
    }



  }

  abrirModal(medico:Medico){
    this.modalImagenSercice.abrirModal("medicos",medico._id,medico.img);
  }
  
      
}
