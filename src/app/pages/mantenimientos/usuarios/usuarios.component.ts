import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {
  public totalUsuario: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public desde: number = 0;
  public cargando: boolean = true;
  public imgSubs: Subscription;

  constructor(private usuarioService:UsuarioService,
              private busquedasSevices:BusquedasService,
              private modalImagenSercice:ModalImagenService) { }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargaUsuarios();
    this.imgSubs = this.modalImagenSercice.nuevaImagen
        .pipe(
          delay(1000)
        )
          .subscribe(img => this.cargaUsuarios());
        
  }

  cargaUsuarios(){
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.desde)
    .subscribe(({total,usuarios}) =>{
      this.cargando = false;
      this.totalUsuario = total;
      if (usuarios.length !== 0) {
        this.usuarios = usuarios;                
        this.usuariosTemp =usuarios;
      }      
      console.log(this.usuarios);
    });
  }

  cambiarPagina( valor:number ){
    this.desde += valor;
    if (this.desde < 0 ) {
      this.desde = 0;      
    }else if(this.desde > this.totalUsuario){
      this.desde -= valor;
    }
    this.cargaUsuarios();
  }

  buscar(termino:string){
    if (termino.length === 0) {
      return this.usuarios = [... this.usuariosTemp];
    }
    this.busquedasSevices.busquedas('usuarios',termino)
        .subscribe(resp =>{
          this.usuarios = resp;
        },(error)=>{
         this.usuarios =[];
        });
  }

  eliminarUsuario(usuario:Usuario){
    if (usuario.uid === this.usuarioService.uid) {
      return Swal.fire('Error','No puede borrarse a si mismo','error')
    }
    Swal.fire({
      title: '¿Estas seguro de esta accion?',
      text: `Eliminar a  ${usuario.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminars'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario(usuario.uid)
            .subscribe(resp=>{
              Swal.fire(
                'Eliminado!',
                resp.msg,
                'success'
              )              
              this.cargaUsuarios();
            });            
      }
    })    
  }

  cambiarRole(usuario: Usuario){
    console.log(usuario);
    this.usuarioService.actualizarUsuario(usuario)
        .subscribe(resp=>{
          console.log(resp);
        })
  }

  abrirModal( usuario:Usuario){
    this.modalImagenSercice.abrirModal("usuarios",usuario.uid,usuario.img);
  }
}
