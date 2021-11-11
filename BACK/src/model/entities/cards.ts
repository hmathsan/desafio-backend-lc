import { 
    Entity, 
    Column,
    PrimaryColumn
} from 'typeorm';

@Entity()
export class Card {
    @PrimaryColumn()
    id!: string;
    
    @Column()
    titulo!: string;
    
    @Column()
    conteudo!: string;
    
    @Column()
    lista!: string;

    constructor(id: string, titulo: string, conteudo: string, lista: string) {
        this.id = id;
        this.titulo = titulo;
        this.conteudo = conteudo;
        this.lista = lista;
    }
}