import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcryptjs';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ unique: true })
    username: string;
  
    @Column()
    password: string;
  
    @Column({ unique: true })
    email: string;

    @Column({ nullable: true })
    fullName: string;

    @Column({ nullable: true })
    phoneNumber: string;

    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
}
