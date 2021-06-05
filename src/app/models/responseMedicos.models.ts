import { Hospital } from "./responseHospitales.models";

export interface ResponseMedicos {
    ok:      boolean;
    medicos: Medico[];
}

export interface ResponseMedico {
    ok:      boolean;
    medico: Medico;
}

export interface ResponseActMedico{
    ok: boolean;
    medicoActualizado: Medico;
}

export interface Medico {
    nombre:   string;
    _id?:      string;
    usuario?:  _MedicoUser;
    hospital?: Hospital;
    img?: string
}

interface _MedicoUser{
    _id:string,
    nombre:string,
    img:string
}

