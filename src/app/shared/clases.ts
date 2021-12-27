export interface IProyecto {
    id?: number;
    d?: string; //Descripcion
    n?: string; //Nombre
    e?: string; //Estado
}


export interface ITarea {
    id?: number; //pk
    p?: number; //Cod de Proyecto
    d?: string; //Descripcion de proyecto   
    e?: string; //Estado
}

