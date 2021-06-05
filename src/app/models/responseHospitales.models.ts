export interface ResponseHospitales {
    ok:         boolean;
    hospitales?: Hospital[];
    hospital: Hospital;
}

export interface Hospital {
    nombre:  string;
    _id?:     string;
    img?:    string;
    usuario?: _HospitalUser;
}

interface _HospitalUser {
    _id:     string;
    nombre:  string;
    img?:    string;
}

export interface ResponseDelete {
    ok:boolean,
    msg:string
}