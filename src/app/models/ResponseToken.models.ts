import { Usuario } from "./usuario.model";

export interface ReponseToken {
    ok:      boolean;
    token:   string;
    usuario: Usuario;
    menu:    Menu[];
}

export interface Menu {
    titulo:  string;
    icono:   string;
    submenu: Submenu[];
}

export interface Submenu {
    titulo: string;
    url:    string;
}

