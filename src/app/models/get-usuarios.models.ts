import { Usuario } from "./usuario.model";

export interface Getusuarios {
    ok:       boolean;
    usuarios: Usuario[];
    uid:      string;
    total:    number;
}
