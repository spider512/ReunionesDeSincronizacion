export interface IProyecto {
    id?: number;
    d?: string; //Descripcion
    n?: string; //Nombre
    e?: string; //Estado
}


export interface ITarea {
    id?: number; //pk
    p?: number; //Cod de Proyecto
    d?: string; //Descripción de Tarea   
    e?: string; //Estado
}

export interface IProblema {
    id?: number; //pk
    p?: number; //Cod de usuario
    d?: string; //Descripcion de problema   
}
