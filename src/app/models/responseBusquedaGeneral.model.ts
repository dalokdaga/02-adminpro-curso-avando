import { Hospital } from "./responseHospitales.models";
import { Medico } from "./responseMedicos.models";
import { Usuario } from "./usuario.model";

export interface ResponseBusquedaGeneral{
    ok:boolean,
    usuarios: Usuario[],
    medicos: Medico[],
    hospitales: Hospital[]
}