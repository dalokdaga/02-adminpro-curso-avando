import { Usuario } from "./usuario.model";

export interface Busqueda {
    ok:         boolean;
    resultados: Usuario[];
}
