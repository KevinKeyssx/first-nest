import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: 'users' })
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column( 'varchar', {
        unique: true,
    })
    email: string;

    @Column( 'text', {
        select: false
    })
    password: string;

    @Column( 'varchar' )
    fullName: string;

    @Column( 'bool', {
        default: true
    } )
    isActive: boolean;

    @Column( 'text', {
        array   : true,
        default : [ 'user' ]
    })
    roles: string[];

    @BeforeInsert()
    @BeforeUpdate()
    checkFieldEmail() {
        this.email = this.email.toLowerCase();
    }
}
