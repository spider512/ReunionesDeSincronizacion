export interface IProyecto {
    id?: number;
    d?: string; //Descripcion
    n?: string; //Nombre
    e?: string; //Estado
    rh?: number; //Codigo de reunion de hoy
}


export interface ITarea {
    id?: number; //pk
    p?: number; //Cod de Proyecto
    d?: string; //Descripción de Tarea   
    e?: string; //Estado
    // u?: number;  //Usuario asignado
}

export interface IProblema {
    id?: number; //pk
    p?: number; //Cod de usuario
    d?: string; //Descripcion de problema
    // u?: number;  //Usuario asignado   
}


export class estadosTareas {
    public static ABIERTA = "1";
    public static EN_PROCESO = "2";
    public static CERRADA = "3";
    public static CANCELADA = "4";
}